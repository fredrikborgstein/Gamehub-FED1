export default function RegisterPage() {
    return (
        `
        <div>
      <h1>Register</h1>

      <section>
        <form action="#" method="post" id="register-form">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm your password"
            required
          />
          <a href="#" class="btn" id="register-btn">Register</a>
        </form>
      </section>
    </div>
        `
    )
}