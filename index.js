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

import { Home, About, AllProducts, ProductPage, ContactPage, LoginPage, RegisterPage, ProfilePage } from "./pages/index.js";

const authManager = new AuthManager();
const db = new databaseManager(authManager);
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
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
  "/": { render: Home, init: () => new HomePage() },
  "/index.html": { render: Home, init: () => new HomePage() },
  "/about.html": { render: About },
  "/contact.html": { render: ContactPage },
  "/allproducts.html": { render: AllProducts, init: () => new ProductManager() },
  "/productpage.html": {
    render: ProductPage,
    init: () => {
      if (params.has("id")) {
        const productId = params.get("id");
        new ProductClass(productId);
      }
    },
  },
  "/register.html": { render: RegisterPage, init: () => new RegisterManager(db) },
  "/login.html": { render: LoginPage, init: () => new LoginManager(db, authManager) },
  "/profile.html": { render: ProfilePage, init: () => new CustomerManager(db) },
};

document.addEventListener("DOMContentLoaded", () => {
  preloadCss(["index.css", "about.css", "allproducts.css"]);
  routeHandler(window.location.pathname);
});

function navigateTo(path) {
  if (path !== window.location.pathname) {
    window.history.pushState({}, "", path);
    routeHandler(path);
  }
}

function routeHandler(path) {
  const basePath = path.split("?")[0];
  const route = routes[basePath] || routes["/"];

  if (route) {
    mainContainer.style.opacity = 0;

    setTimeout(() => {
      const pageContent = route.render ? route.render() : "";

      mainContainer.innerHTML = pageContent;
      loadCss(getCssFile(basePath));
      if (route.init) route.init();

      mainContainer.style.opacity = 1;
    }, 100);
  } else {
    mainContainer.innerHTML = `<h1>404 - Page Not Found</h1>`;
  }
}

function loadCss(file) {
  if (!file) return;

  try {
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
  } catch (error) {
    console.error(`Failed to load CSS file: css/${file}`, error);
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
  routeHandler(window.location.pathname);
});
