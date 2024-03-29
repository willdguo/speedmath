import axios from "axios"
const baseUrl = 'https://speedmath-backend.vercel.app/api/users'
// const baseUrl = 'http://localhost:3001/api/users'


const addUser = async ( credentials ) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {addUser}