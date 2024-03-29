import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardTitle, CardBody, CardText, CardSubtitle } from 'reactstrap';
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
                <ModalHeader toggle={toggle}>Welcome to Bin Buddy!</ModalHeader>
                <ModalBody>

                  Introducing Bin Buddy, your ultimate companion in the quest for sustainable waste management! This app is designed to make sorting your waste a breeze, minimizing recycling contamination and contributing to a cleaner environment. With Bin Buddy, you can identify the appropriate bin for your items using the search feature, accessible through both voice and text input. Simply tell Bin Buddy what you're disposing of, and it will guide you to the correct disposal bin.
                  <h5>

                  </h5>
                  <h5 style={{color: 'green'}}>Try it! Enter an item to get started.</h5>
                </ModalBody>
                <ModalFooter>

                  <Button color="secondary" onClick={toggle}>
                    Back
                  </Button>
                </ModalFooter>
              </Modal>

              {((typeof data.response !== 'undefined') && (typeof summary.response !== 'undefined') && (typeof image_data.response !== 'undefined')) &&
                <Card className="m-3 p-3" >
                  <CardBody>
                    {
                      data.response.map((item, i) => (
                        <CardTitle tag="h2" className="p-3" key={i}>Item: {item}</CardTitle>
                      ))
                    }
                    {
                      image_data.response.map((item, i) => (
                        <p key={i}><img style={{width: '50%', height: '50%', justifyContent: 'center', textAlign: 'center'}} src={item} alt="loading image..."></img></p>
                      ))
                    }
                    {
                      summary.response.map((item, i) => (
                        <CardSubtitle tag="h4" className="p-3 mb-2" key={i}>Instructions: {item}</CardSubtitle>
                      ))
                    }
                    
                  </CardBody>
                </Card>
              }


            </div>
          </div>
        </div>
        <div className="p-2 flex-grow-1"></div>
      </div>
    </div>





















  )
}

export default Home
