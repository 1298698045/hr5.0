<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">搜索字段</div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <FilterQuery :entityId="entityId" :entityApiName="entityApiName" :FilterExpresssionList="filterExpresssionList" @params="getFilterQuery"></FilterQuery>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">确认</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        computed,
        toRaw
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    import FilterQuery from "@/components/FilterQuery.vue";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        filterExpresssionList: {
            type: Array,
            default: () => []
        },
        entityId: String,
        entityApiName: String
    });
    
    const emit = defineEmits(["cancel", "ok"]);

    const handleCancel = () => {
        emit("cancel", false);
    };


    const data = reactive({
        filterQuery: ""
    });
    const { filterQuery } = toRefs(data);

    onMounted(() => {

    })
    const handleSubmit = () => {
        emit("ok", data.filterQuery);
    };

    const getFilterQuery = (e) => {
        data.filterQuery = e;
    }

</script>
<style lang="less">
    @import url("@/style/modal.less");
</style>