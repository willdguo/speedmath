import { useState, useEffect } from "react"
import saveGame from "../services/saveGame"

const History = ( {playing, setProblems, setData, setScore, theme} ) => {
    const gameType = ['Race', 'Countdown']
    const [pastGames, setPastGames] = useState([])

    useEffect(() => {

        setTimeout(() => {
            saveGame.getAll()
            .then(result => {
                // console.log(result.data)
                setPastGames(result)
            })
        }, 1000)

    }, [playing])

    const setGame = (game) => {

        setProblems(game.problems)
        setData(game.problems.map((problem, index) => {
            return {
                x: index,
                time: problem.time
            }
        }))

        setScore(game.problems.length)
        // setTime(getTotalTime(game))
    }

    const getTotalTime = (game) => {
        const sum = game.problems.reduce((prevTime, problem) => prevTime + Number(problem.time), 0)
        return sum.toFixed(2)
    }

    return (
        <div className = {`pastGames ${theme ? '' : 'dark'}`}>

            <h2> Past Games: </h2>

            <dl className = "pastGames-list">
                {pastGames.map(game => 
                    <li key = {game.id}> 
                        <p onClick={() => setGame(game)}> {gameType[game.toggle]} | Problems: {game.problems.length} | Time: {getTotalTime(game)} </p> 
                    </li>
                ).reverse()}
            </dl>

        </div>
    )

}

export default History