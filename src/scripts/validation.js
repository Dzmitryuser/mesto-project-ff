const regex = /^[A-Za-zА-Яа-яёЁ\- ]+$/;

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.error,
      config
    );
  } else if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList, config) => {
  return inputList.some((inputElement) => {
    if (inputElement.type === "url") {
      return !inputElement.validity.valid;
    }
    return !regex.test(inputElement.value) || !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (!buttonElement) return;
  const invalid = hasInvalidInput(inputList, config);
  buttonElement.disabled = invalid;
  buttonElement.classList.toggle(config.inactiveButtonClass, invalid);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  if (!formElement) return;
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  if (!inputList || !buttonElement) return;

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
};
