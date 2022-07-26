import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import * as EVENTS from '../config/socketEvents'
import {v4 as uuidv4} from 'uuid';
/**
 * The main socket used by the server to send and receive messages to
 * and from the clients.
 * @param {Server} param0 
 */
function socket({ io }: { io: Server }) {
    logger.info("Socket is running");
    
    io.on(EVENTS.CLIENT_EVENTS.CONNECTION, (socket: Socket) => {
        //console.log(userID)
        logger.info(`Client establishing connection..`);

        socket.on(EVENTS.CLIENT_EVENTS.INITIALIZATION, (socketID) => {
            logger.info("Client trying to connect..");
            const userID = uuidv4();
            logger.info("Assigning ID to client: " + userID);
            io.to(socketID).emit(EVENTS.SERVER_EVENTS.COMPLETE_INITALIZATION, userID);   
        });

        socket.on(EVENTS.CLIENT_EVENTS.INITIALIZATION_COMPLETE, (clientID) => {
            logger.info(`Client ${clientID} has connected.`);
        })

        socket.on(EVENTS.CLIENT_EVENTS.PLAY_SOUND, () => {
            logger.info("Client trying to play sound..");
            io.emit(EVENTS.SERVER_EVENTS.PLAY_SOUND);
        });

        socket.on(EVENTS.CLIENT_EVENTS.PAUSE_SOUND, () => {
            logger.info("Client trying to pause sound..");
            io.emit(EVENTS.SERVER_EVENTS.PAUSE_SOUND);
        });
    });

}

export default socket;