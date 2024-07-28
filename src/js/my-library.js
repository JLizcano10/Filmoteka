import {
  createLibraryMoviesMarkup,
  createMovieModalMarkup,
} from './renderMarkup';
import { fetchMovieByID } from './tmdb-api';

// DOM
const movieCardsLibrary = document.querySelector('.movie-cards__list');
const heroLibraryButtons = document.querySelector('.hero__container');
// ---------------------------------------------------------------------
// -index.js
const backdropModal = document.querySelector('div.backdrop');
const closeModal = document.querySelector('.modal__btn');
const modalMovie = document.querySelector('.modal-movie');

// Variables-index.js
let selectedMovie = null;

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

  console.log(e.target.id);

  if (e.target.id === 'watched') {
    movieCardsLibrary.innerHTML = '';
    const moviesJSON = localStorage.getItem('watchedArray');
    const movies = JSON.parse(moviesJSON) || [];
    console.log(movies);
    createLibraryMoviesMarkup(movies, movieCardsLibrary);
  }

  if (e.target.id === 'queue') {
    movieCardsLibrary.innerHTML = '';
    const moviesJSON = localStorage.getItem('queueArray');
    const movies = JSON.parse(moviesJSON) || [];
    console.log(movies);
    createLibraryMoviesMarkup(movies, movieCardsLibrary);
  }
};

// ---------------------------------------------------------------------
// -index.js
const handleSelectCard = async e => {
  // Busca el ancestro más cercano que sea un <li> con la clase movie-cards__item.
  const card = e.target.closest('li.movie-cards__item');
  if (card) {
    console.log(card.id);
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
  if (closeBtn) {
    toogleModal(false);
  }
};

// Eventos

heroLibraryButtons.addEventListener('click', handleLibraryButtons);
// handleSelectCard es manejador en index.js tambien.
movieCardsLibrary.addEventListener('click', handleSelectCard);

// --------------------------------------------------------------------------
// -index.js
closeModal.addEventListener('click', handleCloseModal);
