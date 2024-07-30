import Notiflix from 'notiflix';
import { createMovieModalMarkup, createMoviesMarkup } from './renderMarkup';
import { fetchMovieByID, fetchMovies } from './tmdb-api';

// Seleccion elementos DOM
const body = document.querySelector('body');
const heroForm = document.querySelector('form.hero__form');
const movieCards = document.querySelector('ul.movie-cards__list');
const pagination = document.querySelector('.pagination');
const paginationAddBtn = document.querySelector('button.pagination__add');
const paginationSubBtn = document.querySelector('button.pagination__sub');
const paginationSpan = document.querySelector('span.pagination__span');
const backdropModal = document.querySelector('div.backdrop');
const closeModal = document.querySelector('.modal__btn');
const modalMovie = document.querySelector('.modal-movie');
const addWatched = document.querySelector('.watched');
const addQueue = document.querySelector('.queue');
const loader = document.querySelector('.loader');

// Variables
let page = 1;
let totalPages;
let query;
let selectedMovie = null;
loader.style.display = 'none';
pagination.style.display = 'none';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  fontSize: '15px',
  closeButton: false,
  timeout: 2000,
});
// Iniciar estos array como estado. si los defino [] cada vez que haga push al array iniciara desde 0. Pero si cargo el localStorage por defecto entonces las peliculas se iran guardadando en el array de manera correcta.
const watchedArray = JSON.parse(localStorage.getItem('watchedArray')) || [];
const queueArray = JSON.parse(localStorage.getItem('queueArray')) || [];

// Funciones
const toogleModal = isVisible => {
  if (isVisible) {
    backdropModal.classList.add('visible');
  } else {
    backdropModal.classList.remove('visible');
  }
};

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

// Manipulacion y exportacion de datos de la tarjeta elegida y Modal.
const handleSelectCard = async e => {
  // Busca el ancestro más cercano que sea un <li> con la clase movie-cards__item.
  const card = e.target.closest('li.movie-cards__item');
  if (card) {
    toogleModal(true);
    modalMovie.innerHTML = '';
    try {
      const movie = await fetchMovieByID(card.id);
      // Aqui select movie es el objeto pelicula seleccionada.
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

const handleAddWatched = e => {
  if (selectedMovie) {
    watchedArray.push(selectedMovie);
    const watchedArrayJSON = JSON.stringify(watchedArray);
    localStorage.setItem('watchedArray', watchedArrayJSON);
  }
};

const handleAddQueue = e => {
  if (selectedMovie) {
    queueArray.push(selectedMovie);
    const queueArrayJSON = JSON.stringify(queueArray);
    localStorage.setItem('queueArray', queueArrayJSON);
  }
};

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
