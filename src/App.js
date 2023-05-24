import React, { useEffect, useState } from 'react'
import Game from './Game'
import restart from './icons/restart1.png'
import toggleImg from './icons/toggle2.png'
import dataImg from './icons/data1.png'
import themeImg from './icons/light1.png'

function App() {

  // toggle visibility of problems; by default is not visible
  const [displayProblems, setDisplayProblems] = useState('Show Problems')

  // keeps track of game mode; by default is set to countdown mode
  const [toggle, setToggle] = useState(0)

  // color mode (1 dark, 0 light)
  const [theme, setTheme] = useState(0)

  // checks if stored mode exists
  window.onload = () => {
    
    checkToggle()
    checkProblems()
    checkTheme()
    
    /* const temp = ['light', 'dark']
    console.log("actual current theme " + temp[localStorage.getItem('theme')]) */
  }

  const checkToggle = () => {

    // for some reason this isn't consistent - doesn't always accept toggle for other users
    if('toggle' in localStorage) {
      setToggle(parseInt(localStorage.getItem('toggle')) + 1)
      console.log((parseInt(localStorage.getItem('toggle')) + 1) + 'toggle ' + toggle)
    }

  }

  const checkProblems = () => {

    if('displayProblems' in localStorage) {

      const d = localStorage.getItem('displayProblems')
      
      if(d === 'hidden'){
        document.getElementById('problem-list').style.display = 'none'
        document.getElementById('graph').style.display = 'none'
        setDisplayProblems('Show Problems')
      } else {
        document.getElementById('problem-list').style.display = 'block'
        document.getElementById('graph').style.display = 'flex'
        setDisplayProblems('Hide Problems')
      }

    } else {
      document.getElementById('problem-list').style.display = 'none'
      document.getElementById('graph').style.display = 'none'

    }

  }

  const checkTheme = () => {

    if('theme' in localStorage) { 

      const storedTheme = parseInt(localStorage.getItem('theme'))

      const temp = ['light', 'dark']

      console.log("theme was in local storage!" + temp[localStorage.getItem('theme')])
      setColors(storedTheme)
      setTheme(storedTheme)

    }

  }

  // change state of toggle buton
  function changeToggle() {
      localStorage.setItem('toggle', toggle)
      window.location.reload()
  }
            

  // function to change visibility of past problems - stores past visibility state
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


  function setColors(k) {
    
    // console.log("setting colors " + k)
    const tc = ['white', 'black'] // background colors - alternates b/t white & black
    const gc = ['light', 'dark'] // general color - alternates b/t lighter & darker colors
    const cc = ['white', 'grey'] // conditional color - certain elements don't work well w/ white/black so they'll have less extreme colors

    var all = document.querySelectorAll('*:not(img)')

    for(var i = 0; i < all.length; i++){

      let element = all[i]

      if(element.tagName.toLowerCase() === 'button'){
        element.style.background = cc[k % 2]
      } else {
        element.style.background = tc[k % 2]
      }

      if(element.id !== 'toggle'){

          if(!element.hasAttribute('key')){

            element.style.color = tc[(k + 1) % 2]
    
          }

      }

    }

    document.getElementById('game').style.background = gc[k % 2] + "grey"

  }

  function toggleColors () {

    setTheme((theme + 1) % 2)
    localStorage.setItem('theme', (theme + 1) % 2)
    setColors((theme + 1) % 2)

  }

  // css style for button icons. clean up for readability
  const buttonImgStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "transparent",
    marginLeft: "0"
  }
  
  return (

    <div>

      <div id = "buttons">

        <button onClick = {() => window.location.reload()}> <img src = {restart} style = {buttonImgStyle} alt = "restart"/> </button>
        <button onClick = {changeToggle}> <img src = {toggleImg} style = {buttonImgStyle} alt = "toggle gamemode" /> </button>
        <button onClick = {toggleProblems}> <img src = {dataImg} style = {buttonImgStyle} alt = "show problems" /> </button>
        <button onClick = {toggleColors} id = 'toggle'> <img src = {themeImg} style = {buttonImgStyle} alt = "change theme" /> </button>

      </div>      

      <div id = "main">
        <Game toggle = {toggle} theme = {theme}/>
      </div>


    </div>

  );

}


export default App;

