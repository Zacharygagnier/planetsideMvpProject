const request = require('request');



module.exports.getInfo = (charIds, type) => {
    return new Promise ((resolve, reject) => {
        request.get(`https://census.daybreakgames.com/s:fishington/get/ps2/character/5428011263403299873,5428010618020696081?c:resolve=online_status`)

    })
}
