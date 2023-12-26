import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
var routes = [
    {
        path:'',
        redirect:'/login'
    },
    {
        path:"/echarts",
        component:()=>import("@/views/echarts.vue")
    },
    {
        path:"/login",
        component:()=>import("@/views/login")
    },
    {
        path:"/user",
        component:()=>import("@/views/user")
    },
    {
        path:"/life",
        component:()=>import("@/views/life")
    },
    {
        path:"/sport",
        component:()=>import("@/views/sport.vue")
    },
    {
        path:"/ill",
        component:()=>import("@/views/ill.vue")
    },
    {
        path:"/index",
        component:()=>import("@/views/index.vue")
    },
    {
        path:"/pexamination",
        component:()=>import("@/views/pexamination.vue")
    },
    {
        path:"/questions",
        component:()=>import("@/views/questions.vue")
    },
    {
        path:"/questionnaire",
        component:()=>import("@/views/questionnaire.vue")
    },
    {
        path:"/commentD",
        component:()=>import("@/views/commentD.vue")
    },
    {
        path:"/password",
        component:()=>import("@/views/password.vue")
    },
    {
        path:"/healthstatus",
        component:()=>import("@/views/healthstatus.vue")
    },
]

export default new Router({
    routes//设置路由表
})

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}