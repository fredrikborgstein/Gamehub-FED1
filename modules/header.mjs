export default function header(pathDepth, pathPrefix) {
  const header = document.createElement("header");
  const isAuth = sessionStorage.getItem("auth");
  const user = JSON.parse(sessionStorage.getItem("user")) || "Guest";
  const username = user.user;

  const adjustedPath = (relativePath) => {
    return `${pathPrefix}${"../".repeat(pathDepth)}${relativePath}`;
  };

  const avatar = user.avatar ? user.avatar : adjustedPath("images/avatar.png");

  const logoSection = `
    <div id="logo-section">
      <a href="${adjustedPath("index.html")}">
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
            <li><a href="${adjustedPath("index.html")}">Home</a></li>
            <li><a href="${adjustedPath(
              "allproducts.html"
            )}">All Products</a></li>
            <li><a href="${adjustedPath("about.html")}">About Us</a></li>
            <li><a href="${adjustedPath("contact.html")}">Contact Us</a></li>
            <li class="mobile-menu-separator"></li>
            ${
              isAuth
                ? `<li><a href="${adjustedPath(
                    "profile.html"
                  )}">${user}</a></li>
                 <li><a href="${adjustedPath(
                   "checkout/cart-empty.html"
                 )}">Cart</a></li>
                 <li><a href="#" id="logout">Logout</a></li>`
                : `<li><a href="${adjustedPath("login.html")}">Login</a></li>
                 <li><a href="${adjustedPath(
                   "register.html"
                 )}">Register</a></li>`
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
          <li><a href="${adjustedPath("index.html")}">Home</a></li>
          <li><a href="${adjustedPath(
            "allproducts.html"
          )}">All Products</a></li>
          <li><a href="${adjustedPath("about.html")}">About Us</a></li>
          <li><a href="${adjustedPath("contact.html")}">Contact Us</a></li>
        </ul>
      </nav>
    </div>
    <div id="members-menu">
  ${
    isAuth
      ? `<div id="members-menu-links">
           <ul>
             <li>
               <a href="${adjustedPath("profile.html")}">
                 <img 
                   src="${avatar}" 
                   alt="${username}'s avatar" 
                   class="user-avatar" 
                   style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;"
                 />
                 ${username}
               </a>
             </li>
             <li><a href="${adjustedPath(
               "checkout/cart-empty.html"
             )}">Cart</a></li>
             <li><a href="#" id="logout">Logout</a></li>
           </ul>
         </div>`
      : `<div id="members-menu-links">
           <ul>
             <li><a href="${adjustedPath("login.html")}">Login</a></li>
             <li><a href="${adjustedPath("register.html")}">Register</a></li>
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
    document.addEventListener("DOMContentLoaded", () => {
      const logoutButton = document.getElementById("logout");
      if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.removeItem("auth");
          sessionStorage.removeItem("user");
          window.location.href = adjustedPath("index.html");
        });
      }
    });
  }

  return header;
}
