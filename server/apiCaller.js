const request = require('request');
const WebSocket = require('ws')


const key = 'fishington'

const getLastDeaths = (strArr) => {
    return new Promise ((resolve, reject) => {
        const sliced = strArr.slice(1, strArr.length-1).replace(/"/g, '')
        const limit = Math.floor(sliced.length / 19) * 10;
        request.get(
            `https://census.daybreakgames.com/s:${key}/get/ps2/characters_event/?character_id=${sliced}&c:limit=${limit}&type=DEATH`
        , (err, allDeaths) => {
            if (err) {
                reject(err)
            } else {
                resolve(allDeaths.body)
            }
        })
    })
}

const getPlayerInfo = (arr) => {
    return new Promise ((resolve, reject) => {
        request.get(
            `https://census.daybreakgames.com/s:${key}/get/ps2/characters_event/?character_id=${sliced}&c:limit=${limit}&type=DEATH`
        , (err, allDeaths) => {
            if (err) {
                reject(err)
            } else {
                resolve(allDeaths.body)
            }
        })
    })
}

const getPlayerId = (name) => {
    return new Promise((resolve, reject) => {
        request.get(`http://census.daybreakgames.com/s:${key}/get/ps2:v2/character/?name.first_lower=${name}`, (err, profile) => {
            if (err) {
                reject(err);
            } else {
                let parsed = JSON.parse(profile.body);
                if (parsed.returned) {
                    const charId = parsed.character_list[0].character_id
                    resolve(charId)
                }
            }
        })



    })

}



// const id = 'fishington'

// // Create WebSocket connection.
// const socket = new WebSocket(`wss://push.planetside2.com/streaming?environment=ps2&service-id=s:${id}`);

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({"service":"event","action":"subscribe","characters":["all"],"eventNames":["Death"],"worlds":["1"],"logicalAndCharactersWithWorlds":true}));
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });
module.exports.getLastDeaths = getLastDeaths;
module.exports.getPlayerInfo = getPlayerInfo;
module.exports.getPlayerId = getPlayerId;