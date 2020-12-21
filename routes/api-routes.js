// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      company_name: req.user.company_name,
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        company_name: req.user.company_name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for 
  app.get("/api/vehicle", function(req, res){
    var query = {};
    if(req.query.user_id){
        query.UserId = req.query.user_id;
    }

    db.Vehicle.findAll({
        where:query,
        include: [db.User]
    })
    .then((data) => {
        res.json(data)
    });
  });

  app.get("/api/vehicle/:id", function(req, res){
    db.Vehicle.findOne({
        where: {
            id: req.params.id
        },
        include: [db.User]
    })
    .then((data) => {
        res.json(data);
    });
  });

  app.post("/api/vehicle", function(req, res){
      db.Vehicle.create({
        vehicle_make: req.body.vehicle_make,
        last_mileage: req.body.last_mileage,
        current_driver: req.body.current_driver,
        current_location: req.body.current_location,
        reg_exp: req.body.reg_exp,
        last_oilchange: req.body.last_oilchange,
        reported_problems: req.body.reported_problems
      }).then((data) => {
          res.json(data);
      });
  });

  app.delete("/api/vehicle/:id", function(req, res){
      db.Vehicle.destroy({
          where: {
              id: req.params.id
          }
      })
      .then((data) => {
          res.json(data);
      });
  });

  app.put("/api/vehicle", function(req, res){
      db.Vehicle.update(
          req.body,
          {
              where: {
                  id: req.body.id
          }
      });
  });
  
};
