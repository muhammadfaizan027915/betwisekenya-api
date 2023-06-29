const router = require("express").Router();
const { authController } = require("../controllers");

const { loginUser, signupUser, logoutUser } = authController;

// loginUser route
router.post("/login", loginUser);

// signupUser route
router.post("/signup", signupUser);

// logoutUser route
router.post('/logout', logoutUser)


module.exports = router;
