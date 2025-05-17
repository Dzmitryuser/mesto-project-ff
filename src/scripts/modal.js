import {
  clearValidation,
  validationConfig,
} from "./validation.js";

const buttonStates = {
  default: "Сохранить",
  changed: "Сохранение...",
};

//Функция открытия любого окна
export const openAnyPopupFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
  const openedPopupForm = popupToOpen.querySelector(".popup__form");
  makeButtonDefault(openedPopupForm);
};

//Функция закрытия любого окна
export const closeAnyPopupFunction = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
  document.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKey);
  clearValidation(popupToClose, validationConfig);

  const form = popupToClose.querySelector(".popup__form");
  if (form) {
    form.reset();
  }
};

// Обработчик нажатия Esc
export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeAnyPopupFunction(openedPopup);
    }
  }
}

// Обработчик клика по оверлею
export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeAnyPopupFunction(evt.target);
  }
}

export function makeButtonChanged(form) {
  const button = form.target.querySelector(".button");
  if (button.textContent.trim() == buttonStates.default) {
    button.textContent = buttonStates.changed;
  }
}

export function makeButtonDefault(form) {
  if (form) {
    const button = form.querySelector(".button");
    if (button && button.textContent.trim() == buttonStates.changed) {
      button.textContent = buttonStates.default;
    } else {
      return;
    }
  }
}
