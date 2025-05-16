const token = "ca811722-b39a-47f2-8683-a15951454f2a";
const serverAddress = "https://nomoreparties.co/v1/wff-cohort-39/";

export function getAboutUser() {
  return fetch(`${serverAddress}users/me`, {
    headers: {
      authorization: token,
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
  return fetch(`${serverAddress}cards`, {
    headers: {
      authorization: token,
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
  return fetch(`${serverAddress}users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
      throw err;
    });
}

export function updateUserAvatar(newAvatarUrl) {
  return fetch(`${serverAddress}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
      throw err;
    });
}

export function createNewCard(newCardName, newCardLink) {
  return fetch(`${serverAddress}cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Ошибка при создании карточки:", err);
      throw err;
    });
}

export function deleteCardFromServer(cardId) {
  return fetch(`${serverAddress}cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
      throw err;
    });
}

export function likeCard(cardId) {
  return fetch(`${serverAddress}cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Извините, что-то пошло не так, попробуйте еще раз", err);
      throw err;
    });
}

export function unlikeCard(cardId) {
  return fetch(`${serverAddress}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Извините, что-то пошло не так, попробуйте еще раз", err);
      throw err;
    });
}
