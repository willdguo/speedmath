import React, { useState, useEffect, useRef } from 'react'

const Stopwatch = ( {score} ) => {

    const maxScore = 40

    const [time, setTime] = useState(0)
    let startTime = useRef(new Date())


    const updateTime = (elapsed) => {

        if(score < maxScore){
            setTime(elapsed / 1000)
        } else {
            document.getElementById('game').style.visibility = 'hidden'
            document.getElementById('timer').style.textAlign = "center"
            document.getElementById('timer').style.fontSize = "30px"            
        }

    }

    useEffect( () => {

        const timer = setInterval(() => {

            let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
            updateTime(elapsed)

        }, 200)

        return () => clearInterval(timer)
        
    }, [score])


    return (
        <p id = "timer"> Race Timer: {time} </p>
    )

}

export default Stopwatch