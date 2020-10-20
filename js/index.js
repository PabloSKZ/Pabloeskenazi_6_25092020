import data from "../data/data.js";

function renderIndex(selectedTag = "") {
  /* Initialize HTML */
  DOMphotographers.innerHTML = "";
  let photographersHTML = "";

  /* Render HTML tags */
  for (let i in data.photographers) {
    let tags = data.photographers[i].tags;
    let tagsHTML = "";

    for (let j in tags) {
      tagsHTML += `
      <a href="#" class="tag">
          #${tags[j]}
      </a>
      `;
    }

    /* Filtred Rendering */
    if (tags.includes(selectedTag) || selectedTag == "") {
      photographersHTML += ` 
      <div class="card">
        <a href="photographers/${data.photographers[i].id}" class="photographer-link">
          <img
            src="assets/Photographers_ID_Photos/${data.photographers[i].portrait}"
            alt="Fisheye Home page"
            class="pp"
          />
          <h2 class="name">${data.photographers[i].name}</h2>
        </a>
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

  /* Add click event on all tags */
  for (let k in DOMtags) {
    if (DOMtags[k] instanceof Element) {
      DOMtags[k].addEventListener("click", (e) => {
        renderIndex(
          DOMtags[k].innerHTML.replace(/\s/g, "").replace(/#/, "").toLowerCase()
        );
      });
    }
  }
}

const DOMphotographers = document.getElementById("photographers");
const DOMtags = document.getElementsByClassName("tag");

renderIndex();
