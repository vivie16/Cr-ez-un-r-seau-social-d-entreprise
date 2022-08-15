const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const multer = require("../middleware/multer.midd");
const {checkUser} = require("../middleware/auth.middleware")


// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user 
router.get("/",checkUser, userController.getAllUsers);
router.get("/:id",checkUser, userController.getOneUser);
router.put("/:id",checkUser, userController.updateUser);
router.delete("/:id",checkUser, userController.deleteUser);
router.post("/upload",checkUser, multer, userController.uploadProfil);

module.exports = router;