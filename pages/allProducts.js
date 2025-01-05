export default function AllProducts() {
    return (
        `
        <div>
      <!-- TITLE SECTION -->
      <section id="title-section">
        <h1>All Products</h1>
      </section>
      <!-- FILTER SECTION -->
      <section id="filter-section">
        <h2>Filter</h2>
        <div id="filters">
          <style>
            #search {
              padding: 8px;
            }
            #clear-filter {
              padding: 8px;
            }
          </style>
          <label for="search">Search:</label>
          <input id="search" name="search" type="search" />
          <label for="genre">Genre:</label>
          <select name="genre" id="genre">
            <option value="Genre" disabled selected>Genre</option>
          </select>
          <label for="sortby">Sort By:</label>
          <select name="sortby" id="sortby">
            <option value="Sortby" disabled selected>Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <option value="release">Release Date</option>
          </select>
          <a class="btn" href="#" id="clear-filter">Clear Filter</a>
        </div>
      </section>
      <section id="product-grid">
      </section>
    </div>
        `
    )
}