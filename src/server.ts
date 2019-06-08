import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import wrap from './utilities/server-error-handler';
import bindAppConfig from '../config/app-dependencies';
// import io from 'express-socket.io';
import socket from 'socket.io';
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
// Start server on SERVER_PORT
const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});

// Socket events
const io = socket(server);
io.on('connection', (socket: any) => {
    console.log(`Received a socket connection! id: ${socket.id}`)
    socket.emit('connected', {id: socket.id});
    socket.on(`sendCoffeeTimeInvitationToBuddies`, ({ buddies, minutes }: any) => {
        socket.broadcast.emit('receiveCoffeeTimeInvitation', {
            buddies: buddies.map((buddy: any) => buddy.username),
            minutes
        });
    });
});
