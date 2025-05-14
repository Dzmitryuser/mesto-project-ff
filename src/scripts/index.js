import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openAnyPopupFunction, closeAnyPopupFunction } from "./modal.js";
import {
  createCard,
  deleteCard,
  likeButtonFunction,
  openImagePopupFunction,
} from "./card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";

import { getAboutUser, getCardsArray, updateUserProfile, createNewCard } from "./api.js";

getAboutUser();

const fullPage = document.querySelector(".page");
const placesList = document.querySelector(".places__list");
const profileEditModalWindow = document.querySelector(".popup_type_edit");
const addNewCardModalWindow = document.querySelector(".popup_type_new-card");
const editProfileFormNameField = document.querySelector(
  ".popup__input_type_name"
);
editProfileFormNameField;
const editProfileFormDescriptionField = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const prifileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

/* Первичный (при загрузке страницы) рендер карточек и данных профиля */
getAboutUser()
  .then((result) => {
    profileTitle.textContent = result.name;
    prifileDescription.textContent = result.about;
    avatar.style.backgroundImage = `url('${result.avatar}')`;
  })
  .catch((err) => {
    console.error("Не удалось загрузить карточки:", err);
  });

getCardsArray().then((cards) => {
  cards.forEach((element) => {
    placesList.append(
      createCard(
        element.link,
        element.name,
        deleteCard,
        likeButtonFunction,
        openImagePopupFunction
      )
    );
  });
});

/* Функция - обработчик событий клик */
fullPage.addEventListener("click", (evt) => {
  /* Открытие окна редактирования профиля */
  if (evt.target.classList.contains("profile__edit-button")) {
    editProfileFormNameField.value = profileTitle.textContent;
    editProfileFormDescriptionField.value = prifileDescription.textContent;
    openAnyPopupFunction(profileEditModalWindow);

    /* Открытие окна добавления карточки */
  } else if (evt.target.classList.contains("profile__add-button")) {
    openAnyPopupFunction(addNewCardModalWindow);

    /* Закрытие по нажатию на кнопку */
  } else if (evt.target.classList.contains("popup__close")) {
    closeAnyPopupFunction(evt.target.closest(".popup"));
    clearValidation(evt.target.closest(".popup"), validationConfig);
  }
});

/* Объявляем переменные форм */
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];

/* Функция присвоения данных профиля из формы */
function handleEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileFormNameField.value;
  prifileDescription.textContent = editProfileFormDescriptionField.value;
  updateUserProfile(
    editProfileFormNameField.value,
    editProfileFormDescriptionField.value
  );
  closeAnyPopupFunction(profileEditModalWindow);
}

/* Функция добавления карточки из данных формы */
function handleaddCardForm(evt) {
  evt.preventDefault();
  const newImageName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newImageUrl = document.querySelector(".popup__input_type_url").value;
  createNewCard(newImageName, newImageUrl)
    .then(cardData => {
      const cardElement = createCard(
        cardData.link,
        cardData.name,
        deleteCard,
        likeButtonFunction,
        openImagePopupFunction
      );
      placesList.prepend(cardElement);
      addCardForm.reset();
      closeAnyPopupFunction(addNewCardModalWindow);
    })
    .catch(err => {
      console.error("Ошибка при создании карточки:", err);
    });
}

addCardForm.addEventListener("submit", handleaddCardForm);
addCardForm.addEventListener("input", () => enableValidation(validationConfig));

editProfileForm.addEventListener("submit", handleEditProfileForm);
editProfileForm.addEventListener("input", () =>
  enableValidation(validationConfig)
);
