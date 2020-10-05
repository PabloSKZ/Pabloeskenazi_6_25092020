import data from "../data/data.js";

const DOMphotographers = document.getElementById("photographers");
DOMphotographers.innerHTML = "";

let HTMLphotograpers = "";

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

  HTMLphotograpers += `
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
  console.log(data.photographers[i].name);
}

DOMphotographers.innerHTML = HTMLphotograpers;
