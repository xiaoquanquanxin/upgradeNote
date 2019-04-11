const url = require('url');
const util = require('util');
function route(pathname, request,response) {
	console.log("About to route a request for " + pathname);
	if (pathname === '/') {
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("Hello World");
	} else {
		response.write(util.inspect(url.parse(request.url, true)))
	}
	response.end();
}

exports.route = route;