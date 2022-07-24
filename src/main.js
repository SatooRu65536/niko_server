const express = require("express");
const app = express();
const admin = require("firebase-admin");
const moment = require('moment');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nikocomments-65536-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
const db = admin.database();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
    if (!req.body.comment) {
        res.sendFile(`${__dirname}/index.html`);
        return
    }
    
    const comment = req.body.comment
    console.log(comment);
    res.sendFile(`${__dirname}/index.html`);
    
    const currentTime = moment().utc;
    const time = currentTime.format("YYYYMMDDHHmmss");
    db.ref(`nikocomments/${time}`).set({ comment: comment });
});

app.get("/script.js", (req, res, next) => {
    res.sendFile(`${__dirname}/script.js`);
});

app.listen(8000, () => console.log("Server is running ..."));
