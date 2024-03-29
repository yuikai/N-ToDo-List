<template>
  <div class="toDoList-container">

    <!-- Pending Section -->
    <b-button class="header" id="pending"
      v-b-toggle.collapse-pending>
      Pending
      <p>{{ pendingCount }}</p>
      <h6>{{ pendingCollapsedIndicator }}</h6>
    </b-button>
    <b-collapse class="collapse" id="collapse-pending" v-model="collapsePending">
      <div class="pending item" v-for="task in pendingTask"
        :key="task.id">
        <h2 @click="openForm(2, task.id)">{{ task.title }}</h2>
        <p>User: {{ task.userId }}</p>
        <b-form-checkbox
          size="lg"
          v-model="task.completed">
        </b-form-checkbox>
      </div>

      <div class="empty-indicator" v-if="pendingCount === 0">
        No Pending Task :)
      </div>

    </b-collapse>
    <!-- End of Pending Section -->

    <!-- Completed Section -->
    <b-button class="header" id="completed"
      v-b-toggle.collapse-completed>
      Completed
      <p>{{ completedCount }}</p>
      <h6>{{ completedCollapsedIndicator }}</h6>
    </b-button>
    <b-collapse class="collapse" id="collapse-completed" v-model="collapseCompleted">
      <div class="completed item" v-for="task in completedTask"
        :key="task.id">
        <b-form-checkbox
          size="lg"
          v-model="task.completed">
        </b-form-checkbox>
        <h2 @click="openForm(2, task.id)">{{ task.title }}</h2>
        <p>User: {{ task.userId }}</p>
      </div>

      <div class="empty-indicator" v-if="completedCount === 0">
        Completed Task Will be Listed Here.
      </div>
      
    </b-collapse>
    <!-- End of Completed Section -->

    <b-button id="add-btn" @click="openForm(1, null)">Add New Task</b-button>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      required: true,
    },
  },
  data() { return {
    // tracking section collapse status
    collapsePending: false,
    collapseCompleted: false,
  }},
  computed: {
    // filtering based on completion status
    pendingTask() {
      return this.todos.filter(todo => !todo.completed);
    },
    completedTask() {
      return this.todos.filter(todo => todo.completed);
    },

    // filtered task count
    pendingCount() {
      return this.pendingTask.length;
    },
    completedCount() {
      return this.completedTask.length;
    },

    // indicator shown when collapsed
    pendingCollapsedIndicator() {
      return this.collapsePending ? '' : '◄ Click to Expand';
    },
    completedCollapsedIndicator() {
      return this.collapseCompleted ? '' : '◄ Click to Expand';
    },
  },

  methods: {
    openForm( status, id ) {
      this.$emit( 'open-form', {
        status: status,
        id: id,
      });
    },
  },
}
</script>

<style scoped>
/* Layout & Positioning */
.toDoList-container {
  width: 100%;

  display: grid;
}
.item {
  display: grid;
  gap: 0px 2%;
}
@media screen and (max-width: 799.98px) {
  .item {
    grid-template-columns: 1fr min-content;
  }
  .item h2 {
    grid-row: 1;
    grid-column: 1;
  }
  .item p {
    grid-row: 2;
    grid-column: 1;
  }
  .item b-form-checkbox {
    grid-column: 2;
  }
}
@media screen and (min-width: 800px) {
  .toDoList-container {
    grid-template-columns: 50% 50%;
  }

  #pending {
    grid-row: 1;
  }
  #completed {
    grid-row: 1;
  }
  #collapse-pending {
    grid-row: 2;
    grid-column: 1;
  }
  #collapse-completed {
    grid-row: 2;
    grid-column: 2;
  }
  #add-btn {
    grid-row: 3;
    grid-column: 1/span 2;
  }

  .pending {
    grid-template-columns: 1fr min-content;
  }
  .pending h2 {
    grid-column: 1;
  }
  .pending p {
    grid-column: 1;
  }
  .pending b-form-checkbox {
    grid-column: 2;
  }
  
  .completed {
    grid-template-columns: min-content 1fr;
  }
  .completed h2 {
    grid-column: 2;
  }
  .completed p {
    grid-column: 2;
  }
  .completed b-form-checkbox {
    grid-column: 1;
  }
}

/* Styling */
.header {
  border-width: 0px;
  background-color: #070F2B;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: 500;

  &:hover {
    background-color: #1B1A55;
    z-index: 1000;
  }
}
.header p {
  margin: 0px 0px 0px 10px;
  padding: 2px 15px;

  border-radius: 10px;

  font-size: 1rem;
  font-weight: 800;
  color: #070F2B;
}
.header h6 {
  margin: 0px 0px 0px 10px;

  font-size: 1rem;
  font-weight: 500;
}
.btn:focus {
  box-shadow: none;
}

.not-collapsed {
  border-radius: 10px 10px 0px 0px;
}
.collapsed {
  border-radius: 10px;
}

#pending p {
  background-color: #ffaa00;
}
#completed p {
  background-color: #00ff03;
}

.collapse {
  height: min-content;
  padding: 20px;
  border-radius: 0px 0px 10px 10px;
}
#collapse-pending {
  background-color: #9290C3;
}
#collapse-completed {
  background-color: #535C91;
}

.item {
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: #1B1A55;
    color: white;
  }

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.item:last-child {
  margin: 0px;
}
.pending {
  color: #535C91;
}
.item h2 {
  margin: 0px;

  font-size: 1.2rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
.item p {
  margin: 0px;

  font-style: italic;
  font-size: .9rem;
}

.empty-indicator {
  padding: 10px;
  border-radius: 10px;

  background-color: #070F2B;
  color: white;
}

#add-btn {
  margin: 20px auto 0px auto;
  padding: 5px 20%;

  border: 3px solid white;
  background-color: #070F2B;

  font-size: 1.5rem;
  font-weight: 500;

  &:hover {
    background-color: #1B1A55;
  }
}
</style>