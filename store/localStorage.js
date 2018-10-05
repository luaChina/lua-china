export default {
    set: function ($key, $value) {
        return window.localStorage.setItem($key, JSON.stringify($value))
    },
    get: function ($key) {
        return window.localStorage.getItem($key) ? JSON.parse(window.localStorage.getItem($key)) : null
    }
}