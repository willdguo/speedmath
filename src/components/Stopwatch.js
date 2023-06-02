import React, { useState, useEffect, useRef } from 'react'


const Stopwatch = ( {toggle, score, playing, setPlaying, setProbTime, maxParams} ) => {

    const [time, setTime] = useState(toggle % 2 === 0 ? 0 : maxParams)
    const text = toggle % 2 === 0 ? "Race Timer: " : "Countdown Timer: "
    let startTime = useRef(new Date())

    useEffect( () => {

        const updateTime = (elapsed) => {

            if(toggle % 2 === 1){

                if(elapsed / 1000 <= maxParams){

                    setTime(maxParams - elapsed / 1000)

                } else {

                    setTime(0)
                    setPlaying(0)

                    document.getElementById('game').style.visibility = 'hidden'
                    document.getElementById('score').style.textAlign = 'center'
                    document.getElementById('score').style.fontSize = '30px'

                }

            } else {

                if(score < maxParams){

                    setTime(elapsed / 1000)
        
                } else {

                    document.getElementById('game').style.visibility = 'hidden'
                    document.getElementById('timer').style.textAlign = "center"
                    document.getElementById('timer').style.fontSize = "30px"
                    setPlaying(0)

                }

            }

        }

        const timer = setInterval(() => {

            if(playing){ // checks if game is running
                let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
                updateTime(elapsed)

            } else { // updates start time for timer & first problem start time
                startTime.current = new Date()
                setProbTime(startTime.current.getTime())
            }

        }, 500)

        return () => clearInterval(timer)

    }, [playing, setPlaying, score, toggle, setProbTime, maxParams])

    return (
        <p id = "timer"> {text} {time} </p>
    )

}

export default Stopwatch