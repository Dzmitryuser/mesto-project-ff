import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";
import "../pages/index.css";
import { openAnyPopupFunction, closeAnyPopupFunction } from "./modal.js";
import {
  createCard,
  deleteCard,
  likeButtonFunction,
  openImagePopupFunction,
} from "./card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";

import {
  getAboutUser,
  getCardsArray,
  updateUserProfile,
  createNewCard,
  updateUserAvatar,
} from "./api.js";

const fullPage = document.querySelector(".page");
const placesList = document.querySelector(".places__list");
const profileEditModalWindow = document.querySelector(".popup_type_edit");
const addNewCardModalWindow = document.querySelector(".popup_type_new-card");
const editProfileFormNameField = document.querySelector(
  ".popup__input_type_name"
);

const editProfileFormDescriptionField = document.querySelector(
  ".popup__input_type_description"
);
const editAvatarModalWindow = document.querySelector(
  ".popup_type_change_avatar"
);
const editAvatarFormField = document.querySelector(
  ".popup__input_avatar_change"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

/* Первичный (при загрузке страницы) рендер карточек и данных профиля */
Promise.all([getAboutUser(), getCardsArray()])
  .then(([userData, cards]) => {
    // Обновляем данные пользователя
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatar.style.backgroundImage = `url('${userData.avatar}')`;

    // Очищаем контейнер перед добавлением новых карточек
    placesList.innerHTML = "";

    // Добавляем карточки с учетом ID пользователя
    cards.forEach((card) => {
      placesList.append(
        createCard(
          card.link,
          card.name,
          deleteCard,
          likeButtonFunction,
          openImagePopupFunction,
          card._id,
          userData._id,
          card.likes,
          card.owner._id
        )
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

/* Функция - обработчик событий клик */
fullPage.addEventListener("click", (evt) => {
  /* Открытие окна редактирования профиля */
  if (evt.target.classList.contains("profile__edit-button")) {
    editProfileFormNameField.value = profileTitle.textContent;
    editProfileFormDescriptionField.value = profileDescription.textContent;
    openAnyPopupFunction(profileEditModalWindow);

    /* Открытие окна добавления карточки */
  } else if (evt.target.classList.contains("profile__add-button")) {
    openAnyPopupFunction(addNewCardModalWindow);
  } else if (
    evt.target.classList.contains("profile__image") ||
    evt.target.classList.contains("profile__image-avatar")
  ) {
    openAnyPopupFunction(editAvatarModalWindow);

    /* Закрытие по нажатию на кнопку */
  } else if (evt.target.classList.contains("popup__close")) {
    closeAnyPopupFunction(evt.target.closest(".popup"));
    clearValidation(evt.target.closest(".popup"), validationConfig);
  }
});

/* Объявляем переменные форм */
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const editAvatarForm = document.forms["new-avatar"];

/* Функция присвоения данных профиля из формы */
function handleEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileFormNameField.value;
  profileDescription.textContent = editProfileFormDescriptionField.value;
  updateUserProfile(
    editProfileFormNameField.value,
    editProfileFormDescriptionField.value
  );
  closeAnyPopupFunction(profileEditModalWindow);
}

// |||||||||||   https://i.ibb.co/zWxvKNdb/avatar.jpg   |||||||||||||||
/* Функция изменения аватара */
const handleEditAvatarForm = (evt) => {
  evt.preventDefault();
  updateUserAvatar(editAvatarFormField.value);
  avatar.style.backgroundImage = `url('${editAvatarFormField.value}')`;
  closeAnyPopupFunction(editAvatarModalWindow);
};

/* Функция добавления карточки из данных формы */
function handleaddCardForm(evt) {
  evt.preventDefault();
  const newImageName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const newImageUrl = document.querySelector(".popup__input_type_url").value;
  createNewCard(newImageName, newImageUrl)
    .then((cardData) => {
      const cardElement = createCard(
        cardData.link,
        cardData.name,
        deleteCard,
        likeButtonFunction,
        openImagePopupFunction
      );
      placesList.prepend(cardElement);
      addCardForm.reset();
      closeAnyPopupFunction(addNewCardModalWindow);
    })
    .catch((err) => {
      console.error("Ошибка при создании карточки:", err);
    });
}

addCardForm.addEventListener("submit", handleaddCardForm);
addCardForm.addEventListener("input", () => enableValidation(validationConfig));

editProfileForm.addEventListener("submit", handleEditProfileForm);
editProfileForm.addEventListener("input", () =>
  enableValidation(validationConfig)
);

editAvatarForm.addEventListener("submit", handleEditAvatarForm);
editAvatarForm.addEventListener("input", () =>
  enableValidation(validationConfig)
);
