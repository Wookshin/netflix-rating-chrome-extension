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
  const fn_SetRating = async (newMovies) => {
    console.log("new",newMovies);
    let names = [];
    for(let movie of newMovies){
      names.push(movie.name);
    }

    let data = {names : names};

    console.log("fn_SetRating");

    let response = await fetch('http://localhost:3000/api/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    });
    let myJson = await response.json();

    console.log("myjson", myJson);

    let span;

    for(let rtnVal of myJson["list"]){    
      for(let movie of newMovies){
        if(movie.name === rtnVal.name){
          span = fn_GetSpan(rtnVal["rating"]);
          movie.target.appendChild(span);
        }
      }
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

  console.log("Check existing new movie target.");

  let children = document.querySelectorAll(".title-card-container");

  if(document.movieCount == undefined){
    document.movieCount = 0;
  }

  if(document.movieCount == children.length){
    return;
  }

  let movieName;
  let newMovieNames = [];
  let newMovies = [];
  let target;
  let targets = [];

  if(document.oldMovieNames == undefined){
    console.log("??");
    document.oldMovieNames = [];
  }

  for (var child of children) {
    if (!child) continue;

    target = child?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild
    if(target != undefined){
      movieName = target?.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.trim();

      if(movieName != undefined && document.oldMovieNames.includes(movieName) == false){
        newMovies.push({name:movieName, target:target});
        targets.push(target);
        newMovieNames.push(movieName);
        document.oldMovieNames.push(movieName);
      }
    }
  }

  console.log(document.movieList);
  //fn_SetRating(newMovieNames, targets);
  
  // name 기준으로 정렬
  // newMovies.sort(function(a, b) {
  //   var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  //   var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   // 이름이 같을 경우
  //   return 0;
  // });

  fn_SetRating(newMovies);

  document.movieCount = children.length;

  return {
    success: true,
    count: children.length,
    //rating: rating
  };
}
