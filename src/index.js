import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RequestServer } from './requestServer';
import { markup } from './markup';
import { LoadMoreButton } from './loadMoreButton';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    searchButton: document.querySelector('#search-form button'),
};
const requestServer = new RequestServer();
const onloadMoreButton = new LoadMoreButton({
    isHiden: true,
    disabled: true,
    loading: false,
    buttonAdress: refs.loadMoreButton
});
let totalImagesUploaded = 40;    

onloadMoreButton.buttonState({});

refs.form.addEventListener('submit', onSumbitForm);
refs.loadMoreButton.addEventListener('click', onSumbitLoadMore);

async function onSumbitForm(event) {
    event.preventDefault();
    const { searchQuery } = event.currentTarget.elements;
    if (!searchQuery.value.trim()) {
        Notify.info('Please, enter data to search!');
        return;
    }
    refs.searchButton.disabled = true;
    onloadMoreButton.buttonState({
        isHiden: false,
        loading: true,
    });
        requestServer.params.page = 0;
    refs.gallery.innerHTML = '';
    try {
        const response = await requestServer.onRequestServer(searchQuery.value);
        const { hits, totalHits } = response.data;
        
        if (!totalHits) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        onloadMoreButton.buttonState({isHiden: true});
            refs.searchButton.disabled = false;
            return;
        }
         Notify.success(`Hooray! We found ${totalHits} images.`)
        refs.gallery.insertAdjacentHTML("beforeend", markup(hits));
        refs.searchButton.disabled = false;
        if (totalHits <= 40) {
        onloadMoreButton.buttonState({
        isHiden: true,
        disabled: true,
         });
            return
        };
        onloadMoreButton.buttonState({
        isHiden: false,
        disabled: false,
        loading: false,
    });
       const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
    } catch(error) {
    console.log(error);
  };
}

async function onSumbitLoadMore(event) {
     onloadMoreButton.buttonState({
        disabled: true,
         loading: true,
        isHiden: false,
     });
        try {
        const response = await requestServer.onRequestServer();
        const { hits, totalHits } = response.data;
              
        refs.gallery.insertAdjacentHTML("beforeend", markup(hits));
        onloadMoreButton.buttonState({
        isHiden: false,
        disabled: false,
        loading: false,
        });
            
        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
         behavior: "smooth",
        });
        totalImagesUploaded += 40;
        if (totalImagesUploaded >= totalHits) {
            Notify.warning("We're sorry, but you've reached the end of search results.");
            onloadMoreButton.buttonState({
            isHiden: true,
            disabled: true,
            }); 
        }
        const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
            
    } catch (error) {
        console.log(error);
        // if (error.code === 'ERR_BAD_REQUEST') {
        // Notify.warning("We're sorry, but you've reached the end of search results.");
        // onloadMoreButton.buttonState({
        // isHiden: true,
        // disabled: true,
        // });
        // };      
  };
}





 