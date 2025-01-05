export default function ProductPage() {
    return (
        `
        <div>
      <!-- PRODUCT INFO SECTION -->
      <section id="product-info">
        <div id="image-section">
          <img id="product-image"
            src=""
            alt=""
          />
        </div>
        <div id="product-details">
          <div id="product-title"><h1 id="page-title"></h1></div>

          <div id="product-description">
            <p id="product-desc">

            </p>
          </div>
          <div id="product-purchase">
            <p id="product-price"></p>
            <a
              id="purchase-button"
              class="purchase-button"
              href="#"
            >
              Add to cart <i class="fa-solid fa-cart-shopping"></i>
            </a>
          </div>
        </div>
      </section>
      <!-- FEATURED SECTION -->
      <section id="featured">
        <div id="featured-heading">
          <h2>You may also like</h2>
        </div>
        <div id="featured-grid">
          <div class="card">
            <div class="card-title">
              <h3>Super Duper</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers2.webp"
                alt="The cover of the Playbox game Super Duper"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£12.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Forge Legend</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers10.webp"
                alt="The cover of the Playbox game Forge Legend"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£39.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Furious</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers4.webp"
                alt="The cover of the Playbox game Furious"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£29.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <h3>Boxer</h3>
            </div>
            <div class="card-image">
              <img
                src="/Images/GameHubcovers8.webp"
                alt="The cover of the Playbox game Boxer"
              />
            </div>
            <div class="card-info">
              <p>Playbox</p>
              <p>£22.99</p>
            </div>
            <div class="card-button">
              <a href="#" class="card-text">Add to Cart</a>
            </div>
          </div>
        </div>
      </section>
    </div>
        `
    )
}