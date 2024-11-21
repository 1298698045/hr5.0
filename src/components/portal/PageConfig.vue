<template>
    <div class="formConfig">
        <a-form :label-col="labelCol">
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isTheme')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isTheme" />
                        <CaretRightOutlined v-else />
                    </span>
                    主题
                </div>
                <div class="collapse-panel-body" v-if="isTheme">
                    <div class="themeWraper">
                        <div class="theme-item" :class="{'active':themeType=='default'}" @click="changeTheme('default')">
                            <span>

                            </span>
                            默认
                        </div>
                        <div class="theme-item" :class="{'active':themeType=='light'}" @click="changeTheme('light')">
                            <span>

                            </span>
                            明亮
                        </div>
                        <div class="theme-item" :class="{'active':themeType=='modern'}" @click="changeTheme('modern')">
                            <span>

                            </span>
                            科技
                        </div>
                    </div>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isOption')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isOption" />
                        <CaretRightOutlined v-else />
                    </span>
                    选项
                </div>
                <div class="collapse-panel-body" v-if="isOption">
                    <div class="options">
                        <a-form-item label="列数">
                            <a-select></a-select>
                        </a-form-item>
                        <a-form-item label="行间距">
                            <a-input></a-input>
                        </a-form-item>
                        <a-form-item label="列间距">
                            <a-input></a-input>
                        </a-form-item>
                    </div>
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
    import PhotoSetting from "@/components/portal/PhotoSetting.vue";
    import PhotoLink from "@/components/portal/PhotoLink.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    import { storeToRefs } from 'pinia';
    const store = useStore();
    const { themeType, dashboardId } = storeToRefs(store);

    const labelCol = {
        style: {
            width: '60px',
            textAlign: "left"
        },
    };
    const isFirstLoad = ref(true);
    const formState = reactive({
        column: "",
        row: "",
        themeType: ""
    });

    watch(()=>formState, (newVal, oldVal)=>{
        if(!isFirstLoad.value){
            store.isConfigChange = true;
        }
    }, {deep: true});
    
    const data = reactive({
        isTheme: true,
        isOption: true
    });

    const { isTheme, isOption } = toRefs(data);

    onMounted(()=>{
        isFirstLoad.value = false;
    })

    const handleCollapse = (field) => {
        data[field] = !data[field];
    }

    const changeTheme = (type) => {
        formState.themeType = type;
        store.themeType = type;
    }

    const handleSave = () => {
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: "PageDashboard",
                        objTypeCode: 9170,
                        fields: {
                            Theme: store.themeType
                        }
                    },
                    recordId: store.dashboardId
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.edit, d).then(res=>{
            console.log("res", res);
            isFirstLoad.value = true;
            store.isConfigChange = false;
            store.isRefresh = true;
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
    .themeWraper{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 12px;
        .theme-item{
            width: 23%;
            display: inline-block;
            text-align: center;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all .225s ease;
            margin-right: 8px;
            span{
                position: relative;
                display: block;
                width: 100%;
                max-width: 50px;
                height: 46px;
                margin: 0 auto 3px;
                border: 1px solid #ccc;
            }
            &:hover,&.active{
                color: #5d9cec;
                span{
                    border-color: #5d9cec;
                }
            }
        }
    }
</style>