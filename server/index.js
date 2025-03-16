const express  = require("express");
const connectDB = require("./src/configs/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.DB_URL

app.get('/', (req, res) => {
    res.send("This is a home route.");
})

app.listen(PORT, () => {
    connectDB(DB_URL);
    console.log(`Server is runing at http://localhost:${PORT}`);
})