export default class LoginPage {
  constructor(databaseManager, authManager) {
    this.db = databaseManager;
    this.authManager = authManager;
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
        const auth = {
          isAuth: true,
          username: data.get("username"),
          sessionId: sessionStorage.getItem("sessionId"),
          expiresAt: Date.now() + 3600 * 1000,
        };
        sessionStorage.setItem("auth", JSON.stringify(auth));
        window.location.href = "./profile.html";
      } else {
        console.error("Error logging in user");
      }
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  }
}
