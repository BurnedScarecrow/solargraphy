<template>
  <Topline />
  <router-view />
  <Footer />
</template>

<script>
import Topline from "@/components/Topline.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Topline,
    Footer,
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Jura";
  src: url("./assets/fonts/Jura.ttf");
}

@font-face {
  font-family: "MuseoModerno";
  src: url("./assets/fonts/MuseoModerno.ttf");
}

:root {
  --gray: #262e36;
  --dark: #1f2933;
  --light: #fafafa;
  --gold: #c5a805;
  --red: #d63131;
  --red-tr: #d6313122;
  --purple: #4a5568;
}
html,
body {
  padding: 0;
  margin: 0;
  background-image: linear-gradient(to bottom right, var(--dark), var(--gray));
  min-height: 100%;
}
body {
  overflow: auto;
  background-size: cover;
  background-repeat: no-repeat;
}

#app {
  font-family: "Jura", sans-serif;
  color: var(--light);
  width: 100%;
}

.dividor {
  width: 100%;
  height: 0.5px;
  margin: 10px 0;
  background: var(--purple);
}

.container {
  margin: 0 auto;
  width: 80%;
}
#nav {
  padding: 30px;

  a {
    font-weight: 100;
    text-decoration: none;
    color: #dadada;

    &.router-link-exact-active {
      color: #c5a805;
    }
  }
}

@media screen and (max-width: 769px) {
  .container {
    width: 90%;
  }
}
</style>
