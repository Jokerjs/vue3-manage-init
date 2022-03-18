<template>
    <el-container class="mg-container">
        <el-aside :width="isCollapse ? '60px' : '260px'">
            <mg-side/>
        </el-aside>
        <el-container>
            <el-header height="50px" :style="{background: `${headerColor}`}" class="mg-el-header">
                <mg-header/>
            </el-header>
            <el-main class="mg-layout-content">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import MgSide from '@/views/Layouts/components/MgSide'
import MgHeader from '@/views/Layouts/components/MgHeader'
import { computed } from 'vue'
import { useStore } from 'vuex'

const mgStore = useStore()

const isCollapse = computed(() => mgStore.getters['view/isCollapse'])
const headerColor = computed(() => mgStore.getters['view/headerColor'])
</script>

<style scoped lang="scss">
.mg-container {
    height: 100vh;
}

.mg-el-header {
    border-bottom: 1px solid $base-border-color;
}

.mg-layout-content {
    position: relative;
    padding: 15px;
}
</style>
