module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            init: ["build"],
            retina: ["build/library/**/*@*x.png"],
            examples: ["build/library/**/*.html"],
            debug: ["build/library/knockout-*.debug.js"]
        },
        copy: {
            main: {
                expand: true,
                cwd: "www",
                src: "**",
                dest: "build"
            },
            retina: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/library',
                        src: [
                            '**/*@*x.png'
                        ],
                        dest: "build/library/",
                        rename: function (dest, src) {
                            return dest + src.replace(/@[\d\.]+x/, '');
                        }
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("build", [
        "clean:init",
        "copy:main",
        "clean:examples",
        "clean:debug",
        "copy:retina",
        "clean:retina"
    ]);
};