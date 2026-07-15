import axios from 'axios'
import config from '~/config/api'
import Vue from 'vue'

const service = axios.create({
    withCredentials: true,
    // Fail fast: without a timeout a slow/unreachable backend makes SSR
    // (asyncData) hang forever → nuxt.render never responds → connection
    // timeouts and request pile-up. Reject after 8s instead.
    timeout: 8000
});

// Server-side requests go to the internal API (fast, avoids looping back out
// through the public LB/Kong); client-side requests use the public API.
// Only relative URLs are rewritten, so call sites that pass an absolute URL
// (e.g. a pre-built internal URL) keep working unchanged.
service.interceptors.request.use(cfg => {
    if (!/^https?:\/\//i.test(cfg.url || '')) {
        cfg.baseURL = process.server ? config.apiInternalUrl : config.apiUrl
    }
    return cfg
});

service.interceptors.response.use(
    response => {
        return new Promise(resolve => {
            resolve(response)
        });
    },
    err => {
        if (process.client) {
            Vue.toast({
                type: 'error',
                message: err
            });
        }
        return Promise.reject(err)
    }
);

export default {
    post(uri, data) {
        return service.post(uri, data)
    },
    put(uri, data) {
        return service.put(uri, data)
    },
    get(uri, config) {
        return service.get(uri, config)
    },
    delete(uri) {
        return service.delete(uri)
    }
}