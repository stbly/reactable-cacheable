// var markdownlint = require('markdownlint');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	/*grunt.registerMultiTask('markdownlint', function task() {
		var done = this.async();
		markdownlint(
			{ "files": this.filesSrc },
			function callback(err, result) {
				var resultString = err || ((result || '').toString());
				if (resultString) {
					grunt.fail.warn('\n' + resultString + '\n');
				}
				done(!err || !resultString);
			});
	});*/

	grunt.initConfig({
		watch: {
			build: {
				files: ['src/**/*.jsx'],
				tasks: ['build']
			},
			test: {
				files: ['tests/src/**/*.jsx','src/**/*.jsx'],
				tasks: ['test']
			}
		},
		babel: {
			options: { sourceRoot: 'src' },
			common: {
				files: {
					'lib/reactable-cacheable.js': 'src/reactable-cacheable.jsx',
					'lib/reactable-cacheable/cacheable-table.js': 'src/reactable-cacheable/cacheable-table.jsx',
					'lib/reactable-cacheable/cacheable-row.js': 'src/reactable-cacheable/cacheable-row.jsx',
					// 'lib/lib/extract_data_from.js': 'src/lib/extract_data_from.jsx',
				},
				// options: { modules: 'common' }
			},
			test: {
				files: {
					'tests/src/reactable-cacheable-test.js': 'tests/src/reactable-cacheable-test.jsx',
				}
				// options: { modules: 'common' }
			}
		},
		concat: {
			dist: {
				src: [
					'tmp/reactable-cacheable.js'
				],
				dest: 'build/reactable-cacheable.js'
			}
		},
		file_append: {
			umdHack: {
				files: [{
					prepend: 'window.React["default"] = window.React;\n' +
							 'window.ReactDOM["default"] = window.ReactDOM;\n',
					input: 'build/reactable-cacheable.js',
					output: 'build/reactable-cacheable.js'
				}]
			}
		},
		browserify: {
			test: {
				src: 'tests/src/reactable-cacheable-test.js',
				dest: 'tests/build/js/init.js'
			},
			build: {
				src: 'lib/reactable-cacheable.js',
				dest: 'build/reactable-cacheable.js'
			}
		},
		'http-server': {
			dev: {
				root: 'tests/build/',
				port: 8888, 
			},
		}
		/*markdownlint: {
			readme: {
				"src": [ "README.md" ]
			}
		}*/
	});

	// grunt.registerTask('testOnce', ['build', 'karma']);
	// grunt.registerTask('test', ['testOnce', 'watch:test']);
	// grunt.registerTask('ci', ['testOnce', 'markdownlint:readme'])

	// grunt.registerTask('buildBrowser', ['babel:umd', 'concat', 'file_append:umdHack'])
	// grunt.registerTask('build', ['babel:common', 'buildBrowser']);
	// grunt.registerTask('default', ['build', 'watch:build']);
	grunt.registerTask('build', ['babel:common','browserify:build'])
	grunt.registerTask('test', ['build', 'babel:test','browserify:test','watch:test','http-server:dev']);
};

