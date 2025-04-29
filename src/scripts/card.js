import { openAnyPopupFunction } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

/* Функционал лайка карточки */
export function likeButtonFunction(event) {
    const button = event.currentTarget;
  button.classList.toggle("card__like-button_is-active");
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
  
    /* Вызов функции открытия попапа с изображением */
    const cardsImage = placeClonedCard.querySelector(".card__image");
    cardsImage.addEventListener("click", openImagePopupFunction);
  
    return placeClonedCard;
  };
  