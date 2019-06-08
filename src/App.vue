<template>
  <div id="app">
    <b-container fluid>
      <Header msg="Awesome Documentations" />
      <b-row class="mx-3">
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :content="card.content"
          :web-url="card.webURL"
          :api-url="card.apiURL"
          :image-url="card.imageURL"
          :category="card.category"
          :tags="card.tags"
          class="mx-3"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header";
import Card from "./components/Card";
import cardsData from "./assets/data.json";

export default {
  name: "App",
  components: {
    Header,
    Card
  },
  data() {
    return {
      cards: cardsData
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
