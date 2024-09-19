document.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const scrollPosition = window.scrollY;
  if (scrollPosition > 10) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});
