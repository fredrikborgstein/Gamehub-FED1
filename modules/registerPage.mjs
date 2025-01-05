import {SessionManager} from "./index.mjs";

export default class RegisterPage {
  constructor(databaseManager) {
    this.db = databaseManager;
    this.registerForm = document.getElementById("register-form");
    this.registerBtn = document.getElementById("register-btn");
    this.registerEvents();
  }

  registerEvents() {
    this.registerBtn.addEventListener("click", async (e) => {
      await this.registerUser();
    });
  }

  async registerUser() {
    const data = new FormData(this.registerForm);
    const sessionManager = new SessionManager();

    if (!await this.validateRegistrationData(data)) {
      console.error("Invalid registration data");
      return;
    }

    try {
      if (await this.db.registerUser(data)) {
        const auth = {
          isAuth: true,
          username: data.get("username"),
          sessionId: sessionStorage.getItem("sessionId"),
          expiresAt: Date.now() + 3600 * 1000,
        };
        sessionManager.setSession(auth);
        window.location.href = "./profile.html";
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  }


  async validateRegistrationData(data) {
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");
    const validChars = /^[a-zA-Z0-9]+$/;

    const checkUsernameAvailability = await this.db.checkUsernameAvailability(
      username
    );

    if (!username || !email || !password) {
      return false;
    } else if (password.length < 8) {
      return false;
    } else if (!email.includes("@")) {
      return false;
    } else if (username.length < 3) {
      return;
    } else if (password !== confirmPassword) {
      return false;
    } else if (!validChars.test(username)) {
      return false;
    } else if (!checkUsernameAvailability) {
      return false;
    }

    return true;
  }
}
