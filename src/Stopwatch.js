import React, { useState, useEffect, useRef } from 'react'


const Stopwatch = ( {toggle, score} ) => {

    const maxScore = 40 // max score - game ends once this score is reached when toggle = 0
    const maxTime = 120 // max time - game ends once time hits 0 when toggle = 1

    const [time, setTime] = useState(toggle % 2 === 0 ? maxTime : 0)
    const text = toggle % 2 === 0 ? "Race Timer: " : "Countdown Timer: "
    let startTime = useRef(new Date())
    
    useEffect( () => {

        // updates time every second; otherwise centers score & increases font size
        const updateTime = (elapsed) => {

            if(toggle % 2 === 1){

                if(elapsed / 1000 <= maxTime){

                    setTime(maxTime - elapsed / 1000)

                } else {
                    document.getElementById('game').style.visibility = 'hidden'
                    document.getElementById('score').style.textAlign = 'center'
                    document.getElementById('score').style.fontSize = '30px'

                    /* 
                    console.log("first digit " + problems.map(problem => problem.problem.split(/[\s=]+/)[0]))
                    console.log("second digit " + problems.map(problem => problem.problem.split(/[\s=]+/)[2]))
                    console.log("operator " + problems.map(problem => problem.problem.split(/[\s=]+/)[1]))
                    console.log("answer " + problems.map(problem => problem.problem.split(/[\s=]+/)[3]))
                    console.log("time " + problems.map(problem => problem.time))
                    */
                    
                }

            } else {

                if(score < maxScore){
                    setTime(elapsed / 1000)
        
                } else {
                    document.getElementById('game').style.visibility = 'hidden'
                    document.getElementById('timer').style.textAlign = "center"
                    document.getElementById('timer').style.fontSize = "30px"
                }

            }

        }

        const timer = setInterval(() => {

            let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
            updateTime(elapsed)

        }, 1000)

        return () => clearInterval(timer)
        
    }, [score, toggle])


    return (
        <p id = "timer"> {text} {time} </p>
    )

}

export default Stopwatch