var PROTO_PATH = __dirname + '/hello.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const express = require('express')
const app = express()
const port = 3000

function main() {
    var client = new hello_proto.Greeter('35.222.94.108:50051', grpc.credentials.createInsecure());
    var user;
    app.get('/', function(req, res) {
        user = req.params.id;
        client.sayHello({ name: 'Hola Mundo' }, function(err, response) {
            console.log(response.message);
            res.send(response.message);
        });
    });
    app.get('/:valor', function(req, res) {
        user = req.params.valor;
        client.sayHello({ name: user }, function(err, response) {
            console.log(response.message);
            res.send(response.message);
        });
    });
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
main();