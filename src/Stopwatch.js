import React, { useState, useEffect, useRef } from 'react'

const Stopwatch = ( {score, problems, setProblems, data, setData} ) => {

    // max score - game ends once this score is reached
    const maxScore = 40

    const [time, setTime] = useState(0)
    let startTime = useRef(new Date())
    
    let problemTracker = useRef([score, new Date()]) // checks how much time is spent on the nth problem 

    // returns difference in time, including milliseconds 
    const timeDif = (time1, time2) => {
        const seconds = (Date.parse(time1) - Date.parse(time2))/1000 // typical subtraction doesn't give milliseconds - CHECK if there's a native way for this
        const milliseconds = time1.getMilliseconds() - time2.getMilliseconds()

        return (seconds + milliseconds/1000).toFixed(2)
    }

    // updates time every second; otherwise centers score & increases font size
    const updateTime = (elapsed) => {

        if(score < maxScore){
            setTime(elapsed / 1000)

        } else {
            document.getElementById('game').style.visibility = 'hidden'
            document.getElementById('timer').style.textAlign = "center"
            document.getElementById('timer').style.fontSize = "30px"
        }

    }

    // returns which interval a certain time difference falls in
    const getRange = (k) => {
        const badTime = 3.5 
        // const midTime = 2.5 // unnecessary variable
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

    const problemTime = () => {

        if (score != problemTracker.current[0]){
            const t = timeDif(new Date(), problemTracker.current[1])
            problemTracker.current = [score, new Date()]

            const colors = ['green', 'grey', 'red']
            document.getElementById(score - 1).style.color = colors[getRange(t)]
            document.getElementById(score - 1).style.opacity = 0.5

            const lastProblem = problems.pop()
            lastProblem['time'] = t
            setProblems(problems.concat(lastProblem))
            updateData(lastProblem)
            console.log(lastProblem)

        }

    }

    const updateData = (problem) => {
        setData(data.concat([{x: problem.id + 1, time: problem.time}]))
    }

    useEffect( () => {

        const timer = setInterval(() => {

            let elapsed = Date.parse(new Date()) - Date.parse(startTime.current)
            updateTime(elapsed)
            problemTime() // consider extracting this as well for use in countdown gamemode

        }, 100)

        return () => clearInterval(timer)
        
    }, [score])


    return (
        <p id = "timer"> Race Timer: {time} </p>
    )

}

export default Stopwatch