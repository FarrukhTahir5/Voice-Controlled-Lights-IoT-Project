import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const turnLightOn = () => {
    // Update the value of /light1 to true
    this.database.ref('light1').set(true);
  }

 const turnLightOff = () => {
    // Update the value of /light1 to false
    this.database.ref('light1').set(false);
  }
const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  console.log(transcript);
  if (transcript === "turn on light") {
    console.log("light on registered");
    turnLightOn();
  } else if (transcript === "turn off light") {
    console.log("light off registered");
    turnLightOff();
  }
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;