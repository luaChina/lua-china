import axios from 'axios'
import config from '~/config/api'
import Vue from 'vue'

const service = axios.create({
    withCredentials: true,
    baseURL: config.apiUrl
})

service.interceptors.response.use(
    response => {
        if (response.data.status == 4) {
            window.location.href='/login'
            return
        }
        return response
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)

export default {
    post (uri, data) {
        return service.post(uri, data)
    },
    put (uri, data) {
        return service.put(uri, data)
    },
    get (uri) {
        return service.get(uri)
    },
    delete (uri) {
        return service.delete(uri)
    }
}