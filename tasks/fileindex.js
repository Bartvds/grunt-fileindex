/*
 * grunt-fileindex
 * https://github.com/Bart/grunt-fileindex
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

//declare for exporting later
var lib = require('../lib/formats');

module.exports = function (grunt) {

	lib.init(grunt);

	var pluralise = function (str, num, post) {
		if (num === 1) {
			return str;
		}
		return str + (typeof post === 'undefined' ? 's' : post);
	};

	grunt.registerMultiTask('fileindex', 'Your task description goes here.', function () {

		var util = require('util');
		var path = require('path');

		var options = this.options({
			format: 'lines',
			sort: false,
			absolute: false,
			pretty: true
		});

		if (typeof options.format === 'string' && !lib.formats.hasOwnProperty(options.format)) {
			grunt.log.fail('output type "' + options.format + '" not found');
			return false;
		}

		var writer;
		var label;
		if (typeof options.format === 'function') {
			writer = options.format;
			label = 'custom callback';
		}
		else {
			writer = lib.formats[options.format];
			label = options.format;
		}

		var files = 0;
		var sets = 0;
		this.files.forEach(function (f) {
			var list = [];
			sets++;

			//grunt.log.writeln(util.inspect(f, false, 10));
			//grunt.log.writeln(util.inspect(f.src, false, 10));

			f.src.forEach(function (src) {
				var filepath = src;
				if (f.cwd) {
					filepath = path.join(f.cwd, src);
				}
				if (options.absolute) {
					src = path.resolve(filepath);
				}
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('source file "' + filepath + '" not found.');
					return;
				}
				files++;
				list.push(src);
			});

			if (options.sort) {
				list.sort();
			}
			var ret = writer(list, options, f.dest);
			if (typeof ret !== 'undefined') {
				grunt.file.write(f.dest, ret);
			}
		});

		grunt.log.ok('listed ' + files + ' ' + pluralise('file', files) + ' in ' + sets + ' "' + label + '" ' + pluralise('index', sets) + '');

		return true;
	});
};

module.exports.formats = lib.formats;
