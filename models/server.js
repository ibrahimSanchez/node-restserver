const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        this.middlewares();

        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors()); //Buscar en documentacion de npm para ver como se hacen las restrinciones de las rutas que puedan hacer peticiones

        // Lectura y parseo del body
        this.app.use(express.json());

        // Public   
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usersPath, require('../routes/users'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto ', this.port);
        });
    }
}


module.exports = Server;