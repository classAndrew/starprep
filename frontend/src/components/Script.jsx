import { useEffect, useRef, useState } from "react";

function Script() {
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
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };

    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    setIsRecording(false);
  }

  return (
    <div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          eget lobortis mi, at finibus massa. Praesent mattis posuere libero et
          auctor. Donec consequat augue sit amet tortor maximus sagittis.
          Praesent nulla felis, placerat et ex non, mollis pretium magna. Sed
          mattis nunc nec ipsum interdum tempus. Aliquam vulputate finibus metus
          sit amet pharetra. Vestibulum at turpis pretium, pretium magna ut,
          facilisis felis. Suspendisse mollis nunc ut odio euismod pellentesque.
          Donec non enim quis nunc sagittis mattis in quis massa. Fusce mollis,
          est a dapibus dictum, magna turpis tincidunt tellus, vitae dictum
          augue justo in purus. Proin dignissim tellus efficitur lacus malesuada
          imperdiet. Phasellus sit amet libero a quam fermentum vulputate. Nulla
          facilisi. Suspendisse nec nisi ut felis pellentesque lobortis vitae
          eget urna. Morbi vehicula ex augue, a hendrerit lacus dapibus at.
          Integer id mauris tempus mi semper volutpat et feugiat metus. Donec
          mollis, eros in molestie malesuada, velit leo scelerisque sapien,
          dignissim molestie nisl enim ut augue. Proin in velit sit amet neque
          imperdiet lacinia ut placerat nibh. Duis vitae porta lorem.
        </p>
      </div>

      <div>
        <button onClick={startRecording} disabled={isRecording} type="button">
          Start Recording Voice
        </button>
        <button onClick={stopRecording} disabled={!isRecording} type="button">
          Stop Recording Voice
        </button>
      </div>

      {audio ? (
        <>
          <div className="audio-container">
            <audio src={audio} controls></audio>
          </div>

          <button>Submit</button>
        </>
      ) : null}
    </div>
  );
}
export default Script;
