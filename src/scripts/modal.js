import { clearValidation } from "./validation.js";

import { validationConfig } from "./index.js";

//Функция открытия любого окна
export const openAnyPopupFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
};

//Функция закрытия любого окна
export const closeAnyPopupFunction = (
  popupToClose,
  clearValidation,
  validationConfig
) => {
  popupToClose.classList.remove("popup_is-opened");
  document.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKey);
  const form = popupToClose.querySelector(".popup__form");
  form?.reset();
  if (form) {
    clearValidation(form, validationConfig);
  }
};

// Обработчик нажатия Esc
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeAnyPopupFunction(openedPopup, clearValidation, validationConfig);
    }
  }
}

// Обработчик клика по оверлею
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeAnyPopupFunction(evt.target, clearValidation, validationConfig);
  }
}
