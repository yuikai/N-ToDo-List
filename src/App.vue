<template>
  <div id="app">
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
  </div>
</template>

<script>
import toDoForm from './components/toDoForm.vue'
import toDoList from './components/toDoList.vue';

export default {
  name: 'App',
  components: {
    toDoForm,
    toDoList,
  },

  data() { return {
    original: [],
    todos: [],
    status: 0,
    temp: null,
  }},

  methods: {
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
      this.todos.push({
        id: (
          ( this.todos.length > 0 )
          ? this.todos[this.todos.length - 1].id + 1
          : 1
        ),
        userId: userId,
        title: title,
        completed: false,
      })
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
  },

  created() {
    fetch( 'https://jsonplaceholder.typicode.com/todos/' )
      .then( response => response.json() )
      .then( json => {
        this.original = json;
        this.todos = this.original.slice(0, 10);
      })
      .catch( error => {
        console.error('Error while fetching JSON:', error);
      });
  },
}
</script>

<style>
.primary {
  background-color: #070F2B;
  color: #B9B4C7;
}
</style>