import {

    createRouter,
    createWebHistory
} from 'vue-router';
import Home from '../views/Home.vue'



const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: "年度数据总结"
    }
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})



export default router