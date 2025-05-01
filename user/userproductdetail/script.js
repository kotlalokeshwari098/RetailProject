// Get the cart badge element and the buttons
const cartBadge = document.querySelector('.cart-badge');
const addToCartButtons = document.querySelectorAll('.cart');
const buyNowButtons = document.querySelectorAll('.buy');
let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0; // Initialize cart quantity from localStorage

// Function to update the cart badge
function updateCartBadge() {
    cartBadge.textContent = cartQuantity;
    cartBadge.style.display = cartQuantity > 0 ? 'flex' : 'none';  // Hide if no items in the cart
}

// Update cart badge on page load
updateCartBadge();

// Function to handle "Add to Cart" action
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the selected quantity from the product dropdown
        const productQuantity = parseInt(this.closest('.product-info').querySelector('select').value);
        
        if (productQuantity > 0) {
            cartQuantity += productQuantity;  // Update the cart quantity
            localStorage.setItem('cartQuantity', cartQuantity);  // Store updated cart quantity in localStorage
            updateCartBadge();  // Update the cart badge
        }
    });
});

// Function to handle "Buy Now" action
buyNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the selected product info and quantity
        const productName = this.closest('.product-info').querySelector('h2').textContent;
        const productQuantity = parseInt(this.closest('.product-info').querySelector('select').value);
        
        if (productQuantity > 0) {
            // Store product info and quantity in localStorage for the cart page
            const product = {
                name: productName,
                quantity: productQuantity,
                price: this.closest('.product-info').querySelector('.price').textContent
            };
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "../cart/index.html";  // Redirect to cart page
        }
    });
});

// Function to load cart info on the cart page (../cart/index.html)
if (window.location.pathname.includes('cart/index.html')) {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        const cartContainer = document.querySelector('.cart-items');
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <p>${product.name} (Quantity: ${product.quantity})</p>
            <p>Price: ${product.price}</p>
        `;
        cartContainer.appendChild(item);
    }
}
