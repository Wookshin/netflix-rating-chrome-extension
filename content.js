var fn_AddRatingMark = async (newMovies) => {
  console.log('newMovies(fn_SetRating)', newMovies);
  let names = [];
  for (let movie of newMovies) {
    names.push(movie.name);
  }

  let data = { names: names };
  let response = await fetch('http://localhost:3001/api/query', {
    //let response = await fetch('https://wookshin.com:3001/api/', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .catch((err) => console.log('fetch error', err));
  let myJson = await response;

  console.log('myjson(fn_SetRating)', myJson);

  let span;
  let isNew = true;

  for (let movie of newMovies) {
    isNew = true;

    for (let rtnVal of myJson['list']) {
      if (movie.name === rtnVal.name) {
        //console.log(movie.name, selectedValue, rtnVal);

        span = fn_CreateRatingMark('actualRating', rtnVal['actualRating']);
        if (span) movie.target.appendChild(span);
        span = fn_CreateRatingMark('netizenRating', rtnVal['netizenRating']);
        if (span) movie.target.appendChild(span);
        span = fn_CreateRatingMark('expertRating', rtnVal['expertRating']);
        if (span) movie.target.appendChild(span);

        isNew = false;
        break;
      }
    }

    if (isNew) console.log(movie.name);
  }
};

var fn_CreateRatingMark = (className, rating) => {
  if (rating === undefined || rating === null || rating === 0) {
    return null;
  }

  if (rating === '10.0') {
    rating = rating.substr(0, 2);
  } else {
    rating = rating.substr(0, 3);
  }

  let ratingMark = document.createElement('span');
  ratingMark.className = className;
  ratingMark.textContent = rating;
  ratingMark.style.height = '3rem';
  ratingMark.style.width = '3rem';
  if (className === 'actualRating') {
    ratingMark.style.backgroundColor = 'green';
  } else if (className === 'netizenRating') {
    ratingMark.style.backgroundColor = 'rgb(0, 0, 255)';
  } else if (className === 'expertRating') {
    ratingMark.style.backgroundColor = 'rgb(102, 102, 0)';
  }

  ratingMark.style.borderRadius = '50%';
  ratingMark.style.color = 'white';
  ratingMark.style.fontSize = '1.8rem';
  ratingMark.style.display = 'flex';
  ratingMark.style.justifyContent = 'center';
  ratingMark.style.top = '0';
  ratingMark.style.right = '0';
  ratingMark.style.position = 'absolute';
  ratingMark.style.textAlign = 'center';
  ratingMark.style.lineHeight = '3rem';

  //console.log(selectedValue, className, rating);
  if (selectedValue === className) {
    ratingMark.style.display = 'inline-block';
  } else {
    ratingMark.style.display = 'none';
  }

  return ratingMark;
};

var fn_SetRatingDisplay = () => {
  if (document.oldSelectedValue !== selectedValue) {
    let spanList = document.querySelectorAll('.actualRating, .netizenRating, .expertRating');
    for (span of spanList) {
      if (span.className === selectedValue) {
        span.style.display = 'inline-block';
      } else {
        span.style.display = 'none';
      }
    }

    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  }

  document.oldSelectedValue = selectedValue;
};

var fn_InitVariables = () => {
  if (document.movieCount == undefined) {
    document.movieCount = 0;
  }
  if (document.oldSelectedValue == undefined) {
    document.oldSelectedValue = selectedValue;
  }
};

function inContent() {
  console.log('inContent() Start');

  let children = document.querySelectorAll('.title-card-container');

  fn_InitVariables();

  console.log('oldValue:', document.oldSelectedValue, 'newValue:', selectedValue);

  fn_SetRatingDisplay();

  console.log('movieCount:', document.movieCount, 'children.length:', children.length);

  if (document.movieCount == children.length) {
    return;
  }

  let movieName;
  let newMovieNames = [];
  let newMovies = [];
  let target;
  let targets = [];

  if (document.oldMovieNames == undefined) {
    document.oldMovieNames = [];
  }

  for (var child of children) {
    if (!child) continue;

    target = child?.firstElementChild?.firstElementChild?.firstElementChild?.firstElementChild;
    if (target != undefined) {
      movieName = target?.firstElementChild?.nextElementSibling?.firstElementChild?.textContent?.trim();

      if (movieName != undefined && document.oldMovieNames.includes(movieName) == false) {
        newMovies.push({ name: movieName, target: target });
        targets.push(target);
        newMovieNames.push(movieName);
        document.oldMovieNames.push(movieName);
      }
    }
  }

  console.log('document.movieList', document.movieList);

  fn_AddRatingMark(newMovies);

  document.movieCount = children.length;
}

inContent();
var intervalId = setInterval(inContent, 60000);

// var rbs = document.querySelectorAll('input[name="rating"]');
// for(const rb of rbs){
//   if(rb.checked){
//     inContent(rb.value);
//   }
// }
