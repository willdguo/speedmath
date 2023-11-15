import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Game from './pages/Game'
import Landing from './pages/Landing'
import LoadData from './utils/LoadData'
import saveGame from './services/saveGame'

function App() {

  const [toggle, setToggle] = useState(1)   // keeps track of game mode; 1 = countdown mode, 0 = race
  const [user, setUser] = useState(null)

  // checks if stored mode exists
  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    
    if(loggedUserJSON) {
      const saved = JSON.parse(loggedUserJSON)
      setUser(saved)
      saveGame.setToken(saved.token)
    }
    
    LoadData.checkToggle(setToggle)
  }, [])

  return (
    <Routes>
      <Route path="/" element={
          <Landing user={user} 
            setUser={setUser} 
            toggle={toggle}
            setToggle={setToggle}
          />
        }
      />
      <Route 
        path="/game" 
        element={
          <Game toggle={toggle} setToggle={setToggle}/>
        }
      />
      <Route path="/*" element={<Navigate replace to="/" />}/>
    </Routes>
  );

}


export default App;

