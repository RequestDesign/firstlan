const heartItem = document.querySelectorAll(".heart-block");
heartItem.forEach((element) => {
  element.addEventListener("click", () => {
    const img = element.querySelector("img");
    if (img) {
      if (element.classList.contains("active")) {
        img.src = img.dataset.defaultSrc;
        element.classList.remove("active");
      } else {
        img.src = img.dataset.activeSrc;
        element.classList.add("active");
      }
    }
  });
});



const btnBasket = document.querySelectorAll(".btn-blue-basket");
btnBasket.forEach((bottom) => {
  bottom.addEventListener("click", () => {
    const advantagesActive = document.querySelector(
      ".btn-blue-basket.active"
    );
    const img = bottom.querySelector("img");
    if (img) {
      if (bottom.classList.contains("active")) {
        img.src = img.dataset.defaultSrc;
        bottom.classList.remove("active");
      } else {
        img.src = img.dataset.activeSrc;
        bottom.classList.add("active");
      }
    }
  });
});
const categoriesButton = document.querySelector('.main-categories_title');
const categoriesContent = document.querySelector('.box-white');
const backArrow = document.querySelector('.back-arrow');

categoriesButton.addEventListener('click', () => {
  categoriesContent.classList.toggle('active');
});

backArrow.addEventListener('click', () => {
  categoriesButton.classList.remove('active');
  categoriesContent.classList.remove('active');
});



const filtersButton = document.querySelector('.filters-title');
const filtersContent = document.querySelector('.box_filters');
const backArrows = document.querySelector('.back-arrows');

filtersButton.addEventListener('click', () => {
  filtersContent.classList.toggle('active');
});

backArrows.addEventListener('click', () => {
  filtersContent.classList.remove('active');
});