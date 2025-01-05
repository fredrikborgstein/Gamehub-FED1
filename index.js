import databaseManager from "./modules/databaseManager.mjs";
import HomePage from "./modules/homePage.mjs";
import RegisterPage from "./modules/registerPage.mjs";
import header from "./modules/header.mjs";
import footer from "./modules/footer.mjs";
import LoginPage from "./modules/loginPage.mjs";
import AuthManager from "./modules/authManager.mjs";
import Toaster from "./modules/toast.mjs";
import Modal from "./modules/modal.mjs";
import CustomerManager from "./modules/customerManager.mjs";
import ProductManager from "./modules/productManager.mjs";
import ProductPage from "./modules/productPage.mjs";

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

  if (route === "/" || route === "/index.html") {
    const homePage = new HomePage();
  } else if (route === "/register.html") {
    const registerPage = new RegisterPage(db);
  } else if (route === "/login.html") {
    const loginPage = new LoginPage(db, authManager);
  } else if (route === "/profile.html") {
    const customerManager = new CustomerManager(db);
  } else if(route === "/allproducts.html") {
    const productManager = new ProductManager();
  } else if (route === "/productpage.html" && params.has("id")) {
    const productId = params.get("id");
    const productPage = new ProductPage(productId);
  } else {
    console.error("Unknown route:", route);
  }
});
