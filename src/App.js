import React, { useState } from 'react'
import Game from './Game'

import Toggle from './Toggle'

function App() {

  // keeps track of score
  const [score, setScore] = useState(0)

  const [toggle, setToggle] = useState(0)

  window.onload = () => {

    if('toggle' in localStorage) {
      console.log('hello')
      console.log(localStorage.getItem('toggle'))
      setToggle(parseInt(localStorage.getItem('toggle')) + 1)
    }

  }

  function changeToggle() {
      setToggle(toggle + 1)
      localStorage.setItem('toggle', toggle)
      console.log(toggle)
      window.location.reload()
  }

  return (
    <div>

      <p id = "score"> Score: {score}</p>
      <Toggle toggle = {toggle} score = {score}/>

      { /* <button onClick = {() => console.log(time)}> click me </button> */ }

      <div id = "main">
        <Game score = {score} setScore = {setScore}/>
      </div>

      <button onClick = {() => window.location.reload()}> Restart </button>
      <button onClick = {changeToggle}> Toggle Mode </button>


    </div>
  );
}

export default App;
