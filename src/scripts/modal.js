/* Функция открытия любого окна */
export const openAnyPopupFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
};

/* Функция закрытия любого окна */
export const closeAnyPopupFunction = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
};
