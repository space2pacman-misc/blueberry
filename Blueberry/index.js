let http = require("http");

class Server {
	constructor(port) {
		this._port = port;
		this._gets = [];
		this._init();
	}

	get(path, callback) {
		this._gets.push({ path, callback });
	}

	_findPath(url, paths) {
		let path;

		paths.forEach(item => {
			if(item.path === url) {
				path = item;
			}
		});

		return path;
	}

	_onServer(request, response) {
		switch(request.method) {
			case "GET":
				let path = this._findPath(request.url, this._gets);

				if(path) {
					path.callback(request, response);
				}

				break;
		}

		response.end(`Cannot ${request.method} ${request.url}`);
	}

	_init() {
		http.createServer(this._onServer.bind(this)).listen(this._port);
	}
}

module.exports = Server;