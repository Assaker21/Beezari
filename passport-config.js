const LocalStrategy = require("passport-local").Strategy;
const Admin = require("./models/admin");

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    try {
      const users = await getUserByUsername(username);

      if (users.length == 0) {
        return done(null, false, { message: "No user with that username" });
      }

      if (password == users[0].password) {
        return done(null, users[0], { message: "Login Successfull" });
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({}, authenticateUser));

  passport.serializeUser((user, done) => done(null, user._id.toString()));
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id));
  });
}

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
       return res.redirect("/"); 
    }
    else {
        next();
    }
}

module.exports = initialize;
