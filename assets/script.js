var movieForm = document.getElementById('movie-form');
var movieInput = document.getElementById('movie-input');
var moviePoster = document.getElementById('movie-poster');

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
var posterTemplate = 
  `<img src='${response.Poster}' alt='movie poster image'/>`;


  moviePoster.innerHTML = posterTemplate;
}

console.log('howdy');
movieForm.addEventListener('submit', getApi)

