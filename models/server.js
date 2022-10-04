//Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer(this.app);
        
        //Configuracion de Socket Server
        this.io = socketio(this.server);
    }

    midlewares() {
        //Desplegar el directorio público
        this.app.use( express.static(path.resolve(__dirname , '../public')));
    }

    configurarSockets(){
        new Sockets( this.io);
    }

    execute(){
        this.midlewares();

        this.configurarSockets();

        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;