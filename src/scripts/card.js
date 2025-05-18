import { likeCard, unlikeCard, deleteCardFromServer } from "./api.js";

import { openAnyPopupFunction } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

/* Функционал лайка карточки */
export function likeButtonFunction(event) {
  const button = event.currentTarget;
  const likesCounter = button
    .closest(".like_wraper")
    .querySelector(".card_likes_counter");

  if (button.classList.contains("card__like-button_is-active")) {
    unlikeCard(likesCounter.id).then((returnArray) => {
      likesCounter.textContent = `${returnArray.likes.length}`;
      button.classList.remove("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Извините, что-то пошло не так, попробуйте еще раз", err);
    });
  } else {
    likeCard(likesCounter.id).then((returnArray) => {
      likesCounter.textContent = `${returnArray.likes.length}`;
      button.classList.add("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Извините, что-то пошло не так, попробуйте еще раз", err);
    });
  }
}

/* Функционал попап с изображением */
export function openImagePopupFunction(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt
  popupImageCaption.textContent = event.target.alt;
  openAnyPopupFunction(popupImageHolder);
}

/* Функция удаления карточки*/
export function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");

  deleteCardFromServer(cardToDelete.id)
    .then(() => {
      cardToDelete.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
      alert("Не удалось удалить карточку. Попробуйте ещё раз позднее.");
    });
}

/* Функция добавления карточек */
export const createCard = (
  photoLink,
  cardName,
  deleteCardHandler,
  likeButtonHandler,
  openImagePopupFunction,
  cardId,
  userId,
  likesArray,
  ownerId
) => {
  if (!photoLink || !cardName) {
    console.error("Отсутствуют обязательные параметры карточки");
    return null;
  }
  /* Клонируем карточку */
  const placeClonedCard = cardTemplate.cloneNode(true);

  /* Наполняем элементы клонированной карточки*/
  const wholeCard = placeClonedCard.querySelector(".places__item");
  const imageTitle = placeClonedCard.querySelector(".card__title");
  const cardImage = placeClonedCard.querySelector(".card__image");
  const likesCounter = placeClonedCard.querySelector(".card_likes_counter");
  const deleteButton = placeClonedCard.querySelector(".card__delete-button");
  const likeButton = placeClonedCard.querySelector(".card__like-button");

  if (
    !imageTitle ||
    !cardImage ||
    !deleteButton ||
    !likeButton ||
    !likesCounter
  ) {
    console.error("Не найдены необходимые элементы карточки");
    return null;
  }

  cardImage.src = photoLink;
  cardImage.alt = cardName;
  imageTitle.textContent = cardName;
  likesCounter.textContent = likesArray.length;
  likesCounter.id = cardId;
  wholeCard.id = cardId;

  if (likesArray.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Вызов функции удаления карточек со слушателем кнопки удаления */
  deleteButton.addEventListener("click", deleteCardHandler);

  // Вызов функции лайка карточек */
  likeButton.addEventListener("click", likeButtonHandler);

  // Вызов функции открытия попапа с изображением
  const cardsImage = placeClonedCard.querySelector(".card__image");
  cardsImage.addEventListener("click", openImagePopupFunction);

  // Проверяем владельца карточки (если передан userId)
  if (userId && ownerId && userId !== ownerId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  return placeClonedCard;
};
