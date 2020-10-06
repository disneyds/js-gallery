import images from './gallery-items.js';

const galleryPreview = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const imageInModal = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const makeImageMarkupFromObj = ({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

const makeRowMarkupForGallery = images.map(makeImageMarkupFromObj).join(' ');

galleryPreview.insertAdjacentHTML('afterbegin', makeRowMarkupForGallery);

galleryPreview.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  e.preventDefault();
  window.addEventListener('keydown', closeModalFromESC);
  window.addEventListener('keydown', swapImages);

  const source = e.target.dataset.source;
  const alt = e.target.getAttribute('alt');
  modal.classList.add('is-open');

  imageInModal.setAttribute('src', source);
  imageInModal.setAttribute('alt', alt);
}

btnCloseModal.addEventListener('click', onModalClose);
overlay.addEventListener('click', closeModalFromOverlay);

function onModalClose() {
  window.removeEventListener('keydown', closeModalFromESC);
  window.removeEventListener('keydown', swapImages);
  modal.classList.remove('is-open');
  imageInModal.removeAttribute('src');
  imageInModal.removeAttribute('alt');
}

function closeModalFromOverlay() {
  onModalClose();
}

function closeModalFromESC(e) {
  if (e.code === 'Escape') {
    onModalClose();
  }
}

function swapImages(e) {
  if (e.code === 'ArrowLeft') {
    imageInModal.setAttribute('src', images[0].original);
    imageInModal.setAttribute('alt', images[0].description);
  }
  if (e.code === 'ArrowRight') {
    imageInModal.setAttribute('src', images[0].original);
    imageInModal.setAttribute('alt', images[0].description);
  }
}
