const axios = require('axios');

axios.default({
    method: "POST",
    url: "http://localhost:9998/ocr",
    data: {
        profile: {privatePlay:{deviceUniqueId: "TestID"}}
    }
}).then(value => {
    console.log(value.data);
})