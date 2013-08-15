
/**
 * Module dependencies.
 */

var express = require('express');
var im = require('imagemagick');
var request = require('request');
var url = require('url');
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
	
	if(x<=10000&&x>0){
		if (ext=='.jpg'||ext=='.png'||ext=='.jpeg'||ext=='.bmp') {
			request(u, function(){
				console.log('request is done writing img.jpg');
				im.resize({
					srcPath: 'img.jpg',
					dstPath: 'imgResized.jpg',
					width: x,
					format: 'jpg'
				}, function(err, stdout, stderr) {
					if (err) throw err;
					console.log('ImageMagick is done');
					res.sendfile('imgResized.jpg', function(){
						fs.unlinkSync('imgResized.jpg');
					});
				});
			}).pipe(fs.createWriteStream('img.jpg'));
		}else
		{
			res.send(400, 'Sorry, the URL provided is not an accepted image format.  Please provide a URL with a .jpg, .jpeg, .bmp, or .png extention.');
		}
	}else
	{
		res.send(400, 'Sorry, the dimensions provided were outside the acceptable range.  Please provide dimensions from 1 to 10000 pixels.');
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
