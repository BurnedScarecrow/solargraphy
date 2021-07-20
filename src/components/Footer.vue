<template>
  <div class="dividor"></div>
  <footer>
    <div class="copy">
      Made by Cawa <span class="char">{{ char }}</span> 2021
    </div>
    <a href="https://github.com/BurnedScarecrow" target="_blank">GitHub</a>
  </footer>
</template>

<script>
export default {
  data() {
    return { char: "©", copy: "©", emo: ["❤️", "🐷", "🌷"] };
  },
  mounted() {
    let index = this.emo.length - 1;
    setInterval(() => {
      if (this.char != this.copy) {
        this.char = this.copy;
      } else if (index == this.emo.length - 1) {
        index = 0;
        this.char = this.emo[index];
      } else {
        index++;
        this.char = this.emo[index];
      }
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.dividor {
  width: 80%;
  margin: 10px auto;
}
footer {
  width: 80%;
  padding: 0px;
  padding-bottom: 10px;
  margin: 0 auto;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .copy {
    display: flex;
    align-items: center;
    span.char {
      text-align: center;
      display: inline-block;
      padding: 0;
      margin: 0;
      height: 20px;
      width: 1.4em;
      font-size: 1em;
    }
  }
  a {
    color: var(--gold);
    text-decoration: none;
  }
}

@media screen and (max-width: 991px) {
  .dividor {
    width: 90%;
  }

  footer {
    width: 90%;
  }
}
</style>
