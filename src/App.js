import React, { useEffect, useState } from 'react'
import Game from './Game'
import restart from './icons/restart1.png'
import toggleImg from './icons/toggle2.png'
import dataImg from './icons/data1.png'
import themeImg from './icons/light1.png'
import LoadData from './components/LoadData'
import saveGame from './services/saveGame'

function App() {

  const [displayProblems, setDisplayProblems] = useState(0)   // toggle visibility of problems; by default is not visible
  const [toggle, setToggle] = useState(1)   // keeps track of game mode; by default is set to countdown mode
  const [theme, setTheme] = useState(0)   // color mode (1 dark, 0 light)
  const [playing, setPlaying] = useState(0) // check when gameplay begins
  const [lower, setLower] = useState('10') // problem numbers lower bound
  const [upper, setUpper] = useState('100') // problem numbers upper bound
  const [maxParam, setMaxParam] = useState('120') //default parameter
  const [popup, setPopup] = useState(true)

  // checks if stored mode exists
  useEffect(() => {
    
    LoadData.checkToggle(setToggle, setMaxParam)
    LoadData.checkProblems(setDisplayProblems)
    LoadData.checkTheme(setTheme)

  }, [])
  
  function changeToggle() {
      localStorage.setItem('toggle', (toggle % 2))
      window.location.reload()
  }
            
  function toggleProblems () {

    if(displayProblems === 1){
        setDisplayProblems(0)
        localStorage.setItem('displayProblems', 0)
    } else {
        setDisplayProblems(1)
        localStorage.setItem('displayProblems', 1)
    }

  } 

  // toggle light/dark mode of the website
  function toggleColors () {
    setTheme((theme + 1) % 2)
    localStorage.setItem('theme', (theme + 1) % 2)
    console.log(theme)
  }

  const changeLower = (e) => {
    const input = e.target.value

    if(!isNaN(input) && parseInt(input) <= parseInt(upper)){
      setLower(input)
      console.log(input)
    } else if(input === ""){
      setLower(input)
    }

  }

  const changeUpper = (e) => {
    const input = e.target.value

    if(!isNaN(input) && parseInt(input) >= parseInt(lower)){
      setUpper(input)
      console.log(input)
    } else if(input === ""){
      setUpper(input)
    }

  }

  const changeMaxParam = (e) => {
    const input = e.target.value

    if(!isNaN(input)){
      setMaxParam(input)
    }

  }



  const showPopup = () => (    
    <div className = {`popup ${theme ? '' : 'dark'}`}> 

      <div className = "description">

        <p className = "bold">Description</p>
        <p> Test your mental math capabilities. Each question has a nonnegative answer no greater than {Math.max(4 * lower * lower, 2 * upper)}. </p> 
        <p> There are two modes: </p>

        <ul>
          <li> <strong>Countdown</strong>: Solve as many problems as you can in 120 seconds. </li>
          <li> <strong>Race</strong>: See how long it takes for you to solve 40 problems. </li>
        </ul>

        <p> Code available on <a href = "https://github.com/willdguo/speedmath">GitHub</a> </p>
        <p> Inspired by <a href = "https://arithmetic.zetamac.com/">zetamac</a> </p>

      </div>

      <div className = "game-settings">

        <p> Current Gamemode: {['Race', 'Countdown'][(toggle % 2)]}</p>

        <div className = "bounds">
          <p> Max {['points ', 'time '][toggle % 2]} : <input value = {maxParam} onChange = {changeMaxParam} /> </p>

          <p> Lower bound: <input onChange = {changeLower} value = {lower} /> </p>
          <p> Upper Bound: <input onChange = {changeUpper} value = {upper} /> </p>

          <div className = "paragraph-popup-container">
            <div className = "paragraph-popup-hover"> 
              (What do these bounds mean?) 
            </div>

            <div className = "paragraph-popup"> 
              <dl> Each problem has 2 numbers which are generated i.i.d. uniformly at random as follows:
                <li> Addition: each summand is in the range (lower, upper) </li>
                <li> Subtraction: the minuend/subtrahend fall between (lower, 2 * upper) </li>
                <li> Multiplication: the multipliers fall between (1, 2 * lower) </li>
                <li> Division: the answer is in the range (1, 2 * lower) and the dividend is in the range (1, 4 * lower * lower) </li>
              </dl>              
            </div>
          </div>

        </div>

        <p onClick = {() => window.location.reload()}> <img src = {restart} alt = "restart"/> Restart Button </p>
        <p onClick = {changeToggle}> <img src = {toggleImg} alt = "toggle gamemode" /> Toggle gamemode </p>
        <p onClick = {toggleProblems}> <img src = {dataImg} alt = "show problems" /> Show live problem data </p>
        <p onClick = {toggleColors}> <img src = {themeImg} alt = "change theme" /> Invert colors </p>

        <button onClick = {() => {setPopup(false); setPlaying(1)}}> Start </button>

      </div>

    </div>
  )


  return (

    <div className = {`container ${theme ? '' : 'dark'}`}>

      <div className = "buttons">

        <button onClick = {() => window.location.reload()}> <img src = {restart} alt = "restart"/> </button>
        <button onClick = {changeToggle}> <img src = {toggleImg} alt = "toggle gamemode" /> </button>
        <button className = "showProblems" onClick = {toggleProblems}> <img src = {dataImg} alt = "show problems" /> </button>
        <button onClick = {toggleColors} > <img src = {themeImg} alt = "change theme" /> </button>

      </div>  

      {popup 
        ? showPopup() : 
        <Game toggle = {toggle} theme = {theme} playing = {playing} setPlaying = {setPlaying} bounds = {[parseInt(lower), parseInt(upper)]} maxParams={maxParam} displayProblems = {displayProblems}/>
      }


    </div>

  );

}


export default App;

