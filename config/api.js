const env = require('../env.json');

export default {
    apiUrl: env.API_URL || "https://lua-china.com/api",
    apiInternalUrl: env.API_INTERNAL_URL,
    githubClientId: env.GITHUB_CLIENT_ID,
}
