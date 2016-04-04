module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        // Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata
        meta: {
            srcCss: '../../css/',
            destCss: '../../../public/css/',
            srcJs: '../',
            destJs: '../../../public/js/',
            srcTemplates: '../views/'
        },

        // Sass Compass pre-processor
        compass: {
            dist: {
                options: {
                    sassDir: '<%= meta.srcCss %>',
                    cssDir: '<%= meta.destCss %>'
                }
            }
        },

        // Precompile templates
        htmlConvert: {
            'hwTemplates': {
                dest: '<%= meta.srcTemplates %>results/templates.js',
                src: [
                    '<%= meta.srcTemplates %>*.html'
                ]
            }
            
            
        },

        // Uglify js
        uglify: {
            all: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    '<%= meta.destJs %>all.js': [
                        '<%= meta.srcTemplates %>results/templates.js',
                        '<%= meta.srcJs %>vendors/jquery-1.10.2.js',
                        '<%= meta.srcJs %>vendors/jquery-ui.js', 
                        '<%= meta.srcJs %>vendors/velocity.js',
                        '<%= meta.srcJs %>vendors/velocity.ui.js',
                        '<%= meta.srcJs %>vendors/jquerypp.js',
                        '<%= meta.srcJs %>vendors/nouislider.js',
                        '<%= meta.srcJs %>vendors/can.custom.js',
                        '<%= meta.srcJs %>controllers/prices-cont.js',
                        '<%= meta.srcJs %>controllers/origin-cont.js',
                        '<%= meta.srcJs %>controllers/slider-cont.js',
                        '<%= meta.srcJs %>controllers/map-cont.js',
                        '<%= meta.srcJs %>controllers/app-cont.js'
                    ]
                }
            }

        },
        
        // Watch for changes to the JS and SCSS
        watch: {
            options: {
                livereload: true
            },
            
            compass: {
                files: ['<%= meta.srcCss %>**/*.scss'],
                tasks: ['compass']
            },

            js: {
                files: ['<%= meta.srcJs %>**/*.js', '<%= meta.srcTemplates %>**/**/**/*.html'],
                tasks: ['htmlConvert', 'uglify']
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['compass', 'htmlConvert', 'uglify', 'watch']);

};
