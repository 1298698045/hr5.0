<template>
    <div class="formConfig">
        <a-form :label-col="labelCol">
            <a-form-item label="标题" class="formItem">
                <a-input v-model:value="formState.header"></a-input>
            </a-form-item>
            <a-form-item class="right" label="启用标题">
                <a-switch></a-switch>
            </a-form-item>
            <a-form-item label="图标">
                <a-upload v-model:file-list="fileList"
                    name="avatar"
                    class="avatar-uploader"
                    :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange">
                    <div class="assets-icon-editor">
                        <div class="assets-icon-editor-picicon">
                            <span class="assets-icon">
                                <PlusOutlined />
                            </span>
                        </div>
                    </div>
                </a-upload>
            </a-form-item>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isMasterData')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isMasterData" />
                        <CaretRightOutlined v-else />
                    </span>
                    主数据项
                </div>
                <div class="collapse-panel-body" v-if="isMasterData">
                    <a-form-item label="标题">
                        <a-input v-model:value="formState.title"></a-input>
                    </a-form-item>
                    <a-form-item label="内容" class="formItem">
                        <TEditor placeholder="请输入内容" ref="editorRef" mode="simple" @input="changeTEditor" />
                    </a-form-item>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isSubData')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isSubData" />
                        <CaretRightOutlined v-else />
                    </span>
                    副数据项
                </div>
                <div class="collapse-panel-body" v-if="isSubData">
                    <a-form-item label="标题">
                        <a-input v-model:value="formState.subTitle"></a-input>
                    </a-form-item>
                    <a-form-item label="内容" class="formItem">
                        <TEditor placeholder="请输入内容" ref="editorRef" mode="simple" />
                    </a-form-item>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isChart')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isChart" />
                        <CaretRightOutlined v-else />
                    </span>
                    图表配置
                </div>
                <div class="collapse-panel-body" v-if="isChart">
                    <a-form-item label="图表类型">
                        <a-select>
                            <a-select-option key="1">环状图</a-select-option>
                            <a-select-option key="2">饼状图</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="显示单位">
                        <a-input></a-input>
                    </a-form-item>
                </div>
            </div>
        </a-form>
        <a-button block @click="handleSave">保存</a-button>
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
        h,
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
    } from "vue";
    import draggable from 'vuedraggable';
    import "@/style/icon/iconfont.css";
    import { CaretDownOutlined, CaretRightOutlined, PlusOutlined, EditOutlined, LinkOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import TEditor from "@/components/TEditor.vue";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    const store = useStore();
    const labelCol = {
        style: {
            width: '60px',
            textAlign: "left"
        },
    };
    const editorRef = ref(null);

    const formState = reactive({
        header: "",
        title: "",
        subTitle: "",
        datasource: "",
        text: ""
    })

    const data = reactive({
        isMasterData: true,
        isSubData: true,
        isChart: true,
        isEditor: false,
        height: 270,
        fileList: [],
        imageUrl: "",
        dashboardId: route.query.id
    });

    const { isMasterData, isSubData, isChart, isEditor, height, fileList, imageUrl, dashboardId } = toRefs(data);

    onMounted(()=>{
        nextTick(()=>{
            data.isEditor = true;
        })
    })

    const handleCollapse = (field) => {
        data[field] = !data[field];
    };

    const beforeUpload = (e) => {

    };

    const handleChange = (e) => {
        
    };

    const changeTEditor = (e) => {
        // console.log("e", e);
        formState.text = e;
    };

    const handleSave = () => {
        let obj = {
            componentType: "statchart",
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.header,
            title: null,
            id: "",
            lastModifiedDate: "",
            properties: {
                moreUrl: null,
                detailUrl: null,
                visualizationType: "month",
                datasource: "数据源",
                titleField: {
                    name: "Quantity",
                    label: "数量"
                },
                subTitleField: {
                    name: "Quantity",
                    label: "数量"
                },
                title: formState.title,
                subTitle: formState.subTitle,
                img: {
                    src: "",
                    width: 100,
                    height: 100,
                    position: "left"
                }
            },
            type: "statchart",
            layout: {
                x: store.currentData.x,
                y: store.currentData.y,
                w: store.currentData.w,
                h: store.currentData.h
            }
        }
        let params = {
            actions: [{
                id: "26;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: data.dashboardId,
                    dashboardMetadata: JSON.stringify(obj),
                    isStickyFilterSave: false
                }
            }]
        };
        let d = {
            message: JSON.stringify(params)
        }
        proxy.$post(Interface.portal.saveComponent, d).then(res=>{

        })
    }

</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }
    .collapse-panel{
        .collapse-panel-title{
            height: 100%;
            padding: 18px 0;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-weight: 700;
            font-size: 12px;
            .icon-wrapper{
                display: inline-block;
                padding-right: 3px;
                font-size: 12px;
            }
        }
        .collapse-panel-body{
            padding-bottom: 20px;
            .charts-wrapper{
                .charts-config-type{
                    width: 34px;
                    height: 34px;
                    margin: 2px 0px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    text-align: center;
                    display: inline-block;
                    margin-right: 5px;
                    &.selected{
                        /* border-color: #5d9cec; */
                        .boxIcon{
                            background-position: 0 67%;
                        }
                    }
                    .boxIcon{
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }
            }
        }
    }
    .assets-icon-editor{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 45px;
        height: 45px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        &::after{
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            background-color: rgba(0, 0, 0, .6);
            transition: all .3s;
            z-index: 1;
        }
        &:hover::after{
            opacity: 1;
        }
        .assets-icon-editor-picicon{
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 10;
            display: flex;
            align-items: center;
            .assets-icon{
                width: inherit;
                text-align: center;
                vertical-align: middle;
                color: #999;
                z-index: 9;
                display: inline-block;
                border: 1px solid transparent;
            }
        }
    }
</style>
<style>
    .ant-form-item.right .ant-row .ant-form-item-control{
        text-align: right !important;
    }
</style>