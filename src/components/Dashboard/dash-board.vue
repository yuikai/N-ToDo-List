<template>
<div id="dashboard">
  <p>Start planning your tasks today!</p>
  <b-button id="new-btn"
    @click="addForm">
    Create New Task
  </b-button>
</div>
</template>

<script>
export default {
  data() { return {
  }},

  methods: {
    addForm() {
      this.$emit( 'add-form', {
        st: 1,
        id: null,
      });
    },
  },
};
</script>

<style scoped>
#dashboard {
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#dashboard p {
  font-size: 1.8em;
}
#new-btn {
  margin: 10px 0px 100px 0px;
  padding: 5px 20px;

  border: 2px solid #B9B4C7;
  background-color: #1B1A55;

  font-size: 2em;
  color: #B9B4C7;

  &:hover {
    background-color: #2D4086;
    color: white;
    font-weight: 500;
  }

  &:active {
    border-color: #2D4086;
  }
}
</style>