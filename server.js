const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const path = require('path');

const PORT = 3000;
const api = require('./api');
const app = express();

// image upload files
const upload = require("express-fileupload");
app.use(upload({
    parseNested: true
}));

// app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret: 'sujan', saveUninitialized: false, resave: false}));

app.use('/api', api);
app.use('/public', express.static('upload'));

// app.use((req, res, next) => {
//     // if req.cookies exists and testcookie is undefined within req.cookies
//     if (req.cookies && typeof req.cookies["testcookie"] === "undefined") {
//         console.log("Setting cookie! Testcookie was not found");
//         res.cookie("testcookie", "test", {
//             maxAge: ((((1000 * 60) * 60) * 24) * 7), /* expire a week from today */
//             httpOnly: true /* document.cookie doesn't return this cookie */
//         });
//     }
//     next();
// });

// const exampleMiddleWare = (req, res, next) => {
//     res.hasTestCookie = !!req.cookies.testcookie
//     next();
// };

app.use(express.static(__dirname + '/dist/dev'));
// app.get('/', exampleMiddleWare, (req, res) => {
// 	res.send('hello from server');
// });
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/dev/index.html'));
});

app.listen(PORT, function() {
	console.log('server running on localhost:' + PORT);
});