const view = {
    state: {
        breadcrumb: [],
        vMenu: {
            activeName: '',
            openNames: [],
            list: [],
            opened: []
        },
        isCollapse: false,
        isFullScren: false,
        color: {
            headerMenuColor: '#000c17',
            menuActiveColor: '',
            menuTextColor: '#fff',
            headerColor: '#fff',
            menuColor: 'linear-gradient(180deg, #5265B6 0%, #253573 100%)'
        }
    },
    getters: {
        headerMenuColor: (state) => state.color.headerMenuColor,
        menuActiveColor: (state) => state.color.menuActiveColor,
        menuTextColor: (state) => state.color.menuTextColor,
        headerColor: (state) => state.color.headerColor,
        menuColor: (state) => state.color.menuColor,
        isCollapse: (state) => state.isCollapse,
        vMenu: (state) => state.vMenu
    },
    mutations: {
        SET_BREADCRUMB_DATA (state, to) {
            const vMenus = to.path.split('/')
            state.breadcrumb = to.matched.slice(1)
            state.vMenu = {
                openNames: vMenus,
                activeName: '/' + vMenus.slice(1).join('/')
                // opened: vMenus.slice(-1).includes('Sleep') ? [] : [vMenus.slice(2, -1).pop()],
                // list: store.state.user.menus.find(item => item.path === vMenus[2])
            }
        },
        TOGGLE_COLLAPSE (state, isCollapse) {
            state.isCollapse = isCollapse || !state.isCollapse
        }
    },
    actions: {}

}
export default view
