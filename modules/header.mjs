export default function header(pathDepth, pathPrefix) {
  const header = document.createElement("header");
  const isAuth = sessionStorage.getItem("auth");
  const user = sessionStorage.getItem("user");
  header.innerHTML = `
      <div id="logo-section">
        <a href="/index.html">
          <img
            src="https://utfs.io/f/CPkGyyZpEykHSrBDaTg1MiK5PmvN07cb3g9ZTLJr4zIEFWBs
        "
            alt="Gamehub logo"
            id="site-logo"
          />
        </a>
      </div>
      <div id="mobile-menu-container">
        <input type="checkbox" id="menu-toggle" class="menu-checkbox" />
        <label
          for="menu-toggle"
          class="menu-toggle-label"
          aria-label="Toggle menu"
        >
          <i class="fa-solid fa-bars menu-icon"></i>
          <i class="fa-solid fa-xmark close-icon"></i>
        </label>

        <div class="mobile-menu">
          <nav class="mobile-nav">
            <ul>
              <li><a href="./index.html">Home</a></li>
              <li><a href="./allproducts.html">All Products</a></li>
              <li><a href="./about.html">About Us</a></li>
              <li><a href="./contact.html">Contact Us</a></li>
              <li class="mobile-menu-separator"></li>
              <li><a href="./login.html">Login</a></li>
              <li><a href="./register.html">Register</a></li>
              <li>
                <a href="./checkout/cart-empty.html" class="cart-link">
                  <i class="fa-solid fa-cart-shopping"></i>
                  Cart
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <label class="mobile-overlay" for="menu-toggle"
          ><span class="sr-only">Menu overlay</span></label
        >
      </div>
      <div id="main-nav">
        <nav>
          <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./allproducts.html">All Products</a></li>
            <li><a href="./about.html">About Us</a></li>
            <li><a href="./contact.html">Contact Us</a></li>
          </ul>
        </nav>
      </div>
      <div id="members-menu">
        <div id="shopping-cart">
          <a href="./checkout/cart-empty.html"
            ><i class="fa-solid icon fa-cart-shopping"
              ><span class="sr-only">Link to cart</span></i
            ></a
          >
        </div>
        <div id="members-menu-links">
          <ul>
            <li><a href="./login.html">Login</a></li>
            <li><a href="./register.html">Register</a></li>
          </ul>
        </div>
      </div>
    `;

  return header;
}
