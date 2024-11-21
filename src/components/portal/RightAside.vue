<template>
    <div class="de-rs" :class="{'rshidden':!isRightAside}">
        <div class="weapp-de-rs-top" v-if="!isMasterAttr">
            <div class="ui-bread-crumb weapp-de-rs-top-breadcrumb">
                <span class="ui-bread-crumb-item" @click="handleMaster"><span>页面</span></span>
                <span class="ui-bread-crumb-separator">/</span>
                <span class="ui-bread-crumb-item"><span>统计面板</span></span>
            </div>
        </div>
        <template v-if="!isMasterAttr">
            <div class="menu-tab">
                <div class="menu-list">
                    <div class="menu-list-item" :class="{'acitve':current==0}" @click="handleTab(0)">
                        <span class="menu-list-item-content ">属性</span>
                    </div>
                    <div class="menu-list-item" :class="{'acitve':current==1}" @click="handleTab(1)">
                        <span class="menu-list-item-content">样式</span>
                    </div>
                    <div class="menu-list-item" :class="{'acitve':current==2}" @click="handleTab(2)">
                        <span class="menu-list-item-content">事件</span>
                    </div>
                    <div class="menu-list-item" :class="{'acitve':current==3}" @click="handleTab(3)">
                        <span class="menu-list-item-content">权限</span>
                    </div>
                </div>
            </div>
            <div class="de-rs-content" :class="{'noPadding':current==1}">
                <div class="de-attr-panel-container" v-if="current==0">
                    <div class="spin-container">
                        <ListConfig v-if="componentType=='list'" />
                        <ChartConfig v-else-if="componentType=='chart'" />
                        <SwiperConfig v-else-if="componentType=='swiperimage'" />
                        <StatsChartConfig v-else-if="componentType == 'statchart'" />
                        <StatsCardConfig v-else-if="componentType == 'statcard'" :id="id" />
                        <TabListConfig v-else-if="componentType == 'tablist' && tabListClickType==1" :key="tabListCurrent" />
                        <TabListConfigMaster v-else-if="componentType == 'tablist' && tabListClickType==0" :key="tabListClickType" />
                        <div v-else>
                            <a-button block @click="handleSave">保存</a-button>
                        </div>
                    </div>
                </div>
                <div class="de-attr-panel-container" v-if="current==1">
                    
                </div>
            </div>
        </template>

        <template v-if="isMasterAttr">
            <div class="menu-tab">
                <div class="menu-list">
                    <div class="menu-list-item" :class="{'acitve':current==0}" @click="handleTab(0)">
                        <span class="menu-list-item-content ">属性</span>
                    </div>
                    <div class="menu-list-item" :class="{'acitve':current==1}" @click="handleTab(1)">
                        <span class="menu-list-item-content">样式</span>
                    </div>
                    <div class="menu-list-item" :class="{'acitve':current==2}" @click="handleTab(2)">
                        <span class="menu-list-item-content">事件</span>
                    </div>
                </div>
            </div>
            <div class="de-rs-content" :class="{'noPadding':current==1}">
                <div class="de-attr-panel-container" v-if="current==0">
                    <div class="spin-container">
                        <PageConfig />
                    </div>
                </div>
            </div>
        </template>
        <div class="layout-box-show-btn show-btn-right" @click="handleShowAside">
            <RightOutlined style="font-size: 10px;" v-if="isRightAside" />
            <LeftOutlined style="font-size: 10px;" v-else />
        </div>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import draggable from "vuedraggable";
    import { SettingOutlined, PushpinOutlined, CaretDownOutlined, CaretRightOutlined,
         GlobalOutlined, RightOutlined, LeftOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue';
    import ListConfig from "@/components/portal/widgetConfig/ListConfig.vue";
    import ChartConfig from "@/components/portal/widgetConfig/ChartConfig.vue";
    import SwiperConfig from "@/components/portal/widgetConfig/SwiperConfig.vue";
    import StatsCardConfig from "@/components/portal/widgetConfig/StatsCardConfig.vue";
    import TabListConfig from "@/components/portal/widgetConfig/TabListConfig.vue";
    import TabListConfigMaster from "@/components/portal/widgetConfig/TabListConfigMaster.vue";

    import PageConfig from "@/components/portal/PageConfig.vue";
    import StatsChartConfig from "@/components/portal/widgetConfig/StatsChartConfig.vue";


    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { getCommonNodesQuery } from "@/utils/commonApi.js";
    import Toast from "@/utils/toast.js";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import bus from '@/utils/eventBus.js';
    const emit = defineEmits(['change']);
    import { useStore } from "@/store/portal.js";
    import { storeToRefs } from 'pinia';
    const store = useStore();
    const { currentData, tabListCurrent, tabListClickType, isMasterAttr, isCopy, isRefresh } = storeToRefs(store);

    const formState = reactive({
        
    });

    const data = reactive({
        current: 0,
        isFieldAttr: true,
        isLayoutAttr: true,
        isDescStyle: true,
        isBackStyle: true,
        isContentStyle: true,
        isSpacStyle: true,
        isDefaultStyle: true,
        isRightAside: true,
        color: "#3399ff",
        isPrev: false,
        isAfter: false,
        componentType: store.currentData?.componentType,
        dashboardId: route.query.id,
        id: store.currentData?.id
    });

    watch(()=> store?.currentData, (newVal, oldVal)=>{
        if(newVal){
            data.componentType = newVal.componentType;
        }
    })
    // 监听tablist操作

    watch(()=>store.tabListCurrent, (newVal, oldVal) => {
        data.tabListCurrent = newVal;
    }, {immediate: true});

    watch(()=> store.tabListClickType, (newVal, oldVal)=>{
        // console.log("12312312", newVal)
        data.tabListClickType = newVal;
    },{immediate: true});


    const { current, isFieldAttr, isLayoutAttr, isDescStyle, isBackStyle,
         isContentStyle, isSpacStyle, isDefaultStyle, isRightAside, color, isPrev, isAfter, componentType, id
          } = toRefs(data);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });
    const labelCol = {
        style: {
            width: '60px',
            textAlign: 'left'
        },
    };
    const handleTab = (index) => {
        data.current = index;
    }
    const handleShowAside = () => {
        data.isRightAside = !data.isRightAside;
    }

    onMounted(()=>{
    });

    watch(()=> store.isCopy, (newVal, oldVal)=>{
        let componentType = store.currentData.componentType;
        if(store.isCopy==true && (componentType=='calendar' || componentType=='processtasklist' || componentType=='applaunch')){
            handleSave('');
        }
    });


    const handleSave = (id) => {
        let properties;
        let componentType = store.currentData.componentType;
        if(componentType=='calendar'){
            properties = {
                moreUrl: null,
                detailUrl: null,
                maxRows: 10,
                visualizationType: "month"
            }
        }else if(componentType=='processtasklist'){
            properties = {
                moreUrl: null,
                detailUrl: null,
                maxRows: 10,
                visualizationType: "tab-list"
            }
        }else if(componentType=='applaunch'){
            properties = {
                moreUrl: null,
                detailUrl: null,
                maxRows: 10,
                visualizationType: "nine-square-grid"
            }
        }
        let obj = {
            componentType: store.currentData.componentType,
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: store.currentData.name,
            id: id == '' ? id : store.currentData.id,
            lastModifiedDate: "",
            properties: properties,
            type: componentType,
            layout: {
                x: store.currentData.x,
                y: store.currentData.y,
                w: store.currentData.w,
                h: store.currentData.h
            }
        }

        console.log("obj:", JSON.stringify(obj));

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
            store.currentData.id = res.actions[0].returnValue.id;
            store.isConfigChange = false;
            store.isCopy = false;
            store.isRefresh = true;
        })
    }

    // 设置主布局属性
    const handleMaster = () => {
        store.isMasterAttr = true;
    }

</script>
<style lang="less" scoped>
    .weapp-de-rs-top{
        display: flex;
        border-bottom: 1px solid #e5e5e5;
    }
    .weapp-de-rs-top-breadcrumb {
        flex: 1 1;
        padding: 10px;
        min-height: 36px;
        .ui-bread-crumb-item:last-child{
            font-weight: 700;
            cursor: default !important;
        }
    }
    .ui-bread-crumb-item, .ui-bread-crumb-separator{
        padding: 0 2px;
    }
    .ui-bread-crumb-item{
        cursor: pointer;
        color: #666;
        font-size: 12px;
        &:hover{
            font-weight: 700;
            cursor: pointer;
        }
    }
    .ui-bread-crumb-separator{
        color: #999;
    }
    .menu-tab {
        position: relative;
        display: flex;
        align-items: flex-end;
        width: 100%;
        padding: 0 10px;
        min-height: 32px;
        height: 32px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
        color: #666;
        .menu-list {
            height: 100%;
            display: flex;
            flex: 1;
            .menu-list-item {
                display: flex;
                align-items: center;
                text-align: center;
                margin-right: 24px;
                height: 100%;
                cursor: pointer;

                &:hover {
                    color: #5d9cec;
                }
                &.acitve {
                    color: #5d9cec;
                    border-bottom: 2px solid #5d9cec;
                }
            }
        }
    }
    .ebcoms-spacing-top{
        position: absolute;
        display: block;
        height: 0;
        left: 1px;
        right: 1px;
        cursor: n-resize;
        top: 0;
        border-color: #ececec transparent transparent;
        border-style: solid;
        border-width: 20px 37px 0;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-top-text{
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text{
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &>div{
            span{
                padding: 0 4px;
                border-radius: 2px;
                height: 16px;
                line-height: 17px;
            }
        }
    }
    .ebcoms-spacing-right{
        position: absolute;
        display: block;
        width: 0;
        bottom: 1px;
        top: 1px;
        cursor: e-resize;
        right: 0;
        border-color: transparent #ececec transparent transparent;
        border-style: solid;
        border-width: 20px 37px 20px 0;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-right-text {
        position: absolute;
        top: 50%;
        right: 0;
        width: 37px;
        text-align: center;
        transform: translateY(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-bottom {
        position: absolute;
        display: block;
        height: 0;
        left: 1px;
        right: 1px;
        cursor: s-resize;
        bottom: 0;
        border-color: transparent transparent #ececec;
        border-style: solid;
        border-width: 0 37px 20px;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-bottom-text {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-left {
        position: absolute;
        display: block;
        width: 0;
        bottom: 1px;
        top: 1px;
        cursor: w-resize;
        left: 0;
        border-color: transparent transparent transparent #ececec;
        border-style: solid;
        border-width: 20px 0 20px 37px;
        &:hover{
            border-color: #dfdfdf transparent transparent;
        }
    }
    .ebcoms-spacing-left-text {
        position: absolute;
        top: 50%;
        width: 37px;
        text-align: center;
        transform: translateY(-50%);
        font-size: 10px;
        cursor: pointer;
    }
    .ebcoms-spacing-text {
        background-color: transparent;
        line-height: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ebcoms-spacing-tip {
        position: absolute;
        top: -2px;
        left: 3px;
        font-size: 10px;
        color: #999;
    }
    .de-rs{
        width: 250px;
        min-width: 250px;
        height: 100%;
        border-left: 1px solid #e5e5e5;
        background: #fff;
        display: flex;
        flex-direction: column;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        position: relative;
        &.rshidden{
            width: 0 !important;
            min-width: 0 !important;
        }
        .de-rs-content{
            flex: 1 1 auto;
            padding: 5px 15px 0;
            overflow-y: auto;
            &.noPadding{
                padding: 0;
            }
            .de-attr-panel-container{
                height: 100%;
                .collapse{
                    .collapse_title{
                        font-weight: 700;
                        font-size: 12px;
                        height: 36px;
                        padding: 18px 0;
                        border: none;
                        display: flex;
                        align-items: center;
                        transition: opacity .225s ease-in-out;
                        cursor: pointer;
                        line-height: 20px;
                        cursor: pointer;
                    }
                    .collapse_content{
                        .formItem{
                            :deep .ant-row.ant-form-row{
                                color: red;
                                :deep .ant-form-item-label{
                                    padding-bottom: 0 !important;
                                }
                            }
                        }
                        .icon{
                            display: inline-block;
                            padding-left: 10px;
                            cursor: pointer;
                            font-size: 18px;
                            color: #e5e5e5;
                        }
                    }
                }
            }
            .ebde-config-panel-style{
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow-y: hidden;
                position: relative;
                .ebde-config-panel-style-group{
                    width: 100%;
                    height: auto;
                    background-color: #f2f2f2;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 19px;
                    &>div:first-child{
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        padding-top: 7px;
                        span{
                            font-size: 12px;
                            color: #666;
                            line-height: 12px;
                            display: inline-block;
                            padding: 8px 20px;
                            cursor: pointer;
                            &.active{
                                background-color: rgb(255, 255, 255);
                                color: #5d9cec;
                                font-weight: 700;
                            }
                        }
                    }
                }
                .ebde-config-panel-style-content{
                    width: 100%;
                    overflow-y: overlay;
                    .ebde-style-custom{
                        margin-top: 15px;
                        .ebde-style-custom-title{
                            width: 100%;
                            height: 35px;
                            background-color: rgb(242, 242, 242);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 6px 8px;
                            &>div:first-child{
                                span{
                                    font-size: 12px;
                                    color: #666;
                                    line-height: 12px;
                                    padding-top: 1px;
                                    margin-right: 5px;
                                }
                            }
                        }
                        &>div:nth-child(2){
                            padding: 3px 8px;
                        }
                        .ebde-style-config-custom{
                            position: relative;
                            padding-bottom: 8px;
                        }
                        .ebde-stylib-config-custom{
                            height: calc(100% - 32px);
                        }
                    }
                }
                .ebcoms-borders{
                    align-items: center;
                    display: grid;
                    gap: 8px 14px;
                    grid-template-columns: auto auto;
                    .ebcoms-borders-position{
                        grid-column: 1 / 2;
                        .ebcoms-position-wrap {
                            width: 80px;
                            height: 92px;
                            display: grid;
                            align-items: center;
                            gap: 2px;
                            .ebcoms-border-icon{
                                width: 24px;
                                height: 24px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-sizing: content-box;
                                cursor: pointer;
                                background: #3399ff;
                                
                                &.ebcoms-border-top{
                                    grid-column-start: 2;
                                    grid-row-start: 1;
                                }
                                &.ebcoms-border-left{
                                    grid-column-start: 1;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-all{
                                    grid-column-start: 2;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-right{
                                    grid-column-start: 3;
                                    grid-row-start: 2;
                                }
                                &.ebcoms-border-bottom{
                                    grid-column-start: 2;
                                    grid-row-start: 3;
                                }
                                &.active{
                                    background: #e5e5e5;
                                    box-shadow: #e5e5e5 0 0 0 2px;
                                    border-radius: 2px;
                                }
                            }
                        }
                    }
                    .ebcoms-borders-config{
                        align-items: center;
                        display: grid;
                        grid-template-columns: auto 1fr;
                    }
                }

                /* 间距 */
                .ebcoms-spacing{
                    .ebcoms-spacing-margin{
                        height: 120px;
                        position: relative;
                        background-color: #ddd;
                        border: 1px solid #ddd;
                        .ebcoms-spacing-margin{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            .ebcoms-spacing-item{
                                &>div>span{
                                    position: absolute;
                                    font-size: 10px;
                                    font-family: "Arial Normal", "Arial", sans-serif;
                                    font-weight: 400;
                                    font-style: normal;
                                    color: #999;
                                }
                                
                            }
                            
                        }
                    }
                    .ebcoms-spacing-padding{
                        position: absolute;
                        top: 22px;
                        bottom: 22px;
                        left: 39px;
                        right: 39px;
                    }
                }
            }
        }
        .layout-box-show-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            color: #999;
            cursor: pointer;
            background: #fff;
            z-index: 100;
            border: 1px solid #e5e5e5;
            &:hover{
                background: #f0f1f4;
            }
            &.show-btn-right{
                top: 50%;
                transform: translateY(-50%);
                width: 14px;
                height: 36px;
                border-radius: 6px;
                left: -14px;
                border-right: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
    .formContent{
        text-align: right;
        .ant-input{
            border: 1px solid #e5e5e5;
        }
    }
    .formSwitch{
        width: 100%;
        display: inline-block;
        max-width: 100%;
        .ebcoms-font-style{
            width: 100%;
            text-align: center;
            .ebcoms-style-button-group{
                width: 100%;
                height: 24px;
                display: flex;
                align-items: center;
                &>span{
                    display: flex;
                    flex: 1 1;
                    height: 100%;
                    border: 1px solid #e5e5e5;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border-right: 0;
                    background-color: #fff;
                    &:hover{
                        background: #ececec;
                    }
                }
                &>span:last-of-type{
                    border-right: 1px solid #e5e5e5;
                }
            }
            
        }
    }
</style>
<style lang="less">
    .ant-form-item{
        margin-bottom: 8px;
        font-size: 12px;
        .ant-row{
            .ant-form-item-label{
                padding-bottom: 0 !important;
                label{
                    color: #666;
                    font-size: 12px;
                }
            }
            .ant-radio-wrapper{
                font-size: 12px;
            }
            .ant-form-item-control{
                font-size: 12px;
            }
            label{
                font-size: 12px;
            }
        }
    }
    .spin-container{
        height: 100%;
        .ant-input-affix-wrapper{
            border-radius: 3px !important;
            border: 1px solid #e5e5e5;
        }
        .ant-select-selector{
            border: 1px solid #e5e5e5 !important;
            border-radius: 3px !important;
        }
        .ant-input{
            border-radius: 3px !important;
        }
    }
    .ebde-style-config-custom{
        .ant-input-affix-wrapper{
            height: 26px;
            padding-right: 1px;
            border-radius: 2px;
            border: 1px solid #e5e5e5;
        }
        .ant-select-selector{
            border: 1px solid #e5e5e5 !important;
        }
        .ant-select,.ant-select-selector{
            height: 26px !important;
            line-height: 26px;
            border-radius: 2px !important;
        }
        .ant-select-selection-search-input,.ant-select-selection-item{
            height: 26px !important;
            line-height: 26px !important;
        }
    }
</style>