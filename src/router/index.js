import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewEmployee from '@/components/ViewEmployee'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from , next) => {
    // Check for the required Auth Guards
    if(to.matched.some(record => record.meta.requiresAuth)){
      // Check if Not Logged in
      if(!firebase.auth().currentUser){
        // Go to Login
        next({
          path: '/login',
          query:{
            redirect: to.fullPath
          }
        });
      } else{
        // Proceed to route
        next();
      }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
      // Check if Logged in
      if(firebase.auth().currentUser){
        // Go to Login
        next({
          path: '/',
          query:{
            redirect: to.fullPath
          }
        });
      } else{
        // Proceed to route
        next();
      }
    } else {
      // Proceed to next
      next();
    }
});

export default router;


// Nav Guards
