/*
	Gulp is a system that automates various tasks, such as linting, 
		icon management, compiling and minifying files, obfuscating 
		javascript, and asset management.

	1) INSTALL NODE:
		* Node.js (http://nodejs.org/) - This comes bundled with npm, 
				which you'll also need.

	2) NAVIGATE TO THE DIRECTORY:
		* On Mac/Linux: Navigate to the project directory in the 
			terminal. 
		* On Windows: Using the "Node.js Command Prompt" (accessible 
			from the Start menu) navigate to the project directory with 
			this file in it. The default Windows command line will not 
			work, because it sucks. 

	3) INSTALL PROJECT DEPENDENCIES:
		$ npm install

	4) RUN GULP:
		$ gulp

		* Run Gulp before making changes. It will run in the 
			background and compile and process things as you work.

		* Gulp currently does not recognise when new files are added. 
			When adding new files, stop the Gulp process with Cmd+C/
			Ctrl+C and re-run it afterwards.
*/

var settings = {
	directoryImage: "img",
	colorBackground: "#000000",
	colorText: "#ffffff",
	colorLink: "#ff0000",
	fontStack: "Helvetica, Arial, sans-serif"
};

var gulp = require("gulp");
var replace = require("gulp-replace");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");

gulp.task("htmlmin", function() {
	gulp.src("source/index.html")
	.pipe(replace("{{DIR:IMAGE}}", settings.directoryImage))
	.pipe(replace("{{COLOR:BACKGROUND}}", settings.colorBackground))
	.pipe(replace("{{COLOR:TEXT}}", settings.colorText))
	.pipe(replace("{{COLOR:LINK}}", settings.colorLink))
	.pipe(replace("{{FONTS}}", settings.fontStack))
	.pipe(htmlmin({
		removeComments: true,
		collapseWhitespace: true,
		minifyCSS: true,
		collapseWhitespace: true,
		conservativeCollapse: true
	}))
	.pipe(gulp.dest("distribution"))
});

gulp.task("imagemin", function() {
	gulp.src("source/img/*")
	.pipe(newer("distribution/img"))
	.pipe(imagemin({
		optimizationLevel: 3, // png
		progressive: true, // jpg
		interlaced: true, // gif 
		multipass: true // svg
	}))
	.pipe(gulp.dest("distribution/img"));
});

gulp.task("default", function() {
	gulp.watch("source/index.html", ["htmlmin"]);
	gulp.watch("source/img/*", ["imgmin"]);
});

