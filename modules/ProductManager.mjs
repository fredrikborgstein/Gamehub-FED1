export default class ProductManager {
  constructor() {
    this.baseApiUrl = "https://v2.api.noroff.dev/";
    this.platformFilter = document.getElementById("platform");
    this.getAllProducts();
  }

  registerEvents() {}
  async getAllProducts() {
    const cacheKey = "productsCache";
    const cacheExpiration = 60 * 60 * 1000;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      if (now - parseInt(cachedTimestamp, 10) < cacheExpiration) {
        const products = JSON.parse(cachedData);
        this.processProducts(products);
        return;
      }
    }

    const response = await fetch(`${this.baseApiUrl}gamehub`);
    const products = await response.json();
    const bestSellers = products.data.slice(0, 3);
    const newReleases = products.data.slice(3, 6);

    localStorage.setItem(cacheKey, JSON.stringify(products));
    localStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
    this.processProducts(products);
  }

  processProducts(products) {}

  filterProducts(filter) {}
}
