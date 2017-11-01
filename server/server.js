const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {getLastDeaths, getPlayerInfo, getPlayerId} = require('./apiCaller');
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
        getLastDeaths(names)
            .then((events) => {
            rawEvents = events;
            let parsedEvents = JSON.parse(events);
            let playerIds = [];
            parsedEvents.characters_event_list.forEach(e => {
                playerIds.push(e.character_id, e.attacker_character_id);
            })
            return _.uniq(playerIds);
            }).then()



            // .then((events) => {
            //     res.json(events);
            // })
        // https://census.daybreakgames.com/get/ps2:v2/item/?item_type_id=26
        // https://census.daybreakgames.com/get/ps2:v2/character/?character_id=5428047126282473569
    })
    
    
    let port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log('listening on ' + port);
})