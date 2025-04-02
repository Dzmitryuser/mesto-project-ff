/* Определяем переменные */
const cardTemplate = document.querySelector("#card-template").content;
const placesItem = cardTemplate.querySelector(".places__item");
const placesList = document.querySelector(".places__list");

/* Функция добавления карточек */
function addCard(photoLink, cardName) {

  /* Клонируем карточку */
  const placeClonedCard = cardTemplate.cloneNode(true);

  /* Наполняем элементы клонированной карточки*/
  placeClonedCard.querySelector(".card__image").src = photoLink;
  placeClonedCard.querySelector(".card__image").alt = cardName;
  placeClonedCard.querySelector(".card__title").textContent = cardName;

  /* Вызов функции удаления карточек со слушателем кнопки удаления */
  const deleteButton = placeClonedCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  /* Элемент функции добавления карточки, производящий непосредственное добавление*/
  placesList.append(placeClonedCard);
}

/* первичный (при загрузке страницы) рендер карточек */
for (i = 0; i <= initialCards.length - 1; i++) {
  addCard(initialCards[i].link, initialCards[i].name);
}

/* Функция удаления карточки  от элемента на котором произошло событие*/
function deleteCard(event) {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
}
