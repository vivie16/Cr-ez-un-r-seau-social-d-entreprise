const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const filesDestination = `${__dirname}/../uploads`;

// all users
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// one user
// grâce à auth on va créer req.token qui est en fait l'id
  // auth va aussi créer req.admin
  // if(req.token === req.params.id || req.admin === true ) { logique d'administration}

  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);
exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};
/*exports.uploadProfil = (req, res, ) => {
  if (req.file) {
  // si l'image est modifiée, la suppression la précédente
    UserModel.findOne({ _id: req.params.id })
      .then(uploadImg => {
          const filename = uploadImg.picture.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, () => {
              //une fois suprimer mettez à jour
              const UploadObject = {
                  ...JSON.parse(req.body.uploadImg),
                  picture: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
              }
              UserModel.updateOne({ _id: req.params.id }, {...UploadObject, _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Image profil modifiée!' }))
          })
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    const UploadObject = {...req.body };
    UserModel.updateOne({ _id: req.params.id }, {...UploadObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Image profil modifiée!' }))
        .catch(error => res.status(400).json({ error }));
  }
};*/
exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + ".jpg";
  try {
    if (fs.existsSync(filesDestination)) {
      fs.unlink(fileName, (err) => {
        if(err) console.log(err);
      });}
      await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: `${req.protocol}://${req.get("host")}/uploads/${ req.file.filename }` } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// update user
exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};