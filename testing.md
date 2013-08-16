# Testing

I discovered many bugs while testing, and had to implement fixes.  My first version of the software 
didn't use temporary files, it used a hard coded file name, so it couldn't handle simultaneous requests.

Also, initially I was attempting to unlink the files without first closing the file descriptor, so they were 
not actually being deleted until the server exited, which could cause the server's harddrive to fill up.

I also discovered through testing that I needed to check the file extension and limit the file types I would 
accept. Then I tried resizing to very large numbers of pixels, and eventually discovered that imagemagick crashes 
if the size is too large, so I added a limit.

Then I tried changing the extensions on the URL, and found that if I modify a URL to one of the acceptable 
extensions it bypassed my check. In the case that the request returned a 404, it was not throwing an error 
and imageMagick would still try to resize it, and since it was not an image, the server would crash. As a 
result, I tried to check mime type of the file before I run imageMagick, but I was unable to get mmmagic to 
build on windows, which is the only node package for mine type which checks the contents of the file. Instead, 
I decided to check the status I get back from the request, and if it is not a 200, I know I didn't get the 
image I was expecting.

I also discovered that an invalid URL would crash the server, I added error handling to the request.  It cleans 
up the temp files, though the one which the request was piped to is unable to be deleted immediately.  It is 0 size, 
and it is cleaned up when the server exits, so I don't think that is a big problem.

I was occasionally able to get files to accumulate and not be deleted if I used a high pixel value and hit the URL 
over and over in quick succession. It didn't happen with medium size dimensions. This is a serious problem which 
could cause the hard drive on the server to fill if it was under heavy load by multiple users doing large images.
I'm not sure what causes this to happen or how to fix it, but if this was going to be deployed to a production 
server I would keep investigating until I found a way.

