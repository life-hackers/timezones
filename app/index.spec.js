window.expect = chai.expect

const context = require.context('./', true, /\.spec\.js$/)
context.keys().map(context)

