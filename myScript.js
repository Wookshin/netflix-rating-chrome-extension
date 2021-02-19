
document.querySelector("#chkRating").addEventListener("change", function () {
  console.log("in Extension");
  if(this.checked) {
    chrome.tabs.executeScript(
      {
        code: `(${inContent})()`,
      },
      ([result] = []) => {
        if (!chrome.runtime.lastError) {
          //document.querySelector("#result").innerText += result.movie; // shown in devtools of the popup window
        }
      }
    );
  }
  else
  {
    
  }
});

function inContent() {
  const fn_SetRating = async (name, target) => {
    let response = await fetch('http://localhost:3000/movie/'+name);
    let myJson = await response.json();
    let span;
    let rating = myJson["rating"];

    console.log(name, rating, target);
    span = fn_GetSpan(rating);
    target.appendChild(span);
  }

  const fn_GetSpan = (rating) => {
    let span = document.createElement("span");
    span.textContent = rating;
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
    span.style.position = 'absolute';

    return span;
  }

  let children = document.querySelectorAll(".title-card-container");
  let movieName;
  let target;

  for (var child of children) {
    if (!child) continue;

    target = child?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild
    if(target != undefined){
      movieName = target?.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.trim();

      if(movieName != undefined){
        fn_SetRating(movieName, target);
      }
    }
  }

  return {
    success: true,
    movie: movieName,
    //rating: rating
  };
}


