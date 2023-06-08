import axios from "axios"

const baseUrl = "http://localhost:3001"


const getAll = () => {

    axios.get(`${baseUrl}/saves`)
        .then(response => {
            console.log(response.data)
        })

}

const recordGame = ( obj ) => {
    axios.post(`${baseUrl}/saves`, obj)
        .then(response => {
            console.log(obj)
            console.log("obj posted")
        })
}



export default { getAll, recordGame }
