from flask import Flask, request, jsonify
from dotenv import load_dotenv
from hume import HumeBatchClient, HumeStreamClient
from hume.models.config import LanguageConfig
import asyncio
import openai
import os

load_dotenv()
hume_key = os.environ["hume_key"]
openai_key = os.environ["openai_key"]

gpt_client = openai.OpenAI(api_key=openai_key)

app = Flask(__name__)
hume_batch_client = HumeBatchClient(hume_key)
hume_stream_client = HumeStreamClient(hume_key)

user_story_sequence = ["start"]

@app.route('/gen_next_story_button', methods=['GET'])
def gen_next_story_button():
    global user_story_sequence
    next_button = request.args.get("next_button")
    if next_button:
        user_story_sequence.append(next_button)

    response = gpt_client.chat.completions.create(
        model="gpt-4o", 
        messages=[{"role": "system", "content": f"""
You will be generating labels for buttons for users to create a story out of.
Given a sequence of labels, please generate 5 more labels as options that can add to the theme of the story. 
If you just see the label sequence ["start"], then start off with generating 5 unique options that can help begin the story.
These options should be "theme-like" and not whole sentences.
Please respond in the following format: ["Label1", "Label2", "Label3", "Label4", "Label5"]
Here is the user's input: {user_story_sequence}        
"""}],
        max_tokens=100 
    )

    openai_choices = response.choices[0].message.content
    choices_as_list = eval(openai_choices)

    return jsonify({"buttons": choices_as_list})

def gen_story_from_buttons():
    global user_story_sequence
    # ignore the start sequence
    user_story_sequence = user_story_sequence[1:]
    response = gpt_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": f"""
Given a sequence in the format ["Label1", "Label2", "Label3", "Label4", "Label5"], please generate a single dialogue for a specific character
that fits the sequece. Generate three sentences and only include what is said without narration. Place each sentence on a new line
Here is the user's input: {user_story_sequence}        
    """}],
        max_tokens=700
    )

    openai_script = response.choices[0].message.content
    return openai_script
    # return jsonify({"script": openai_script})

async def hume_get_story_emotions(samples):
    config = LanguageConfig()
    hume_results = []
    async with hume_stream_client.connect([config]) as socket:
        for sample in samples:
            result = await socket.send_text(sample)
            emotions = result["language"]["predictions"][0]["emotions"]
            # get top 5
            emotions = sorted(emotions, key=lambda x: x["score"], reverse=True)[:5]
            hume_results.append(emotions)
    
    return hume_results

def get_emotions_from_story(script):
    samples = script.split('\n')
    hume_emotions = asyncio.get_event_loop().run_until_complete(hume_get_story_emotions(samples))
    print("hume len: ", len(hume_emotions))
    return hume_emotions

def get_emotion_from_audio():
    pass

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    user_story_sequence = ["random", "angry", "technology"]
    story = gen_story_from_buttons()
    print("generated story:", story)
    hume_emotions = get_emotions_from_story(story)
    for x in hume_emotions:
        print('\n'+'\n'.join(str(y) for y in x))
    # app.run(debug=True)
