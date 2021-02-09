'use strict';

// global variables: //
const btnElement = document.querySelector('.js-form_btn');
const searchUrlAPI = "http://api.tvmaze.com/search/shows?q=";
const defaultImageHTML = '<img class="search_img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />';

// array //
let allFavourites = {};

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
            if (event.currentTarget.classList.contains("js-favourite")) {
                addToFavourites(item.querySelector('p').innerText, item.innerHTML);
            } else {
                removeFromFavourites(item.querySelector('p').innerText);
            }
            refreshFavoutites();
        });
    }
}  

// functions: //
function eliminateFavorite() {
    allFavourites.addEventListener("click", function (event) {
        event.currentTarget.classList.remove("js-favourite");
    });
   
        
}

function addToFavourites(name, showHTML) { 
    let allFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (allFavourites == null) {
        allFavourites = {};
    }
    allFavourites[name] = showHTML;
    localStorage.setItem("favourites", JSON.stringify(allFavourites));
}

function removeFromFavourites(name) { 
    let allFavourites = JSON.parse(localStorage.getItem("favourites"));
    delete allFavourites[name];
    localStorage.setItem("favourites", JSON.stringify(allFavourites));
}

function resetBehaviorsButton() {
    document.querySelector(".js-form_btn").addEventListener("click",
        function (event) {
            event.preventDefault()
        });
}
function refreshFavoutites() {
    const allFavourites = JSON.parse(localStorage.getItem("favourites"));
    const listFavourite = document.querySelector('.js-favourites_list');
    listFavourite.innerHTML = "";
    for (const favourite in allFavourites) { 
        listFavourite.innerHTML += allFavourites[favourite];
    }   
};

function setLocalStorage() {
    localStorage.setItem('allFavourites', JSON.stringify(allFavourites));
}


function searchShows(search) {
    fetch(searchUrlAPI+search)
    .then(response => { return response.json(); })
        .then(data => {
        //Esto puede ser una funcion apartada:
        let html = '';
        for (const item of data){
            html +=  '<li class="search_item">'
            html += `<p class="search_item-title">${item.show.name}</p>`;
            html += imageHTML(item);
            html +=  '</li>'
        }
        const list = document.querySelector('.js-search_list');
        list.innerHTML = html; 
        addEventFavourites();
    })
}

function imageHTML(item) {
    let imageHTML = defaultImageHTML;
    if (item.show.image != null)
      imageHTML = `<img class="search_img" src="${item.show.image.medium}" />`;

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
    refreshFavoutites();
}

init();
