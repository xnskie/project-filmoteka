import { API_service } from './apiSevice';
import renderFilmsMarkup from './templates/renderFilmsMarkup';
// import dataStorage from './userService/data-storage';

// const firebase = new dataStorage();
const filmsApi = new API_service();

const homeBtnRef = document.querySelector('.btn1');
const libraryBtnRef = document.querySelector('.btn2');
const watchedBtnRef = document.querySelector('.watched');
const queueBtnRef = document.querySelector('.queue');

const queueModalBtn = document.querySelector('.btn__queue');

homeBtnRef.addEventListener('click', onHomeBtnClick);
// libraryBtnRef.addventListener('click', onMyLibraryBtnClick);
queueBtnRef.addEventListener('click', onQueueBtnClick);
// watchedBtnRef.addEventListener('click', onWatchedBtnClick);

// const list = document.querySelector('.films');
// list.addEventListener('click', e => {
//   console.log(e.target.closest('li').dataset.id);
// });

async function onHomeBtnClick() {
  try {
    filmsApi.page = 1;
    const films = await filmsApi.fetchTrending();
    renderFilmsMarkup(films);
  } catch (error) {
    console.log(error);
  }
}

function onMyLibraryBtnClick() {
  if (libraryBtnRef.classList.contains('current')) return;
  renderGalleryFromFirebase();
}

function onWatchedBtnClick() {
  if (watchedBtnRef.classList.contains('header__library-buttons-button--active')) return;
  renderGalleryFromFirebase();
}

function onQueueBtnClick() {
  // if (queueBtnRef.classList.contains('header__library-buttons-button--active')) return;
  // renderGalleryFromFirebase();
  const film = {};
}

function renderGalleryFromFirebase() {
  const obj = firebase.watched;
  const ids = Object.keys(obj);
  renderMarkupByIds(ids);
}

async function renderMarkupByIds(ids) {
  try {
    const arrProm = ids.map(async id => {
      filmsApi.id = id;
      return await filmsApi.fetchMovieById();
    });
    const films = await Promise.all(arrProm);
    renderFilmsMarkup(films);
  } catch (error) {
    console.log(error);
  }
}
