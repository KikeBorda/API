const cardSection = document.querySelector(".card-section");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const statusColor = {
  Alive: "#2C820A",
  Dead: "#C81717",
  unknown: "#343333",
};

let limit = 9;
let offset = 1;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 9;
    removeChildNodes(cardSection);
    fetchCharacters(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 9;
  removeChildNodes(cardSection);
  fetchCharacters(offset, limit);
});

function fetchCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((data) => createCardCharacter(data));
}

function fetchCharacters(offset, limit) {
  for (let i = offset; i < offset + limit; i++) {
    fetchCharacter(i);
  }
}

function createCardCharacter(character) {
  const setStatusColor = (status) => {
    const color = statusColor[status];
    statusCard.style.background = `${color}`;
  };
  const card = document.createElement("article");
  card.classList.add("card-block");

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("img-container");

  const sprite = document.createElement("img");
  sprite.src = character.image;

  const statusCard = document.createElement("span");
  statusCard.classList.add("status");
  statusCard.textContent = `${character.status}`;
  setStatusColor(character.status);

  spriteContainer.appendChild(sprite);
  spriteContainer.appendChild(statusCard);

  const infoCharacter = document.createElement("div");
  infoCharacter.classList.add("info-character");

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = character.name;

  const genderTitle = document.createElement("h3");
  genderTitle.classList.add("title");
  genderTitle.textContent = `Gender:`;

  const gender = document.createElement("p");
  gender.classList.add("gender");
  gender.textContent = character.gender;

  const locationTitle = document.createElement("h3");
  locationTitle.classList.add("title");
  locationTitle.textContent = `Last known location:`;

  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = character.location.name;

  infoCharacter.appendChild(genderTitle);
  infoCharacter.appendChild(gender);
  infoCharacter.appendChild(locationTitle);
  infoCharacter.appendChild(location);

  card.appendChild(spriteContainer);
  card.appendChild(name);
  card.appendChild(infoCharacter);

  cardSection.appendChild(card);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchCharacters(offset, limit);
