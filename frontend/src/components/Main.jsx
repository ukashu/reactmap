import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import MapComp from './MapComp'
import Flight from './Flight'
import '../App.css'

function Main() {
  const savedUser = JSON.parse(localStorage.getItem('user'))
  const savedFlight = localStorage.getItem('saved-flight')

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
    localStorage.removeItem('saved-flight')
    setUser({ isLoggedIn: false })
    window.location.reload()
  }

  const [flights, setFlights] = useState([])
  const [flightComponents, setFlightComponents] = useState([])

  //login useEffect
  useEffect(()=>{
    if (!user.isLoggedIn) {
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: "outline", size: "large"}
      )
    } else {
      //get routes
      getSaved(savedUser.token)
    }
  }, [user.isLoggedIn])

  useEffect(()=>{
    if (flights.length > 0) {
      console.log('now flights are different')
      setFlightComponents(renderFlights())
    }
  }, [flights])

  //render users saved Flights
  function renderFlights() {
    let flightsArr = flights.map((item)=>{
      return <Flight setStored={()=>{
        localStorage.setItem('saved-flight', JSON.stringify({
          coordinates: item.coordinates,
          name: item.name,
          md: item.md,
          wta: item.wta,
          ws: item.ws,
          tas: item.tas
          }))
          window.location.reload()
        }} key={item.id} id={item.id} name={item.name} date={item.date_added}></Flight>
    })
    return flightsArr
  }

  //inputs
  const [inputs, setInputs] = useState({
    coordinates: [],
    geoCoordinates: [],
    name: "",
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

  function loadInputs(name, data) {
    setInputs((prevState)=>{
      return {
        ...prevState,
        [name]: data
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

  async function getDeclination(data) {
    try {
      const res = await axios.post('/api/declination', data)
      console.log(res.data.declination)
      setInputs((prevState)=>{
        return {
          ...prevState,
          md: res.data.declination
        }
      })
    } catch(err) { 
      if (err.response.data.message) {toast.error(err.response.data.message) }
      else {toast.error(err.message)}
    }
  }

  async function getWind(data) {
    try {
      const res = await axios.post('/api/wind', data)
      console.log(res.data)
      setInputs((prevState)=>{
        return {
          ...prevState,
          ws: res.data.ws,
          wta: res.data.wta
        }
      })
    } catch(err) { 
      if (err.response.data.message) {toast.error(err.response.data.message) }
      else {toast.error(err.message)}
    }
  }

  async function getSaved(token) {
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await axios.get('/api/me', config)
      setFlights(res.data)
    } catch(err) { 
      if (err.response.data.message) {
        //logout if token expired or sth
        if (err.response.statusText === "Unauthorized") {handleLogout()}
        toast.error(err.response.data.message) 
      }
      else {toast.error(err.message)}
    }
  }

  async function sendDataToCalculate(data) {
    //save response in localstorage for form generation TODO
    try {
      const res = await axios.post('/api/calc', data)
      console.log(res.data)
      window.open('/form')
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
            <button id="logout" className="small-button" onClick={handleLogout}>logout</button>
          </div> 
        }
      </div>
      <div className="map_and_inputs">
        <MapComp savedFlight={savedFlight}
          setCoordinates={setCoordinates}
          setGeoCoordinates={setGeoCoordinates}
          setDistance={setDistance}
          loadInputs={loadInputs}
          />
        <div className="inputs">
          <div>
            <label>magnetic declination:</label>
            <button id="MD-auto" onClick={()=>{
              getDeclination({geoCoordinates: inputs.geoCoordinates})
            }}>auto</button>
            <input className="input" type="number" id="md" onChange={handleInputs} value={inputs.md}></input>
          </div>
          <div>
            <label>true air speed:</label>
            <input className="input" type="number" id="tas" onChange={handleInputs} value={inputs.tas}></input>
          </div>
          <div>
            <label>wind speed:</label>
            <button id="wind-auto" onClick={()=>{
              getWind({geoCoordinates: inputs.geoCoordinates})
            }}>auto</button>
            <input className="input" type="number" id="ws" onChange={handleInputs} value={inputs.ws}></input>
          </div>
          <div>
            <label>wind true angle:</label>
            <input className="input" type="number" id="wta" onChange={handleInputs} value={inputs.wta}></input>
          </div>
          <div>
            <label>flight name</label>
            <input className="input" type="string" id="name" onChange={handleInputs} value={inputs.name}></input>
          </div>
          <button className="button" id="log-inputs" onClick={()=>{console.log(inputs)}}>log inputs state</button>
          <button className="button" id="send-data-to-calc" onClick={()=>{
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
          <button className="button" id="save-data" onClick={()=>{
            if (!savedUser || !savedUser.token) {return toast.error('Not logged in')}
            saveData(savedUser.token, {
              name: inputs.name,
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
          <button className="button" id="open-as-a-form"onClick={()=>{window.open('/form')}}>open as a form</button>
        </div>
      </div>
      <button id="undo" className="small-button">undo</button>
      <button className="small-button" onClick={()=>{
        localStorage.removeItem('saved-flight')
        window.location.reload()
        }}
      id="clear">clear
      </button>
      <div className="flight_container" id="savedFlights">
        {flightComponents}
      </div>
    </div>
  )
}

export default Main