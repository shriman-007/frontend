<template>
  <div>
    <h1>Statistics</h1>
    <div v-if="role === 'sponsor'">
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
      <h2>Sponsor Stats</h2>
      <canvas id="sponsorChart1"></canvas>
      <canvas id="sponsorChart2"></canvas>
      <canvas id="sponsorChart3"></canvas>
    </div>
    <div v-if="role === 'influencer'">
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
                <router-link class="nav-link" to="/influencer"
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
      </div>
      <h2>Influencer Stats</h2>
      <canvas id="influencerChart1"></canvas>
      <canvas id="influencerChart2"></canvas>
      <canvas id="influencerChart3"></canvas>
    </div>
    <div v-if="role === 'admin'">
      <div>
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
      </div>
      <h2>Admin Stats</h2>
      <canvas id="adminChart1"></canvas>
      <canvas id="adminChart2"></canvas>
      <canvas id="adminChart3"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart } from "chart.js/auto";

export default {
  data() {
    return {
      role: "",
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    fetchStats() {
      axios
        .get("http://localhost:5100/api/stats", { withCredentials: true })
        .then((response) => {
          this.role = response.data.role;
          console.log("Fetched role:", this.role);
          this.$nextTick(() => {
            if (this.role === "sponsor") {
              this.renderCharts(response.data.sponsorStats, "sponsorChart");
            } else if (this.role === "influencer") {
              this.renderCharts(
                response.data.influencerStats,
                "influencerChart"
              );
            } else if (this.role === "admin") {
              this.renderCharts(response.data.adminStats, "adminChart");
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    },
    renderCharts(stats, chartIdPrefix) {
      console.log("Rendering charts with stats:", stats);
      for (let i = 1; i <= 3; i++) {
        const ctx = document.getElementById(`${chartIdPrefix}${i}`);
        if (ctx) {
          new Chart(ctx, {
            type: this.getChartType(i),
            data: {
              labels: stats[`chart${i}`].labels,
              datasets: [
                {
                  label: stats[`chart${i}`].label,
                  data: stats[`chart${i}`].data,
                  backgroundColor: this.getBackgroundColor(i),
                  borderColor: this.getBorderColor(i),
                  borderWidth: 1,
                },
              ],
            },
          });
        } else {
          console.error(
            `Canvas element with id ${chartIdPrefix}${i} not found.`
          );
        }
      }
    },
    getChartType(chartNumber) {
      if (chartNumber === 1) return "bar";
      if (chartNumber === 2) return "line";
      if (chartNumber === 3) return "pie";
    },
    getBackgroundColor(chartNumber) {
      const colors = [
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      ];
      return colors[chartNumber - 1];
    },
    getBorderColor(chartNumber) {
      const colors = [
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      ];
      return colors[chartNumber - 1];
    },
  },
};
</script>

<style>
canvas {
  max-width: 600px;
  margin: 20px auto;
}
</style>
