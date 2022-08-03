// your code here
//see first cake's detail on page load 
    //use cakes/1

const url = 'http://localhost:3000/cakes';
const cakeList = document.querySelector('#cake-list')
const cakeName = document.querySelector('#cake-name')
const cakeImage = document.querySelector('#cake-image')
const cakeDes = document.querySelector('#cake-description')
const cakeReviews = document.querySelector('#review-list')

//global variable
let allCakes;
let curCakeId = 1;

//on page run fetch first cake
fetch(`${url}/${curCakeId}`) //localhost:3000/cakes/1
.then(res => res.json())
.then(data => {
    showFirstCake(data);
})

//show first cake
const showFirstCake = function(cake){
    cakeName.innerText = cake.name;
    cakeImage.src = cake.image_url;
    cakeDes.innerText = cake.description;
    //for each review, show review
    cake.reviews.forEach((review) => {
        //render to page
        let newLi = document.createElement('li');
        newLi.innerText = review;
        cakeReviews.append(newLi);
    })
}

//get all names of cake and render to cake list
//create li for nav
//li innertext = cake.name
//append nav to cakelist

fetch(url)
.then(res => res.json())
.then(data => {
    console.log(data);
    //el becomes a new cake object on each iteration
    data.forEach((el) => {
        console.log(el.name);
        let newLi = document.createElement('li');
        newLi.innerText = el.name
        //on li click - has access to cake object, show cake info
        newLi.addEventListener('click', (e) => {
            cakeReviews.innerHTML = '';
            showFirstCake(el)
        })
        //append button to list
        cakeList.append(newLi);
    })
});


//clear review list on page load
document.addEventListener('DOMContentLoaded', () => {
    cakeReviews.innerHTML = '';
    cakeList.innerHTML = '';

})


//get form
const form = document.querySelector('#review-form')
//add submit listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let reviewValue = document.querySelector('#review').value
    let newLi = document.createElement('li')
    newLi.innerText = reviewValue;
    cakeReviews.append(newLi);
    //create button
    let newBtn = document.createElement('button')
    //make a event listener
    newBtn.addEventListener('click', (e) => {
            //  event.target.parentElement.remove()
        e.target.parentElement.remove()
    })
    newBtn.innerText = 'Delete'
    //append to li  
    newLi.append(newBtn);
})

/*

createReview - creates Li with one review, includes delete button

Use when...
1. getting database reviews and showing cake info
2. submit new review from form

*/
