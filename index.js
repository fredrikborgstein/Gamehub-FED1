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
  ProductPage,
  CustomerManager,
  ProductManager,
  CartManager,
} from "./modules/index.mjs";

import { Home } from "./pages/index.js";

const authManager = new AuthManager();
const db = new databaseManager(authManager);
const url = new URL(window.location.href);
const route = url.pathname;
const params = new URLSearchParams(url.search);
const pathDepth = window.location.pathname.split("/").length - 2;
const pathPrefix = "../".repeat(pathDepth);
const sessionId = authManager.generateSessionId();
sessionStorage.setItem("sessionId", sessionId);

document.addEventListener("DOMContentLoaded", () => {
  const headerElement = header(pathDepth, pathPrefix);
  document.body.insertBefore(headerElement, document.body.firstChild);
  const footerElement = footer(pathDepth, pathPrefix);
  document.body.appendChild(footerElement);

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
        new ProductPage(productId);
      }
    },
  };

  if (routes[route]) {
    routes[route]();
  }

});
