from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS


app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])


from flask import Response



import json
import requests
import config

def chatgpt(prompt):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+config.openai_key,
    }

    json_data = {
        'model': 'gpt-3.5-turbo-1106',
        'messages': [
            {
                'role': 'user',
                'content': f'{prompt}',
            },
        ],
        'temperature': 0.5,
    }

    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=json_data)
    response_dict = json.loads(response.text)
    
    # print(response_dict)  

    return(response_dict['choices'][0]['message']['content'])

names = []
import urllib.request, json 
with urllib.request.urlopen("https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/Waste%20Wizard%20Data%20from%20TOwaste%20App.json") as url:
    data = json.load(url)
    for item in data:
        names.append(item["item"])

names_string = ", ".join(names)


def get_closest_word(query):
    prompt = f"Given this list of items: {names_string}, write me the exact name of the item in the list that most closely matches the following string: {query}, in the format of Item: [name of item in list]."
    output = chatgpt(prompt)
    return output



def get_relevant_info (data, name):
    print(name)
    for item in data:
        if name.strip() == item["item"].strip():
            print("found")
            global bin_type
            bin_type = item["category"].strip()
            instructions = ""
            for instr in item["instructions"]:
                instructions += (instr + " ")
            
            prompt="Given the context: Name: " + name + " Category: " + item["category"] + "Instructions: " + instructions + ", write me a concise one sentence summary of how I should dispose of this item.",
            output = chatgpt(prompt)
            print(output)
            return output




#variables
user_input = ""
bin_image = ""
bin_type = ""
summary = ""
    




@app.route("/api/get", methods=['GET'])
def get_data():
    global user_input
    return {"response": [user_input]}

@app.route("/api/get_summary", methods=['GET'])
def get_summary():
    global summary
    return {"response": [summary]}


@app.route("/api/get_image", methods=['GET'])
def get_image_data():
    global bin_image
    return {"response": [bin_image]}


@app.route("/api/submit", methods=['POST', 'GET'])
def submit_data():
    input_data = request.json.get('inputValue')
    print("received info")
    global user_input
    user_input = input_data

    database_item = get_closest_word(input_data).split(":")[1].strip()
    print(database_item)
    global summary
    summary = get_relevant_info(data, database_item)
    print(summary)
    print(bin_type)
    change_image(bin_type)

    get_image_data()
    get_summary()
    get_data()
    return {"response": ["response:", input_data]}

def change_image(calculated_bin):
    global bin_image
    if (calculated_bin == "Blue Bin"):
        bin_image = "https://assets.shop.loblaws.ca/products/20162341/b2/en/front/20162341_front_a06_@2.png"
    elif (calculated_bin == "Green Bin"):
        bin_image = "https://www.clker.com/cliparts/d/J/I/6/f/0/compost.svg.hi.png"
    elif (calculated_bin == "Garbage Bin"):
        bin_image = "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-silver-trash-bin-clipart-png-image_2858577.jpg"

if __name__ == '__main__':
    app.run()