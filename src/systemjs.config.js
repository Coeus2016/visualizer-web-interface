(function(global) {
    
    var map = {
        'app':                        'app', // 'dist',
        '@angular':                   'node_modules/@angular',
       // 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       'node_modules/rxjs',
        'materialize-css': 'node-modules/materialize-css',
        'materialize': 'node_modules/angular2-materialize',
        'angular2-materialize': 'node_modules/angular2-materialize'
    };

    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        //'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'materialize-css': { 'main': 'dist/js/materialize'},
        'materialize': { 'main': 'dist/materialize-directive', 'defaultExtension': 'js'}
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];

    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
