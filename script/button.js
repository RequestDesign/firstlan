document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.querySelector(".mySwiper");
    const buttons = swiperContainer.querySelectorAll('.swiper-slide');
    const contentBlocks = document.querySelectorAll('.description-block_content .content-box');

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto', 
        spaceBetween: 0,
        slidesPerGroup: 1, 
        loop: false, 
        navigation: {
            nextEl: null,
            prevEl: null,
        },
        allowTouchMove: true,
        grabCursor: true,
    });

    let isButtonPressed = false;
    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            handleButtonClick(button);
        });

        button.addEventListener("touchstart", (event) => {
            isButtonPressed = true; 
        });

        button.addEventListener("touchend", (event) => {
            if (isButtonPressed) {
                event.preventDefault(); 
                handleButtonClick(button);
                isButtonPressed = false; 
            }
        });
        button.addEventListener("touchmove", () => {
            isButtonPressed = false; 
        });
    });

    function handleButtonClick(button) {
        const targetId = button.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        buttons.forEach((btn) => btn.classList.remove("active-btn"));
        button.classList.add("active-btn");
        contentBlocks.forEach((box) => box.classList.remove("active-block"));
        targetContent.classList.add("active-block");

        const index = Array.from(buttons).indexOf(button);
        swiper.slideTo(index);
    }
});
