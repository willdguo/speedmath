import { useState } from 'react'
import loginService from '../services/login'
import saveGame from '../services/saveGame'
import userService from '../services/user'


const Login = ( {user, setUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [newUser, setNewUser] = useState(false)


    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        console.log('logging in with', username, password)

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

    }

    const handleCreateUser = async () => {
        console.log('creating new user with', username, password)

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
            })
        }
    }

    const loginForm = () => (
        <div className = 'login-container'>

            <h2> Sign In </h2>

            <p> Username </p>
            <input onChange = {handleUsername} value = {username}/>

            <p> Password </p>
            <input type = "password" onChange = {handlePassword} value = {password} onKeyDown = {(e) => {if(e.key === 'Enter'){handleLogin()}}}/>

            <button onClick = {handleLogin}> Login </button>

            <p className = 'newUser' onClick = {() => setNewUser(!newUser)}> New user? </p>

            <div className = "error-msg">
                {errorMessage}
            </div>

        </div>
    )

    const newUserForm = () => (
        <div className = "login-container">
            <h2> Create Account </h2>

            <p> Username </p>
            <input value = {username} onChange = {handleUsername} />

            <p> Password </p>
            <input value = {password} type = 'password' onChange = {handlePassword} onKeyDown = {(e) => {if(e.key === 'Enter'){handleCreateUser()}}}/>

            <button onClick = {handleCreateUser}> Submit </button>

            <p className = 'newUser' onClick = {() => setNewUser(!newUser)}> Log in </p>

            <div className = "error-msg">
                {errorMessage}
            </div>
        </div>
    )

    return (
        <div>
            {newUser
                ? newUserForm()
                : loginForm()
            }
        </div>
    )
}

export default Login