export default {
    isExstsFile (filespec) {
        let isFile = false
        try {
            require(`@/views${filespec}`)
            isFile = true
        } catch (error) {
            isFile = false
        }
        return isFile
    },
    genChildrenRoute (routers, path = '') {
        return routers.map(item => {
            const childrenPath = `${path}/${item.name}`
            const view = item.children && item.children.length ? '/Layouts/LayoutsView' : this.isExstsFile(childrenPath) ? `${childrenPath}` : '/error/404'
            const route = {
                name: item.name,
                path: item.name,
                view: view,
                component: () => import(`@/views${view}`)
            }
            if (item.children && item.children.length) {
                route.redirect = `${childrenPath}/${item.children[0].name}`
                route.children = this.genChildrenRoute(item.children, childrenPath)
            }
            return route
        })
    },
    createRouters (menu, path = '/Manage') {
        return {
            path,
            meta: { title: '系统后台' },
            view: '@/views/Layouts',
            component: () => import('@/views/Layouts'),
            children: this.genChildrenRoute(menu, path),
            redirect: `${path}/${menu[0].name}`
        }
    }
}
