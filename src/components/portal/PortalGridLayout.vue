<template>
    <grid-layout :layout.sync="layout" :col-num="12"  :row-width="85" :row-height="36" :is-draggable="true" :is-resizable="true"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
        <grid-item v-for="(item, index) in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i"
            :minH="2" drag-allow-from=".card-header,.item-default-header,.defaultHeading" drag-ignore-from=".no-drag" :isResizable="index == current ? true : false" :class="{'active':current == index}" @click.stop="handleSelectItem(item, index)">
            <!-- <el-card class="smartwidget is-always-shadow">
                <template #header>
                    <div class="card-header">
                        <div class="p-font-24 fontBold">{{item.i}}</div>
                    </div>
                </template>
                <div class="no-drag">
                    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
                </div>
                <template #footer>
                    <div class="no-drag">Footer content</div>
                </template>
            </el-card> -->
            <!-- <div class="cardItem">
                {{item.i}}
            </div> -->
            <div class="gridItemWrapper" v-if="item.componentType == 'list'">
                <ListCom :item="item" :themeType="themeType" :dashboardId="dashboardId" @change="loadRowData" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'applaunch'">
                <IconGrid :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'text-grid'">
                <TextGrid :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'swiperimage'">
                <Swiper :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'calendar'">
                <Calendar :item="item" :themeType="themeType" :dashboardId="dashboardId" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'chart'">
                <Chart :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'processtasklist'">
                <ProcessTasklist :item="item" :themeType="themeType" :dashboardId="dashboardId" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'tablist'">
                <TabList :item="item" :themeType="themeType" @change="loadRowData" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'statchart'">
                <StatsChart :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'statcard'">
                <StatsCard :item="item" :themeType="themeType"  @change="loadRowData" />
            </div>
            <a-card v-else :bordered="false" class="widgetItem">
                <template #title>
                    <div class="card-header">
                        <div class="p-font-24 fontBold">{{item.i}}</div>
                    </div>
                </template>
                <div class="no-drag">
                    <p>{{item.componentType}}</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </div>
            </a-card>
            <div class="weapp-ebde-toolbar" v-if="index == current">
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>另存为</span>
                    </template>
                    <span>
                        <span class="ui-icon">
                            <PlusSquareOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>复制</span>
                    </template>
                    <span @click="handleItemCopy(item, index)">
                        <span class="ui-icon">
                            <CopyOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>复制id</span>
                    </template>
                    <span>
                        <span class="ui-icon">
                            <PlusSquareOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>删除</span>
                    </template>
                    <span @click="handleItemDelete(item, index)">
                        <span class="ui-icon">
                            <DeleteOutlined />
                        </span>
                    </span>
                </a-tooltip>
            </div>
        </grid-item>
    </grid-layout>
    <Delete :isShow="isDelete" v-if="isDelete" @cancel="isDelete=false" desc="确定要删除当前模板吗？" sObjectName="PageDashboardComponent" objTypeCode="9171" :recordId="recordId" @ok="getQuery" />
    <LeaveModal v-if="isLeave" :isShow="isLeave" desc="有未保存的数据，是否要关闭？" @cancel="isLeave=false" @ok="confirmClear" />

</template>
<script setup>
    import { ref, reactive, toRefs, onMounted, getCurrentInstance, watch } from "vue";
    import { PlusSquareOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
    import ListCom from "./widget/List.vue";
    import IconGrid from "./widget/IconGrid.vue";
    import Swiper from "./widget/Swiper.vue";
    import TextGrid from "./widget/TextGrid.vue";
    import Calendar from "./widget/Calendar.vue";
    import Chart from "./widget/Chart.vue";
    import TabList from "./widget/TabList.vue";
    import StatsCard from "./widget/StatsCard.vue";
    import ProcessTasklist from "./widget/ProcessTasklist.vue";
    import Delete from "@/components/listView/Delete.vue";
    import StatsChart from "./widget/StatsChart.vue";
    import LeaveModal from "@/components/commonModal/LeaveModal.vue"
    import Toast from "@/utils/toast.js";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import bus from '@/utils/eventBus.js';
    import { useStore } from "@/store/portal";
    import { storeToRefs } from 'pinia';
    const store = useStore();
    const { dashboardId, themeType, isRefresh, isConfigChange } = storeToRefs(store);
    const data = reactive({
        layout: [
            // { "x": 0, "y": 0, "w": 3, "h": 3, "i": "10", name: "统计标题", master: { name: "订单总数", content: "" }, sub: { name: "送货中", content: "" }, componentType: "statchart" },
            // { "x": 3, "y": 0, "w": 3, "h": 3, "i": "12", name: "统计标题card2", master: { name: "订单总数", content: "" }, sub: { name: "送货中", content: "" }, componentType: "statcard" },
            // { "x": 0, "y": 1, "w": 6, "h": 6, "i": "0", name: "信息", componentType: "list" },
            // { "x": 2, "y": 1, "w": 4, "h": 6, "i": "1", name: "快捷入口", componentType: "icon-grid" },
            // { "x": 4, "y": 1, "w": 4, "h": 8, "i": "2", name: "轮播图", componentType: "swiper" },
            // { "x": 6, "y": 1, "w": 4, "h": 6, "i": "3", name: "常用链接", componentType: "text-grid" },
            // { "x": 0, "y": 5, "w": 6, "h": 8, "i": "6",  name: "待办事务", componentType: "processtasklist" },
            // { "x": 0, "y": 14, "w": 6, "h": 8, "i": "11", name: "tablist", componentType: "tablist", tabs: [
            //     {
            //         footer: null,
            //         title: "tab1",
            //         properties: {
            //             aggregates: [],
            //             autoSelectColumns: false,
            //             drillUrl: null,
            //             filterColumns: [],
            //             groupings: [],
            //             maxRows: 10,
            //             reportFormat: "TABULAR",
            //             useReportChart: false,
            //             detailUrl: "detailUrl",
            //             moreUrl: "moreUrl",
            //             showTableHeader: true,
            //             tableColumns: [
            //                 {
            //                     "label": "到期日期",
            //                     "column": "DUE_DATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label2",
            //                     "column": "USERS.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label3",
            //                     "column": "ACCOUNT.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label4",
            //                     "column": "ADDRESS1_STATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label5",
            //                     "column": "RATING",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 }
            //             ],
            //             visualizationProperties: {
            //                 breakPoints: [],
            //                 decimalPrecision: -1,
            //                 displayUnits: "auto",
            //                 flexTableType: "tabular",
            //                 showChatterPhotos: false
            //             },
            //             visualizationType: "FlexTable",
            //             entity: {
            //                 label: "人员档案",
            //                 name: "HREmployee",
            //                 objectTypeCode: 30020
            //             }
            //         },
            //         reportId: ""
            //     },
            //     {
            //         footer: null,
            //         title: "tab2",
            //         properties: {
            //             aggregates: [],
            //             autoSelectColumns: false,
            //             drillUrl: null,
            //             filterColumns: [],
            //             groupings: [],
            //             maxRows: 10,
            //             reportFormat: "TABULAR",
            //             useReportChart: false,
            //             detailUrl: "detailUrl2",
            //             moreUrl: "moreUrl2",
            //             showTableHeader: true,
            //             tableColumns: [
            //                 {
            //                     "label": "到期日期2",
            //                     "column": "DUE_DATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label2",
            //                     "column": "USERS.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label3",
            //                     "column": "ACCOUNT.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label4",
            //                     "column": "ADDRESS1_STATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label5",
            //                     "column": "RATING",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 }
            //             ],
            //             visualizationProperties: {
            //                 breakPoints: [],
            //                 decimalPrecision: -1,
            //                 displayUnits: "auto",
            //                 flexTableType: "tabular",
            //                 showChatterPhotos: false
            //             },
            //             visualizationType: "FlexTable",
            //             entity: {
            //                 label: "人员档案",
            //                 name: "HREmployee",
            //                 objectTypeCode: 30020
            //             }
            //         },
            //         reportId: ""
            //     }
            // ] },
            // { "x": 4, "y": 5, "w": 5, "h": 7, "i": "8", name: "图表", componentType: "chart", chartType: "line-category" },
            // { "x": 6, "y": 3, "w": 4, "h": 15, "i": "9", name: "日历", componentType: "calendar" },
        ],
        colNum: 12,
        current: -1,
        isMasterAttr: false,
        isDelete: false,
        recordId: "",
        recordSwitchData: {
        },
        isLeave: false
    });
    const { layout, colNum, current, isMasterAttr, isDelete, recordId, recordSwitchData, isLeave } = toRefs(data);

    watch(()=> store.isMasterAttr, (newVal, oldVal)=>{
        data.isMasterAttr = newVal;
        if(newVal){
            data.current = -1;
        }
    },{immediate: true});

    // 刷新所有
    // watch(()=> store.isRefresh, (newVal, oldVal)=>{
        // if(store.isRefresh==true){
            // data.current = -1;
            // Toast('保存成功');
            // store.isConfigChange = false;
            // getQuery();
        // }
    // })

    const loadRowData = (e) => {
        store.isRefresh = false;
        store.isConfigChange = false;
        e.componentType = e.type;
        e.name = e.header;
        let { x, y, w, h } = e.layout;
        e.x = x;
        e.y = y;
        e.w = w;
        e.h = h;
        data.layout[data.current] = e;
    }
    
    // store.currentData = data.layout[0];
    const confirmClear = () => {
        store.isMasterAttr = false;
        data.current = data.recordSwitchData.index;
        store.currentData = JSON.parse(JSON.stringify(data.recordSwitchData.item));
        data.recordSwitchData = {};
        store.isConfigChange = false;
        data.isLeave = false;
    }

    const handleSelectItem = (item, index) => {
        // console.log("item", item);
        if(store.isConfigChange){
            data.recordSwitchData = {
                item,
                index
            };
            data.isLeave = true;
            return false;
        }
        store.isMasterAttr = false;
        data.current = index;
        store.currentData = JSON.parse(JSON.stringify(item));
        data.recordSwitchData = {};
        store.isConfigChange = false;
    };

    const handleItemDelete = (item, index) => {
        if(item.id){
            data.recordId = item.id;
            data.isDelete = true;
        }else {
            data.layout.splice(index, 1);
        }
    };

    // 复制
    const handleItemCopy = (item, index) => {
        console.log("copy:", item, index);
        let copyItemData = JSON.parse(JSON.stringify(item));
        console.log("copyItemData", copyItemData);
        let obj = {
            x: copyItemData.x,
            y: copyItemData.y + copyItemData.h,
            w: copyItemData.w,
            h: copyItemData.h,
            i: new Date().getTime(),
            name: copyItemData.title,
            componentType: copyItemData.componentType
        };
        copyItemData.id = "";
        copyItemData.i = new Date().getTime();
        copyItemData.y = copyItemData.y + copyItemData.h;
        data.layout.push(copyItemData);
        store.currentData = copyItemData;
        store.isCopy = true;
    };

    watch(()=>store.currentData?.chartType, (newVal, oldVal)=>{
        // console.log("newVal", newVal, data.layout, data.current);
        if(newVal){
            data.layout[data.current].chartType = newVal;
        }
    },{deep: true})

    onMounted(() => {
        bus.on('addLayoutData', (item)=>{
            const maxY = Math.max(...data.layout.map(item => item.y + item.h));
            let obj = {
                x:  (data.layout.length * 2) % (data.colNum || 12),
                y: maxY,
                w: item.layout.w,
                h: item.layout.h,
                i: item.id + new Date().getTime(),
                name: item.label,
                componentType: item.componentType
            }
            // if(item.componentType=='tablist'){
            //     obj.tabs = [{
            //         footer: null,
            //         title: "tab1",
            //         properties: {
            //             aggregates: [],
            //             autoSelectColumns: false,
            //             drillUrl: null,
            //             filterColumns: [],
            //             groupings: [],
            //             maxRows: 10,
            //             reportFormat: "TABULAR",
            //             useReportChart: false,
            //             detailUrl: "",
            //             moreUrl: "",
            //             showTableHeader: true,
            //             tableColumns: [],
            //             visualizationProperties: {
            //                 breakPoints: [],
            //                 decimalPrecision: -1,
            //                 displayUnits: "auto",
            //                 flexTableType: "tabular",
            //                 showChatterPhotos: false
            //             },
            //             visualizationType: "FlexTable",
            //             entity: {
            //                 label: "",
            //                 name: "",
            //                 objectTypeCode: ""
            //             }
            //         },
            //         reportId: ""
            //     }]
            // }
            // if(item.componentType=='chart'){
            //     obj.chartType = "line-category";
            // }
            Object.assign(obj, item);
            data.layout.push(obj);
        });
    });

    const getQuery = () => {
        let obj = {
            actions: [
                {
                    id: "18;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        dashboardId: store.dashboardId,
                        networkId: "000000000000000",
                        runningUser: "0059000000390WhAAI",
                        requestOrigin: ""
                    }
                }
            ]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.portal.layoutList, d).then(res=>{
            store.isRefresh = false;
            let layoutList = [];
            let { attributes, dashboardMetadata, picklistColors, components } = res.actions[0].returnValue;
            console.log("components:", components);
            let list = components;
            const maxY = Math.max(...data.layout.map(item => item.y + item.h));
            list.forEach(item=>{
                if(item){
                    let obj = {
                        // x:  (data.layout.length * 2) % (data.colNum || 12),
                        // y: maxY,
                        x: item.layout.x,
                        y: item.layout.y,
                        w: item.layout.w,
                        h: item.layout.h,
                        i: item?.id,
                        name: item?.header,
                        type: item.type,
                        componentType: item?.type
                    };
                    item.x = item.layout.x;
                    item.y = item.layout.y;
                    item.w = item.layout.w;
                    item.h = item.layout.h;
                    item.i = item?.id;
                    item.name = item?.header;
                    item.type = item.type;
                    item.componentType = item?.type

                    layoutList.push(item);
                }
            });
            data.layout = layoutList;
            console.log("layout", data.layout);
            store.isMasterAttr = true;
        })
    };
    getQuery();

    

</script>
<style lang="less" scoped>
    .smartwidget {
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0 1px 2px #0000000d;
        border: 1px solid #ebeef5;
        width: 100%;
        transition: .3s;
    }

    .smartwidget.is-always-shadow,
    .smartwidget.is-hover-shadow:hover {
        box-shadow: 0 0 10px #e9e9e9;
    }
    .vue-grid-layout .smartwidget {
        height: inherit;
        width: inherit;
    }

    .vue-grid-item.vue-grid-placeholder {
        background: #7cbeff;
        opacity: .2;
        transition-duration: .1s;
        z-index: 2;
        -webkit-user-select: none;
        user-select: none;
    }
    .widgetItem{
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 12px;
        box-shadow: rgba(0,0,0,0.058823529411764705) 0px 3px 6px 2px;
        overflow: hidden;
    }
    .gridItemWrapper{
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
    }
    .vue-grid-item.active{
        .gridItemWrapper{
            border: 1px solid #5d9cec;
        }
    }
    .weapp-ebde-toolbar{
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 9999999;
        display: flex;
        cursor: pointer;
        &>span{
            width: 22px;
            height: 22px;
            background: #5d9cec;
            color: #fff;
            justify-content: center;
            align-items: center;
            display: flex;
        }
    }
</style>