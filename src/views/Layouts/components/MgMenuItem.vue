<template>
    <template v-for="item in menus">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="parentUrl + item.path" :key="parentUrl + item.path">
            <template #title>
                <mg-icon class="mg-menu-icon" :name="item.meta.icon"/>
                <span class="mg-menu-title">{{ item.meta.title }}</span>
            </template>
            <mg-menu-item :menus="item.children" :parentUrl="parentUrl + item.path"/>
        </el-sub-menu>
        <el-menu-item v-else-if="!item.hidden" :index="parentUrl + item.path" :key="parentUrl + item.path" :route="{ path: `${parentUrl}${item.path}`}">
            <!--            <mg-icon class="mg-menu-icon" :name="item.meta.icon" />-->
            <span class="mg-menu-title">{{ item.meta.title }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    menus: {
        type: Array,
        require: true
    },
    parentUrl: {
        type: String,
        default: '/Manage'
    }
})
</script>

<style scoped lang="scss">
.mg-menu-title {
    padding-left: 8px;
}
</style>
