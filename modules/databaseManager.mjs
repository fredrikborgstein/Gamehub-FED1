export default class databaseManager {
  constructor(authManager) {
    this.dbPromise = this.initDb();
    this.authManager = authManager;
  }

  initDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("gamehub", 2);

      request.onerror = (event) => {
        reject(event.target.errorCode);
      };

      request.onsuccess = (event) => {
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
        if (!db.objectStoreNames.contains("orders")) {
          db.createObjectStore("orders", { keyPath: "orders" });
        }
      };
    });
  }

  async registerUser(data) {
    try {
      const db = await this.dbPromise;
      const username = data.get("username");
      const email = data.get("email");
      const clearTextPassword = data.get("password");
      const hashedPassword = await this.authManager.generatePasswordHash(
        clearTextPassword
      );

      return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.add({ username, email, hashedPassword });

        request.onsuccess = () => {
          resolve(true);
        };

        request.onerror = (event) => {
          reject(false);
        };
      });
    } catch (error) {
      throw error;
    }
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
          reject(new Error("Database error occurred while checking username."));
        };

        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onabort = () => {
          reject(new Error("Transaction aborted during username check."));
        };
      });
    } catch (error) {
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

        if (user && this.authManager.checkPassword(password, user.password)) {
          const userSession = {
            user: username,
            email: user.email,
            sessionId: sessionStorage.getItem("sessionId"),
            expiresAt: Date.now() + 3600 * 1000,
          };
          sessionStorage.setItem("user", JSON.stringify(userSession));
          resolve(true);
        } else {
          resolve(false);
        }
      };

      request.onerror = (event) => {
        reject(false);
      };
    });
  }

  async getOrdersForUser(username) {
    try {
      const db = await this.dbPromise;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction("orders", "readonly");
        const store = transaction.objectStore("orders");
        const request = store.get(username);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          reject(new Error("Database error occurred while fetching orders."));
        };

        transaction.oncomplete = () => {
          resolve(true);
        };

        transaction.onabort = () => {
          reject(new Error("Transaction aborted during order fetch."));
        };
      });
    } catch (error) {
      throw new Error("Unexpected error occurred while fetching orders.");
    }
  }

  async editUser(data) {
    try {
      const db = await this.dbPromise;
      const username = data.get("username");
      const email = data.get("email");

      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");

      const user = await new Promise((resolve, reject) => {
        const request = store.get(username);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) =>
          reject(new Error("Failed to retrieve user: " + event.target.error));
      });

      if (!user) {
        throw new Error("User not found");
      }

      user.email = email;

      await new Promise((resolve, reject) => {
        const updateRequest = store.put(user);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = (event) =>
          reject(new Error("Failed to update user: " + event.target.error));
      });

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
