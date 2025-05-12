import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";
import "../pages/index.css";
import {
  initialCards
} from "./cards.js";
import {
  openAnyPopupFunction,
  closeAnyPopupFunction,
} from "./modal.js";
import {
  createCard,
  deleteCard,
  likeButtonFunction,
  openImagePopupFunction,
} from "./card.js";
import {
  enableValidation,
  clearValidation
} from "./validation.js";
/* Объявляем переменные */
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

/* Первичный (при загрузке страницы) рендер карточек */
initialCards.forEach((element) => {
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
  closeAnyPopupFunction(profileEditModalWindow);
}

/* Функция добавления карточки из данных формы */
function handleaddCardForm(evt) {
  evt.preventDefault();
  const newImageName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newImageUrl = document.querySelector(".popup__input_type_url").value;
  placesList.prepend(
    createCard(
      newImageUrl,
      newImageName,
      deleteCard,
      likeButtonFunction,
      openImagePopupFunction
    )
  );
  addCardForm.reset();
  closeAnyPopupFunction(addNewCardModalWindow);
}

/* Обработчик к форме добавления карточки по “submit” */
addCardForm.addEventListener("submit", handleaddCardForm, enableValidation);

/* Обработчик к форме редактирования профиля по “submit” */
editProfileForm.addEventListener("submit", handleEditProfileForm, enableValidation);
