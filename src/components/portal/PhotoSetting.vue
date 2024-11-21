<template>
    <div>
        <a-modal v-model:open="props.isShow" width="380px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">图片设置</div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form>
                        <a-form-item label="图片来源">
                            <a-select>
                                <a-select-option value="1">素材库</a-select-option>
                                <a-select-option value="2">本地图片</a-select-option>
                                <a-select-option value="3">图片路径</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                    <div class="picture-path-img" v-if="imgUrl">
                        <img src="@/assets/img/portal_banner.png" alt="" class="assets-img">
                        <div class="picture-path-img-mask">
                            <span class="ui-icon">
                                <CloseOutlined />
                            </span>
                        </div>
                    </div>
                    <a-upload
                        v-else
                        v-model:file-list="fileList"
                        name="file"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                    >
                        <button class="uploadBtn">
                            <upload-outlined></upload-outlined>
                            点击上传图片
                        </button>
                    </a-upload>
                    
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
    .uploadBtn{
        display: inline-block;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        height: 200px;
        font-size: 14px;
        justify-content: center;
        background: rgb(241, 241, 241);
        cursor: pointer;
        border: 1px solid #e5e5e5;
        position: relative;
        &:hover{
            border-color: #5d9cec;
            color: #5d9cec;
            &::before{
                content: '';
                opacity: 0.2;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background: #5d9cec;
            }
        }
    }
    .ant-upload-select{
        width: 100%;
    }
    .picture-path-img{
        overflow: hidden;
        display: flex;
        align-items: center;
        height: 200px;
        font-size: 14px;
        justify-content: center;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        &:hover{
            .picture-path-img-mask{
                display: block;
            }
        }
        .picture-path-img-mask{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: none;
            .ui-icon{
                color: #fff;
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
            }
        }
    }
</style>