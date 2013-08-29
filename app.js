/**
 * Module dependencies.
 */
var express = require('express')
, im = require('imagemagick')
, url = require('url')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, app = express();

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
	var ext = path.extname(parsedurl.pathname).toLowerCase();//Turns out file extensions can be uppercase
	
	
	var options = {
		hostname: parsedurl.hostname,
		port: parsedurl.port,
		path: parsedurl.pathname
	};
	
	if(isNaN (x) || x > 4000 || x <= 0){//only accept dimensions from 1 to 4000 pixels, and only accept numbers
		res.send(406, 'Sorry, the dimensions provided were outside the acceptable range.  ' +
				'Please provide dimensions from 1 to 4000 pixels.');
	} else{
		if (ext != '.jpg' && ext != '.png' && ext != '.jpeg' && ext != '.bmp') {//only accept these file formats
			res.send(415, 'Sorry, the URL provided is not an accepted image format. ' +
					'Please provide a URL with a .jpg, .jpeg, .bmp, or .png extention.');
		} else{
			http.get(options, function(response) {
				if(response.statusCode != 200) { //if the status code of the response was not 200
											//I know that I didn't get the image I expected
					res.send(404 , 'Sorry, the URL provided ' +
							'did not respond with an \'OK\' status code');
				} else{
					var data = '';
					response.setEncoding('binary');
					
					response.on('data', function(chunk) {
						data += chunk;
					});
					
					response.on('end', function () {
						im.resize({
							srcData: data,
							width: x,
							format: 'jpg'
						}, function(err, stdout, stderr) {
							if (err) throw err;
							res.writeHead(200, {'Content-Type': 'image/jpg' });
							res.end(stdout, 'binary');
						});
					});
				}
			}).on('error', function(e) { //this covers the case of a URL where the DNS entry cannot be found
				res.send(404 , 'Sorry, there was an error with the HTTP get, ' +
						'error message: ' + e.message);
			});
		}
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
