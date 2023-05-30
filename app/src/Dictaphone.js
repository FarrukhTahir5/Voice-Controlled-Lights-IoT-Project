import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import micLogo from './microphone.svg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import AudioVisualizer from './AudioVisualizer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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
  set(ref(db, 'light1'), {
    light1: true,
  });
};

const turnLightOff = () => {
  // Update the value of /light1 to false
  set(ref(db, 'light1'), {
    light1: false,
  });
};


const Dictaphone = () => {
  const [showAsd, setShowAsd] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptTimer, setTranscriptTimer] = useState(null);
  const [lightStatus, setLightStatus] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript === 'turn on light') {
      console.log('light on registered');
      turnLightOn();
      SpeechRecognition.stopListening();
    } else if (transcript === 'turn off light') {
      console.log('light off registered');
      turnLightOff();
      SpeechRecognition.stopListening();
    }


    // Reset transcript timer whenever the listening state changes
    clearTimeout(transcriptTimer);
    if (!listening && transcript !== '') {
      setTranscriptTimer(
        setTimeout(() => {
          resetTranscript();
          setShowTranscript(false);
        }, 1000)
      );
    }
    firebase.initializeApp(firebaseConfig);
    // Show transcript if not empty
    setShowTranscript(transcript !== '');
  }, [transcript, resetTranscript, listening,transcriptTimer]);
useEffect(() => {
    // Create a Firebase database reference
    const databaseRef = firebase.database().ref('light1/light1');

    // Listen for changes in the database value
    databaseRef.on('value', (snapshot) => {
      const lightValue = snapshot.val();
      setLightStatus(lightValue);
    });
    return () => {
      databaseRef.off();
    };
  }, []);

  const handleMicClick = () => {
    setShowAsd(true);
    SpeechRecognition.startListening();
    setupAudio();
  };

  const setupAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserNode);

        const draw = () => {
          analyserNode.getByteTimeDomainData(dataArray);
          setAudioData([...dataArray]);

          if (showAsd && listening) {
            requestAnimationFrame(draw);
          }
        };

        draw();
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {listening ? (
        <>
          <div className='flex justify-center flex-col items-center mt-40'>
            <AudioVisualizer/>
          </div>
          <div className='h-16 mt-0'>{showTranscript && <div className='text-white font-light text-xl'>{transcript}</div>}</div>
        </>
      ) : (
        <div
          onClick={handleMicClick}
          className='flex justify-center flex-col items-center mt-40  mb-24 w-44 p-2 border rounded-full border-none bg-micg ml-auto mr-auto'
        >
          <img className='w-44' src={micLogo} alt='Microphone' />
        </div>
      )}
      <div className='text-white font-light text-5xl'>
        Light Status: {lightStatus ? 'On' : 'Off'}
      </div>
    </div>
  );
};

export default Dictaphone;