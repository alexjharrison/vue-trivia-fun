<template>
  <div id="app">
    <app-navbar />
    <router-view
      v-if="categories"
      @start-game="startGame"
      @add-correct="correctAnswers++"
      @reset="reset"
      :categories="categories"
      :questions="questions"
      :correct-answers="correctAnswers"
    />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import { get } from "@/api";
export default {
  data() {
    return {
      categories: null,
      questions: [],
      correctAnswers: 0
    };
  },
  components: { AppNavbar },
  async beforeMount() {
    this.token = window.localStorage.getItem("token");

    this.getCategories();
  },
  methods: {
    reset() {
      this.questions = [];
      this.correctAnswers = 0;
    },
    async getCategories() {
      const { trivia_categories } = await get(
        "https://opentdb.com/api_category.php"
      );
      this.categories = trivia_categories;
    },
    startGame(questions) {
      this.questions = [...questions];
      this.$router.push({ name: "Question", params: { num: 0 } });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: #0f0e17;
  margin: 0;
  font-size: 2rem;
}
main {
  padding: 10px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #fffffe;
  margin: 5px 0;
}
p {
  color: #a7a9be;
}
a {
  text-decoration: none;
  color: #0f0e17;
}
a:hover {
  color: #000;
}
button {
  color: #fffffe;
  background-color: #ff8906;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.3rem;
}
.secondary {
  color: #f25f4c;
}
.tertiary {
  color: #e53170;
}

h1.alt {
  color: #0f0e17;
}
h2.alt,
h3.alt,
h4.alt,
h5.alt,
h6.alt {
  color: #2e2f3e;
}
.alt.background {
  background-color: #fffffe;
}

.contain,
main {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
