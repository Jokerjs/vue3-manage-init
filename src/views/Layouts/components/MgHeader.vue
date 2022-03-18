<template>
    <div class="mg-header">
        <el-icon :size="20" @click="collapsedSider">
            <Expand v-if="isCollapse" />
            <fold v-else />
        </el-icon>
        <el-dropdown @command="command">
            <span class="avatar-dropdown">
                <img class="user-avatar" :src="avatar" alt=""/>
                <div class="user-name">
                    <span>{{ username }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            </span>
            <template #dropdown>
                <el-dropdown-item command="github">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const mgStore = useStore()
const mgRouter = useRouter()

const avatar = computed(() => mgStore.getters['user/avatar'])
const username = computed(() => mgStore.getters['user/username'])
const isCollapse = computed(() => mgStore.getters['view/isCollapse'])

function collapsedSider(){
    mgStore.commit('view/TOGGLE_COLLAPSE')
}
function command(type){
    switch (type){
        case 'logout':
            mgStore.commit('user/USER_INFO_LOGINOUT')
            mgRouter.push({ path: '/login'});
            break;
    }
}
</script>

<style scoped lang="scss">
.mg-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-collapse {
    font-size: 18px;
}
.avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .user-avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
    }

    .user-name {
        position: relative;
        margin-left: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
}
</style>
