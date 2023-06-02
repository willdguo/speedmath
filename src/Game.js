import React, { useState } from 'react'
import Stopwatch from './components/Stopwatch'
import Graph from './components/Graph'
import Problems from './components/Problems'

function Game ( {toggle, theme, playing, setPlaying, bounds, maxParams} ) {

    const [score, setScore] = useState(0) // keeps track of score
    const [problems, setProblems] = useState([]) // stores past problems
    const [data, setData] = useState([{x: 0, time: 0}]) // stores problem data (problem number & problem time) to be graphed
    const [value, setValue] = useState('')  // input box value - refreshes to '' upon correct answer
    const [question, setQuestion] = useState([0, 0, 0]) // first two indices = integers, third = operator (add, minus, mult, div = 0, 1, 2, 3)
    const [probTime, setProbTime] = useState((new Date()).getTime()) // tracks how long is spent on each problem

    const maxScore = 4 // max score - game ends once this score is reached when toggle = 0
    const maxTime = 10 // max time - game ends once time hits 0 when toggle = 1

    const lower = bounds[0]
    const upper = bounds[1]
    
    // bound of answers will be between lower & 2 * upper, kinda
    const operator = ['+','-','x','/']

    const colors = ['green', 'lightgreen', 'grey', 'white', 'red', 'lightcoral'] // problem colors for good/mid/bad times. odd = light theme, even = dark theme

    function toProblem(i) {

        if (i === 1){
            const temp = [question[0] + question[1], question[0] - question[1], question[0] * question[1], question[0]/question[1]][question[2]]

            return question[0] + " " + operator[question[2]] + " " + question[1] + " = " + temp
        }

        return question[0] + " " + operator[question[2]] + " " + question[1]
    }


    // user input -> checks if int, then checks if answer is right
    function handleValueChange(event) {
        const input = event.target.value

        if(!isNaN(input)){
            setValue(input)
            checkAnswer(parseInt(input, 10))
        } else if (input === ''){
            setValue(input)
        }

    }

    // if user input is correct, calls getRandomQuestion
    function checkAnswer(input){

        const correctAdd = (question[2] === 0 && input === question[0] + question[1])
        const correctMinus = (question[2] === 1 && input === question[0] - question[1])
        const correctMult = (question[2] === 2 && input === question[0] * question[1])
        const correctDiv = (question[2] === 3 && input === question[0] / question[1])

        if(correctAdd || correctMinus || correctMult || correctDiv) {
            const currTime = (new Date()).getTime()
            setProbTime(currTime)

            const problem = { // records current problem
                problem: toProblem(1),
                time: ((currTime - probTime)/1000).toFixed(2),
                id: problems.length,           
            }

            setProblems(problems.concat(problem)) // adds problem to running list of solved problems
            
            if(toggle % 2 === 0 && score >= maxParams - 1){ // 4 is the hardcoded maxScore = FIX
                setQuestion([NaN, NaN, 2])
            } else {
                Problems.genProblem(upper, lower, setQuestion)()
            }

            setValue('')
            setScore(score + 1)
            setData(data.concat([{x: problem.id + 1, time: problem.time}]))
        }

    }

    window.addEventListener('load', function() {
        Problems.genProblem(upper, lower, setQuestion)() // update to adapt to problem range
    })

    // returns which interval a certain time difference falls in
    const getRange = (k) => {
        const badTime = 3.5 
        const goodTime = 1.5

        // 0 = good, 1 = mid, 2 = bad
        if(k < goodTime){
            return 0
        }else if (k < badTime){
            return 1
        }else{
            return 2
        }

    }

    const testingRestart = () => {
        setValue('')
        setScore(0)
        setPlaying(1)
        Problems.genProblem(upper, lower, setQuestion)() // put this in the useEffect as well maybe
        setProblems([])
        setData([{x: 0, time: 0}])

        const metric = ['timer', 'score']

        // make css more automated w/ useEffect detecting changes to `playing`
        document.getElementById(metric[toggle % 2]).style.textAlign = 'left'
        document.getElementById(metric[toggle % 2]).style.fontSize = '100%'
        document.getElementById('game').style.visibility = 'visible'
    }


    // to do: sort problem list based on time
    return (
        <div>

            <p id = "score"> Score: {score} </p>
            <Stopwatch toggle = {toggle} score = {score} playing = {playing} setPlaying = {setPlaying} setProbTime = {setProbTime} maxParams = {maxParams}/>

            <div id = 'game'>
                {question[0]} {operator[question[2]]} {question[1]} = <input value = {value} onChange = {handleValueChange}/>
            </div>

            <button style = {{position: 'relative', left: '45%', width: '120px', height: '50px', fontSize: '30px', visibility: `${['visible', 'hidden'][playing]}`}} onClick = {testingRestart}> Retry </button>

            <dl id = 'problem-list'>
                {problems.map(problem =>
                    <li key = {problem.id} id = {problem.id} style = {{color: `${colors[getRange(problem.time) * 2 + (theme % 2)]}`, opacity: '50%', background: ['white','black'][theme]}}>
                        {problem.problem} {problem.time}
                    </li>
                ).reverse()}
            </dl>

            <Graph data = {data} theme = {theme} />


        </div>
    )

}

export default Game;