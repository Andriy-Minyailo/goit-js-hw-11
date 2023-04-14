export function rendering(array) {
    return array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `<div class="gallery__item">
     <a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}"/>
</a>
</div>
<div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>`).join(""); 
}