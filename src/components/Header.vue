<template>
  <b-jumbotron
    fluid
    class="header"
  >
    <div>
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
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchText: ""
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
  color: #02c39a;
}
a:hover {
  color: #f0f3bd;
  text-decoration: none;
}
.header {
  background-color: #05668d;
  color: whitesmoke;
}
</style>
