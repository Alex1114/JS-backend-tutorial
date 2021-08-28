const http = require("http");
const { receiveMessageOnPort } = require("worker_threads");
const fs = require("fs");

const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./03/${filename}`, (error,data) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Sorry, internal error");
        } else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    })
}

const sever = http.createServer((request, response) => {
    console.log(request.url, request.method);
    const method = request.method;
    const url = request.url;

    if (request.method === "GET"){
        if (url === "/"){
            sendResponse("index.html", 200, response);
        } else if (url === "/about.html"){
            sendResponse("about.html", 200, response);
        } else {
            sendResponse("404.html", 404, response);
        } 
    }
});

const port = 3000;
const ip = "127.0.0.1";

sever.listen(port, ip, ()=> {
    console.log(`Server is running at http://${ip}:${port}`);
})