<template>
  <div class="pending-container">
    {{ tasks }}
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },

  created() {
    this.tasks = this.$router.params;
  }
}
</script>

<style scoped>

</style>