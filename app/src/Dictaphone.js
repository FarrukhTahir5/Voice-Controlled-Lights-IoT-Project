import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import micLogo from './microphone.svg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const audioTest = async () => {
if (navigator.mediaDevices.getUserMedia !== null) {
    const options = {
      video: false,
      audio: true,
    };
     try {
        const stream = await navigator.mediaDevices.getUserMedia(options);        
        const audioCtx = new AudioContext(); 
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;       
        const audioSrc = audioCtx.createMediaStreamSource(stream);
        audioSrc.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);



     }catch (err) {
      // error handling
      }
}
}

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
  const analyserCanvas = React.useRef(null);
  const [showAsd, setShowAsd] = useState(false);
  const [audioData, setAudioData] = useState(null);
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
  }, [transcript]);

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
          <canvas ref={analyserCanvas} className=""></canvas>
          </div>
          <div>{transcript}</div>
        </>
      ) : (
        <div
          onClick={handleMicClick}
          className='flex justify-center flex-col items-center mt-40 w-44 p-2 border rounded-full border-none bg-micg ml-auto mr-auto'
        >
          <img className='w-44' src={micLogo} alt='Microphone' />
        </div>
      )}

      {showAsd && listening && audioData && (
        <div className='sound-wave-container'>
          {audioData.map((value, index) => (
            <div
              key={index}
              className='sound-wave-bar'
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      )}
      <div className='text-white font-light text-5xl mt-10'>Light Status: Off</div>
    </div>
  );
};

export default Dictaphone;
