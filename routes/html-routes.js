// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const body = process.env.TWILIO_MESSAGE;
const from = process.env.TWILIO_SEND;
const to = process.env.TWILIO_RECIEVE;

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.Vehicle.findAll({
      raw: true,
      where: {
        UserId: req.user.id
      }
    })
    .then(data => {
      client.messages
    .create({
        body: body,
        from: from,
        to: to
    })
    .then(message => console.log(message.sid));
      console.log(data)
      res.render("index", {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        company_name: req.user.company_name,
        email: req.user.email,
        id: req.user.id,
        vehicleData: data
      })
    })
    
  });

  app.get("/vehicles", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/vehicle.html"));
  });
};
