const axios = require('axios');

axios.default({
    method: "POST",
    url: "https://withme.heavyrisem.xyz/caption",
    data: {
        profile: {privatePlay:{deviceUniqueId: "TestID"}}
    }
}).then(value => {
    console.log(value.data);
})