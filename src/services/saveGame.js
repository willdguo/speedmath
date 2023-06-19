import axios from "axios"
const baseUrl = "https://speedmath-backend.vercel.app/api/saves"


const getAll = () => {

    return axios.get(`${baseUrl}`)


}

const recordGame = ( obj ) => {
    
    return axios.post(`${baseUrl}`, obj)

}


export default { getAll, recordGame }
