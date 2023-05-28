import React, { useState } from 'react'
import Game from './Game'
import restart from './icons/restart1.png'
import toggleImg from './icons/toggle2.png'
import dataImg from './icons/data1.png'
import themeImg from './icons/light1.png'
import LoadData from './components/LoadData'

function App() {

  const [displayProblems, setDisplayProblems] = useState('Show Problems')   // toggle visibility of problems; by default is not visible
  const [toggle, setToggle] = useState(0)   // keeps track of game mode; by default is set to countdown mode
  const [theme, setTheme] = useState(0)   // color mode (1 dark, 0 light)
  const [playing, setPlaying] = useState(0)

  // checks if stored mode exists
  window.onload = () => {
    
    LoadData.checkToggle(setToggle)
    LoadData.checkProblems(setDisplayProblems)
    LoadData.checkTheme(setTheme)

  }

  
  // change state of toggle buton
  function changeToggle() {
      localStorage.setItem('toggle', toggle)
      window.location.reload()
  }
            

  // change visibility of past problems - stores past visibility state
  function toggleProblems () {

    if(displayProblems === 'Hide Problems'){

        setDisplayProblems('Show Problems')
        document.getElementById('problem-list').style.display = 'none'
        document.getElementById('graph').style.display = 'none' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'hidden')

    } else {

        setDisplayProblems('Hide Problems')
        document.getElementById('problem-list').style.display = 'block'
        document.getElementById('graph').style.display = 'flex' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'visible')

    }

  } 

  // toggle light/dark mode of the website
  function toggleColors () {

    setTheme((theme + 1) % 2)
    localStorage.setItem('theme', (theme + 1) % 2)
    LoadData.setColors((theme + 1) % 2)

  }

  // css style for button icons. clean up for readability
  const buttonImgStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "transparent",
    marginLeft: "0"
  }


  const closePopup = () => {
    document.getElementById('popup').style.display = 'none'
    setPlaying(1)
    console.log('it works it works it works!' + String(playing))

  }

  
  return (

    <div>

      <div id = "popup"> 

        <div id = "popup-content"> 
          <p id = "bold">Description</p>
          <p> Test your mental math capabilities. Each question has a nonnegative answer no greater than 400. There are two modes: </p>
          <ul>
            <li> <strong>Countdown</strong>: Solve as many problems as you can in 120 seconds. </li>
            <li> <strong>Race</strong>: See how long it takes for you to solve 40 problems. </li>
          </ul>

          <p> Code available on<a href = "https://github.com/willdguo/speedmath">GitHub</a> </p>
          <p> Inspired by<a href = "https://arithmetic.zetamac.com/">zetamac</a> </p>

          <button onClick = {closePopup}> Start </button>
        </div>

      </div>

      <div id = "buttons">

        <button onClick = {() => window.location.reload()}> <img src = {restart} style = {buttonImgStyle} alt = "restart"/> </button>
        <button onClick = {changeToggle}> <img src = {toggleImg} style = {buttonImgStyle} alt = "toggle gamemode" /> </button>
        <button onClick = {toggleProblems}> <img src = {dataImg} style = {buttonImgStyle} alt = "show problems" /> </button>
        <button onClick = {toggleColors} id = 'toggle'> <img src = {themeImg} style = {buttonImgStyle} alt = "change theme" /> </button>

      </div>      

      <div id = "main">
        <Game toggle = {toggle} theme = {theme} playing = {playing}/>
      </div>


    </div>

  );

}


export default App;

