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

  localStorage.setItem("movieTitle", movie);
  
  fetch(omdbUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      renderMovie(data);
      theMovieData(data);
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


function theMovieData(response) {
  var movie = movieInput.value;
  var imdbIdentity = response.imdbID;
  
  var movieDataURL = `https://api.themoviedb.org/3/find/${imdbIdentity}?api_key=fbc028ed7ae11035b2013b010544e3e6&language=en-US&external_source=imdb_id`
  fetch(movieDataURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      renderMovieData(data);
    });

}

function renderMovieData(response) {
  var description = response.movie_results[0].overview;

  movieDescription.innerHTML = description;
  descriptionBlock.classList.remove('hidden');
  ratingsBlock.classList.remove('hidden');

}



console.log('howdy');
movieForm.addEventListener('submit', getApi);


