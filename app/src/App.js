import React from 'react';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import 'firebase/database';
import Dictaphone from './Dictaphone';

class App extends React.Component {
  componentDidMount() {
    // Initialize Firebase
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

    const apip=initializeApp(firebaseConfig);
    this.database = apip.database();
  }

  

  render() {
    return (
      <div>
        <Dictaphone/>
        <button onClick={this.convertSpeechToText}>Convert Voice to Text</button>
      </div>
    );
  }
}

export default App;
