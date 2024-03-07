"use strict";

// Sélection des éléments du DOM
const form = document.querySelector(".form");
const cardConfirmation = document.querySelector(".card-confirmation");
const btnConfirmation = document.querySelector(".card-confirmation__button");

const cardInfo = document.querySelector(".card__info");
const cardAuthor = document.querySelector(".card__author");
// const cardDate = document.querySelector(".card__date"); // Ligne commentée, à supprimer si inutile
const cardDateMonth = document.querySelector(".card__date-month");
const cardDateYear = document.querySelector(".card__date-year");

// Sélection des inputs
const cardNameInput = document.getElementById("card__name");
const cardNumberInput = document.getElementById("card__number");
const cardMonthInput = document.getElementById("MM");
const cardYearInput = document.getElementById("YY");
const cardCVCInput = document.getElementById("CVC");

//selection des erreurs
const cardNumberError = document.querySelector(".form__card-number-error");
const cardMMYYError = document.querySelector(".form__card-date-error-MMYY");
const cardCVCError = document.querySelector(".form__card-date-error-CVC");

//LOGIC
const toggleFormAndConfirmationVisibility = function () {
  form.classList.toggle("hidden");
  cardConfirmation.classList.toggle("hidden");
};

//Gestion des erreurs
const isCardNameValid = function () {
  const name = cardNameInput.value.trim(); // Supprime les espaces blancs au début et à la fin
  const isOnlyLetters = /^[A-Za-z\s]+$/.test(name); // Vérifie si la chaîne contient uniquement des lettres et des espaces
  return name.length >= 4 && isOnlyLetters;
};

const isCardNumberValid = () => /^\d{16}$/.test(cardNumberInput.value);

const isCardDateValid = () =>
  /^\d{2}$/.test(cardYearInput.value) && /^\d{2}$/.test(cardMonthInput.value);

const isCardCVCValid = () => /^\d{3}$/.test(cardCVCInput.value);

// DISPLAY ERREUR
const displayErrorMessage = function () {
  let isError = false;

  if (!isCardNameValid()) {
    cardNameInput.style.border = "1px solid var(--color-red)";
    isError = true;
  } else {
    cardNameInput.style.border = "";
  }

  if (!isCardNumberValid()) {
    cardNumberError.classList.remove("hidden");
    cardNumberInput.style.border = "1px solid var(--color-red)";
    isError = true;
  } else {
    cardNumberError.classList.add("hidden");
    cardNumberInput.style.border = "";
  }

  if (!isCardDateValid()) {
    cardMMYYError.classList.remove("hidden");
    cardMonthInput.style.border = "1px solid var(--color-red)";
    cardYearInput.style.border = "1px solid var(--color-red)";
    isError = true;
  } else {
    cardMMYYError.classList.add("hidden");
    cardMonthInput.style.border = "";
    cardYearInput.style.border = "";
  }

  if (!isCardCVCValid()) {
    cardCVCError.classList.remove("hidden");
    cardCVCInput.style.border = "1px solid var(--color-red)";
    isError = true;
  } else {
    cardCVCError.classList.add("hidden");
    cardCVCInput.style.border = "";
  }

  return isError;
};

// Fonction pour mettre à jour le contenu des éléments de la carte
const updateCardDetails = function () {
  cardAuthor.textContent = cardNameInput.value;
  cardInfo.textContent = cardNumberInput.value;
  cardDateMonth.textContent = cardMonthInput.value;
  cardDateYear.textContent = cardYearInput.value;
};

// Gestionnaire d'événement pour la soumission du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (displayErrorMessage()) return;
  updateCardDetails();
  toggleFormAndConfirmationVisibility();
});

btnConfirmation.addEventListener("click", function (e) {
  e.preventDefault();
  toggleFormAndConfirmationVisibility();
});
