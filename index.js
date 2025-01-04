import databaseManager from "./modules/databaseManager.mjs";
import HomePage from "./modules/homePage.mjs";
import RegisterPage from "./modules/registerPage.mjs";

const db = new databaseManager();
const route = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
  if (route === "/" || route === "/index.html") {
    const homePage = new HomePage();
  } else if (route === "/register.html") {
    const registerPage = new RegisterPage(db);
  }
});
