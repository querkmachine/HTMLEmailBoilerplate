/*
		Grunt is a system that automates various tasks, such as linting, 
		compiling and minifying files, and obfuscation of javascript.

		DEPENDENCIES (you'll need these, preferably the latest versions of each):
		Node.js (http://nodejs.org/)
		Ruby for Windows (http://rubyinstaller.org/)
		Sass (http://sass-lang.com/) 

		Install Grunt:
				npm install -g grunt-cli

		Update/install project dependencies
				npm install
*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		imageDir: 'img/',
		hostedLink: '',
		backgroundColor: '#000000',
		foregroundColor: '#ffffff',
		linkColor: '#ffffff',
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			configFiles: {
				files: 'Gruntfile.js',
				options: {
					reload: true
				}
			},
			minify: {
				files: 'source.html',
				tasks: ['htmlmin:dist', 'replace:dist']
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyCSS: true,
					collapseWhitespace: true,
					conservativeCollapse: true
				},
				files: {
					'./distribution.html': './source.html'
				}
			}
		},
		replace: {
			dist: {
				src: 'distribution.html',
				dest: 'distribution.html',
				replacements: [{
					from: '_HOSTEDLINK__',
					to: '<%= hostedLink %>'
				}, {
					from: '_IMAGE__',
					to: '<%= imageDir %>'
				}, {
					from: '_BACKGROUNDCOLOR__',
					to: '<%= backgroundColor %>'
				}, {
					from: '_FOREGROUNDCOLOR__',
					to: '<%= foregroundColor %>'
				}, {
					from: '_LINKCOLOR__',
					to: '<%= linkColor %>'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

};

