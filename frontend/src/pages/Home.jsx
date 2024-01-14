import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'reactstrap'
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import Sidebar from '../components/SideBar';
import Search from '../components/Search';
import axios from 'axios'



const Home = (args) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


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
        'Authorization': `Bearer open ai key` // REMOVE KEY
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

    
      <div>
        <div className=" flex-row p-2 ">
          <Sidebar />
        </div>
        <div className="d-flex">
          <div className="p-2 flex-grow-1"></div>
          <div className="p-2 flex-grow-1 text-center">
            <div className="flex-column text-center">
              <h1 className='p-3'>I Need to Recycle...</h1>
              <Search onSubmit={handleFormSubmit}/>
              <div>
      <Button outline className="bi bi-mic m-3 px-2" onClick={ToggleMic}>
      </Button>
      <Button outline className="bi bi-question-circle m-3 px-2"  onClick={toggle}>

      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Welcome to "Name of App"!</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>
            Back
          </Button>
        </ModalFooter>
      </Modal>


      {(typeof data.response === 'undefined') ? (
           <p>Loading...</p>
        ) : (
          data.response.map((item, i) => (
            <p key={i}>{item}</p>
          ))
        )}

      {(typeof summary.response === 'undefined') ? (
           <p>Loading...</p>
        ) : (
          summary.response.map((item, i) => (
            <p key={i}>{item}</p>
          ))
        )}
        {(typeof image_data.response === 'undefined') ? (
           <p>Loading...</p>
        ) : (
          image_data.response.map((item, i) => (
            <p key={i}><img src={item} alt="loading image..."></img></p>
          ))
        )}


    </div>
            </div>
          </div>
          <div className="p-2 flex-grow-1"></div>
        </div>
        </div>
      

      

      
    
      
        
      

      










  )
}

export default Home
