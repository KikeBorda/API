//variables
const cardSection = document.querySelector(".card-section");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const search = document.querySelector("#search");
const statusColor = {
  Alive: "#2C820A",
  Dead: "#C81717",
  unknown: "#343333",
};
let offset = 1;

//events

//search event
search.addEventListener("input", () => {
  const nameSearch = search.value;
  console.log(nameSearch);
  if (nameSearch.length > 0) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${nameSearch}`)
      .then((res) => res.json())
      .then((data) => {
        removeChildNodes(cardSection);
        data.results.map((personaje) => {
          return createCardCharacter(personaje);
        });
      })
      .catch((err) => characterNotFound());
  }
  if (nameSearch == "") {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((res) => res.json())
      .then((data) => {
        removeChildNodes(cardSection);
        data.results.map((personaje) => {
          return createCardCharacter(personaje);
        });
      });
  }
});

//previous page event
previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 1;
    fetch(`https://rickandmortyapi.com/api/character/?page=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        removeChildNodes(cardSection);
        data.results.map((personaje) => {
          return createCardCharacter(personaje);
        });
      });
  }
});
//next page event
next.addEventListener("click", () => {
  offset += 1;
  fetch(`https://rickandmortyapi.com/api/character/?page=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      removeChildNodes(cardSection);
      data.results.map((personaje) => {
        return createCardCharacter(personaje);
      });
    });
});
//functions

//get all characters
function fetchCharacter() {
  fetch(`https://rickandmortyapi.com/api/character`)
    .then((res) => res.json())
    .then((data) =>
      data.results.map((personaje) => {
        return createCardCharacter(personaje);
      })
    );
}
//create card character
function createCardCharacter(character) {
  const card = document.createElement("article");
  card.classList.add("card-block");

  const characterHTML = `
    <div class="img-container">
      <img src="${character.image}">
      <span class="status" style="background:${
        statusColor[character.status]
      };">${character.status}</span>
    </div>
    <p class="name">${character.name}</p>
    <div class="info-character">
        <h3 class="title">Gender:</h3>
        <p class="gender">${character.gender}</p>
        <h3 class="title">Last known location:</h3>
        <p class="location">${character.location.name}</p>
    </div>
  `;
  card.innerHTML = characterHTML;

  cardSection.classList.add("card-section");
  cardSection.appendChild(card);
}

//clean the HTML
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const characterNotFound = () => {
  removeChildNodes(cardSection);
  const characterHTML = `
    <article class="msg-not-found">
     <h2>Character Not Found</h2>
    </article>
  `;
  cardSection.classList.remove("card-section");
  cardSection.innerHTML = characterHTML;
};

//START
fetchCharacter();
