import React, { useState, useEffect, useRef } from 'react'


const Stopwatch = ( {toggle, score, playing, setPlaying} ) => {

    const maxScore = 40 // max score - game ends once this score is reached when toggle = 0
    const maxTime = 120 // max time - game ends once time hits 0 when toggle = 1

    const [time, setTime] = useState(toggle % 2 === 0 ? 0 : maxTime)
    const text = toggle % 2 === 0 ? "Race Timer: " : "Countdown Timer: "
    let startTime = useRef(new Date())

    
    useEffect( () => {

        // updates time every second; once player has won, game is replaced by enlarged score
        const updateTime = (elapsed) => {
            //console.log(`elapsed ${elapsed}`)


            if(toggle % 2 === 1){

                if(elapsed / 1000 <= maxTime){

                    setTime(maxTime - elapsed / 1000)

                } else {

                    //console.log('stopwatchjs done playing')

                    setTime(0)
                    setPlaying(0)

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

            } else { // FIX BUG: useEffect refreshes upon score updat --> can technically have infinite score in race mode as long as time < 1

                if(score < maxScore){

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

            if(playing){

                // console.log('playing game rn stopwatchjs')

                let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
                updateTime(elapsed)

            } else {

                startTime.current = new Date()
                // console.log(`not playing ${startTime.current}`)
                // console.log(startTime.current)
                // console.log(time) // glitch where time doesn't update prior to start. on countdown, time starts @ 0 for a split second
                // console.log(toggle % 2 === 0)

            }

        }, 1000)

        return () => clearInterval(timer)

    }, [playing, setPlaying, score, toggle])


    return (
        <p id = "timer"> {text} {time} </p>
    )

}

export default Stopwatch