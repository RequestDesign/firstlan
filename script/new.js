document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-sales_items");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const items = Array.from(container.querySelectorAll(".sales_item"));
  // const progressBarIndicator = document.querySelector(".progress-indicator");
  function getItemWidth() {
    return items[0].offsetWidth + parseInt(getComputedStyle(container).gap);
  }

  function updateButtonState() {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    prevButton.disabled = scrollLeft === 0;
    nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 2.08;
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

  prevButton.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  });

  nextButton.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  });

  container.addEventListener("scroll", () => {
    updateButtonState();
    showItemsInView();
  });

  window.addEventListener("resize", () => {
    scrollAmount = getItemWidth();
    updateButtonState();
  });

  let currentIndex = 0;
  let scrollAmount = getItemWidth();
  let isDragging = false;
  let startX;
  let scrollLeft;
  let deltaX = 0;

  function getItemWidth() {
    const itemStyle = getComputedStyle(items[0]);
    const itemWidth = items[0].offsetWidth;
    const itemGap = parseInt(itemStyle.marginRight);
    return itemWidth + itemGap;
  }

  //   Функция для обновления прогресс-бара
  // function updateProgressBar() {
  //   const progress = ((currentIndex + 1) / items.length) * 100;
  //   progressBarIndicator.style.width = `${progress}%`;
  // }

  function scrollToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    const scrollPosition = currentIndex * scrollAmount;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setTimeout(() => {
      updateButtonState();
      updateProgressBar();
    }, 300);
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
    if (movedBy > scrollAmount / 4 && innerWidth <=420) {
      if (deltaX < 0) {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }

  container.addEventListener("mousedown", handleMouseDown);
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseup", handleMouseUp);
  container.addEventListener("mouseleave", handleMouseUp);

  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);
  container.addEventListener("touchend", handleTouchEnd);

  window.addEventListener("resize", () => {
    scrollAmount = getItemWidth();
    updateButtonState();
  });
  function isMobile() {
    return window.innerWidth <= 420;
  }

  scrollAmount = getItemWidth();
  updateButtonState();
  // updateProgressBar();
  showItemsInView();

  if (isMobile()) {
    container.style.cursor = "grab";
  }
});