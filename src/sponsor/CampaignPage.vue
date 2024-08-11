<template>
  <div>
    <div>
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
    </div>
    <h1>All Campaigns</h1>
    <div class="campaigns">
      <div
        v-for="campaign in campaigns"
        :key="campaign.id"
        class="campaign-card"
      >
        <h2>{{ campaign.campaign_name }}</h2>
        <p>{{ campaign.description }}</p>
        <p>Category: {{ campaign.category }}</p>
        <p>Status: {{ campaign.status }}</p>
        <p>Progress: {{ campaign.progress }}%</p>
        <p>Budget: ${{ campaign.budget }}</p>
        <p>Products: {{ campaign.products }}</p>
        <p>Goals: {{ campaign.goals }}</p>
        <p>Start Date: {{ formatDate(campaign.start_date) }}</p>
        <p>End Date: {{ formatDate(campaign.end_date) }}</p>
        <p>Sponsor: {{ campaign.sponsor_name }}</p>
      </div>
    </div>

    <h1>My Campaigns</h1>
    <div class="my-campaigns">
      <div
        v-for="campaign in myCampaigns"
        :key="campaign.id"
        class="campaign-card"
      >
        <h2>{{ campaign.campaign_name }}</h2>
        <p>{{ campaign.description }}</p>
        <p>Category: {{ campaign.category }}</p>
        <p>Status: {{ campaign.status }}</p>
        <p>Progress: {{ campaign.progress }}%</p>
        <p>Budget: ${{ campaign.budget }}</p>
        <p>Products: {{ campaign.products }}</p>
        <p>Goals: {{ campaign.goals }}</p>
        <p>Start Date: {{ formatDate(campaign.start_date) }}</p>
        <p>End Date: {{ formatDate(campaign.end_date) }}</p>
        <div class="actions">
          <button @click="editCampaign(campaign)">Edit</button>
          <button @click="deleteCampaign(campaign.id)">Delete</button>
          <button @click="viewAds(campaign)">View Ads</button>
        </div>
      </div>
    </div>

    <div class="new-campaign">
      <h2>Create New Campaign</h2>
      <input v-model="newCampaign.campaign_name" placeholder="Campaign Name" />
      <input v-model="newCampaign.category" placeholder="Category" />
      <input v-model="newCampaign.budget" type="number" placeholder="Budget" />
      <input v-model="newCampaign.status" placeholder="Status" />
      <input v-model="newCampaign.products" placeholder="Products" />
      <input v-model="newCampaign.goals" placeholder="Goals" />
      <input
        v-model="newCampaign.progress"
        type="number"
        placeholder="Progress"
      />
      <input
        v-model="newCampaign.start_date"
        type="date"
        placeholder="Start Date"
      />
      <input
        v-model="newCampaign.end_date"
        type="date"
        placeholder="End Date"
      />
      <button @click="createCampaign">Create</button>
    </div>

    <!-- Edit Campaign Modal -->
    <div v-if="editingCampaign" class="edit-campaign-modal">
      <h2>Edit Campaign</h2>
      <input
        v-model="editingCampaign.campaign_name"
        placeholder="Campaign Name"
      />
      <input v-model="editingCampaign.category" placeholder="Category" />
      <input
        v-model="editingCampaign.budget"
        type="number"
        placeholder="Budget"
      />
      <input v-model="editingCampaign.status" placeholder="Status" />
      <input v-model="editingCampaign.products" placeholder="Products" />
      <input v-model="editingCampaign.goals" placeholder="Goals" />
      <input
        v-model="editingCampaign.progress"
        type="number"
        placeholder="Progress"
      />
      <input
        v-model="editingCampaign.start_date"
        type="date"
        placeholder="Start Date"
      />
      <input
        v-model="editingCampaign.end_date"
        type="date"
        placeholder="End Date"
      />
      <button @click="updateCampaign">Update</button>
      <button @click="cancelEdit">Cancel</button>
    </div>

    <!-- View Ads Modal -->
    <div v-if="viewingAds" class="view-ads-modal">
      <h2>Ad Requests for {{ viewingAds.campaign_name }}</h2>
      <div v-for="ad in ads" :key="ad.id" class="ad-card">
        <h3>{{ ad.ad_name }}</h3>
        <p>{{ ad.description }}</p>
        <p>Budget: ${{ ad.budget }}</p>
        <p>Status: {{ ad.status }}</p>
        <p>Influencer: {{ ad.influencer_name }}</p>
        <p>
          Renegotiation price requested by influencer :
          {{ ad.renegotiated_budget }}
        </p>
        <div class="actions">
          <button @click="editAd(ad)">Edit</button>
          <button @click="deleteAd(ad.id)">Delete</button>
        </div>
      </div>
      <div class="new-ad">
        <h3>Create New Ad Request</h3>
        <input v-model="newAd.ad_name" placeholder="Ad Name" />
        <input v-model="newAd.description" placeholder="Description" />
        <input v-model="newAd.budget" type="number" placeholder="Budget" />
        <input v-model="newAd.goal" placeholder="Goal" />
        <input v-model="newAd.influencer_name" placeholder="Influencer Name" />
        <input v-model="newAd.status" placeholder="Status" />
        <button @click="createAd">Create</button>
      </div>
      <button @click="closeAds">Close</button>
    </div>

    <!-- Edit Ad Modal -->
    <div v-if="editingAd" class="edit-ad-modal">
      <h2>Edit Ad Request</h2>
      <input v-model="editingAd.ad_name" placeholder="Ad Name" />
      <input v-model="editingAd.description" placeholder="Description" />
      <input v-model="editingAd.budget" type="number" placeholder="Budget" />
      <input v-model="editingAd.goal" placeholder="Goal" />
      <input
        v-model="editingAd.influencer_name"
        placeholder="Influencer Name"
      />
      <input v-model="editingAd.status" placeholder="Status" />
      <button @click="updateAd">Update</button>
      <button @click="cancelAdEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      campaigns: [],
      myCampaigns: [],
      newCampaign: {
        campaign_name: "",
        category: "",
        budget: 0,
        status: "",
        products: "",
        goals: "",
        progress: 0,
        start_date: "",
        end_date: "",
      },
      editingCampaign: null,
      viewingAds: null,
      ads: [],
      newAd: {
        ad_name: "",
        description: "",
        budget: 0,
        goal: "",
        status: "",
        influencer_name: "",
      },
      editingAd: null,
    };
  },
  methods: {
    fetchCampaigns() {
      axios
        .get("http://localhost:5100/api/campaigns", { withCredentials: true })
        .then((response) => {
          this.campaigns = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchMyCampaigns() {
      axios
        .get("http://localhost:5100/api/my_campaigns", {
          withCredentials: true,
        })
        .then((response) => {
          this.myCampaigns = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createCampaign() {
      axios
        .post("http://localhost:5100/api/create_campaign", this.newCampaign, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          this.fetchMyCampaigns();
          this.newCampaign = {
            campaign_name: "",
            category: "",
            budget: 0,
            status: "",
            products: "",
            goals: "",
            progress: 0,
            start_date: "",
            end_date: "",
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editCampaign(campaign) {
      this.editingCampaign = { ...campaign };
    },
    updateCampaign() {
      axios
        .post(
          `http://localhost:5100/api/update_campaign/${this.editingCampaign.id}`,
          this.editingCampaign,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          this.fetchMyCampaigns();
          this.editingCampaign = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteCampaign(campaignId) {
      axios
        .delete(`http://localhost:5100/api/delete_campaign/${campaignId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          this.fetchMyCampaigns();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelEdit() {
      this.editingCampaign = null;
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString();
    },
    viewAds(campaign) {
      this.viewingAds = campaign;
      axios
        .get(`http://localhost:5100/api/campaigns/${campaign.id}/ads`, {
          withCredentials: true,
        })
        .then((response) => {
          this.ads = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createAd() {
      axios
        .post(
          `http://localhost:5100/api/campaigns/${this.viewingAds.id}/ads`,
          {
            ...this.newAd,
            user_id: this.viewingAds.sponsor_id, // assuming sponsor_id is available in campaign
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          this.viewAds(this.viewingAds); // refresh the ads list
          this.newAd = {
            ad_name: "",
            description: "",
            budget: 0,
            goal: "",
            status: "",
            influencer_name: "",
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editAd(ad) {
      this.editingAd = { ...ad };
    },
    updateAd() {
      axios
        .post(
          `http://localhost:5100/api/ads/${this.editingAd.id}`,
          this.editingAd,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          this.viewAds(this.viewingAds); // refresh the ads list
          this.editingAd = null;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteAd(adId) {
      axios
        .delete(`http://localhost:5100/api/ads/${adId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          this.viewAds(this.viewingAds); // refresh the ads list
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cancelAdEdit() {
      this.editingAd = null;
    },
    closeAds() {
      this.viewingAds = null;
      this.ads = [];
    },
  },
  mounted() {
    this.fetchCampaigns();
    this.fetchMyCampaigns();
  },
};
</script>

<style>
.campaign-card,
.ad-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.actions button {
  margin-right: 5px;
}

.view-ads-modal,
.edit-ad-modal,
.edit-campaign-modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
