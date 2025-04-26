import "../pages/index.css";
import { initialCards } from "./cards.js";
import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";

/* Объявляем переменные */
const fullPage = document.querySelector(".page");
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditModalWindow = document.querySelector(".popup_type_edit");
const addNewCardModalWindow = document.querySelector(".popup_type_new-card");
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const editProfileFormNameField = document.querySelector(
  ".popup__input_type_name"
);
editProfileFormNameField;
const editProfileFormDescriptionField = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const prifileDescription = document.querySelector(".profile__description");

/* Функция добавления карточек */
const createCard = (photoLink, cardName, deleteCardHandler) => {
  /* Клонируем карточку */
  const placeClonedCard = cardTemplate.cloneNode(true);

  /* Наполняем элементы клонированной карточки*/
  const imageTitle = placeClonedCard.querySelector(".card__title");
  const cardImage = placeClonedCard.querySelector(".card__image");
  cardImage.src = photoLink;
  cardImage.alt = cardName;
  imageTitle.textContent = cardName;

  /* Вызов функции удаления карточек со слушателем кнопки удаления */
  const deleteButton = placeClonedCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardHandler);
  return placeClonedCard;
};

/* Первичный (при загрузке страницы) рендер карточек */
initialCards.forEach((element) => {
  placesList.append(createCard(element.link, element.name, deleteCard));
});

/* Функция удаления карточки*/
function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
}

/* Функционал лайка карточки */
const likeButtonFunction = (eventButton) => {
  const currentBg = getComputedStyle(eventButton).backgroundImage;

  if (currentBg.includes("like-inactive")) {
    eventButton.style.background = `transparent url("${likedButton}") no-repeat`;
  } else {
    eventButton.style.background = `transparent url("${unlikedButton}") no-repeat`;
  }
};

/* Функция открытия любого окна */
const anyPopupOpenFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
};

/* Функция закрытия любого окна */
const anyPopupCloseFunction = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
};

/* Функция - обработчик событий клик */
fullPage.addEventListener("click", (evt) => {
  /* Открытие окна редактирования профиля */
  if (evt.target.classList.contains("profile__edit-button")) {
    editProfileFormNameField.value = profileTitle.textContent;
    editProfileFormDescriptionField.value = prifileDescription.textContent;
    anyPopupOpenFunction(profileEditModalWindow);

    /* Открытие окна добавления карточки */
  } else if (evt.target.classList.contains("profile__add-button")) {
    anyPopupOpenFunction(addNewCardModalWindow);

    /* Открытие окна с изображением */
  } else if (evt.target.classList.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
    anyPopupOpenFunction(popupImageHolder);

    /* Закрытие по нажатию на кнопку */
  } else if (evt.target.classList.contains("popup__close")) {
    anyPopupCloseFunction(evt.target.closest(".popup"));

    /* Закрытие по нажатию на оверлей */
  } else if (evt.target.classList.contains("popup")) {
    anyPopupCloseFunction(evt.target);

    /* Слушатель нажатия на кнопку лайка */
  } else if (evt.target.classList.contains("card__like-button")) {
    likeButtonFunction(evt.target);
  }
});

/* Функция - обработчик событий нажатия на "Esc" */
fullPage.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup").forEach((popup) => {
      anyPopupCloseFunction(popup);
    });
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
  editProfileForm.reset();
  anyPopupCloseFunction(evt.target.closest(".popup"));
}

/* Функция добавления карточки из данных формы */
function handleaddCardForm(evt) {
  evt.preventDefault();
  const newImageName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newImageUrl = document.querySelector(".popup__input_type_url").value;
  placesList.prepend(createCard(newImageUrl, newImageName, deleteCard));
  addCardForm.reset();
  anyPopupCloseFunction(evt.target.closest(".popup"));
}

/* Обработчик к форме добавления карточки по “submit” */
addCardForm.addEventListener("submit", handleaddCardForm);

/* Обработчик к форме редактирования профиля по “submit” */
editProfileForm.addEventListener("submit", handleEditProfileForm);
