var express = require("express");
var app = express();
var router = express.Router();

/* GET home page. */
app.use(express.static("public"));
router.get("/", function(req, res, next) {
  res.sendFile("index.html");
});

module.exports = router;
