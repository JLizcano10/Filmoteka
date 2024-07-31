import Notiflix from 'notiflix';
import { getSelectedMovie } from './modal';

Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  fontSize: '15px',
  closeButton: false,
  timeout: 2000,
});

const watchedArray = JSON.parse(localStorage.getItem('watchedArray')) || [];
const queueArray = JSON.parse(localStorage.getItem('queueArray')) || [];

export const handleAddWatched = () => {
  const movie = getSelectedMovie();
  if (movie) {
    const movieIsExist = watchedArray.some(el => el.id === movie.id);
    if (!movieIsExist) {
      watchedArray.push(movie);
      localStorage.setItem('watchedArray', JSON.stringify(watchedArray));
    } else {
      Notiflix.Notify.warning('This movie is already in list');
    }
  }
};

export const handleAddQueue = () => {
  const movie = getSelectedMovie();
  if (movie) {
    const movieIsExist = queueArray.some(el => el.id === movie.id);
    if (!movieIsExist) {
      queueArray.push(movie);
      localStorage.setItem('queueArray', JSON.stringify(queueArray));
    } else {
      Notiflix.Notify.warning('This movie is already in list');
    }
  }
};
