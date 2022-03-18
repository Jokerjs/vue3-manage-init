<template>
    <el-dialog v-model="dialogVisible" title="授权" width="40%" @open="getMenus" destroy-on-close>
        <el-form ref="formRef" :model="form" class="mg-dialog-form">
            <el-form-item label="角色权限" prop="roleCode">
                <div>
                    <div>
                        <el-button @click="checkAll(allTreeKeys)">全部勾选</el-button>
                        <el-button @click="checkAll()">取消全选</el-button>
                        <el-button @click="changeCheckStrictly(false)" :type="checkStrictly ? '' : 'primary'">父子关联</el-button>
                        <el-button @click="changeCheckStrictly(true)">取消关联</el-button>
                    </div>
                    <el-scrollbar class="role-tree">
                        <el-tree ref="menuTree" :data="menus" node-key="key"
                                 :props="{children: 'children', label: 'slotTitle'}"
                                 show-checkbox
                                 default-expand-all
                                 :check-strictly="checkStrictly"
                                 ></el-tree>
                    </el-scrollbar>
                </div>
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
import {_http, _api} from '@/libs/';
import editRepositories from '@/repositories/editRepositories';
import {defineEmits, defineProps, reactive, ref} from 'vue';

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

const menuTree = ref(null);
const checkStrictly = ref(true);
const allTreeKeys = ref([]);
const menus = ref([]);
const defaultCheckedKeys = ref([]);

const api = reactive({
    add: `${_api.system.role}/add`,
    edit: `${_api.system.role}/edit`
});

const {formRef, loading, form, dialogVisible, handleCancel} = editRepositories(emit, props, api);

function checkAll(all = []) {
    menuTree.value.setCheckedKeys(all);
}

function changeCheckStrictly(check = true) {
    checkStrictly.value = check;
}

async function getMenus() {
    const {treeList, ids} = await _http.get(_api.system.queryTreeList);
    const queryRolePermissions = await _http.get(_api.system.queryRolePermission, {params: {roleId: form.value.id}});
    menus.value = treeList;
    allTreeKeys.value = ids;
    menuTree.value.setCheckedKeys(queryRolePermissions)
    defaultCheckedKeys.value = queryRolePermissions;
}

async function handleConfirm() {
    const data = {
        roleId: form.value.id,
        lastpermissionIds: defaultCheckedKeys.value.join(','),
        permissionIds: menuTree.value.getCheckedKeys().concat(menuTree.value.getHalfCheckedKeys()).join(',')
    };
    await _http.post(_api.system.saveRolePermission, data);
    emit('onSubmit', data);
    handleCancel();
}
</script>

<style scoped lang="scss">
.role-tree {
    margin-top: 15px;
    border: 1px solid $base-border-color;
    height: calc(70vh - 240px);
    overflow-y: auto;
}
</style>
