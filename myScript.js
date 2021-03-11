document.querySelector("#chkRating").addEventListener("change", function () {
  console.log("in Extension");
  if(this.checked) {
    chrome.tabs.executeScript(
      {
        code: `setInterval((${inContent}), 2000)`,
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
  const fn_SetRating = async (names, targets) => {
    let data = {
      names : names
    }

    let response = await fetch('http://localhost:3000/movie/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    });
    let myJson = await response.json();

    console.log(myJson);

    let span;

    for(let i=0; i<myJson["list"].length; i++){    
      span = fn_GetSpan(myJson["list"][i]["rating"]);
      targets[i].appendChild(span);
    }

    //console.log(name, rating, target);
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

  console.log("inContent");

  let children = document.querySelectorAll(".title-card-container");
  let movieName;
  let movieNames = [];
  let target;
  let targets = [];

  for (var child of children) {
    if (!child) continue;

    target = child?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild
    if(target != undefined){
      movieName = target?.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.trim();

      if(movieName != undefined){
        targets.push(target);
        movieNames.push(movieName);
      }
    }
  }

  fn_SetRating(movieNames, targets);

  return {
    success: true,
    movie: movieName,
    //rating: rating
  };
}
