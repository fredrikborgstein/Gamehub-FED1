export default function CheckoutPage() {
    return (
        `
        <div>
      <section id="checkout-heading">
        <h1>Checkout</h1>
      </section>
      <section id="checkout-information">
        <div id="checkout-form">
          <div id="shipping-form-heading">
            <h2>Shipping And Billing Information</h2>
          </div>
          <div id="shipping-select">
            <button class="active" type="button">
              <i class="fa-regular fa-circle-check"></i>Normal
            </button>
            <button type="button">
              <i class="fa-regular fa-circle"></i>Express
            </button>
          </div>
          <div id="shipping-form">
            <form action="#" method="post">
              <div class="form-group">
                <label for="full-name">Full name</label>
                <input type="text" id="full-name" name="full-name" required />
              </div>
              <div class="form-group">
                <label for="email-address">Email</label>
                <input type="email" id="email-address" name="email" required />
              </div>
              <div class="form-group">
                <label for="phone-number">Phone</label>
                <input type="tel" id="phone-number" name="phone" required />
              </div>
              <div class="form-group">
                <label for="street-address">Address</label>
                <input
                  type="text"
                  id="street-address"
                  name="address"
                  required
                />
              </div>
              <div id="city-zip-code">
                <div class="label-group">
                  <label for="city-input">City</label>
                  <label for="zip-code">Zip</label>
                </div>
                <div class="input-group">
                  <input type="text" id="city-input" name="city" required />
                  <input type="text" id="zip-code" name="zip" required />
                </div>
              </div>
              <div class="form-group" id="terms-group">
                <input type="checkbox" id="terms" name="terms" value="terms" />
                <label for="terms"
                  >I have read and accept the
                  <a href="../legal/termsofservice.html"
                    >Terms & Conditions</a
                  ></label
                >
              </div>
            </form>
          </div>
        </div>
        <div id="checkout-summary">
          <div id="summary-heading">
            <h2>Cart Summary</h2>
          </div>
          <div class="wrapper">
            <div id="summary-img">
              <img src="../images/GameHubcovers.webp" alt="Product Image" />
            </div>
            <div id="summary-details">
              <p>1 x Ping Pong Championship - Playbox</p>
              <p>Price per item: 19.90 $ incl VAT</p>
            </div>
          </div>
          <div id="summary-price">
            <p>Total: 19.90 $ incl VAT</p>
          </div>
          <div id="summary-btn" class="btn-div">
            <a class="btn checkout-btn" href="./checkout-success.html">
              Pay now
            </a>
          </div>
        </div>
      </section>
    </div>
        `
    )
}