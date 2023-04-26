import React, { useState } from 'react'
import { useEffect } from 'react'


const Timer = () => {


    const [time, setTime] = useState(120)
    let startTime = new Date()
    startTime.setSeconds(startTime.getSeconds() + 120)


    const updateTime = (total) => {

        if (total >= 0){
        setTime(total / 1000)
        console.log(total)
        } else {
        document.getElementById('game').style.visibility = 'hidden'
        }

    }

    useEffect(() => {
        const timer = setInterval(() => {
            let total = Date.parse(startTime) - Date.parse(new Date())
            updateTime(total)
        }, 1000)
    }, [])

    return (
        <div>
            <p> Time: {time} </p>
        </div>
    )

}

export default Timer
