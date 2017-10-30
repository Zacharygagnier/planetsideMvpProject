const express = require('express');

let app = express();


app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendfile('index.html')
})


let port = 3000;
app.listen(port, () => {
    console.log('listening on ' + port);
})