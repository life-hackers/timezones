const webpack = require('./webpack.config')({}, {
    mode: 'development'
})

// https://github.com/webpack-contrib/karma-webpack/issues/24
webpack.optimization = {}
webpack.entry = null
webpack.mode = 'development'
// TODO make it safer
webpack.module.rules.pop()
webpack.module.rules.push({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: ['es2015-riot']
            }
        },
        {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
        }
    ],
    enforce: 'post',
    exclude: /node_modules|\.spec\.js$/
})

module.exports = function(config) {
    config.set({
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],
        files: [
            {
                pattern: 'node_modules/chai/chai.js',
                watched: false
            },
            'app/index.spec.js'
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/index.spec.js': ['webpack', 'sourcemap']
        },
        webpackMiddleware: {
            noInfo: true
        },
        webpack: webpack,
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage-istanbul'],
        specReporter: {
            maxLogLines: 5, // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false, // do not print information about failed tests
            suppressPassed: false, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: true, // print the time elapsed for each spec
            failFast: true // test would finish with error when a first fail occurs.
        },
        coverageIstanbulReporter: {
            reports: ['text'],
            fixWebpackSourcePaths: true
        },
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromiumHeadless'],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
