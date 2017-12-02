// Basic JS function based setup, will most likely be changed later
//	on with something like React, but for now put all page-specific
//	functions into there respective functions below (people_page, gifs_page, etc.)

// Everything is housed within the SITE object.
// Call all functions inside by referring back to SITE
//	example: to call gifs_page call SITE.gifs_page();
//	You *could* technically call this.gifs_page(); but lets
//	just use SITE for now since these will all be refactored
//	later into new functions.

var SITE = {

/* Methods
=============================================*/	
init: function(){

	$("#IdStudent").click(function() {
		$(".create").removeClass("show");
		$(".join").addClass("show");
	});
	$("#IdProfessor").click(function() {
		$(".join").removeClass("show");
		$(".create").addClass("show");
	});

	$(".btn-create").click(function(event) {
		var $form = $(this);
		var newClass = $("#inputName").val();
		console.log(newClass);
		SITE.functions.create_instance(newClass);
		// $(location).attr("href","professor.html");
	});
},

functions: {

	create_instance: function(className) {
		var key = (new Date().getTime()+'').substr(6,7);
		var classPath = "classes/"+className;
		var newPostKey = firebase.database().ref().child(classPath).update({
			"id": key,
			"className": className
		});
		return
	}
}
};


//Document.ready function below, when ready call the init() function
$(window).on('load', function() { //on load waits for all images to load, you can switch to .ready instead if you want
	var config = {
		apiKey: "AIzaSyCERQ4Q8jFaBJ_NY4QUmOcMdTyPU5uMvck",
		authDomain: "student-alexa.firebaseapp.com",
		databaseURL: "https://student-alexa.firebaseio.com",
		projectId: "student-alexa",
		storageBucket: "",
		messagingSenderId: "395199799046"
	};
	firebase.initializeApp(config);
	SITE.init();
});