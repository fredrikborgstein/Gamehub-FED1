export default class CartManager {
    constructor() {
        this.cartKey = "shoppingCart";
        this.cart = this.loadCart();
    }

    init() {
        this.updateCartDisplay();
        this.registerEventListeners();
    }

    loadCart() {
        const storedCart = localStorage.getItem(this.cartKey);
        return storedCart ? JSON.parse(storedCart) : [];
    }

    saveCart() {
        localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
    }

    addItem(product) {
        const existingItem = this.cart.find((item) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateItemQuantity(productId, quantity) {
        const item = this.cart.find((item) => item.id === productId);
        if (item) {
            item.quantity = quantity > 0 ? quantity : 1;
        }
        this.saveCart();
        this.updateCartDisplay();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartContainer = document.getElementById("cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";

        if (this.cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        this.cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="item-info">
                    <img src="${item.image.url}" alt="${item.image.alt}" class="item-image">
                    <div>
                        <p class="item-title">${item.title}</p>
                        <p class="item-price">${item.price} $</p>
                    </div>
                </div>
                <div class="item-controls">
                    <input type="number" class="item-quantity" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        this.registerCartItemListeners();
    }

    registerCartItemListeners() {
        const quantityInputs = document.querySelectorAll(".item-quantity");
        quantityInputs.forEach((input) => {
            input.addEventListener("change", (e) => {
                const productId = e.target.dataset.id;
                const newQuantity = parseInt(e.target.value, 10);
                this.updateItemQuantity(productId, newQuantity);
            });
        });

        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                this.removeItem(productId);
            });
        });
    }

    registerEventListeners() {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const productId = e.target.dataset.id;

                const product = this.getProductById(productId);
                if (product) {
                    this.addItem(product);
                }
            });
        });

        const clearCartButton = document.getElementById("clear-cart");
        if (clearCartButton) {
            clearCartButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.clearCart();
            });
        }
    }

    // Currently just for mocking
    getProductById(productId) {
        return this.cart.find((product) => product.id === productId) || {
            id: productId,
            title: "Sample Product",
            price: 10.99,
            image: { url: "sample-image.jpg", alt: "Sample Product Image" },
        };
    }
}
