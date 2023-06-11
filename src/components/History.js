import { useState, useEffect } from "react"
import saveGame from "../services/saveGame"

const History = ( {playing, setProblems, setData, setScore, theme} ) => {
    const gameType = ['Race', 'Countdown']
    const [pastGames, setPastGames] = useState([])


    useEffect(() => {

        if(playing === 0){

            setTimeout(() => {
                saveGame.getAll()
                    .then(result => {
                        console.log(result.data)
                        setPastGames(result.data)
            
                    })

            }, 1000)

        }


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


    }

    if(!playing){

        return (
            <div id = "pastGames" style = {{background: ['white','black'][theme]}}>
    
                <p style = {{background: ['white','black'][theme], color: ['black','white'][theme]}}> Past Games: </p>
    
                <dl id = "pastGames-list" style = {{background: ['white','black'][theme]}}>
                    {pastGames.map(game => 
                        <li key = {game.id} style = {{background: ['white','black'][theme]}}> 
                            <button onClick={() => setGame(game)} style = {{background: ['white','gray'][theme], color: ['black', 'white'][theme]}}> {gameType[game.toggle]} | Problems: {game.problems.length} </button> 
                        </li>
                    ).reverse()}
                </dl>
    
            </div>
        )

    }

}

export default History