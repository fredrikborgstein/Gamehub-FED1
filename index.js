import {
  databaseManager,
  AuthManager,
  Toaster,
  Modal,
  header,
  footer,
  HomePage,
  RegisterPage,
  LoginPage,
  ProductPage as ProductClass,
  CustomerManager,
  ProductManager,
  CartManager,
} from "./modules/index.mjs";

import { Home, About, AllProducts, ProductPage } from "./pages/index.js";

const authManager = new AuthManager();
const db = new databaseManager(authManager);
const url = new URL(window.location.href);
const route = url.pathname;
const params = new URLSearchParams(url.search);
const pathDepth = window.location.pathname.split("/").length - 2;
const pathPrefix = "../".repeat(pathDepth);
const sessionId = authManager.generateSessionId();
const appContainer = document.getElementById("app");
sessionStorage.setItem("sessionId", sessionId);

const routes = {
  "/": Home,
  "/index.html": Home,
  "/about.html": About,
  "/productpage.html": ProductPage,
  // "/contact.html": Contact,
  "/allproducts.html": AllProducts,
  // "/checkout/cart-empty.html": CheckoutCartEmpty,
};

document.addEventListener("DOMContentLoaded", () => {
  routeHandler(window.location.pathname);
});

function navigateTo(path) {
  window.history.pushState({}, "", path);
  routeHandler(path);
}

function routeHandler(path) {
  const renderPage = routes[path];
  if (renderPage) {
    const Header = header();
    const Footer = footer();
    const pageContent = renderPage();
    appContainer.innerHTML = "";
    appContainer.appendChild(Header);
    const main = document.createElement("main");
    main.innerHTML = pageContent;
    appContainer.appendChild(main);
    appContainer.appendChild(Footer);
    loadCss(getCssFile(path));
    initPageClasses(path);
  } else {
    appContainer.innerHTML = `<h1>404 - Page Not Found</h1>`;
  }
}

function loadCss(file) {
  if (!file) return;

  const existingLink = document.querySelector(`link[data-route-css]`);
  if (existingLink) {
    existingLink.href = `css/${file}`;
  } else {
    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.href = `css/${file}`;
    newLink.setAttribute("data-route-css", "true");
    document.head.appendChild(newLink);
  }
}

function getCssFile(path) {
  const cssMapping = {
    "/": "index.css",
    "/index.html": "index.css",
    "/about.html": "about.css",
    "/contact.html": "contact.css",
    "/allproducts.html": "allproducts.css",
    "/checkout/cart-empty.html": "cart.css",
    "/productpage.html": "productpage.css",
  };
  return cssMapping[path];
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
  routeHandler(window.location.pathname);
});

function initPageClasses(path) {
  const routes = {
    "/": () => new HomePage(),
    "/index.html": () => new HomePage(),
    "/register.html": () => new RegisterPage(db),
    "/login.html": () => new LoginPage(db, authManager),
    "/profile.html": () => new CustomerManager(db),
    "/allproducts.html": () => new ProductManager(),
    "/productpage.html": () => {
      if (params.has("id")) {
        const productId = params.get("id");
        new ProductClass(productId);
      }
    },
  };

  if (routes[route]) {
    routes[route]();
  }
}