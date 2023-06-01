import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import micLogo from './microphone.png';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import AudioVisualizer from './AudioVisualizer';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "FILL WITH YOUR DETAILS",
  authDomain: "FILL WITH YOUR DETAILS",
  databaseURL: "FILL WITH YOUR DETAILS",
  projectId: "FILL WITH YOUR DETAILS",
  storageBucket: "FILL WITH YOUR DETAILS",
  messagingSenderId: "FILL WITH YOUR DETAILS",
  appId: "FILL WITH YOUR DETAILS",
  measurementId: "FILL WITH YOUR DETAILS"
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
    if (transcript === 'turn off light'||transcript === 'turn light off'||transcript === 'light off'||transcript === 'of'||transcript === 'turn off') {
      console.log('light on registered');
      turnLightOn();
      SpeechRecognition.stopListening();
    } else if (transcript === 'turn on light'||transcript === 'turn light on'||transcript === 'light on'||transcript === 'on'||transcript === 'turn on') {
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
          <div className='flex justify-center flex-col items-center mt-24'>
            <AudioVisualizer/>
          </div>
          <div className='h-16 mt-0'>{showTranscript && <div className='text-texx font-light text-xl'>{transcript}</div>}</div>
        </>
      ) : (
        <div>
          <div
          onClick={handleMicClick}
          className='flex justify-center flex-col items-center mt-24  mb-10 w-36 h-36 p-2 border rounded-full border-none bg-micg ml-auto mr-auto'
        >
          <img className='w-12' src={micLogo} alt='Microphone' />
        </div>
      <div  className='text-texx font-light text-5xl mb-10'>Click here to Record</div></div>
      )}
      <div className='text-texx font-light text-3xl'>
        Light Status: {lightStatus ? 'Off' : 'On'}
      </div>
    </div>
  );
};

export default Dictaphone;