const express = require("express");
var cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(cors());

const getRating = (moive, f) => {
  fetch(
    "https://openapi.naver.com/v1/search/movie.json?query=" + encodeURI(moive),
    {
      headers: {
        "X-Naver-Client-Id": "QTDpPsZMRYtMqBUdl6jw",
        "X-Naver-Client-Secret": "c6JHcn2LPr",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      f(json.items[0]["userRating"]);
    });
};


app.get("/api/moive/:name", (req, res) => {
  console.log(req.params.name);
  getRating(req.params.name, function (rating) {
    res.json({rating: rating});
  });
});

app.get("/api/moive", (req, res) => {
  console.log("movie!");
  res.json({msg : "movie"});
});

app.get("/", (req, res) => {
  console.log("hello world!");
  res.json({msg : "Hello World"});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
