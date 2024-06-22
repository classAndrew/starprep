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


@app.route('/api/updateFeatures', methods=['POST'])
def updateFeatures():
    params = request.get_json(force=True)
    print('received', params)
    response = gpt_client.chat.completions.create(
        model="gpt-4o", 
        messages=[{"role": "system", "content": f"""
Please write a piece of dialogue for a single character that matches the given description voice actors to read aloud. 
Include only the text that will be read aloud.
Center the story given the following characteristics:
Genre: {params['genre']}   
Gender: {params['gender']}   
Role: {params['role']}   
"""}],
        max_tokens=700
    )

    openai_response = response.choices[0].message.content
    response = jsonify({"script": openai_response})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

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
    app.run(port=8080)