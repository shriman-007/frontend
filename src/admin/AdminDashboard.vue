<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand">Admin Dashboard</a>
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
            <router-link class="nav-link" to="/admin-dashboard"
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
            <router-link class="nav-link" to="/">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container my-5 pt-5">
      <div class="row">
        <div class="col-md-6 mb-4">
          <h2 class="mb-3">Ongoing Campaign Progress</h2>
          <div v-for="campaign in campaigns" :key="campaign.id" class="mb-3">
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                :style="{ width: campaign.progress + '%' }"
                :aria-valuenow="campaign.progress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ campaign.campaign_name }} - {{ campaign.progress }}%
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="mb-4">
            <h2 class="mb-3">Users</h2>
            <ul class="list-group">
              <li
                v-for="user in users"
                :key="user.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ user.username }}</strong> - {{ user.role }}
                </div>
                <button
                  @click="flagUser(user.id)"
                  class="btn btn-danger btn-sm"
                >
                  Flag
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="mb-3">Flagged Users</h2>
            <ul class="list-group">
              <li
                v-for="flagged_user in flagged_users"
                :key="flagged_user.user_id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ flagged_user.username }}</strong> -
                  {{ flagged_user.role }}
                </div>
                <div>
                  <button
                    @click="unflagUser(flagged_user.user_id)"
                    class="btn btn-success btn-sm mr-2"
                  >
                    Unflag
                  </button>
                  <button
                    @click="deleteUser(flagged_user.user_id)"
                    class="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      users: [],
      flagged_users: [],
      campaigns: [],
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get(
          "http://localhost:5100/api/admin_dash",
          { withCredentials: true }
        );
        this.users = response.data.users;
        this.flagged_users = response.data.flagged_users;
        this.campaigns = response.data.campaigns;
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    async flagUser(userId) {
      try {
        await axios.post(`http://localhost:5100/api/flag_user/${userId}`);
        this.fetchDashboardData();
      } catch (error) {
        console.error("Error flagging user:", error);
      }
    },
    async unflagUser(userId) {
      try {
        await axios.post(`http://localhost:5100/api/unflag_user/${userId}`);
        this.fetchDashboardData();
      } catch (error) {
        console.error("Error unflagging user:", error);
      }
    },
    async deleteUser(userId) {
      try {
        await axios.post(`http://localhost:5100/api/delete_user/${userId}`);
        this.fetchDashboardData();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles for the Admin Dashboard */

/* Navbar adjustments */
.navbar {
  border-bottom: 1px solid #ddd;
}

.navbar-brand {
  font-weight: bold;
}

/* Progress bar styles */
.progress-bar {
  background-color: #28a745; /* Adjust as needed */
}

/* List group item adjustments */
.list-group-item {
  border-radius: 0.375rem; /* Rounded corners */
}

/* Button customizations */
.btn {
  border-radius: 0.25rem; /* Rounded corners */
}

.btn-danger {
  background-color: #dc3545; /* Red color for flagging */
}

.btn-success {
  background-color: #28a745; /* Green color for unflagging */
}

/* Spacing adjustments */
.container-fluid {
  padding-left: 2rem;
  padding-right: 2rem;
}

.my-4 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* Header styling */
h1,
h2 {
  color: #333;
}
</style>
