import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

function createGalleryCardMurkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
    `;
    })
    .join('');
}

const cardsMarcup = createGalleryCardMurkup(galleryItems);
galleryEl.innerHTML = cardsMarcup;

galleryEl.addEventListener('click', handleImgClick);

function handleImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const openModal = () => {
    const originalImg = event.target.dataset.source;

    const instance = basicLightbox.create(
      `
      <img src="${originalImg}">
      `,
      {
        onShow: (instance) => {
          window.addEventListener('keydown', openModalbyEsc);
        },

        onClose: (instance) => {
          window.removeEventListener('keydown', openModalbyEsc);
        },
      }
    );

    const openModalbyEsc = (event) => {
      if (event.code === 'Escape') {
        instance.close();
      }
    };

    instance.show();
  };

  openModal();
}
