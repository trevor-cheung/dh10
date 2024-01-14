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

# def linkToQs(link, lang): # takes link, returns q/a arrays
    # return Q_and_A_arrays(generate_questions(link_to_transcript(link), lang))

names = []
import urllib.request, json 
with urllib.request.urlopen("https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/Waste%20Wizard%20Data%20from%20TOwaste%20App.json") as url:
    data = json.load(url)
    for item in data:
        names.append(item["item"])

names_string = ", ".join(names)

query = "dell computer"

def get_closest_word(query):
    prompt = f"Given this list of items: {names_string}, if and only if there is a good match, write me the exact name of the item in the list that most closely matches the following string: {query}, in the format of Item: [name of item in list]. If there is not a good match, say Item: no match."
    output = chatgpt(prompt)
    return output
closest_word = get_closest_word(query)
print(closest_word)
database_item = closest_word.split(":")[1].strip()
# if closest_word == 'no match':
#     database_item = 'no match'
# else:
#     database_item = closest_word.split(":")[1].strip()

def get_relevant_info (data, name):
    print(name)
    if name == "no match":
        return 'This item is not currently in the database, please check back later or call your local waste management service.'
    for item in data:
        if name.strip() == item["item"].strip():
            print("found")
            instructions = ""
            for instr in item["instructions"]:
                instructions += (instr + " ")
            
            prompt="Given the context: Name: " + name + " Category: " + item["category"] + "Instructions: " + instructions + ", write me a concise and clear summary of how I should dispose of this item with as little words as possible.",
            output = chatgpt(prompt)
            return output
print(get_relevant_info(data, database_item))

# link = "https://www.youtube.com/watch?v=sbIQLzieUq8"

# qs, ans = linkToQs(link, False)

# conf, feedback = confidence("theshy said he should have been more reckless in the beginning and that he could have possibly won in that first gank if he had been more aggressive", "TheShy regrets not being more reckless during the first phase when the enemy team went for a top gank. He feels he could have been more aggressive and potentially won that attempt.")
# print(conf+"\n"+feedback)