const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditCloseButton = document.querySelector("#edit-modal-container");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#profile__add-close-button");
const profileEditForm = editProfileModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const pictureModal = document.getElementById('picture-modal');
const pictureModalClose = document.getElementById('picture-modal-close');
const modalImage = pictureModal.querySelector('.modal__image');

function openModal(modal) {
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('modal_opened');
  });
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function openPictureModal(imageSrc) {
  modalImage.src = imageSrc;
  openModal(pictureModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener('click', () => openPictureModal(cardImageEl.src));

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editProfileModal);
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(editProfileModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

addCardForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const cardName = document.querySelector("#profile-title-input").value;
  const cardLink = document.querySelector("#profile-description-input").value;
  const cardData = { name: cardName, link: cardLink };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  document.querySelector("#profile-title-input").value = '';
  document.querySelector("#profile-description-input").value = '';
  closePopup(addCardModal);
});

addCardModal.addEventListener("click", function(e) {
  e.stopPropagation();
});


initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

pictureModalClose.addEventListener('click', () => {
  closePopup(pictureModal);
});