import {
  databaseManager,
  AuthManager,
  Toaster,
  Modal,
  header,
  footer,
  HomePage,
  RegisterPage as RegisterManager,
  LoginPage as LoginManager,
  ProductPage as ProductClass,
  CustomerManager,
  ProductManager,
  CartManager,
} from "./modules/index.mjs";

import { Home, About, AllProducts, ProductPage, ContactPage, LoginPage, RegisterPage, ProfilePage, TermsOfService, CookiePolicy, LegalNotice } from "./pages/index.js";

const authManager = new AuthManager();
const db = new databaseManager(authManager);
const appContainer = document.getElementById("app");
const mainContainer = document.createElement("main");
mainContainer.id = "main-content";
appContainer.appendChild(mainContainer);
const sessionId = authManager.generateSessionId();
sessionStorage.setItem("sessionId", sessionId);

const Header = header();
const Footer = footer();
appContainer.insertBefore(Header, mainContainer);
appContainer.appendChild(Footer);

const routes = {
  "/": { render: Home, init: () => new HomePage(), title: "Home" },
  "/index.html": { render: Home, init: () => new HomePage(), title: "Home" },
  "/about.html": { render: About, title: "About Us" },
  "/contact.html": { render: ContactPage, title: "Contact Us" },
  "/allproducts.html": { render: AllProducts, init: () => new ProductManager(), title: "All Products" },
  "/productpage.html": {
    render: ProductPage,
    init: (queryParams) => {
      if (queryParams.has("id")) {
        const productId = queryParams.get("id");
        new ProductClass(productId);
      }
    },
    title: "Product Details",
  },
  "/register.html": { render: RegisterPage, init: () => new RegisterManager(db), title: "Register" },
  "/login.html": { render: LoginPage, init: () => new LoginManager(db, authManager), title: "Login" },
  "/profile.html": { render: ProfilePage, init: () => new CustomerManager(db), title: "Profile" },
  "/legal/legalnotice.html": { render: LegalNotice, title: "Legal Notice" },
  '/legal/termsofservice.html': { render: TermsOfService, title: "Terms of Service" },
  '/legal/cookiepolicy.html': { render: CookiePolicy, title: "CookiePolicy" },
};

document.addEventListener("DOMContentLoaded", () => {
  preloadCss(["index.css", "about.css", "allproducts.css"]);
  routeHandler(window.location.pathname + window.location.search);
});

function navigateTo(path) {
  if (path !== window.location.pathname + window.location.search) {
    window.history.pushState({}, "", path);
    routeHandler(path);
  }
}

function routeHandler(fullPath) {
  const [basePath, queryString] = fullPath.split("?");
  const route = routes[basePath] || routes["/"];

  if (route) {
    mainContainer.style.opacity = 0;

    setTimeout(() => {
      const pageContent = route.render ? route.render() : "";

      mainContainer.innerHTML = pageContent;
      loadCss(getCssFile(basePath));

      if (route.init) {
        const queryParams = new URLSearchParams(queryString);
        route.init(queryParams);
      }

      if (route.title) {
        document.title = route.title;
      }

      mainContainer.style.opacity = 1;
    }, 100);
  } else {
    mainContainer.innerHTML = `<h1>404 - Page Not Found</h1>`;
    document.title = "404 - Page Not Found";
  }
}

function loadCss(file) {
  if (!file) return;

  try {
    const existingLink = document.querySelector(`link[data-route-css]`);
    if (existingLink) {
      existingLink.href = `/CSS/${file}`;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.href = `/CSS/${file}`;
      newLink.setAttribute("data-route-css", "true");
      document.head.appendChild(newLink);
    }
  } catch (error) {
    console.error(`Failed to load CSS file: /CSS/${file}`, error);
  }
}


function getCssFile(path) {
  const cssMapping = {
    "/": "index.css",
    "/index.html": "index.css",
    "/about.html": "about.css",
    "/contact.html": "contact.css",
    "/allproducts.html": "allproducts.css",
    "/productpage.html": "productpage.css",
    "/register.html": "register.css",
    "/login.html": "register.css",
    "/profile.html": "profile.css",
    "/legal/legalnotice.html": "legalnotice.css",
    "/legal/termsofservice.html": "legalnotice.css",
    "/legal/cookiepolicy.html": "legalnotice.css",
  };
  return cssMapping[path];
}

function preloadCss(files) {
  files.forEach((file) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = `css/${file}`;
    document.head.appendChild(link);
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-route]");
  if (link) {
    event.preventDefault();
    const targetPath = link.getAttribute("href");
    navigateTo(targetPath);
  }
});

window.addEventListener("popstate", () => {
  routeHandler(window.location.pathname + window.location.search);
});
