<template>
    <template v-for="item in menus">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="getPath(item)" :key="getPath(item)">
            <template #title>
                <mg-icon class="mg-menu-icon" :name="'zhusheqi'"/>
                <span class="mg-menu-title">{{ item.meta.title }}</span>
            </template>
            <mg-menu-item :menus="item.children" :parentUrl="getPath(item)"/>
        </el-sub-menu>
        <template v-else-if="!item.hidden">
            <el-menu-item :index="getPath(item)" :key="getPath(item)" :route="{ path: getPath(item)}">
                <mg-icon class="mg-menu-icon" :name="'zhusheqi'" />
                <span class="mg-menu-title">{{ item.meta.title }}</span>
            </el-menu-item>
        </template>
    </template>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    menus: {
        type: Array,
        require: true
    },
    parentUrl: {
        type: String,
        default: '/Manage'
    }
})

function getPath(item) {
    return `${props.parentUrl}/${item.name}`
}
</script>

<style scoped lang="scss">
.mg-menu-title {
    padding-left: 8px;
}
</style>
