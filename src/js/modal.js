import { commonElements } from './domElements';
import { createMovieModalMarkup } from './renderMarkup';
import { fetchMovieByID } from './tmdb-api';

const { backdropModal, modalMovie } = commonElements;

let selectedMovie;

export const toogleModal = isVisible => {
  if (isVisible) {
    backdropModal.classList.add('visible');
  } else {
    backdropModal.classList.remove('visible');
  }
};

export const handleSelectCard = async e => {
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

export const handleCloseModal = e => {
  const closeBtn = e.target.closest('button.modal__btn');

  if (!closeBtn && e.target !== backdropModal) {
    return;
  }
  toogleModal(false);
};

export const handleKeyCloseModal = e => {
  if (e.code !== 'Escape') {
    return;
  }

  toogleModal(false);
};

export const getSelectedMovie = () => selectedMovie;
