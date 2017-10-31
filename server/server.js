const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {getLastDeaths, getPlayerId} = require('./apiCaller')
let path = require('path');

let app = express();

app.use(bodyParser())
app.use(express.static(path.join(__dirname, '/../client')));

// app.get('/', (req, res) => {
    //     res.statusCode = 200;
//     // console.log(path + '/../')
//     res.sendFile(`${path}/client/**`);
// })

// app.get('/*', (req, res) => {
//     res.statusCode = 302;
//     res.sendFile('.index.html');
// })

const key = 'fishington'


app.post('/lookup', (req, res) => {
    let name = Object.keys(req.body)[0]
    getPlayerId(name)
        .then((charId) => {
            res.send(charId)
        })
    })
    
    app.get('/deaths', (req, res) => {
        let names = req.headers.charid;
        getLastDeaths(names)
            .then((events) => {
                res.json(events);
            })
    })
    
    
    let port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log('listening on ' + port);
})