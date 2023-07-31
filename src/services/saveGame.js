import axios from "axios"
const baseUrl = "https://speedmath-backend.vercel.app/api/saves"
// const baseUrl = 'http://localhost:3001/api/saves'


let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {

    const config = {
        headers: {Authorization: token},
    }

    const response = await axios.get(baseUrl, config)
    return response.data


}

const recordGame = ( obj ) => {

    const config = {
        headers: {Authorization: token},
    }
    
    return axios.post(baseUrl, obj, config)

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, recordGame, setToken }
