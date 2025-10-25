<template>
  <div class="smart-search-container">
    <!-- Search Input with AI indicators -->
    <div class="search-input-wrapper">
      <b-form-input
        v-model="searchQuery"
        @input="handleSearchInput"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        placeholder="🔍 Search with AI... (e.g., 'React state management', 'API testing tools')"
        size="lg"
        class="ai-search-input"
        :class="{ 'ai-processing': isProcessing }"
      />
      
      <!-- Smart Search Status Indicator -->
      <div class="ai-status">
        <b-spinner v-if="isProcessing" small class="ai-spinner" />
        <i v-else class="fas fa-brain ai-ready" title="Smart Search Ready" />
      </div>
    </div>

    <!-- Search Suggestions Dropdown -->
    <div v-if="showSuggestions && suggestions.length" class="suggestions-dropdown">
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @mousedown="selectSuggestion(suggestion)"
        class="suggestion-item"
        :class="{ 'smart-suggestion': suggestion.type === 'suggestion' }"
      >
        <i :class="getSuggestionIcon(suggestion)" class="suggestion-icon" />
        <span class="suggestion-text">{{ suggestion.text }}</span>
        <b-badge v-if="suggestion.category" variant="secondary" size="sm">
          {{ suggestion.category }}
        </b-badge>
      </div>
    </div>

    <!-- Search Results with AI insights -->
    <div v-if="searchResults.length || searchQuery" class="search-results-container">
      <!-- Search Metadata -->
      <div v-if="searchMetadata" class="search-metadata">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span class="results-count">
              {{ filteredResults.length }} high-quality results
              <small class="text-muted">({{ searchResults.length }} total, showing >80% similarity)</small>
            </span>
            <span v-if="searchMetadata.intent" class="search-intent">
              • Detected intent: <strong>{{ searchMetadata.intent.intent }}</strong>
              ({{ Math.round(searchMetadata.intent.confidence * 100) }}% confidence)
            </span>
          </div>
          
          <div class="search-filters">
            <b-button-group size="sm">
              <b-button 
                v-for="filter in availableFilters"
                :key="filter.key"
                :variant="activeFilters.includes(filter.key) ? 'primary' : 'outline-primary'"
                @click="toggleFilter(filter.key)"
              >
                {{ filter.label }}
              </b-button>
            </b-button-group>
          </div>
        </div>
      </div>

      <!-- Enhanced Results Cards -->
      <div class="ai-results-grid">
        <div 
          v-for="(result, index) in filteredResults"
          :key="index"
          class="ai-result-card"
          :class="{ 'boosted-result': result.boost > 1 }"
        >
          <!-- AI Relevance Score -->
          <div class="relevance-indicator">
            <div 
              class="relevance-bar"
              :style="{ width: `${result.similarity * 100}%` }"
            />
            <span class="relevance-score">
              {{ Math.round(result.similarity * 100) }}%
            </span>
          </div>

          <!-- Card Content -->
          <Card
            :title="result.document.title"
            :web-url="result.document.webURL"
            :api-url="result.document.apiURL"
            class="h-100"
          />

          <!-- AI Insights -->
          <div v-if="result.boost > 1" class="ai-insight">
            <i class="fas fa-lightbulb" />
            <span>AI boosted for "{{ searchMetadata.intent.intent }}"</span>
          </div>
        </div>
      </div>

      <!-- No High-Quality Results -->
      <div v-if="searchResults.length > 0 && filteredResults.length === 0 && searchQuery" class="no-quality-results">
        <div class="no-results-content">
          <i class="fas fa-filter fa-3x mb-3 text-warning" />
          <h4>No High-Quality Matches Found</h4>
          <p>Found {{ searchResults.length }} results, but none exceed 80% similarity threshold.</p>
          <p class="text-muted">Try refining your search terms or browse all documentation below.</p>
          
          <div class="suggestion-actions">
            <b-button variant="outline-primary" @click="showAllResults" class="mr-2">
              Show All Results
            </b-button>
            <b-button variant="primary" @click="clearSearch">
              Browse All Documentation
            </b-button>
          </div>
        </div>
      </div>

      <!-- No Results with AI Suggestions -->
      <div v-if="searchResults.length === 0 && searchQuery" class="no-results">
        <div class="no-results-content">
          <i class="fas fa-search fa-3x mb-3 text-muted" />
          <h4>No exact matches found</h4>
          <p>Try these AI-suggested alternatives:</p>
          
          <div class="ai-suggestions">
            <b-button
              v-for="suggestion in aiSuggestions"
              :key="suggestion"
              variant="outline-primary"
              size="sm"
              @click="searchQuery = suggestion"
              class="m-1"
            >
              {{ suggestion }}
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Smart Search Ready Banner -->
    <div v-if="!isProcessing && searchResults.length === 0 && !searchQuery" class="smart-ready-banner">
    <div>
        <strong>Smart Search Ready!</strong>
        <br>
        <small>Intelligent fuzzy search with intent detection is ready to help you find documentation.</small>
    </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import SmartSearchService from '../services/AISearchService';

export default {
  name: 'SmartSearchComponent',
  
  components: {
    Card
  },

  props: {
    documentations: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      searchQuery: '',
      searchResults: [],
      suggestions: [],
      showSuggestions: false,
      isProcessing: false,
      searchMetadata: null,
      smartService: SmartSearchService,
      activeFilters: [],
      smartSuggestions: [
        'React state management',
        'Vue.js best practices',
        'API testing tools',
        'JavaScript bundlers',
        'CSS frameworks'
      ]
    };
  },

  computed: {
    availableFilters() {
      const categories = [...new Set(this.searchResults.map(r => r.document.category))];
      return categories.map(cat => ({
        key: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1)
      }));
    },

    filteredResults() {
      let results = this.searchResults;
      
      // Filter by similarity threshold (80%)
      results = results.filter(result => result.similarity > 0.8);
      
      // Apply category filters
      if (this.activeFilters.length > 0) {
        results = results.filter(result =>
          this.activeFilters.includes(result.document.category)
        );
      }
      
      return results;
    }
  },

  async mounted() {
    // Initialize smart search service
    await this.initializeSearch();
  },

  watch: {
    documentations: {
      handler: 'initializeSearch',
      immediate: true
    }
  },

  methods: {
    async initializeSearch() {
      if (this.documentations.length > 0) {
        await this.smartService.initialize(this.documentations);
      }
    },

    async handleSearchInput() {
      if (this.searchQuery.length === 0) {
        this.searchResults = [];
        this.searchMetadata = null;
        this.suggestions = [];
        this.$emit('search-results', this.documentations);
        return;
      }

      // Generate suggestions for short queries
      if (this.searchQuery.length < 3) {
        this.suggestions = this.smartService.generateSuggestions(this.searchQuery);
        return;
      }

      // Debounce smart search
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        await this.performSmartSearch();
      }, 300);
    },

    async performSmartSearch() {
      this.isProcessing = true;
      this.suggestions = [];

      try {
        const result = this.smartService.intelligentSearch(
          this.searchQuery,
          {
            maxResults: 20,
            includeIntent: true
          }
        );

        this.searchResults = result.results;
        this.searchMetadata = {
          intent: result.intent,
          totalMatches: result.totalMatches,
          processingTime: result.processingTime
        };

        // Emit results to parent component
        this.$emit('search-results', this.searchResults.map(r => r.document));

      } catch (error) {
        console.error('Smart Search failed:', error);
        // Fallback to basic search
        this.performBasicSearch();
      } finally {
        this.isProcessing = false;
      }
    },

    performBasicSearch() {
      const query = this.searchQuery.toLowerCase();
      const results = [];
      
      this.documentations.forEach(doc => {
        let similarity = 0;
        let matchCount = 0;
        
        // Check exact matches in title (highest priority)
        if (doc.title.toLowerCase().includes(query)) {
          similarity += 0.9;
          matchCount++;
        }
        
        // Check exact matches in tags
        if (doc.tags.some(tag => tag.toLowerCase().includes(query))) {
          similarity += 0.85;
          matchCount++;
        }
        
        // Check exact matches in content
        if (doc.content.toLowerCase().includes(query)) {
          similarity += 0.8;
          matchCount++;
        }
        
        // Check partial matches in category
        if (doc.category && doc.category.toLowerCase().includes(query)) {
          similarity += 0.75;
          matchCount++;
        }
        
        // Only include results with similarity > 0.8
        if (matchCount > 0 && similarity > 0.8) {
          results.push({
            document: doc,
            similarity: Math.min(similarity / matchCount, 1), // Average and cap at 1
            boost: 1
          });
        }
      });

      this.searchResults = results;
      this.$emit('search-results', results.map(r => r.document));
    },

    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.text;
      this.showSuggestions = false;
      this.handleSearchInput();
    },

    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },

    toggleFilter(filterKey) {
      const index = this.activeFilters.indexOf(filterKey);
      if (index > -1) {
        this.activeFilters.splice(index, 1);
      } else {
        this.activeFilters.push(filterKey);
      }
    },

    getSuggestionIcon(suggestion) {
      switch (suggestion.type) {
        case 'documentation': return 'fas fa-book';
        case 'suggestion': return 'fas fa-lightbulb';
        case 'tag': return 'fas fa-tag';
        default: return 'fas fa-search';
      }
    },

    showAllResults() {
      // Temporarily show all results by emitting them to parent
      this.$emit('search-results', this.searchResults.map(r => r.document));
    },

    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.searchMetadata = null;
      this.suggestions = [];
      this.$emit('search-results', this.documentations);
    },

    highlightSearchTerms(text) {
      if (!this.searchQuery) return text;
      
      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }
  }
};
</script>

<style scoped>
.ai-search-container {
  position: relative;
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
}

.ai-search-input {
  border-radius: 25px;
  border: 2px solid #02c39a;
  padding: 0.75rem 3rem 0.75rem 1.5rem;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.ai-search-input:focus {
  border-color: #f0f3bd;
  box-shadow: 0 0 0 0.2rem rgba(240, 243, 189, 0.25);
  outline: none;
}

.ai-search-input.ai-processing {
  background: linear-gradient(90deg, #f8f9fa 25%, #e9ecef 50%, #f8f9fa 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.ai-status {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.ai-ready {
  color: #28a745;
  font-size: 1.2rem;
}

.ai-loading {
  color: #ffc107;
  font-size: 1.2rem;
}

.ai-spinner {
  color: #007bff;
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 5px;
}

.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-item.smart-suggestion {
  background-color: #fff7e6;
  border-left: 3px solid #ffc107;
}

.suggestion-icon {
  color: #6c757d;
  width: 16px;
}

.suggestion-text {
  flex: 1;
}

.search-metadata {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.results-count {
  font-weight: 600;
  color: #2c3e50;
}

.search-intent {
  color: #6c757d;
  font-size: 0.9rem;
}

.ai-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.ai-result-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.ai-result-card.boosted-result {
  border: 2px solid #ffc107;
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
}

.relevance-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e9ecef;
  z-index: 10;
}

.relevance-bar {
  height: 100%;
  background: linear-gradient(90deg, #dc3545, #ffc107, #28a745);
  transition: width 0.3s ease;
}

.relevance-score {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  z-index: 10;
}

.ai-insight {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: #ffc107;
  color: #212529;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.no-results,
.no-quality-results {
  text-align: center;
  padding: 3rem 1rem;
}

.suggestion-actions {
  margin-top: 1rem;
}

.ai-suggestions {
  margin-top: 1rem;
}

.smart-ready-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .ai-results-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .search-metadata {
    padding: 0.75rem;
  }
  
  .search-filters {
    margin-top: 0.5rem;
  }
}
</style>