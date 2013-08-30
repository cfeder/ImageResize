# How to run the nodeunit integration tests

These test a running server by issuing http get commands and checking the response status code.

Install nodeunit globally.  If on Windows, ensure that the npm folder is in your path.  

On Windows 7, it is C:\Users\UserName\AppData\Roaming\npm

npm install nodeunit -g

Start the node server.

Open another command prompt and navigate to the ImageResize\Tests folder and type:

nodeunit tests.js

Tests take about 2 minutes to run on my system, and then nodeunit takes about an additional two minutes to actually exit and bring you back to a command prompt.  I spent a long time attempting to debug that issue, and I cannot figure out what is causing the hang.  The server responds quite rapidly, the tests should be able to run in a matter of seconds, not minutes.

Currently the tests are configured pointing at the default google image. You can configure the tests to use any image by changing the variables at the top of the tests.js file.  You can also point the tests at a different URL besides the default of http://127.0.0.1:3000

