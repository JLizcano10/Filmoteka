import { commonElements, libraryElements } from './domElements';
import { handleAddQueue, handleAddWatched } from './handleMovieList';
import {
  handleCloseModal,
  handleKeyCloseModal,
  handleSelectCard,
  toogleModal,
} from './modal';
import { createLibraryMoviesMarkup } from './renderMarkup';

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

// Inicializacion elementos DOM
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

toogleModal();

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

// Eventos

heroLibraryButtons.addEventListener('click', handleLibraryButtons);
movieCards.addEventListener('click', handleSelectCard);
backdropModal.addEventListener('click', handleCloseModal);
body.addEventListener('keydown', handleKeyCloseModal);
addWatched.addEventListener('click', handleAddWatched);
addQueue.addEventListener('click', handleAddQueue);

// inicializacion
renderInitialLibraryMovies();
