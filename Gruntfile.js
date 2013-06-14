/*
 * grunt-fileindex
 * https://github.com/Bart/grunt-fileindex
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		clean: {
			tests: ['tmp']
		},
		fileindex: {
			options: {
				sort: true
			},
			script_src: {
				options: {
					type: 'script_src'
				},
				files: [
					{dest: 'tmp/script_src.js', src: ['**/*'], cwd: 'test/files', filter: 'isFile'}
				]
			},
			json_flat: {
				options: {
					type: 'json_flat'
				},
				files: [
					{dest: 'tmp/json_flat.json', src: ['**/*'], cwd: 'test/files', filter: 'isFile'}
				]
			},
			lines: {
				options: {
					type: 'lines'
				},
				files: [
					{dest: 'tmp/lines.txt', src: ['**/*'], cwd: 'test/files', filter: 'isFile'}
				]
			}
		},
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'fileindex', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);
	grunt.registerTask('run', ['jshint', 'clean', 'fileindex']);

};
