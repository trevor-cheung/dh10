import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './InputForm';
import axios from 'axios'
import DataButton from './DataButton';

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
