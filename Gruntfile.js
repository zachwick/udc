module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		docco: {
			src: ['public/js/candidates.js'],
			options: {
				output: 'docs/'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-docco');

	grunt.registerTask("default", ['docco']);
	grunt.registerTask("docs", ['docco']);
	grunt.registerTask("build", ['docco']);
};
