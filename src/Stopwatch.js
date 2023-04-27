import React, { useState, useEffect, useRef } from 'react'

const Stopwatch = ( {score} ) => {



    const [time, setTime] = useState(0)
    let startTime = useRef(new Date())


    const updateTime = (elapsed) => {

        if(score < 40){
            setTime(elapsed / 1000)
        } else {
            document.getElementById('game').style.visibility = 'hidden'
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
        <p> Race Timer: {time} </p>
    )

}

export default Stopwatch