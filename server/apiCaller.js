const request = require('request');
const WebSocket = require('ws')




const id = 'fishington'
// Create WebSocket connection.
const socket = new WebSocket(`wss://push.planetside2.com/streaming?environment=ps2&service-id=s:${id}`);

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({"service":"event","action":"subscribe","characters":["all"],"eventNames":["Death"],"worlds":["1"],"logicalAndCharactersWithWorlds":true}));
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// module.exports.getInfo = (charIds, type) => {
//     return new Promise ((resolve, reject) => {
//         request.get(`https://census.daybreakgames.com/s:fishington/get/ps2/character/5428011263403299873,5428010618020696081?c:resolve=online_status`)
//     })
// }
