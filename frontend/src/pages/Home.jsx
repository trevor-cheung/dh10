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
    fetch("http://localhost:5000/api/get").then(
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
    fetch("http://localhost:5000/api/get_summary").then(
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
    fetch("http://localhost:5000/api/get_image").then(
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

    axios.post("http://localhost:5000/api/submit", { inputValue })
      .then(response => {
          console.log('Backend response:', response.data);
          window.location.reload(false)
      })
      .catch(error => {
          console.error('Error submitting input:', error);
      });
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
