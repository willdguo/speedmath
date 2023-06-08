import React, { useEffect, useState } from 'react'
import Game from './Game'
import restart from './icons/restart1.png'
import toggleImg from './icons/toggle2.png'
import dataImg from './icons/data1.png'
import themeImg from './icons/light1.png'
import LoadData from './components/LoadData'
import saveGame from './services/saveGame'

function App() {

  const [displayProblems, setDisplayProblems] = useState('Show Problems')   // toggle visibility of problems; by default is not visible
  const [toggle, setToggle] = useState(1)   // keeps track of game mode; by default is set to countdown mode
  const [theme, setTheme] = useState(0)   // color mode (1 dark, 0 light)
  const [playing, setPlaying] = useState(0) // check when gameplay begins
  const [lower, setLower] = useState('10') // problem numbers lower bound
  const [upper, setUpper] = useState('100') // problem numbers upper bound
  const [maxParam, setMaxParam] = useState('120') //default parameter

  // checks if stored mode exists
  useEffect(() => {
    
    LoadData.checkToggle(setToggle, setMaxParam)
    LoadData.checkProblems(setDisplayProblems)
    LoadData.checkTheme(setTheme)
    saveGame.getAll()

  }, [])

  
  // change state of toggle buton
  function changeToggle() {
      localStorage.setItem('toggle', (toggle % 2))
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

    if(lower === ""){
      setLower(10)
    }

    if(upper === ""){
      setUpper(100)
    }

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

 
  // to do: allow user to change time/max race amt, as well as arithmetic bounds
  return (

    <div>

      <div id = "popup"> 

          <div id = "description">

            <p id = "bold">Description</p>
            <p> Test your mental math capabilities. Each question has a nonnegative answer no greater than {Math.max(4 * lower * lower, 2 * upper)}. </p> 
            <p> There are two modes: </p>

            <ul>
              <li> <strong>Countdown</strong>: Solve as many problems as you can in 120 seconds. </li>
              <li> <strong>Race</strong>: See how long it takes for you to solve 40 problems. </li>
            </ul>

            <p> Code available on<a href = "https://github.com/willdguo/speedmath">GitHub</a> </p>
            <p> Inspired by<a href = "https://arithmetic.zetamac.com/">zetamac</a> </p>

          </div>

          <div id = "game-settings">

            <p> Current Gamemode: {['Race', 'Countdown'][(toggle % 2)]}</p>


            <div id = "bounds">
              <p> Max {['points ', 'time '][toggle % 2]} : <input value = {maxParam} onChange = {changeMaxParam} /> </p>

              <p> Lower bound: <input onChange = {changeLower} value = {lower} style = {{marginRight: '50px'}}/> </p>
              <p> Upper Bound: <input onChange = {changeUpper} value = {upper} /> </p>

              <p id = "paragraph-popup-hover"> (What do these bounds mean?) </p>

              <div id = "paragraph-popup"> 
                <dl> Each problem has 2 numbers which are generated i.i.d. uniformly as follows:
                  <li> Addition: each summand is in the range (lower, upper) </li>
                  <li> Subtraction: the minuend/subtrahend fall between (lower, 2 * upper) </li>
                  <li> Multiplication: the multipliers fall between (1, 2 * lower) </li>
                  <li> Division: the answer is in the range (1, 2 * lower) and the dividend is in the range (1, 4 * lower * lower) </li>
                </dl>              
              </div>

            </div>

            <p onClick = {() => window.location.reload()}> <img src = {restart} style = {popupImgStyle} alt = "restart"/> Restart Button </p>
            <p onClick = {changeToggle}> <img src = {toggleImg} style = {popupImgStyle} alt = "toggle gamemode" /> Toggle gamemode </p>
            <p onClick = {toggleProblems}> <img src = {dataImg} style = {popupImgStyle} alt = "show problems" /> Show live problem data </p>
            <p onClick = {toggleColors}> <img src = {themeImg} style = {popupImgStyle} alt = "change theme" /> Invert colors </p>

            <button onClick = {closePopup}> Start </button>

          </div>

      </div>

      <div id = "buttons">

        <button onClick = {() => window.location.reload()}> <img src = {restart} style = {buttonImgStyle} alt = "restart"/> </button>
        <button onClick = {changeToggle}> <img src = {toggleImg} style = {buttonImgStyle} alt = "toggle gamemode" /> </button>
        <button id = "showProblems" onClick = {toggleProblems}> <img src = {dataImg} style = {buttonImgStyle} alt = "show problems" /> </button>
        <button onClick = {toggleColors} id = 'toggle'> <img src = {themeImg} style = {buttonImgStyle} alt = "change theme" /> </button>

      </div>      

      <Game toggle = {toggle} theme = {theme} playing = {playing} setPlaying = {setPlaying} bounds = {[parseInt(lower), parseInt(upper)]} maxParams={maxParam}/>

    </div>

  );

}


export default App;

