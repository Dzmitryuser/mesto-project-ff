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

export function getAboutUser() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
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
      return result;
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
      throw err;
    });
}

export function getCardsArray() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
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
      return result;
    })
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
      throw err;
    });
}

export function updateUserProfile(newName, newAbout) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me", {
    method: "PATCH",
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error("Ошибка при обновлении профиля:", err);
      throw err;
    });
}

export function updateUserAvatar(newAvatarUrl) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error("Ошибка при обновлении аватара:", err);
      throw err;
    });
}

export function createNewCard(newCardName, newCardLink) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-39/cards", {
    method: "POST",
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error("Ошибка при создании карточки:", err);
      throw err;
    });
}

function deleteCardFromServer(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

function unlikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: "ca811722-b39a-47f2-8683-a15951454f2a",
      "Content-Type": "application/json",
    }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}