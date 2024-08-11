<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand">Influencer Dashboard</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="'/influencer'">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/find">Find</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/stats">Stats</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container my-5 pt-5">
      <h1>Influencer Profile</h1>
      <div class="profile-info">
        <img
          :src="profile.profile_picture"
          alt="Profile Picture"
          class="profile-picture"
        />
        <div class="profile-details">
          <h2>{{ profile.name }}</h2>
          <p>Username: {{ profile.username }}</p>
          <p>Category: {{ profile.category }}</p>
          <p>Niche: {{ profile.niche }}</p>
          <p>Reach: {{ profile.reach }}</p>
          <p>Platforms: {{ profile.platforms.join(", ") }}</p>
          <button
            @click="showUpdateProfileModal = true"
            class="btn btn-primary"
          >
            Update Profile
          </button>
        </div>
      </div>

      <div v-if="sponsorRequests.length">
        <h2>Incoming Requests</h2>
        <div class="requests-container">
          <div
            v-for="request in sponsorRequests"
            :key="request.id"
            class="request-box"
          >
            <h3>Ad Name: {{ request.ad_name }}</h3>
            <p>Description: {{ request.description }}</p>
            <p>Budget: {{ request.budget }}</p>
            <p>Status: {{ request.status }}</p>
            <p>
              Renegotiated Budget:
              {{ request.renegotiated_budget || "Not renegotiated" }}
            </p>
            <p>Sponsor: {{ request.sponsor_name }}</p>
            <button
              @click="handleRequest(request.id, 'reject')"
              class="btn btn-danger"
            >
              Reject
            </button>
            <button
              @click="
                showRenegotiateModal = true;
                currentRequest = request;
              "
              class="btn btn-warning"
            >
              Renegotiate
            </button>
            <button
              @click="handleRequest(request.id, 'accept')"
              class="btn btn-success"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      <div v-if="adRequests.length">
        <h2>Ad Requests History</h2>
        <div class="requests-container">
          <div
            v-for="request in adRequests"
            :key="request.id"
            class="request-box"
          >
            <h3>Ad Name: {{ request.ad_name }}</h3>
            <p>Description: {{ request.description }}</p>
            <p>Budget: {{ request.budget }}</p>
            <p>Status: {{ request.status }}</p>
            <p>
              Renegotiated Budget:
              {{ request.renegotiated_budget || "Not renegotiated" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Profile Modal -->
    <div v-if="showUpdateProfileModal" class="modal">
      <div class="modal-content">
        <h2>Update Profile</h2>
        <form @submit.prevent="updateProfile">
          <label>Name:</label>
          <input type="text" v-model="profile.name" />
          <label>Category:</label>
          <input type="text" v-model="profile.category" />
          <label>Niche:</label>
          <input type="text" v-model="profile.niche" />
          <label>Reach:</label>
          <input type="text" v-model="profile.reach" />
          <label>Platforms:</label>
          <input type="text" v-model="profile.platforms" />
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            @click="showUpdateProfileModal = false"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <!-- Renegotiate Modal -->
    <div v-if="showRenegotiateModal" class="modal">
      <div class="modal-content">
        <h2>Renegotiate Request</h2>
        <form @submit.prevent="renegotiateRequest">
          <label>Renegotiated Budget:</label>
          <input type="text" v-model="renegotiatedBudget" />
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            @click="showRenegotiateModal = false"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: null,
      sponsorRequests: [],
      adRequests: [],
      showUpdateProfileModal: false,
      showRenegotiateModal: false,
      currentRequest: null,
      renegotiatedBudget: "",
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      axios
        .get("http://localhost:5100/api/influencer_profile", {
          withCredentials: true,
        })
        .then((response) => {
          this.profile = response.data.profile;
          this.sponsorRequests = response.data.sponsor_requests;
          this.adRequests = response.data.ad_requests_data;
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    },
    updateProfile() {
      axios
        .post(
          "http://localhost:5100/api/influencer_profile/update",
          this.profile,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data.message);
          this.showUpdateProfileModal = false;
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    },
    handleRequest(requestId, action) {
      axios
        .post(
          `http://localhost:5100/api/influencer_profile/request/${requestId}/action`,
          { action },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data.message);
          this.fetchProfile();
        })
        .catch((error) => {
          console.error("Error handling request:", error);
        });
    },
    renegotiateRequest() {
      axios
        .post(
          `http://localhost:5100/api/influencer_profile/request/${this.currentRequest.id}/action`,
          {
            action: "renegotiate",
            renegotiated_budget: this.renegotiatedBudget,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data.message);
          this.showRenegotiateModal = false;
          this.fetchProfile();
        })
        .catch((error) => {
          console.error("Error renegotiating request:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  max-width: 100%;
}

/* Navbar adjustments */
.navbar {
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
}

/* Profile section styles */
.profile-info {
  display: flex;
  align-items: flex-start;
}

.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-details {
  flex: 1;
  text-align: right;
}

/* Requests container styles */
.requests-container {
  display: flex;
  flex-wrap: wrap;
}

.request-box {
  width: 48%;
  margin: 1%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.request-box h3 {
  margin-top: 0;
}

.request-box p {
  margin-bottom: 10px;
}

.btn {
  margin-right: 5px;
}
</style>
