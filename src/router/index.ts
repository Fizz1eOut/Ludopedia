import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ResetPassword from '@/components/Content/Auth/ResetPassword.vue';
import FavoritesView from '@/views/FavoritesView.vue';
import GameDetailsView from '@/views/GameDetailsView.vue';
import GamesView from '@/views/GamesView.vue';
import MyCommentsView from '@/views/MyCommentsView.vue';

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
    { path: '/favorites', name: 'favorites', component: FavoritesView, meta: { title: 'Favorites' } },
    { path: '/game/:id', name: 'game', component: GameDetailsView, meta: { title: 'Game' }, props: true },
    { path: '/games', name: 'games', component: GamesView, meta: { title: 'Games' } },
    { path: '/profile/comments', name: 'my-comments', component: MyCommentsView, meta: { title: 'MyComments' } },
  ],
  scrollBehavior,
});

export default router;  
