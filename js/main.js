'use strict';

// global variables: //
const btnElement = document.querySelector('.js-form_btn');
const searchUrlAPI = "http://api.tvmaze.com/search/shows?q=";
const defaultImageHTML = '<img class="search_img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />';

// array
let allFavourites = {};

// btn prevent default:
function resetBehaviorsButton() {
    document.querySelector(".js-form_btn").addEventListener("click",
        function (event) {
            event.preventDefault()
        });
}

// Event listeners //

function addEventSearcher() { 
  btnElement.addEventListener("click", inputSearchValue);
}

function addEventFavourites() {
    const resultItems = document.querySelectorAll(".search_item");
    for (const item of resultItems) {
       item.addEventListener("click",
        function (event) {
            event.currentTarget.classList.toggle("js-favourite");
            allFavourites[item.querySelector('p').innerText]=item.innerHTML;
            refreshFavoutites();
        });
    }
}  


// functions: //
function refreshFavoutites() { 
    const listFavourite = document.querySelector('.js-favourites_list');
    listFavourite.innerHTML = "";
    for (const favourite in allFavourites) { 
        listFavourite.innerHTML += allFavourites[favourite];
    }   
};

function searchShows(search) {
    fetch(searchUrlAPI+search)
    .then(response => { return response.json(); })
        .then(shows => {
        //Esto puede ser una funcion apartada:
        let html = '';
        for (const show of shows){
            html +=  '<li class="search_item">'
            html += `<p class="search_item-title">${show.show.name}</p>`;
            html += imageHTML(show);
            html +=  '</li>'
        }
        const list = document.querySelector('.js-search_list');
        list.innerHTML = html; 
        addEventFavourites();
    })
}

function imageHTML(show) {
    let imageHTML = defaultImageHTML;
    if (show.show.image != null)
      imageHTML = `<img class="search_img" src="${show.show.image.medium}" />`;

    return imageHTML;
}

function inputSearchValue() {
    const search = document.querySelector('.js-input').value;
    if (search !== '') {
        searchShows(search);
    } 
}

function init() {
    resetBehaviorsButton();
    addEventSearcher();
}

init();