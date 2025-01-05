export default function header() {
    const header = document.createElement("header");
    const isAuth = sessionStorage.getItem("auth");
    const user = JSON.parse(sessionStorage.getItem("user")) || { user: "Guest", avatar: "" };
    const username = user.user;

    const avatar = user.avatar || "/images/avatar.png";

    const logoSection = `
    <div id="logo-section">
      <a href="/index.html" data-route>
        <img
          src="https://utfs.io/f/CPkGyyZpEykHSrBDaTg1MiK5PmvN07cb3g9ZTLJr4zIEFWBs"
          alt="Gamehub logo"
          id="site-logo"
        />
      </a>
    </div>`;

    const mobileMenu = `
    <div id="mobile-menu-container">
      <input type="checkbox" id="menu-toggle" class="menu-checkbox" />
      <label for="menu-toggle" class="menu-toggle-label" aria-label="Toggle menu">
        <i class="fa-solid fa-bars menu-icon"></i>
        <i class="fa-solid fa-xmark close-icon"></i>
      </label>
      <div class="mobile-menu">
        <nav class="mobile-nav">
          <ul>
            <li><a href="/index.html" data-route>Home</a></li>
            <li><a href="/allproducts.html" data-route>All Products</a></li>
            <li><a href="/about.html" data-route>About Us</a></li>
            <li><a href="/contact.html" data-route>Contact Us</a></li>
            <li class="mobile-menu-separator"></li>
            ${
        isAuth
            ? `<li><a href="/profile.html" data-route>${username}</a></li>
                   <li><a href="/checkout/cart-empty.html" data-route>Cart</a></li>
                   <li><a href="#" id="logout">Logout</a></li>`
            : `<li><a href="/login.html" data-route>Login</a></li>
                   <li><a href="/register.html" data-route>Register</a></li>`
    }
          </ul>
        </nav>
      </div>
      <label class="mobile-overlay" for="menu-toggle"><span class="sr-only">Menu overlay</span></label>
    </div>`;

    const mainMenu = `
    <div id="main-nav">
      <nav>
        <ul>
          <li><a href="/index.html" data-route>Home</a></li>
          <li><a href="/allproducts.html" data-route>All Products</a></li>
          <li><a href="/about.html" data-route>About Us</a></li>
          <li><a href="/contact.html" data-route>Contact Us</a></li>
        </ul>
      </nav>
    </div>
    <div id="members-menu">
  ${
        isAuth
            ? `<div id="members-menu-links">
           <ul>
             <li>
               <a href="/profile.html" data-route>
                 <img 
                   src="${avatar}" 
                   alt="${username}'s avatar" 
                   class="user-avatar" 
                   style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;"
                 />
                 ${username}
               </a>
             </li>
             <li><a href="/checkout/cart-empty.html" data-route>Cart</a></li>
             <li><a href="#" id="logout">Logout</a></li>
           </ul>
         </div>`
            : `<div id="members-menu-links">
           <ul>
             <li><a href="/login.html" data-route>Login</a></li>
             <li><a href="/register.html" data-route>Register</a></li>
           </ul>
         </div>`
    }
</div>`;

    header.innerHTML = `
    ${logoSection}
    ${mobileMenu}
    ${mainMenu}
  `;

    if (isAuth) {
        const logoutButton = header.querySelector("#logout");
        if (logoutButton) {
            logoutButton.addEventListener("click", (e) => {
                e.preventDefault();
                sessionStorage.removeItem("auth");
                sessionStorage.removeItem("user");
                window.history.pushState({}, "", "/index.html");
                window.dispatchEvent(new PopStateEvent("popstate"));
            });
        }
    }

    return header;
}
