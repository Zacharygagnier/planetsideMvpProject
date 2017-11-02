const request = require('`request');
require('dotenv').config();



const key = process.env.APIKEY;

const getLastDeaths = (idString) => {
	return new Promise ((resolve, reject) => {
		const limit = Math.floor(idString.length / 19) * 10;
		request.get(
			`https://census.daybreakgames.com/s:${key}/get/ps2/characters_event/?character_id=$     dString}&c:limit=${limit}&type=DEATH`
			, (err, allDeaths) => {
				if (err) {
					reject(err);
				} else {
					resolve(allDeaths.body);
				}
			});
	});
};

const getPlayerInfo = (idString) => {
	return new Promise ((resolve, reject) => {
		request.get(
			`https://census.daybreakgames.com/s:${key}/get/ps2:v2/character/?character_id=${idString}`
			, (err, playerInfo) => {
				if (err) {
					reject(err);
				} else {
					resolve(playerInfo.body);
				}
			});
	});
};

const getWeaponInfo = (idString) => {
	return new Promise ((resolve, reject) => {
		request.get(`http://census.daybreakgames.com/s:${key}/get/ps2/item/?item_id=${idString}`
			, (err, weaponInfo) => {
				if (err) {
					reject(err);
				} else {
					resolve(weaponInfo.body);
				}
			});
	});
};


const getPlayerId = (name) => {
	return new Promise((resolve, reject) => {
		request.get(`http://census.daybreakgames.com/s:${key}/get/ps2:v2/character/?name.first_lower=${name}`, (err, profile) => {
			if (err) {
				reject(err);
			} else {
				let parsed = JSON.parse(profile.body);
				if (parsed.returned) {
					const charId = parsed.character_list[0].character_id;
					resolve(charId);
				}
			}
		});
	});

};



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
module.exports.getWeaponInfo = getWeaponInfo;
module.exports.getPlayerId = getPlayerId;