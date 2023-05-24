import React, { useState } from 'react'
import Stopwatch from './Stopwatch'
import Graph from './Graph'

function Game ( {toggle, theme} ) {

    // keeps track of score
    const [score, setScore] = useState(0)

    // stores past problems
    const [problems, setProblems] = useState([])

    // stores problem data (problem number & problem time) to be graphed
    const [data, setData] = useState([{x: 0, time: 0}])

    // bound of answers will be between lower & 2 * upper, kinda
    const lower = 10
    const upper = 100
    const operator = ['+','-','x','/']

    // input box value - refreshes to '' upon correct answer
    const [value, setValue] = useState('')

    // question numbers & operator; first two indices = integers, third = operator
    const [question, setQuestion] = useState([0, 0, 0]) //add, minus, mult, div = 0, 1, 2, 3


    // tracks how long is spent on each problem
    const [probTime, setProbTime] = useState((new Date()).getTime())


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

        if(correctAdd || correctMinus || correctMult || correctDiv){

            const temp = ['light', 'dark']

            console.log("right answer! theme " + temp[theme])

            const currTime = (new Date()).getTime()
            setProbTime(currTime)

            console.log("current time - probTime: ")
            console.log(currTime - probTime)

            const problem = {
                problem: toProblem(1),
                time: ((currTime - probTime)/1000).toFixed(2),
                id: problems.length,           
            }

            setProblems(problems.concat(problem))
            
            getRandomQuestion()
            setValue('')
            setScore(score + 1)
            setData(data.concat([{x: problem.id + 1, time: problem.time}]))

        }

    }

    function getRandomAdd() {
        const rand1 = Math.floor(Math.random() * (upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (upper - lower)) + lower

        console.log('random add')
        console.log(rand1, rand2)
        setQuestion([rand1, rand2, 0])
    }

    // remove chance of getting same number 2ce by altering bounds
    function getRandomMinus() {
        const rand1 = Math.floor(Math.random() * (2 * upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (2 * upper - lower)) + lower

        console.log('random minus')
        // console.log(rand1, rand2)
        setQuestion([Math.max(rand1, rand2), Math.min(rand1, rand2), 1])
    }

    function getRandomMult() {
        const rand1 = Math.ceil(Math.random() * (2 * lower - 1)) + 1 
        const rand2 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        console.log('random mult')

        setQuestion([rand1, rand2, 2])
    }

    function getRandomDiv() {
        const rand1 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        const rand2 = Math.ceil(Math.random() * (2 * lower - 1)) + 1
        const val1 = rand1 * rand2
        console.log('random div')

        setQuestion([val1, rand2, 3])

    }

    // consider extracting getRandomQuestion to new file
    function getRandomQuestion(){
        const questionType = [getRandomAdd, getRandomAdd, getRandomMinus, getRandomMinus, getRandomMult, getRandomDiv] 
        const pickType = Math.floor(Math.random() * (questionType.length))
    
        questionType[pickType]()
    }

    window.addEventListener('load', function() {
        getRandomQuestion()
    })

    const colors = ['green', 'lightgreen', 'grey', 'white', 'red', 'lightcoral']

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

    return (
        <div>

            <p id = "score"> Score: {score}</p>
            <Stopwatch toggle = {toggle} score = {score}/>

            <div id = 'game'>
                {question[0]} {operator[question[2]]} {question[1]} = <input value = {value} onChange = {handleValueChange}/>
            </div>

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