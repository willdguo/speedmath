import axios from "axios"
const baseUrl = "/api/saves"

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


export default { getAll, recordGame, setToken }
