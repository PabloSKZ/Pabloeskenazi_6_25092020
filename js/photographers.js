import data from "../data/data.js";

function renderPictures(picturesSorted, selectedTag = "") {
  picturesSorted = sortPictures(pictures, sortValue);
  galleryHTML = "";
  for (let j in picturesSorted) {
    if (
      picturesSorted[j].image != undefined &&
      (picturesSorted[j].tags.includes(selectedTag) || selectedTag == "")
    ) {
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
          <p class="pic__likes"><span>${picturesSorted[j].likes}</span> 
          <a href="#" id="${
            picturesSorted[j].id
          }" class="like-button"><i class="fas fa-heart"></i></a></p>
        </div>
      </div>
      `;
    }
  }
  $gallery.innerHTML = galleryHTML;
}

function sortPictures(pictures, sortValue) {
  switch (sortValue) {
    case "popularity":
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
    case "date":
      return pictures
        .sort((a, b) => convertDate(a.date) - convertDate(b.date))
        .reverse();
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
          return 0;
        }
      });
    default:
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
  }
}

function convertDate(date) {
  return parseInt(date.split("-").join());
}

function splitFileName(pictureName) {
  pictureName = pictureName.split("_");
  pictureName.shift();
  pictureName = pictureName.join(" ");
  pictureName = pictureName.toString().split(".");
  pictureName.pop();
  return pictureName.join(" ").toString();
}

function toggleDropdown() {
  if ($dropdownList.classList.contains("hide")) {
    $dropdownList.classList.remove("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_up";
    renderDropdown(sortValue);
  } else {
    $dropdownList.classList.add("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_down";
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

function renderTotalLikes(pictures) {
  let total = 0;
  for (let l in pictures) {
    total += pictures[l].likes;
  }
  $totalLikes.innerHTML = total;
  return total;
}

/* DOM Variables */
const $name = document.getElementById("name");
const $location = document.getElementById("location");
const $copyline = document.getElementById("copyline");
const $tags = document.getElementById("tags");
const $pp = document.getElementById("pp");
const $gallery = document.getElementById("gallery");
const $price = document.getElementById("price");
const $totalLikes = document.getElementById("total-likes");

const $dropdownButton = document.getElementById("dropdown-button");
const $dropdownSelected = document.getElementById("dropdown-selected");
const $dropdownList = document.getElementById("dropdown-list");
const $dropdownArrow = document.getElementById("dropdown-arrow");
const $dropdownPopularity = document.getElementById("dropdown-list-popularity");
const $dropdownDate = document.getElementById("dropdown-list-date");
const $dropdownTitle = document.getElementById("dropdown-list-title");

const $likeButtons = document.getElementsByClassName("like-button");
const $tagCollection = document.getElementsByClassName("tag");

/* Fetch Data */
const id = document.getElementsByTagName("body")[0].getAttribute("data-id");
const photographer = data.photographers.find((x) => x.id == id);
const pictures = data.media.filter((x) => x.photographerId == id);

/* Initialization */
let tagsHTML = "";
let galleryHTML = "";
let pictureName = "";
let sortValue = "popularity";
let picturesSorted = sortPictures(pictures, sortValue);
let selectedTag = "";

/* Event Listeners */
$dropdownButton.addEventListener("click", (e) => {
  e.preventDefault();
  toggleDropdown();
});

$dropdownPopularity.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "popularity";
  $dropdownSelected.innerHTML = "Popularité";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

$dropdownDate.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "date";
  $dropdownSelected.innerHTML = "Date";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

$dropdownTitle.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "title";
  $dropdownSelected.innerHTML = "Titre";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

/* Render Photographer Profile */
$name.innerHTML = photographer.name;
$location.innerHTML = `${photographer.city}, ${photographer.country}`;
$copyline.innerHTML = photographer.tagline;
$pp.setAttribute(
  "src",
  `../../assets/Photographers_ID_Photos/${photographer.portrait}`
);
for (let i in photographer.tags) {
  tagsHTML += `<a href="#" class="tag">#${photographer.tags[i]}</a>`;
}
$tags.innerHTML = tagsHTML;

$price.innerHTML = photographer.price;
renderTotalLikes(pictures);

renderPictures(picturesSorted, selectedTag);

/* Event Listeners on like buttons */
Array.from($likeButtons).forEach((el) => {
  let image = {
    id: el.id,
    liked: false,
  };
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (!image.liked) {
      data.media.find((x) => x.id == image.id).likes++;
      image.liked = true;
      el.previousElementSibling.innerHTML = data.media.find(
        (x) => x.id == image.id
      ).likes;
      renderTotalLikes(pictures);
    }
  });
});

/* Event Listeners on tags */
Array.from($tagCollection).forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (el.classList.contains("active-tag")) {
      el.classList.remove("active-tag");
      renderPictures(picturesSorted, "");
    } else {
      Array.from($tagCollection).forEach((elem) => {
        elem.classList.remove("active-tag");
      });
      el.classList.add("active-tag");
      selectedTag = el.innerHTML.split("#")[1].toString();
      renderPictures(picturesSorted, selectedTag);
    }
  });
});
