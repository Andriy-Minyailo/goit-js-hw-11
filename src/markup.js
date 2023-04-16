export function markup(array) {
    return array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `<div class="gallery__item">
     <a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}"/>
</a>

<div class="gallery__info">
    <p class="gallery__info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="gallery__info-item">
      <b>Views ${views}</b>
    </p>
    <p class="gallery__info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="gallery__info-item">
      <b>Downloads ${downloads}</b>
    </p>
    </div>
  </div>`).join(""); 
}        