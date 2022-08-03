// your code here
const url = 'http://localhost:3000/cakes'
const cakeList = document.querySelector('#cake-list')
const cakeDetails = document.querySelector('#cake-details')
const cakeName = document.querySelector('#cake-name')
const cakeImage = document.querySelector('#cake-image')
const cakeDes = document.querySelector('#cake-description')
const reviewList = document.querySelector('#review-list')

const descriptionForm = document.querySelector('#description-form')
const reviewForm = document.querySelector('#review-form')

const getAllCakes = async function(){
    let res = await fetch(url);
    let data = await res.json();
    data.forEach((el, i) => {
        renderCake(el);
    })
}

const renderCake = function(cake) {
    let newListEl = document.createElement('li');
    newListEl.innerText = cake.name;

    newListEl.addEventListener('click', function(){
        showCake(cake);
    })
    cakeList.append(newListEl);
}

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

const addNewReview = function(form) {
    let newListEl = document.createElement('li');
    newListEl.innerText = form.review.value;
    reviewList.append(newListEl);
    form.reset();
}

getAllCakes();
document.addEventListener('DOMContentLoaded', async () => {
    let res = await fetch(`${url}/1`)
    let data = await res.json();
    showCake(data);
})
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewReview(e.target);
})