import { Router, CssLoader } from "./BorgsteinRouter/index.js";

import {
  databaseManager,
  AuthManager,
  Toaster,
  Modal,
  header,
  footer,
  HomePage,
  RegisterPage as RegisterManager,
  LoginPage as LoginManager,
  ProductPage as ProductClass,
  CustomerManager,
  ProductManager,
  CartManager,
} from "./modules/index.mjs";

import {
  Home,
  About,
  AllProducts,
  ProductPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  TermsOfService,
  CookiePolicy,
  LegalNotice,
} from "./pages/index.js";

const authManager = new AuthManager();
const db = new databaseManager(authManager);
const sessionId = authManager.generateSessionId();
sessionStorage.setItem("sessionId", sessionId);

const appContainer = document.getElementById("app");
const Header = header();
const Footer = footer();
appContainer.insertBefore(Header, appContainer.firstChild);
const mainContainer = document.createElement("main");
mainContainer.id = "main-content";
appContainer.appendChild(mainContainer);
appContainer.appendChild(Footer);

const cssLoader = new CssLoader();
cssLoader.preload(["index.css", "about.css", "allproducts.css"]);

const routes = {
  "/": { render: Home, init: () => new HomePage(), title: "Home" },
  "/index.html": { render: Home, init: () => new HomePage(), title: "Home" },
  "/about.html": { render: About, title: "About Us" },
  "/contact.html": { render: ContactPage, title: "Contact Us" },
  "/allproducts.html": { render: AllProducts, init: () => new ProductManager(), title: "All Products" },
  "/productpage.html": {
    render: ProductPage,
    init: (queryParams) => {
      if (queryParams.has("id")) {
        const productId = queryParams.get("id");
        new ProductClass(productId);
      }
    },
    title: "Product Details",
  },
  "/register.html": { render: RegisterPage, init: () => new RegisterManager(db), title: "Register" },
  "/login.html": { render: LoginPage, init: () => new LoginManager(db, authManager), title: "Login" },
  "/profile.html": { render: ProfilePage, init: () => new CustomerManager(db), title: "Profile" },
  "/legal/legalnotice.html": { render: LegalNotice, title: "Legal Notice" },
  "/legal/termsofservice.html": { render: TermsOfService, title: "Terms of Service" },
  "/legal/cookiepolicy.html": { render: CookiePolicy, title: "Cookie Policy" },
};

const cssMapping = {
  "/": "index.css",
  "/index.html": "index.css",
  "/about.html": "about.css",
  "/contact.html": "contact.css",
  "/allproducts.html": "allproducts.css",
  "/productpage.html": "productpage.css",
  "/register.html": "register.css",
  "/login.html": "register.css",
  "/profile.html": "profile.css",
  "/legal/legalnotice.html": "legalnotice.css",
  "/legal/termsofservice.html": "legalnotice.css",
  "/legal/cookiepolicy.html": "legalnotice.css",
};

new Router(routes, "main-content", cssLoader, cssMapping);
