import axios from "axios"
const baseUrl = "/api/saves"


const getAll = () => {

    return axios.get(`${baseUrl}`)


}

const recordGame = ( obj ) => {
    
    return axios.post(`${baseUrl}`, obj)

}


export default { getAll, recordGame }
