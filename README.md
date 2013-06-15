# grunt-fileindex

[![Dependency Status](https://gemnasium.com/Bartvds/grunt-fileindex.png)](https://gemnasium.com/Bartvds/grunt-fileindex)

> Write index files of directory contents

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fileindex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fileindex');
```

## The "fileindex" task

Leverage the standard grunt file selector api to select files and output lists of according to various pluggable formats. Currently supported:

* `lines` - newline seperated
* `json_flat` - simple json array
* `script_src` - list of `document.write('<script src="{path}"></script>');` (useful to update javascript includes, like a list of tests).

More will added later or at request.

### Options

````
//default options:
format: 'lines'
sort: true
absolute: false

//not supported by all formats:
pretty: true
````

### Usage Examples

```js
grunt.initConfig({
	fileindex: {
		lines: {
			options: {
				format: 'lines',
				absolute: true,
			},
			files: [
				{dest: 'tmp/index.txt', src: ['**/*']}
			]
		},
		list: {
			options: {
				format: 'json_flat',
				pretty: true
			},
			files: [
				{dest: 'tmp/list.json', src: ['**/*']}
			]
		},
		scripts: {
			options: {
				format: 'script_src'
			},
			files: [
				{dest: 'test/all.js', src: ['**/*.test.js'], cwd: 'test', filter: 'isFile'}
			]
		},
		custom: {
			options: {
				format: function(list, options, dest) {
					return '<p>\n' + list.sort().reverse().join('<br>\n') + '\n</p>\n';
				}
			},
			files: [
				{dest: 'tmp/custom.txt', src: ['**/*'], cwd: 'test/files', filter: 'isFile'}
			]
		}
	}
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## History

* 0.1.0 - First release

## License

Copyright (c) 2013 Bart van der Schoor
Licensed under the MIT license.