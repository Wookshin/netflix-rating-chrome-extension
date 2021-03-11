var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  console.log("hello world!");
  res.json({msg : "Hello World"});
});

module.exports = router;