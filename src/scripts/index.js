import '../pages/index.css';
import {initialCards} from './cards.js';
import likedButton from '../images/like-active.svg';
import unlikedButton from '../images/like-inactive.svg';

/* Объявляем переменные */
const fullPage = document.querySelector(".page");
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const editProfileDataButton = document.querySelector(".profile__edit-button");
const profileEditModalWindow = document.querySelector(".popup_type_edit");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModalWindow = document.querySelector(".popup_type_new-card");
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const editProfileFormNameFild = document.querySelector(
  ".popup__input_type_name"
);
const editProfileFormDescriptionFild = document.querySelector(
  ".popup__input_type_description"
);
const likeButton = document.querySelector(".card__like-button");
const allPopups = document.querySelector(".popup");

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

/* Открытие окна редактирования профиля*/
const editProfileOpen = () => {
  editProfileFormNameFild.value =
    document.querySelector(".profile__title").textContent;
  editProfileFormDescriptionFild.value = document.querySelector(
    ".profile__description"
  ).textContent;
  profileEditModalWindow.classList.add('popup_is-animated');
  profileEditModalWindow.classList.add('popup_is-opened');
};

/* Открытие окна добавления карточки */
const addCardOpen = () => {
  addNewCardModalWindow.classList.add('popup_is-animated');
  addNewCardModalWindow.classList.add('popup_is-opened');
};

/* Открытие окна с картинкой и описанием */
const popupPhotoOpen = (tergetElement) => {
  popupImageHolder.classList.add('popup_is-animated');
  popupImageHolder.classList.add('popup_is-opened');
  popupImage.src = tergetElement.src;
  popupImageCaption.textContent = tergetElement.alt;
};

/* Закрытие модальных окон по кнопке*/
const allPopupWindowsCloseByButton = (targetElement) => {
  targetElement.closest(".popup").classList.remove('popup_is-animated');
  targetElement.closest(".popup").classList.remove('popup_is-opened');
};

/* Закрытие модальных окон по клику на оверлей */
const closeAllPopupsOnOverlayClick = (popupOverlay) => {
  popupOverlay.classList.remove('popup_is-animated');
  popupOverlay.classList.remove('popup_is-opened');

};

/* Закрытие модальных окон по нажатию на "Esc" */
const closeAllPopups = () => {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.remove('popup_is-animated');
    popup.classList.remove('popup_is-opened');
  });
};

/* Функционал лайка карточки */
const likeButtonFunction = (eventButton) => {
  const currentBg = getComputedStyle(eventButton).backgroundImage;

  if (currentBg.includes("like-inactive")) {
    eventButton.style.background =
      `transparent url("${likedButton}") no-repeat`;
  } else {
    eventButton.style.background =
      `transparent url("${unlikedButton}") no-repeat`;
  }
};

/* Функция - обработчик событий клик */
fullPage.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("profile__edit-button")) {
    editProfileOpen();
  } else if (evt.target.classList.contains("profile__add-button")) {
    addCardOpen();
  } else if (evt.target.classList.contains("card__image")) {
    popupPhotoOpen(evt.target);
  } else if (evt.target.classList.contains("popup__close")) {
    allPopupWindowsCloseByButton(evt.target);
  } else if (evt.target.classList.contains("popup")) {
    closeAllPopupsOnOverlayClick(evt.target);
  } else if (evt.target.classList.contains("card__like-button")) {
    likeButtonFunction(evt.target);
  }
});

/* Функция - обработчик событий нажатия на "Esc" */
fullPage.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeAllPopups();
  }
});

/* Объявляем переменные форм */
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];

/* Функция присвоения данных профиля из формы */
function handleeditProfileForm(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent =
    editProfileFormNameFild.value;
  document.querySelector(".profile__description").textContent =
    editProfileFormDescriptionFild.value;
  editProfileForm.reset();
  closeAllPopups();
}

/* Обработчик к форме редактирования профиля по “submit” */
editProfileForm.addEventListener("submit", handleeditProfileForm);

/* Функция добавления карточки из данных формы */
function handleaddCardForm(evt) {
  evt.preventDefault();
  const newImageName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newImageUrl = document.querySelector(".popup__input_type_url").value;
  placesList.prepend(createCard(newImageUrl, newImageName, deleteCard));
  addCardForm.reset();
  closeAllPopups();
}

/* Обработчик к форме добавления карточки по “submit” */
addCardForm.addEventListener("submit", handleaddCardForm);
