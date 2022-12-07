<template>
    <div class="mg-layout-container">
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="角色名称">
                <el-input v-model="query.roleName" placeholder="角色名称" clearable @clear="getList()"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="getList()">查询</el-button>
                <el-button type="primary" :icon="Plus" @click="handleEdit()">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" border stripe v-loading="loading">
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column prop="roleCode" label="角色编码" align="center"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
                <template #default="{row}">{{ Date.format(row.createTime) }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{row}">
                    <el-button type="primary" @click="handleEdit(row)">修改</el-button>
                    <el-button type="primary" @click="handleRoleMenu(row)">授权</el-button>
                    <el-button type="primary" @click="handleDelete(row)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <mg-pagination :total="total" v-model:pageSize="query.pageSize" v-model:currentPage="query.pageNo" @change="getList(query)"/>

        <edit-dialog v-model:formData="dialogModel.formData" v-model:dialogFormVisible="dialogModel.dialogFormVisible" @onSubmit="getList(query)"/>
        <role-menu-dialog v-model:formData="roleMenuModel.formData" v-model:dialogFormVisible="roleMenuModel.dialogFormVisible" @onSubmit="getList(query)"/>
    </div>
</template>

<script setup>
import {_api} from '@/libs/';
import {reactive} from 'vue';
import {Plus, Search} from '@element-plus/icons-vue';
import tableRepositories from '@/repositories/tableRepositories';
import EditDialog from '@/views/Manage/System/Role/EditDialog';
import RoleMenuDialog from '@/views/Manage/System/Role/RoleMenuDialog';
import toolUtils from '@/utils/toolUtils';

const api = reactive({
    list: `${_api.system.role}/list`,
    delete: `${_api.system.role}/delete`
});

const {loading, query, dialogModel, list, total, getList, handleEdit, handleDelete} = tableRepositories(api);

const roleMenuModel = reactive({
    formData: {},
    dialogFormVisible: false
});

// 授权
async function handleRoleMenu(row) {
    roleMenuModel.formData = toolUtils.deepcopy(row)
    roleMenuModel.dialogFormVisible = true;
}
</script>

<style scoped>

</style>
