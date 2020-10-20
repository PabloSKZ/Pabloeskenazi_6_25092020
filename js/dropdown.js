/* DOM Variables */
const $dropdownButton = document.getElementById("dropdown-button");
const $dropdownSelected = document.getElementById("dropdown-selected");
const $dropdownList = document.getElementById("dropdown-list");
const $dropdownArrow = document.getElementById("dropdown-arrow");
const $dropdownPopularity = document.getElementById("dropdown-list-popularity");
const $dropdownDate = document.getElementById("dropdown-list-date");
const $dropdownTitle = document.getElementById("dropdown-list-title");

let sortValue = "popularity";

/* Event Listeners */
$dropdownButton.addEventListener("click", (e) => {
  toggleDropdown();
});

$dropdownPopularity.addEventListener("click", (e) => {
  sortValue = "popularity";
  $dropdownSelected.innerHTML = "Popularité";
  toggleDropdown();
});

$dropdownDate.addEventListener("click", (e) => {
  sortValue = "date";
  $dropdownSelected.innerHTML = "Date";
  toggleDropdown();
});

$dropdownTitle.addEventListener("click", (e) => {
  sortValue = "title";
  $dropdownSelected.innerHTML = "Titre";
  toggleDropdown();
});

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
