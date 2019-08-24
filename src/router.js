import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Extra from './extra'
import swapper from './views/Swapper.vue'

Vue.use(Router)

const router = new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path:'/swapper',
      name:'swapper',
      component:swapper,  
      meta:{
        guest: true,
        title:'Swapper'
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        guest: true,
        title:'SEMINAR REGISTRATION'
      }
    },
    {
      path: '/login',
      name: 'login',
      component:()=>import('./views/Login.vue'),
      meta:{
        title:'LOGIN',
        guest: true
      }
    },
    {
      path: '/booking/:id',
      name: 'booking',
      component:()=>import('./views/Booking.vue'),
      meta:{
        guest: true,
        title:'SEMINAR REGISTRATION'
      }
    },
    {
      path: '/success/:title',
      name: 'success',
      component: () => import(/* webpackChunkName: "about" */ './views/Success.vue'),
      meta:{
        guest: true,
        title:'SUCCESS'
      }
    },
    {
      path: '/bookingFully',
      name: 'bookingFully',
      component: () => import(/* webpackChunkName: "about" */ './views/BookingFully.vue'),
      meta:{
        guest: true,
        title:'BOOKING FULL'
      }
    },
    {
      path:'/admin',
      name:'admin',
      component:()=>import('./views/Admin/index.vue'),
      children:[
          {meta:{
            title:'SEMINARS',
            guest: false
          },path:'/',name:'dashbord',component:()=>import('./views/Admin/Scheduled.vue')},//home.vue
          {meta:{
            guest: false
          },path:'/admin/seminar',name:'seminar',component:()=>import('./views/Admin/Seminar.vue')},
          {meta:{
            title:'CREATE SEMINAR',
            guest: false
          },path:'/admin/seminar/create',name:'seminarCreate',component:()=>import('./views/Admin/SeminarCreate.vue')},
          {meta:{
            guest: false,
            title:'REGISTER'
          },path:'/admin/seminar/register/:id?',name:'seminarRegister',component:()=>import('./views/Admin/Register.vue')},
          {meta:{
            title:'SCHEDULED SEMINARS',
            guest: false
          },path:'/admin/seminar/scheduled/:id?',name:'seminarscheduled',component:()=>import('./views/Admin/Scheduled.vue')},
      ],
      meta:{
        guest: false
      }
    }
  ]
})


router.beforeEach((to,from,next) => {
  if(to.matched.some(e => !e.meta.guest)){
       if(Extra.isAuthenticated() === true){
         next(true)
       }else{
        next('/login')
       }
    }else{
      if(Extra.isAuthenticated() && (from.path == '/' || to.path == '/')){
        next('/admin');        
      }else{
        next();
      }
  }

})

export default router