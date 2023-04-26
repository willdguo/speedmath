import React, { useState } from 'react'
import Game from './Game'
import Timer from './Timer'

function App() {

  // keeps track of score
  const [score, setScore] = useState(0)

  
  return (
    <div>

      <p> Score: {score}</p>
      <Timer />

      { /* <button onClick = {() => console.log(time)}> click me </button> */ }

      <div id = "main">

        <Game score = {score} setScore = {setScore}/>

      </div>

      <button onClick = {() => window.location.reload()}> Restart </button>


    </div>
  );
}

export default App;
