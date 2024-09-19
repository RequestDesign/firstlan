document.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo_white");
  const search = document.querySelector(".search");
  const heart = document.querySelector(".heart-icon");
  const shopping = document.querySelector(".shopping");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 10) {
    header.classList.add("header-scrolled");
    search.src = "image/header/search_black.png";
    heart.src = "image/header/heart_black.png";
    shopping.src = "image/header/shopping_black.png";
    if (logo) {
      logo.src = "image/footer/FL_logo.png";
    }
  } else {
    header.classList.remove("header-scrolled");
    search.src = "image/header/24.png";
    heart.src = "image/header/heart.png";
    shopping.src = "image/header/shopping.png";
    if (logo) {
      logo.src = "image/header/FL_logowhite.png";
    }
  }
});

document.addEventListener("scroll", function () {
  const burger = document.querySelector(".burger");
  const burgerBox = document.querySelector(".burger-box");
  const burgerChk = document.getElementById("burger-checkbox");
  const scrollPosition = window.scrollY;
  const menu = document.querySelector(".menu-search");

  if (scrollPosition > 10) {
    burgerBox.style.background = "black";
    burger.style.background = "black";
    burger.style.content = "url(image/burger_ico/Vector1.svg)";
  } else {
    burgerBox.style.background = "white";
    burger.style.background = "white";
    burger.style.content = "url(image/burger_ico/Vector.svg)";
  }
  burgerChk.addEventListener("change", function () {
    if (burgerChk.checked == true) {
      burgerBox.style.background = "black";
      burger.style.background = "black";
      burger.style.content = "url(image/burger_ico/Vector2.svg)";
    } else if (burgerChk.checked == false && scrollPosition > 10) {
      burgerBox.style.background = "black";
      burger.style.background = "black";
      burger.style.content = "url(image/burger_ico/Vector1.svg)";
    } else if (burgerChk.checked == false && scrollPosition < 10) {
      burgerBox.style.background = "white";
      burger.style.background = "white";
      burger.style.content = "url(image/burger_ico/Vector.svg)";
    }
  });
});