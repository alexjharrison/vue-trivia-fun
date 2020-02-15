<template>
  <main v-if="thisQuestion">
    <header>
      <h1>Question</h1>
      <div>
        <p><strong>Category:</strong> {{ thisQuestion.category }}</p>
        <p><strong>Difficulty:</strong> {{ thisQuestion.difficulty }}</p>
        <p>
          <strong>Question </strong> {{ $route.params.num + 1 }}/{{
            questions.length
          }}
        </p>
      </div>
    </header>
    <h2 v-html="thisQuestion.question" />
    <div class="answer-container">
      <button
        @click="selectAnswer(answer)"
        v-for="(answer, i) in answers"
        :key="answer.randomNum"
        :style="buttonStyle[i]"
        v-html="answer.answer"
      />
    </div>
    <div v-if="answerSelected">
      <p>{{ answerSelected.isCorrect ? "Yay" : "Boo" }}</p>
      <p>{{ correctAnswers }} / {{ $route.params.num + 1 }} correct</p>
    </div>
    <button class="smaller-btn" v-if="answerSelected" @click="goToNextQuestion">
      {{ nextQuestionText }}
    </button>
  </main>
</template>

<script>
export default {
  props: {
    questions: { type: Array, default: () => [] },
    correctAnswers: { type: Number, default: null }
  },
  data() {
    return {
      isBoxShowing: false,
      answerSelected: null
    };
  },
  mounted() {
    if (!this.thisQuestion) {
      this.$router.push({ name: "Start" });
    }
  },
  computed: {
    thisQuestion() {
      return this.questions[this.$route.params.num];
    },
    nextQuestionText() {
      if (this.isLastQuestion) {
        return "See final results";
      } else return "Next Question";
    },
    isLastQuestion() {
      return this.questions.length - 1 === this.$route.params.num;
    },
    buttonStyle() {
      return this.answers.map(({ isCorrect }) => {
        if (!this.answerSelected) return "";
        else return `background-color: ${isCorrect ? "green" : "red"}`;
      });
    },
    answers() {
      let answers = [
        {
          answer: this.thisQuestion.correct_answer,
          isCorrect: true,
          randomNum: Math.random()
        },
        ...this.thisQuestion.incorrect_answers.map(answer => ({
          answer,
          isCorrect: false,
          randomNum: Math.random()
        }))
      ];
      return answers.sort((a, b) => a.randomNum - b.randomNum);
    }
  },
  methods: {
    reset() {
      this.isBoxShowing = false;
      this.answerSelected = null;
    },
    selectAnswer(answer) {
      this.answerSelected = { ...answer };
      if (answer.isCorrect) this.$emit("add-correct");
    },
    goToNextQuestion() {
      this.reset();
      const nextRoute = this.isLastQuestion
        ? { name: "Summary" }
        : {
            name: "Question",
            params: { num: this.$route.params.num + 1 }
          };
      this.$router.push(nextRoute);
    }
  }
};
</script>

<style scoped>
main {
  text-align: center;
}
header {
  display: flex;
  justify-content: space-between;
  text-align: start;
}
header p {
  margin: 10px 0;
  text-transform: capitalize;
}
h2 {
  font-size: 2.5rem;
  text-align: center;
  margin: 40px 0;
}
.answer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
button {
  font-size: 2rem;
  margin: 30px 5px;
  padding: 20px;
}
.smaller-btn {
  padding: 10px;
}
</style>
