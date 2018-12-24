import axios from 'axios'
import config from '~/config/api'

const service = axios.create({
    withCredentials: true,
    baseURL: config.apiUrl
})

service.interceptors.response.use()

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