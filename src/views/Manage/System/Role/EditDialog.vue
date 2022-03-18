<template>
    <el-dialog v-model="dialogVisible" :title="form.id ? '编辑' : '新增'" width="40%">
        <el-form ref="formRef" :model="form" :rules="rules" class="mg-dialog-form">
            <el-form-item label="角色编码" prop="roleCode">
                <el-input v-model="form.roleCode" placeholder="角色编码"/>
            </el-form-item>
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="form.roleName" placeholder="角色名称"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="mg-dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm" :loading="loading">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {_api} from '@/libs/';
import editRepositories from '@/repositories/editRepositories';
import {defineEmits, defineProps, reactive} from 'vue';

const emit = defineEmits(['update:formData', 'update:dialogFormVisible', 'onSubmit']);
const props = defineProps({
    formData: {
        type: Object,
        default() {
            return {};
        }
    },
    dialogFormVisible: {
        type: Boolean,
        default: false
    }
});

const rules = reactive({
    roleCode: [{required: true, trigger: 'blur', message: '角色编码不能为空'}],
    roleName: [{required: true, trigger: 'blur', message: '角色名称不能为空'}]
});

const api = reactive({
    add: `${_api.system.role}/add`,
    edit: `${_api.system.role}/edit`
});

const {formRef, loading, form, dialogVisible, handleCancel, handleConfirm} = editRepositories(emit, props, api);

</script>

<style scoped>

</style>
