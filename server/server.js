const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
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

app.post('/lookup', (req, res) => {

    let name = req.body

    request.get(`http://census.daybreakgames.com/get/ps2:v2/character/?name.first_lower=${name}`, () => {

    })
})


let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on ' + port);
})