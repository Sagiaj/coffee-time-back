import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import wrap from './utilities/server-error-handler';
import bindAppConfig from '../config/app-dependencies';
// import io from 'express-socket.io';
import socketio from 'socket.io';
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
const io = socketio(server);
io.on('connection', (socket: any) => {
    // TODO: functionality for users live joining - show img
    console.log(`Received a socket connection! id: ${socket.id}`);
    socket.emit('connected', {id: socket.id});
    socket.on('joinRoom', (room: string) => {
        socket.join(room);
    });
    socket.on('leaveRoom', (room: string) => {
        socket.leave(room);
    });
    socket.on(`sendCoffeeTimeInvitationToBuddies`, ({ buddies, minutes, username }: any) => {
        // We want the user to broadcast to a room of his friends
        // socket.broadcast.emit('receiveCoffeeTimeInvitation', {
        //     buddies: buddies.map((buddy: any) => buddy.username),
        //     minutes
        // });
        buddies.forEach((buddy: any) => {
            socket.to(`private_${buddy.username}`).emit('receiveCoffeeTimeInvitation', `private_${username}`);
        });
    });
});
