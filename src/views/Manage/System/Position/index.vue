<template>
    <div class="mg-layout-container">
        <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="职务编码">
                <el-input v-model="query.code" placeholder="请输入职务编码" clearable @clear="getList()"/>
            </el-form-item>
            <el-form-item label="职务名称">
                <el-input v-model="query.name" placeholder="请输入职务名称" clearable @clear="getList()"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="getList()">查询</el-button>
                <el-button type="primary" :icon="Plus" @click="handleEdit()">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list" border stripe v-loading="loading">
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column prop="code" label="职务编码"></el-table-column>
            <el-table-column prop="name" label="职务名称" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{row}">
                    <el-button type="primary" @click="handleEdit(row)">修改</el-button>
                    <el-button type="primary" @click="handleDelete(row)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <mg-pagination :total="total" v-model:pageSize="query.pageSize" v-model:currentPage="query.pageNo" @change="getList(query)"/>

        <edit-dialog v-model:formData="dialogModel.formData" v-model:dialogFormVisible="dialogModel.dialogFormVisible" @onSubmit="getList(query)"/>
    </div>
</template>

<script setup>
import {_api} from '@/libs/';
import {reactive} from 'vue';
import {Plus, Search} from '@element-plus/icons-vue';
import tableRepositories from '@/repositories/tableRepositories';
import EditDialog from '@/views/Manage/System/Position/EditDialog';

const api = reactive({
    list: `${_api.system.position}/list`,
    delete: `${_api.system.position}/delete`
});

const {loading, query, dialogModel, list, total, getList, handleEdit, handleDelete} = tableRepositories(api);
</script>

<style scoped>

</style>
