/**
 * New node file
 */

var http = require('http');

var googleimg = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.png";
var googleimgbaddns = "https%3A%2F%2Fwww.googlecom%2Fimages%2Fsrpr%2Flogo4w.png";
var googleimgbadstatuscode = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.jpg";
var googleimgwrongformat = "https%3A%2F%2Fwww.google.com%2Fimages%2Fsrpr%2Flogo4w.gif";

exports.bigimage = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimg + "/4000", function(response) {
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
};

exports.smallimage = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimg + "/1", function(response) {
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
};

exports.urlbaddns = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimgbaddns + "/1", function(response) {
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
};

exports.urlbadstatus = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimgbadstatuscode + "/1", function(response) {
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
};

exports.sizetoobig = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimg + "/4001", function(response) {
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
};

exports.sizenotanumber = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimg + "/a", function(response) {
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
};

exports.invalidformat = function (test) {
    http.get("http://127.0.0.1:3000/resize/" + googleimgwrongformat + "/1", function(response) {
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
};