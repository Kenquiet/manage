import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('./views/index.vue');
const Home = () => import('./views/Home.vue');
const InfoShow = () => import('./views/InfoShow.vue');
const Register = () => import('./views/Register.vue');
const Login = () => import('./views/Login.vue');
const NotFound = () => import('./views/404.vue');


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
      name: 'Index',
      component: Index,
      children: [
        { path:'', component: Home },
        { path:'/home', name: 'Home', component: Home },
        { path:'/infoshow', name: 'InfoShow', component: InfoShow }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
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
