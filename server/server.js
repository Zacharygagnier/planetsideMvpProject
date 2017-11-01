const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {getLastDeaths, getPlayerInfo, getWeaponInfo, getPlayerId} = require('./apiCaller');
const {Player, save} = require('./db');
require('dotenv').config()
const _ = require('lodash');
let path = require('path');
console.log(save)

let app = express();

app.use(bodyParser())
app.use(express.static(path.join(__dirname, '/../client')));


app.post('/remove', (req, res) => {
    const name = Object.keys(req.body)[0]
    Player.remove({ userName: name }, function (err) {
        console.error(err);
      })
        .then(res.send('character removed'))
})


app.post('/lookup', (req, res) => {
    const name = Object.keys(req.body)[0]
    getPlayerId(name)
        .then((charId) => {
            console.log(charId)
            res.send(charId)
            save(name, charId)
        })
    })
    
    app.get('/deaths', (req, res) => {
        // let names = req.headers.charid

        let parsedEvents;
        const playerIds = [];
        const weaponId = [];
        let playerInfo = '';
        Player.find({})
            .then(console.log);
        getLastDeaths(names)
            .then((events) => {
            parsedEvents = JSON.parse(events);
            parsedEvents.characters_event_list.forEach(e => {
                playerIds.push(e.character_id, e.attacker_character_id);
                weaponId.push(e.attacker_weapon_id);
            })
            return _.uniq(playerIds).join(',');
            }).then(getPlayerInfo)
              .then((info) => {
                 playerInfo = info;
                 return _.uniq(weaponId).join(',')             
              }).then(getWeaponInfo)
                .then((info) => {
                    let weaponInfo = JSON.parse(info).item_list.reduce((prev, current) => {
                        prev[current.item_id] = current.name.en;
                        return prev;
                    }, {});
                    let parsedPlayer = JSON.parse(playerInfo).character_list.reduce((prev, current) => {
                        prev[current.character_id] = current.name.first;
                        return prev;
                    }, {})
                    const nameSwapped = parsedEvents.characters_event_list.map((e) => {
                        return {
                            name: parsedPlayer[e.character_id],
                            character_id: e.character_id,
                            weapon: weaponInfo[e.attacker_weapon_id],
                            attacker: parsedPlayer[e.attacker_character_id],
                            attackerId: e.attacker_character_id,
                            timestamp: e.timestamp
                        }
                    })
                    res.json(nameSwapped);
                })
    })
    
    
    let port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log('listening on ' + port);
})