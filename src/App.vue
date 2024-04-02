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
        @add-form="changeStatus($event)"
        @update-form="changeStatus($event)">
      </router-view>
    </div>

    <task-form v-if="status > 0"
      >
    </task-form>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import taskForm from './components/TaskForm/task-form.vue';

export default {
  name: 'App',
  components: {
    taskForm,
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
      var pushFlag = true;

      for ( var i=0; i < this.selected.length; i++ ) {
        if ( this.selected[i] === true && i === id ) {
          pushFlag = false;
        } else {
          Vue.set( this.selected, i, false );
        }
      }
      Vue.set( this.selected, id, true );

      switch( id ) {
        case 0: 
          this.$router.params = null;
          break;
        case 1:
          this.$router.params = this.pendingTask;
          break;
        case 2:
          this.$router.params = this.completedTask;
          break;
      }

      if ( pushFlag ) { this.$router.push( this.routes[id].toLowerCase() ) }
    },

    // form handling
    changeStatus({ st, id }) {
      this.status = st;
      if ( !(id === null) ) {
        this.status = 2; // dummy
      }
    },
    resetStatus() {
      this.status = 0;
    },

    // Axios HTTP Requests
    GETTask( id = null ) {
      var path = 'https://jsonplaceholder.typicode.com/todos' + ( id === null ? '' : id );

      axios.get(path)
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
  width: 100%;
  min-height: 100vh;

  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: 12.5em 1fr;
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
  color: white;
}
.completed {
  background-color: #8bc34a;
  color: white;
}
</style>