<template>
  <main>
    <h1>Play a new game</h1>
    <form @submit.prevent="startGame">
      <label for="num-questions">Number of Questions</label>
      <input id="num-questions" type="number" v-model="numQuestions" />
      <label for="select-category">Select Category</label>
      <select v-model="selectCategory" id="select-category">
        <option :value="null">All Categories</option>
        <option :value="cat.id" v-for="cat in categories" :key="cat.id">
          {{ cat.name }}
        </option>
      </select>
      <label for="difficulty">Select Difficulty</label>
      <select id="difficulty" v-model="difficulty">
        <option :value="null">Any</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label for="game-type">Select Type</label>
      <select id="game-type" v-model="gameType">
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>
      <button type="submit">Let's Goooo</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </main>
</template>

<script>
import { get } from "@/api";
export default {
  props: { categories: { type: Array, default: () => [] } },
  data() {
    return {
      numQuestions: 10,
      selectCategory: null,
      difficulty: null,
      gameType: "multiple",
      responseCode: null
    };
  },
  watch: {
    numQuestions(val) {
      if (val < 1) this.numQuestions = 1;
      else if (val > 20) this.numQuestions = 20;
    }
  },
  computed: {
    urlString() {
      return (
        `https://opentdb.com/api.php?` +
        `&amount=${this.numQuestions}` +
        (this.selectCategory ? `&category=${this.selectCategory}` : "") +
        (this.difficulty ? `&difficulty=${this.difficulty}` : "") +
        `&type=${this.gameType}`
      );
    },
    message() {
      switch (this.responseCode) {
        case 1:
          return "No Results";
        case 2:
          return "Invalid Parameter";
        case null:
        default:
          return null;
      }
    }
  },
  mounted() {
    this.$emit("reset");
  },
  methods: {
    async startGame() {
      const questions = await get(this.urlString);
      this.responseCode = questions.response_code;
      if (this.responseCode === 0) this.$emit("start-game", questions.results);
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
label {
  color: rgb(226, 226, 226);
}
input,
select {
  margin: 5px 0 20px 0;
  font-size: 1.5rem;
  padding: 10px;
  max-width: 90vw;
}
button {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 3rem;
}
</style>
