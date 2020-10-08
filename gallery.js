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
  btnCloseModal.addEventListener('click', onModalClose);
  overlay.addEventListener('click', closeModalFromOverlay);

  const source = e.target.dataset.source;
  const alt = e.target.getAttribute('alt');
  modal.classList.add('is-open');

  imageInModal.setAttribute('src', source);
  imageInModal.setAttribute('alt', alt);
}

function onModalClose() {
  window.removeEventListener('keydown', closeModalFromESC);
  window.removeEventListener('keydown', swapImages);
  btnCloseModal.removeEventListener('click', onModalClose);
  overlay.removeEventListener('click', closeModalFromOverlay);
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

let ArrOfSources = [];
images.forEach(item => {
  ArrOfSources.push(item.original);
});

function swapImages(e) {
  let index = ArrOfSources.indexOf(imageInModal.src);

  if (e.code === 'ArrowRight') {
    if (index < ArrOfSources.length - 1) {
      imageInModal.setAttribute('src', ArrOfSources[index + 1]);
    } else {
      index = -1;
      imageInModal.setAttribute('src', ArrOfSources[index + 1]);
    }
  }

  if (e.code === 'ArrowLeft') {
    if (index === 0) {
      index = ArrOfSources.length;
      imageInModal.setAttribute('src', ArrOfSources[index - 1]);
    } else imageInModal.setAttribute('src', ArrOfSources[index - 1]);
  }
}
