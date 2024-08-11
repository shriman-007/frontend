<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a class="navbar-brand" href="#">CollabConnect</a>
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
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/user-login"
              >User Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-login"
              >Admin Login</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="container content">
        <h1>Welcome to CollabConnect</h1>
        <p class="lead">Connecting Sponsors and Influencers Seamlessly</p>
        <router-link to="/user-login" class="btn btn-primary btn-lg"
          >Get Started</router-link
        >
      </div>
    </div>

    <!-- Features Section -->
    <div class="container feature-section">
      <div class="row">
        <div class="col-md-4 feature">
          <img
            src="@/assets/4824879.jpg"
            class="img-fluid rounded"
            alt="Feature 1"
          />
          <h3 class="mt-3">Connect</h3>
          <p>
            Connect with influencers and sponsors to create and participate in
            campaigns that drive engagements.
          </p>
        </div>
        <div class="col-md-4 feature">
          <img
            src="@/assets/OrgUVC-L_Bus-13_Single-04.jpg"
            class="img-fluid rounded"
            alt="Feature 2"
          />
          <h3 class="mt-3">Colab</h3>
          <p>
            The perfect match making app for the match made in heaven - Sponsors
            and Influencers
          </p>
        </div>
        <div class="col-md-4 feature">
          <img
            src="@/assets/Happy group of people celebrating together.jpg"
            class="img-fluid rounded"
            alt="Feature 3"
          />
          <h3 class="mt-3">Enjoy</h3>
          <p>
            Dear Influencers, Get paid seamlessly and Dear Sponsors put out your
            brands into the world
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="container mt-5">
      <p class="text-center">© 2024 CollabConnect, Inc.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
.hero-section {
  background: url("@/assets/4575.jpg") no-repeat center center;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero-section .content {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  color: white;
}
.hero-section h1 {
  font-size: 4rem;
}
.feature-section {
  padding: 60px 0;
}
.feature-section .feature {
  padding: 20px;
  text-align: center;
}
.feature-section .feature img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
