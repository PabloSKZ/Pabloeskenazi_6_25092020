/* DOM Variables */
const $dropdownButton = document.getElementById("dropdown-button");
const $selected = document.getElementById("dropdown-selected");
const $list = document.getElementById("dropdown-list");
const $arrow = document.getElementById("dropdown-arrow");
const $popularity = document.getElementById("dropdown-list-popularity");
const $date = document.getElementById("dropdown-list-date");
const $title = document.getElementById("dropdown-list-title");

let sortValue = "popularity";

/* Event Listeners */
$dropdownButton.addEventListener("click", (e) => {
  toggleDropdown();
});

$popularity.addEventListener("click", (e) => {
  sortValue = "popularity";
  $selected.innerHTML = "Popularité";
  toggleDropdown();
});

$date.addEventListener("click", (e) => {
  sortValue = "date";
  $selected.innerHTML = "Date";
  toggleDropdown();
});

$title.addEventListener("click", (e) => {
  sortValue = "title";
  $selected.innerHTML = "Titre";
  toggleDropdown();
});

function toggleDropdown() {
  if ($list.classList.contains("hide")) {
    $list.classList.remove("hide");
    $arrow.innerHTML = "keyboard_arrow_up";
    renderDropdown(sortValue);
  } else {
    $list.classList.add("hide");
    $arrow.innerHTML = "keyboard_arrow_down";
    console.log(sortValue);
  }
}

function renderDropdown(sortValue) {
  switch (sortValue) {
    case "popularity":
      $popularity.classList.add("hide");
      $date.classList.remove("hide");
      $title.classList.remove("hide");
      break;
    case "date":
      $date.classList.add("hide");
      $popularity.classList.remove("hide");
      $title.classList.remove("hide");
      break;
    case "title":
      $title.classList.add("hide");
      $date.classList.remove("hide");
      $popularity.classList.remove("hide");
      break;
    default:
      $popularity.classList.add("hide");
      $date.classList.remove("hide");
      $title.classList.remove("hide");
      break;
  }
}
