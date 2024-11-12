// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { photos } from './js/pixabay-api';
import { markup } from './js/render-functions';

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const LoadMore = document.querySelector('.load_Btn');
let searchPoint = '';
let page = 1;

loader.style.display = 'none';
searchForm.addEventListener('submit', feedbackForm);

async function feedbackForm(event) {
  event.preventDefault();
  loader.style.display = 'block';
  gallery.innerHTML = '';
  page = 1;
  searchPoint = event.target.elements.input.value.trim();
  LoadMore.classList.add('is-hidden');

  if (searchPoint.length === 0) {
    loader.style.display = 'none';
    return iziToast.error({
      title: 'Error',
      backgroundColor: 'tomato',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: 'white',
      messageSize: '20',
      position: 'bottomRight',
      close: true,
      displayMode: 2,
    });
  }
  const res = await photos(searchPoint, page);
  try {
    if (res.hits.length === 0) {
      gallery.innerHTML = '';
      return iziToast.error({
        title: 'Error',
        backgroundColor: 'tomato',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        messageSize: '20',
        position: 'bottomRight',
        close: true,
        displayMode: 2,
      });
    }
    gallery.insertAdjacentHTML('beforeend', markup(res.hits));
    lightbox.refresh();
    if (res.totalHits > 15) {
      LoadMore.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
}

LoadMore.addEventListener('click', onLoadMore);

async function onLoadMore() {
  loader.style.display = 'block';
  page += 1;
  const res = await photos(searchPoint, page);
  try {
    const lastPage = Math.ceil(res.totalHits / 15);
    if (lastPage === page) {
      LoadMore.classList.add('is-hidden');
      iziToast.info({
        title: 'Error',
        backgroundColor: 'tomato',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'white',
        messageSize: '20',
        position: 'bottomRight',
        close: true,
        displayMode: 2,
      });
    }
    gallery.insertAdjacentHTML('beforeend', markup(res.hits));
    const heightScroll =
      gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: heightScroll * 2,
      behavior: 'smooth',
    });
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
