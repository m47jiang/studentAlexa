var js_list = [
		// All JS in the libs folder
		//'source/js/libs/*.js',

		'source/js/libs/html5-shiv.js',
		'source/js/libs/jquery-3.2.0.min.js',
		'source/js/libs/respond.min.js',
		'source/js/sitewide.js'
		]

		module.exports = function(grunt){

	// load grunt tasks automatically
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	// project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		include_file: {
			default_options: {
				cwd: 'source/',
				src: ['index.html'], //put all main html files here to be watched, should update to wildcard
				dest: 'build/'
			}
		},
		sass: {
			dist: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: {
					'source/css/sitewide.css': 'source/sass/sitewide.scss',
				}
			}
		},
		sync: {
			main: {
				files: [
					//{src: ['source/**'], dest: 'dest/'}, // includes files in path and its subdirs
					{	cwd: 'source/',
					src: [
					'**/favicon.ico',
					'**/robots.txt',
					'img/**',
					'fonts/**',
					'css/sitewide.css',
					'js/libs/**',
					'js/sitewide.js',
					],
						dest: 'build/'}, // makes all src relative to dest
						]
					},
			//failOnError: true,
			//verbose: true,
			//updateAndDelete: true,
			compareUsing: "md5"
		},
		watch: {
			//tasks: ['concat', 'babel'],
			tasks: ['sync', 'include_file'],
			files: {
				files: ['source/*.html', 'source/partials/*.html'], //for including small reusable parts on a page
				tasks: ['include_file'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['source/sass/**'],
				tasks: ['sass', 'sync'],
				options: {
					spawn: false,
				},
			},
			scripts: {
				files: ['source/js/**'],
				tasks: ['sync'],
				options: {
					spawn: false,
				},
			},
		}


	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-include-file');


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sync');

	grunt.registerTask('default', ['sass', 'sync', 'include_file']);

	grunt.registerTask('runCopy', ['copy']);
	grunt.registerTask('runUglify', ['uglify']);
	grunt.registerTask('dev', ['watch']);
	grunt.registerTask('smush', ['imagemin']);

};
