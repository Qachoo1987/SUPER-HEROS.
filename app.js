const apiKey = "273aba65";
    const url = `http://www.omdbapi.com/?s=batman&apikey=${apiKey}`;

    // make Ajax request to get the movies list
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (xhr.status === 200) {
        const moviesList = document.getElementById('movies-list');

        //loop through each movie 
        xhr.response.Search.forEach(function (movie) {
          const movieDiv = document.createElement('div');
          movieDiv.innerHTML = `
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title} Poster" />
            <p>Year: ${movie.Year}</p>
            <p>Plot: ${movie.Plot}</p>
          `;

          // add event listener when we click the single movie
          movieDiv.addEventListener('click', function () {
            showDetails(movie.imdbID);
          });
          moviesList.appendChild(movieDiv);
        });
      } else {
        console.error('Failed to get the movies list');
      }
    };
    xhr.send();

    // function to show movie details on click
    function showDetails(imdbID) {
      const detailsUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

      // make Ajax request to get the movie details
      const xhr = new XMLHttpRequest();
      xhr.open('GET', detailsUrl);
      xhr.responseType = 'json';
      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = xhr.response;
          alert(
            `Director: ${data.Director}\nActors: ${data.Actors}\nRuntime: ${data.Runtime}\nRatings: ${data.Ratings[0].Value}`
          );
        } else {
          console.error('Failed to get the movie details');
        }
      };
      xhr.send();
    }
