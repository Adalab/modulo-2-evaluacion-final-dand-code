'use strict';
// global variables:
const btnElement = document.querySelector('.js-form_btn');
const urlAPI = "http://api.tvmaze.com/shows";

// btn prevent default:
document.querySelector(".js-form_btn").addEventListener("click",
    function (event) {
    event.preventDefault()
});

// functions:

function getApiInformation() {
    fetch(urlAPI)
    .then(response => { return response.json(); })
    .then(data => {
        let html = '';
        for (let i = 0; i < data.length; i++){
            html +=  '<li>'
            html += data[i].name;
            html +=  '</li>'
        }
        const list = document.querySelector('.js-search_list');
        list.innerHTML = html;
    })
}


   


function inputSearchValue() {
    const search = document.querySelector('.js-input').value;
    if (search === '') {
        return console.log("vazio");
    } else {
        return console.log(search);
    }
}
btnElement.addEventListener("click", inputSearchValue);
getApiInformation();

/*
const btnElement = document.querySelector('.js-form_btn');
const listElement = document.querySelector('.js-search_list');
const urlAPI = 'http://api.tvmaze.com/shows';

let allSeries = [];
let favoriteSeries = [];

function getApiInformation(evt) {
    console.log(evt);
    fetch(urlAPI)
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        console.log(data[1].show);
        paintListHTML(evt);
    });
    paintListHTML();
}
getApiInformation();

function paintListHTML(evt) {
    let html = '';
    for(let i = 0; i < allSeries.length; i++){
        html += '<li class="item">';
        html += allSeries[i];
        html += '</li>';
    }
    evt.preventDefault();
    listElement.innerHTML = html;
} 

btnElement.addEventListener("click", getApiInformation);
*/