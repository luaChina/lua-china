import axios from 'axios'
import config from '~/config/api'

export default {
    post (uri, data, domain = config.apiUrl) {
        return axios.post(domain + uri)
    },
    get (uri, domain = config.apiUrl) {
        return axios.get(domain + uri)
    }
}