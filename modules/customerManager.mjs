import user from "./utils.mjs";

export default class CustomerManager {
  constructor(databaseManager) {
    this.db = databaseManager;
    const { username, email, avatar } = user();

    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.profileTitle = document.getElementById("profile-title");
    this.profileCard = document.getElementById("profile-card");
    this.orderHistorySection = document.getElementById("profile-orders");
    this.populatePofilePage();
  }

  populatePofilePage() {
    this.setPageTitle();
    this.createProfileCard();
    this.createOrderHistory();
    this.profileTitle.textContent = `${this.username}'s Profile`;
  }

  setPageTitle() {
    document.title = `GameHub - ${this.username}`;
  }

  createProfileCard() {
    this.profileCard.innerHTML = "";
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = this.username;
    this.profileCard.appendChild(cardTitle);

    const cardAvatar = document.createElement("img");
    cardAvatar.src = this.avatar ? this.avatar : "images/avatar.png";
    cardAvatar.alt = this.username + "'s avatar";
    this.profileCard.appendChild(cardAvatar);

    const cardEmail = document.createElement("p");
    cardEmail.textContent = this.email;
    this.profileCard.appendChild(cardEmail);

    const editBtn = document.createElement("a");
    editBtn.href = "#";
    editBtn.textContent = "Edit Profile";
    editBtn.classList.add("btn");
    editBtn.classList.add("edit-profile-btn");
    this.profileCard.appendChild(editBtn);

    editBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.showEditProfileForm();
    });
  }

  async createOrderHistory() {
    this.orderHistorySection.innerHTML = "";
    const orderHistoryTitle = document.createElement("h2");
    orderHistoryTitle.textContent = "Order History";
    this.orderHistorySection.appendChild(orderHistoryTitle);

    const orders = await this.db.getOrdersForUser(this.username);
    if (!orders || orders.length === 0) {
      const noOrdersMessage = document.createElement("p");
      noOrdersMessage.textContent = "No orders found";
      this.orderHistorySection.appendChild(noOrdersMessage);
    } else {
      const orderList = document.createElement("ul");
      orders.forEach((order) => {
        const orderItem = document.createElement("li");
        orderItem.textContent = order;
        orderList.appendChild(orderItem);
      });
      this.orderHistorySection.appendChild(orderList);
    }
  }

  showEditProfileForm() {
    this.profileCard.innerHTML = "";
    const formTitle = document.createElement("h2");
    formTitle.textContent = "Edit Profile";
    this.profileCard.appendChild(formTitle);

    const form = document.createElement("form");
    form.id = "edit-profile-form";
    form.innerHTML = `
    <input type="hidden" id="username" name="username" value="${this.username}">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" value="${this.email}">
      <a class='btn' id='save-btn'>Save</a>
    `;
    this.profileCard.appendChild(form);

    const saveBtn = document.getElementById("save-btn");
    saveBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.saveProfileChanges();
    });
  }

  saveProfileChanges() {
    const form = document.getElementById("edit-profile-form");
    const data = new FormData(form);

    try {
      this.db.editUser(data);
      this.email = data.get("email");
      const newUserData = {
        user: this.username,
        email: this.email,
        sessionId: sessionStorage.getItem("sessionId"),
        expiresAt: Date.now() + 3600 * 1000,
      };
      sessionStorage.setItem("user", JSON.stringify(newUserData));
      this.createProfileCard();
    } catch (error) {
      alert("Error updating profile");
    }
  }
}
