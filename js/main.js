'use strict';

// global variables:
const btnElement = document.querySelector('.js-form_btn');
const searchUrlAPI = "http://api.tvmaze.com/search/shows?q=";
const defaultImageHTML = '<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" />';

// btn prevent default:
function resetBehaviorsButton() {
    document.querySelector(".js-form_btn").addEventListener("click",
        function (event) {
            event.preventDefault()
        });
}

// Event listeners

function addEventSearcher() { 
  btnElement.addEventListener("click", inputSearchValue);
}

// functions:

function searchShows(search) {
    fetch(searchUrlAPI+search)
    .then(response => { return response.json(); })
        .then(shows => {
        //Esto puede ser una funcion apartada:
        let html = '';
        for (const show of shows){
            html +=  '<li>'
            html += `<p>${show.show.name}</p>`;
            html += imageHTML(show);
            html +=  '</li>'
        }
        const list = document.querySelector('.js-search_list');
        list.innerHTML = html;
    })
}

function imageHTML(show) {
    let imageHTML = defaultImageHTML;
    if (show.show.image != null)
      imageHTML = `<img src="${show.show.image.medium}" />`;

    return imageHTML;
}

function inputSearchValue() {
    const search = document.querySelector('.js-input').value;
    if (search === '') {
        return console.log("vazio");
    } else {
        searchShows(search);
    }
}

function init() {
    resetBehaviorsButton();
    addEventSearcher();

}

init();