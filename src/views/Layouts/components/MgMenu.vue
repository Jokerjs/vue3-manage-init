<template>
    <el-menu class="mg-menu"
             :text-color="menuTextColor"
             :background-color="headerMenuColor"
             router
             unique-opened
             :default-active="vMenu.activeName"
             :collapse="isCollapse">
        <mg-menu-item :menus="menus"/>
    </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MgMenuItem from '@/views/Layouts/components/MgMenuItem'

const mgStore = useStore()
const headerMenuColor = computed(() => mgStore.getters['view/headerMenuColor'])
const menuTextColor = computed(() => mgStore.getters['view/menuTextColor'])
const isCollapse = computed(() => mgStore.getters['view/isCollapse'])
const vMenu = computed(() => mgStore.getters['view/vMenu'])
const menus = computed(() => mgStore.getters['user/menus'])
</script>

<style scoped lang="scss">
.mg-menu {
    padding: 4px 8px;
    border-right: none;

    ::v-deep {
        .el-sub-menu__title {
            padding-left: 12px !important;
            padding-right: 12px !important;
            margin-bottom: 5px;

            &:hover {
                background: $base-menu-background-active !important;
            }
        }

        .el-menu-item {
            padding: 0 28px !important;
            height: var(--el-menu-item-height);
            line-height: var(--el-menu-item-height);
            margin-bottom: 5px;

            &:hover {
                background: $base-menu-background-active !important;
            }
        }

        .el-menu-item.is-active {
            border-radius: var(--el-border-radius-small);
            background: $base-menu-background-active;
            color: $base-menu-color-active;
        }
    }
}
</style>
