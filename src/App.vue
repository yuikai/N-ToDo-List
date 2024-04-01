<template>
  <div id="app">
  <!-- v3

    <toDoForm v-if="status > 0"
      :status="status"
      :temp="temp"
      @discard="resetStatus"
      @add-task="addTask"
      @update-task="updateTask"
      @delete-task="deleteTask">
    </toDoForm>

    <toDoList
      :todos="todos"
      @open-form="changeStatus">
    </toDoList>

  -->

    <div id="header">
      <h1>ToDo List</h1>
    </div>
    <div id="sidebar">
      sidebar
    </div>
    <div id="container">
      content
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {
  },

  data() { return {
    todos: [],
  }},

  methods: {
    /* v3
    changeStatus({ status, id }) {
      this.status = status;
      if ( !(id === null) )
      this.temp = this.todos[this.todos.map(function(e){return e.id}).indexOf(id)];
    },
    resetStatus() {
      this.status = 0;
      this.temp = null;
    },

    addTask({ title, userId }) {
      var task = {
        id: (
          ( this.todos.length > 0 )
          ? this.todos[this.todos.length - 1].id + 1
          : 1
        ),
        userId: userId,
        title: title,
        completed: false,
      };

      this.todos.push( task );
      this.resetStatus();
    },
    updateTask({ title, userId }) {
      this.todos.indexOf(this.temp).userId = userId;
      this.todos.indexOf(this.temp).title = title;

      this.resetStatus();
    },
    deleteTask() {
      this.todos.splice(
        this.todos.map(
          function(e) { return e.id }
        ).indexOf(this.temp.id) , 1
      );
      this.resetStatus();
    },
    */

    

    // Axios HTTP Requests
    GETTask() {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then( response => {
          this.todos = response.data;
          console.log(response.data);
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
/* body theme */
.primary {
  background-color: #070F2B;
  color: #B9B4C7;
}

#header {
  background-color: red;
}

#sidebar {
  background-color: green;
}

#container {
  background-color: blue;
}

/* Positioning */
#app {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;
}
#header {
  grid-row: 1;
  grid-column: 1/span 2;
}
#sidebar {
  grid-row: 2;
  grid-column: 1;
}
#container {
  grid-row: 2;
  grid-column: 2;
}
</style>