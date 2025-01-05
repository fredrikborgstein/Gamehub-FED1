export default class ProductManager {
  constructor() {
    this.baseApiUrl = "https://v2.api.noroff.dev/";
    this.genreFilter = document.getElementById("genre");
    this.sortBy = document.getElementById("sortby");
    this.searchBox = document.getElementById("search");
    this.productGrid = document.getElementById("product-grid");
    this.products = [];
    this.filteredProducts = [];
    this.cacheKey = "productsCache";
    this.cacheExpiration = 60 * 60 * 1000;

    this.registerEvents();
    this.getAllProducts();
  }

  registerEvents() {
    this.genreFilter.addEventListener("change", (e) => {
      e.preventDefault();
      console.log('hello');
      const selectedGenre = e.target.value;

      if (selectedGenre === "All") {
        this.filteredProducts = [...this.products];
      } else {
        this.filteredProducts = this.products.filter(
            product => product.genre === selectedGenre
        );
      }

      this.processProducts(this.filteredProducts);
    });

    this.sortBy.addEventListener("change", (e) => {
      e.preventDefault();
      this.sortProducts(e.target.value, this.filteredProducts);
    });

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      this.showDropdownSuggestions(query, this.filteredProducts);
    });

    const clearFilterBtn = document.getElementById("clear-filter");
    clearFilterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.clearFilters();
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
            this.filteredProducts = [...this.products];
            this.sortProducts("name", this.filteredProducts);
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
        this.filteredProducts = [...this.products];
        this.sortProducts("name", this.filteredProducts);
        this.populateGenreDropDown(products);
      } else {
        throw new Error("Invalid product data");
      }
    } catch (error) {
    }
  }


  processProducts(products) {
    this.productGrid.innerHTML = "";
    products.forEach((product) => {
      const card = this.createProductCard(product);
      this.productGrid.appendChild(card);
    });
    this.addButtonEventListeners();
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

    const allOption = this.createOption("All", "All", false, true);
    this.genreFilter.appendChild(allOption);

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

  sortProducts(sortBy, products) {
    const sortedProducts = [...products];
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
      case "name":
      default:
        sortedProducts.sort((a, b) => {
          const nameA = a.title.trim().toLowerCase();
          const nameB = b.title.trim().toLowerCase();
          return nameA.localeCompare(nameB);
        });
        break;
    }

    this.processProducts(sortedProducts);
  }


  addButtonEventListeners() {
    const productBtns = document.getElementsByClassName("card-text");
    for (const btn of productBtns) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.dataset.id;

        if (productId) {
          window.location.href = `/productpage.html?id=${productId}`;
        } else {
        }
      });
    }
  }

  showDropdownSuggestions(query, products) {
    let dropdown = document.getElementById("search-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.id = "search-dropdown";
      dropdown.style.position = "absolute";
      dropdown.style.backgroundColor = "#fff";
      dropdown.style.border = "1px solid #ccc";
      dropdown.style.width = "200px";
      document.getElementById("search").parentElement.appendChild(dropdown);
    }
    dropdown.innerHTML = "";

    if (!query.trim()) {
      dropdown.style.display = "none";
      return;
    }

    const matches = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    matches.forEach(product => {
      const suggestion = document.createElement("div");
      suggestion.textContent = product.title;
      suggestion.style.padding = "8px";
      suggestion.style.cursor = "pointer";

      suggestion.addEventListener("click", () => {
        window.location.href = `/productpage.html?id=${product.id}`;
      });

      dropdown.appendChild(suggestion);
    });

    dropdown.style.display = matches.length > 0 ? "block" : "none";
  }

  clearFilters() {
    this.genreFilter.value = "All";
    this.sortBy.value = "name";
    this.searchBox.value = "";

    this.filteredProducts = [...this.products];

    const dropdown = document.getElementById("search-dropdown");
    if (dropdown) dropdown.innerHTML = "";

    this.processProducts(this.products);
  }



}
