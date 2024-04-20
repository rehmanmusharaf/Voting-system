import React from "react";
import "./AdminLogin.css";

function AdminLogin() {
  return (
    <>
      <div class="content">
        <main>
          <div class="intro">
            <form>
              <label for="admin-id">Email Id:</label>
              <input type="email" id="admin-id" placeholder="Email" />
              <label for="password">Password:</label>
              <input type="password" id="password" placeholder="Password" />
              <input type="submit" />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLogin;
