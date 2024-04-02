<template>
<div>
  <div id="mask"></div>
  <div id="form-container">
    <div class="label">
      <label>Task</label>
      <label class="error">
        err
      </label>
    </div>
    <div class="label">
      <label>User ID</label>
      <label class="error">
        err
      </label>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() { return {

  }},
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
  width: 50%;
  height: 20em;
  margin: 0px 25%;
  
  border-radius: 10px;
  border: 2px solid #B9B4C7;
  background-color: #1B1A55;
  z-index: 1001;
}
</style>