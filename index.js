// SETUP BEGINS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const dbname = "recipe_book";

const mongoUri = process.env.MONGO_URI;

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());

async function connect(uri, dbname) {
    let client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    })
    _db = client.db(dbname);
    return _db;
}

// SETUP END
async function main() {

  let db = await connect(mongoUri, dbname);

  // Routes
  app.get('/', function(req,res){
    res.json({
     "message":"Hello World!"
   });

   app.get("/recipes", async (req, res) => {
    try {
        const recipes = await db.collection("recipes").find().project({
            name: 1,
            cuisine: 1,
            tags: 1,
            prepTime: 1,
        }).toArray();
        
        res.json({ recipes });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

})

}

main();

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});



