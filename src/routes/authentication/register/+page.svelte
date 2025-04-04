<script lang="ts">
    export let form: any;
  </script>
  
  <style>
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
      background: #f0f2f5;
    }
  
    .auth-box {
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 24px;
      margin-bottom: 1.5rem;
      text-align: center;
      color: black;
    }
  
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
    }
  
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #1877f2;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
    }
  
    button:hover {
      background-color: #155ecb;
    }
  
    p {
      color: red;
      margin-top: 0.5rem;
      text-align: center;
    }
  
    .link-to-login {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
  
    .link-to-login a {
      color: #1877f2;
      text-decoration: none;
    }
  
    .link-to-login a:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="auth-container">
    <form method="POST" class="auth-box">
      <h1>Register</h1>
  
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
  
      <button type="submit">Register</button>
  
      {#if form?.message}
        <p>{form.message}</p>
      {/if}
  
      <div class="link-to-login">
        Sudah punya akun? <a href="/authentication/login">Login di sini</a>
      </div>
    </form>
  </div>
  