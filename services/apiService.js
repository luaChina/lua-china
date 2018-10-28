import axios from 'axios'
import config from '~/config/api'

const service = axios.create({ withCredentials: true })
// axios.interceptors.response.use()

export default {
    post (uri, data, domain = config.apiUrl) {
        return service.post(domain + uri, data)
    },
    put (uri, data, domain = config.apiUrl) {
        return service.put(domain + uri, data)
    },
    get (uri, domain = config.apiUrl) {
        return service.get(domain + uri)
    }
}