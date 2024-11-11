import axios from 'axios';

const API_KEY = '46775903-5820c4e6d789cb0cb95772c39';
const URL = 'https://pixabay.com/api/?';

export async function photos(q, page = 1) {
  const parametrs = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    pare_page: 15,
    page,
    q,
  });
  const resaul = await axios(`${URL}${parametrs}`);
  try {
    return resaul.data;
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Ups.. Something wrong',
      position: 'topRight',
    });
  }
}
