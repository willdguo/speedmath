import { ScatterChart, Scatter, Label, XAxis, YAxis } from 'recharts'
import React, { useState } from 'react'
import Game from './Game'

import Toggle from './Toggle'

function App() {

  // keeps track of score
  const [score, setScore] = useState(0)

  // stores past problems
  const [problems, setProblems] = useState([])

  // keeps track of game mode; by default is set to countdown mode
  const [toggle, setToggle] = useState(0)

  // toggle visibility of problems; by default is no visible
  const [displayProblems, setDisplayProblems] = useState('Show Problems')

  // checks if stored mode exists
  window.onload = () => {

    if('toggle' in localStorage) {
      // console.log('hello')
      console.log(localStorage.getItem('toggle'))
      setToggle(parseInt(localStorage.getItem('toggle')) + 1)
    }

    // extract this to a separate function
    if('displayProblems' in localStorage) {

      const d = localStorage.getItem('displayProblems')
      
      if(d == 'hidden'){
        document.getElementById('problem-list').style.visibility = 'hidden'
        document.getElementById('graph').style.visibility = 'hidden'
        setDisplayProblems('Show Problems')
      }else {
        document.getElementById('problem-list').style.visibility = 'visible'
        document.getElementById('graph').style.visibility = 'visible'
        setDisplayProblems('Hide Problems')
      }

    } else {
      document.getElementById('problem-list').style.visibility = 'hidden'
      document.getElementById('graph').style.visibility = 'hidden'

    }

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

    if(displayProblems == 'Hide Problems'){
        setDisplayProblems('Show Problems')
        document.getElementById('problem-list').style.visibility = 'hidden'
        document.getElementById('graph').style.visibility = 'hidden' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'hidden')

    }else{
        setDisplayProblems('Hide Problems')
        document.getElementById('problem-list').style.visibility = 'visible'
        document.getElementById('graph').style.visibility = 'visible' //changes visibility of graph as well
        localStorage.setItem('displayProblems', 'visible')

    }

  } 

  const [data, setData] = useState([{x: 0, time: 0}]) // fix this - why does it have to be passed through like 3 different components

  //fix the chart too - axes need to be bolder & bigger
  // CANNOT CLICK BUTTONS - FIX ASAP

  return (
    <div>

      <p id = "score"> Score: {score}</p>
      <Toggle toggle = {toggle} score = {score} problems = {problems} setProblems = {setProblems} data = {data} setData = {setData}/>

      { /* <button onClick = {() => console.log(time)}> click me </button> */ }

      <div id = "main">
        <Game score = {score} setScore = {setScore} problems = {problems} setProblems = {setProblems} />
      </div>

      <div id = "buttons">
        <button onClick = {() => window.location.reload()}> Restart </button>
        <button onClick = {changeToggle}> Toggle Mode </button>
        <button onClick = {toggleProblems}>  {displayProblems} </button>
      </div>

      <div id = "graph">

        <ScatterChart width={600} height={400} margin = {{ top: 5, right: 10, left: 50, bottom: 20 }}>

            <XAxis type="number" dataKey="x">
              <Label value = "Problems" position = "bottom"/>
            </XAxis>

            <YAxis type="number" dataKey="time" domain = {[0, 'dataMax + 1']}>
              <Label value = "Time" position = "insideRight" angle = {-90} offset = {50} />
            </YAxis>

            <Scatter data={data} fill="black" lineJointType='monotoneX' line/>

        </ScatterChart>

      </div>

        

    </div>
  );
}

export default App;
