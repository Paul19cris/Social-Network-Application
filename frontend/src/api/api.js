import axios from "axios"

const hostName = 'localhost'
const port = 8080

export const axiosInstance = axios.create({
    baseURL: `http://${hostName}:${port}/`,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
    },
})