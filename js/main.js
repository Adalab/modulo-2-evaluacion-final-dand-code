'use strict';

// GLOBAL VARIABLES //
const btnElement = document.querySelector('.js-form_btn');
const btnReset = document.querySelector('.reset');
const searchUrlAPI = "//api.tvmaze.com/search/shows?q=";
const defaultImageHTML = '<img class="search_img" src="//via.placeholder.com/210x295/ffffff/666666/?text=TV" />';
const logElement = document.querySelector('.js-form_log');

//Arrays
let searchItems = [];
let favouriteItems = [];

// EVENTS //

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
                addToFavourites(item.querySelector('p').innerText);
            } else {
                removeFromFavourites(item.querySelector('p').innerText);
            }
            refreshFavoutites();
        });
    }
}  

function resetBehaviorsButton() {
    document.querySelector(".js-form_btn").addEventListener("click",
        function (event) {
            event.preventDefault()
        });
}

// USER BEHAVIOR - FAVOURITES//

function clearFavourites() {
    favouriteItems = [];
    refreshFavoutites();  
}

function eliminateFavorite() {
    allFavourites.addEventListener("click", function (event) {
        event.currentTarget.classList.remove("js-favourite");
    });    
}

function removeFromFavourites(name) { 
    favouriteItems = favouriteItems.filter(item => item.show.name != name);
}

function addToFavourites(name, showHTML) { 
    const newFavourite = searchItems.filter(item => item.show.name == name);
    if (newFavourite.length !== 0) {
        favouriteItems.push(newFavourite[0]);
    }
}

// SETTING LOCAL STORAGE //

function setLocalStorage() {
    localStorage.setItem('allFavourites', JSON.stringify(allFavourites));
}


// HTML CODE //
function refreshFavoutites() {
    const listFavourite = document.querySelector('.js-favourites_list');
    let favouritesHTML = "";
    for (const favourite of favouriteItems) { 
        favouritesHTML +=  '<li class="favourite_item">';
        favouritesHTML += `<p class="search_item-title">${favourite.show.name}</p>`;
        favouritesHTML += imageHTML(favourite);
        favouritesHTML +=  '</li>';
    }
    listFavourite.innerHTML = favouritesHTML; 

    addEventFavouritesItems();
};

function addEventFavouritesItems() { 
    const favouriteItemsHTML = document.querySelectorAll(".favourite_item");
    for (const favouriteHTML of favouriteItemsHTML) {
      favouriteHTML.addEventListener("click", () => {
        removeFromFavourites(favouriteHTML.querySelector('p').innerText);
        refreshFavoutites();
      });
    }
}

function serieHTML(data) {
    searchItems = [];
    let html = '';
    for (const item of data) {
        html +=  '<li class="search_item">'
        html += `<p class="search_item-title">${item.show.name}</p>`;
        html += `<p class="search_item-title">${item.show.schedule.days}</p>`;
        html += imageHTML(item);
        html += '</li>';
        searchItems.push(item);
    }
    const list = document.querySelector('.js-search_list');
    list.innerHTML = html; 
}

function imageHTML(item) {
    let imageHTML = defaultImageHTML;
    if (item.show.image != null)
      imageHTML = `<img class="search_img" src="${item.show.image.medium}" />`;

    return imageHTML;
}

// COMUNICATION WITH API //
function searchShows(search) {
    fetch(searchUrlAPI+search)
        .then(response => { return response.json(); })
        .then(data => {
        serieHTML(data);
        addEventFavourites();
    })
}


// SEARCH INPUT //

function handleLog() {
    for (const item of searchItems) {
        console.log(item.show.name);
    }
}

function resetButtonLog() {
    document.querySelector(".js-form_log").addEventListener("click",
        function (event) {
            event.preventDefault()
        });
}


function inputSearchValue() {
    const search = document.querySelector('.js-input').value;
    if (search !== '') {
        searchShows(search);
    } 
}

// Init aplication// 
function init() {
    resetBehaviorsButton();
    addEventSearcher();
    refreshFavoutites();
    resetButtonLog()

    btnReset.addEventListener("click", clearFavourites);
    logElement.addEventListener("click", handleLog);
}

init();
