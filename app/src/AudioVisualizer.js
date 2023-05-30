import React, { Component } from 'react';
import './AudioVisualizer.css';

class AudioVisualizer extends Component {
  constructor(props) {
    super(props);

    this.visualMainElement = React.createRef();
    this.visualValueCount = 16;
    this.visualElements = [];
  }

  componentDidMount() {
    this.init();
  }

  createDOMElements = () => {
    const visualMainElement = this.visualMainElement.current;
    for (let i = 0; i < this.visualValueCount; ++i) {
      const elm = document.createElement('div');
      visualMainElement.appendChild(elm);
      this.visualElements.push(elm);
    }
  };

  init = () => {
    // Creating initial DOM elements
    this.visualElements = [];
    this.visualMainElement.current.innerHTML = '';
    this.createDOMElements();

    // Swapping values around for a better visual effect
    const dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 12, 14: 13, 15: 14 };

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const processFrame = (data) => {
      const values = Object.values(data);
      for (let i = 0; i < this.visualValueCount; ++i) {
        const value = values[dataMap[i]] / 255;
        const elmStyles = this.visualElements[i].style;
        elmStyles.transform = `scaleY(${value})`;
        elmStyles.opacity = Math.max(0.25, value);
      }
    };

    const processError = () => {
      this.visualMainElement.current.classList.add('error');
      this.visualMainElement.current.innerText =
        'Please allow access to your microphone in order to see this demo.\nNothing bad is going to happen... hopefully :P';
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        this.connectStream(stream, audioContext, processFrame);
      })
      .catch((error) => {
        processError(error);
      });
  };

  connectStream = (stream, audioContext, processFrame) => {
    this.analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.fftSize = 32;

    this.initRenderLoop(processFrame);
  };

  initRenderLoop = (processFrame) => {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    const renderFrame = () => {
      this.analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);

      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  };

  render() {
    return (
      <main ref={this.visualMainElement}>
        <button onClick={this.init}>Start</button>
      </main>
    );
  }
}

export default AudioVisualizer;
