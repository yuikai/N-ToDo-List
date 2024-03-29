<template>
<div>
  <div class="background"></div>
  <div class="toDoForm-container">
    <span>
      <h6>Title</h6>
      <p>{{ titleError }}</p>
    </span>
    <input v-model.trim="title"
      required
      placeholder="Enter title of the new task"/>

    <span>
      <h6>User ID</h6>
      <p>{{ idError }}</p>
    </span>
    <input v-model.trim="userId"
      required
      placeholder="Enter user ID"/>

    <div id="close-btn" @click="discard">╳</div>
    <img v-if="status === 2"
      @click="deleteTask"
      alt="Delete Button"
      src="../assets/images/delete-icon.svg"/>
    <img
      @click="validate"
      alt="Save Button"
      src="../assets/images/save-icon.svg"/>
  </div>
</div>
</template>

<script>
export default {
  props: {
    status: {
      required: true,
      type: Number,
    },
    temp: {
      required: true,
    },
  },
  data() { return {
    validTitle: true,
    validId: true,

    title: (this.status === 2 ? this.temp.title : null),
    userId: (this.status === 2 ? this.temp.userId : null),
  }},
  computed: {
    titleError() {
      return this.validTitle ? '' : 'This field is required';
    },
    idError() {
      return this.validId ? '' : 'This field is required';
    },
  },

  methods: {
    discard() {
      this.$emit( 'discard' );
    },

    validate() {
      if ( this.title === null || this.title === '' ) {
        this.validTitle = false;
      } else {
        this.validTitle = true;
      }

      if ( this.userId === null || this.userId === '' ) {
        this.validId = false;
      } else {
        this.validId = true;
      }
      
      if ( this.validTitle && this.validId ) {
        switch( this.status ) {
          case 1:
            this.addTask();
            break;
          case 2:
            this.updateTask();
            break;
          default:
            console.log('Invalid status.')
            break;
        }
      }
    },
    addTask() {
      this.$emit( 'add-task', {
        title: this.title,
        userId: this.userId,
      });
    },
    updateTask() {
      this.$emit( 'update-task', {
        title: this.title,
        userId: this.userId,
      });
    },
    deleteTask() {
      this.$emit( 'delete-task' );
    }
  },
}
</script>

<style scoped>
/* Layout & Positioning */
@media screen and (max-width: 799.98px) {
  .toDoForm-container {
    width: 100%;

    border-radius: 0px 0px 20px 20px;
  }

  #close-btn {
    width: 70px;
    height: 70px;
    bottom: -35px;
    padding: 5px 10px 10px 10px;
  }
  img {
    width: 70px;
    bottom: -35px;
  }
}
@media screen and (min-width: 800px) {
  .toDoForm-container {
    width: 50%;
    margin: 5rem 25%;

    border-radius: 10px;
  }

  #close-btn {
    width: 60px;
    height: 60px;
    bottom: -30px;
    padding: 0px 10px 10px 10px;
  }
  img {
    width: 60px;
    bottom: -30px;
  }
}

/* Styling */
.background {
  content:'';
  position:fixed;
  top: 0px;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 60%;

  z-index: 999;
}
.toDoForm-container {
  position: fixed;
  height: 30%;

  border: 3px solid white;
  background-color: #1B1A55;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

span {
  width: 80%;

  display: flex;
  justify-content: space-between;
}
span h6 {
  margin: 0px;
  
  color: white;
}
span p {
  margin: 0px;
  padding: 0px;

  font-size: 15px;
  font-style: italic;
  color: #FF204E;
}
input {
  width: 80%;
  margin: 0px 0px 20px 0px;
  padding: 5px 12px;
  
  border-radius: 10px;
  border: 3px solid #535C91;
}

#close-btn {
  position: absolute;
  left: 10%;
  aspect-ratio: 1;

  border-radius: 20px;
  border: 3px solid white;
  object-fit: scale-down;
  background-color: #070F2B;

  font-size: 2rem;
  font-weight: 1000;
  text-align: center;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #FF204E;
  }
}
img {
  position: absolute;
  aspect-ratio: 1;
  padding: 10px;
  
  border-radius: 20px;
  border: 3px solid white;
  object-fit: scale-down;
  background-color: #070F2B;
  cursor: pointer;
}
img[alt="Delete Button"]:hover {
  background-color: #FF204E;
}
img[alt="Save Button"] {
  right: 10%;

  &:hover {
    background-color: #00e70d;
  }
}
</style>