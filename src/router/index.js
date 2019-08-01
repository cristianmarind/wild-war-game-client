import VueRouter from 'vue-router'
import Lobby from '@/views/Lobby'
import Play from '@/views/Play'

const router = new VueRouter({
    routes: [
        // dynamic segments start with a colon
        { path: '/', component: Lobby },
        { path: '/play', component: Play }
    ]
})


export default router;