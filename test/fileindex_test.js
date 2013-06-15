'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
exports.fileindex = {
	json_flat: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/json_flat.json');
		var expected = grunt.file.read('test/expected/json_flat.json');
		test.equal(actual, expected);
		test.done();
	},
	lines: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/lines.txt');
		var expected = grunt.file.read('test/expected/lines.txt');
		test.equal(actual, expected);
		test.done();
	},
	script_src: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/script_src.js');
		var expected = grunt.file.read('test/expected/script_src.js');
		test.equal(actual, expected);
		test.done();
	},
	custom: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/custom.txt');
		var expected = grunt.file.read('test/expected/custom.txt');
		test.equal(actual, expected);
		test.done();
	}
};
