const fn_SetRating = async (newMovies) => {
  console.log("newMovies(fn_SetRating)",newMovies);
  let names = [];
  for(let movie of newMovies){
    names.push(movie.name);
  }

  let data = {names : names};
  let response = await fetch('http://localhost:3001/api/', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  });
  let myJson = await response.json();

  console.log("myjson(fn_SetRating)", myJson);

  let span;

  for(let rtnVal of myJson["list"]){    
    for(let movie of newMovies){
      if(movie.name === rtnVal.name){
        console.log(movie.name, selectedValue, rtnVal);

        span = fn_GetSpan(rtnVal[selectedValue]);
        movie.target.appendChild(span);
      }
    }
  }
}

const fn_GetSpan = (rating) => {
  // let span = document.createElement("span");
  let span = createElement("span");
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

function inContent() {
  console.log("inContent() Start");

  // let children = document.querySelectorAll(".title-card-container");
  let children = querySelectorAll(".title-card-container");

  // if(oldSelectedValue == undefined){

  // }

  // if(document.movieCount == undefined){
  if(movieCount == undefined){
    // document.movieCount = 0;
    movieCount = 0;
  }
  // console.log("movieCount: ", document.movieCount, "children.length", children.length);
  console.log("movieCount: ", movieCount, "children.length", children.length);

  // if(document.movieCount == children.length){
  if(movieCount == children.length){
    return;
  }

  let movieName;
  let newMovieNames = [];
  let newMovies = [];
  let target;
  let targets = [];

  // if(document.oldMovieNames == undefined){
  if(oldMovieNames == undefined){
    console.log("??");
    // document.oldMovieNames = [];
    oldMovieNames = [];
  }

  for (var child of children) {
    if (!child) continue;

    target = child?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild
    if(target != undefined){
      movieName = target?.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.trim();

      // if(movieName != undefined && document.oldMovieNames.includes(movieName) == false){
      if(movieName != undefined && oldMovieNames.includes(movieName) == false){
        newMovies.push({name:movieName, target:target});
        targets.push(target);
        newMovieNames.push(movieName);
        // document.oldMovieNames.push(movieName);
        oldMovieNames.push(movieName);
      }
    }
  }
  
  // console.log(document.movieList);
  console.log(movieList);
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
  
  // document.movieCount = children.length;
  movieCount = children.length;
}

inContent();

// var rbs = document.querySelectorAll('input[name="rating"]');
// for(const rb of rbs){
//   if(rb.checked){
//     inContent(rb.value);
//   }
// }

