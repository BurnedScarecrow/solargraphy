<template>
  <div class="about container">
    <h2>Если тебе интересно...</h2>
    <div class="dividor"></div>
    <section>
      <a href="./guide.pdf" target="_blank">Полное руководство</a> по
      соларографии составил
      <a href="https://vk.com/id66398" target="_blank">Павел Питиримов</a>
    </section>

    <section>
      А этот сайтик и калькулятор сделал
      <a href="https://vk.com/evsikov.cawa" target="_blank"
        >Александр Евсиков</a
      >
    </section>

    <br />
    <h2>Вот еще ссылки полезные</h2>
    <div class="dividor"></div>
    <section>
      <a href="https://vk.com/public62175439" target="_blank">Соларография</a>
      - группа в VK по соларографии
    </section>

    <section>
      <a href="https://www.facebook.com/groups/solarigrafia" target="_blank"
        >SOLARIGRAFIA</a
      >
      - большое сообщество в Facebook с большим потоком качественного контента
    </section>

    <section>
      <a href="https://vk.com/docs-40950872" target="_blank"
        >Электрическая библиотека</a
      >
      - группа, где
      <a href="https://vk.com/bryakilev" target="_blank">Игорь Брякилев</a>
      собирает уникальную литературу, в т.ч. по пинхолу
    </section>

    <section>
      <a href="https://vk.com/pinholist" target="_blank">Пинхолист </a>
      - группа
      <a href="https://vk.com/bryakilev" target="_blank">Игоря Брякилева</a>,
      посвящённая пинхол-фотографии
    </section>
    <br />
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
section {
  margin: 20px 0;
  font-size: 1.1em;
  text-align: justify;
}

a {
  text-decoration: none;
  color: var(--gold);
}
</style>
