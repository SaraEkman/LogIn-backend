var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
var cors = require('cors');
var nanoId = require('nanoid');
var CryptoJs = require('crypto-js');
const { json } = require('express');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(cors());


app.get('/', function (req, res, next) {
    res.send("<h1>lfkdsjkf</h1>");
});




app.get('/users', (req, res) => {
    // console.log(req.body.userName);

    fs.readFile('users.json', (err, data) => {
        if (err) {
            console.log('error' + err);
        }
        //Hämta
        let users = JSON.parse(data);
        // const originalPass = CryptoJs.AES.decrypt(user.passWord, "PassWord").toString(CryptoJs.enc.Utf8) 

        // // Ändra;
        // let newUser = {
        //     "userId": nanoId.nanoid(8), "userName": "janne", "passWord": "test", "isLoggedIn": false
        // };
        // users.push(newUser);
        // //Spara
        // fs.writeFile('users.json', JSON.stringify(users), (err) => {
        //     if (err) console.log('error' + err);
        // });

        console.log(users);
        res.json(users);
    });
});


// let users = []
// if (fs.existsSync("users.json")) {
//     users = JSON.parse(fs.readFileSync('users.js'))
// }
// users = [...users, {
//             "userId": nanoId.nanoid(8), "userName": req.body.userName, "passWord": req.body.passWord, "isLoggedIn": false
// }]
// fs.writeFileSync("users.json", JSON.stringify(users))
// console.log(users);
// res,json(true)


app.post('/logIn', (req, res) => {
    console.log(req.body.userName, req.body.passWord);

    fs.readFile('users.json', (err, data) => {
        if (err) {
            console.log('error' + err);
        }
        let users = JSON.parse(data);

        let foundUser = users.find(user => {
            return user.userName === req.body.userName && user.passWord === req.body.passWord;
        });
        console.log(foundUser);

        if (foundUser) {
            return res.json({
                'mes': 'ok',
                'userId': foundUser.userId
            });
        } else {
            return res.json({
                'mes': 'error',
            });
        }
    });
});
app.post('/createUser', (req, res) => {
    console.log(req.body.userName, req.body.passWord);

    fs.readFile('users.json', (err, data) => {
        if (err) {
            console.log('error' + err);
        }
        let users = JSON.parse(data);

        let foundUser = users.find(user => {
            return user.userName === req.body.userName && user.passWord === req.body.passWord;
        });
        console.log(foundUser);

        if (foundUser) {
            return res.json({
                'mes': 'error you have',
            });
        }
        else {
            let newUser = {
                "userId": nanoId.nanoid(8), "userName": req.body.userName, "passWord": req.body.passWord
            };
            // CryptoJs.AES.encrypt(req.body.passWord, "PassWord").toString()
            console.log(newUser);

            users.push(newUser);
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) console.log('error' + err);
            });
            return res.json({ 'mes': 'new user added' });

        }
    });
});

// app.get('/logIn', (req, res) => {
//     res.send(`<input type="text" name="name">
//     <button type="submit">Spara</button>`);
// });

// app.post('/logIn', (res, req) => {
//     let users;
//     if (fs.existsSync("users.json")) {
//         users = JSON.parse(fs.readFileSync("users.json"));
//     }
//     users = [...users, req.body];

//     console.log(users);
//     console.log(req.body);
//     res.json(true);


// fs.readFile('users.json', (err, data) => {
//     if (err) {
//         console.log('error' + err);
//     }
//     let users = JSON.parse(data);
// let foundUser = users.find((user) => {
//     return user.userName === req.body.userName
// });
// if (foundUser) {
//     foundUser.isLoggedIn = true;
//     return res.send("You are now logged in");
// }
//     console.log(users);
// });
//    res.send('ok')
// });


module.exports = app;
