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
          @click="message = ''"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="text-center mb-4">User Login</h2>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    v-model="username"
                    id="username"
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
                    class="form-control"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              <div class="mt-4">
                <router-link
                  to="/signup_infl"
                  class="btn btn-outline-secondary btn-block"
                  >Influencer Signup</router-link
                >
                <router-link
                  to="/signup"
                  class="btn btn-outline-secondary btn-block mt-2"
                  >Sponsor Signup</router-link
                >
              </div>
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
          "http://localhost:5100/api/user_login",

          {
            username: this.username,
            password: this.password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          const role = response.data.role;
          if (role === "sponsor") {
            this.$router.push({ name: "SponsorProfile" });
          } else if (role === "influencer") {
            this.$router.push({ name: "InfluencerProfile" });
          }
        } else {
          this.message = response.data.message;
        }
      } catch (error) {
        console.error("Login error:", error);
        this.message = "An error occurred while trying to log in.";
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
