import React, { useState } from 'react'
import Game from './Game'

function App() {

  // toggle visibility of problems; by default is not visible
  const [displayProblems, setDisplayProblems] = useState('Show Problems')

  // keeps track of game mode; by default is set to countdown mode
  const [toggle, setToggle] = useState(0)

  // color mode (1 light, 0 dark)
  const [theme, setTheme] = useState(1)


  const checkToggle = () => {

    if('toggle' in localStorage) {
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

  // checks if stored mode exists
  window.onload = () => {

    checkToggle()
    checkProblems()

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

    }else{

        setDisplayProblems('Hide Problems')
        document.getElementById('problem-list').style.display = 'block'
        document.getElementById('graph').style.display = 'flex' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'visible')

    }

  } 


  function toggleColors () {

    const tc = ['white', 'black']
    const gc = ['light', 'dark']

    setTheme(theme + 1)
    localStorage.setItem('theme', theme)
    // document.body.style.background = tc[theme % 2]

    var all = document.getElementsByTagName('*')

    for(var i = 0; i < all.length; i++){

      let element = all[i]

      element.style.background = tc[theme % 2]
      //console.log(element.id + " " + typeof(element.id))

      if(isNaN(parseInt(element.id))){

        //console.log(element.id)

        element.style.color = tc[(theme + 1) % 2]

      } else {

        const problemColors = ['green', 'lightgreen', 'grey', 'white', 'red', 'lightcoral']
        
        if(theme % 2 === 0){
          element.style.opacity = 0.5
          const current = problemColors.indexOf(element.style.color)
          element.style.color = problemColors[current - 1]
          
        } else {
          element.style.opacity = 0.75
          const current = problemColors.indexOf(element.style.color)
          element.style.color = problemColors[current + 1]
        }

      }

    }

    document.getElementById('game').style.background = gc[theme % 2] + "grey"
    //document.getElementById('scatter').style.color = tc[(theme + 1) % 2] - MAKE SCATTER PLOT CHANGE COLOR MODE TOO

  }

  const themeColors = ['light', 'dark']

  // consider filling buttons w/ icons - a) takes up less space, b) more aesthetic
  
  return (

    <div>

      <div id = "buttons">

        <button onClick = {() => window.location.reload()}> Restart </button>
        <button onClick = {changeToggle}> Toggle Gamemode </button>
        <button onClick = {toggleProblems}>  {displayProblems} </button>
        <button onClick = {toggleColors}> {themeColors[theme % 2]} </button>

      </div>      

      <div id = "main">
        <Game toggle = {toggle} theme = {theme}/>
      </div>

    </div>
    
  );

}


export default App;

