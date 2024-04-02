<template>
  <div id="app">
    <div id="header">
      <p>ToDo List App</p>
      <img alt="Profile Image" src="./assets/images/profile-placeholder.svg"/>
    </div>

    <div id="sidebar">
      <b-button v-for="( route, index ) in routes"
        :key="index"
        :class="selected[index] ? 'active-tab' : 'tab'"
        @click="selectTab(index)">
        {{ route }}

        <div v-if="index > 0"
          :class="['count', index < 2 ? 'pending' : 'completed']">
          {{ index === 1 ? pendingTaskCount : completedTaskCount }}
        </div>
      </b-button>
    </div>

    <div id="component-content">
      <router-view
        @add-form="changeStatus( 1, null )">
      </router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
  },

  data() { return {
    selected: [true, false, false],
    routes: [
      "Dashboard",
      "Pending",
      "Completed",
    ],

    todos: [],
    status: 0,
  }},
  computed: {
    // list filtering
    pendingTask() {
      return this.todos.filter( task => task.completed === false );
    },
    completedTask() {
      return this.todos.filter( task => task.completed === true );
    },

    // filtered list count
    pendingTaskCount() {
      return this.pendingTask.length;
    },
    completedTaskCount() {
      return this.completedTask.length;
    },
  },

  methods: {
    // switching tabs
    selectTab( id ) {
      for ( var i=0; i < this.routes.length; i++ ) {
        if ( i === id && this.selected[i] === true ) {
          Vue.set( this.selected, i, true);
        } else if ( i === id ) {
          Vue.set( this.selected, i, true);

          this.$router.push( this.routes[i].toLowerCase() );
          this.$router.params = (i === 1) ? this.pendingTask : this.completedTask;
        } else {
          Vue.set( this.selected, i, false);
        }
      }
    },

    // form handling
    changeStatus( st, id ) {
      this.status = st;
      if ( !(id === null) ) {
        this.status = 2; // dummy
      }
    },

    // Axios HTTP Requests
    GETTask() {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then( response => {
          this.todos = response.data;
          console.log("GET Tasks from JSONPlaceholder");
        })
        .catch( error => {
          console.log(error);
        });
    },
    POSTTask( task ) {
      axios.post('https://jsonplaceholder.typicode.com/todos', task)
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.log(error);
        });
    },
    PUTTask( id, task ) {
      var path = 'https://jsonplaceholder.typicode.com/todos/' + id;
      axios.put(path, task)
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.log(error);
        });
    },
    DELETETask( id ) {
      var path = 'https://jsonplaceholder.typicode.com/todos/' + id;
      axios.delete(path)
        .then( response => {
          console.log(response.data);
        })
        .catch( error => {
          console.log(error);
        });
    },
  },

  created() {
    // request data when created the vue application
    this.GETTask();
  },
}
</script>

<style>
@font-face {
  font-family: 'Red Hat Display';
  src: url('./assets/fonts/RedHatDisplay-VariableFont_wght.ttf');
}
@font-face {
  font-family: 'Red Hat Displat Italic';
  src: url('./assets/fonts/RedHatDisplay-Italic-VariableFont_wght.ttf');
}

/* body theme */
.primary {
  background-color: #070F2B;
  color: #B9B4C7;

  font-family: 'Red Hat Display';
}

/* base styling */
#app {
  width: 100vw;
  min-height: 100vh;

  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;
}

#header {
  grid-row: 1;
  grid-column: 1/span 2;

  height: 3.5rem;
  padding: 0px 20px;
  border-bottom: 1px solid #B9B4C7;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
#header p {
  margin: 0px;

  font-size: 1.5em;
  font-weight: 600;
}
#header img {
  width: auto;
  height: 60%;
  border-radius: 100%;
  object-fit: contain;
  cursor: pointer;
  background-color: #1B1A55;

  &:hover {
    background-color: #2D4086;
  }

  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

#sidebar {
  padding: 5px 10px;
  border-right: 1px solid #B9B4C7;

  display: flex;
  flex-direction: column;
}
#sidebar .tab, #sidebar .active-tab {
  margin: 5px 0px;
  padding: 5px 20px;

  
  color: #B9B4C7;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #2D4086;
    color: white;
    font-weight: 500;
  }
}
.count {
  margin: 0px 0px 0px 15px;
  padding: 0px 8px;
  border-radius: 5px;
  color: white;
}
#sidebar .tab {
  border: 2px solid transparent;
  background-color: #1B1A55;
}
#sidebar .active-tab {
  border: 0px solid transparent;
  background-color: #2D4086;
  font-weight: 500;

  &:hover {
    color: white;
  }
}
.pending {
  background-color: #ff9800;
}
.completed {
  background-color: #8bc34a;
}
</style>