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

//current loaded cake
let curCakeId;

/*
*
FUNCTION DEFINITIONS
*
*/

/*CAKE FUNCTIONS*/

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
    curCakeId = cake.id;
    cakeName.innerText = cake.name;
    cakeDes.innerText = cake.description;
    cakeImage.src = cake.image_url;
    reviewList.innerHTML = '';
    cake.reviews.forEach((review) => {
        createReview(review); //create review elements for each review
    })
}


//update description of cake with fetch PATCH
const updateDescription = async function(form) {
    let res = await fetch(`${url}/${curCakeId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ description: form.description.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let data = await res.json()
    cakeDes.innerText = data.description
    form.clear();
}

/*REVIEW FUNCTIONS*/

//update review list when adding new review, patch to db
const patchReview = async function(form) {
    //get request for current cake's reviews array
    let resGet = await fetch(`${url}/${curCakeId}`)
    let dataGet = await resGet.json();
    let curReviews = dataGet.reviews;

    //make post request
    let resPatch = await fetch(`${url}/${curCakeId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ reviews: [...curReviews, form.review.value]}), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let dataPatch = await resPatch.json();
    form.reset();
    //pass in last element of reviews array
    createReview(dataPatch.reviews[dataPatch.reviews.length - 1])
}

//create one review in reviewList, including on click delete
const createReview = function(reviewText) {
    let newListEl = document.createElement('li');
    newListEl.innerText = reviewText;

    //on click remove review from DOM 
    newListEl.addEventListener('click', (e) => {
        e.target.remove();
    })
    reviewList.append(newListEl);
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

//submit event to add review
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    patchReview(e.target);
})

//submit event to update description 
descriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateDescription(e.target);
})