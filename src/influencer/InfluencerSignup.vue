<template>
  <div class="container mt-5">
    <form @submit.prevent="signup" class="border p-4 bg-light rounded">
      <h2 class="mb-4">Influencer Signup</h2>
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
        <label for="name">Enter Name</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input
          type="text"
          v-model="category"
          id="category"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="niche">Niche</label>
        <input
          type="text"
          v-model="niche"
          id="niche"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="reach">Reach</label>
        <input
          type="text"
          v-model="reach"
          id="reach"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label>Select your platforms of interest:</label><br />
        <div
          class="form-check form-check-inline"
          v-for="platform in platforms"
          :key="platform"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="platform"
            :value="platform"
            v-model="selectedPlatforms"
          />
          <label class="form-check-label" :for="platform">{{ platform }}</label>
        </div>
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
      name: "",
      category: "",
      niche: "",
      reach: "",
      selectedPlatforms: [],
      platforms: ["youtube", "instagram", "snapchat"],
      message: null,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post(
          "http://localhost:5100/api/signup_infl",
          {
            username: this.username,
            password: this.password,
            name: this.name,
            category: this.category,
            niche: this.niche,
            reach: parseInt(this.reach),
            platforms: this.selectedPlatforms.join(","),
          }
        );
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
