import React, { useState, useEffect } from 'react'
import Stopwatch from './components/Stopwatch'
import Graph from './components/Graph'
import Problems from './components/Problems'
import saveGame from './services/saveGame'
import ProblemList from './components/ProblemList'
import History from './components/History'

function Game ( {toggle, theme, playing, setPlaying, bounds, maxParams, displayProblems} ) {

    const [score, setScore] = useState(0) // keeps track of score
    const [problems, setProblems] = useState([]) // stores past problems
    const [data, setData] = useState([{x: 0, time: 0}]) // stores problem data (problem number & problem time) to be graphed
    const [value, setValue] = useState('')  // input box value - refreshes to '' upon correct answer
    const [question, setQuestion] = useState([0, 0, 0]) // first two indices = integers, third = operator (add, minus, mult, div = 0, 1, 2, 3)
    const [probTime, setProbTime] = useState((new Date()).getTime()) // tracks how long is spent on each problem
    // Lower & upper bounds
    const [lower, upper] = bounds
    const operator = ['+','-','x','/'] // Relevant operators

    useEffect(() => {
        Problems.genProblem(upper, lower, setQuestion)()
    }, [upper, lower])


    // Hook to save problems whenever a game ends
    useEffect(() => {

        // Only saves when playing is set to "not playing" & when score > 0 to avoid saving when the page first loads
        if(playing === 0 && score > 0){ 

            const newObj = {
                problems: problems,
                toggle: toggle,
                bounds: bounds
            }

            saveGame.recordGame(newObj).then(result => {
                console.log(newObj)
                console.log("obj posted")
            })

        }

    }, [playing])

    // Converts problem to string
    function toProblem(i) {

        if (i === 1){
            const answ = [question[0] + question[1], question[0] - question[1], question[0] * question[1], question[0]/question[1]][question[2]]

            return question[0] + " " + operator[question[2]] + " " + question[1] + " = " + answ
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
            
            if(toggle % 2 === 0 && score >= maxParams - 1){
                setQuestion([NaN, NaN, 2])
            } else {
                Problems.genProblem(upper, lower, setQuestion)()
            }

            setValue('')
            setScore(score + 1)
            setData(data.concat([{x: problem.id + 1, time: problem.time}]))
        }

    }

    const retry = () => {

        setValue('')
        setScore(0)
        setPlaying(1)
        Problems.genProblem(upper, lower, setQuestion)() // put this in the useEffect as well maybe
        setProblems([])
        setData([{x: 0, time: 0}])
    }

    // to do: sort problem list based on time
    return (
        <div className = 'main'>

            <p className = "score"> Score: {score} </p>
            <Stopwatch toggle = {toggle} score = {score} playing = {playing} setPlaying = {setPlaying} setProbTime = {setProbTime} maxParams = {maxParams}/>

            <div className = {`game ${theme ? '' : 'dark'}`}>
                {question[0]} {operator[question[2]]} {question[1]} = <input value = {value} onChange = {handleValueChange} disabled = {!playing}/>
            </div>

            <button className = {`retry ${playing ? 'hidden' : ''} ${theme ? '' : 'dark'}`} onClick = {retry}> Retry </button>

            <div className = {`problem-data ${displayProblems ? '' : 'hidden'}`}>
                <Graph data = {data} theme = {theme} />
                <ProblemList problems = {problems} theme = {theme} />
            </div>

            {/* <History playing = {playing} setProblems = {setProblems} setData = {setData} setScore = {setScore} theme = {theme}/> */}

        </div>
    )

}

export default Game;