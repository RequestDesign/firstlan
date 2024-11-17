document.addEventListener('DOMContentLoaded', function() {
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const quantityDisplays = document.querySelectorAll('.quantity');

    minusButtons.forEach((minusButton, index) => {
        let quantity = parseInt(quantityDisplays[index].textContent);

        minusButton.addEventListener('click', function() {
            if (quantity > 1) { 
                quantity--; 
                quantityDisplays[index].textContent = quantity; 
            }
        });
    });

    plusButtons.forEach((plusButton, index) => {
        let quantity = parseInt(quantityDisplays[index].textContent);

        plusButton.addEventListener('click', function() {
            quantity++; 
            quantityDisplays[index].textContent = quantity; 
        });
    });
});
