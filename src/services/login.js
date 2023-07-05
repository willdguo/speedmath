import axios from 'axios'
const baseUrl = 'https://speedmath-backend.vercel.app/api/login'

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    console.log('login data: ')
    console.log(response.data)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}