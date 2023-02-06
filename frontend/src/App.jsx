import MapComp from './components/MapComp'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const savedUser = JSON.parse(localStorage.getItem('user'))

  const [user, setUser] = useState({
    isLoggedIn: savedUser ? true : false
  })

  useEffect(()=>{

    /* global google */
    google.accounts.id.initialize({
      client_id: "",
      callback: handleSignInCallback
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large"}
    )
  }, [])


  async function handleSignInCallback(response) {
    const res = await axios.post('/api/login/', { id_token: response.credential })
    //if succesfull - save response res.data object to localstorage as user
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data))
      setUser({ isLoggedIn: true})
    }
    //if error Handle TODO
  }

  function handleLogout() {
    localStorage.removeItem('user')
    //refresh page TODO
  }

  return (
    <div className="App">
      <div className="header">
        <h3 className="title">MAPAPP</h3>
        <div className="sign-in-div" id="signInDiv"></div>
      </div>
      <MapComp/>
    </div>
  )
}

export default App