<template>
  <main>
    <h1>Summary</h1>
    <p>You got {{ correctAnswers }}/{{ questions.length }} questions</p>
    <p>That's {{ percent }}% correct</p>
    <p>{{ message }}</p>
    <button>
      <router-link :to="{ name: 'Start' }">Play Again</router-link>
    </button>
  </main>
</template>

<script>
export default {
  props: {
    questions: { type: Array, default: null },
    correctAnswers: { type: Number, default: null }
  },
  mounted() {
    if (this.questions.length === 0) this.$router.push({ name: "Start" });
  },
  computed: {
    percent() {
      return Math.round((this.correctAnswers / this.questions.length) * 100, 2);
    },
    message() {
      if (this.percent < 50) return "You suck";
      else if (this.percent < 75) return "You can do better";
      else if (this.percent < 90) return "Good Job";
      else return "That's a spicy-a meat-a bowl-a";
    }
  }
};
</script>

<style scoped>
button {
  font-size: 2rem;
  padding: 10px;
}
button a {
  color: rgb(255, 255, 255);
}
</style>
