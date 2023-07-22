import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', openLargeImg);

gallery.append(...makeGalleryItems(galleryItems));

function openLargeImg(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;

    const instance = basicLightbox.create(
        `<img width="1400" height="900" src="${e.target.dataset.source}">`, {
            onShow: instance => document.addEventListener('keydown', closeKey),
            onClose: instance => document.removeEventListener('keydown', closeKey),
    }
    );

    instance.show();

    function closeKey(e) {
        if (e.code === 'Escape') {
            instance.close();
        }
    }

    
}

// function openLargeImg(e) {
//     e.preventDefault();
//     if (e.target.nodeName !== 'IMG') return;

//     const instance = basicLightbox.create(
//         `<img width="1400" height="900" src="${e.target.dataset.source}">`
//     );

//     instance.show();

//     document.addEventListener('keydown', closeKey);

//     function closeKey(e) {
//         if (e.code === 'Escape') {
//             instance.close();
//             document.removeEventListener('keydown', closeKey);
//         }
//     }
// }

function makeGalleryItems(arr) {
    return arr.map(i => {
        const item = document.createElement('li');
        item.className = 'gallery__item';
        const a = document.createElement('a');
        a.className = 'gallery__link';
        a.href = 'large-image.jpg';
        const img = document.createElement('img');
        img.className = 'gallery__image';
        img.src = i.preview;
        img.dataset.source = i.original;
        img.alt = i.description;
        a.append(img);
        item.append(a);
        return item;
    });
}
