// DOM Elements
const form = document.querySelector('#newTeamForm');
const nameInput = document.querySelector('form #name');
const shortNameInput = document.querySelector('form #shortName');
const tlaInput = document.querySelector('form #tla');
const addressInput = document.querySelector('form #address');
const phoneInput = document.querySelector('form #phone');
const websiteInput = document.querySelector('form #website');
const emailInput = document.querySelector('form #email');
const foundedInput = document.querySelector('form #founded');
const clubColorsInput = document.querySelector('form #clubColors');
const venueInput = document.querySelector('form #venue');
const clubCountryInput = document.querySelector('form #clubCountry');


//Regular Expressions
//Name - Shortname
const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{4,25}$/u
const tlaRegex = /^[A-Z]{3,4}$/
const addressRegex = /^[A-za-z0-9\s&,]{20,55}$/
const phoneRegex = /^[0-9()+\s]{15,30}$/
const websiteRegex = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const foundedRegex = /^[0-9]{4}$/
const clubColorsRegex = /^[A-za-z/\s]{10,28}$/
const venueRegex = /^[A-za-z'.\s]{5,45}$/
const clubCountryRegex = /^[A-za-z\s]{4,25}$/



nameInput.oninput = () => {
  validateUserInput(nameInput, namesRegex);
}

shortNameInput.oninput = () => {
validateUserInput(shortNameInput, namesRegex);
}

tlaInput.oninput = () => {
  validateUserInput(tlaInput, tlaRegex);
}

addressInput.oninput = () => {
  validateUserInput(addressInput, addressRegex);
}

phoneInput.oninput = () => {
  validateUserInput(phoneInput, phoneRegex);
}

websiteInput.oninput = () => {
  validateUserInput(websiteInput, websiteRegex);
}

emailInput.oninput = () => {
  validateUserInput(emailInput, emailRegex);
}

foundedInput.oninput = () => {
  validateUserInput(foundedInput, foundedRegex)
}

clubColorsInput.oninput = () => {
  validateUserInput(clubColorsInput, clubColorsRegex);
}

venueInput.oninput = () => {
  validateUserInput(venueInput, venueRegex);
}

clubCountryInput.oninput = () => {
  validateUserInput(clubCountryInput, clubCountryRegex);
}

function validateUserInput(DOMinput, regex) {

  const inputValidation = regex.test(DOMinput.value)

  if (inputValidation) {
    DOMinput.classList.remove('is-invalid')
    DOMinput.classList.add('is-valid')
  } else {
    DOMinput.classList.remove('is-valid')
    DOMinput.classList.add('is-invalid')
  }
}