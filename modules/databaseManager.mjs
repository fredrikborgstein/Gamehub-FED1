export default class databaseManager {
  constructor() {
    this.dbPromise = this.initDb();
  }

  initDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("gamehub", 2);

      request.onerror = (event) => {
        console.error("Database error: " + event.target.errorCode);
        reject(event.target.errorCode);
      };

      request.onsuccess = (event) => {
        console.log("Database opened successfully");
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "username" });
        }
        if (!db.objectStoreNames.contains("cart")) {
          db.createObjectStore("cart", { keyPath: "cart" });
        }
      };
    });
  }

  async registerUser(data) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      const username = data.get("username");
      const email = data.get("email");
      const password = data.get("password");

      const request = store.add({ username, email, password });

      request.onsuccess = () => {
        console.log("User registered successfully");
        resolve(true);
      };

      request.onerror = (event) => {
        console.error("Error registering user: " + event.target.errorCode);
        reject(false);
      };
    });
  }

  async checkUsernameAvailability(username) {
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");
        const request = store.get(username);

        request.onsuccess = () => {
          resolve(!request.result);
        };

        request.onerror = (event) => {
          console.error(
            "Error checking username availability: " + event.target.errorCode
          );
          reject(new Error("Database error occurred while checking username."));
        };

        transaction.oncomplete = () => {
          console.log("Transaction completed for username check.");
        };

        transaction.onabort = () => {
          console.warn("Transaction aborted for username check.");
          reject(new Error("Transaction aborted during username check."));
        };
      });
    } catch (error) {
      console.error("Unexpected error in checkUsernameAvailability:", error);
      throw new Error("Unexpected error occurred while checking username.");
    }
  }

  loginUser(data) {
    return new Promise(async (resolve, reject) => {
      const db = await this.dbPromise;
      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      const username = data.get("username");
      const password = data.get("password");
      const request = store.get(username);

      request.onsuccess = () => {
        const user = request.result;

        if (user && user.password === password) {
          const userSession = JSON.stringify({
            user: username,
            email: user.email,
          });
          console.log("User logged in successfully");
          sessionStorage.setItem("user", userSession);
          resolve(true);
        } else {
          console.error("Incorrect password");
          resolve(false);
        }
      };

      request.onerror = (event) => {
        console.error("Error logging in user: " + event.target.errorCode);
        reject(false);
      };
    });
  }
}
