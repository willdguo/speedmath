import React, { useState } from 'react'
import Game from './Game'

function App() {

  // toggle visibility of problems; by default is no visible
  const [displayProblems, setDisplayProblems] = useState('Show Problems')

  // keeps track of game mode; by default is set to countdown mode
  const [toggle, setToggle] = useState(0)

  const checkToggle = () => {

    if('toggle' in localStorage) {
      // console.log('hello')
      console.log(localStorage.getItem('toggle'))
      setToggle(parseInt(localStorage.getItem('toggle')) + 1)
    }

  }

  const checkProblems = () => {

    if('displayProblems' in localStorage) {

      const d = localStorage.getItem('displayProblems')
      
      if(d === 'hidden'){
        document.getElementById('problem-list').style.display = 'none'
        document.getElementById('graph').style.display = 'none'
        setDisplayProblems('Show Problems')
      }else {
        document.getElementById('problem-list').style.display = 'block'
        document.getElementById('graph').style.display = 'flex'
        setDisplayProblems('Hide Problems')
      }

    } else {
      document.getElementById('problem-list').style.display = 'none'
      document.getElementById('graph').style.display = 'none'

    }

  }

  // checks if stored mode exists
  window.onload = () => {

    checkToggle()
    checkProblems()

  }


  // change state of toggle buton
  function changeToggle() {
      setToggle(toggle + 1)
      localStorage.setItem('toggle', toggle)
      // console.log(toggle)
      window.location.reload()
  }
            
  // function to change visibility of past problems - stores past visibility state
  function toggleProblems () {

    if(displayProblems === 'Hide Problems'){
        setDisplayProblems('Show Problems')
        document.getElementById('problem-list').style.display = 'none'
        document.getElementById('graph').style.display = 'none' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'hidden')

    }else{
        setDisplayProblems('Hide Problems')
        document.getElementById('problem-list').style.display = 'block'
        document.getElementById('graph').style.display = 'flex' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'visible')

    }

  } 

  return (
    <div>

      <div id = "buttons">

        <button onClick = {() => window.location.reload()}> Restart </button>
        <button onClick = {changeToggle}> Toggle Mode </button>
        <button onClick = {toggleProblems}>  {displayProblems} </button>

      </div>      

      <div id = "main">
        <Game toggle = {toggle}/>
      </div>

    </div>
  );
}

export default App;
