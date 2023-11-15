import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import {Button, Container, Grid, Message, Segment, Icon, Dropdown} from "semantic-ui-react";

const GameLanding = ({user, setUser, toggle, setToggle}) => {
    /*
        TO DO: incorporate advanced settings
        <div>
            <p>
                Max {['points ', 'time '][toggle % 2]}:
                <input value = {maxParam} onChange = {changeMaxParam} />
            </p>

            <p> Lower bound: <input onChange = {changeLower} value = {lower} /> </p>
            <p> Upper Bound: <input onChange = {changeUpper} value = {upper} /> </p>

            <div className = "paragraph-popup-container">
                <div className = "paragraph-popup-hover"> 
                    (What do these bounds mean?) 
                </div>

                <div className = "paragraph-popup"> 
                    <dl> Each problem has 2 numbers which are generated i.i.d. uniformly at random as follows:
                    <li> Addition: each summand is in the range (lower, upper) </li>
                    <li> Subtraction: the minuend/subtrahend fall between (lower, 2 * upper) </li>
                    <li> Multiplication: the multipliers fall between (1, 2 * lower) </li>
                    <li> Division: the answer is in the range (1, 2 * lower) and the dividend is in the range (1, 4 * lower * lower) </li>
                    </dl>              
                </div>
            </div>
        </div> 
    */
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const logout = () => {
        setLoading(true);
        setUser(null);
        nav('/');
        setLoading(false);
        window.localStorage.clear();
    };

    const changeToggle = (value) => {
        setToggle(value === 'Race' ? 0 : 1);
        localStorage.setItem('toggle', value === 'Race' ? 0 : 1);
    }
    
    const toggleOptions = [
        {key: 'Race', text: 'Race', value: 'Race'},
        { key: 'Countdown', text: 'Countdown', value: 'Countdown' },
    ];

    
    return (
        <Segment>
            <h2>Play Game</h2>
            <p> Logged in as <b>{user.username}</b> </p>
            <label> Current gamemode: </label>
            <Dropdown
                selection
                options={toggleOptions}
                value={toggle % 2 === 0 ? 'Race' : 'Countdown'}
                onChange={(e, { value }) => {
                    changeToggle(value);
                }}
            />
            
            <br/>
            <br/>

            <Button primary onClick = {() => {nav('/game')}}> 
                Start!
            </Button>

            <br/>
            <br/>

            <div onClick={logout}>
                <Icon fitted name="log out"/>  Log out {' '}
                {loading && <Icon loading name="spinner"/>}
            </div>

        </Segment>
    );
};

const LandingComponent = ({user, setUser, toggle, setToggle}) => {
    const description = (
        <Segment>
            <h2>Speedmath</h2>
            <p> Test your mental math capabilities! </p>
            <p> There are two modes: </p>
            <ul>
              <li> <strong>Countdown</strong>: Solve as many problems as you can in 120 seconds </li>
              <li> <strong>Race</strong>: See how long it takes for you to solve 40 problems </li>
            </ul>
            <p> Code available on <a href = "https://github.com/willdguo/speedmath">GitHub</a> </p>
        </Segment>
    );
    
    return (    
        <Grid columns={2} stackable centered>
            <Grid.Column>
                {description}
            </Grid.Column>
            <Grid.Column>
                {user === null
                    ? <Login user={user} setUser={setUser} />
                    : <GameLanding 
                        user={user} 
                        setUser={setUser} 
                        toggle={toggle} 
                        setToggle={setToggle}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};

const Landing = ({user, setUser, toggle, setToggle}) => {

    return (    
        <Container style={{marginTop: "20vh"}}>
            <LandingComponent 
                user = {user} 
                setUser = {setUser} 
                toggle={toggle}
                setToggle={setToggle}
            />
        </Container>
    );
};

export default Landing;