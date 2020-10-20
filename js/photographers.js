import data from "../data/data.js";

/* DOM Variables */
const $name = document.getElementById("name");
const $location = document.getElementById("location");
const $copyline = document.getElementById("copyline");
const $tags = document.getElementById("tags");
const $pp = document.getElementById("pp");
const $gallery = document.getElementById("gallery");

const $dropdownButton = document.getElementById("dropdown-button");
const $dropdownSelected = document.getElementById("dropdown-selected");
const $dropdownList = document.getElementById("dropdown-list");
const $dropdownArrow = document.getElementById("dropdown-arrow");
const $dropdownPopularity = document.getElementById("dropdown-list-popularity");
const $dropdownDate = document.getElementById("dropdown-list-date");
const $dropdownTitle = document.getElementById("dropdown-list-title");

const id = document.getElementsByTagName("body")[0].getAttribute("data-id");
const photographer = data.photographers.find((x) => x.id == id);
const pictures = data.media.filter((x) => x.photographerId == id);

let tagsHTML = "";
let galleryHTML = "";
let pictureName = "";

let sortValue = "popularity";
let picturesSorted = sortPictures(pictures, sortValue);

/* Event Listeners */
$dropdownButton.addEventListener("click", (e) => {
  toggleDropdown();
  renderPictures(picturesSorted);
});

$dropdownPopularity.addEventListener("click", (e) => {
  sortValue = "popularity";
  $dropdownSelected.innerHTML = "Popularité";
  toggleDropdown();
  renderPictures(picturesSorted);
});

$dropdownDate.addEventListener("click", (e) => {
  sortValue = "date";
  $dropdownSelected.innerHTML = "Date";
  toggleDropdown();
  renderPictures(picturesSorted);
});

$dropdownTitle.addEventListener("click", (e) => {
  sortValue = "title";
  $dropdownSelected.innerHTML = "Titre";
  toggleDropdown();
  renderPictures(picturesSorted);
});

/* Render Tags */
for (let i in photographer.tags) {
  tagsHTML += `<a href="#" class="tag">#${photographer.tags[i]}</a>`;
}
$tags.innerHTML = tagsHTML;

$name.innerHTML = photographer.name;
$location.innerHTML = `${photographer.city}, ${photographer.country}`;
$copyline.innerHTML = photographer.tagline;
$pp.setAttribute(
  "src",
  `../../assets/Photographers_ID_Photos/${photographer.portrait}`
);

renderPictures(picturesSorted);

function sortPictures(pictures, sortValue) {
  switch (sortValue) {
    case "popularity":
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
    case "date":
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
    case "title":
      return pictures.sort(function (a, b) {
        if (a.image != undefined && b.image != undefined) {
          let titleA = a.image.toUpperCase();
          let titleB = b.image.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
      });

    default:
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
  }
}

function splitFileName(pictureName) {
  pictureName = pictureName.split("_");
  pictureName.shift();
  pictureName = pictureName.join(" ");
  pictureName = pictureName.toString().split(".");
  pictureName.pop();
  return pictureName.join(" ").toString();
}

function renderPictures(picturesSorted) {
  console.log(pictures, sortValue);
  picturesSorted = sortPictures(pictures, sortValue);
  galleryHTML = "";
  for (let j in picturesSorted) {
    if (picturesSorted[j].image != undefined) {
      pictureName = splitFileName(picturesSorted[j].image);
      galleryHTML += `
    <div class="pic">
    <img
      src="../../assets/${photographer.name.split(" ")[0]}/${
        picturesSorted[j].image
      }"
      alt="Portrait AfternoonBreak"
      class="pic__img"
    />
    <div class="pic__text">
      <p class="pic__title">${pictureName}</p>
      <p class="pic__price">${picturesSorted[j].price} €</p>
      <p class="pic__likes">${
        picturesSorted[j].likes
      } <i class="fas fa-heart"></i></p>
    </div>
  </div>
    `;
    }
  }
  $gallery.innerHTML = galleryHTML;
}

function toggleDropdown() {
  if ($dropdownList.classList.contains("hide")) {
    $dropdownList.classList.remove("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_up";
    renderDropdown(sortValue);
  } else {
    $dropdownList.classList.add("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_down";
    console.log(sortValue);
  }
}

function renderDropdown(sortValue) {
  switch (sortValue) {
    case "popularity":
      $dropdownPopularity.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
    case "date":
      $dropdownDate.classList.add("hide");
      $dropdownPopularity.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
    case "title":
      $dropdownTitle.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownPopularity.classList.remove("hide");
      break;
    default:
      $dropdownPopularity.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
  }
}
