/**
 * Module dependencies.
 */

var express = require('express');
var im = require('imagemagick');
var request = require('request');
var url = require('url');
var temp = require('temp');
var fs = require('fs');
var stream = require('stream');
var routes = require('./routes');
var http = require('http');
var path = require('path');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.get('/resize/:u/:x', function(req, res, next){
	var u = req.params.u;
	var x = req.params.x;
	var parsedurl = url.parse(u);
	var ext = path.extname(parsedurl.pathname);
	var tempimg = '';
	var tempdest = '';
	
	if(x > 10000 || x <= 0){//only accept dimensions from 1 to 10000 pixels
		res.send(406, 'Sorry, the dimensions provided were outside the acceptable range.  '
				+ 'Please provide dimensions from 1 to 10000 pixels.');
	} else{
		if (ext != '.jpg' && ext != '.png' && ext != '.jpeg' && ext != '.bmp') {//only accept these file formats
			res.send(415, 'Sorry, the URL provided is not an accepted image format. ' 
					+ 'Please provide a URL with a .jpg, .jpeg, .bmp, or .png extention.');
		} else{
			temp.open({suffix: '.jpg'}, function(err, info){//Create a temporary file
				if (err) throw err;
				tempimg = info.path;//Store the path of the file for future use
				console.log('Creating file ' + tempimg);
				var tempimgfd = info.fd;//Store the file descriptor so I can close the file later
				temp.open({suffix: '.jpg'}, function(err, info){
					if (err) throw err;
					tempdest = info.path;
					console.log('Creating file ' + tempdest);
					var tempdestfd =info.fd;
					request(u, function(error, response, body){//Go get the file at URL u
						console.log('request is done writing ' + tempimg);
						if(error || response.statusCode != 200) { //if the status code of the response was not 200,
										//or request got an error, I know that I didn't get the image I expected
							fs.closeSync(tempdestfd);//Clean up temp files, I won't be using them.
							fs.unlinkSync(tempdest);
							console.log('fs is done deleting ' + tempdest);
							fs.closeSync(tempimgfd);
							fs.unlinkSync(tempimg);
							console.log('fs is done deleting ' + tempimg);
							res.send(415, 'Sorry, the URL provided '
									+ 'did not respond with an \'OK\' status code');
						} else{		
							im.resize({ //This resizes the file
								srcPath: tempimg,
								dstPath: tempdest,
								width: x,
								format: 'jpg'
							}, function(err, stdout, stderr) {
								if (err) throw err;
								console.log('ImageMagick is done writing ' + tempdest);
								fs.close(tempimgfd, function(err){ //Done with tempimg, 
												//close the file and delete it asynchronously so that 
												//the response can be sent at the same time
									if (err) throw err;
									fs.unlink(tempimg, function(err){
										if (err) throw err;
										console.log('fs is done deleting ' + tempimg);
									});
								});
								res.sendfile(tempdest, function(err){//Send the resized file as our response
									if (err) throw err;
									fs.closeSync(tempdestfd);//Done with tempdest, close the file and delete it
									fs.unlinkSync(tempdest);
									console.log('fs is done deleting ' + tempdest);
								});
							});
						}
					}).pipe(fs.createWriteStream(tempimg));//piping the request into the temporary file
				});
			});
		}	
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
