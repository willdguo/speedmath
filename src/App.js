import React, { useState } from 'react'
import Game from './Game'
import restart from './icons/restart1.png'
import toggleImg from './icons/toggle2.png'
import dataImg from './icons/data1.png'
import themeImg from './icons/light1.png'
import LoadData from './components/LoadData'

function App() {

  const [displayProblems, setDisplayProblems] = useState('Show Problems')   // toggle visibility of problems; by default is not visible
  //change displayProblems to simple boolean?
  const [toggle, setToggle] = useState(1)   // keeps track of game mode; by default is set to countdown mode
  const [theme, setTheme] = useState(0)   // color mode (1 dark, 0 light)
  const [playing, setPlaying] = useState(0) // check when gameplay begins

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

  const closePopup = () => {
    document.getElementById('popup').style.display = 'none'
    setPlaying(1)
    // console.log('now playing!' + String(playing))

  }

  // css style for button icons. clean up for readability
  const buttonImgStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "transparent",
    marginLeft: "0"
  }

  const popupImgStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    padding: "1px 2px 1px"
  }

 
  // to do: allow user to change time/max race amt, as well as arithmetic bounds
  return (

    <div>

      <div id = "popup"> 

        <div id = "popup-content"> 

          <p id = "bold">Description</p>
          <p> Test your mental math capabilities. Each question has a nonnegative answer no greater than 400. </p> 
          <p> There are two modes: </p>

          <ul>
            <li> <strong>Countdown</strong>: Solve as many problems as you can in 120 seconds. </li>
            <li> <strong>Race</strong>: See how long it takes for you to solve 40 problems. </li>
          </ul>

          <p> Current Gamemode: {['Race', 'Countdown'][(toggle % 2)]}</p>

          <p onClick = {() => window.location.reload()}> <img src = {restart} style = {popupImgStyle} alt = "restart"/> Restart Button </p>
          <p onClick = {changeToggle}> <img src = {toggleImg} style = {popupImgStyle} alt = "toggle gamemode" /> Toggle gamemode </p>
          <p onClick = {toggleProblems}> <img src = {dataImg} style = {popupImgStyle} alt = "show problems" /> Show live problem data </p>
          <p onClick = {toggleColors}> <img src = {themeImg} style = {popupImgStyle} alt = "change theme" /> Invert colors </p>

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
        <Game toggle = {toggle} theme = {theme} playing = {playing} setPlaying = {setPlaying}/>
      </div>


    </div>

  );

}


export default App;

