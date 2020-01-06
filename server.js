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
var client2 = new hello_proto.Greeter('34.70.39.209:50052', grpc.credentials.createInsecure());

function sayHello(call, callback) {
    client2.sayHello({ name: 'Adios Mundo' }, function(err, response) {
        console.log(response.message1);
        var res = {
            message1: call.request.name,
            message2: response.message1
        }
        console.log(res)
        callback(null, res);
    });
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}
main();