import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import EditUserView from './views/EditUserView.vue';
import AddUserView from './views/AddUserView.vue';

const routes = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    component: HomeView,
    name: 'users'
  },
  {
    path: '/edit-user/:id',
    component: EditUserView,
    name: 'edit-user',
    props: true,
  },
  {
    path: '/add-user',
    component: AddUserView,
    name: 'add-user',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
