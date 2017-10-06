const express = require('express');

const publicweb = process.env.PUBLICWEB || './';
const app = express();

app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

const port = process.env.SERVER_PORT || '8080';
app.listen(port, () => console.log(`API running on localhost:${port}`));
/*var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);*/