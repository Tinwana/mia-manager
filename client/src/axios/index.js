import axios from "axios"


export const axiosApi = axios.create({
    baseURL:'https://mia-manager.onrender.com/api/v1/'
})