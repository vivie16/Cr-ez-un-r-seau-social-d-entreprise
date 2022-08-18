const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// exports.auth = (req, res, next) => {
//   try {
//     console.log('je suis executer');
//     console.log(req.headers);
//     const token = req.headers.authorization.split(' ')[1];
//     console.log('token:' + token);
//     req.token = jwt.verify(token, process.env.TOKEN_SECRET);
//     next();
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(401).json({message: "non connecté"});
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};