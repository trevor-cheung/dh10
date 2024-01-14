from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS


app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])


from flask import Response

#variables
user_input = ""
bin_image = ""

names = []
import urllib.request, json 
with urllib.request.urlopen("https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/Waste%20Wizard%20Data%20from%20TOwaste%20App.json") as url:
    data = json.load(url)
    for item in data:
        names.append(item["item"])

names_string = ", ".join(names)


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_cosine_similarity(query, corpus):
    vectorizer = CountVectorizer().fit_transform([query] + corpus)
    vectors = vectorizer.toarray()

    # Calculate cosine similarity
    similarity_scores = cosine_similarity(vectors)

    # Extract the similarity scores for the query against each document
    query_similarity_scores = similarity_scores[0, 1:]

    return query_similarity_scores


# Example
query = "cereal box"

similarity_scores = calculate_cosine_similarity(query, names)

# Print the similarity scores
largest_score = 0
closest_word = ""
for word, score in zip(names, similarity_scores):
    if score > largest_score:
        largest_score = score
        closest_word = word

print("Closest word = " + closest_word)

import cohere

API_key= " enter api key here"
co = cohere.Client(API_key)

def get_closest_word(query):
    n = len(names_string) / 3
    response = co.generate(
        prompt="Given this list of items: " + names_string[:int(n)] + ", write me the exact name of the item in the list that most closely matches the following string: " + query + ", in the format of Item: [name of item in list].",
        truncate="END"
    )
    print(response.generations[0].text)
    return (response.generations[0].text)
word_1 = get_closest_word(query).split(":")[1]
def get_closest_word_2(query):
    n = len(names_string) / 3
    response = co.generate(
        prompt="Given this list of items: " + names_string[int(n):2*int(n)] + ", write me the exact name of the item in the list that most closely matches the following string: " + query + ", in the format of Item: [name of item in list].",
        truncate="END"
    )
    print(response.generations[0].text)
    return (response.generations[0].text)
word_2 = get_closest_word_2(query).split(":")[1]
def get_closest_word_3(query):
    n = len(names_string) / 3
    response = co.generate(
        prompt="Given this list of items: " + names_string[2*int(n):] + ", write me the exact name of the item in the list that most closely matches the following string: " + query + ", in the format of Item: [name of item in list].",
        truncate="END"
    )
    print(response.generations[0].text)
    return (response.generations[0].text)
word_3 = get_closest_word_3(query).split(":")[1]
word_list = word_1 + ", " + word_2 + ", " + word_3
print(word_list)
def get_closest_word_4(query):
    n = len(names_string) / 3
    response = co.generate(
        prompt="Given this list of items: " + word_list + ", write me the exact name of the item in the list that most closely matches the following string: " + query + ", in the exact format of Item: [name of item in list].",
        truncate="END"
    )
    print(response.generations[0].text)
    return (response.generations[0].text)

database_item = get_closest_word_4(query).split(":")[1]

def get_relevant_info (data, name):
    print(name)
    for item in data:
        if name.strip() == item["item"].strip():
            print("found")
            instructions = ""
            for instr in item["instructions"]:
                instructions += (instr + " ")
            response = co.generate(
                prompt="Given the context: Name: " + name + " Category: " + item["category"] + "Instructions: " + instructions + ", write me a concise one sentence summary of how I should dispose of this item.",
                max_tokens=100
            )
            print(response.generations[0].text)
get_relevant_info(data, database_item)
            
def concise_list (data):
    # print(names_string)
    n = len(names_string) / 3
    response = co.generate(
        prompt="Given the list of items: " + names_string[:int(n)]+ ", rank the items by how commonly they are used/handled, and give me the top third of that list of items, in the format of: item, item, item, etc..",
        truncate="END"
    )
    print(response.generations[0].text)
# concise_list(data)
    
def my_model(query):
    response = co.generate(
        model='32a981cd-456a-48d4-b3e6-f1fa2d450769-ft',
        prompt=query
    )
    print(response.generations[0].text)
# my_model(query)
    
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
    change_image(input_data)

    get_image_data()
    get_data()
    return {"response": ["response:", input_data]}

def change_image(calculated_bin):
    global bin_image
    if (calculated_bin == "blue"):
        bin_image = "https://assets.shop.loblaws.ca/products/20162341/b2/en/front/20162341_front_a06_@2.png"
    elif (calculated_bin == "green"):
        bin_image = "https://png.pngtree.com/png-vector/20200312/ourmid/pngtree-garbage-waste-sorting-organic-recycle-bin-green-color-flat-vector-illustration-png-image_2155234.jpg"

if __name__ == '__main__':
    app.run()