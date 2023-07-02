const router = require("express").Router();
const { authController } = require("../controllers");

const { loginUser, signupUser, logoutUser, getUser } = authController;

// loginUser route
router.post("/login", loginUser);

// signupUser route
router.post("/signup", signupUser);

// getUser route
router.get("/user", getUser);

// logoutUser route
router.post("/logout", logoutUser);

module.exports = router;
