const axios = require('axios');

axios.default({
    method: "POST",
    url: "http://localhost:3000/caption",
    data: {
        profile: {privatePlay:{deviceUniqueId: "TestID"}}
    }
}).then(value => {
    console.log(value.data);
})