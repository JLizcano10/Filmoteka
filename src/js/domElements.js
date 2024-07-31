export const commonElements = {
  body: document.querySelector('body'),
  movieCards: document.querySelector('ul.movie-cards__list'),
  backdropModal: document.querySelector('div.backdrop'),
  closeModal: document.querySelector('.modal__btn'),
  modalMovie: document.querySelector('.modal-movie'),
  addWatched: document.querySelector('.watched'),
  addQueue: document.querySelector('.queue'),
};

export const indexElements = {
  heroForm: document.querySelector('form.hero__form'),
  pagination: document.querySelector('.pagination'),
  paginationAddBtn: document.querySelector('button.pagination__add'),
  paginationSubBtn: document.querySelector('button.pagination__sub'),
  paginationSpan: document.querySelector('span.pagination__span'),
  loader: document.querySelector('.loader'),
};

// Library
export const libraryElements = {
  heroLibraryButtons: document.querySelector('.hero__container'),
  noMoviesText: document.querySelector('.no-movies'),
};
