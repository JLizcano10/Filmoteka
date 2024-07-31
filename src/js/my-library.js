import { commonElements, libraryElements } from './domElements';
import {
  createLibraryMoviesMarkup,
  createMovieModalMarkup,
} from './renderMarkup';
import { fetchMovieByID } from './tmdb-api';

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

const { heroLibraryButtons, noMoviesText } = libraryElements;

// Variables-index.js
let selectedMovie = null;
noMoviesText.style.display = 'none';
// Funciones

const renderInitialLibraryMovies = () => {
  movieCards.innerHTML = '';
  const moviesJSON = localStorage.getItem('watchedArray');
  const movies = JSON.parse(moviesJSON) || [];
  if (movies.length > 0) {
    noMoviesText.style.display = 'none';
    createLibraryMoviesMarkup(movies, movieCards);
  } else {
    noMoviesText.style.display = 'block';
  }
};
// Funciones-index.js
const toogleModal = isVisible => {
  if (isVisible) {
    backdropModal.classList.add('visible');
  } else {
    backdropModal.classList.remove('visible');
  }
};

// Manejadores de eventos
const handleLibraryButtons = e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  if (e.target.id === 'watched') {
    movieCards.innerHTML = '';
    const moviesJSON = localStorage.getItem('watchedArray');
    const movies = JSON.parse(moviesJSON) || [];
    if (movies.length > 0) {
      noMoviesText.style.display = 'none';
      createLibraryMoviesMarkup(movies, movieCards);
    } else {
      noMoviesText.style.display = 'block';
    }
  }

  if (e.target.id === 'queue') {
    movieCards.innerHTML = '';
    const moviesJSON = localStorage.getItem('queueArray');
    const movies = JSON.parse(moviesJSON) || [];

    if (movies.length > 0) {
      noMoviesText.style.display = 'none';
      createLibraryMoviesMarkup(movies, movieCards);
    } else {
      noMoviesText.style.display = 'block';
    }
  }
};

// ---------------------------------------------------------------------
// -index.js
const handleSelectCard = async e => {
  // Busca el ancestro más cercano que sea un <li> con la clase movie-cards__item.
  const card = e.target.closest('li.movie-cards__item');
  if (card) {
    toogleModal(true);
    modalMovie.innerHTML = '';
    try {
      const movie = await fetchMovieByID(card.id);
      selectedMovie = movie;
      createMovieModalMarkup(movie, modalMovie);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const handleCloseModal = e => {
  const closeBtn = e.target.closest('button.modal__btn');

  if (!closeBtn && e.target !== backdropModal) {
    return;
  }
  toogleModal(false);
};

const handleKeyCloseModal = e => {
  if (e.code !== 'Escape') {
    return;
  }

  toogleModal(false);
};

/*REvisar
const handleAddWatched = e => {
  const movieIsExist = watchedArray.some(el => el.id === selectedMovie.id);
  if (selectedMovie && !movieIsExist) {
    watchedArray.push(selectedMovie);
    const watchedArrayJSON = JSON.stringify(watchedArray);
    localStorage.setItem('watchedArray', watchedArrayJSON);
  } else {
    Notiflix.Notify.warning('This movie is already in list');
  }
};

const handleAddQueue = e => {
  const movieIsExist = queueArray.some(el => el.id === selectedMovie.id);
  if (selectedMovie && !movieIsExist) {
    queueArray.push(selectedMovie);
    const queueArrayJSON = JSON.stringify(queueArray);
    localStorage.setItem('queueArray', queueArrayJSON);
  } else {
    Notiflix.Notify.warning('This movie is already in list');
  }
};
*/
// Eventos

heroLibraryButtons.addEventListener('click', handleLibraryButtons);
// handleSelectCard es manejador en index.js tambien.
movieCards.addEventListener('click', handleSelectCard);

// --------------------------------------------------------------------------
// -index.js
backdropModal.addEventListener('click', handleCloseModal);
body.addEventListener('keydown', handleKeyCloseModal);
// addWatched.addEventListener('click', handleAddWatched);
// addQueue.addEventListener('click', handleAddQueue);

// inicializacion
renderInitialLibraryMovies();
