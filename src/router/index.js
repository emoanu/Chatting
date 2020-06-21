import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/HelloWorld.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path : "/about",
    name: "about",
    component:function() {
        return import("../components/About.vue");
    } ,
},{
    path : "/new-page",
    name: "n",
    component:function() {
        return import("../components/New.vue");
    } 
},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
