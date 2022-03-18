<template>
    <el-header height="50px" class="mg-menu-header" :style="{background: headerMenuColor, color: menuTextColor}">
        <img src="~@/assets/logo.png" class="mg-menu-header-logo" v-if="!isCollapse"/>
        <span class="mg-menu-header-title" v-if="!isCollapse">{{ title }}</span>
    </el-header>
    <el-scrollbar class="mg-scrollbar" :style="{background: headerMenuColor}">
        <mg-menu/>
    </el-scrollbar>
</template>

<script setup>
import website from '@/config/website'
import MgMenu from '@/views/Layouts/components/MgMenu'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const title = ref(website.base_title)
const mgStore = useStore()
const headerMenuColor = computed(() => mgStore.getters['view/headerMenuColor'])
const menuTextColor = computed(() => mgStore.getters['view/menuTextColor'])
const isCollapse = computed(() => mgStore.getters['view/isCollapse'])
</script>

<style scoped lang="scss">
.mg-scrollbar {
    height: calc(100% - 50px);
    box-sizing: border-box;
}

.mg-menu-header {
    display: flex;
    align-items: center;
    line-height: 50px;

    .mg-menu-header-logo {
        width: 80px;
        height: 30px;
        margin-right: 15px;
    }

    .mg-menu-header-title {
        font-size: $base-font-size-big;
    }
}
</style>
