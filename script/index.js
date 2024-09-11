document.querySelectorAll('.heart').forEach(function(element) {
    element.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
document.querySelectorAll('.btn-blue-basket').forEach(function(button) {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// слайдер
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-sales_items');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const items = Array.from(container.querySelectorAll('.sales_item'));

    function getItemWidth() {
        return items[0].offsetWidth + parseInt(getComputedStyle(container).gap);
    }

    let scrollAmount = getItemWidth();
    
    function updateButtonState() {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
    
        console.log(`scrollLeft: ${scrollLeft}, scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
        
        prevButton.disabled = scrollLeft === 0;
        nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 2.4;
    }

    function showItemsInView() {
        const containerRect = container.getBoundingClientRect();
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const isInView = itemRect.left < containerRect.right && itemRect.right > containerRect.left;
            if (isInView) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setTimeout(updateButtonState, 300); 
    });

    nextButton.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(updateButtonState, 300); 
    });

    container.addEventListener('scroll', () => {
        updateButtonState();
        showItemsInView();
    });

    
    window.addEventListener('resize', () => {
        scrollAmount = getItemWidth();
        updateButtonState();
    });

    updateButtonState();
    showItemsInView();
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.main-advantages_item');
    const wrapD3Cube = document.querySelector('#wrapD3Cube');
    const D3Cube = document.querySelector('#D3Cube');
  
    items.forEach(item => {
      item.addEventListener('click', () => {
        
        items.forEach(i => {
          i.classList.remove('active');
       
          D3Cube.classList.add('no-animation');
        });
  
        item.classList.add('active');
        D3Cube.classList.remove('no-animation');
      });
    });
});


const clientItems = document.querySelectorAll('.main-client_item');

clientItems.forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = document.querySelector('.main-client_item.active');

    if (isOpen) {
      isOpen.classList.remove('active');
    }

    item.classList.toggle('active');
  });
});


//input
// document.querySelectorAll('.form-input').forEach(input => {
//     input.addEventListener('input', function() {
//         if (this.value === '') {
//             this.classList.add('error');
//         } else {
//             this.classList.remove('error');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slideNumber = document.querySelector('.slide-number');
    const arrowUp = document.querySelector('.arrow.up');
    const arrowDown = document.querySelector('.arrow.down');
    const slider = document.querySelector('.slider');
    const totalSlides = slides.length;

    // Полоса прогресса
    const progressIndicator = document.querySelector('.progress-indicator');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        slideNumber.textContent = (currentSlide + 1).toString().padStart(3, '0');
        slider.style.transform = `translateX(-${currentSlide * 77.969}vw)`;
        updateSlideVisibility();
        updateProgressBar(); 
    }

    function updateSlideVisibility() {
        slides.forEach((slide, index) => {
            const slideTextElements = slide.querySelectorAll('.slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social');
            if (index === currentSlide) {
                slideTextElements.forEach(element => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            } else {
                slideTextElements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                });
            }
        });
    }

    function updateProgressBar() {
        // Пропорция ширины прогресс-бара по отношению к слайдам
        const progressWidth = (100 / totalSlides) * (currentSlide + 1);
        progressIndicator.style.width = `${progressWidth}%`;
    }

    arrowDown.addEventListener('click', function() {
        if (currentSlide > 0) {
          currentSlide--;
        } else {
          currentSlide = totalSlides - 1;
        }
        updateSlides();
        localStorage.setItem('currentSlide', currentSlide);
    });
      
    arrowUp.addEventListener('click', function() {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
        } else {
          currentSlide = 0;
        }
        updateSlides();
        localStorage.setItem('currentSlide', currentSlide);
      });
    const savedSlide = localStorage.getItem('currentSlide');
    if (savedSlide !== null) {
        currentSlide = parseInt(savedSlide);
    }
    updateSlides();

    // Обновляем видимость текста при скролле
    window.addEventListener('scroll', function() {
        slides.forEach((slide, index) => {
            const slideRect = slide.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Проверяем, что текущий слайд видим в окне браузера
            if (slideRect.top < windowHeight && slideRect.bottom >= 0) {
                if (index === currentSlide) {
                    const slideTextElements = slide.querySelectorAll('.slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social');
                    slideTextElements.forEach(element => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                }
            } else {
                if (index === currentSlide) {
                    const slideTextElements = slide.querySelectorAll('.slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social');
                    slideTextElements.forEach(element => {
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(20px)';
                    });
                }
            }
        });
    });
});

document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo_white');
    const search = document.querySelector('.search');
    const heart = document.querySelector('.heart-icon');
    const shopping = document.querySelector('.shopping');
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > 10) { 
      header.classList.add('header-scrolled');
      search.src = 'image/header/search_black.png';
      heart.src = 'image/header/heart_black.png';
      shopping.src = 'image/header/shopping_black.png';
      if (logo) {
        logo.src = 'image/footer/FL_logo.png'; 
        console.log('Logo updated to new image.');
      }
    } else {
      header.classList.remove('header-scrolled');
      search.src = 'image/header/24.png';
      heart.src = 'image/header/heart.png';
      shopping.src = 'image/header/shopping.png';
      if (logo) {
        logo.src = 'image/header/FL_logowhite.png'; 
        console.log('Logo reverted to original image.');
      }
    }
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    const swiperContainer = document.querySelector('.swiper-container');
    const progressBar = document.querySelector('.progress-indicators');
    let swiper;

    function initializeSwiper() {
        if (window.innerWidth <= 379) {
            swiperContainer.style.overflow = 'auto';
            if (!swiper) {
                swiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,        
                    spaceBetween: 0,         
                    slidesPerGroup: 1,       
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,   
                    },
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                    },
                    on: {
                        slideChange: function () {
                            updateProgressBar();
                        }
                    }
                });
                updateProgressBar();
            }
        } else {
            if (swiper) {
                swiper.destroy(); 
                swiper = null;
            }
            swiperContainer.style.overflow = 'hidden'; в
        }
    }

    function updateProgressBar() {
        if (swiper) {
            const totalSlides = swiper.slides.length;
            const currentSlide = swiper.activeIndex + 1; 

            const progress = (currentSlide / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    initializeSwiper();
    
    window.addEventListener('resize', function() {
        initializeSwiper();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.custom-slider-wrapper');
    const progressBar = document.querySelector('.progres-indicator');
    const slides = document.querySelectorAll('.custom-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let startX = 0;

    function updateProgressBar() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        updateProgressBar();
    }

    // Обработка события начала свайпа
    sliderWrapper.addEventListener('mousedown', function(event) {
        startX = event.pageX;
        sliderWrapper.addEventListener('mousemove', onMouseMove);
    });

    // Обработка события окончания свайпа
    document.addEventListener('mouseup', function(event) {
        const endX = event.pageX;
        if (startX > endX + 50) {
            // Свайп влево
            currentSlide = (currentSlide + 1) % totalSlides;
        } else if (startX + 50 < endX) {
            // Свайп вправо
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        goToSlide(currentSlide);
        sliderWrapper.removeEventListener('mousemove', onMouseMove);
    });

    function onMouseMove(event) {
        // Обработка перемещения мыши во время свайпа
    }

    // Инициализация прогресс-бара
    updateProgressBar();
});









  
  
  
  