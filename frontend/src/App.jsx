import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './InputForm';
import axios from 'axios'

function App() {


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
        
      </div>
      
    </>
  )
}

export default App
