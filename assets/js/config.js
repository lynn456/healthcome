
define({
    isMobile: mobileCheck(),
	location: location.protocol+'//'+location.host+'/',
	api: location.protocol+'//'+location.host+'/',
	pathName: location.pathname.split("/")[location.pathname.split("/").length-1].split(".")[0]
})

function mobileCheck() {
    return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera);
}



var config = {
	apiKey: "AIzaSyB9krhxU05Mvw6lo_k5vqFDuABZHm_PGNc",
	authDomain: "potent-terminal-141002.firebaseapp.com",
	databaseURL: "https://potent-terminal-141002.firebaseio.com",
	projectId: "potent-terminal-141002",
	storageBucket: "potent-terminal-141002.appspot.com",
	messagingSenderId: "60385062687"
};
firebase.initializeApp(config);

var DB = {
	/*
	var ref = DB.select('products')

	ref.on("value", function(snapshot) {
	   console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	*/
	select: function($table) {
		return firebase.database().ref($table)
	},
	create: function($table, $data) {
		// ID = timeStamp
		var timeStamp = Math.floor(Date.now());
		firebase.database().ref($table + '/' + timeStamp).set($data);
	},
	delete: function($table, $id) {
		firebase.database().ref($table + '/' + $id).remove();
	},
};

var File = {
	upload: function($fileObject, $folder, $filename) {
		var $folder = $folder || '',
		$filename   = $filename || Math.floor(Date.now())

		var storage = firebase.storage(),
		ref = storage.ref($folder + '/' + $filename)
		ref.put($fileObject)
	},
	delete: function($folder, $filename) {
		var $folder = $folder == '/' ? '' : $folder
		
		var ref = firebase.storage().ref()
		ref.child($folder + '/' + $filename)
		.delete()
		.then(function() {
			console.log('success')
		}).catch(function(error) {
			console.log(error)
		})
	}
}