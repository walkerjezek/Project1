var movieForm = document.getElementById('movie-form');
var movieInput = document.getElementById('movie-input');
var moviePoster = document.getElementById('movie-poster');
var movieRatings = document.getElementById('ratingsArea');

// var fandangoURL = 'http://api.fandango.com/v1/?op=theatersbymoviepostalcodesearch&movieid=151500&postalcode=94105&apikey=&sig=91ca250fe4cc7bbf385bad82737d70cbefe6a3d9e8f5fb8dc8fc1aa29c993381';

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
    });

}
function renderMovie(response) {
  console.log(response.Poster);
  var metascore = response.Metascore;
  var imdbScore = response.imdbRating;
var posterTemplate = 
  `<img src='${response.Poster}' alt='movie poster image'/>`;

  moviePoster.innerHTML = posterTemplate;

var ratingSectionTemplate =
`<div>Metascore: ${metascore}</div>
 <div id="rating-color">IMDB Rating: ${imdbScore}</div>`

 movieRatings.innerHTML = ratingSectionTemplate;

 if (imdbScore >= 7.5) {
  $("#rating-color").css("color", "green");
} else if (imdbScore > 3.5 && imdbScore < 7.5) {
  $("#rating-color").css("color", "white");
} else {
  $("#rating-color").css("color", "red");
};
}

console.log('howdy');
movieForm.addEventListener('submit', getApi)

