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
	
/* Globals Variables
=============================================*/	
	//cat: 'cat',


/* Methods
=============================================*/	
init: function(){
	$("#IdStudent").click(function() {
		$(".join").addClass("show");
		console.log("student");
	});
	$("#IdProfessor").click(function() {
		$(".create").addClass("show");
		console.log("professor");
	});
	$("IdStudent").click(function() {
		write_data("hello", "world");
	})
},

functions: {

		get_params: function(param) { // generic function for reading URL parameters
			var query = window.location.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				if (decodeURIComponent(pair[0]) == param) {
					return decodeURIComponent(pair[1]);
				}
			}
		},

		write_data: function(param) {

			var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
			starCountRef.on('value', function(snapshot) {
			  updateStarCount(postElement, snapshot.val());
			});
		},

		writeNewPost: function (first, second) {
			// A post entry.
			var postData = {
			  first: second
			};
		  
			// Get a key for a new Post.
			var newPostKey = firebase.database().ref().child('posts').push().key;
		  
			// Write the new post's data simultaneously in the posts list and the user's post list.
			var updates = {};
			updates['/posts/' + newPostKey] = postData;
			updates['/user-posts/' + uid + '/' + newPostKey] = postData;
		  
			return firebase.database().ref().update(updates);
		  }
	}
};


//Document.ready function below, when ready call the init() function
$(window).on('load', function() { //on load waits for all images to load, you can switch to .ready instead if you want
	SITE.init();
	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyCERQ4Q8jFaBJ_NY4QUmOcMdTyPU5uMvck",
		authDomain: "student-alexa.firebaseapp.com",
		databaseURL: "https://student-alexa.firebaseio.com",
		projectId: "student-alexa",
		storageBucket: "",
		messagingSenderId: "395199799046"
	};
	firebase.initializeApp(config);
});