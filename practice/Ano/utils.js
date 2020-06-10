const fs = require("fs");

module.exports = {
    getUser: function (filename) {
        let users = JSON.parse(fs.readFileSync(filename).toString());
        let userDict = {};
        for (let v of users) {
            userDict[v['userNo']] = {
                name: v['name'],
                password: v['password'],
            };
        }
        return (id) => id in userDict ? userDict[id] : null;
    }
};
