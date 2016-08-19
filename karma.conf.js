module.exports = function(config) {
    config.set({

    basePath: '',


    frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-coverage')
        ],

        customLaunchers: {
            // From the CLI. Not used here but interesting
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

    files: [

        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system-polyfills.js',





        // Polyfills
        'node_modules/core-js/client/shim.min.js',


        // Reflect and Zone.js
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',

        // RxJs.
        { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
        { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

        // Angular 2 itself and the testing library
        {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
        {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

        {pattern: 'src/systemjs.config.js', included: false, watched: false},
        'src/karma-test-shim.js',
       // {pattern: 'karma-test-shim.js', included: true, watched:true},
        {pattern: 'src/app/**/*.js', included: false, watched: true},



        // paths loaded via Angular's component compiler
        // (these paths need to be rewritten, see proxies section)
        {pattern: 'src/app/**/*.html', included: false, watched: true},
        {pattern: 'src/app/**/*.css', included: false, watched: true},

        // paths to support debugging with source maps in dev tools
        {pattern: 'src/app/**/*.ts', included: false, watched: false},
        {pattern: 'src/app/**/*.js.map', included: false, watched: false}
    ],
     proxies: {
         "/app/": '/base/src/app/'
     },

    preprocessors: {
        'src/app/**/!(*spec).js': ['coverage']
    },

    coverageReporter: {
        dir : 'coverage/',
	    reporters: [
	        { type: 'json'},
            { type: 'html'},
	        { type: 'text-summary' },
	        { type: 'lcovonly', subdir: '.'}
        ]
    },

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}
