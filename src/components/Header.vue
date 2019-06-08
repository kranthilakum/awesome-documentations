<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      A curated list of documentations for a curious Web developer,<br>
      check out the
      <a
        href="https://github.com/kranthilakum/awesome-documentations"
        target="_blank"
        rel="noopener"
      >Github project</a>.
    </p>
    <div>
      <b-row class="my-5 justify-content-md-center">
        <b-col sm="3">
          <b-form-input
            v-model="searchText"
            placeholder="Search Documentation"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: {
      type: String,
      default: ""
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
