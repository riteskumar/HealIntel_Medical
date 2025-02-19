import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
import numpy
import tflearn
import random
import json
import pickle
import requests
nltk.download('punkt')
app = Flask(__name__)

with open("intents.json") as file:
    data = json.load(file)

load_dotenv()
HUGGINGFACE_API_URL = os.getenv("HUGGINGFACE_API_URL")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

try:
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except:
    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [stemmer.stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [stemmer.stem(w.lower()) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = numpy.array(training)
    output = numpy.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

# Model setup
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
except:
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")

def get_huggingface_response(query):
    api_url = HUGGINGFACE_API_URL
    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
    payload = {"inputs": query}
    response = requests.post(api_url, headers=headers, json=payload)
    
    # Debugging: Print the response
    print("Hugging Face API response:", response.json())
    
    if response.status_code == 200:
        generated_text = response.json()
        if isinstance(generated_text, list) and len(generated_text) > 0:
            return generated_text[0].get("generated_text", "Sorry, I couldn't find an answer to your question.")
        else:
            return "Sorry, I couldn't find an answer to your question."
    else:
        return "I'm sorry, I couldn't process that request."

def get_chatbot_response(user_input):
    results = model.predict([bag_of_words(user_input, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]

    if results[results_index] > 0.7:
        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg['responses']
        return random.choice(responses)
    else:
        return get_huggingface_response(user_input)

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]
    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return numpy.array(bag)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['message']
    response = get_chatbot_response(user_input)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)