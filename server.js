const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(compression());
app.use(morgan("dev"));
// to be used only for Form post req
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post('/api/uploadComment', async (req, res) => {
    let {recipeId, email, title, country, text} = req.body;
    console.log('req.body: ', req.body);
    try {
        let data = await db.addComment(recipeId, email, title, country, text);
        console.log('data: ', data);
        if (data.rowCount === 1){
            console.log('yes');
            res.json({uploaded: true})
        }
    } catch(err){
        console.log('error in uploadComment server: ', err);
    }
});

app.get('/api/getComments/:id', async (req, res) => {
    console.log('req.params: ', req.params.id);
    try {
       let {rows} = await db.getComments(req.params.id);
       console.log('data: ', rows); 
       if (!rows.length){
           return res.json({comments: false})
       } else if (rows.length){
           res.json(rows)
       }
    } catch(err) {
        console.log('error in getComments server: ', err);
    }
});







app.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening on port 3001");
});