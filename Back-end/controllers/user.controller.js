const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const filesDestination = `${__dirname}/../uploads`;

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};
exports.uploadProfil = async (req, res) => {
  if (req.file) {
      UserModel.findOne({ _id: req.params.id })
        .then(user => {
          const filename = user.picture.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, () => {
              const UserObject = {
                  ...JSON.parse(req.body.user),
                  picture: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
                }
              UserModel.updateOne({ _id: req.params.id }, {...UserObject, _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'image modifiée!' }))
          })
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    const UserObject = {...req.body };
    UserModel.updateOne({ _id: req.params.id }, {...UserObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'image modifiée!' }))
        .catch(error => res.status(400).json({ error }));
  }
};

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