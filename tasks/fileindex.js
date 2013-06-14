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
			type: 'json',
			sort: true,
			absolute: false,
			pretty: true
		});

		if (!lib.formats.hasOwnProperty(options.type)) {
			grunt.log.fail('output type "' + options.type + '" not found');
			return false;
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

			var writer = lib.formats[options.type];
			grunt.log.writeln('-> type "' + options.type + '"');
			var ret = writer(f.dest, list, options);
			if (typeof ret !== 'undefined') {
				grunt.file.write(f.dest, ret);
			}
		});

		grunt.log.ok('listed ' + files + ' ' + pluralise('file', files) + ' in ' + sets + ' ' + pluralise('set', sets) + ' as "' + options.type + '"');

		return true;
	});
};

module.exports.formats = lib.formats;
