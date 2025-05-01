// Select the cart badge and buttons for main and related products
const cartBadge = document.querySelector('.cart-badge');

// Select Add to Cart and Buy Now buttons for main products
const addToCartButtons = document.querySelectorAll('.cart');
const buyNowButtons = document.querySelectorAll('.buy');

// Select Add to Cart and Buy Now buttons for related products
const relatedAddToCartButtons = document.querySelectorAll('.product-card .cart');
const relatedBuyNowButtons = document.querySelectorAll('.product-card .buy');

// Initialize cart quantity from localStorage
let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;

// Function to update the cart badge
function updateCartBadge() {
    cartBadge.textContent = cartQuantity;
    cartBadge.style.display = cartQuantity > 0 ? 'flex' : 'none';  // Hide the badge if no items in the cart
}

// Handle Add to Cart functionality for both main and related products
function handleAddToCart(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.product-info') || this.closest('.product-card');
            const productQuantity = parseInt(productContainer.querySelector('select')?.value || 1);
            const productName = productContainer.querySelector('h2')?.textContent || productContainer.querySelector('.title').textContent;
            const productPrice = productContainer.querySelector('.price').textContent;

            if (productQuantity > 0) {
                cartQuantity += productQuantity;  // Add to the cart quantity
                localStorage.setItem('cartQuantity', cartQuantity);  // Save to localStorage
                updateCartBadge();  // Update the cart badge
                console.log('Product Added to Cart:', productName, productQuantity, productPrice);
            }
        });
    });
}

// Handle Buy Now functionality for both main and related products
function handleBuyNow(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.product-info') || this.closest('.product-card');
            const productQuantity = parseInt(productContainer.querySelector('select')?.value || 1);
            const productName = productContainer.querySelector('h2')?.textContent || productContainer.querySelector('.title').textContent;
            const productPrice = productContainer.querySelector('.price').textContent;

            if (productQuantity > 0) {
                const product = {
                    name: productName,
                    quantity: productQuantity,
                    price: productPrice
                };

                localStorage.setItem('selectedProduct', JSON.stringify(product));  // Save product to localStorage
                window.location.href = "../cart/index.html";  // Redirect to cart page
            }
        });
    });
}

// Initialize functionality for Add to Cart and Buy Now buttons for both main and related products
handleAddToCart(addToCartButtons);
handleBuyNow(buyNowButtons);
handleAddToCart(relatedAddToCartButtons);
handleBuyNow(relatedBuyNowButtons);

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

// Update cart badge on page load
updateCartBadge();
