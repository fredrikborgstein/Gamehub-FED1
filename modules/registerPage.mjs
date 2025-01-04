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
    if (!this.validateRegistrationData(data)) {
      console.error("Invalid registration data");
      return;
    }

    try {
      if (await this.db.registerUser(data)) {
        console.log("User registered successfully");
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
