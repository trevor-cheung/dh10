
import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Depots from './pages/Depots'
import Guidelines from './pages/Guidelines'


function App(args) { 



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
