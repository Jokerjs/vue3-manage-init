export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/',
        redirect: '/Manage'
    },
    // {
    //     path: '/Manage',
    //     name: 'layout',
    //     component: () => import('@/views/Layouts'),
    //     children: []
    // },
    {
        path: '/noPage',
        name: 'noPage',
        component: () => import('@/views/Layouts/LayoutsView'),
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/error/404')
            }
        ]
    }
]
