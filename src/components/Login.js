import { useState } from 'react'
import loginService from '../services/login'
import saveGame from '../services/saveGame'
import userService from '../services/user'
import { Segment, Form, Header, Button, Message, Icon } from 'semantic-ui-react'

const LoginForm = ({user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [newUser, setNewUser] = useState(false)
    const [loading, setLoading] = useState(false);


    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        setLoading(true)
        // console.log('logging in with', username, password)

        try {
            const user = await loginService.login({username, password})

            saveGame.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            console.log('success')

            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        } catch (error) {
            setErrorMessage('Incorrect username/password')

            setTimeout(() => {
                setErrorMessage(null)
            }, 7000)

        }
        
        setLoading(false)
    }

    const handleCreateUser = async () => {
        // console.log('creating new user with', username, password)
        setLoading(true)

        try {

            let user = await userService.addUser({username, password})

            user = await loginService.login({username, password})

            saveGame.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            console.log('success')

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

        } catch (error) {
            setErrorMessage('Username must be at least 3 characters & password must be at least 8 characters')

            setTimeout(() => {
                setErrorMessage(null)
            }, 7000)
        }

        setLoading(false)
    }

    const pStyle = {
        opacity:"50%",
        textDecoration:"underline",
    }

    return (
        <Form>
            <Header as="h2">{newUser ? "Create Account" : "Sign In"}</Header>
    
            <Form.Input
                label="Username"
                placeholder="Username"
                width={12}
                onChange={handleUsername}
            />
    
            <Form.Input 
                label="Password"
                type="password"
                placeholder="Password"
                width={12}
                onChange={handlePassword}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        newUser ? handleCreateUser() : handleLogin();
                    }
                }}
            />
    
            <Button
                type="submit"
                onClick={() => (newUser ? handleCreateUser() : handleLogin())}
            >
                {newUser ? "Submit" : "Login"}
            </Button>

            {loading && <Icon loading name="spinner"/>}
    
            <p 
                onClick={() => setNewUser(!newUser)}
                style={pStyle}
            >
                {newUser ? "Log In" : "New user?"}
            </p>
    
            {errorMessage && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            )}
      </Form>
    )
}

const Login = ({user, setUser}) => {
    return (
        <Segment>
            <LoginForm user={user} setUser={setUser}/>
        </Segment>
    )
}

export default Login