module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          update: true,
          sourcemap: 'auto'
        },
        files: {
          'css/style.css' : 'scss/style.scss',
          'css/layout/layout.css' : 'scss/layout/layout.scss',
          'css/theme/theme.css' : 'scss/theme/theme.scss',
          'css/component/component.css' : 'scss/component/component.scss',
          'css/base/base.css' : 'scss/base/base.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
  grunt.registerTask('dev',['sass','watch']);
}
