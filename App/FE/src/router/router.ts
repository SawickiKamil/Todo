import { ROUTE } from '@/constants'
import { router } from './instance'
import { setDocumentTitle } from './utils'
import { Route } from 'vue-router'

const routes = [
    {
        name: ROUTE.START,
        path: '/',
        redirect: (to: Route) => {
            return { name: ROUTE.TASK_LIST, query: to.query }
        },
    },
    {
        path: '/app',
        component: () => import('@/views/Todos.vue'),
        redirect: { name: ROUTE.TASK_LIST },
        children: [
            {
                name: ROUTE.TASK_LIST,
                path: '/tasks',
                component: () => import('@/views/Todos/views/Tasks/Tasks.vue'),
            },
            {
                name: ROUTE.TASK_CREATE,
                path: '/tasks/create',
                component: () => import('@/views/Todos/views/TaskEdit/TaskEdit.vue'),
            },
        ],
    },
    {
        path: '*', // 404
        redirect: { name: ROUTE.TASK_LIST },
    },
]

routes.forEach((route) => router.addRoute(route))
router.afterEach((to) => {
    // afterEach is called before DOM change, so `window.location.href` is not equal
    // to `to.fullPath`, timeout is temporary hack https://github.com/vuejs/vue-router/issues/2079
    // suprisingly it works in firefox without timeout (technically it shouldn't)
    setTimeout(() => {
        setDocumentTitle(to?.meta?.title)
    }, 0)
})

export { router }
