const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes/index.js');
require('dotenv').config()


//variable
const PORT = process.env.PORT || 8000
const mongoDb = process.env.MONGO_DB;


//app start
const app = express();

// Đường dẫn đến ứng dụng React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

//middleware
app.use(express.json(), express.urlencoded({ extended : false }));
app.use(cors());

//connect to database
mongoose.connect(mongoDb)
.then(()=> {
    console.log("connect to db successfully");
})
.catch(e=>{
    console.log(e);
})


//route app
routes(app);


app.listen(PORT , ()=> {
    console.log("listening on port "+ PORT);
})