// Karma configuration
// Generated on Thu Nov 30 2017 10:22:56 GMT-0500 (EST)

module.exports = function(config) {

    let configuration = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // custom launcher for travis.
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'jasmine-matchers'],

        // list of files / patterns to load in the browser
        files: [
            /* Dependencies */
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',

            /* App files */
            './src/app/trtl.i18n.module.js',
            './src/app/trtl.app.module.js',
            './src/app/trtl.i18n.strings.mock.js',
            './src/app/**/*.controller.js',

            /* Test files */
            './src/app/**/*.test.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec'],

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
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    };

    // Set custom configuration for travis.
    if (process.env.TRAVIS) {

        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
