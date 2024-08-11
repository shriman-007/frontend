<template>
  <div class="container mt-5">
    <form @submit.prevent="signup" class="border p-4 bg-light rounded">
      <h2 class="mb-4">Sponsor Signup</h2>
      <div class="form-group">
        <label for="username">Enter Username</label>
        <input
          type="text"
          v-model="username"
          id="username"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="company_name">Enter Company Name</label>
        <input
          type="text"
          v-model="companyName"
          id="company_name"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="industry">Enter Industry</label>
        <input
          type="text"
          v-model="industry"
          id="industry"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="budget">Enter Budget</label>
        <input
          type="text"
          v-model="budget"
          id="budget"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
      <div v-if="message" :class="`alert mt-3 ${message.type}`">
        {{ message.text }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      companyName: "",
      industry: "",
      budget: "",
      message: null,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post("http://localhost:5100/api/signup", {
          username: this.username,
          password: this.password,
          company_name: this.companyName,
          industry: this.industry,
          budget: parseFloat(this.budget),
        });
        if (response.data.success) {
          this.message = {
            text: "Signup successful! Please log in.",
            type: "alert-success",
          };
          this.$router.push({ name: "UserLogin" });
        } else {
          this.message = { text: response.data.message, type: "alert-danger" };
        }
      } catch (error) {
        console.error("Signup error:", error);
        this.message = {
          text: "An error occurred during signup.",
          type: "alert-danger",
        };
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
