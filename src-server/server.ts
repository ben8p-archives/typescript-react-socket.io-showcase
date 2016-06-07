import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

const PORT: Number = 3000;
let app: express.Express = express();
let server: http.Server = http.createServer(app);

let ioServer: SocketIO.Server = io(server);

const MESSAGE_EVENT_NAME: string = 'message';

// define a message object
interface Message {
    message: string;
    user: string;
}

// Routing
app.use(express.static(__dirname + '/../dist-client'));

server.listen(PORT, function (): void {
    console.log('Server listening at port %d', PORT);
});

ioServer.on('connection', function (socket: SocketIO.Socket): void {
    console.log('Socket connected');
    let welcomeMessage: Message = {
        message: 'A new user has joined the room',
        user: 'system'
    };
    socket.broadcast.emit(MESSAGE_EVENT_NAME, welcomeMessage);

    socket.on(MESSAGE_EVENT_NAME, function (message: Message): void {
        socket.broadcast.emit(MESSAGE_EVENT_NAME, message);

        let parrotMessage: Message = {
            message: message.user + ' just said: ' + message.message,
            user: 'parrot'
        };
        // use both broadcast and non broadcast
        // so everyone (including emitter) receive the message
        socket.emit(MESSAGE_EVENT_NAME, parrotMessage);
        socket.broadcast.emit(MESSAGE_EVENT_NAME, parrotMessage);
    });
});
