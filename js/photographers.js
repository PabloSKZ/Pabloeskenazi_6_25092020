import data from "../data/data.js";

const id = document.getElementsByTagName("body")[0].getAttribute("data-id");
const photographer = data.photographers.find((x) => x.id == id);
const pictures = data.media.filter((x) => x.photographerId == id);

let tagsHTML = "";
let galleryHTML = "";
let pictureName = "";

for (let i in photographer.tags) {
  tagsHTML += `<a href="#" class="tag">#${photographer.tags[i]}</a>`;
}

for (let j in pictures) {
  if (pictures[j].image != undefined) {
    pictureName = splitFileName(pictures[j].image);
    galleryHTML += `
    <div class="pic">
    <img
      src="../assets/${photographer.name.split(" ")[0]}/${pictures[j].image}"
      alt="Portrait AfternoonBreak"
      class="pic__img"
    />
    <div class="pic__text">
      <p class="pic__title">${pictureName}</p>
      <p class="pic__price">${pictures[j].price} €</p>
      <p class="pic__likes">${
        pictures[j].likes
      } <i class="fas fa-heart"></i></p>
    </div>
  </div>
    `;
  }
}

/* DOM Variables */
const $name = document.getElementById("name");
const $location = document.getElementById("location");
const $copyline = document.getElementById("copyline");
const $tags = document.getElementById("tags");
const $pp = document.getElementById("pp");
const $gallery = document.getElementById("gallery");

$name.innerHTML = photographer.name;
$location.innerHTML = `${photographer.city}, ${photographer.country}`;
$copyline.innerHTML = photographer.tagline;
$tags.innerHTML = tagsHTML;
$pp.setAttribute(
  "src",
  `../assets/Photographers_ID_Photos/${photographer.portrait}`
);
$gallery.innerHTML = galleryHTML;

function splitFileName(pictureName) {
  pictureName = pictureName.split("_");
  console.log(pictureName);
  pictureName.shift();
  console.log(pictureName);
  pictureName = pictureName.join(" ");
  console.log(pictureName);
  pictureName = pictureName.toString().split(".");
  console.log(pictureName);
  pictureName.pop();
  console.log(pictureName);
  return pictureName.join(" ").toString();
}
