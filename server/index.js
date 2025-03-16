const express  = require("express");
const connectDB = require("./src/configs/db");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./src/routes/user.route");

const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.DB_URL

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is a home route.");
})

app.use('/api/users', userRoute);

app.listen(PORT, () => {
    connectDB(DB_URL);
    console.log(`Server is runing at http://localhost:${PORT}`);
})