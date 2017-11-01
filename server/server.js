const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {getLastDeaths, getPlayerInfo, getWeaponInfo, getPlayerId} = require('./apiCaller');
const {Player} = require('./db');
const _ = require('lodash');
let path = require('path');

let app = express();

app.use(bodyParser())
app.use(express.static(path.join(__dirname, '/../client')));

const key = 'fishington';


app.post('/lookup', (req, res) => {
    let name = Object.keys(req.body)[0]
    getPlayerId(name)
        .then((charId) => {
            res.send(charId)
        })
    })
    
    app.get('/deaths', (req, res) => {
        let names = req.headers.charid
        let rawEvents; 
        const playerIds = [];
        const weaponId = [];
        const playerInfo = '';
        getLastDeaths(names)
            .then((events) => {
            rawEvents = events;
            const parsedEvents = JSON.parse(events);
            parsedEvents.characters_event_list.forEach(e => {
                playerIds.push(e.character_id, e.attacker_character_id);
                weaponId.push(e.attacker_weapon_id);
            })
            console.log(playerIds);
            return _.uniq(playerIds).join(',');
            }).then(getPlayerInfo)
              .then((info) => {
                 playerInfo = info;
                 console.log(playerInfo)
                 getWeaponInfo( _.uniq(weaponId).join(','))                
              }).then(console.log)



            // .then((events) => {
            //     res.json(events);
            // })
    })
    
    
    let port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log('listening on ' + port);
})