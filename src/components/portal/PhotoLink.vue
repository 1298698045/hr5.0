<template>
    <div>
        <a-modal v-model:open="props.isShow" width="650px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">图片链接配置</div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form>
                        <a-form-item label="动作">
                            <a-select>
                                <a-select-option value="1">打开页面</a-select-option>
                                <a-select-option value="2">关闭窗口</a-select-option>
                                <a-select-option value="3">条件控制</a-select-option>
                                <a-select-option value="4">显示隐藏组件</a-select-option>
                                <a-select-option value="5">Javascript</a-select-option>
                                <a-select-option value="6">刷新组件</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="链接地址">
                            <a-input></a-input>
                        </a-form-item>
                        <a-form-item label="打开方式">
                            <a-select>
                                <a-select-option value="1">当前页面</a-select-option>
                                <a-select-option value="2">新窗口</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
    import { SearchOutlined, DeleteOutlined, UploadOutlined, CloseOutlined  } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";

    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        imgUrl: String
    });
    
    const emit = defineEmits(["cancel", "ok"]);

    const handleCancel = () => {
        emit("cancel", false);
    };


    const data = reactive({
        FilterExpresssionList: [],
        entityId: "",
    });
    const { entityId, FilterExpresssionList } = toRefs(data);

    onMounted(() => {

    })
    const handleSubmit = () => {
        
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");
</style>