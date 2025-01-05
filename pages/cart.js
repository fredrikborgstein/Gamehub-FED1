export default function Cart() {
    return (
        `
        <div>
      <section id="cart-heading">
        <h1>Shopping Cart</h1>
      </section>
      <section id="cart">
        <!-- CART CONTENT  -->
        <div id="cart-content">
          <div id="cart-product-image">
            <img src="../images/GameHubcovers.webp" alt="Product Image" />
          </div>
          <div id="card-product-description">
            <div id="cart-product-title">
              <h4>Ping Pong Championship - Playbox</h4>
            </div>
            <div id="cart-product-quantity">
              <p>Quantity: 1</p>
            </div>
            <div id="cart-product-price">
              <p>Price: 19.90 $</p>
            </div>
            <div id="cart-product-remove">
              <a href="cart-empty.html"
                ><i class="fa-solid icon fa-trash"></i>Remove item from cart</a
              >
            </div>
          </div>
        </div>
        <!-- END CART CONTENT -->

        <!-- CART SUMMARY -->
        <div id="cart-summary">
          <div id="cart-summary-heading">
            <h3>Cart Summary</h3>
          </div>
          <div id="cart-items">
            <p>1 x Ping Pong Championship - Playbox</p>
            <p>Price per item: 19.90 $ incl VAT</p>
          </div>
          <div id="cart-price">
            <p>Total: 19.90 $</p>
          </div>
          <div id="cart-checkout">
            <!-- TODO: Fix so this dont use JS -->
            <button
              onclick="window.location.href='./checkout.html'"
              id="checkout-btn"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
        <!-- END CART SECTION -->
      </section>
    </div>
        `
    )
}