<template>
  <div class="bg-light d-flex justify-content-center align-items-center vh-100">
    <div class="container">
      <div
        v-if="message"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {{ message }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="text-center mb-4">Admin Login</h2>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    v-model="username"
                    id="username"
                    name="username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    id="password"
                    name="password"
                    class="form-control"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminLogin",
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5100/api/admin_login",
          {
            username: this.username,
            password: this.password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Ensure proper headers and credentials
          }
        );
        if (response.data.success) {
          this.$router.push({ name: "AdminDashboard" });
        } else {
          this.message = response.data.message;
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response && error.response.data) {
          this.message =
            error.response.data.message ||
            "An error occurred while trying to log in.";
        } else {
          this.message = "An error occurred while trying to log in.";
        }
      }
    },
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa !important;
}

.vh-100 {
  min-height: 100vh;
}

.alert {
  margin-bottom: 20px;
}

.card {
  margin-top: 20px;
}
</style>
