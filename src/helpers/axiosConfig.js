import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://nuevomern-7y1b.onrender.com'
});

export {
    axiosInstance
}