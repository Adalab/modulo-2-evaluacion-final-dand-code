'use strict';

const btnElement = document.querySelector('.js-form_btn');

document.querySelector(".js-form_btn").addEventListener("click",
    function (event) {
    event.preventDefault()
});

function inputSearchValue() {
    const search = document.querySelector('.js-input').value;
    if (search === '') {
        return console.log("vazio");
    } else {
        return console.log(search);
    }
}
btnElement.addEventListener("click", inputSearchValue);

