import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const firebaseConfig = {
  apiKey: "AIzaSyBmoCJJ-H4YkOMnb7J-L_UNX4M3jxCh9-M",
  authDomain: "iotproject101-5209a.firebaseapp.com",
  databaseURL: "https://iotproject101-5209a-default-rtdb.firebaseio.com",
  projectId: "iotproject101-5209a",
  storageBucket: "iotproject101-5209a.appspot.com",
  messagingSenderId: "926892985236",
  appId: "1:926892985236:web:d9f3251476d3691f4f9d81",
  measurementId: "G-WET4YBE9T3"
};

const apip = initializeApp(firebaseConfig);
const db = getDatabase(apip);

const turnLightOn = () => {
  // Update the value of /light1 to true
  set(ref(db, '/light1'), {
    light1: true,
  });
}

const turnLightOff = () => {
  // Update the value of /light1 to false
  set(ref(db, '/light1'), {
    light1: false,
  });
}

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript === "turn on light") {
      console.log("light on registered");
      turnLightOn();
      SpeechRecognition.stopListening();
    } else if (transcript === "turn off light") {
      console.log("light off registered");
      turnLightOff();
      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
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
