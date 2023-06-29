const models = require("../models");
const errors = require("../errors/error");
const authService = require("../services/authService");


/*
 * @Route: POST /auth/signup
 * @Access: Public
 */
const signupUser = async (req, res, next) => {
  const {
    username, phone, email, password, bettingPlateform, status, paid, roles
  } = req.body;

  if(!username || !phone || !email || !password || !bettingPlateform )
    return next(errors.validationError("Must provide required fields!"));

  try {
    if(await models.User.exists({ phone }))
        return next (errors.confilt("Phone number already taken!"));

    const hashPassword = await authService.hashPassword(password);
    const user = new models.User ({
      username, phone, email, password: hashPassword, 
      bettingPlateform, status, paid, roles
    });

    await user.save();
    res.status(201).json({message: "Signed up successfully!"});

  } catch (err) {
    next(errors.serverError(err.message));
  }

};

/*
 * @Route: POST /auth/login
 * @Access: Public
 */
const loginUser = async (req, res, next) => {
  const { phone, password } = req.body;

  if(!phone || !password)
    return next(errors.validationError("Phone number or Password not provided!"));

  try{
    const user = await models.User.findOne(
       { phone }, "-bettingPlateform -phone -updatedAt -email -createdAt -__v"
    );

    if(!user) 
       return next (errors.notfound("Wrong phone number provided!"));
    
    if(user.status === "deactive")
        return next(errors.unAuthorized("Your account is deactivated, you're not allowed to login!"));

    if(!await authService.comparePassword(password, user.password)) 
        return next(errors.unAuthorized("Wrong password provided!"))
    
    const payload = { userId: user?._id }
    const accessToken = await authService.generateToken(payload, "15m")
    const refreshToken = await authService.generateToken(payload, "1d")

    const dbRefreshToken = new models.RefreshToken({
        userId: user?._id, refreshToken
    })

    await dbRefreshToken.save();
    req.session.accessToken = accessToken;

    const loggedinUser = {
      username: user.username, 
      status: user.status, 
      paid: user.paid, 
      roles: user.roles
    }

    res.status(200).json({user: loggedinUser})

  } catch(err){
    next(errors.serverError(err.message));
  }
};

/*
 * @Route: /auth/logout
 * @Access: Public
 */
const logoutUser = async (req, res, next) => {
  try {
    const {userId} = await authService.decodeToken(req.session.accessToken)
    await models.RefreshToken.findOneAndDelete ({userId})
    req.session.destroy();
  }catch (err) {
    next(errors.serverError(err.message));
  }
}


module.exports = {
  loginUser,
  signupUser,
  logoutUser
};
