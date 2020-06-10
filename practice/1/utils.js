const fs = require("fs");

module.exports = {
    datas: function (filename) {
        let data = JSON.parse(fs.readFileSync(filename).toString());
        return function (Bno) {
            let result = null;
            data.forEach((v) => {
                if (Bno === v['bookNo']) {
                    result = v;
                }
            });
            return result;
        }
    }
};
