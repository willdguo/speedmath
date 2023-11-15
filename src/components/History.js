import { useState, useEffect } from "react";
import saveGame from "../services/saveGame";
import { List, Icon } from "semantic-ui-react";

const History = ( {playing, setProblems, setData, setScore} ) => {
    const gameType = ['Race', 'Countdown'];
    const [pastGames, setPastGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            saveGame.getAll()
            .then(result => {
                setPastGames(result)
            })
            setLoading(false);
        }, 1000)
    }, [playing]);

    const setGame = (game) => {
        setProblems(game.problems);
        setData(game.problems.map((problem, index) => {
            return {
                x: index,
                time: problem.time
            }
        }));
        setScore(game.problems.length);
    }

    const getTotalTime = (game) => {
        const sum = game.problems.reduce((prevTime, problem) => prevTime + Number(problem.time), 0);
        return sum.toFixed(2);
    }

    const listStyle = {
        maxHeight: '300px',
        overflow: 'auto',
    };

    return (
        <>

            <h2> 
                Past Games {' '}
                {loading && <Icon loading name="spinner"/>}
            </h2>
            

            <List style={listStyle}>
                {pastGames.map(game => 
                    <List.Item key = {game.id}> 
                        <p onClick={() => setGame(game)}>
                            {gameType[game.toggle]} {' '}
                            | Problems: {game.problems.length} {' '}
                            | Time: {getTotalTime(game)} 
                        </p> 
                    </List.Item>
                ).reverse()}
            </List>

        </>
    );
}

export default History;