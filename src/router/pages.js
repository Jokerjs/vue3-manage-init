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
    //     component: () => import('@/views/Layouts'),
    //     children: [
    //         {
    //             path: 'DualReferral',
    //             component: () => import('@/views/Layouts/LayoutsView'),
    //             children: [
    //                 {
    //                     path: 'ChangeInto',
    //                     component: () => import('@/views/Manage/DualReferral/ChangeInto')
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        path: '/noPage',
        name: 'noPage',
        component: () => import('@/views/Layouts'),
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/error/404')
            }
        ]
    }
]
