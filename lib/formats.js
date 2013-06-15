var formats = {};
var expose = {};
expose.formats = formats;
expose.init = function (grunt) {

	formats.json_flat = function (list, options, dest) {
		return JSON.stringify(list, null, (options.pretty ? 4 : 0)) + (list.length > 0 ? '\n' : '');
	};

	formats.lines = function (list, options, dest) {
		return list.join('\n') + (list.length > 0 ? '\n' : '');
	};

	formats.script_src = function (list, options, dest) {
		var lines = [];
		grunt.util._.each(list, function (file) {
			lines.push('document.write(\'<script src="' + file + '"></script>\');\n');
		});
		return lines.join('');
	};
};
module.exports = expose;
