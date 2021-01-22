//컨텐츠 페이지의 #user 입력된 값이 변경 되었을 '때'
document.querySelector("#user").addEventListener("keyup", function () {
  console.log("in Extension");

  chrome.tabs.executeScript(
    {
      code: `(${inContent})()`,
    },
    ([result] = []) => {
      if (!chrome.runtime.lastError) {
        document.querySelector("#result").innerText += result.movie; // shown in devtools of the popup window
      }
    }
  );
});

function inContent() {
  const userAction = async (moive) => {
    const response = await fetch('https://openapi.naver.com/v1/search/movie.xml?query='+moive, {
      headers: {
        'X-Naver-Client-Id': 'QTDpPsZMRYtMqBUdl6jw',
        'X-Naver-Client-Secret':'c6JHcn2LPr'
    }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
  }

  var children = document.querySelectorAll(".title-card-container");
  
  var movie = "";
  for (var child of children) {
    if (!child) continue;

    movie = child.firstElementChild.firstElementChild.firstElementChild.getAttribute("aria-label").trim();
    console.log(movie);
    userAction(movie);
    break;
  }

  // console.log(movies);

  return {
    success: true,
    movie: movie,
  };
}


