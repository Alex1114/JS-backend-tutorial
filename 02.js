const http = require("http");
const { receiveMessageOnPort } = require("worker_threads");

const sever = http.createServer((request, respone) => {
    respone.end("Success");
});

const port = 3000;
const ip = "127.0.0.1";

sever.listen(port, ip, ()=> {
    console.log(`Server is running at http://${ip}:${port}`);
})