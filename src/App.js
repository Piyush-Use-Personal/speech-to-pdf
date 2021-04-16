import React, {useState, useRef} from "react";
import Pdf from "react-to-pdf";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";

const ref = React.createRef();
export default function App() {

 
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  return (
    <div className="App">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          Click to start listening
        </div>
    <br/>
        <div className="microphone-status">
          {isListening ? `Listening.........${`the speech is: ${transcript} ` }` : ""}
        </div>
    <br/>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}

<div>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <><button onClick={toPdf}>Generate Pdf</button><br/></>}
      </Pdf>
      <div ref={ref}>
        <h1>Recorded Words</h1>
        <h2>{transcript}</h2>
      </div>
      </div>
    </div>
  );
}