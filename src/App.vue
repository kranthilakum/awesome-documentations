<template>
  <div id="app">
    <Header msg="Awesome Documentations" />
    
    <!-- AI-Powered Search Component -->
    <b-container fluid class="search-container">
      <AISearchComponent 
        :documentations="allCards"
        @search-results="handleSearchResults"
      />
    </b-container>
    
    <b-container fluid class="cards-container">
      <b-row class="cards-row">
        <b-col
          v-for="(card, index) in displayedCards"
          :key="index"
          lg="3"
          md="4"
          sm="6"
          cols="12"
          class="card-column"
        >
          <Card
            :title="card.title"
            :content="card.content"
            :web-url="card.webURL"
            :api-url="card.apiURL"
            :image-url="card.imageURL"
            :category="card.category"
            :tags="card.tags"
            class="h-100"
          />
        </b-col>
      </b-row>
      
      <!-- No results message -->
      <div v-if="displayedCards.length === 0 && searchActive" class="no-results-message">
        <div class="text-center py-5">
          <i class="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 class="text-white">No documentation found</h4>
          <p class="text-white-50">Try different search terms or browse all documentation below</p>
          <b-button variant="outline-light" @click="clearSearch">
            Show All Documentation
          </b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header";
import Card from "./components/Card";
import AISearchComponent from "./components/AISearchComponent";
import cardsData from "./assets/data.json";

export default {
  name: "App",
  components: {
    Header,
    Card,
    AISearchComponent
  },
  data() {
    return {
      allCards: cardsData,
      displayedCards: cardsData,
      searchActive: false
    }
  },
  methods: {
    handleSearchResults(searchResults) {
      this.displayedCards = searchResults;
      this.searchActive = searchResults.length !== this.allCards.length;
    },
    
    clearSearch() {
      this.displayedCards = this.allCards;
      this.searchActive = false;
    }
  }
};
</script>

<style>
body {
  background-color: #00a896;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Cards container */
.search-container {
  padding: 1rem 2rem 0 2rem;
}

.cards-container {
  padding: 1rem 2rem 2rem 2rem;
}

/* Cards row with consistent spacing */
.cards-row {
  margin: 0 -15px;
}

/* Individual card columns */
.card-column {
  padding: 15px;
  margin-bottom: 30px;
  display: flex;
  align-items: stretch;
}

/* Ensure cards fill the height of their container */
.card-column .card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cards-container {
    padding: 1rem;
  }
  
  .card-column {
    margin-bottom: 20px;
  }
}

@media (max-width: 576px) {
  .cards-container {
    padding: 0.5rem;
  }
  
  .card-column {
    padding: 10px;
    margin-bottom: 15px;
  }
}
</style>
