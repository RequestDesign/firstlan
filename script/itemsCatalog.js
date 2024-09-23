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