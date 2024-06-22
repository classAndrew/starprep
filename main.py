from flask import Flask, request, jsonify
from dotenv import load_dotenv
from hume import HumeBatchClient
import openai
import os

load_dotenv()
hume_key = os.environ["hume_key"]
openai_key = os.environ["openai_key"]

gpt_client = openai.OpenAI(api_key=openai_key)

app = Flask(__name__)
client = HumeBatchClient(hume_key)

user_story_sequence = ["start"]

@app.route('/gen_next_story_button', methods=['GET'])
def gen_next_story_button():
    next_button = request.args.get("next_button")
    if next_button:
        user_story_sequence.append(next_button)

    response = gpt_client.chat.completions.create(
        model="gpt-4o",  # Use "gpt-4" if GPT-4 is available
        messages=[{"role": "system", "content": f"""
You will be generating labels for buttons for users to create a story out of.
Given a sequence of labels, please generate 5 more labels as options that can add to the theme of the story. 
If you just see the label sequence ["start"], then start off with generating 5 unique options that can help begin the story.
These options should be "theme-like" and not whole sentences.
Please respond in the following format: ["Label1", "Label2", "Label3", "Label4", "Label5"]
Here is the user's input: {user_story_sequence}        
"""}],
        max_tokens=100  # You can adjust the max tokens as needed
    )

    openai_choices = response.choices[0].message.content
    choices_as_list = eval(openai_choices)

    return jsonify({"buttons": choices_as_list})

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
    gen_next_story_button()
    # app.run(debug=True)
