export default class HomePage {
  constructor() {
    this.baseApiUrl = "https://v2.api.noroff.dev/";
    this.newReleasesContainer = document.getElementById(
      "new-releases-cards-container"
    );
    this.popularProductsContainer = document.getElementById(
      "bestsellers-cards-container"
    );
    this.getAllProducts();
    this.registerEvents();
  }

  registerEvents() {
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

  async getAllProducts() {
    const cacheKey = "productsCache";
    const cacheExpiration = 60 * 60 * 1000;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
        const cachedObject = JSON.parse(cachedData);
        const products = cachedObject.data;
        if (!Array.isArray(products)) {
          return;
        }
        const bestSellers = products.slice(0, 3);
        const newReleases = products.slice(3, 6);

        this.processProducts({ bestSellers, newReleases });
        return;
      }
    }

    const response = await fetch(`${this.baseApiUrl}gamehub`);
    const data = await response.json();

    const products = data.data;
    if (!Array.isArray(products)) {
      return;
    }

    const bestSellers = products.slice(0, 3);
    const newReleases = products.slice(3, 6);

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
    this.processProducts({ bestSellers, newReleases });
  }


  processProducts(products) {
    const newReleases = products.newReleases;
    const bestSellers = products.bestSellers;
    this.createHomePageProductCards(newReleases, "releases");
    this.createHomePageProductCards(bestSellers, "bestsellers");
  }

  createHomePageProductCards = (products, element) => {
    products.forEach((product) => {
      const newReleaseCard = document.createElement("div");
      newReleaseCard.classList.add("card");
      newReleaseCard.id = product.id;
      const tags = product.tags;

      const newReleaseCardTitleContainer = document.createElement("div");
      const newReleaseCardTitle = document.createElement("h3");
      newReleaseCardTitle.innerText = product.title;
      newReleaseCardTitleContainer.appendChild(newReleaseCardTitle);
      newReleaseCard.appendChild(newReleaseCardTitleContainer);

      const newReleaseImageContainer = document.createElement("div");
      newReleaseImageContainer.classList.add("card-image");
      const newReleaseCardImage = document.createElement("img");
      newReleaseCardImage.src = product.image.url;
      newReleaseCardImage.alt = product.image.alt;
      newReleaseImageContainer.appendChild(newReleaseCardImage);
      newReleaseCard.appendChild(newReleaseImageContainer);

      const newReleaseCardDescriptionContainer = document.createElement("div");
      newReleaseCardDescriptionContainer.classList.add("card-info");

      const newReleaseCardTags = document.createElement("p");
      tags.forEach((tag) => {
        const newReleaseCardTag = document.createElement("span");
        newReleaseCardTag.classList.add("card-tag");
        newReleaseCardTag.style.fontSize = "0.8rem";
        newReleaseCardTag.innerText = tag + " ";
        newReleaseCardTags.appendChild(newReleaseCardTag);
      });
      newReleaseCardDescriptionContainer.appendChild(newReleaseCardTags);

      const newReleaseCardDescriptionPrice = document.createElement("p");
      newReleaseCardDescriptionPrice.innerText = product.price;
      newReleaseCardDescriptionContainer.appendChild(
        newReleaseCardDescriptionPrice
      );
      newReleaseCard.appendChild(newReleaseCardDescriptionContainer);

      const newReleaseCardButtonContainer = document.createElement("div");
      newReleaseCardButtonContainer.classList.add("card-button");
      const newReleaseCardButton = document.createElement("a");
      newReleaseCardButton.classList.add("card-text");
      newReleaseCardButton.innerText = "View Product";
      newReleaseCardButton.href = `#`;
      newReleaseCardButton.setAttribute("data-id", product.id);
      newReleaseCardButtonContainer.appendChild(newReleaseCardButton);
      newReleaseCard.appendChild(newReleaseCardButtonContainer);

      if (element === 'releases') {
        this.newReleasesContainer.appendChild(newReleaseCard);
      } else if (element === 'bestsellers') {
        this.popularProductsContainer.appendChild(newReleaseCard);
      }

    });
  };
}
