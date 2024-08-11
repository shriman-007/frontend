<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand">Sponsor Dashboard</a>
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
            <router-link class="nav-link" to="/sponsor_profile"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/find">Find</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/stats">Stats</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/campaigns"
              >Campaigns</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container my-5 pt-5">
      <h1>Welcome, {{ sponsorProfile.name }}!</h1>
      <div class="profile-actions">
        <button @click="openUpdateProfileModal" class="btn btn-primary">
          Update Profile
        </button>
        <button @click="downloadCSV" class="btn btn-secondary">
          Download Campaigns as CSV
        </button>
      </div>

      <!-- Active Campaigns -->
      <h2>Active Campaigns</h2>
      <div class="campaigns-container">
        <div
          v-for="campaign in sponsorProfile.activeCampaigns"
          :key="campaign.id"
          class="campaign-card"
        >
          <h5>{{ campaign.name }}</h5>
          <progress :value="campaign.progress" max="100">
            {{ campaign.progress }}%
          </progress>
        </div>
      </div>

      <!-- Requests Sent -->
      <h2>Requests Sent</h2>
      <ul class="requests-list">
        <li
          v-for="request in sponsorProfile.newRequests"
          :key="request.id"
          class="request-item"
        >
          <h5>{{ request.influencerName }}</h5>
          <p>{{ request.adDetails }}</p>
          <p>Price set by you: {{ request.price }}</p>
          <p>
            Renegotiation price requested by influencer:
            {{ request.renegotiatedBudget }}
          </p>
          <div class="request-actions">
            <button @click="viewRequest(request)" class="btn btn-info">
              View
            </button>
            <button @click="editRequest(request)" class="btn btn-warning">
              Edit
            </button>
            <button @click="deleteRequest(request)" class="btn btn-danger">
              Delete
            </button>
            <!-- <button
              @click="renegotiateRequest(request)"
              class="btn btn-secondary"
            >
              Renegotiate
            </button> -->
          </div>
        </li>
      </ul>

      <!-- Ads Record -->
      <h2>Ads Record</h2>
      <ul class="requests-list">
        <li
          v-for="request in sponsorProfile.oldRequests"
          :key="request.id"
          class="request-item"
        >
          <h5>{{ request.influencerName }}</h5>
          <p>{{ request.adDetails }}</p>
          <p>Status: {{ request.status }}</p>
          <p>Price set by you: {{ request.price }}</p>
          <p>
            Renegotiation price requested by influencer:
            {{ request.renegotiatedBudget }}
          </p>
          <div class="request-actions">
            <button @click="viewRequest(request)" class="btn btn-info">
              View
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Update Profile Modal -->
    <div v-if="showUpdateProfileModal" class="modal">
      <div class="modal-content">
        <h2>Update Profile</h2>
        <form @submit.prevent="updateProfile">
          <input
            v-model="profileData.company_name"
            placeholder="Company Name"
          />
          <input v-model="profileData.category" placeholder="Category" />
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            @click="showUpdateProfileModal = false"
            class="btn btn-secondary"
          >
            Close
          </button>
        </form>
      </div>
    </div>

    <!-- Edit Request Modal -->
    <div v-if="showEditRequestModal" class="modal">
      <div class="modal-content">
        <h2>Edit Request</h2>
        <form @submit.prevent="updateRequest">
          <input v-model="requestData.adDetails" placeholder="Ad Details" />
          <input v-model="requestData.description" placeholder="Description" />
          <input v-model="requestData.price" placeholder="Price" />
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            @click="showEditRequestModal = false"
            class="btn btn-secondary"
          >
            Close
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
      sponsorProfile: {},
      showUpdateProfileModal: false,
      showEditRequestModal: false,
      profileData: {},
      requestData: {},
    };
  },
  mounted() {
    this.fetchSponsorProfile();
  },
  methods: {
    fetchSponsorProfile() {
      axios
        .get("http://localhost:5100/api/sponsor_profile", {
          withCredentials: true,
        })
        .then((response) => {
          this.sponsorProfile = response.data;
          this.profileData = {
            company_name: this.sponsorProfile.name || "",
            category: this.sponsorProfile.category || "",
          };
          console.log("Sponsor profile:", this.sponsorProfile);
        })
        .catch((error) => {
          console.error("Error fetching sponsor profile:", error);
        });
    },
    openUpdateProfileModal() {
      this.profileData = {
        company_name: this.sponsorProfile.name || "",
        category: this.sponsorProfile.category || "",
      };
      this.showUpdateProfileModal = true;
    },
    updateProfile() {
      axios
        .post(
          "http://localhost:5100/api/update_sponsor_profile",
          this.profileData,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data.success);
          this.showUpdateProfileModal = false;
          this.fetchSponsorProfile();
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    },
    viewRequest(request) {
      alert(`Viewing request: ${request.adDetails}`);
    },
    editRequest(request) {
      this.requestData = { ...request };
      this.showEditRequestModal = true;
    },
    updateRequest() {
      axios
        .post(
          `http://localhost:5100/api/edit_ad_request/${this.requestData.id}`,
          this.requestData
        )
        .then(() => {
          alert("Request updated successfully!");
          this.showEditRequestModal = false;
          this.fetchSponsorProfile();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteRequest(request) {
      if (
        confirm(
          `Are you sure you want to delete request: ${request.adDetails}?`
        )
      ) {
        axios
          .delete(`http://localhost:5100/api/delete_ad_request/${request.id}`)
          .then(() => {
            alert("Request deleted successfully!");
            this.fetchSponsorProfile();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    renegotiateRequest(request) {
      let newBudget = prompt(
        "Enter renegotiated budget",
        request.renegotiatedBudget
      );
      if (newBudget !== null) {
        axios
          .post(
            `http://localhost:5100/api/renegotiate_ad_request/${request.id}`,
            { renegotiatedBudget: newBudget }
          )
          .then(() => {
            alert("Renegotiation requested successfully!");
            this.fetchSponsorProfile();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    downloadCSV() {
      axios
        .get("http://localhost:5100/api/export_campaigns", {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "campaigns.csv");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error("Error downloading CSV:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Navbar styles */
.navbar {
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
}

/* Main container */
.container {
  max-width: 1200px;
}

/* Profile Actions */
.profile-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.profile-actions button {
  margin-right: 10px;
}

/* Campaigns */
.campaigns-container {
  display: flex;
  flex-wrap: wrap;
}

.campaign-card {
  width: 48%; /* Ensure this is the desired width */
  margin: 10px 1%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding and border in width calculation */
}

.campaign-card progress {
  width: 100% !important; /* Make progress bar full-width */
  height: 20px; /* Adjust height as needed */
}

/* Requests and Ads Record */
.requests-list {
  display: flex;
  flex-wrap: wrap;
}

.request-item {
  width: 48%; /* Half-width for request items */
  margin: 10px 1%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.request-actions {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content input {
  margin-bottom: 10px;
}

.modal-content button {
  margin-right: 10px;
}
</style>
