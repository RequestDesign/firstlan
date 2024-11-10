document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".swiper-slide");
  const contentBoxes = document.querySelectorAll(
    ".description-block_content .content-box"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      buttons.forEach((btn) => btn.classList.remove("active-btn"));
      button.classList.add("active-btn");

      contentBoxes.forEach((box) => box.classList.remove("active-block"));
      targetContent.classList.add("active-block");
    });
  });
});


const butModal = document.querySelectorAll(".modal-vis");
const modal = document.getElementById("modal-window");

butModal.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("active-mod");
  });
});

document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.remove("active-mod");
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-window");
  const form = modal.querySelector("form");
  const modalBlock = modal.querySelector(".modal-block");
  const thankYouBlock = document.createElement("div");
  thankYouBlock.innerHTML = `
    <div class="thank-you-block">
      <div class="thank-block_content">
        <button id="close-modal" class="close-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5L12 12M12 12L22.5 1.5M12 12L22.5 22.5M12 12L1.5 22.5" stroke="#888C8E" stroke-width="2"/>
          </svg>
        </button>
        
        <div class="thank-box">
         <div class="thank-box_text">
            
            <div class="thank-block_title">Заявка отправлена</div>
            <div class="thank-block_text">Наши менеджеры свяжутся с Вами в ближайшее время</div>
            <a href="HomePage.html" class="main-category_button">
              <div class="main-category_still">На главную</div>
                <button class="btn-blue">
                  <svg class="btn-arrow" width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.7071 8.14851C23.0976 7.75799 23.0976 7.12482 22.7071 6.7343L16.3431 0.370338C15.9526 -0.0201859 15.3195 -0.0201859 14.9289 0.370338C14.5384 0.760863 14.5384 1.39403 14.9289 1.78455L20.5858 7.44141L14.9289 13.0983C14.5384 13.4888 14.5384 14.1219 14.9289 14.5125C15.3195 14.903 15.9526 14.903 16.3431 14.5125L22.7071 8.14851ZM0 8.44141L22 8.44141V6.44141L0 6.44141L0 8.44141Z"
                      fill="white"
                    />
                  </svg>
                </button>
            </a>
          </div>
          
          <div class="box-blue_content">
            <div class="blue-text_first">спасибо</div>
            <div class="blue-text_second">за заявку</div>
          </div>
          
        </div>
      </div>
      <div class="thank-blue_element"></div>
    </div>
  `;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    modalBlock.parentNode.replaceChild(thankYouBlock, modalBlock);
  });

  const closeButton = thankYouBlock.querySelector("#close-modal");
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
