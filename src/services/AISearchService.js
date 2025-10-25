import Fuse from "fuse.js";

class SmartSearchService {
  constructor() {
    this.fuse = null;
    this.isInitialized = false;
    this.documentations = [];
    this.searchHistory = [];
    this.popularSearches = [
      "React hooks",
      "Vue composition API",
      "API testing",
      "JavaScript bundlers",
      "CSS frameworks",
      "State management",
      "TypeScript setup",
      "Testing libraries",
    ];
  }

  // Initialize the search service
  async initialize(documentations) {
    try {
      console.log("🔍 Initializing Smart Search Service...");

      this.documentations = documentations;

      // Configure Fuse.js for fuzzy search
      const options = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.4, // 0 = exact match, 1 = match anything
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7,
          },
          {
            name: "content",
            weight: 0.3,
          },
          {
            name: "tags",
            weight: 0.5,
          },
          {
            name: "category",
            weight: 0.4,
          },
        ],
      };

      this.fuse = new Fuse(documentations, options);
      this.isInitialized = true;

      console.log("✅ Smart Search Service initialized successfully!");
    } catch (error) {
      console.error("❌ Failed to initialize Smart Search Service:", error);
    }
  }

  // Perform intelligent search
  intelligentSearch(query, options = {}) {
    if (!this.isInitialized || !query.trim()) {
      return {
        results: [],
        intent: null,
        totalMatches: 0,
        suggestions: this.popularSearches.slice(0, 5),
      };
    }

    const { maxResults = 20, includeIntent = true } = options;

    try {
      // Track search history
      this.trackSearch(query);

      // Perform fuzzy search
      const fuseResults = this.fuse.search(query, { limit: maxResults });

      // Transform results to our format
      const results = fuseResults.map((result) => ({
        document: result.item,
        similarity: 1 - (result.score || 0), // Convert Fuse score to similarity
        matches: result.matches || [],
        boost: this.calculateBoost(result.item, query),
      }));

      // Classify search intent
      let intent = null;
      if (includeIntent) {
        intent = this.classifySearchIntent(query);
      }

      // Apply intent-based boosting
      const boostedResults = this.applyIntentBoosting(results, intent);

      // Sort by final score
      boostedResults.sort(
        (a, b) => b.similarity * b.boost - a.similarity * a.boost
      );

      return {
        results: boostedResults.slice(0, maxResults),
        intent,
        totalMatches: results.length,
        processingTime: Date.now(),
        suggestions: this.generateSuggestions(query),
      };
    } catch (error) {
      console.error("Search error:", error);
      return {
        results: [],
        error: error.message,
        suggestions: this.popularSearches.slice(0, 5),
      };
    }
  }

  // Simple intent classification based on keywords
  classifySearchIntent(query) {
    const intents = {
      "learning tutorial": {
        keywords: [
          "learn",
          "tutorial",
          "guide",
          "how to",
          "getting started",
          "beginner",
          "intro",
          "basics",
        ],
        confidence: 0,
      },
      "api reference": {
        keywords: [
          "api",
          "reference",
          "docs",
          "documentation",
          "methods",
          "functions",
        ],
        confidence: 0,
      },
      "framework comparison": {
        keywords: [
          "vs",
          "versus",
          "compare",
          "comparison",
          "difference",
          "better",
          "alternative",
        ],
        confidence: 0,
      },
      "tool setup": {
        keywords: [
          "setup",
          "install",
          "configuration",
          "config",
          "getting started",
          "init",
        ],
        confidence: 0,
      },
      troubleshooting: {
        keywords: [
          "error",
          "problem",
          "issue",
          "fix",
          "debug",
          "troubleshoot",
          "help",
        ],
        confidence: 0,
      },
      "code examples": {
        keywords: [
          "example",
          "sample",
          "code",
          "snippet",
          "demo",
          "implementation",
        ],
        confidence: 0,
      },
      "general search": {
        keywords: [],
        confidence: 0.1,
      },
    };

    const queryLower = query.toLowerCase();

    // Calculate confidence for each intent
    Object.keys(intents).forEach((intentKey) => {
      const intent = intents[intentKey];
      let matches = 0;

      intent.keywords.forEach((keyword) => {
        if (queryLower.includes(keyword)) {
          matches++;
        }
      });

      intent.confidence =
        intent.keywords.length > 0 ? matches / intent.keywords.length : 0.1;
    });

    // Find the intent with highest confidence
    const bestIntent = Object.keys(intents).reduce((a, b) =>
      intents[a].confidence > intents[b].confidence ? a : b
    );

    return {
      intent: bestIntent,
      confidence: intents[bestIntent].confidence,
    };
  }

  // Calculate boost factor for search results
  calculateBoost(document, query) {
    let boost = 1.0;
    const queryLower = query.toLowerCase();

    // Boost exact title matches
    if (document.title.toLowerCase() === queryLower) {
      boost *= 1.5;
    }

    // Boost popular technologies
    const popularTech = [
      "react",
      "vue",
      "angular",
      "javascript",
      "typescript",
      "node",
    ];
    if (
      popularTech.some((tech) => document.title.toLowerCase().includes(tech))
    ) {
      boost *= 1.2;
    }

    // Boost based on category relevance
    if (queryLower.includes("framework") && document.category === "framework") {
      boost *= 1.3;
    }
    if (queryLower.includes("library") && document.category === "library") {
      boost *= 1.3;
    }
    if (queryLower.includes("tool") && document.category === "tool") {
      boost *= 1.3;
    }

    return boost;
  }

  // Apply intent-based boosting
  applyIntentBoosting(results, intent) {
    if (!intent) return results;

    return results.map((result) => {
      let boost = result.boost || 1.0;
      const doc = result.document;

      switch (intent.intent) {
        case "learning tutorial":
          if (
            doc.tags.includes("beginner") ||
            doc.content.toLowerCase().includes("tutorial")
          ) {
            boost *= 1.4;
          }
          break;
        case "api reference":
          if (doc.apiURL && doc.content.toLowerCase().includes("api")) {
            boost *= 1.5;
          }
          break;
        case "framework comparison":
          if (doc.category === "framework") {
            boost *= 1.3;
          }
          break;
        case "tool setup":
          if (doc.category === "tool" || doc.tags.includes("setup")) {
            boost *= 1.3;
          }
          break;
        case "code examples":
          if (
            doc.content.toLowerCase().includes("example") ||
            doc.tags.includes("examples")
          ) {
            boost *= 1.3;
          }
          break;
      }

      return {
        ...result,
        boost,
      };
    });
  }

  // Generate smart suggestions
  generateSuggestions(query) {
    if (!query || query.length < 2) {
      return this.popularSearches.slice(0, 8);
    }

    const suggestions = [];
    const queryLower = query.toLowerCase();

    // Add matching documentation titles
    this.documentations.forEach((doc) => {
      if (doc.title.toLowerCase().includes(queryLower)) {
        suggestions.push({
          text: doc.title,
          type: "documentation",
          category: doc.category,
        });
      }
    });

    // Add matching tags
    const allTags = [
      ...new Set(this.documentations.flatMap((doc) => doc.tags)),
    ];
    allTags.forEach((tag) => {
      if (tag.toLowerCase().includes(queryLower) && suggestions.length < 6) {
        suggestions.push({
          text: tag,
          type: "tag",
          category: "tag",
        });
      }
    });

    // Add smart context suggestions
    const contextSuggestions = this.getContextualSuggestions(queryLower);
    contextSuggestions.forEach((suggestion) => {
      if (suggestions.length < 8) {
        suggestions.push(suggestion);
      }
    });

    return suggestions.slice(0, 8);
  }

  // Get contextual suggestions based on query patterns
  getContextualSuggestions(query) {
    const patterns = [
      {
        pattern: /react/i,
        suggestions: [
          { text: "React hooks", type: "suggestion", category: "smart" },
          { text: "React router", type: "suggestion", category: "smart" },
          { text: "React testing", type: "suggestion", category: "smart" },
        ],
      },
      {
        pattern: /vue/i,
        suggestions: [
          {
            text: "Vue composition API",
            type: "suggestion",
            category: "smart",
          },
          { text: "Vue router", type: "suggestion", category: "smart" },
          {
            text: "Vuex state management",
            type: "suggestion",
            category: "smart",
          },
        ],
      },
      {
        pattern: /api/i,
        suggestions: [
          { text: "REST API design", type: "suggestion", category: "smart" },
          { text: "GraphQL", type: "suggestion", category: "smart" },
          { text: "API testing tools", type: "suggestion", category: "smart" },
        ],
      },
      {
        pattern: /test/i,
        suggestions: [
          {
            text: "Unit testing frameworks",
            type: "suggestion",
            category: "smart",
          },
          { text: "E2E testing tools", type: "suggestion", category: "smart" },
          {
            text: "Testing best practices",
            type: "suggestion",
            category: "smart",
          },
        ],
      },
    ];

    for (const { pattern, suggestions } of patterns) {
      if (pattern.test(query)) {
        return suggestions;
      }
    }

    return [];
  }

  // Track search for analytics
  trackSearch(query) {
    this.searchHistory.push({
      query,
      timestamp: new Date(),
    });

    // Keep only last 100 searches
    if (this.searchHistory.length > 100) {
      this.searchHistory = this.searchHistory.slice(-100);
    }
  }

  // Get search analytics
  getSearchAnalytics() {
    const recentSearches = this.searchHistory.slice(-10);
    const topSearches = {};

    this.searchHistory.forEach((search) => {
      topSearches[search.query] = (topSearches[search.query] || 0) + 1;
    });

    const sortedSearches = Object.entries(topSearches)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([query, count]) => ({ query, count }));

    return {
      totalSearches: this.searchHistory.length,
      recentSearches,
      topSearches: sortedSearches,
    };
  }
}

// Export singleton instance
export default new SmartSearchService();
