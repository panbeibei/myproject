import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Content from '../components/Content'
import Admin from '../components/Admin'
import Grade from '../components/Grade'
const Modify = null;
const Checkin = null;
const Query = null;
const Delete = null;
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/content'
    },{
      path:'/login',
      component:Login
    },{
      path:'/content',
      component:Content,
      children:[{
        path:'/content/grade',
        component:Grade
      },{
        path:'/content/modify',
        component:Modify
      },{
        path:'/content/checkin',
        component:Checkin
      },{
        path:'/content/query',
        component:Query
      },{
        path:'/content/delete',
        component:Delete
      },{
        path:'/content/admin',
        component:Admin
      },]
    }
  ]
})
