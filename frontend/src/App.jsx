
import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Depots from './pages/Depots'
import Guidelines from './pages/Guidelines'


function App(args) {

  

    // TODO: Implement this function with media recorder API and convert to mp3 file
  let can_record = false;
  let is_recording = false;
  let recorder = null;
  
  let chunks = [];
  
  const setupAudio = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
          chunks.push(e.data);
        };
        recorder.onstop = e => {
          const blob = new Blob(chunks, { type: 'audio/mp3' });
          chunks = [];
          const audioURL = URL.createObjectURL(blob);
          callWhisper(blob);
          const audio = new Audio(audioURL);
          //audio.play();
        }
        can_record = true;
      });
    }
  };
setupAudio();

const callWhisper = (blob) => {
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('model', 'whisper-1') // formData for Whisper-1

  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      'Authorization': `Bearer api-key` // REMOVE KEY
    }
  };

  const response = axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config).then(response => {
    console.log(response.data.text);
    handleFormSubmit(response.data.text); // this line submits the text to the backend
    return response.data.text;
  }).catch(error => { console.log(error) });
  return response;
}

  const ToggleMic = () => {
    if (!can_record) return;
    
    is_recording = !is_recording;

    if (is_recording) {
      recorder.start();
    } else {
      recorder.stop();
      can_record = true;
    }
  };
    



  return (


    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/depots' element = {<Depots/>}/>
        <Route path = '/guidelines' element = {<Guidelines/>}/>
        
      </Routes>
</BrowserRouter>
    



  )
}

export default App
