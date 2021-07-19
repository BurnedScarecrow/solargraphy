<template>
  <div class="calc-vue">
    <Calc />
  </div>
</template>

<script>
import Calc from "@/components/Calc.vue";
export default {
  name: "Home",
  components: { Calc },
};
</script>

<style lang="scss" scoped>
.calc-vue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
}
</style>
