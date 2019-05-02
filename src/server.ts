import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import wrap from './utilities/server-error-handler';
import bindAppConfig from '../config/app-dependencies';
import io from 'express-socket.io';
import * as routes from './routes';
import db from '../config/database';

// db.sync();
db.authenticate()
    .then(() => {console.log('database connected')})
    .catch((err: any) => {console.log("err in db:", err)});

// Initialize environment variables & app
const app = express();
// Initialize all app configurations and dependencies
bindAppConfig(app);

// Coffee time front API routes
app.use('/auth', routes.Auth);
app.use('/api', routes.Api);
// Initialize socket
const server = io.init(app);

io.on('connection', (socket: any) => {
    console.log(`received a socket connection! id: ${socket.id}`)
    socket.emit('connected', {id: socket.id})
});

// Start server on SERVER_PORT
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
