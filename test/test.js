const axios = require('axios');

axios.default({
    method: "POST",
    url: "https://withme.heavyrisem.xyz/ocr",
    data: {
        profile: {privatePlay:{deviceUniqueId: "NU110_0A8A36"}}
    }
}).then(value => {
    console.log(value.data);
})