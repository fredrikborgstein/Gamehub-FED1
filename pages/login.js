export default function LoginPage() {
    return (
        `
        <div>
      <h1>Login</h1>
      <section>
        <form action="#" method="post" id="login-form">
          <label for="username">Username:</label>
          <input type="username" name="username" id="username" required />
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" required />
          <a href="#" class="btn" id="login-btn">Login</a>
        </form>
      </section>
    </div>
        `
    )
}