import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";
import "../pages/index.css";
import { openAnyPopupFunction, closeAnyPopupFunction } from "./modal.js";
import { createCard, deleteCard, likeButtonFunction } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";

import {
  getAboutUser,
  getCardsArray,
  updateUserProfile,
  createNewCard,
  updateUserAvatar,
} from "./api.js";

// Объявляем переменные форм
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const editAvatarForm = document.forms["new-avatar"];

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
const avatar = document.querySelector(".profile__image-avatar");
const avatarWraper = document.querySelector(".profile__image");
const profileButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const buttonStates = {
  default: "Сохранить",
  changed: "Сохранение...",
};
let userId = null;
const newImageName = addCardForm.querySelector(".popup__input_type_card-name");
const newImageurl = addCardForm.querySelector(".popup__input_type_url");
const popupImageHolder = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// Первичный (при загрузке страницы) рендер карточек и данных профиля
enableValidation(validationConfig);

function initialCardRender() {
  Promise.all([getAboutUser(), getCardsArray()])
    .then(([userData, cards]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      avatar.style.backgroundImage = `url('${userData.avatar}')`;
      placesList.innerHTML = "";
      userId = userData._id;

      cards.forEach((card) => {
        placesList.append(
          createCard(
            card.link,
            card.name,
            deleteCard,
            likeButtonFunction,
            openImagePopupFunction,
            card._id,
            userId,
            card.likes,
            card.owner._id
          )
        );
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });
}
initialCardRender();

// Обработчики событий клик
profileEditButton.addEventListener("click", () => {
  editProfileFormNameField.value = profileTitle.textContent;
  editProfileFormDescriptionField.value = profileDescription.textContent;
  openAnyPopupFunction(profileEditModalWindow);
});

//Открытие окна добавления карточки
profileButton.addEventListener("click", () => {
  openAnyPopupFunction(addNewCardModalWindow);
});

// Функционал попап с изображением
export function openImagePopupFunction(event) {
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openAnyPopupFunction(popupImageHolder);
}

avatarWraper.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("profile__image") ||
    evt.target.classList.contains("profile__image-avatar")
  ) {
    openAnyPopupFunction(editAvatarModalWindow);
  }
});

// Закрытие по нажатию на кнопку закрытия
closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popupToClose = evt.target.closest(".popup");
    if (!popupToClose) return;
    closeAnyPopupFunction(popupToClose, clearValidation, validationConfig);
  });
});

// Функция присвоения данных профиля из формы
function handleEditProfileForm(evt) {
  evt.preventDefault();
  makeButtonChanged(evt);

  updateUserProfile(
    editProfileFormNameField.value.trim(),
    editProfileFormDescriptionField.value.trim()
  )
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .then((data) => {
      closeAnyPopupFunction(
        profileEditModalWindow,
        clearValidation,
        validationConfig
      );
    })
    .catch((err) => {
      console.error("Ошибка при изменении данных:", err);
    })
    .finally(() => {
      makeButtonDefault(profileEditModalWindow);
    });
}

// Функция изменения аватара
//https://i.ibb.co/zWxvKNdb/avatar.jpg
const handleEditAvatarForm = (evt) => {
  evt.preventDefault();

  makeButtonChanged(evt);
  updateUserAvatar(editAvatarFormField.value.trim())
    .then((res) => {
      avatar.style.backgroundImage = `url('${res.avatar}')`;
    })
    .then((res) => {
      closeAnyPopupFunction(
        editAvatarModalWindow,
        clearValidation,
        validationConfig
      );
    })
    .catch((err) => {
      console.error("Ошибка при изменении аватара профиля:", err);
    })
    .finally(() => {
      makeButtonDefault(editAvatarModalWindow);
    });
};

// Функция добавления карточки из данных формы
function handleaddCardForm(evt) {
  evt.preventDefault();
  makeButtonChanged(evt);

  createNewCard(newImageName.value.trim(), newImageurl.value.trim())
    .then((cardData) => {
      const cardElement = createCard(
        cardData.link,
        cardData.name,
        deleteCard,
        likeButtonFunction,
        openImagePopupFunction,
        cardData._id,
        userId,
        cardData.likes,
        cardData.owner._id
      );
      placesList.prepend(cardElement);
      addCardForm.reset();
      closeAnyPopupFunction(
        addNewCardModalWindow,
        clearValidation,
        validationConfig
      );
    })
    .catch((err) => {
      console.error("Ошибка при создании карточки:", err);
    })
    .finally(() => {
      makeButtonDefault(addNewCardModalWindow);
    });
}

addCardForm.addEventListener("submit", handleaddCardForm);

editProfileForm.addEventListener("submit", handleEditProfileForm);

editAvatarForm.addEventListener("submit", handleEditAvatarForm);

// изменение сщстояния кнопки сохранения
function makeButtonChanged(form) {
  const button = form.target.querySelector(".button");
  if (button.textContent.trim() == buttonStates.default) {
    button.textContent = buttonStates.changed;
  }
}

function makeButtonDefault(form) {
  setTimeout(() => {
    if (form) {
      const button = form
        .querySelector(".popup__form")
        .querySelector(".button");
      if (button && button.textContent.trim() == buttonStates.changed) {
        button.textContent = buttonStates.default;
      } else {
        return;
      }
    }
  }, 350);
}
