from flask import Flask, request, jsonify
from dotenv import load_dotenv
from hume import HumeBatchClient, HumeStreamClient
from hume.models.config import LanguageConfig, ProsodyConfig
import asyncio
import openai
import os
import ffmpeg

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
Personality: {params['personality']}   
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

def get_emotion_from_audio(file_name):
    config = ProsodyConfig()
    job = hume_batch_client.submit_job(None, [config], files=[file_name])

    details = job.await_complete()
    job.download_predictions("predictions.json")
    predictions = job.get_predictions()
    results = []

    for prediction in predictions[0]["results"]["predictions"][0]["models"]["prosody"]["grouped_predictions"][0]["predictions"]:
        text = prediction["text"]
        top_5_emotions = sorted(prediction["emotions"], key=lambda x: x["score"], reverse=True)[:5]
        results.append((text, top_5_emotions))

    return results

@app.route('/api/uploadAudio', methods=['POST'])
def uploadAudio():
    file = request.files['file']

    if file:
        file_path = "uploaded_audio/saved_file.wav"
        file.save(file_path)
        
    ffmpeg.input("uploaded_audio/saved_file.wav").output("uploaded_audio/saved_file.mp3").overwrite_output().run()

    emotions = get_emotion_from_audio("uploaded_audio/saved_file.mp3")
    result_dict = {}
    for annotated_text, emotions in emotions:
        result_dict[annotated_text] = emotions

    response = jsonify(result_dict)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    # pass
    # file_name = "../data/angry/anger_505-532_0527.wav"
    # file_name = "../data/test/test.mp3"
    # print(get_emotion_from_audio(file_name))
    app.run(port=8080) 