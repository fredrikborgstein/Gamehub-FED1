export default class LoginPage {
  constructor(databaseManager) {
    this.db = databaseManager;
    this.registerForm = document.getElementById("login-form");
    this.registerBtn = document.getElementById("login-btn");
    this.registerEvents();
  }

  registerEvents() {
    this.registerBtn.addEventListener("click", async (e) => {
      await this.loginUser();
    });
  }

  async loginUser() {
    const data = new FormData(this.registerForm);

    try {
      if (await this.db.loginUser(data)) {
        console.log("User logged in successfully");
        sessionStorage.setItem("auth", true);
        window.location.href = "./profile.html";
      } else {
        console.error("Error logging in user");
      }
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  }
}
