import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import MapComp from './MapComp'
import '../App.css'

function Main() {
  const savedUser = JSON.parse(localStorage.getItem('user'))

  //this doesn't verify if token stored is valid TODO
  const [user, setUser] = useState({
    isLoggedIn: savedUser ? true : false
  })

  useEffect(()=>{

    /* global google */
    google.accounts.id.initialize({
      client_id: "",
      callback: handleSignInCallback
    })
  }, [])

  useEffect(()=>{
    if (!user.isLoggedIn) {
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: "outline", size: "large"}
      )
    } else {
      //get routes
    }
  }, [user.isLoggedIn])


  async function handleSignInCallback(response) {
    try {
      const res = await axios.post('/api/login/', { id_token: response.credential })
      //if succesfull - save response res.data object to localstorage as user
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser({ isLoggedIn: true })
        document.getElementById('signInDiv').hidden = true
      }
    } catch(err) { 
      if (err.response.data.message) {toast.error(err.response.data.message) }
      else {toast.error(err.message)}
    }
    //if error Handle TODO
  }

  function handleLogout() {
    localStorage.removeItem('user')
    setUser({ isLoggedIn: false })
    //refresh page TODO
  }

  //inputs
  const [inputs, setInputs] = useState({
    coordinates: [],
    geoCoordinates: [],
    distance: 0,
    md: 0,
    tas: 0,
    ws: 0,
    wta: 0
  })

  function setCoordinates(cordArr) {
    setInputs((prevState) => {
      return {
        ...prevState, coordinates: cordArr
      }
    })
  }

  function setGeoCoordinates(cordArr) {
    setInputs((prevState) => {
      return {
        ...prevState, geoCoordinates: cordArr
      }
    })
  }

  function setDistance(distance) {
    setInputs((prevState) => {
      return {
        ...prevState, distance: distance
      }
    })
  }

  function handleInputs(evt) {
    evt.preventDefault()
    setInputs((prevState)=>{
      return {
        ...prevState,
        [evt.target.id]: evt.target.value
      }
    })
  }

  async function sendDataToCalculate(data) {
    //save response in localstorage for form generation TODO
    try {
      const res = await axios.post('/api/calc', data)
      console.log(res.data)
    } catch(err) { 
      if (err.response.data.message) {toast.error(err.response.data.message) }
      else {toast.error(err.message)}
    }
  }

  async function saveData(token, data) {
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await axios.post('/api/me', data, config)
      console.log(res.data)
    } catch(err) { 
      if (err.response.data.message) {toast.error(err.response.data.message) }
      else {toast.error(err.message)}
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h3 className="title">MAPAPP</h3>
        <div className="sign-in-div" id="signInDiv"></div>
        {
          user.isLoggedIn 
          &&
          <div className="logged-in-div">
            <img src={savedUser.picture} style={{height: "30px"}}></img>
            <h4>{savedUser.name}</h4>
            <button onClick={handleLogout}>logout</button>
          </div> 
        }
      </div>
      <MapComp setCoordinates={setCoordinates} setGeoCoordinates={setGeoCoordinates} setDistance={setDistance}/>
      <label>magnetic declination:</label>
      <input type="number" id="md" onChange={handleInputs} value={inputs.md}></input><br></br>
      <label>true air speed:</label>
      <input type="number" id="tas" onChange={handleInputs} value={inputs.tas}></input><br></br>
      <label>wind speed:</label>
      <input type="number" id="ws" onChange={handleInputs} value={inputs.ws}></input><br></br>
      <label>wind true angle:</label>
      <input type="number" id="wta" onChange={handleInputs} value={inputs.wta}></input><br></br>
      <button onClick={()=>{console.log(inputs)}}>log inputs state</button>
      <button onClick={()=>{
        sendDataToCalculate({
          coordinates: inputs.coordinates, 
          geoCoordinates: inputs.geoCoordinates,
          distance: inputs.distance, 
          md: Number(inputs.md), 
          tas: Number(inputs.tas), 
          ws: Number(inputs.ws), 
          wta: Number(inputs.wta)
        })
        }}>
        send data to calc
      </button>
      <button onClick={()=>{
        saveData(savedUser.token, {
          coordinates: inputs.coordinates,
          geoCoordinates: inputs.geoCoordinates,
          md: Number(inputs.md), 
          tas: Number(inputs.tas), 
          ws: Number(inputs.ws), 
          wta: Number(inputs.wta)
        })
        }}>
        save data
      </button>
      <button onClick={()=>{window.open('/form')}}>open form</button>
    </div>
  )
}

export default Main