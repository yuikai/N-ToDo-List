<template>
  <div class="pending-container">
    lololol

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

  beforeRouteEnter(to, from, next) {
    console.log("Meta Data:", to.meta);
    next(vm => {
      vm.tasks = to.meta.tasks;
    });
  },
}
</script>

<style scoped>

</style>