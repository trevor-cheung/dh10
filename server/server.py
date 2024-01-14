from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS


app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])


from flask import Response

#variables
user_input = ""
bin_image = ""
bin_type = ""
cohere_summary = ""

names = []
import urllib.request, json 
with urllib.request.urlopen("https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/Waste%20Wizard%20Data%20from%20TOwaste%20App.json") as url:
    data = json.load(url)
    for item in data:
        names.append(item["item"])


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_cosine_similarity(query, names):
    vectorizer = CountVectorizer().fit_transform([query] + names)
    vectors = vectorizer.toarray()

    # Calculate cosine similarity
    similarity_scores = cosine_similarity(vectors)

    # Extract the similarity scores for the query against each document
    query_similarity_scores = similarity_scores[0, 1:]

    largest_score = 0
    closest_word = ""
    for word, score in zip(names, query_similarity_scores):
        if score > largest_score:
            largest_score = score
            closest_word = word

    print("Closest word = " + closest_word)
    return closest_word




import cohere

API_key= " put api key here"
co = cohere.Client(API_key)

def get_relevant_info (data, name):
    for item in data:
        if name == item["item"]:
            global bin_type
            bin_type = item["category"]
            instructions = ""
            for instr in item["instructions"]:
                instructions += (instr + " ")
            response = co.generate(
                prompt="Given the context: Name: " + name + " Category: " + item["category"] + "Instructions: " + instructions + ", write me a concise one sentence summary of how I should dispose of this item. Do not ask me any questions.",
                max_tokens=100
            )
            return response.generations[0].text



    
def find_options(names, current):
    values = []
    found = 0
    for name in names:
        if name.startswith(current):
            values.append(name)
            found += 1
        
        if found >= 4:
            break



@app.route("/api/get", methods=['GET'])
def get_data():
    global user_input
    return {"response": [user_input]}

@app.route("/api/get_summary", methods=['GET'])
def get_summary():
    global cohere_summary
    return {"response": [cohere_summary]}


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

    closest_word = calculate_cosine_similarity(input_data, names)
    global cohere_summary
    cohere_summary = get_relevant_info(data, closest_word)

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
        bin_image = "https://png.pngtree.com/png-vector/20200312/ourmid/pngtree-garbage-waste-sorting-organic-recycle-bin-green-color-flat-vector-illustration-png-image_2155234.jpg"
    elif (calculated_bin == "Garbage Bin"):
        bin_image = "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-silver-trash-bin-clipart-png-image_2858577.jpg"

if __name__ == '__main__':
    app.run()