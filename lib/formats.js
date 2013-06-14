/**
 * Created with JetBrains WebStorm.
 * User: Bart
 * Date: 14-6-13
 * Time: 20:55
 * To change this template use File | Settings | File Templates.
 */

var formats = {};
var expose = {};
expose.formats = formats;
expose.init = function(grunt){

	formats.json_flat = function (dest, list, options) {
		return JSON.stringify(list, null, (options.pretty ? 4 : 0)) + (list.length > 0 ? '\n' : '');
	};

	formats.lines = function (dest, list, options) {
		return list.join('\n') + (list.length > 0 ? '\n' : '');
	};

	formats.script_src = function (dest, list, options) {
		var lines = [];
		grunt.util._.each(list, function (file) {
			lines.push('document.write(\'<script src="' + file + '"></script>\');\n');
		});
		return lines.join('');
	};
};
module.exports = expose;