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
  const userAction = (moive) => {
    fetch("http://localhost:3000/api/movie/" + movie, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then((res)=>res.json())
    .then((myJson)=>console.log(JSON.stringify(myJson)));
  };

  var children = document.querySelectorAll(".title-card-container");

  var movie = "";
  for (var child of children) {
    if (!child) continue;

    movie = child.firstElementChild.firstElementChild.firstElementChild
      .getAttribute("aria-label")
      .trim();
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
