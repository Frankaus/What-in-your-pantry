const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();

app.use(compression());
app.use(morgan("dev"));
// to be used only for Form post req
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get('/api/test', (req, res) => {
    console.log('receiveedddddd');
    res.json("cool");
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening on port 3001");
});
