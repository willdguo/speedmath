import React, { useState } from 'react'

function Game ( {score, setScore} ) {

    const lower = 10
    const upper = 100

    // input box value - refreshes to '' upon correct answer
    const [value, setValue] = useState('')

    // question numbers & operator; first two indices = integers, third = operator
    const [question, setQuestion] = useState([0, 0, 0]) //add, minus, mult, div = 0, 1, 2, 3

    // user input -> checks if int, then checks if answer is right
    function handleValueChange(event) {
        const input = event.target.value

        if(input == parseInt(input, 10)){
            setValue(input)
            checkAnswer(parseInt(input, 10))
        } else if (input == ''){
            setValue(input)
        }

    }

    // if user input is correct, calls getRandomQuestion
    function checkAnswer(input){

        console.log(input, question[2])

        const correctAdd = (question[2] == 0 && input == question[0] + question[1])
        const correctMinus = (question[2] == 1 && input == question[0] - question[1])
        const correctMult = (question[2] == 2 && input == question[0] * question[1])
        const correctDiv = (question[2] == 3 && input == question[0] / question[1])

        if(correctAdd || correctMinus || correctMult || correctDiv){
            getRandomQuestion()
            setValue('')
            setScore(score + 1)
        }

    }

    function getRandomAdd() {
        const rand1 = Math.floor(Math.random() * (upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (upper - lower)) + lower

        console.log('random add')
        console.log(rand1, rand2)
        setQuestion([rand1, rand2, 0])
    }

    function getRandomMinus() {
        const rand1 = Math.floor(Math.random() * (2 * upper - lower)) + lower
        const rand2 = Math.floor(Math.random() * (2 * upper - lower)) + lower

        console.log('random minus')
        console.log(rand1, rand2)
        setQuestion([Math.max(rand1, rand2), Math.min(rand1, rand2), 1])
    }

    function getRandomMult() {
        const rand1 = Math.ceil(Math.random() * (Math.sqrt(2 * upper))) 
        const rand2 = Math.ceil(Math.random() * Math.sqrt(2 * upper))
        console.log('random mult')

        setQuestion([rand1, rand2, 2])
    }


    function getRandomDiv() {
        const rand1 = Math.ceil(Math.random() * (Math.sqrt(2 * upper))) 
        const rand2 = Math.ceil(Math.random() * Math.sqrt(2 * upper)) + 1
        const val1 = rand1 * rand2
        console.log('random div')

        setQuestion([val1, rand2, 3])

    }


    function getRandomQuestion(){
        const questionType = [getRandomAdd, getRandomAdd, getRandomMinus, getRandomMinus, getRandomMult, getRandomDiv] 
        const pickType = Math.floor(Math.random() * (questionType.length))
    
        questionType[pickType]()
    }

    const operator = ['+','-','x','/']

    window.addEventListener('load', function() {
        getRandomQuestion()
    })

    return (
        <div id = 'game'>
            {question[0]} {operator[question[2]]} {question[1]} = <input value = {value} onChange = {handleValueChange}/>
        </div>
    )

}

export default Game;