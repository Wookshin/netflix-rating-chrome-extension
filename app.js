const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json())

// 라우터 객체
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// 라우팅
app.use('/', indexRouter);
app.use('/movie', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
