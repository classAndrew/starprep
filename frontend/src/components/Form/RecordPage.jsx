import { useEffect, useState } from "react";

function save_recording(recordedChunks) {
    if (recordedChunks.length == 0) {
        return;
    }
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    window.URL.revokeObjectURL(url);
    recordedChunks = [];
}

async function toggle_recording(mediaRecorder, setMediaRecorder, isRecording, setIsRecording, recordedChunks, setRecordedChunks) {
    setIsRecording(!isRecording);
    if (!isRecording) {
        setRecordedChunks([]);
        if (!mediaRecorder) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaRecorder(new MediaRecorder(stream));
            mediaRecorder.ondataavailable = event => {
                console.log(event);
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            mediaRecorder.onstop = () => save_recording(recordedChunks);
            mediaRecorder.start(1000);
        }
    } else {
        console.log("stop recording");
        mediaRecorder.stop();
        setMediaRecorder(null);
    }
}

function RecordButton() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const display = isRecording ? "Stop" : "Start";

    return (
        <button type="button" onClick={() => toggle_recording(mediaRecorder, setMediaRecorder, isRecording, setIsRecording, recordedChunks, setRecordedChunks)}>{display} Recording</button>
    )
}

function RecordPage(props) {
    const readout_script = "This is a test script that the user will read out. Something something."
    
    return (<div>
        <h1>Read Aloud and Record</h1>
        <div>
            <p>
                {props.script}
            </p>
        </div>

        <RecordButton />
    </div>)
}

export default RecordPage;
  