module.exports = function(config) {
    config.set({

    basePath: './app',


    frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],

    files: [

        'bower_components/angular/angular.js',
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/angular-loader/angular-loader.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'test*/**/*.js'    ],

    preprocessors: {
        'test*/**/*.js': ['coverage']
    },

    coverageReporter: {
        dir : '../coverage/',
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
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  })
};
