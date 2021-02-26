const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const https = require("https");
const secrets = require("./secrets.json");

const app = express();

app.use(compression());
app.use(morgan("dev"));
// to be used only for Form post req
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/test", (req, res) => {
    console.log("receiveedddddd");
    res.json("cool");
});

app.post("/api/submitIngredientsList", async (req, res) => {
    console.log("req.body: ", req.body);
    let queryString = req.body.join("+");
    console.log(queryString);

    https.get(
        `https://api.edamam.com/search?q=${queryString}&app_id=${secrets.app_id}&app_key=${secrets.app_key}&from=0&to=25`,
        (res) => {
            if (res.status === "error") {
                console.log("error message: ", res.message);
                return;
            }

            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                let response = JSON.parse(body);
                console.log("response: ", response.hits);
            });
        }
    );
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening on port 3001");
});
