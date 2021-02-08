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
            html += `<p>${data[i].name}</p>`;
            html += `<img src="${data[i].image.medium}" />`;
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