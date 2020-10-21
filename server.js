let Blueberry = require("./Blueberry");
let server = new Blueberry(80);

server.get("/", (request, response) => {
	response.end("test server")
})