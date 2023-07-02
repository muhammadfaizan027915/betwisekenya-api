const session = require("express-session");
const sessionStore = require("connect-mongo");


const initialize = () => {
  const sessionInterval = 24 * 3600 * 100;
  return session({
    name: "Session",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: false,
      // domain: process.env.ORIGIN,
      maxAge: sessionInterval,
    },
    store: new sessionStore({
      mongoUrl: process.env.MONGO_DB,
      dbName: process.env.DB_NAME,
      collectionName: "sessions",
      ttl: sessionInterval,
      autoRemove: "interval",
      autoRemoveInterval: 60,
      touchAfter: 24 * 3600,
      crypto: { secret: process.env.SESSION_SECRET },
    }),
  });
};

module.exports = {
  initialize,
};
