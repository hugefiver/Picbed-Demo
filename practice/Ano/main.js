var app = require("./app");
const getUser = require("./utils").getUser("models/user.json");

app.get('/', (req, res) => {
    let time = new Date();
    res.render("index", {
        time: time,
    });
});

app.get("/check", (req, res) => {
    let id = req.query['id'];
    let password = req.query['password'];
    let user = getUser(id);
    if (user === null || user.password !== password) {
        res.jsonp({
            ok: 0,
            msg: user === null ? "无此用户" : "密码错误",
        })
    } else {
        res.jsonp({
            ok: 1,
            name: user.name,
        })
    }
});

app.listen(80, () => {
    console.log("Listening at 80")
});
