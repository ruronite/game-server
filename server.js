const express = require("express");
const bodyParser = require("body-parser");

const pool = require("./db");

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 8000;

app.get("/score", async (req, res, next) => {
    try {
        let scoreData = await pool.query("SELECT * FROM game ORDER BY score DESC");
        let scores = scoreData.rows;
        res.status(200).json(scores)
        return
    }
    catch (err) {
        console.log(err)
        return
    }
})

app.post("/score", async (req, res, next) => {
    console.log("the body received is", req.body);
    let {firstName, nickName, score} = req.body;
    console.log(typeof score);

    /*let data = req.body.data;
    let firstName = data.firstName;
    let nickName = data.nickName;
    let score = data.score;
    console.log("Incoming data", data)*/

    try {
        let newScore = await pool.query("INSERT INTO game (first_name, nick_name, score) VALUES ($1, $2, $3)", [firstName, nickName, score]);
        console.log("output data from db", newScore)
        res.status(201).send(newScore.rows[0]);
        
    } catch (error) {
        console.log(error)
    }
})




app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`)
})