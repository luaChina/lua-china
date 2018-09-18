if (process.BROWSER_BUILD) {
    // import all svgs
    var files = require.context('assets/svg', false, /\.svg$/)
    files.keys().forEach(files)
}
