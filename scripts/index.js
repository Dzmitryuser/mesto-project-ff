/* Определяем переменные */
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
const placesList = document.querySelector(".places__list");

/* Функция добавления карточек */
function createCard(photoLink, cardName, deleteCardHandler) {
  /* Клонируем карточку */
  const placeClonedCard = cardTemplate.cloneNode(true);

  /* Наполняем элементы клонированной карточки*/
  const imageTitle = placeClonedCard.querySelector(".card__title");
  const carrdImage = placeClonedCard.querySelector(".card__image");
  carrdImage.src = photoLink;
  carrdImage.alt = cardName;
  imageTitle.textContent = cardName;

  /* Вызов функции удаления карточек со слушателем кнопки удаления */
  const deleteButton = placeClonedCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardHandler);
  return placeClonedCard;
}

/* первичный (при загрузке страницы) рендер карточек */
initialCards.forEach((element) => {
  placesList.append(createCard(element.link, element.name, deleteCard));
});

/* Функция удаления карточки  от элемента на котором произошло событие*/
function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
}
