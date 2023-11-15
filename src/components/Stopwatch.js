import React, { useState, useEffect, useRef } from 'react'

const Stopwatch = ( {toggle, score, playing, setPlaying, setProbTime, startTime} ) => {

    const maxTime = 120; // change for testing
    const maxScore = 40;

    const [time, setTime] = useState(toggle % 2 === 0 ? 0 : maxTime)
    const text = toggle % 2 === 0 ? "Race Timer: " : "Countdown Timer: "

    useEffect( () => {
        const updateTime = (elapsed) => {
            if(toggle % 2 === 1){
                if(elapsed / 1000 <= maxTime){
                    setTime(maxTime - elapsed / 1000)
                } else {
                    setTime(0);
                    setPlaying(false);
                }
            } else {
                if(score < maxScore){
                    setTime(elapsed / 1000);
                } else {
                    setPlaying(false);
                }
            }
        }

        const timer = setInterval(() => {
            let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
            updateTime(elapsed)
        }, 500)

        return () => clearInterval(timer);
    }, [playing, setPlaying, score, toggle, setProbTime]);

    return (
        <p> 
            {text} {time} 
        </p>
    );
}

export default Stopwatch;