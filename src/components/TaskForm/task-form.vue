<template>
<div>
  <div id="mask"></div>
  <div id="form-container">
    <div id="label-title" class="label">
      <label>Task</label>
      <label class="error">
        {{ errorTitle }}
      </label>
    </div>
    <input name="title" v-model.trim="title"/>

    <div id="label-userid" class="label">
      <label>User ID</label>
      <label class="error">
        {{ errorUserID }}
      </label>
    </div>
    <input name="userid" v-model.number="userId"/>

    <div id="calendar">
      <b-calendar
        v-model="schedule"
        :min="new Date()"
        nav-button-variant="primary"
        block>
      </b-calendar>
    </div>

    <div id="delete" class="button"
      v-if="status === 2"
      @click="deleteTask">
      <img alt="Delete Button" src="../../assets/images/delete-icon.svg"/>
    </div>
    <div id="close" class="button"
      @click="close">
      <p>✖</p>
    </div>
    <div id="submit" class="button"
      @click="validate">
      <img alt="Submit Button" src="../../assets/images/save-icon.svg"/>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    status: {
      required: true,
    },
    temp: {
      required: true,
    }
  },
  data() { return {
    title: null,
    userId: null,
    schedule: null,

    errors: [
      false, false,
    ],
  }},
  computed: {
    errorTitle() {
      return this.errors[0] ? 'This field is required' : '';
    },
    errorUserID() {
      return this.errors[1] ? 'This field is required' : '';
    }
  },

  methods: {
    close() {
      this.$emit( 'close-form' );
    },
    deleteTask() {
      this.$emit( 'delete-task', {
        id: this.temp.id,
      });
    },

    validate() {
      if ( this.title === null ) {
        Vue.set( this.errors, 0, true );
      } else {
        Vue.set( this.errors, 0, false );
      }
      if ( this.userId === null ) {
        Vue.set( this.errors, 1, true );
      } else {
        Vue.set( this.errors, 1, false );
      }

      if ( !this.errors[0] && !this.errors[1] ) {
        this.submit();
      }
    },
    submit() {
      switch(this.status) {
        case 1:
          this.$emit( 'add-task', {
            userId: this.userId,
            title: this.title,
            schedule: this.schedule,
          });
          break;
        case 2:
          this.$emit( 'update-task', {
            id: this.temp.id,
            userId: this.userId,
            title: this.title,
            schedule: this.schedule,
          });
          break;
      }
    },
  },

  created() {
    if ( this.status === 2 ) {
      this.title = this.temp.title;
      this.userId = this.temp.userId;

      if ( this.temp.schedule ) {
        this.schedule = this.temp.schedule;
      }
    }
  },
}
</script>

<style scoped>
#mask {
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 100vh;

  background-color: black;
  opacity: 60%;
  z-index: 1000;
}

#form-container {
  position: fixed;
  top: 20%;
  min-width: 60%;
  margin: 0px 20%;
  padding: 20px 20px 20px 40px;
  
  border-radius: 10px;
  border: 2px solid #B9B4C7;
  background-color: #1B1A55;
  z-index: 1001;

  display: grid;
  column-gap: 20px;
  grid-template-rows: auto min-content min-content auto min-content min-content auto;
}

.label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.error {
  font-family: 'Red Hat Display Italic';
  font-size: .8em;
  color: tomato;
}
input {
  padding: 5px 10px;
  border-radius: 15px;
  border: 2px solid transparent;
}

#label-title {
  grid-row: 2;
  grid-column: 1;
}
#label-userid {
  grid-row: 5;
  grid-column: 1;
}
input[name="title"] {
  grid-row: 3;
  grid-column: 1;
}
input[name="userid"] {
  grid-row: 6;
  grid-column: 1;
}
#calendar {
  grid-row: 1/span 7;
  grid-column: 2;
}

.button {
  position: absolute;
  left: -25px;
  width: 50px;
  aspect-ratio: 1;

  border-radius: 100%;
  border: 2px solid #B9B4C7;
  background-color: #1B1A55;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}
.button img {
  width: auto;
  height: 22px;
  object-fit: contain;
}
.button p {
  margin: 0px;
  font-size: 2em;
  color: white;
}

#delete {
  top: 15%;

  &:hover {
    border-color: white;
    background-color: tomato;
  }

  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
#close {
  top: 45%;

  &:hover {
    border-color: white;
    background-color: tomato;
  }

  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
#submit {
  top: 75%;

  &:hover {
    border-color: white;
    background-color: #00ee77;
  }

  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>