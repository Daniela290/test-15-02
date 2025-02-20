import axios from 'axios'
import router from "@/router";

export const http = axios.create({
    baseURL: '/api'
})

// http.interceptors.request.use(async (config) => {
//     return config
// })
//
// http.interceptors.response.use((response) => {
//     return response.data
// }, async (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//         router.push('/login')
//     }
//     return Promise.reject(error)
// })
