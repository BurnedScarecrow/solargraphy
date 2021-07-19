<template>
  <div class="topline">
    <h1 class="logo"><router-link to="/"> Solargraphy</router-link></h1>
    <div
      class="nav-trigger"
      :class="{ active: toggle, non_active: !toggle }"
      @click="navToggle"
    >
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          id="first"
          d="M3 20H53"
          stroke="#FAFAFB"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="second"
          d="M3 37H53"
          stroke="#FAFAFB"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
  <Nav :show="toggle" @closeNav="navToggle" />
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    navToggle() {
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style lang="scss">
@keyframes toggle_first_in {
  0% {
    transform: rotate(0deg) translateY(0px);
  }
  40% {
    transform: translateY(8px);
  }
  60% {
    transform: translateY(8px);
  }
  100% {
    transform: rotate(45deg) translateY(8px);
  }
}

@keyframes toggle_second_in {
  0% {
    transform: rotate(0deg) translateY(0px);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-8px);
  }
  100% {
    transform: rotate(-45deg) translateY(-8px);
  }
}

@keyframes toggle_first_out {
  0% {
    transform: rotate(45deg) translateY(8px);
  }
  40% {
    transform: rotate(0deg) translateY(8px);
  }
  60% {
    transform: rotate(0deg) translateY(8px);
  }
  100% {
    transform: rotate(0deg) translateY(0px);
  }
}

@keyframes toggle_second_out {
  0% {
    transform: rotate(-45deg) translateY(-8px);
  }
  40% {
    transform: rotate(0deg) translateY(-8px);
  }
  60% {
    transform: rotate(0deg) translateY(-8px);
  }
  100% {
    transform: rotate(0deg) translateY(0px);
  }
}

.topline {
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: ". logo nav-trigger";
  box-sizing: border-box;
  padding: 10px 0;
  align-items: center;
  font-family: "MuseoModerno", cursive;
}
h1.logo {
  grid-area: logo;
  padding: 0;
  margin: 0;
  text-align: center;
  font-weight: 100;
  a {
    color: var(--light);
    text-decoration: none;
  }
}
.nav-trigger {
  z-index: 100;
  grid-area: nav-trigger;
  text-align: center;
  font-size: 2em;
  display: flex;
  justify-content: flex-end;
  right: 2.5%;
  top: 17px;
  &.active {
    position: fixed;
  }

  &.active svg #first {
    animation: toggle_first_in 0.4s linear 1 forwards;
  }

  &.active svg #second {
    animation: toggle_second_in 0.4s linear 1 forwards;
  }

  &.non_active svg #first {
    animation: toggle_first_out 0.4s linear 1 forwards;
  }

  &.non_active svg #second {
    animation: toggle_second_out 0.4s linear 1 forwards;
  }

  svg {
    height: 1.2em;
    width: 30px;
    path {
      transform-origin: center;
      transition: all 0.2s ease-in-out;
      fill: #fafafa;
    }
  }
}

@media screen and (max-width: 769px) {
  .topline {
    width: 90%;
    margin: 0 auto;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: "logo . nav-trigger";
    h1.logo {
      grid-area: logo;
      padding: 0;
      margin: 0;
      text-align: left;
      font-weight: 100;
      font-size: 1.7em;
    }
    .nav-trigger {
      right: 5%;
      top: 13px;
    }
  }
}
</style>
