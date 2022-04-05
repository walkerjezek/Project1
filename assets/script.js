var movieForm = document.getElementById('movie-form');
var movieInput = document.getElementById('movie-input');
var moviePoster = document.getElementById('movie-poster');
var movieRatings = document.getElementById('ratingsArea');
var zipCode = document.getElementById('zipCodeInput');
var zipForm = document.getElementById('zipCode');

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
      // Add "movie-input" to the alt tag below?
  `<img src='${response.Poster}' alt='movie poster image'/>`;

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

// ------------------------------------------------------------------
// Function to get movie showtimes
function getShowtimes(event) {
  event.preventDefault();

  console.log("test");

  var zip = zipCode.value;
  var fandangoURL = 'http://api.fandango.com/v1/?op=moviesbypostalcodesearch&postalcode=' + zip +'&apikey=&sig=89fc442ab325b96c33374679907a0b4c304060703e74b30ef2b3d67396240f30';

  fetch(fandangoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

}


console.log('howdy');
movieForm.addEventListener('submit', getApi)
zipForm.addEventListener('submit', getShowtimes)


