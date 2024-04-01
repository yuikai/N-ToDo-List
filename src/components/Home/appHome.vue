<template>
<div class="home">
  <div id="header">
    <p>ToDo List App</p>
    <img alt="Profile Image" src="../../assets/images/profile-placeholder.svg"/>
  </div>
  <div id="sidebar">
    <b-button v-for="( route, index ) in routes"
      :key="index"
      :class="selected[index] ? 'active-tab' : 'tab'"
      @click="selectTab(index)">
      {{ route }}

      <div v-if="index > 0"
        class="count">
        {{ counts[index-1] }}
      </div>
    </b-button>
  </div>
  <div id="component-content">
  </div>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  data() { return {
    counts: [0, 0],

    routes: ['Dashboard', 'Completed', 'Pending'],
    selected: [true, false, false,],
  }},
  methods: {
    selectTab( id ) {
      for ( var i=0; i < this.routes.length; i++ ) {
        if ( i === id && this.selected[i] === true ) {
          Vue.set( this.selected, i, true);
        } else if ( i === id ) {
          Vue.set( this.selected, i, true);
          this.$router.push(this.routes[i]);
        } else {
          Vue.set( this.selected, i, false);
        }
      }
    },
  },
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;
}

#header {
  grid-row: 1;
  grid-column: 1/span 2;

  padding: 0px 20px;
  border-bottom: 1px solid #B9B4C7;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
#header p {
  margin: 0px;
  font-size: 1.5em;
  font-weight: 800;
}
#header img {
  height: 60%;
  width: auto;
  object-fit: contain;

  cursor: pointer;
}

#sidebar {
  padding: 5px 10px;
  border-right: 1px solid #B9B4C7;

  display: flex;
  flex-direction: column;
}
.btn {
  margin: 5px 0px;
  padding: 5px 20px;

  border: 0px solid transparent;
  background-color: #1B1A55;
  color: #B9B4C7;

  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #2D4086;
  }
}
.count {
  margin: 0px 0px 0px 15px;
  padding: 0px 8px;

  border-radius: 5px;

  background-color: #070F2B;
}
#sidebar .active-tab {
  background-color: #2D4086;
  font-weight: 500;
}
</style>