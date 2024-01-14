import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './InputForm';
import axios from 'axios'
import DataButton from './DataButton';
import Record from './Record';
import dotenv from 'dotenv';

function App() {


  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get").then(
      res => {
        return res.json();
      }
    ).then(
      data => {
        setData(data);
        console.log(data);
      });
  }, []);

  const [summary, setSummary] = useState([{}]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get_summary").then(
      res => {
        return res.json();
      }
    ).then(
      summary => {
        setSummary(summary);
        console.log(summary);
      });
  }, []);

  const [image_data, setImageData] = useState([{}]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/get_image").then(
      res => {
        return res.json();
      }
    ).then(
      image_data => {
        setImageData(image_data);
        console.log(image_data);
      });
  }, []);

  const handleFormSubmit = (inputValue) => {

    axios.post("http://127.0.0.1:5000/api/submit", { inputValue })
      .then(response => {
          console.log('Backend response:', response.data);
          window.location.reload(false)
      })
      .catch(error => {
          console.error('Error submitting input:', error);
      });
  };

  

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
      'Authorization': `Bearer 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` // REMOVE KEY
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
    <>
      <div>

      <InputForm onSubmit={handleFormSubmit} />

      

      {(typeof data.response === 'undefined') ? (
           <p>Loading...</p>
        ) : (
          data.response.map((item, i) => (
            <p key={i}>{item}</p>
          ))
        )}

      <Record recordVoice={ ToggleMic } />
        
      </div>
      
    </>
  )
}

export default App
