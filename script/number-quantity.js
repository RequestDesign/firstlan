document.addEventListener('DOMContentLoaded', function() {
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const quantityDisplays = document.querySelectorAll('.quantity');

    minusButtons.forEach((minusButton, index) => {
        minusButton.addEventListener('click', function() {
            let quantity = parseInt(quantityDisplays[index].textContent);
            if (quantity > 1) { 
                quantity--; 
                quantityDisplays[index].textContent = quantity; 
            }
        });
    });

    plusButtons.forEach((plusButton, index) => {
        plusButton.addEventListener('click', function() {
            let quantity = parseInt(quantityDisplays[index].textContent);
            quantity++; 
            quantityDisplays[index].textContent = quantity; 
        });
    });
});
