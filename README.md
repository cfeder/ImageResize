# ImageResize

## Dependencies
node.js: http://nodejs.org/download/

npm install express
npm install jade
npm install imagemagick
npm install request

Install ImageMagick into the project directory: http://www.imagemagick.org/script/index.php

## Usage
npm start
Server will listen on port 3000

Primary route:
/resize/URL/X
URL must be a URL which ends in .jpg, .jpeg, .png, or .bmp
The URL must be URL encoded. You can use http://meyerweb.com/eric/tools/dencoder/ to URL encode your URL.
X is the desired width dimension, measured in pixels, which must be between 1 and 10000, inclusive.
The image located at the URL provided will be resized, maintaining aspect ratio, with the new width equal to the x value provided.





Created with [Nodeclipse v0.4](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   
