// Токен: ca811722-b39a-47f2-8683-a15951454f2a
// Идентификатор группы: wff-cohort-39

// Загрузка информации о пользователе с сервера ||| GET https://nomoreparties.co/v1/:cohortId/users/me
// Загрузка карточек с сервера ||| GET https://nomoreparties.co/v1/cohortId/cards
// Редактирование профиля ||| PATCH https://nomoreparties.co/v1/cohortId/users/me
// Добавление новой карточки ||| POST https://nomoreparties.co/v1/cohortId/cards
// Удаление карточки ||| DELETE https://nomoreparties.co/v1/cohortId/cards/cardId 
// DELETE https://nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd
// Постановка и снятие лайка ||| PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
// убрать лайк ||| DELETE https://nomoreparties.co/v1/cohortId/cards/likes/cardId
// Обновление аватара пользователя ||| PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
let userId;

export function getAboutUser() {
  fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      userName.textContent = result.name;
      userAbout.textContent = result.about;
      avatar.style.backgroundImage = `url('${result.avatar}')`;
      userId = result._id;
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
    });
}

export function getCardsArray() {
  fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      const cardsArray = [];
      result.forEach((element) => {
        const returnObj = {};
        returnObj.name = element.name;
        returnObj.link = element.link;
        returnObj.id = element._id;
        returnObj.ownerid = element.owner._id;
        cardsArray.push(returnObj);
      })
      return cardsArray
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
    });
}



