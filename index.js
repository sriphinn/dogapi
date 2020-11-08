
function getDogImages(number) {
    //use Dog API to get random dog pictures
    fetch('https://dog.ceo/api/breeds/image/random/' + number)
        //converts data into JSON
        .then(response => response.json())
        //runs JSON file through function displayResults
        .then(responseJson =>
            displayResults(responseJson))
        //if something goes wrong, throw error message
        .catch(error => alert("Something went wrong. Try again later."));
}

function getDogBreedImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(responseJson => displayBreed(responseJson, breed))
        .catch(error => alert("Something went wrong. Try again later."));
}

//loads images in the DOM 
function displayResults(responseJson) {
    //logs JSON data to console
    console.log(responseJson);
    $('.results').empty()
    for (let i = 0; i < responseJson.message.length; i++) {
        $('.results').append(
            `<img src="${responseJson.message[i]}">`
        )
    };
    $('.results').removeClass('hidden');
}

function displayBreed(responseJson, breed) {
    //logs JSON data to console
    console.log(responseJson);
    $('.results').empty()
    if (responseJson.code == 404) {
        $('.results').append(`<p>${responseJson.message}</p>`)
    } else {
        $('.results').append(`<img src="${responseJson.message}">`);
        $('.results').append(`<p>Look at your ${breed}!</p>`)
    }
    $('.results').removeClass('hidden');
}

function watchForm() {
    $("main").on("submit", "#random-dogs", e => {
        e.preventDefault();
        const number = $('#number-of-dogs').val()
        getDogImages(number);
    });
}

function watchBreedFrom() {
    $("main").on("submit", "#dog-breeds", e => {
        e.preventDefault();
        const breed = $('#dog-breed').val()
        getDogBreedImage(breed)
    })
}

$(function () {
    console.log("App loaded! Waiting for user input and submit.");
    watchForm();
    watchBreedFrom();
});