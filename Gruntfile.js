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
			}
		},
		watch: {
			express: {
				files:  [ '**/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Create custom tasks
	grunt.registerTask('server:dev', [ 'express:dev', 'watch' ])
};
