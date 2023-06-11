import axios from "axios"

const baseUrl = "http://localhost:3001"


const getAll = () => {

    return axios.get(`${baseUrl}/saves`)


}

const recordGame = ( obj ) => {
    
    return axios.post(`${baseUrl}/saves`, obj)

}



export default { getAll, recordGame }
