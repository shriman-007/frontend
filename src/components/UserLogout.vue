<template>
  <div></div>
  <!-- This component does not need to render anything -->
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    // Perform logout when the component is created
    axios
      .post("http://localhost:5100/api/logout", {}, { withCredentials: true })
      .then(() => {
        // Redirect to the landing page after successful logout
        router.push({ name: "LandingPage" });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        // Redirect to the landing page even if there is an error
        router.push({ name: "LandingPage" });
      });
  },
};
</script>
