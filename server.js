const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/api/test', (req, res) => {
    console.log('receiveedddddd');
    res.json("cool");
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening on port 3001");
});
