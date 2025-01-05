import Toaster from "./toast.mjs";

export default class ProductPage {
    constructor(productId) {
        this.productId = productId;
        this.baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
        this.cacheExpiration = 60 * 60 * 1000;
        this.toaster = new Toaster();
        this.init();
    }

    async init() {
        try {
            const product = await this.getProduct(this.productId);
            if (product) {
                this.generateProductPage(product);
                this.generateFeaturedSection(product.genre);
            } else {
                this.toaster.show("Product data could not be retrieved.", "error", 5000);
            }
        } catch (error) {
            this.toaster.show("An error occurred while loading the product page.", "error", 5000);
        }
    }

    async getProduct(productId) {
        try {
            const cacheKey = `product-${productId}`;
            const cachedData = localStorage.getItem(cacheKey);
            const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

            if (cachedData && cachedTimestamp) {
                const now = Date.now();
                if (now - parseInt(cachedTimestamp, 10) < this.cacheExpiration) {
                    return JSON.parse(cachedData);
                }
            }

            const response = await fetch(`${this.baseAPIUrl}${productId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            if (data && data.data) {
                localStorage.setItem(cacheKey, JSON.stringify(data.data));
                localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
                return data.data;
            } else {
                throw new Error("Invalid product data structure.");
            }
        } catch (error) {
            this.toaster.show("Failed to load product details. Please try again later.", "error", 5000);
            return null;
        }
    }

    async generateFeaturedSection(currentGenre) {
        const featuredGrid = document.getElementById('featured-grid');

        if (!featuredGrid) return;
        featuredGrid.innerHTML = '';

        try {
            const data = await this.fetchAllGames();
            const games = data.data || [];
            const relatedGames = games.filter(
                (game) => game.genre === currentGenre && game.id !== this.productId
            );

            if (relatedGames.length === 0) {
                const noGamesMessage = document.createElement('p');
                noGamesMessage.innerText = "No similar games available.";
                featuredGrid.appendChild(noGamesMessage);
                return;
            }

            relatedGames.forEach((game) => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                <div class="card-title">
                    <h3>${game.title}</h3>
                </div>
                <div class="card-image">
                    <img src="${game.image.url}" alt="${game.image.alt || `The cover of the game ${game.title}`}" />
                </div>
                <div class="card-info">
                    <p>${game.genre}</p>
                    <p>${game.price} $</p>
                </div>
                <div class="card-button">
                    <a href="/productpage.html?id=${game.id}" class="card-text">View Details</a>
                </div>
            `;
                featuredGrid.appendChild(card);
            });
        } catch (error) {
            this.toaster.show("Failed to load related games. Please try again later.", "error", 5000);
        }
    }

    async fetchAllGames() {
        const cacheKey = "productsCache";
        const cacheTimestampKey = `${cacheKey}-timestamp`;
        const cacheExpiration = 60 * 60 * 1000;

        try {
            const cachedData = localStorage.getItem(cacheKey);
            const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

            if (cachedData && cachedTimestamp) {
                const now = Date.now();
                if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
                    return JSON.parse(cachedData);
                }
            }

            const response = await fetch(`${this.baseAPIUrl}`);
            if (!response.ok) throw new Error("Failed to fetch games");

            const data = await response.json();
            if (Array.isArray(data)) {
                localStorage.setItem(cacheKey, JSON.stringify(data));
                localStorage.setItem(cacheTimestampKey, Date.now().toString());
                return data;
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            this.toaster.show("Failed to load games. Please check your connection.", "error", 5000);
            return [];
        }
    }

    generateProductPage(product) {
        document.title = product.title || "Product Page";

        const productImage = document.getElementById('product-image');
        if (productImage && product.image) {
            productImage.src = product.image.url || "";
            productImage.alt = product.image.alt || "Product image";
        }

        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.innerText = product.title || "Untitled";

        const productDescription = document.getElementById('product-desc');
        if (productDescription) productDescription.innerText = product.description || "No description available.";

        const productPrice = document.getElementById('product-price');
        if (productPrice) {
            if (product.onSale && product.discountedPrice) {
                productPrice.innerText = `Sale Price: ${product.discountedPrice} $ (Original: ${product.price} $)`;
            } else {
                productPrice.innerText = `${product.price} $`;
            }
        }

        const purchaseBtn = document.getElementById('purchase-button');
        if (purchaseBtn) purchaseBtn.setAttribute('data-id', this.productId);

        const productTags = document.getElementById('product-tags');
        if (productTags && product.tags) {
            productTags.innerText = `Tags: ${product.tags.join(", ")}`;
        }
    }
}
