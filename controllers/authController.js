const models = require("../models");
const errors = require("../errors/error");
const authServie = require("../services/authService");

const loginUser = (req, res) => {
  res.status(200).send({ message: "Welcome to betwise login" });
};

const signupUser = async (req, res, next) => {
  const {
    username, phone, password, bettingPlateform, status, paid, roles
  } = req.body;

  if(!username || !phone || !password || !bettingPlateform )
    return next(errors.validationError("Must provide required fields!"))

  if(models.User.exists({ phone }) === true)
    return next (errors.confilt("Phone number already taken!"))

  try {
    const hashPassword = await authServie.hashPassword(password);
    const user = new models.User ({
      username, phone, password: hashPassword, bettingPlateform,   
      status, paid, roles
    })

    await user.save()
    res.status(201).json({message: "Signed up successfully!"})

  } catch (err) {
    next(errors.serverError(err.message))
  }

};

module.exports = {
  loginUser,
  signupUser,
};
