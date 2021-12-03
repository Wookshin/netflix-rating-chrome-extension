## ✨ 넷플릭스 영화 평점보여주기 (feat. 크롬 확장 프로그램)

 - URL : https://chrome.google.com/webstore/detail/%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4-%EC%98%81%ED%99%94-%ED%8F%89%EC%A0%90-%EB%B3%B4%EC%97%AC%EC%A3%BC%EA%B8%B0-netflix-n/oonoodkldjdpknicffjgaiidbbneljhi?hl=ko


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
var span = document.createElement("span");
span.textContent = "4.5"
target.appendChild(span);
span.style.height="3rem";
span.style.width = "3rem";
span.style.backgroundColor = "rgb(62, 226, 57)";
span.style.borderRadius = "50%";
span.style.color = 'white';
span.style.fontSize = '1.8rem';
span.style.display = 'flex'; 
span.style.justifyContent = 'center';
span.style.top = '0';
span.style.right = '0';
	

<!doctype html>
<html>
  <head>
    <style type="text/css">
      .dot {
        height: 25px;
        width: 25px;
        background-color: rgb(62, 226, 57);
        border-radius: 50%;
        color: white;
        font-size: 1em;
        display: flex; 
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <span class="dot">4.5</span>
  </body>
</html>















