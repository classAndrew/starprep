import { useEffect, useRef, useState } from "react";
import "../styles/Script.css";
import mic from "../assets/microphone-solid.svg";
function Script(props) {
  const [permission, setPermission] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  async function getMicPermission() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setPermission(true);
    setStream(audio);
  }

  async function startRecording() {
    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setStream(audio);
    setAudioChunks([]);

    // const media = new MediaRecorder(stream, { type: "audio/webm" });
    const media = new MediaRecorder(audio, { type: "audio/webm" });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  function stopRecording() {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
    };

    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    setIsRecording(false);
  }

  function submitRecording() {
    //creates a blob file from the audiochunks data
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

    let formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    fetch("http://localhost:8080/api/uploadAudio", {
      // mode: "no-cors",
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        props.setGrading(data);
        props.handleFormNavigate(1);
      });
  }

  return (
    <div>
      <div className="mic-container">
        <img src={mic} alt="Microphone" className="mic"/>
      </div>
      
      <div className="script-text-container">
        <h3>
          <b>Prompt</b>
        </h3>
        <p className="script-text">{props.script}</p>
        <div>
        <button onClick={startRecording} disabled={isRecording} type="button"
        className="script-record"
        >
          Start Recording Voice
        </button>
        <button onClick={stopRecording} disabled={!isRecording} type="button"
        className="script-stop"
        >
          Stop Recording Voice
        </button>
      </div>
      {audio ? (
        <>
          <div className="audio-container">
            <audio src={audio} controls></audio>
          </div>

          <button type="button" onClick={submitRecording}
            className="script-submit"
          >
            Submit
          </button>
        </>
      ) : null}
      </div>

 
   
    </div>
  );
}
export default Script;
