module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['systemjs','jasmine'],

    files: [
      {pattern: 'karma-test-shim.js', watched: false}
    ],

    preprocessors: {

    },

    systemjs: {
        configFile: 'src/systemjs.config.js',
        serverFiles: [
            'src/**/*.ts'
        ],
        config: {
            paths:{
                'typescript': 'node_modules/typescript/lib/typescript.js',
                'systemjs': 'node_modules/systemjs/dist/systen.js',
                'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
            },
            packages: {
                'src': {
                    defaultExtension: 'ts'
                }
            },
            transpiler: 'typescript'

        }
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
  };

  config.set(_config);
};
