import { movieGenres } from "./genres";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
const posterSize = "original";
// Ruta correcta para visualizar poster: base_image_url+posterSize+poster_path
export const createMoviesMarkup = (movies, movieCards) => {
  const moviesMarkup = movies
    .map(({ id, poster_path, title, genre_ids, release_date }) => {
      let genresNameArr = [];
      genre_ids.map((el) => {
        movieGenres.map((gen) => {
          if (gen.id === el) {
            genresNameArr.push(gen.name);
          }
        });
      });
      const dateYear = new Date(release_date).getFullYear();
      return `<li class="movie-cards__item" id="${id}">
          <div class="movie-cards__thumb">
            <img
              class="movie-cards__img"
              src="${BASE_IMAGE_URL}${posterSize}${poster_path}"
              alt="${title}"
              loading="lazy"
            />
          </div>
          <div class="movie-cards__info">
            <p class="movie-cards__title">${title.slice(0, 39)}</p>
            <p class="movie-cards__details">${genresNameArr
              .slice(0, 2)
              .join(", ")} | ${dateYear}</p>
          </div>
        </li>`;
    })
    .join("");

  movieCards.insertAdjacentHTML("beforeend", moviesMarkup);
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

  const movieModalMarkup = `<div class="modal-movie__thumb">
                <img src="${BASE_IMAGE_URL}${posterSize}${poster_path}" alt="${title}" loading="lazy" />
              </div>
              <div class="modal-movie__content">
                <p class="modal-movie__title">${title}</p>
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
                      ${original_title}
                    </td>
                  </tr>
                  <tr>
                    <td class="modal-movie__data">Genre</td>
                    <td class="modal-movie__value">${genres[0].name}</td>
                  </tr>
                </table>
                <div class="modal-movie__info">
                  <p class="modal-movie__about">About</p>
                  <p class="modal-movie__text">
                    ${overview}
                  </p>
                </div>
              </div>`;

  modalMovie.insertAdjacentHTML("beforeend", movieModalMarkup);
};

export const createLibraryMoviesMarkup = (movies, movieCards) => {
  const libraryMoviesMarkup = movies
    .map(({ id, genres, title, poster_path, vote_average, release_date }) => {
      const dateYear = new Date(release_date).getFullYear();

      return `<li class="movie-cards__item" id="${id}">
          <div class="movie-cards__thumb">
            <img
              class="movie-cards__img"
              src="${BASE_IMAGE_URL}${posterSize}${poster_path}"
              alt="${title}"
              loading="lazy"
            />
          </div>
          <div class="movie-cards__info">
            <p class="movie-cards__title">${title.slice(0, 39)}</p>
            <p class="movie-cards__details"> ${
              genres[0].name
            } | ${dateYear} <span class="modal-movie__vote">${vote_average.toFixed(
        1
      )}</span></p>
          </div>
        </li>`;
    })
    .join("");

  movieCards.insertAdjacentHTML("beforeend", libraryMoviesMarkup);
};
