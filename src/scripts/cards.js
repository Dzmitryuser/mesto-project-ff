import likedButton from "../images/like-active.svg";
import unlikedButton from "../images/like-inactive.svg";

export const initialCards = [
  {
    name: "Арктика",
    link: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Мексика",
    link: "https://images.unsplash.com/photo-1521216774850-01bc1c5fe0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Европа",
    link: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Азия",
    link: "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Африка",
    link: "https://images.unsplash.com/photo-1507461476191-0ed4f9f18533?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Антарктика",
    link: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* Функционал лайка карточки */
export const likeButtonFunction = (eventButton) => {
  const currentBg = getComputedStyle(eventButton).backgroundImage;

  if (currentBg.includes("like-inactive")) {
    eventButton.style.background = `transparent url("${likedButton}") no-repeat`;
  } else {
    eventButton.style.background = `transparent url("${unlikedButton}") no-repeat`;
  }
};
