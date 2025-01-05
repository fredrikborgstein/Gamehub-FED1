export default class ProductManager {
  constructor() {
    this.baseApiUrl = "https://v2.api.noroff.dev/";
    this.genreFilter = document.getElementById("genre");
    this.sortBy = document.getElementById("sortby");
    this.productGrid = document.getElementById("product-grid");
    this.products = [];
    this.cacheKey = "productsCache";
    this.cacheExpiration = 60 * 60 * 1000;

    this.registerEvents();
    this.getAllProducts();
  }

  registerEvents() {
    this.genreFilter.addEventListener("change", (e) => {
      e.preventDefault();
      // Filtering logic can go here
      console.log("Filter changed to:", e.target.value);
    });

    this.sortBy.addEventListener("change", (e) => {
      e.preventDefault();
      this.sortProducts(e.target.value);
    });
  }

  async getAllProducts() {
    try {
      const cachedData = localStorage.getItem(this.cacheKey);
      const cachedTimestamp = localStorage.getItem(`${this.cacheKey}-timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = Date.now();
        if (now - parseInt(cachedTimestamp, 10) < this.cacheExpiration) {
          const cachedObject = JSON.parse(cachedData);
          const products = cachedObject.data;
          if (Array.isArray(products)) {
            this.products = products;
            this.processProducts(products);
            this.populateGenreDropDown(products);
            return;
          }
        }
      }

      const response = await fetch(`${this.baseApiUrl}gamehub`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();

      const products = data.data;
      if (Array.isArray(products)) {
        localStorage.setItem(this.cacheKey, JSON.stringify(data));
        localStorage.setItem(`${this.cacheKey}-timestamp`, Date.now().toString());
        this.products = products;
        this.processProducts(products);
        this.populateGenreDropDown(products);
      } else {
        throw new Error("Invalid product data");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  processProducts(products) {
    this.productGrid.innerHTML = "";
    products.forEach((product) => {
      const card = this.createProductCard(product);
      this.productGrid.appendChild(card);
    });
  }

  createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("card-title");
    const cardTitle = document.createElement("h3");
    cardTitle.innerText = product.title;
    titleContainer.appendChild(cardTitle);
    card.appendChild(titleContainer);

    const cardImageContainer = document.createElement("div");
    cardImageContainer.classList.add("card-image");
    const cardImage = document.createElement("img");
    cardImage.src = product.image.url;
    cardImage.alt = product.image.alt;
    cardImageContainer.appendChild(cardImage);
    card.appendChild(cardImageContainer);

    const cardInfoContainer = document.createElement("div");
    cardInfoContainer.classList.add("card-info");
    const cardPrice = document.createElement("p");
    cardPrice.innerText = `${product.price} $`;
    cardInfoContainer.appendChild(cardPrice);
    card.appendChild(cardInfoContainer);

    const cardButtonContainer = document.createElement("div");
    cardButtonContainer.classList.add("card-button");
    const cardButton = document.createElement("a");
    cardButton.classList.add("card-text");
    cardButton.href = "#";
    cardButton.setAttribute("data-id", product.id);
    cardButton.innerText = "Add to cart";
    cardButtonContainer.appendChild(cardButton);
    card.appendChild(cardButtonContainer);

    return card;
  }

  populateGenreDropDown(products) {
    this.genreFilter.innerHTML = "";
    const defaultOption = this.createOption("Genre", "Genre", true, true);
    this.genreFilter.appendChild(defaultOption);

    const genres = [...new Set(products.map((product) => product.genre))];
    genres.forEach((genre) => {
      const option = this.createOption(genre, genre);
      this.genreFilter.appendChild(option);
    });
  }

  createOption(value, text, disabled = false, selected = false) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    if (disabled) option.setAttribute("disabled", true);
    if (selected) option.setAttribute("selected", true);
    return option;
  }

  sortProducts(sortBy) {
    const sortedProducts = [...this.products];
    switch (sortBy) {
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "popularity":
        sortedProducts.sort((a, b) => b.favorite - a.favorite);
        break;
      case "release":
        sortedProducts.sort((a, b) => parseInt(b.released) - parseInt(a.released));
        break;
      default:
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    this.processProducts(sortedProducts);
  }
}
