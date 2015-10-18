var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
//var supertest = require('supertest');
var apidoc = require('gulp-apidoc');


gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000,
            db: 'mongodb://localhost/expenses'
        },
        ignore: ['./node_modules']
    })
    .on('restart', function () {
        console.log('Restarting');
    });
});

gulp.task('apidoc', function (done) {
    apidoc({
        src: 'routes/',
        dest: 'docs/'
    }, done)
});


gulp.task('test', function () {
    env({
        vars: {
            ENV: 'Test',
            db: 'mongodb://localhost/expenses_test'
        }
    });
    gulp.src('tests/**/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
        //TODO tmp fix, mogo connection should be closed properly
        .once('end', function () {
            process.exit();
        });
});
