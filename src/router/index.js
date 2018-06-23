import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const Find = (resolve)=>require(['@/components/Find'],resolve)
const ele = (resolve)=>require(['@/components/ele'],resolve)
import HpSearch from "@/components/HpSearch"
import addressSer from "@/components/addressSer"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/homePage"
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: ele,
      children:[
        {
          path:"hpsearch",
          component:HpSearch
        },
       {
        path:"serAddress",
        component:addressSer
       }
      ]
    },
    {
      path:"/discover",
      name:"discover",
      component:Find
    }
  ]
})
