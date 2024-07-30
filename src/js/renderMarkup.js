import { movieGenres } from './genres';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const posterSize = 'original';
const POSTER_NOT_FOUND = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1mcHVzLjjPjJNNYOT8v2f0rYU2C5wzvf_BnvhayR8N6ENCTXSP9quG0ejpmJ2w6EBWYw&usqp=CAU`;

// Ruta correcta para visualizar poster: base_image_url+posterSize+poster_path
export const createMoviesMarkup = (movies, movieCards) => {
  const moviesMarkup = movies
    .map(({ id, poster_path, title, genre_ids, release_date }) => {
      const movieTitle = title ? title.slice(0, 39) : 'No Title';
      const posterUrl = poster_path
        ? `${BASE_IMAGE_URL}${posterSize}${poster_path}`
        : `${POSTER_NOT_FOUND}`;
      const dateYear = release_date
        ? new Date(release_date).getFullYear()
        : 'No Date';
      let genresNameArr = [];

      genre_ids.map(el => {
        movieGenres.map(gen => {
          if (gen.id === el) {
            genresNameArr.push(gen.name);
          }
        });
      });

      return `<li class="movie-cards__item" id="${id}">
          <div class="movie-cards__thumb">
            <img
              class="movie-cards__img"
              src="${posterUrl}"
              alt="${movieTitle}"
              loading="lazy"
            />
          </div>
          <div class="movie-cards__info">
            <p class="movie-cards__title">${movieTitle}</p>
            <p class="movie-cards__details">${genresNameArr
              .slice(0, 2)
              .join(', ')} | ${dateYear}</p>
          </div>
        </li>`;
    })
    .join('');

  movieCards.insertAdjacentHTML('beforeend', moviesMarkup);
};

export const createMovieModalMarkup = (movie, modalMovie) => {
  const {
    id,
    genres,
    title,
    original_title,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = movie;

  const movieTitle = title ? title.slice(0, 39) : 'No Title';
  const movieGenres = genres.length === 0 ? 'No Genres' : genres[0].name;
  const movieOverview = overview ? overview : 'No About information';
  const movieOriginalTitle = original_title
    ? original_title
    : 'No Original Title';
  const posterUrl = poster_path
    ? `${BASE_IMAGE_URL}${posterSize}${poster_path}`
    : `${POSTER_NOT_FOUND}`;

  const movieModalMarkup = `<div class="modal-movie__thumb">
                <img src="${posterUrl}" alt="${title}" loading="lazy" />
              </div>
              <div class="modal-movie__content">
                <p class="modal-movie__title">${movieTitle}</p>
                <table class="modal-movie__table">
                  <tr>
                    <td class="modal-movie__data">Vote / Votes</td>
                    <td class="modal-movie__value">
                      <span class="modal-movie__vote">${vote_average.toFixed(
                        1
                      )}</span> /
                      <span class="modal-movie__vote modal-movie__vote--votes"
                        >${vote_count}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="modal-movie__data">Popularity</td>
                    <td class="modal-movie__value">${popularity.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td class="modal-movie__data">Original Title</td>
                    <td
                      class="modal-movie__value modal-movie__value--uppercase"
                    >
                      ${movieOriginalTitle}
                    </td>
                  </tr>
                  <tr>
                    <td class="modal-movie__data">Genre</td>
                    <td class="modal-movie__value">${movieGenres}</td>
                  </tr>
                </table>
                <div class="modal-movie__info">
                  <p class="modal-movie__about">About</p>
                  <p class="modal-movie__text">
                    ${movieOverview}
                  </p>
                </div>
              </div>`;

  modalMovie.insertAdjacentHTML('beforeend', movieModalMarkup);
};

export const createLibraryMoviesMarkup = (movies, movieCards) => {
  const libraryMoviesMarkup = movies
    .map(({ id, genres, title, poster_path, vote_average, release_date }) => {
      const movieGenres = genres.length === 0 ? 'No Genres' : genres[0].name;
      const movieTitle = title ? title.slice(0, 39) : 'No Title';
      const dateYear = release_date
        ? new Date(release_date).getFullYear()
        : 'No Date';
      const posterUrl = poster_path
        ? `${BASE_IMAGE_URL}${posterSize}${poster_path}`
        : `${POSTER_NOT_FOUND}`;

      return `<li class="movie-cards__item" id="${id}">
          <div class="movie-cards__thumb">
            <img
              class="movie-cards__img"
              src="${posterUrl}"
              alt="${title}"
              loading="lazy"
            />
          </div>
          <div class="movie-cards__info">
            <p class="movie-cards__title">${movieTitle}</p>
            <p class="movie-cards__details"> ${movieGenres} | ${dateYear} <span class="modal-movie__vote">${vote_average.toFixed(
        1
      )}</span></p>
          </div>
        </li>`;
    })
    .join('');

  movieCards.insertAdjacentHTML('beforeend', libraryMoviesMarkup);
};
