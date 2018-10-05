import axios from 'axios'
import config from '~/config/api'

// axios.interceptors.response.use()

export default {
    post (uri, data, domain = config.apiUrl) {
        return axios.post(domain + uri, data, { withCredentials: true })
    },
    get (uri, domain = config.apiUrl) {
        return axios.get(domain + uri, { withCredentials: true })
    }
}