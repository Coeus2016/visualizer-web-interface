// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};

function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return path.slice(-8) == ".spec.js";
}

function isBuiltFile(path) {
    var builtPath = '/base/src/app/';
    return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

System.config({
    baseURL: '/base',
    packageWithIndex: true // sadly, we can't use umd packages (yet?)
});


/*System.config(
    {
        map: {
            'app':                        'app', // 'dist',
            '@angular':                   'node_modules/@angular',
            // 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
            'rxjs':                       'node_modules/rxjs',
            'materialize-css': 'node-modules/materialize-css',
            'materialize': 'node_modules/angular2-materialize',
            'angular2-materialize': 'node_modules/angular2-materialize'
        },
        packages: {
            'app': {
                main: 'main.js',
                defaultExtension: 'js'
            },
            'materialize-css': { 'main': 'dist/js/materialize'},
            'materialize': { 'main': 'dist/materialize-directive', 'defaultExtension': 'js'},
            '@angular/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/compiler': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/common': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@angular/platform-browser-dynamic': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            // '@angular/router-deprecated': {
            //   main: 'index.js',
            //   defaultExtension: 'js'
            // },
            // '@angular/router': {
            //   main: 'index.js',
            //   defaultExtension: 'js'
            // },
            'rxjs': {
                defaultExtension: 'js'
            }
        }
    });*/
System.import('src/systemjs.config.js').then( function(){



    return Promise.all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
    ])
    })
    .then(function (providers) {
        var testing = providers[0];
        var testingBrowser = providers[1];

        testing.setBaseTestProviders(
            testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
            testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

    })
    .then(function() {
        // Finally, load all spec files.
        // This will run the tests directly.
        return Promise.all(
            allSpecFiles.map(function (moduleName) {
                return System.import(moduleName);
            }));
    })
    .then(__karma__.start, __karma__.error);

/*Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('reflect-metadata');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);*/

