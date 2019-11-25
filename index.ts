import Server from './classes/server';
import router from './routes/router';
import bodyparser from 'body-parser';
import cors from 'cors';

const server = new Server();

// BodyParser
server.app.use( bodyparser.urlencoded( {extended: true} ));
server.app.use( bodyparser.json() );

// CORS
server.app.use( cors( { origin: true, credentials: true} ) );


// Rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log('servidor corriendo en el puerto: ', server.port);
});