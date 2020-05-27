import Vue from 'vue'
import {getToken} from '@/utils/storage.js'
import Router from 'vue-router'
Vue.use(Router)
const Indexs = () => import(/* webpackChunkName: "index" */ '@/page/Index.vue')
const Login = () => import(/* webpackChunkName: "index" */ '@/page/Login.vue')
const Reg = () => import(/* webpackChunkName: "index" */ '@/page/Reg.vue')
const Pwd = () => import(/* webpackChunkName: "index" */ '@/page/Pwd.vue')
const Evaluate = () => import(/* webpackChunkName: "index" */ '@/page/evaluate/evaluate.vue')
const Feedback = () => import(/* webpackChunkName: "index" */ '@/page/feedback/feedback.vue')
const Order = () => import(/* webpackChunkName: "index" */ '@/page/order/order.vue')
const Person = () => import(/* webpackChunkName: "index" */ '@/page/person/person.vue')
const router = new Router({
    routes:[{
        path:'/',
        component:Indexs,
        meta:{keepAlive:false},
        redirect:"/feedback",
        children:[{
            path:'/evaluate',
            component:Evaluate,
            meta:{keepAlive:false}
        },{
            path:'/feedback',
            component:Feedback,
            meta:{keepAlive:false}
        },{
            path:'/order',
            component:Order,
            meta:{keepAlive:false}
        },{
            path:'/person',
            component:Person,
            meta:{keepAlive:false}
        }]
    },{
        path:'/login',
        component:Login,
        meta:{keepAlive:false}
    },{
        path:'/reg',
        component:Reg,
        meta:{keepAlive:false}
    },{
        path:'/pwd',
        component:Pwd,
        meta:{keepAlive:false}
    }]
})

router.beforeEach((to,from,next)=>{//to,from,next
    //判断是否登录
    let token = getToken()
    if(!token && to.path !== '/login'){
        next("/login")
    }else{
        //未登录跳转到login页面
        next()
    }
    //登录了下一步

    
})

export default router