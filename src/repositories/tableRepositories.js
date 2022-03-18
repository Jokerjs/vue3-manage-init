import {reactive, toRefs} from 'vue';
import {_http} from '@/libs/';
import toolUtils from '@/utils/toolUtils';
import {ElMessageBox, ElMessage} from 'element-plus';

const initPages = {pageNo: 1, pageSize: 10};
export default function tableRepositories(api) {
    const query = reactive({
        ...initPages
    });
    const state = reactive({
        loading: false,
        list: [],
        total: 0,
        dialogModel: {
            formData: {},
            dialogFormVisible: false
        }
    });

    // 获取列表
    async function getList(parameter = initPages) {
        state.loading = true
        query.pageNo = parameter.pageNo;
        query.pageSize = parameter.pageSize;
        try {
            const {total, records} = await _http.get(api.list, {params: query});
            state.total = total;
            state.list = records;
            state.loading = false
        }catch (e) {
            state.loading = false
        }
    }

    // 修改，添加
    async function handleEdit(row = {}) {
        state.dialogModel = {
            formData: toolUtils.deepcopy(row),
            dialogFormVisible: true
        };
    }

    // 删除
    async function handleDelete(row) {
        try {
            await ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            });
            await _http.delete(api.delete, {params: {id: row.id}});
            await getList();
        } catch (e) {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            });
        }
    }

    getList();

    return {
        ...toRefs(state),
        query,
        getList,
        handleEdit,
        handleDelete
    };
}
