const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express();

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.g5ulm.mongodb.net/Groupomania",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )
    .then(()=> console.log("Connected to MongoDB"))
    .catch((err)=> console.log("Failed to connect to MongoDB", err));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT_FRONT}`);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Uploads
app.use('../Front-end/public/uploads/', express.static(path.join(__dirname, 'images')));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;