const spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:francesco:password@localhost:5432/pantry"
);

exports.addComment = (recipeId, email, title, country, text) => {
    return db.query(`INSERT INTO comments (recipe_id, email, title, country, text) VALUES ($1, $2, $3, $4, $5)`, [recipeId, email, title, country, text]);
}

exports.getComments = (id) => {
    return db.query(`SELECT * FROM comments WHERE recipe_id = $1 ORDER BY id DESC`, [id]);
}