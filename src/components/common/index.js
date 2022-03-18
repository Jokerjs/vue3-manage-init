const common = require.context('./', false, /\.vue$/)
export default {
    install: function(Vue) {
        common.keys().forEach((key) => {
            const name = key.replace(/(\.\/|\.vue)/g, '')
            Vue.component(name, common(key).default)
        })
    },
}
