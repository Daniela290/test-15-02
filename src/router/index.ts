import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL + (process.env.NODE_ENV === 'development' ? '' : "/test-15-02")),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/section-:id',
            name: 'section',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/SectionPage.vue'),
        },
    ],
})

export default router
