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
		var newClass = $("#inputName").val();
		SITE.functions.create_instance(newClass);
	});
	$(".btn-join").click(function(event) {
		var classCode = $("#inputCode").val();
		var classId = $("#inputId").val();
		if(classCode == "" || classId == "") {
			$("#warning").addClass("show");
			setTimeout(function() {
				$("#warning").removeClass("show");
			}, 2000);
		} else {
			SITE.functions.check_code(classCode, classId);
		}
	});
	$(".btn-send").click(function(event) {
		event.preventDefault();
		var question = $("#question").val();
		var classId = $("#inputId").val();
		SITE.functions.publish_question(question, classId);
	});

	$(".btn-back").click(function() {
		$(".professor-share").removeClass("show");
		$(".student-question").removeClass("show");
	});
},

functions: {
	create_instance: function(className) {
		var key = (new Date().getTime()+'').substr(6,7);
		var classPath = "classes/"+key;
		var newPostKey = firebase.database().ref().child(classPath).update({
			"id": key,
			"className": className
		});
		newPostKey.then(function() {
			$(".professor-share").addClass("show");
			firebase.database().ref().once("value")
			.then(function(dataSnapshot){
				console.log(dataSnapshot.val().classes[key]["id"]);
				$("#shareCode").text(dataSnapshot.val().classes[key]["id"]);
			});
		});
	},

	publish_question: function(question, ClassId) {
		var classPath = "classes/"+ClassId;
		var key = 0;
		firebase.database().ref().once("value")
		.then(function(dataSnapshot){
			var currentQuestions = dataSnapshot.val().questions;
			if (currentQuestions[ClassId]) {
				key += Object.keys(currentQuestions[ClassId]).length + 1;
			}
			var questionObject = {};
			questionObject[key+'t'] = question;
			var newPostKey = firebase.database().ref().child("questions/"+ClassId).update(questionObject);
		});

		$("#confirmSubmission").addClass("show");
		setTimeout(function() {
			$("#confirmSubmission").removeClass("show");
		}, 2000);
	},

	check_code: function(className, idName) {
		var classPath = "classes/"+idName;
		firebase.database().ref().once("value")
		.then(function(dataSnapshot){
			try {
				if(dataSnapshot.val().classes[idName]["id"] == idName) {
					$(".student-question").addClass("show");
				}
			} catch (e) {
				$("#warning").addClass("show");
				setTimeout(function() {
					$("#warning").removeClass("show");
				}, 2000);
			}
		});
	}
}
};

//3720807

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
