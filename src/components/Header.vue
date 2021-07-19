<template>
  <div class="header container">
    <Can />
    <div class="info">
      <h2>Соларо.. что?</h2>
      <p>
        Соларография - ответвление от пинхол-фотографии, основанное на съёмке
        траекторий движения солнца по небосводу при сверхдлинных выдержках.
      </p>
      <p>
        Для такого рода снимков нужна камера-обскура. Создать её можно всего из
        двух металлических банок. Однако, для качественной съемки важно
        правильно сделать отверстие, через которое в камеру и будет попадать
        свет. Этот сайт был создан чтобы облегчить тебе задачу - тут ты найдель
        инструкции по созданию камеры и калькулятор, который поможет тебе
        правильно все рассчитать. Удачи!
      </p>
      <div class="menu">
        <router-link to="/howto" class="button">Инструкция</router-link>
        <router-link to="/calc" class="button">Калькулятор</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Can from "@/components/Can.vue";
export default {
  components: { Can },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  align-self: center;
  box-sizing: border-box;
}

.info {
  width: 40%;
  h2 {
    font-size: 1.6em;
    font-weight: 300;
  }

  p {
    margin-bottom: 20px;
    font-size: 1.2em;
    text-align: justify;
  }

  .menu {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    .button {
      border: 1px solid var(--light);
      border-radius: 0.2em;
      padding: 5px 10px;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--light);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      letter-spacing: 1px;
      &:hover {
        color: var(--gold);
        border: 1px solid var(--gold);
      }
    }
  }
}
@media screen and (max-width: 769px) {
  .header {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    .menu .button {
      font-size: 1.1em;
    }
  }

  .info {
    width: 90%;
    p {
      font-size: 1.2em;
    }
  }
}

@media screen and (max-width: 360px) {
  .header {
    flex-direction: column;
    gap: 10px;

    .info {
      p {
        font-size: 1em;
      }
    }

    .menu .button {
      font-size: 1em;
    }
  }
}
</style>
