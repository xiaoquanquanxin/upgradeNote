let source;

function init() {
	source = new EventSource('http://localhost:8080/sse/data.php');
	source.onopen = function (event) {
		console.log('服务器连接', this.readyState,event);
	};
	source.onmessage = function (evnet) {
		console.log('从服务器实时获取的数据', evnet.date);
	};
	source.onerror = function () {

	}
}

init();