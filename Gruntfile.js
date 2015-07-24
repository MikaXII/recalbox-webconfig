/**
 * Grunt config
 */
module.exports = function(grunt) {
	grunt.initConfig({
		express: {
			options: {
				// Override defaults here
			},
			dev: {
				options: {
					script: 'bin/www',
					port: 3000,
				}
			},
			prod: {
				options: {
					script: 'bin/www',
					port: 80,
					node_env: 'production'
				}
			}
		},

		watch: {
			express_dev: {
				files:  [ 'src/**/*.js'],
				tasks:  [ 'express:dev' ],
				options: {
					spawn: false, // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
					livereload: true
				}
			},
			cssmin: {
				files: ['src/**/*.css'],
				tasks:  ['cssmin'],
				options: {
					spawn: false, // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
					livereload: true
				}
			}
		},

		cssmin: {
			target: {
				files: [{
					'public/css/recalbox.min.css': ['src/css/*.css']
				}]
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Create custom tasks
	grunt.registerTask('server:dev', [ 'express:dev', 'watch' ])
	grunt.registerTask('server', [ 'express:prod', 'watch' ])
};
