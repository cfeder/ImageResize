/**
 * New node file
 */

var http = require('http');

var googleimg = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.png";
var googleimgbaddns = "https%3A%2F%2Fwww.googlecom%2Fimages%2Fsrpr%2Flogo4w.png";//removed the . in google.com in order to make it unable for the DNS to look it up.
var googleimgbadstatuscode = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.jpg";//changed file extention to .jpg, one I accept, but which returns a 404 on google's server
var googleimgwrongformat = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.gif";//changed file extention to .gif, a file format I don't accept
var serverURL = "http://127.0.0.1:3000";

module.exports = {
	testbigimage: function (test) {
		http.get(serverURL + "/resize/" + googleimg + "/4000", function(response) {
			if(response.statusCode == 200) {
				test.ok(true, 'Recieved status code 200');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
				test.done();
			}
		}).on('error', function(e){
		    test.ok(false, "Received error message: " + e.message);
			test.done();
		});
	},
	testsmallimage: function (test) {
	    http.get(serverURL + "/resize/" + googleimg + "/1", function(response) {
			if(response.statusCode == 200) {
				test.ok(true, 'Recieved status code 200');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
			test.done();
	    });
	},
	testurlbaddns: function (test) {
	    http.get(serverURL + "/resize/" + googleimgbaddns + "/1", function(response) {
			if(response.statusCode == 404) {
				test.ok(true, 'Recieved expected status code 404');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
	    	test.done();
	    });
	},
	testurlbadstatus: function (test) {
	    http.get(serverURL + "/resize/" + googleimgbadstatuscode + "/1", function(response) {
			if(response.statusCode == 404) {
				test.ok(true, 'Recieved expected status code 404');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
	    	test.done();
	    });
	},
	testsizetoobig: function (test) {
	    http.get(serverURL + "/resize/" + googleimg + "/4001", function(response) {
			if(response.statusCode == 406) {
				test.ok(true, 'Recieved expected status code 406');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
	    	test.done();
	    });
	},
	testsizenotanumber: function (test) {
	    http.get(serverURL + "/resize/" + googleimg + "/a", function(response) {
			if(response.statusCode == 406) {
				test.ok(true, 'Recieved expected status code 406');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
	    	test.done();
	    });
	},
	testinvalidformat: function (test) {
	    http.get(serverURL + "/resize/" + googleimgwrongformat + "/1", function(response) {
			if(response.statusCode == 415) {
				test.ok(true, 'Recieved expected status code 415');
				test.done();
			}else{
				test.ok(false, "Received status code: " + response.statusCode);
			    test.done();
			}
	    }).on('error', function(e){
	    	test.ok(false, "Received error message: " + e.message);
	    	test.done();
	    });
	}
};