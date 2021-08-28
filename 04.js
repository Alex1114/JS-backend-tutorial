const http = require("http");
const { receiveMessageOnPort } = require("worker_threads");
const fs = require("fs");

const port = 3000;
const ip = "127.0.0.1";

const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./04/${filename}`, (error,data) => {
        console.log(`./04/${filename}`)

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
    let url = request.url;

    if (request.method === "GET"){
        const requestUrl = new URL(url, `http://${ip}:${port}`);
        console.log(requestUrl.searchParams.get("lang"));

        url = requestUrl.pathname;
        const lang = requestUrl.searchParams.get("lang");
        let selector;

        if (lang === null || lang === "en") {
            selector = "";
        } else if (lang === "ch") {
            selector = "-ch"
        } else {
            selector = "";
        }

        if (url === "/"){
            sendResponse(`index${selector}.html`, 200, response);
        } else if (url === "/about.html"){
            sendResponse(`about${selector}.html`, 200, response);
        } else {
            sendResponse(`404${selector}.html`, 404, response);
        } 
    }
});



sever.listen(port, ip, ()=> {
    console.log(`Server is running at http://${ip}:${port}`);
})