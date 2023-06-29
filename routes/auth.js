const router = require("express").Router();
const { authController } = require("../controllers");

const { loginUser, signupUser, enterData } = authController;

// loginUser route
router.post("/login", loginUser);

// signupUser route
router.post("/signup", signupUser);


module.exports = router;
