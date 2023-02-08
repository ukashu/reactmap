import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Main from './components/Main'
import Form from './components/Form'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Main/>}/>
          <Route exact path='/form' element={<Form/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
    
  )
}

export default App