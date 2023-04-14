import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { RequestServer } from './requestServer';
import { rendering } from './renderind';
import { LoadMoreButton } from './loadMoreButton';

const requestServer = new RequestServer();

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
};

const onloadMoreButton = new LoadMoreButton({
    isHiden: true,
    disabled: true,
    loading: false,
    buttonAdress: refs.loadMoreButton
});

refs.form.addEventListener('submit', onSumbitForm);
refs.loadMoreButton.addEventListener('click', onSumbitLoadMore);

function onSumbitForm(event) {
    event.preventDefault();
    const { searchQuery } = event.currentTarget.elements;
    requestServer.params.page = 0;
    requestServer.onRequestServer(searchQuery.value)
        .then(response => {
            const { hits } = response.data;
            refs.gallery.innerHTML = rendering(response.data.hits);
            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
            
        })
        .catch(function (error) {
    console.log(error);
  });;
}

function onSumbitLoadMore(event) {
    refs.gallery.innerHTML = requestServer.onRequestServer();
}

onloadMoreButton.buttonState();
