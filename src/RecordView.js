import { useReactMediaRecorder } from "react-media-recorder";
import { useState } from "react";

const RecordView = () => {
    let [responseUrl, setResponseUrl] = useState(null)

    

let onRecordingStart = () => {
    console.log("recording started -------------")
}
let onRecordingStop = async (blobUrl, blob) => {
    console.log("recording stopped -------------")


    // *************************************************************    make a call to fetch audio data ***********************************************

    const response = await fetch("https://api.publicapis.org/entries", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        //   'Content-Type': 'application/json'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      let data = response.json();


     // *************************************************************   end **************************************************   
    console.log(blobUrl, blob)



    // use actual response from the api response instead of blobUrl
    setResponseUrl(blobUrl)
}

const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true, screen: false, onStart: onRecordingStart, onStop: onRecordingStop });
    
let recordingStart = () => {
    setResponseUrl(null)
    startRecording()
}
let recordingStop = () => {
    stopRecording()
}
  

  return (
    <div>
      <p>{status}</p>
      <button onClick={recordingStart}>Start Recording</button>
      <button onClick={recordingStop}>Stop Recording</button>
      <br></br>
      <br></br>
      <br></br>
      {!!responseUrl && <audio src={responseUrl} controls autoPlay />}
      
    </div>
  );
};

export default RecordView