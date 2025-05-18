//Функция открытия любого окна
export const openAnyPopupFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
};

//Функция закрытия любого окна
export const closeAnyPopupFunction = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
  document.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKey);
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


