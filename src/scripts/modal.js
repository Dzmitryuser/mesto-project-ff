/* Функция открытия любого окна */
export const anyPopupOpenFunction = (popupToOpen) => {
  popupToOpen.classList.add("popup_is-opened");
};

/* Функция закрытия любого окна */
export const anyPopupCloseFunction = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
};
