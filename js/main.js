'use strict';

// GLOBAL VARIABLES //
const btnElement = document.querySelector('.js-form_btn');
const btnReset = document.querySelector('.reset');
const searchUrlAPI = "//api.tvmaze.com/search/shows?q=";
const defaultImageHTML = '<img class="search_img" src="//via.placeholder.com/210x295/ffffff/666666/?text=TV" />';



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
                addToFavourites(item.querySelector('p').innerText, item.innerHTML);
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
    localStorage.setItem("favourites", JSON.stringify({}));
    refreshFavoutites();  
}

function eliminateFavorite() {
    allFavourites.addEventListener("click", function (event) {
        event.currentTarget.classList.remove("js-favourite");
    });    
}

function removeFromFavourites(name) { 
    let allFavourites = JSON.parse(localStorage.getItem("favourites"));
    delete allFavourites[name];
    localStorage.setItem("favourites", JSON.stringify(allFavourites));
}

function addToFavourites(name, showHTML) { 
    let allFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (allFavourites == null) {
        allFavourites = {};
    }
    allFavourites[name] = showHTML;
    localStorage.setItem("favourites", JSON.stringify(allFavourites));
}

// SETTING LOCAL STORAGE //

function setLocalStorage() {
    localStorage.setItem('allFavourites', JSON.stringify(allFavourites));
}


// HTML CODE //
function refreshFavoutites() {
    const allFavourites = JSON.parse(localStorage.getItem("favourites"));
    const listFavourite = document.querySelector('.js-favourites_list');
    let favouritesHTML = "";
    for (const favourite in allFavourites) { 
        favouritesHTML +=  '<li class="favourite_item">';
        favouritesHTML += allFavourites[favourite];
        favouritesHTML +=  '</li>';
    }
    listFavourite.innerHTML = favouritesHTML; 
    const favouritesItems = listFavourite.querySelectorAll(".favourite_item");
    for (const favouriteHTML of favouritesItems) {
      favouriteHTML.addEventListener("click", () => {
        removeFromFavourites(favouriteHTML.querySelector('p').innerText);
        refreshFavoutites();
      });
    }
};


function serieHTML(data) {
    let html = '';
    for (const item of data){
        html +=  '<li class="search_item">'
        html += `<p class="search_item-title">${item.show.name}</p>`;
        html += imageHTML(item);
        html += '</li>';
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

    btnReset.addEventListener("click", clearFavourites);
}

init();
