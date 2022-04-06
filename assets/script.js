var movieForm = document.getElementById('movie-form');
var movieInput = document.getElementById('movie-input');
var moviePoster = document.getElementById('movie-poster');
var movieRatings = document.getElementById('ratingsArea');
var movieDescription = document.getElementById('descriptionArea');
var descriptionBlock = document.getElementById('description');
var ratingsBlock = document.getElementById('ratings');


function getApi(event) {
  event.preventDefault();
  var movie = movieInput.value;
  var omdbUrl = `https://www.omdbapi.com/?apikey=d0dda485&t=${movie}`;
 
  console.log("hello");

  fetch(omdbUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      renderMovie(data);
      wikipedia();
    });

}
function renderMovie(response) {
  console.log(response.Poster);
  var metascore = response.Metascore;
  var imdbScore = response.imdbRating;
var posterTemplate = 
  `<img src='${response.Poster}' alt= 'movie poster image'/>`;

  moviePoster.innerHTML = posterTemplate;

var ratingSectionTemplate =
`<div>Metascore: ${metascore}</div>
 <div class="rating-space">IMDB Rating: <span id="rating-color">${imdbScore}</span></div>`

 movieRatings.innerHTML = ratingSectionTemplate;

 if (imdbScore >= 7.5) {
  $("#rating-color").css("color", "green");
} else if (imdbScore > 3.5 && imdbScore < 7.5) {
  $("#rating-color").css("color", "orange");
} else {
  $("#rating-color").css("color", "red");
};
}


function wikipedia(response) {

  var movie = movieInput.value;
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=' + movie;

  fetch(wikiURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      renderWiki(data);
    });

}

function renderWiki(data) {
  var description = data.query.search[0].snippet

  movieDescription.innerHTML = description;
  descriptionBlock.classList.remove('hidden');
  ratingsBlock.classList.remove('hidden');

}



console.log('howdy');
movieForm.addEventListener('submit', getApi)

