var movieForm = document.getElementById('movie-form');
var movieInput = document.getElementById('movie-input');

function getApi(event) {
  event.preventDefault();
  var movie = movieInput.value;
  var omdbUrl = `https://www.omdbapi.com/?apikey=d0dda485&t=${movie}`;
  // http://www.omdbapi.com/?apikey=[yourkey]&
  console.log("hello");

  fetch(omdbUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
    });
}

console.log('howdy');
movieForm.addEventListener('submit', getApi)
