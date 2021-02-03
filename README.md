# NetflixWithNaverRating
# 정리중

1. Card로부터 영화 제목 가져오기
 var children = document.querySelectorAll(".title-card-container");
 var movie = "";
 for (var child of children) {
    if (!child) continue;
    movie = child.firstElementChild.firstElementChild.firstElementChild
      .getAttribute("aria-label")
      .trim();
	console.log(movie);
 }

2, Client -> Server로 Rating 정보 요청하기

3. Server -> 네이버 API로 Rating 정보 요청하기
app.get("/api/moive/:name", (req, res) => {
  console.log(req.params.name);
  getRating(req.params.name, function (rating) {
    res.json({rating: rating});
  });
});

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

4. Server로부터 가져온 Rating을 Card에 붙이기
var target = children[0].firstElementChild.firstElementChild.firstElementChild.firstElementChild
var div = document.createElement("div");
div.textContent = "TEST"
target.appendChild(div);
div.id = "divId"
div.style.fontSize="30px"
div.style.position = "absolute"
div.style.top = "0"
div.style.right = "0"


















