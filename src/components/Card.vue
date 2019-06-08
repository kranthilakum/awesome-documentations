<template>
  <div>
    <b-card
      :title="title"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-img-lazy
        :src="imageUrl"
        class="card-image"
        alt="Project Logo"
        center
        top
        fluid
      />
      <b-card-text>{{ content }}</b-card-text>

      <b-row align-h="between">
        <b-link
          class="btn btn-outline-primary ml-2"
          :href="webUrl"
          target="_blank"
        >
          Website
        </b-link>
        <b-link
          class="btn btn-outline-success mr-2"
          :href="apiUrl"
          target="_blank"
        >
          API Docs
        </b-link>
      </b-row>
      <div slot="footer">
        <b-badge
          v-for="(tag, index) in tags"
          :key="index"
          pill
          variant="secondary"
          class="mx-1"
        >
          {{ tag }}
        </b-badge>
      </div>
    </b-card>
  </div>
</template>

<script>
    import { BCard } from 'bootstrap-vue';

    export default {
        name: "Card",
        components: {
            'b-card': BCard
        },
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
  .card-image {
    width: 65px;
    height: 65px;
  }
</style>

