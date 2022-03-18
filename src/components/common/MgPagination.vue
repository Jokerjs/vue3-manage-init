<template>
    <div class="mg-pagination">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            :total="total"
            v-model:pageSize="size"
            v-model:currentPage="current"
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
        />
    </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue';

const emit = defineEmits(['update:pageSize', 'update:currentPage', 'change']);
const props = defineProps({
    pageSize: {
        type: Number,
        default: 1
    },
    currentPage: {
        type: Number,
        default: 2
    },
    total: {
        type: Number,
        default: 0
    }
});

const size = computed({
    get: () => props.pageSize,
    set: (val) => {
        emit('update:pageSize', val);
    }
});
const current = computed({
    get: () => props.currentPage,
    set: (val) => {
        emit('update:currentPage', val);
    }
});

function sizeChange() {
    // 解决当前页数不在第一页时改变size同时触发两次change的问题
    if(props.currentPage === 1) {
        emit('change', {pageSize: props.pageSize, currentPage: props.currentPage});
    }
}

function currentChange() {
    emit('change', {pageSize: props.pageSize, currentPage: props.currentPage});
}
</script>

<style scoped lang="scss">
.mg-pagination {
    margin-top: $base-padding-default;
}
</style>
