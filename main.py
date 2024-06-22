from flask import Flask
from dotenv import load_dotenv
from hume import HumeBatchClient
import os

load_dotenv()
hume_key = os.environ["hume_key"]
openai_key = os.environ["openai_key"]

app = Flask(__name__)
client = HumeBatchClient("<YOUR API KEY>")


def gen_next_story_button():
    pass

def gen_story_from_buttons():
    pass 

def get_emotions_from_story():
    pass 

def get_emotion_from_audio():
    pass

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
