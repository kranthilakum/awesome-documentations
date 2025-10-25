<template>
  <b-card
    :title="title"
    class="documentation-card h-100"
    no-body
  >
    <b-card-body class="d-flex flex-column">
      <!-- <div class="card-image-container text-center mb-3">
        <b-card-img-lazy
          :src="imageUrl"
          class="card-image"
          alt="Project Logo"
        />
      </div> -->
      
      <h5 class="card-title">{{ title }}</h5>
      
      <b-card-text 
        v-if="content" 
        class="card-content flex-grow-1"
      >
        {{ content }}
      </b-card-text>

      <div class="card-actions mt-auto">
        <b-row class="mb-3">
          <b-col cols="6">
            <b-button
              variant="outline-primary"
              :href="webUrl"
              target="_blank"
              size="sm"
              class="w-100"
            >
              Website
            </b-button>
          </b-col>
          <b-col cols="6">
            <b-button
              variant="outline-success"
              :href="apiUrl"
              target="_blank"
              size="sm"
              class="w-100"
            >
              API Docs
            </b-button>
          </b-col>
        </b-row>
        
        <div v-if="tags && tags.length > 0" class="tags-container">
          <b-badge
            v-for="(tag, index) in tags"
            :key="index"
            pill
            variant="secondary"
            class="mr-1 mb-1"
          >
            {{ tag }}
          </b-badge>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
    export default {
        name: "Card",
        props: {
            title: {
              type: String,
              required: true,
              default: ""
            },
            content: {
              type: String,
              required: true,
              default: ""
            },
            webUrl: {
              type: String,
              required: true,
              default: ""
            },
            apiUrl: {
              type: String,
              required: true,
              default: ""
            },
            imageUrl: {
              type: String,
              required: true,
              default: ""
            },
            category: {
              type: String,
              required: false,
              default: ""
            },
            tags: {
              type: Array,
              required: false,
              default: () => []
            }
        }
    }
</script>

<style scoped>
.documentation-card {
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.documentation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image-container {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 8px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-actions {
  margin-top: auto;
}

.btn-sm {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  min-height: 2rem;
  align-items: flex-start;
}

.badge {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1.25rem;
  }
  
  .card-image {
    width: 56px;
    height: 56px;
  }
  
  .card-title {
    font-size: 1.1rem;
    min-height: 2rem;
  }
  
  .card-content {
    font-size: 0.85rem;
    min-height: 3.5rem;
  }
}

@media (max-width: 576px) {
  .card-body {
    padding: 1rem;
  }
  
  .card-image-container {
    height: 70px;
  }
  
  .card-image {
    width: 48px;
    height: 48px;
  }
  
  .card-title {
    font-size: 1rem;
    min-height: 1.5rem;
  }
  
  .card-content {
    font-size: 0.8rem;
    min-height: 3rem;
  }
  
  .btn-sm {
    font-size: 0.75rem;
    padding: 0.35rem 0.6rem;
  }
}
</style>

