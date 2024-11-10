document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.querySelector(".mySwiper");
    const buttons = swiperContainer.querySelectorAll('.swiper-slide');
    const contentBlocks = document.querySelectorAll('.description-block_content .content-box');

    function initializeSwiper() {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 'auto', 
            spaceBetween: 0,
            slidesPerGroup: 1, 
            loop: false, 
            navigation: {
                nextEl: null,
                prevEl: null,
            },
            on: {
                slideChange: function () {
                    
                    if (this.isEnd) {
                        this.allowSlideNext = false; 
                    } else {
                        this.allowSlideNext = true; 
                    }
                },
                init: function () {
                    
                },
            },
        });
    }

    initializeSwiper();

    window.addEventListener("resize", function () {
        initializeSwiper(); 
    });
});
