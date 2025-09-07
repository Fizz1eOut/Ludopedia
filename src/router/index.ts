import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ResetPassword from '@/components/Content/Auth/ResetPassword.vue';

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else if (to.path !== from.path) {
    return { top: 0 };
  }
  return {};
};

const router = createRouter({
  history: createWebHashHistory('/Ludopedia'),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/reset-password/:params*', name: 'reset-password', component: ResetPassword, meta: { title: 'Reset-password' } },
  ],
  scrollBehavior,
});

export default router;  
