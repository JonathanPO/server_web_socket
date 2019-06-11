var http = require('http');

var server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Server funcionando");
});

server.listen(8080, function (){
    console.log("Servidor ouvindo na porta 8080");
});

var WebsocketServer = require('websocket').server;
var wbServer = new WebsocketServer({ httpServer: server});

wbServer.on('request', function (req){
    var websocket = req.accept();
    websocket.send("Hello from Server");

    websocket.on('message', function (message) {
        console.log("Mensagem recebida: ");
        console.log(message);
    });

    var i = 0;

    setInterval(function(){
        websocket.send(i++);
    }, 1000);
});