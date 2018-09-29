const env = require('../env.json')

export default {
    apiUrl: env.APP_ENV === 'local' ? 'http://api.lua-china.local' : 'https://api.lua-china.com'
}