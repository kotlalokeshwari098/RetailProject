document.addEventListener("DOMContentLoaded", function () {
    const cartBadge = document.querySelector(".cart-badge");
    const addToCartButtons = document.querySelectorAll(".product button");
    const categoryFilters = document.querySelectorAll(".sidebar ul:nth-of-type(1) li"); // Category List
    const priceFilters = document.querySelectorAll(".sidebar ul:nth-of-type(2) li"); // Price List
    const products = document.querySelectorAll(".product");

    let cartCount = 0;
    let selectedCategory = null;
    let selectedPriceRange = null;

    // Update cart count when adding to cart
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.closest(".product");
            const quantityInput = product.querySelector("input[name='quantity']");
            let quantity = parseInt(quantityInput.value);

            cartCount += quantity;
            cartBadge.textContent = cartCount; // Update the cart count
        });
    });

    // Category Filtering
    categoryFilters.forEach(category => {
        category.addEventListener("click", function () {
            // Toggle selection
            if (selectedCategory === this.textContent.trim()) {
                selectedCategory = null;
                this.classList.remove("active-filter");
            } else {
                selectedCategory = this.textContent.replace(/[^a-zA-Z\s]/g, "").trim(); // Remove emojis
                resetActiveState(categoryFilters);
                this.classList.add("active-filter");
            }
            filterProducts();
        });
    });

    // Price Filtering
    priceFilters.forEach(price => {
        price.addEventListener("click", function () {
            // Toggle selection
            if (selectedPriceRange === this.textContent.trim()) {
                selectedPriceRange = null;
                this.classList.remove("active-filter");
            } else {
                selectedPriceRange = this.textContent.trim();
                resetActiveState(priceFilters);
                this.classList.add("active-filter");
            }
            filterProducts();
        });
    });

    // Filtering logic
    function filterProducts() {
        products.forEach(product => {
            const productCategory = product.querySelector(".category").textContent.replace("Category: ", "").trim();
            const productPrice = parseFloat(product.querySelector(".price-item").textContent.replace("Price: $", "").trim());

            // Check if product matches both filters or one
            let categoryMatch = !selectedCategory || productCategory.toLowerCase() === selectedCategory.toLowerCase();
            let priceMatch = !selectedPriceRange || checkPriceMatch(productPrice);

            // Show product only if both filters match or one filter is not selected
            if (categoryMatch && priceMatch) {
                product.style.display = "block"; // Show product
            } else {
                product.style.display = "none"; // Hide product
            }
        });
    }

    // Price Range matching logic
    function checkPriceMatch(price) {
        if (!selectedPriceRange) return true;  // If no price filter is selected, return true

        // Check against the price ranges
        if (selectedPriceRange.includes("Under $20")) {
            return price < 20;
        } else if (selectedPriceRange.includes("$25 to $100")) {
            return price >= 25 && price <= 100;
        } else if (selectedPriceRange.includes("$100 to $300")) {
            return price >= 100 && price <= 300;
        } else if (selectedPriceRange.includes("$300 to $500")) {
            return price >= 300 && price <= 500;
        } else if (selectedPriceRange.includes("$500 to $1,000")) {
            return price >= 500 && price <= 1000;
        }

        return true;  // Default: show all products if no matching price range
    }

    // Reset active filter state for both categories and price
    function resetActiveState(listItems) {
        listItems.forEach(item => item.classList.remove("active-filter"));
    }
});
