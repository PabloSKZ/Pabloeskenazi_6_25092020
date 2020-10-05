import data from "../data/data.js";

function renderIndex(selectedTag = "") {
  DOMphotographers.innerHTML = "";
  let photographersHTML = "";

  console.log(selectedTag);
  for (let i in data.photographers) {
    let tags = data.photographers[i].tags;
    let tagsHTML = "";

    for (let j in tags) {
      tagsHTML += `
      <a href="#" class="tag">
          #${tags[j].charAt(0).toUpperCase() + tags[j].slice(1)}
      </a>
      `;
    }

    if (tags.includes(selectedTag) || selectedTag == "") {
      photographersHTML += `
      <div class="card">
        <img
          src="assets/Photographers_ID_Photos/${data.photographers[i].portrait}"
          alt="Fisheye Home page"
          class="pp"
        />
        <h2 class="name">${data.photographers[i].name}</h2>
        <p class="location">${data.photographers[i].city}, ${data.photographers[i].country}</p>
        <p class="copy-line">${data.photographers[i].tagline}</p>
        <p class="price">${data.photographers[i].price}€/jour</p>
        <div class="tags" id="tags">
          ${tagsHTML}
        </div>
      </div>
      `;
    }
  }
  DOMphotographers.innerHTML = photographersHTML;
}

const DOMphotographers = document.getElementById("photographers");
const DOMportrait = document.getElementById("portrait");
const DOMart = document.getElementById("art");
const DOMfashion = document.getElementById("fashion");
const DOMarchitecture = document.getElementById("architecture");
const DOMtravel = document.getElementById("travel");
const DOMsport = document.getElementById("sport");
const DOManimals = document.getElementById("animals");
const DOMevents = document.getElementById("events");

const filterTags = [
  DOMportrait,
  DOMart,
  DOMfashion,
  DOMarchitecture,
  DOMtravel,
  DOMsport,
  DOManimals,
  DOMevents,
];

let selectedTag = "";

for (let i in filterTags) {
  filterTags[i].addEventListener("click", (e) => {
    renderIndex(filterTags[i].id);
  });
}

renderIndex();
