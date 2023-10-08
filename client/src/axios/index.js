import axios from "axios"
//http://localhost:3001
//https://mia-manager.onrender.com
//https://mia-manager-backend.onrender.com
export const axiosApi = axios.create({
    baseURL:'https://mia-manager-backend.onrender.com/api/v1/'
})