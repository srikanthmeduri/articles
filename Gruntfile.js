'use strict';

var paths = {
    js: ['server/tests/serverSpec.js']
};

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            options: {
                reporter: 'spec',
                require: [
                    'app.js'
                ]
            },
            src: paths.js
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Test task.
    grunt.registerTask('test', ['mochaTest', 'karma:unit']);

};
