import React, { useState, useEffect, useRef } from 'react'
import Stopwatch from '../components/Stopwatch'
import Graph from '../components/Graph'
import Problems from '../utils/Problems'
import saveGame from '../services/saveGame'
import ProblemList from '../components/ProblemList'
import History from '../components/History'
import { Grid, Container, Segment, Button, Input, Dropdown, Header } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const Game = ( {toggle, setToggle} ) => {

    const [playing, setPlaying] = useState(true);
    const [countoff, setCountoff] = useState(0);
    const [score, setScore] = useState(0); // keeps track of score
    const [problems, setProblems] = useState([]); // stores past problems
    const [data, setData] = useState([{x: 0, time: 0}]); // stores problem data (problem number & problem time) to be graphed
    const [value, setValue] = useState('');  // input box value - refreshes to '' upon correct answer
    const [question, setQuestion] = useState([0, 0, 0]); // first two indices = integers, third = operator (add, minus, mult, div = 0, 1, 2, 3)
    const [probTime, setProbTime] = useState((new Date()).getTime()); // tracks how long is spent on each problem
    const startTime = useRef(new Date());
    // Lower & upper bounds
    const [lower, upper] = [10, 100];
    const operator = ['+','-','x','/']; // Relevant operators

    useEffect(() => {
        Problems.genProblem(upper, lower, setQuestion)()
    }, [upper, lower]);

    // Hook to save problems whenever a game ends & update starting time otherwise
    useEffect(() => {
        // Only saves when playing is set to "not playing" & when score > 0 to avoid saving when the page first loads
        if (!playing && score > 0) { 
            const newObj = {
                problems: problems,
                toggle: toggle,
                date_created: new Date(),
            };
            saveGame.recordGame(newObj).then(result => {
                // console.log(newObj);
                console.log("game saved!");
            });
        }

        if (playing) {
            setCountoff(3);
        }

        const timeout = setInterval(() => {
            if(!playing){
                // console.log(startTime);
                startTime.current = new Date();
                setProbTime(startTime.current.getTime() + 3000);
            }
        }, 500);

        return () => clearInterval(timeout);
    }, [playing]);
    
    useEffect(() => {
        console.log(countoff);
        if (countoff > 0) {
            setTimeout(() => {
                setCountoff(countoff - 1)
            }, 1000);
        }
    }, [countoff]);

    // Converts problem to string
    function toProblem(i) {
        if (i === 1){
            const answ = [
                question[0] + question[1], 
                question[0] - question[1], 
                question[0] * question[1], 
                question[0]/question[1]][question[2]
            ];
            return question[0] + " " + operator[question[2]] + " " + question[1] + " = " + answ;
        }

        return question[0] + " " + operator[question[2]] + " " + question[1];
    }

    // user input -> checks if int, then checks if answer is right
    function handleValueChange(event) {
        const input = event.target.value

        if(!isNaN(input)){
            setValue(input)
            checkAnswer(parseInt(input, 10))
        } else if (input === ''){
            setValue(input)
        }

    }

    // if user input is correct, calls getRandomQuestion
    function checkAnswer(input){
        const correctAdd = (question[2] === 0 && input === question[0] + question[1])
        const correctMinus = (question[2] === 1 && input === question[0] - question[1])
        const correctMult = (question[2] === 2 && input === question[0] * question[1])
        const correctDiv = (question[2] === 3 && input === question[0] / question[1])

        if(correctAdd || correctMinus || correctMult || correctDiv) {
            const currTime = (new Date()).getTime()
            setProbTime(currTime)

            const problem = { // records current problem
                problem: toProblem(1),
                time: ((currTime - probTime)/1000).toFixed(2),
                id: problems.length,           
            }

            setProblems(problems.concat(problem)) // adds problem to running list of solved problems
            
            if(toggle % 2 === 0 && score >= 39){
                setQuestion([NaN, NaN, 2])
            } else {
                Problems.genProblem(upper, lower, setQuestion)()
            }

            setValue('')
            setScore(score + 1)
            setData(data.concat([{x: problem.id + 1, time: problem.time}]))
        }
    }

    const retry = () => {
        setValue('')
        setScore(0)
        setPlaying(true)
        Problems.genProblem(upper, lower, setQuestion)() // put this in the useEffect as well maybe
        setProblems([])
        setData([{x: 0, time: 0}])
    }

    const changeToggle = (value) => {
        setToggle(value === 'Race' ? 0 : 1);
        localStorage.setItem('toggle', value === 'Race' ? 0 : 1);
    }

    const toggleOptions = [
        {key: 'Race', text: 'Race', value: 'Race'},
        { key: 'Countdown', text: 'Countdown', value: 'Countdown' },
    ];

    const spanStyle = {
        fontSize: "30px",
        marginRight:"4px",
    };
    
    const segmentStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Optional, if you want to center horizontally as well
    };

    const nav = useNavigate();

    // to do: sort problem list based on time
    return (
        <Container>
            {playing &&
                <>
                    <p> Score: {score} </p>
                        <Stopwatch 
                            toggle = {toggle} 
                            score = {score} 
                            playing = {playing} 
                            setPlaying = {setPlaying} 
                            setProbTime = {setProbTime} 
                            startTime = {startTime}
                        />
                    {countoff === 0
                        ? 
                        <Segment style={segmentStyle}>
                            <span style={spanStyle}>
                                {question[0]} {operator[question[2]]} {question[1]} =
                            </span>
                            <Input 
                                value = {value} 
                                onChange = {handleValueChange} 
                                size='huge'
                            />
                        </Segment>
                        :
                        <Header as="h1" textAlign="center"> {countoff} </Header>
                    }

                </>
            }

            {!playing &&
                <Segment>
                    <h1> Score: {score} </h1>
                    <h3> Game Analytics </h3>
                    <Grid stackable celled columns={2}>
                        <Grid.Column width={10}>
                            <Graph data = {data}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ProblemList problems = {problems}/>
                            Current gamemode: {' '}
                            <Dropdown
                                selection
                                options={toggleOptions}
                                value={toggle % 2 === 0 ? 'Race' : 'Countdown'}
                                onChange={(e, { value }) => {
                                    changeToggle(value);
                                }}
                            />
                            <br/>
                            <Button primary onClick={retry}> Retry </Button>
                            <Button  
                                size="small"
                                onClick={()=>{nav('/')}}
                            >
                                Quit
                            </Button>
                        </Grid.Column>
                    </Grid>
                    <History 
                        playing = {playing} 
                        setProblems = {setProblems} 
                        setData = {setData} 
                        setScore = {setScore}
                    />
                </Segment>
            }

        </Container>
    )

}

export default Game;