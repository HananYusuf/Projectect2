    // Requiring path to so we can use relative routes to our HTML files
    const path = require("path");

    // Requiring our custom middleware for checking if a user is logged in
    const isAuthenticated = require("../config/middleware/isAuthenticated");

    module.exports = function(app) {
    app.get("/", (req, res) => {
        //changed root route to point to login.html instead of signup.
        // If the user already has an account send them to the members page
        if (req.user) {
        res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", (req, res) => {
        //Changed login route to signup since the root route is now login
        // If the user already has an account send them to the members page
        if (req.user) {
        res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });
    };
