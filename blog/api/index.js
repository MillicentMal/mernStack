const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')
const PORT = 5000 || env.PORT;
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/subreddits");

app.use(cors());
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// using the .env file
dotenv.config();
app.use(express.json());
var bodyParser = require('body-parser');


// Enable express to parse body data from raw application/json data
app.use(bodyParser.json());

// Enables express to parse body data from x-www-form-encoded data
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, 
    useUnifiedTopology: true}).then(console.log("Connected")).catch((err)=>
console.log(err));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);


app.listen(PORT, () => {
    console.log("Backend is running");
});