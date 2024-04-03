<template>
  <div class="completed-container">
    <table class="completed table" v-if="taskCount > 0">
      <thead>
        <th scope="col" class="col-auto">#</th>
        <th scope="col" class="col-1">User Id</th>
        <th id="task-title" scope="col" class="col">Task</th>
        <th scope="col" class="col-auto">Schedule</th>
        <th scope="col" class="col-auto">Status</th>
      </thead>
      <tbody>
        <tr v-for="( task, index ) in tasks"
          :key="task.id">
          <th scope="row" class="col-auto"
            @click="updateForm( task.id )">
            {{ index + 1 }}
          </th>
          <td class="col-2"
            @click="updateForm( task.id )">
            {{ task.userId }}
          </td>
          <td id="task-title" class="col"
            @click="updateForm( task.id )">
            {{ task.title }}
          </td>
          <td class="col-auto"
            @click="updateForm( task.id )">
            <b-button class="schedule"
              v-if="!task.schedule"
              @click="updateForm( task.id )">
              Schedule
            </b-button>
            <div v-if="task.schedule">{{ task.schedule }}</div>
          </td>
          <td class="col-auto">
            <b-form-checkbox size="lg"
              v-model="task.completed">
            </b-form-checkbox>
          </td>
        </tr>
      </tbody>
    </table>

    <p id="placeholder" v-if="taskCount === 0">There is no completed task.</p>

    <b-button :id="taskCount > 0 ? 'btn-default' : 'btn-empty'"
      @click="addForm">
      Create New Task
    </b-button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    taskCount() {
      return this.tasks.length;
    },
  },

  methods: {
    addForm() {
      this.$emit( 'add-form', {
        st: 1,
        id: null,
      });
    },
    updateForm( id ) {
      this.$emit( 'update-form', {
        st: 2,
        id: id,
      })
    },
  },

  created() {
    this.tasks = this.$router.params;
  }
}
</script>

<style scoped>
.completed {
  margin: 0px;
}
.completed thead {
  border-top: 0xp;
}
.completed td, .completed tr th {
  border-color: #B9B4C7;
  background-color: #2D4086;
  color: #B9B4C7;

  text-align: center;
  align-content: center;

  cursor: pointer;
}
#task-title {
  text-align: left;
}
.completed th {
  text-align: center;
  align-content: center;
}

.completed-container .btn {
  border: 2px solid #B9B4C7;
  background-color: #1B1A55;
  color: #B9B4C7;

  &:hover {
    background-color: #2D4086;
    color: white;
    font-weight: 500;
  }
}
.completed-container #btn-default {
  position: fixed;
  top: 8px;

  &:hover {
    color: white;
    font-weight: 500;
  }
}
.completed-container #btn-empty {
  margin: 0px auto;
  padding: 5px 20px;

  font-size: 2em;

  &:hover {
    color: white;
    font-weight: 500;
  }
}

#placeholder {
  width: max-content;
  margin: 160px auto 25px auto;
  font-size: 1.8em;
}
</style>