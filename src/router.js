import Vue from 'vue';
import VueRouter from 'vue-router';

import dashBoard from './components/Dashboard/dash-board.vue';
import completedTask from './components/Completed/completed-task.vue';
import pendingTask from './components/Pending/pending-task.vue';
import TaskForm from './components/TaskForm/task-form.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    component: dashBoard,
  },
  {
    path: '/completed',
    component: completedTask,
    props: true,
  },
  {
    path: '/pending',
    component: pendingTask,
    props: true,
  },
  {
    path: '/form',
    component: TaskForm,
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') { // Redirect to /dashboard if navigating to root
    next('/dashboard');
  } else {
    next();
  }
});

export default router;