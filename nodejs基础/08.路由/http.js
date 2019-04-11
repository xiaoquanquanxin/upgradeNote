const http = require("nodejs基础/08.路由/http");
const url = require("url");

function start(route) {
	function onRequest(request, response) {
		const pathname = url.parse(request.url).pathname;
		if( pathname !== '/favicon.ico'){
			route(pathname,request,response);
		}
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;