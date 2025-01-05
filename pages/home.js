export default function Home() {
    return (
        `<main>
      <!-- HERO SECTION -->
      <section id="hero-section" class="homepage-section">
        <div id="hero-section-title">
          <h1>50 % DISCOUNT FOR NEW MEMBERS!</h1>
        </div>
        <div id="hero-section-button">
          <a href="./register.html" class="btn hero-section-button">Register</a>
        </div>
      </section>
      <!-- PROMOTIONS SECTION -->
      <section id="promotion-section" class="homepage-section">
        <!-- BESTSELLERS -->
        <div id="bestsellers" class="promotion-card-section">
          <div class="card-section-header">
            <h2>Bestsellers</h2>
          </div>
          <div class="card-section-body" id="bestsellers-cards-container">
            <!-- This section is populated by javascript -->
          </div>
        </div>
        <!-- NEW RELEASES -->
        <div id="new-releases">
          <div class="card-section-header">
            <h2>New Releases</h2>
          </div>
          <div class="card-section-body" id="new-releases-cards-container">
            <!-- This section is populated by javascript -->
          </div>
        </div>
      </section>
      <div id="promotion-section-button">
        <a href="./allproducts.html" class="btn promotion-section-btn">
          Browse All Games
        </a>
      </div>
      <!-- MEMBERS SECTION -->
      <section id="members-info-section">
        <div id="members-section-title">
          <h2>Become a member - enjoy the benefits!</h2>
        </div>
        <div class="members-section-body">
          <div class="members-section-card">
            <div class="members-section-card-title">
              <h3>Free Shipping</h3>
            </div>
            <div class="members-section-card-image">
              <i class="fa-solid fa-truck member-icon"></i>
            </div>
            <div class="members-section-card-info">
              <p>
                Enjoy the convenience of Free Shipping on all your orders as a
                valued member! No matter the size of your purchase, we'll
                deliver your items directly to your doorstep without any extra
                shipping costs. Shop with ease and save more with every order!
              </p>
            </div>
          </div>
          <div class="members-section-card">
            <div class="members-section-card-title">
              <h3>Loyalty Bonus</h3>
            </div>
            <div class="members-section-card-image">
              <i class="fa-solid member-icon fa-credit-card"></i>
            </div>
            <div class="members-section-card-info">
              <p>
                Unlock exclusive rewards with our Loyalty Bonus! As a member,
                you'll earn points with every purchase, which can be redeemed
                for discounts, special offers, or free products. The more you
                shop, the more you save!
              </p>
            </div>
          </div>
          <div class="members-section-card">
            <div class="members-section-card-title">
              <h3>Early Access</h3>
            </div>
            <div class="members-section-card-image">
              <i class="fa-solid member-icon fa-circle-check"></i>
            </div>
            <div class="members-section-card-info">
              <p>
                Be the first to shop with our Early Access benefit! As a member,
                you'll get exclusive access to new products, special sales, and
                limited-time offers before anyone else. Stay ahead of the crowd
                and never miss out on the latest releases!
              </p>
            </div>
          </div>
        </div>
        <div id="members-section-button">
          <a href="./register.html" class="members-section-button-text btn"
            >Become a member</a
          >
        </div>
      </section>
    </main>`
    )
}