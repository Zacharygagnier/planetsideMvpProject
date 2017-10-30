const express = require('express');
let path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, '/../client')))

// app.get('/', (req, res) => {
//     res.statusCode = 200;
//     // console.log(path + '/../')
//     res.sendFile(`${path}/client/**`);
// })

// app.get('/*', (req, res) => {
//     res.statusCode = 302;
//     res.sendFile('.index.html');
// })

let port = PORT || 3000;
app.listen(port, () => {
    console.log('listening on ' + port);
})