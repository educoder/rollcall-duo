module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['./*.js']
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s) .
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('lint', ['jshint']);
};