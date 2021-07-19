<template>
  <div class="nav-wrapper" :class="{ show: show }">
    <nav>
      <router-link @click="onClick" to="/">Home</router-link>
      <router-link @click="onClick" to="/about">About</router-link>
      <router-link @click="onClick" to="/howto">How to</router-link>
      <router-link @click="onClick" to="/calc">Calc</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    onClick() {
      this.$emit("closeNav");
    },
  },
};
</script>

<style lang="scss">
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: -1;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.4s ease;

  nav {
    display: grid;
    gap: 40px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    a {
      display: flex;
      height: 100px;
      box-sizing: border-box;
      width: 100px;
      border: 1px solid #fafafa;
      color: var(--light);
      text-decoration: none;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      font-family: "MuseoModerno", cursive;
      transition: all 0.2s ease-in-out;

      &.router-link-exact-active {
        border: 2px solid var(--gold);
      }

      &:hover {
        background: var(--light);
        color: var(--dark);
        border: 0.5px solid #fafafa;
        font-weight: 500;
      }
    }
  }

  &.show {
    z-index: 2;
    opacity: 1;
  }
}
</style>
