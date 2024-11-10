document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".main-sales_items");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const items = Array.from(container.querySelectorAll(".sales_item"));
    let scrollAmount = getItemWidth();
    let isDragging = false;
    let startX;
    let scrollLeft;
    let deltaX = 0;
    function getItemWidth() {
      return items[0].offsetWidth + parseInt(getComputedStyle(container).gap);
    }
    function updateButtonState() {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      prevButton.disabled = scrollLeft <= 0;
      nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 8;
    }
    function showItemsInView() {
      const containerRect = container.getBoundingClientRect();
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const isInView =
          itemRect.left < containerRect.right &&
          itemRect.right > containerRect.left;
        if (isInView) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      });
    }
    function scrollToSlide(index) {
      const scrollPosition = Math.max(
        0,
        Math.min(
          index * scrollAmount,
          container.scrollWidth - container.clientWidth
        )
      );
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setTimeout(updateButtonState, 300);
    }
    // Режим кнопок для прокрутки (экран больше 440px)
    function enableButtonMode() {
      prevButton.style.display = "block";
      nextButton.style.display = "block";
      prevButton.addEventListener("click", handlePrevClick);
      nextButton.addEventListener("click", handleNextClick);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    }
    // Режим прокрутки пальцем/мышью (экран меньше или равен 440px)
    function enableScrollMode() {
      prevButton.style.display = "none";
      nextButton.style.display = "none";
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }
    function handlePrevClick() {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateButtonState, 300);
    }
    function handleNextClick() {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateButtonState, 300);
    }
    function handleMouseDown(e) {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add("active");
    }
    function handleMouseMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      deltaX = x - startX;
      container.scrollLeft = scrollLeft - deltaX;
    }
    function handleMouseUp() {
      isDragging = false;
      container.classList.remove("active");
      const movedBy = Math.abs(deltaX);
      if (movedBy > scrollAmount / 4) {
        if (deltaX < 0) {
          scrollToSlide(currentIndex + 1);
        } else {
          scrollToSlide(currentIndex - 1);
        }
      } else {
        scrollToSlide(currentIndex);
      }
    }
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      scrollLeft = container.scrollLeft;
    }
    function handleTouchMove(e) {
      const x = e.touches[0].clientX;
      deltaX = x - startX;
      container.scrollLeft = scrollLeft - deltaX;
    }
    function handleTouchEnd() {
      const movedBy = Math.abs(deltaX);
      if (movedBy > scrollAmount / 4 && innerWidth <= 48 * 16) {
        if (deltaX < 0) {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
    }
    function isMobile() {
      return window.innerWidth <= 48 * 16;
    }
    function updateMode() {
      if (isMobile()) {
        enableScrollMode();
        container.style.cursor = "grab";
      } else {
        enableButtonMode();
        container.style.cursor = "default";
      }
    }
    window.addEventListener("resize", () => {
      scrollAmount = getItemWidth();
      updateMode();
      updateButtonState();
    });
    // Инициализация при загрузке страницы
    scrollAmount = getItemWidth();
    requestAnimationFrame(() => {
      updateMode();
      updateButtonState();
      showItemsInView();
    });
  });