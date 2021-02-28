const https = require("https");
// const secrets = require("./secrets.json");
const { promisify } = require("util");

exports.getRecipes = (queryString, reqBody, callback) => {
    https.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryString}&number=20&ranking=2&limitLicense=true&ignorePantry=true&apiKey=${secrets.spoon_key}`,
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
                console.log("response getRecipes: ", response);
                let recipes = response.map((elem) => {
                    let matchIng =
                        (elem.usedIngredientCount /
                            (elem.missedIngredientCount +
                                elem.usedIngredientCount)) *
                        100;
                    return {
                        id: elem.id,
                        title: elem.title,
                        image: elem.image,
                        missedIngredientCount: elem.missedIngredientCount,
                        usedIngredientCount: elem.usedIngredientCount,
                        match: Math.round(matchIng) + "%",
                        missedIngredients: elem.missedIngredients.map(
                            (elem) => elem.name
                        ),
                    };
                });
                console.log("#ingredients: ", reqBody.length);
                // console.log("recipes: ", recipes);
                callback(null, recipes);
            });
        }
    );
};

exports.getRecipeInfoBulk = (ids, callback) => {
    https.get(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${secrets.spoon_key}`,
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
                console.log("response bulk: ", response);
            });
        }
    );
};

exports.getIngredients = (id, callback) => {
    https.get(
        `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${secrets.spoon_key}`,
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
                let { ingredients } = JSON.parse(body);
                // console.log("response: ", ingredients);
                let ingredientsList = ingredients.map((elem) => {
                    return {
                        name: elem.name,
                        amount: elem.amount.metric.value,
                        unit: elem.amount.metric.unit,
                    };
                });
                // console.log('ingredient: ', ingredientsList);
                callback(null, ingredientsList);
            });
        }
    );
};

exports.getRecipeInstructions = (id, callback) => {
    https.get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?stepBreakdown=false&apiKey=${secrets.spoon_key}`,
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
                let arr = response[0].steps;
                let instructions = arr.map((elem) => {
                    return elem.step;
                });
                // console.log('inst: ', instructions);
                callback(null, instructions);
            });
        }
    );
};
