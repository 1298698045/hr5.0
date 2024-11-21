<template>
    <div class="formConfig chartConfig">
        <a-form :label-col="labelCol">
            <a-form-item label="标题" class="formItem">
                <a-input v-model:value="formState.title"></a-input>
            </a-form-item>
            <a-form-item label="选择对象">
                <a-select v-model:value="entityApiName" @change="changeEntity">
                    <a-select-option v-for="(row,idx) in objectCodeList" :key="idx"
                        :value="row.name">{{row.displayName}}</a-select-option>
                </a-select>
            </a-form-item>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isSearchFilter')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isSearchFilter" />
                        <CaretRightOutlined v-else />
                    </span>
                    查询条件
                </div>
                <div class="collapse-panel-body" v-if="isSearchFilter">
                    <a-button type="default" block @click="handleAddFilter"><PlusOutlined />
                        {{ filterExpresssionList.length ? '编辑查询条件' : '添加查询条件' }}
                    </a-button>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isChartType')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isChartType" />
                        <CaretRightOutlined v-else />
                    </span>
                    类型
                </div>
                <div class="collapse-panel-body" v-if="isChartType">
                    <div class="charts-wrapper">
                        <div class="charts-config-type" :class="{'selected':chartType=='pie-simple'}" @click="changeChartType('pie-simple')">
                            <div title="圈形图" class="boxIcon" :style="{backgroundImage:'url('+ require('@/assets/img/designer/donut1.png') +')'}"></div>
                        </div>
                        <div class="charts-config-type" :class="{'selected':chartType=='pie-half-donut'}" @click="changeChartType('pie-half-donut')">
                            <div title="半环形图" class="boxIcon" :style="{backgroundImage:'url('+ require('@/assets/img/designer/gauge1.png') +')'}"></div>
                        </div>
                        <div class="charts-config-type" :class="{'selected':chartType=='bar-y-category'}" @click="changeChartType('bar-y-category')">
                            <div title="水平条形图" class="boxIcon" :style="{backgroundImage:'url('+ require('@/assets/img/designer/hbar1.png') +')'}"></div>
                        </div>
                        <div class="charts-config-type" :class="{'selected':chartType=='line-category'}" @click="changeChartType('line-category')">
                            <div title="折线图" class="boxIcon" :style="{backgroundImage:'url('+ require('@/assets/img/designer/hbar1.png') +')'}"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <a-form-item label="分组字段">
                <a-select>
                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                        :value="row.name">{{row.label}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="汇总字段">
                <a-select>
                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                        :value="row.name">{{row.label}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="合计类型">
                <a-select placeholder="请选择合计类型">
                    <a-select-option value="count">计数</a-select-option>
                    <a-select-option value="Sum">汇总</a-select-option>
                </a-select>
            </a-form-item> -->
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isAnalysis')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isAnalysis" />
                        <CaretRightOutlined v-else />
                    </span>
                    分析
                </div>
                <div class="collapse-panel-body" v-if="isAnalysis">
                    <!-- <a-form-item label="数据源">
                        <a-select>
                            <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                :value="row.name">{{row.label}}</a-select-option>
                        </a-select>
                    </a-form-item> -->
                    <a-form-item label="维度">
                        <div class="flex" :class="{'mt10':index>0}" style="align-items: center;" v-for="(item, index) in groupings" :key="index">
                            <a-select v-model:value="item.value" @dropdownVisibleChange="(e)=>{dropdownVisibleGroupingChange(e, item, index)}">
                                <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                    :value="row.name" :disabled="row.disabled">{{row.label}}</a-select-option>
                            </a-select>
                            <a-tooltip placement="bottom">
                                <template #title>
                                  <span>删除</span>
                                </template>
                                <span class="deleteIcon"  @click="handleDeleteGrouping(item, index)" v-show="groupings.length>1">
                                    <DeleteOutlined />
                                </span>
                            </a-tooltip>
                        </div>
                        <div v-if="chartType=='bar-y-category' || chartType == 'line-category'">
                            <!-- <div class="flex" style="align-items: center;" v-if="isGrouping">
                                <a-select class="mt10" v-model:value="formState.grouping2">
                                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                        :value="row.name">{{row.label}}</a-select-option>
                                </a-select>
                                <span class="deleteIcon" v-if="isGrouping">
                                    <DeleteOutlined />
                                </span>
                            </div> -->
                            <a-button class="mt10" block @click="handleAddGrouping" v-if="groupings.length<2">添加维度</a-button>
                        </div>
                    </a-form-item>

                    <a-form-item label="指标">
                        <div class="flex" :class="{'mt10':index>0}" style="align-items: center;" v-for="(item, index) in summaries" :key="index">
                            <a-select class="mt10" v-model:value="item.value" @dropdownVisibleChange="(e)=>{dropdownVisibleSummariesChange(e, item, index)}">
                                <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                    :value="row.name" :disabled="row.disabled">{{row.label}}</a-select-option>
                            </a-select>
                            <a-tooltip placement="bottom">
                                <template #title>
                                  <span>删除</span>
                                </template>
                                <span class="deleteIcon" @click="handleDeleteSummarie" v-show="summaries.length>1">
                                    <DeleteOutlined />
                                </span>
                            </a-tooltip>
                        </div>
                        <div v-if="chartType=='bar-y-category' || chartType == 'line-category'">
                            <!-- <div class="flex mt10" style="align-items: center;" v-if="isSummarie">
                                <a-select v-model:value="formState.summarie2">
                                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                        :value="row.name">{{row.label}}</a-select-option>
                                </a-select>
                                <span class="deleteIcon">
                                    <DeleteOutlined />
                                </span>
                            </div> -->
                            <a-button class="mt10" block @click="handleAddSummarie" v-if="summaries.length<2">添加指标</a-button>
                        </div>
                    </a-form-item>

                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isChartFunction')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isChartFunction" />
                        <CaretRightOutlined v-else />
                    </span>
                    图表功能
                </div>
                <div class="collapse-panel-body" v-if="isChartFunction">
                    <a-form-item class="right" label="无数据时隐藏">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="显示工具栏">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="显示合计值">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item label="显示数值">
                        <a-select></a-select>
                    </a-form-item>
                    <a-form-item label="数值位置">
                        <a-select></a-select>
                    </a-form-item>
                    <a-form-item class="right" label="在数值前显示维度名称">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item label="图列显示">
                        <a-select v-model:value="formState.legendPosition">
                            <a-select-option value="Right">右侧</a-select-option>
                            <a-select-option value="Bottom">底部</a-select-option>
                        </a-select>
                    </a-form-item>
                </div>
            </div>
        </a-form>
        <a-button block @click="handleSave">保存</a-button>

        <FilterQueryModal v-if="isFilterModal" :isShow="isFilterModal" :entityId="entityId" :entityApiName="entityApiName" :filterExpresssionList="filterExpresssionList" @cancel="isFilterModal=false" @ok="getFilterQuery" />
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
    import { CaretDownOutlined, CaretRightOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import FilterQueryModal from "@/components/portal/FilterQueryModal.vue";
    import { getCommonNodesQuery } from "@/utils/commonApi.js";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    const store = useStore();
    const { name, properties } = store.currentData;

    const formState = reactive({
        title: name,
        grouping: "",
        summarie: "",
        legendPosition: "",
        grouping2: "",
        summarie2: ""
    });
    const labelCol = {
        style: {
            width: '60px',
            textAlign: "left"
        },
    };
    const data = reactive({
        objectCodeList: [],
        attributes: [],
        chartType: "pie-simple",
        isSearchFilter: true,
        isChartType: true,
        isAnalysis: true,
        isChartFunction: true,
        isFilterModal: false,
        filterExpresssionList: [],
        filterColumns: [],
        entityId: "",
        entityApiName: "",
        entity: {
            label: "人员档案",
            name: "HREmployee",
            objectTypeCode: 30020
        },
        isGrouping: false,
        isSummarie: false,
        groupings: [{
            value: ""
        }],
        summaries: [{
            value: ""
        }],
        dashboardId: route.query.id
    });

    const { objectCodeList, attributes, chartType, isSearchFilter, isChartType, isAnalysis, isChartFunction,
        isFilterModal, filterExpresssionList, filterColumns, entityId, entityApiName, entity, isGrouping, isSummarie, groupings,
        summaries, dashboardId
     } = toRefs(data);

    if(properties?.entity){
        data.entity = properties.entity;
        data.entityApiName = properties.entity.name;
    }

     const getEntityList = async () => {
        let params = {
            displayColumns: "id,DisplayName,Name,EntityCode,ObjectTypeCode",
        }
        let res = await getCommonNodesQuery("Entity", 100000, params);

        data.objectCodeList = res.nodes.map(item=>{
            item.displayName = item.DisplayName.textValue;
            item.name = item.Name.textValue;
            return item;
        })
    }
    getEntityList();

    // 选择对象
    const changeEntity = (e) => {
        let row = data.objectCodeList.find(item=>item.name == e);
        data.entityId = row.id;
        console.log("entityId:", data.entityId);
        data.entity = {
            label: row.displayName,
            name: e,
            objectTypeCode: row.ObjectTypeCode.textValue
        }
        getAttributes();
    }

    const getAttributes = async () => {
        proxy.$post(Interface.objFieldData, {
            entityApiName: data.entityApiName
        }).then(res=>{
            data.attributes = res.attributes;
        })
    };
    getAttributes();

    const changeChartType = (type) => {
        data.chartType = type;
        store.currentData.chartType = type;
        if(data.groupings.length > 1){
            data.groupings.pop();
        }
        if(data.summaries.length > 1){
            data.summaries.pop();
        }
    }

    const handleCollapse = (field) => {
        data[field] = !data[field];
    };

    const handleAddFilter = () => {
        data.isFilterModal = true;
    }

    const getFilterQuery = (e) => {
        data.filterExpresssionList = JSON.parse(e);
        let filterColumns = JSON.parse(e);
        let arr = [];
        filterColumns.forEach(item=>{
            arr.push({
                column: item.column,
                filterType: "fieldValue",
                isRunPageEditable: false,
                operator: item.operator,
                value: item.operands
            })
        });
        data.filterColumns = filterColumns;
        data.isFilterModal = false;
    };

    // 添加维度
    const handleAddGrouping = () => {
        // data.isGrouping = true;
        data.groupings.push({
            value: ""
        })
    };
    // 删除维度
    const handleDeleteGrouping = (item, index) => {
        data.groupings.splice(index, 1);
    };

    // 添加指标
    const handleAddSummarie = () => {
        // data.isSummarie = true;
        data.summaries.push({
            value: ""
        })
    };

    // 删除指标
    const handleDeleteSummarie = (item, index) => {
        data.summaries.splice(index, 1);
    };

    const dropdownVisibleGroupingChange = (e, item, index) => {
        if(!e){
            return;
        }
        if(data.groupings.length == 2 && index ==1){
            let startValue = data.groupings[0].value;
            data.attributes.forEach(item=>{
                if(item.name==startValue){
                    item.disabled = true;
                }else {
                    item.disabled = false;
                }
            })
        } else if(data.groupings.length == 2 && index == 0){
            let startValue = data.groupings[1].value;
            data.attributes.forEach(item=>{
                if(item.name==startValue){
                    item.disabled = true;
                }else {
                    item.disabled = false;
                }
            })
        }
    };

    const dropdownVisibleSummariesChange = (e, item, index) => {
        if(!e){
            return;
        }
        if(data.summaries.length == 2 && index ==1){
            let startValue = data.summaries[0].value;
            data.attributes.forEach(item=>{
                if(item.name==startValue){
                    item.disabled = true;
                }else {
                    item.disabled = false;
                }
            })
        } else if(data.summaries.length == 2 && index == 0){
            let startValue = data.summaries[1].value;
            data.attributes.forEach(item=>{
                if(item.name==startValue){
                    item.disabled = true;
                }else {
                    item.disabled = false;
                }
            })
        }
    }

    const handleSave = () => {
        let filterColumns = [];
        data.filterColumns.forEach(item=>{
            filterColumns.push({
                column: item.column,
                filterType: "fieldValue",
                isRunPageEditable: true,
                operator: item.operator,
                value: item.operands || item.value
            })
        })
        let obj = {
            componentType: "chart",
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.title,
            title: null,
            id: store.currentData.id,
            lastModifiedDate: "",
            properties: {
                groupings: data.groupings.map(item=>item.value),
                summaries: data.summaries.map(item=>item.value),
                legendPosition: formState.legendPosition,
                aggregates: [],
                filterColumns: filterColumns,
                autoSelectColumns: false,
                drillUrl: null,
                maxRows: null,
                reportFormat: "SUMMARY",
                sortBy: [],
                useReportChart: false,
                visualizationType: data.chartType,
                entity: data.entity,
            },
            type: "chart",
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
    .deleteIcon{
        color: #ff4d4f;
        cursor: pointer;
        padding-left: 5px;
        &:hover{
            opacity: .8;
        }
    }
</style>
<style>
    .chartConfig .collapse-panel-body .ant-form-item.right .ant-row .ant-form-item-control{
        text-align: right !important;
    }
</style>