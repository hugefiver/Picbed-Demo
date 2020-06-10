const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
//const multer = require('multer');

// for parsing multipart/form-data
//var upload = multer();

// init app
var app = express();

// get book from datas
var getBook = require("./utils.js").datas("views/books.json");

// parse json from POST request
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extend: true}));

// make requested log to console
app.use((req, res, next) => {
    console.log(req.method + ": " + req.path);
    next()
});

// rewrite '/' to 'index.html'
app.use("/", (req, res, next) => {
    if (req.path === "/"){
        //res.send(fs.readFileSync("views/index.html"));
        let file = __dirname + "/views/index.html";
        //let file = __dirname + "/views/2/index.html";
        res.sendFile(file);
    }
    else
        next();
});

// static files
app.use("/public/", express.static("public"));

// API: get book info
app.use("/obtain", (req, res) => {
    let id = null;

    if (req.method === 'GET')
        id = parseInt(req.query.bookId, null);
    else if (req.method === 'POST') {
        id = req.body['bookId'];
    }
    let book = getBook(id);

    //res.type("json");
    if (book === null) {
        res.jsonp({
            ok: 0
        })
    } else {
        res.jsonp({
            ok: 1,
            ...book
        });
    }
});

app.listen(80, () => {
    console.log("Listening at 80")
});
