import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";
import { openAnyPopupFunction } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

export const initialCards = [
  {
    name: "Арктика",
    link: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Мексика",
    link: "https://images.unsplash.com/photo-1521216774850-01bc1c5fe0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Европа",
    link: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Азия",
    link: "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Африка",
    link: "https://images.unsplash.com/photo-1507461476191-0ed4f9f18533?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Антарктика",
    link: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];


/* Функционал лайка карточки */
export function likeButtonFunction(event) {
  const button = event.currentTarget;
  if (button.classList.contains("card__like-button_is-active")) {
    button.classList.remove("card__like-button_is-active");
    button.src = unlikedButton;
  } else {
    button.classList.add("card__like-button_is-active");
    button.src = likedButton;
  }
}

/* Функционал попап с изображением */
export function openImagePopupFunction(event) {
  popupImage.src = event.target.src;
  popupImageCaption.textContent = event.target.alt;
  openAnyPopupFunction(popupImageHolder);
}

/* Функция удаления карточки*/
export function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
}

/* Функция добавления карточек */
export const createCard = (
  photoLink,
  cardName,
  deleteCardHandler,
  likeButtonHandler,
  openImagePopupFunction
) => {
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

  /* Вызов функции лайка карточек */
  const likeButton = placeClonedCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeButtonHandler);

  /* Инициализируем состояние карточки */
  likeButton.src = unlikedButton;

  /* Вызов функции открытия попапа с изображением */
  const cardsImage = placeClonedCard.querySelector(".card__image");
  cardsImage.addEventListener("click", openImagePopupFunction);

  return placeClonedCard;
};
