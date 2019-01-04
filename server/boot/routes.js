"use strict";
var app = require("../server");

app.get("/verified", function(request, response) {
  response.render('verified');
  // response.send("Verified Successfully.");
});

app.get("/reset-password", function(req, res, next) {
  if (!req.accessToken) return res.sendStatus(401);
  res.render("password-reset", {
    redirectUrl:
      "/api/members/reset-password?access_token=" + req.accessToken.id
  });
});
