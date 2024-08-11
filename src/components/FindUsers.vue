<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand">{{ navbarBrand }}</a>
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
            <router-link class="nav-link" :to="homeLink">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/find">Find</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/stats">Stats</router-link>
          </li>
          <li v-if="userRole === 'sponsor'" class="nav-item">
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
    <div class="container mt-5 pt-4">
      <h2 class="mb-4">Find</h2>
      <div class="form-group">
        <input
          type="text"
          v-model="searchQuery"
          @input="search"
          class="form-control"
          placeholder="Search..."
        />
      </div>

      <div v-if="userRole === 'sponsor'">
        <h3 class="mb-3">Campaigns</h3>
        <div class="row">
          <div
            v-for="campaign in filteredCampaigns"
            :key="campaign.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ campaign.name }}
            </div>
          </div>
        </div>
        <h3 class="mb-3">Influencers</h3>
        <div class="row">
          <div
            v-for="influencer in filteredInfluencers"
            :key="influencer.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ influencer.name }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="userRole === 'admin'">
        <h3 class="mb-3">Campaigns</h3>
        <div class="row">
          <div
            v-for="campaign in filteredCampaigns"
            :key="campaign.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ campaign.name }}
            </div>
          </div>
        </div>
        <h3 class="mb-3">Influencers</h3>
        <div class="row">
          <div
            v-for="influencer in filteredInfluencers"
            :key="influencer.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ influencer.name }}
            </div>
          </div>
        </div>
        <h3 class="mb-3">Sponsors</h3>
        <div class="row">
          <div
            v-for="sponsor in filteredSponsors"
            :key="sponsor.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ sponsor.name }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="userRole === 'influencer'">
        <h3 class="mb-3">Sponsors</h3>
        <div class="row">
          <div
            v-for="sponsor in filteredSponsors"
            :key="sponsor.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ sponsor.name }}
            </div>
          </div>
        </div>
        <h3 class="mb-3">Campaigns</h3>
        <div class="row">
          <div
            v-for="campaign in filteredCampaigns"
            :key="campaign.id"
            class="col-md-6 mb-4"
          >
            <div class="list-group-item">
              {{ campaign.name }}
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
      searchQuery: "",
      campaigns: [],
      influencers: [],
      sponsors: [],
      userRole: "", // Initially empty, will be set after fetching
    };
  },
  computed: {
    homeLink() {
      return this.userRole === "sponsor"
        ? "/sponsor_profile"
        : this.userRole === "admin"
        ? "/admin-dashboard"
        : this.userRole === "influencer"
        ? `/influencer`
        : "#";
    },
    navbarBrand() {
      switch (this.userRole) {
        case "admin":
          return "Admin Dashboard";
        case "sponsor":
          return "Sponsor Dashboard";
        case "influencer":
          return "Influencer Dashboard";
        default:
          return "Dashboard";
      }
    },
    filteredCampaigns() {
      return this.campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredInfluencers() {
      return this.influencers.filter((influencer) =>
        influencer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredSponsors() {
      return this.sponsors.filter((sponsor) =>
        sponsor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchUserRole() {
      axios
        .get("http://localhost:5100/api/user_role", { withCredentials: true })
        .then((response) => {
          this.userRole = response.data.role;
          this.search(); // Fetch data after setting the role
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
          // Handle error, e.g., redirect to login
        });
    },
    search() {
      axios
        .get("http://localhost:5100/api/find", {
          params: { query: this.searchQuery },
          withCredentials: true,
        })
        .then((response) => {
          this.campaigns = response.data.campaigns || [];
          this.influencers = response.data.influencers || [];
          this.sponsors = response.data.sponsors || [];
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    },
  },
  created() {
    this.fetchUserRole(); // Fetch user role on component creation
  },
};
</script>

<style scoped>
/* Custom styles for the Find page */

/* Navbar adjustments */
.navbar {
  width: 100%; /* Ensure navbar spans the entire width */
  z-index: 1000; /* Ensure navbar stays on top of other content */
}

.navbar-brand {
  font-weight: bold;
}

/* Header styling */
h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}

/* Margin and padding adjustments */
.mt-5 {
  margin-top: 5rem; /* Increased top margin to accommodate fixed navbar */
}

.pt-4 {
  padding-top: 4rem; /* Padding to ensure content does not overlap navbar */
}

.mb-4 {
  margin-bottom: 2rem;
}

.list-group-item {
  border-radius: 0.375rem; /* Rounded corners */
  padding: 1rem;
}

/* Form control adjustments */
.form-control {
  border-radius: 0.25rem;
  border-color: #ced4da;
}

/* Button customizations */
.btn {
  border-radius: 0.25rem; /* Rounded corners */
}

.btn-light {
  background-color: #f8f9fa; /* Light color for background */
}
</style>
