export default class registerPage {
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
      if (await db.registerUser(formData)) {
        console.log("User registered successfully");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  }

  validateRegistrationData(data) {
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirm-password");

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
    }

    return true;
  }

  async checkUsernameAvailability(username) {
    const db = await this.db.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["users"], "readonly");
      const store = transaction.objectStore("users");
      const request = store.get(username);

      request.onsuccess = () => {
        if (request.result) {
          resolve(false);
        } else {
          resolve(true);
        }
      };

      request.onerror = (event) => {
        console.error(
          "Error checking username availability: " + event.target.errorCode
        );
        reject(false);
      };
    });
  }
}
