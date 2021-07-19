<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: { Header },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
  min-height: 75vh;
}
</style>
