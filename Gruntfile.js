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
				tasks:  [ 'express:dev', 'jshint:all' ],
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
				options: {
					banner: '/* Recalbox minified CSS. Minified on <%= grunt.template.today("yyyy-mm-dd hh:MM:ss")%> by GruntJS-cssmin */'
				},
				files: [{
					'public/css/recalbox.min.css': ['src/css/*.css']
				}]
			}
		},
		uglify: {
			options: {
				mangle: false // prevent changes to variable name. Maybe set to 'true' after testing ?
			},
			target: {
				files: {
                                        'public/js/modernizr.min.js': [
                                            'foundation5/bower_components/modernizr/modernizr.js'
                                        ],
                                        'public/js/vendor.min.js': [
                                            'foundation5/bower_components/jquery/dist/jquery.js',
                                            'foundation5/bower_components/jquery.cookie/jquery.cookie.js',
                                            "foundation5/bower_components/foundation/js/foundation/foundation.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.abide.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.accordion.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.alert.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.clearing.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.dropdown.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.equalizer.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.interchange.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.joyride.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.magellan.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.offcanvas.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.reveal.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.slider.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.tab.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.tooltip.js",
                                            "foundation5/bower_components/foundation/js/foundation/foundation.topbar.js",
                                            //"foundation5/bower_components/foundation/js/foundation/foundation.orbit.js", //Orbit Slider is deprecated
                                            'src/vendor/*.js'
                                        ]
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'src/app/**/*.js']
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Create custom tasks
	grunt.registerTask('server:dev', [ 'express:dev', 'watch' ]);
	grunt.registerTask('server', [ 'express:prod', 'watch' ]);
};
