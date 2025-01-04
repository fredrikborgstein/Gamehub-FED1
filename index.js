import databaseManager from "./modules/databaseManager.mjs";
import HomePage from "./modules/homePage.mjs";
import RegisterPage from "./modules/registerPage.mjs";
import header from "./modules/header.mjs";
import footer from "./modules/footer.mjs";
import LoginPage from "./modules/loginPage.mjs";

const db = new databaseManager();
const route = window.location.pathname;
const pathDepth = window.location.pathname.split("/").length - 2;
const pathPrefix = "../".repeat(pathDepth);

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
    const loginPage = new LoginPage(db);
  }
});
