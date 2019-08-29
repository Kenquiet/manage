import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

 const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./views/404.vue')
    }
  ]
});

 router.beforeEach((to, form, next)=> {
   const isLogin = localStorage.eleToken ? true : false
   if (to.path === '/login' || to.path === '/register') {
     next();
   }else {
     isLogin ? next() : next('/login');
   }
 });

export default router;
