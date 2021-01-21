//컨텐츠 페이지의 #user 입력된 값이 변경 되었을 '때'
document.querySelector("#user").addEventListener("keyup", function () {
  console.log("in Extension");

  chrome.tabs.executeScript(
    {
      code: `(${inContent})()`,
    },
    ([result] = []) => {
      if (!chrome.runtime.lastError) {
        document.querySelector("#result").innerText += result.movies; // shown in devtools of the popup window
      }
    }
  );
});

function inContent() {
  var parent = document.querySelectorAll(".sliderContent");
  var movies = "";
  for (var children of parent) {
    console.log(1);
    if (!children) break;

    var child = children.firstElementChild;
    while (child) {
      movies += child.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
        "aria-label"
      );
      child = child.nextElementSibling;
    }
  }

  return {
    success: true,
    movies: movies,
  };
}
