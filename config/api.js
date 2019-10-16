const env = require('../env.json');

export default {
    apiUrl: env.API_URL || "https://api.lua-china.com",
    githubClientId: env.GITHUB_CLIENT_ID,
}