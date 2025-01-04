import databaseManager from "./modules/databaseManager.mjs";
import HomePage from "./modules/homePage.mjs";

const db = new databaseManager();
const route = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
  if (route === "/" || route === "/index.html") {
    const homePage = new HomePage();
  } else if (route === "/register.html") {
    const registerForm = document.getElementById("register-form");
    const registerBtn = document.getElementById("register-btn");

    registerBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const formData = new FormData(registerForm);

      try {
        if (await db.registerUser(formData)) {
          console.log("User registered successfully");
        } else {
          console.error("Error registering user");
        }
      } catch (error) {
        console.error("Error registering user: ", error);
      }
    });
  }
});
