import { createMoviesMarkup } from './renderMarkup';
import { fetchMovies } from './tmdb-api';
import { commonElements, indexElements } from './domElements';
import {
  handleCloseModal,
  handleKeyCloseModal,
  handleSelectCard,
  toogleModal,
} from './modal';
import { handleAddQueue, handleAddWatched } from './handleMovieList';

// DOM
const {
  body,
  movieCards,
  backdropModal,
  closeModal,
  modalMovie,
  addWatched,
  addQueue,
} = commonElements;

const {
  heroForm,
  pagination,
  paginationAddBtn,
  paginationSubBtn,
  paginationSpan,
  loader,
} = indexElements;

// Variables
let page = 1;
let totalPages;
let query;

// inicializacion de elementos DOM
loader.style.display = 'none';
pagination.style.display = 'none';

// Funciones
toogleModal();

const renderInitialMovies = async () => {
  const searchRoute = 'movie/popular?';
  const searchParams = new URLSearchParams({
    page,
  });
  renderFetchMovies(searchRoute, searchParams);
};

const renderFetchMovies = async (searchRoute, searchParams) => {
  // COMPROBAR CON PAGE PORQUE EL SERVIDOR LOCAL NO ME DEJA
  loader.style.display = 'block';
  movieCards.innerHTML = '';
  try {
    const moviesData = await fetchMovies(searchRoute, searchParams);
    loader.style.display = 'none';
    totalPages = moviesData.total_pages;
    const movies = moviesData.results;
    if (movies.length > 0) {
      createMoviesMarkup(movies, movieCards);
      pagination.style.display = 'flex';
    } else {
      Notiflix.Notify.failure('Sorry, no result for your search');
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Manejadores de eventos
const handleSubmit = async e => {
  e.preventDefault();
  page = 1;
  paginationSpan.textContent = 1;
  movieCards.innerHTML = '';

  const form = e.target;
  query = form.elements.movieInput.value;
  const searchRoute = 'search/movie?';

  const searchParams = new URLSearchParams({
    query,
    page,
  });

  renderFetchMovies(searchRoute, searchParams);

  form.reset();
};
// Paginacion
const handleAddPage = () => {
  if (page < totalPages) {
    page += 1;
    paginationSpan.textContent = page;
    const searchParams = new URLSearchParams({
      page,
    });

    if (query) {
      searchParams.set('query', query);
    }

    const currentRoute = query ? 'search/movie?' : 'movie/popular?';
    renderFetchMovies(currentRoute, searchParams);
  }
};

const handleSubPage = () => {
  if (page > 1) {
    page -= 1;
    paginationSpan.textContent = page;
    const searchParams = new URLSearchParams({
      page,
    });

    if (query) {
      searchParams.set('query', query);
    }

    const currentRoute = query ? 'search/movie?' : 'movie/popular?';
    renderFetchMovies(currentRoute, searchParams);
  }
};

// const handleAddWatched = () => {
//   const movie = getSelectedMovie();
//   if (movie) {
//     const movieIsExist = watchedArray.some(el => el.id === movie.id);
//     if (!movieIsExist) {
//       watchedArray.push(movie);
//       localStorage.setItem('watchedArray', JSON.stringify(watchedArray));
//     } else {
//       Notiflix.Notify.warning('This movie is already in list');
//     }
//   }
// };

// const handleAddQueue = () => {
//   const movie = getSelectedMovie();
//   if (movie) {
//     const movieIsExist = queueArray.some(el => el.id === movie.id);
//     if (!movieIsExist) {
//       queueArray.push(movie);
//       localStorage.setItem('queueArray', JSON.stringify(queueArray));
//     } else {
//       Notiflix.Notify.warning('This movie is already in list');
//     }
//   }
// };

//

// Eventos
heroForm.addEventListener('submit', handleSubmit);
paginationAddBtn.addEventListener('click', handleAddPage);
paginationSubBtn.addEventListener('click', handleSubPage);
movieCards.addEventListener('click', handleSelectCard);
backdropModal.addEventListener('click', handleCloseModal);
body.addEventListener('keydown', handleKeyCloseModal);
addWatched.addEventListener('click', handleAddWatched);
addQueue.addEventListener('click', handleAddQueue);

// Inicializacion
renderInitialMovies();
