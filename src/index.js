/*
*
CONSTANTS
*
*/

//url 
const url = 'http://localhost:3000/cakes'

//DOM description elements
const cakeList = document.querySelector('#cake-list')
const cakeDetails = document.querySelector('#cake-details')
const cakeName = document.querySelector('#cake-name')
const cakeImage = document.querySelector('#cake-image')
const cakeDes = document.querySelector('#cake-description')
const reviewList = document.querySelector('#review-list')

//DOM forms
const descriptionForm = document.querySelector('#description-form')
const reviewForm = document.querySelector('#review-form')

/*
*
FUNCTION DEFINITIONS
*
*/

//get all cakes from db
const getAllCakes = async function(){
    let res = await fetch(url);
    let data = await res.json();
    data.forEach((el, i) => {
        renderCake(el);
    })
}

//add cake to navbar and create on click event
const renderCake = function(cake) {
    let newListEl = document.createElement('li');
    newListEl.innerText = cake.name;

    newListEl.addEventListener('click', function(){
        showCake(cake);
    })
    cakeList.append(newListEl);
}

//show cake details in info section
const showCake = function(cake) {
    cakeName.innerText = cake.name;
    cakeDes.innerText = cake.description;
    cakeImage.src = cake.image_url;
    reviewList.innerHTML = '';
    cake.reviews.forEach((review) => {
        let reviewLi = document.createElement('li');
        reviewLi.innerText = review;
        reviewList.append(reviewLi);
    })
}

//add review from form to review list
const addNewReview = function(form) {
    let newListEl = document.createElement('li');
    newListEl.innerText = form.review.value;
    reviewList.append(newListEl);
    form.reset();
}

/*
*
CODE TO RUN ON PAGE LOAD
*
*/

//get all cakes from db
getAllCakes();

//event listener to display first cake on page load
document.addEventListener('DOMContentLoaded', async () => {
    let res = await fetch(`${url}/1`)
    let data = await res.json();
    showCake(data);
})

//add submit event to review form
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewReview(e.target);
})