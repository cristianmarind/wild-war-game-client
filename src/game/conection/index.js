import { EventBus } from '@/event-bus.js';
import store from '@/store'
import router from '@/router'
import io from 'socket.io-client';

let socket

export default {
    startConnection(){
        socket = io(store.getters.host, {
            query: `playerId=${store.getters.playerId}`
        })
        
        socket.on('reseat', (data) => {
            alert('El username ya esta en uso')
            router.push({
                path: '/'
            })
        });
        
        socket.on('initialEvent', (data) => {
            EventBus.$emit('initialEvent', data);

            socket.on(`newPlayer-server-${data.serverId}`, (data) => {
                EventBus.$emit('newPlayer', data);
            });
            
            socket.on(`playerDisconnect-server-${data.serverId}`, (data) => {
                EventBus.$emit('playerDisconnect', data);
            });

            socket.on(`refreshStars-server-${data.serverId}`, (data) => {
                EventBus.$emit('refreshStars', data);
            });

            socket.on(`collectAllStars-server-${data.serverId}`, (data) => {
                EventBus.$emit('collectAllStars', data);
            });
            
            socket.on(`refreshPlayer-server-${data.serverId}`, (data) => {
                EventBus.$emit('refreshPlayer', data);
            });

            socket.on(`refreshPositionPlayer-server-${data.serverId}`, (data) => {
                EventBus.$emit('refreshPositionPlayer', data);
            });

            socket.on(`loserPlayer-server-${data.serverId}`, (data) => {
                EventBus.$emit('loserPlayer', data);
            });
        });
    },
    emitMovePlayerToTheLeft(playerId, serverId){
        socket.emit(`emitMovePlayerToTheLeft-server-${serverId}`, playerId);
    },
    emitMovePlayerToTheRight(playerId, serverId){
        socket.emit(`emitMovePlayerToTheRight-server-${serverId}`, playerId);
    },
    emitMovePlayerToUp(playerId, serverId){
        socket.emit(`emitMovePlayerToUp-server-${serverId}`, playerId);
    },
    emitStopPlayerToTheLeft(playerId, serverId){
        socket.emit(`emitStopPlayerToTheLeft-server-${serverId}`, playerId);
    },
    emitStopPlayerToTheRight(playerId, serverId){
        socket.emit(`emitStopPlayerToTheRight-server-${serverId}`, playerId);
    },
    emitStopPlayerToUp(playerId, serverId){
        socket.emit(`emitStopPlayerToUp-server-${serverId}`, playerId);
    },
    emitCollectStar(serverId, positionXStar){
        socket.emit(`emitCollectStar-server-${serverId}`, {
            positionXStar
        });
    },
    emitCollectAllStars(serverId){
        socket.emit(`emitCollectAllStars-server-${serverId}`);
    },
    emitMyPosition(playerId, serverId, posX, posY){
        socket.emit(`emitMyPosition-server-${serverId}`, {
            playerId,
            posX,
            posY
        });
    },
    emitLoserPlayer(playerId, serverId){
        socket.emit(`emitLoserPlayer-server-${serverId}`, playerId);
    },
    selectServer(){
        socket.emit(`conectToServer`, store.getters.serverId);
    }
}