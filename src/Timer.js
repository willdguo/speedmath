import React, { useState, useEffect, useRef } from 'react'


const Timer = () => {

    const maxTime = 120

    const [time, setTime] = useState(maxTime)
    let startTime = useRef(new Date())

    const updateTime = (elapsed) => {

        if(elapsed/1000 <= maxTime){
            setTime(maxTime - elapsed/1000)
        }else {
            console.log(elapsed)
            document.getElementById('game').style.visibility = 'hidden'
        }

    }

    useEffect(() => {

        const timer = setInterval(() => {

            let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
            updateTime(elapsed)

        }, 1000)

        return () => clearInterval(timer)

    }, [])


    return (
        <p> Countdown Time: {time} </p>
    )

}

export default Timer
