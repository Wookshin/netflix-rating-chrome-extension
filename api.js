var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

const getRating = (moive, f) => {
  // fetch(
  //   "https://openapi.naver.com/v1/search/movie.json?query=" + encodeURI(moive),
  //   {
  //     headers: {
  //       "X-Naver-Client-Id": "QTDpPsZMRYtMqBUdl6jw",
  //       "X-Naver-Client-Secret": "c6JHcn2LPr",
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((json) => {
  //     console.log(json);
  //     f(json.items[0]["userRating"]);
  //   });

   f("1");
};

router.get("/", (req, res) => {
  console.log(res.json());
  res.json({msg : "hi!"});
});

router.post("/", (req, res) => {
  console.log(req.body.names);
  var data = { "list" : []};
  for(let name of req.body.names){
    data["list"].push({name:name, rating:1});
  }
  console.log(data);

  res.json(data);
});

router.get("/:name", (req, res) => {
  console.log(req.params.name);
  getRating(req.params.name, function (rating) {
    rating = parseFloat(rating).toFixed(1);
    res.json({rating: rating});
  });
});

module.exports = router;