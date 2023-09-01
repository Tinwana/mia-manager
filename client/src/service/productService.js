import axios from 'axios'
import {BASE_URL} from '../config/env'


export const getAllProduct = async ()=> {
    const response = await axios({
        method: 'GET',
        url:`${BASE_URL}/products/get-all`,
    })
    console.log(response);
    return response.data
}