import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/components/landingpage.vue";
import AdminLogin from "@/admin/admin_login.vue";
import AdminDashboard from "@/admin/AdminDashboard.vue";
import Find from "../components/FindUsers.vue"; // Ensure the path is correct
import UserLogin from "../components/UserLogin.vue";
import SponsorSignup from "../sponsor/SponsorSignup.vue"; // Adjust import path
import InfluencerSignup from "../influencer/InfluencerSignup.vue"; // Adjust import path
import SponsorProfile from "../sponsor/SponsorProfile.vue"; // Adjust import path
import UserLogout from "../components/UserLogout.vue"; // Import the logout component
import StatsPage from "@/components/StatsPage.vue"; // Import the StatsPage component
import InfluencerProfile from "@/influencer/InfluencerProfile.vue";
import CampaignPage from "@/sponsor/CampaignPage.vue";

//import InfluencerProfile from "../components/InfluencerProfile.vue"; // Adjust import path

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/find",
      name: "Find",
      component: Find,
    },
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/admin-login",
      name: "adminLogin",
      component: AdminLogin,
    },
    {
      path: "/admin-dashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
    },
    {
      path: "/user-login",
      name: "UserLogin",
      component: UserLogin,
    },
    {
      path: "/signup",
      name: "SponsorSignup",
      component: SponsorSignup,
    },
    {
      path: "/signup_infl",
      name: "InfluencerSignup",
      component: InfluencerSignup,
    },
    {
      path: "/sponsor_profile",
      name: "SponsorProfile",
      component: SponsorProfile,
    },
    {
      path: "/stats",
      name: "StatsPage",
      component: StatsPage,
    },
    {
      path: "/campaigns",
      name: "Campaigns",
      component: CampaignPage,
    },
    {
      path: "/influencer",
      name: "InfluencerProfile",
      component: InfluencerProfile,
      props: true,
    },
    { path: "/logout", name: "UserLogout", component: UserLogout },
  ],
});
