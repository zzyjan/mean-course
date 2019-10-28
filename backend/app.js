const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/banks')

//test git repo
//Wf40lmlWaTmQa87H
const app = express();

mongoose
  .connect("mongodb://localhost:27017/node-angular")
  //.connect("mongodb+srv://zzyjan:Wf40lmlWaTmQa87H@cluster0-87x7c.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');

  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/banks", fileRoutes);

module.exports = app;
