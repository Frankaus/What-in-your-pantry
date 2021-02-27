const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { getRecipes, getIngredients, getRecipeInstructions, getRecipeInfoBulk } = require("./apiCalls");
const secrets = require('./secrets.json');

const app = express();

app.use(compression());
app.use(morgan("dev"));
// to be used only for Form post req
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// write a fn to get the recipes, promisify it with util and then
// also promisify the second api call
// try out node-fetch



app.post("/api/submitIngredientsList", async (req, res) => {
    console.log("req.body: ", req.body);
    let queryString = req.body.join(",");
    console.log("queryString: ", queryString);

    getRecipes(queryString, req.body, (err, recipes) => {
        if (err) {
            console.log("error in getRecipes server: ", err);
            return;
        }
        console.log("inside the getRecipes");

        let ids = recipes.map((elem) => elem.id).join(",");
        console.log("arr: ", ids);
        getRecipeInfoBulk(ids);

    });
});


// app.post("/api/submitIngredientsList", async (req, res) => {
//     console.log("req.body: ", req.body);
//     let queryString = req.body.join(",");
//     console.log("queryString: ", queryString);
//     getRecipes(queryString, req.body, (err, recipes) => {
//         if (err) {
//             console.log("error in getRecipes server: ", err);
//             return;
//         }
//         console.log("inside the getRecipes");
//         res.json(recipes);
//     });
// });

app.get("//api/getRecipeInfo/:id", (req, res) => {
    console.log('req.params info: ', req.params.id);
});

app.get("/api/getRecipeIngredients/:id", (req, res) => {
    console.log("req.params Ingredients: ", req.params.id);
    getIngredients(req.params.id, (err, ingredients) => {
        if (err) {
            console.log("error in getRecipeIngredients server: ", err);
            return;
        }
        console.log("inside the getIngredients");
        res.json(ingredients);
    });
});

app.get("/api/getRecipeInstructions/:id", (req, res) => {
    console.log("req.params Info: ", req.params.id);
    getRecipeInstructions(req.params.id, (err, instructions) => {
        if (err) {
            console.log("error in getRecipeInfo server: ", err);
            return;
        }
        console.log("inside the getIngredients");
        res.json(instructions);
    });
});

app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening on port 3001");
});


// let response = await fetch(
    //     `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&number=20&ranking=2&limitLicense=true&ignorePantry=true&apiKey=${secrets.spoon_key}`
    // )
    // .then(res => {
    //     let body = "";
    //     res.on("data", (chunk) => {
    //         body += chunk;
    //     });
    //     res.on("end", () => {
    //     let response = JSON.parse(body);
    //     console.log("response inside: ", response);
    // })
    // .catch((err) => {
    //     console.log('errorin fetch: ', err);
    // });