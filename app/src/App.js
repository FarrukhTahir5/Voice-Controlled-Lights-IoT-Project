import Dictaphone from './Dictaphone';
import React from 'react';
import './App.css';
import WaveSurfer from 'wavesurfer';
import micLogo from './microphone.svg';

function App() {
  return (
    <div className="App bg-backg h-auto">
      
    {(true)?<div className='flex justify-center flex-col items-center  w-28 p-2 border rounded-full border-none bg-white'><img className='w-24' src={micLogo}/></div>:<>asd</> }
    {(true)?<div className='flex justify-center flex-col items-center'>Click here to Record</div>:<></>}{/* transcript */}
    <Dictaphone/>
    {/* <status/> */}
    </div>
  );
}

export default App;
