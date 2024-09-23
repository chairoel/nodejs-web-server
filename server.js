const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Powered-By", "Node.js");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    // TODO 2: logika respons bila url bernilai '/'
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Ini adalah homepage</h1>");
    } else {
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else if (url === "/about") {
    // TODO 3: logika respons bila url bernilai '/about'
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Halo! Ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else {
    // TODO 1: logika respons bila url bukan '/' atau '/about'
    response.statusCode = 400;
    response.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
