<template>
    <div class="formConfig">
        <a-form>
            <a-form-item label="标题" class="formItem">
                <a-input v-model:value="formState.title"></a-input>
            </a-form-item>
            <a-form-item label="详情链接" class="formItem">
                <a-input v-model:value="formState.detailUrl"></a-input>
            </a-form-item>
            <a-form-item label="更多链接" class="formItem">
                <a-input v-model:value="formState.moreUrl"></a-input>
            </a-form-item>
            <a-form-item label="选择对象">
                <a-select v-model:value="entityApiName" :filter-option="filterOption" showSearch @change="changeEntity">
                    <a-select-option v-for="(row,idx) in objectCodeList" :key="idx"
                        :value="row.name" :label="row.displayName">{{row.displayName}}</a-select-option>
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
            <a-form-item label="是否显示列头">
                <a-checkbox v-model:checked="formState.showTableHeader"></a-checkbox>
            </a-form-item>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isShowColumn')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isShowColumn" />
                        <CaretRightOutlined v-else />
                    </span>
                    显示列
                </div>
                <div class="collapse-panel-body" v-if="isShowColumn">
                    <div class="showList">
                        <div class="dragList">
                            <draggable class="list-group" :list="formState.listColumns" group="list" itemKey="list">
                                <template #item="{ element, index }">
                                    <div class="dragListItem">
                                        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                            <g fill="currentColor" fill-rule="evenodd">
                                                <circle cx="10" cy="8" r="1"></circle>
                                                <circle cx="14" cy="8" r="1"></circle>
                                                <circle cx="10" cy="16" r="1"></circle>
                                                <circle cx="14" cy="16" r="1"></circle>
                                                <circle cx="10" cy="12" r="1"></circle>
                                                <circle cx="14" cy="12" r="1"></circle>
                                            </g>
                                        </svg>
                                        <span class="field">
                                            {{element.label}}
                                        </span>
                                        <span class="delIcon" @click.stop="handleDeleteColumn(element, index)"><i class="iconfont icon-yishanchu"></i></span>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                    <div class="rowAddShowList">
                        <a-popover v-model:open="isPopover" trigger="click" placement="right">
                            <template #content>
                                <a-select v-model:value="selectColumn" :filter-option="filterOption" showSearch style="width: 200px;margin-right: 10px;">
                                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                        :value="row.id" :label="row.label">{{row.label}}</a-select-option>
                                </a-select>
                                <a-button type="primary" @click="handleAddShowColumn">确认添加</a-button>
                            </template>
                            <a-button type="default" block @click="isPopover=true">添加显示列</a-button>
                        </a-popover>
                    </div>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isGroupings')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isGroupings" />
                        <CaretRightOutlined v-else />
                    </span>
                    组行
                </div>
                <div class="collapse-panel-body" v-if="isGroupings">
                    <div class="showList">
                        <div class="dragList">
                            <draggable class="list-group" :list="formState.groupings" group="list" itemKey="list">
                                <template #item="{ element, index }">
                                    <div class="dragListItem">
                                        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                            <g fill="currentColor" fill-rule="evenodd">
                                                <circle cx="10" cy="8" r="1"></circle>
                                                <circle cx="14" cy="8" r="1"></circle>
                                                <circle cx="10" cy="16" r="1"></circle>
                                                <circle cx="14" cy="16" r="1"></circle>
                                                <circle cx="10" cy="12" r="1"></circle>
                                                <circle cx="14" cy="12" r="1"></circle>
                                            </g>
                                        </svg>
                                        <span class="field">
                                            {{element.label}}
                                        </span>
                                        <span class="delIcon" @click.stop="handleDeleteColumn(element, index)"><i class="iconfont icon-yishanchu"></i></span>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                    <div class="rowAddShowList">
                        <a-popover v-model:open="isGroupPopover" trigger="click" placement="right">
                            <template #content>
                                <a-select v-model:value="selectGroupColumn" :filter-option="filterOption" showSearch style="width: 200px;margin-right: 10px;">
                                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                        :value="row.id" :label="row.label">{{row.label}}</a-select-option>
                                </a-select>
                                <a-button type="primary" @click="handleAddGroupColumn">确认添加</a-button>
                            </template>
                            <a-button type="default" block @click="isGroupPopover=true">添加显示列</a-button>
                        </a-popover>
                    </div>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isSortField')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isSortField" />
                        <CaretRightOutlined v-else />
                    </span>
                    排序字段
                </div>
                <div class="collapse-panel-body" v-if="isSortField">
                    <div class="sortBox">
                        <div class="formRow" v-for="(sortItem,sortIdx) in formState.orderExpression2" :key="sortIdx">
                            <a-form-item label="排序字段" class="formItem">
                                <a-select v-model:value="sortItem.sortColumn" :filter-option="filterOption" showSearch>
                                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                        :value="row.name" :label="row.label">{{row.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="排序方式" class="formItem">
                                <a-select v-model:value="sortItem.sortOrder">
                                    <a-select-option value="ASC">升序</a-select-option>
                                    <a-select-option value="DESC">降序</a-select-option>
                                </a-select>
                            </a-form-item>
                            <span class="delIcon" @click="handleDeleteSortField(sortItem, sortIdx)"><i class="iconfont icon-yishanchu"></i></span>
                        </div>
                        <div>
                            <a-button type="default" block @click="handleAddItemSort">添加排序</a-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isOther')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isOther" />
                        <CaretRightOutlined v-else />
                    </span>
                    其他
                </div>
                <div class="collapse-panel-body" v-if="isOther">
                    <a-form-item label="每行页数">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item class="right" label="显示总数">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="无数据时隐藏">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="数据预加载">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="自动滚动">
                        <a-switch size="small"></a-switch>
                    </a-form-item>
                    <a-form-item class="right" label="分页模式">
                        <a-select></a-select>
                    </a-form-item>
                    <a-form-item class="right" label="定时刷新">
                        <a-select></a-select>
                    </a-form-item>
                </div>
            </div>
            <a-button block @click="handleSave">保存</a-button>
        </a-form>
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
    import { CaretDownOutlined, CaretRightOutlined, PlusOutlined } from "@ant-design/icons-vue";
    import FilterQueryModal from "@/components/portal/FilterQueryModal.vue";
    import Interface from "@/utils/Interface.js";
    import { getCommonNodesQuery } from "@/utils/commonApi.js";
    import Toast from "@/utils/toast.js";
    const { proxy } = getCurrentInstance();
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    const store = useStore();
    // const { name, properties } = store.currentData;
    // console.log("properties", properties);

    const formState = reactive({
        title: "",
        detailUrl: '',
        moreUrl: '',
        showTableHeader: true,
        listColumns: [],
        groupings: []
    });
    const isFirstLoad = ref(true);

    watch(()=>formState, (newVal, oldVal)=>{
        if(!isFirstLoad.value){
            store.isConfigChange = true;
        }
    }, {deep: true});

    const data = reactive({
        objectCodeList: [],
        listColumns: [
            // {
            //     column: "1",
            //     label: "1"
            // },
            // {
            //     column: "2",
            //     label: "2"
            // },
        ],
        orderExpression2: [
            {
                sortColumn: "",
                sortOrder: ""
            }
        ],
        isSearchFilter: true,
        isSortField: true,
        isFilterModal: false,
        attributes: [],
        isShowColumn: true,
        entityApiName: "",
        selectColumn: "",
        isPopover: false,
        filterColumns: [],
        filterExpresssionList: [],
        isGroupings: true,
        groupings: [],
        selectGroupColumn: "",
        isGroupPopover: false,
        entityId: "",
        entity: {
            label: "",
            name: "",
            objectTypeCode: ""
        },
        isOther: true,
        dashboardId: route.query.id
    });

    const { objectCodeList, listColumns, orderExpression2, isSortField,
         isSearchFilter, isFilterModal, attributes, isShowColumn, entityApiName, selectColumn, isPopover, filterColumns, filterExpresssionList, 
         isGroupings, groupings, selectGroupColumn, isGroupPopover, entityId, entity, isOther, dashboardId } = toRefs(data);
    
    

    const initFormData = (currentData) => {
        const { name, properties } = currentData;
        formState.title = name || '';
        formState.detailUrl = properties?.detailUrl || ''
        formState.moreUrl = properties?.moreUrl || '';
        formState.showTableHeader = properties?.showTableHeader || '';

        if(properties?.tableColumns){
            formState.listColumns = JSON.parse(JSON.stringify(properties.tableColumns));
        }

        if(properties?.entity){
            data.entity = properties.entity;
            data.entityApiName = properties.entity.name;
        }

        if(properties?.sortBy){
            formState.orderExpression2 = properties.sortBy;
        }

        if(properties?.filterColumns){
            data.filterExpresssionList = properties.filterColumns.map(item=>{
                item.attribute = item.column;
                return item;
            });
        }
    }

    watch(()=>store.currentData, (newVal,oldVal)=>{
        if(store.currentData.type == 'list'){
            isFirstLoad.value = true;
            initFormData(store.currentData);
            setTimeout(()=>{
                isFirstLoad.value = false;
            });
        };
    }, {deep: true, immediate: true})

    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };

    onMounted(()=>{
        isFirstLoad.value = false;
    });

    const getEntityList = async () => {
        let params = {
            displayColumns: "id,DisplayName,Name,EntityCode,ObjectTypeCode",
        }
        let res = await getCommonNodesQuery("Entity", 100000, params);
        console.log("Entity-res", res);

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
        data.entity = {
            label: row.displayName,
            name: e,
            objectTypeCode: row.ObjectTypeCode.textValue
        }
        if(!isFirstLoad.value){
            store.isConfigChange = true;
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

    const handleAddItemSort = () => {
        formState.orderExpression2.push({
            sortColumn: "",
            sortOrder: ""
        })
    };

    const handleCollapse = (field) => {
        data[field] = !data[field];
    }
    const handleAddFilter = () => {
        data.isFilterModal = true;
    };

    // 删除显示列
    const handleDeleteColumn = (item, index) => {
        formState.listColumns.splice(index, 1);
    };

    // 删除排序字段
    const handleDeleteSortField = (item, index) => {
        formState.orderExpression2.splice(index, 1);
    };

    // 添加显示列
    const handleAddShowColumn = () => {
        console.log(data.selectColumn, '123');
        if(data.selectColumn == ''){
            Toast.error("请选择一个字段!");
            return;
        };
        let row = data.attributes.find(item=>item.id==data.selectColumn);
        // console.log("row:", row);
        formState.listColumns.push({
            label: row.label,
            column: row.name
        });
        data.isPopover = false;
        data.selectColumn = "";
    };

    // 添加分组行
    const handleAddGroupColumn = () => {
        if(data.selectGroupColumn == ''){
            Toast.error("请选择一个字段!");
            return;
        };
        let row = data.attributes.find(item=>item.id==data.selectGroupColumn);
        // console.log("row:", row);
        formState.groupings.push({
            label: row.label,
            column: row.name
        });
        data.isGroupPopover = false;
        data.selectGroupColumn = "";
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

    watch(()=> store.isCopy, (newVal, oldVal)=>{
        if(store.isCopy==true){
            handleSave('');
        }
    });

    const handleSave = (id) => {
        // console.log("store.currentData", store.currentData);
        console.log("handleSave", formState.orderExpression2);
        if(formState.orderExpression2.length==0){
            Toast.error("排序字段不能为空!");
            return false;
        };
        // if(formState.orderExpression2.length == 1 && (formState.orderExpression2[0].sortColumn == '' || formState.orderExpression2[0].sortOrder=='')){
        //     Toast.error("排序字段不能为空!");
        //     return false;
        // };

        if(formState.orderExpression2.length){
           let isBook = formState.orderExpression2.every(item=>item.sortColumn == '' || item.sortOrder == '');
           if(isBook){
                Toast.error("排序字段不能为空!");
                return false;
           }
        }

        if(formState.listColumns.length==0){
            Toast.error("显示列不能为空!");
            return false;
        }

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
        // let obj = JSON.parse(JSON.stringify(store.currentData));
        // obj.header = formState.title;
        // obj.name = formState.name;
        // obj.properties.detailUrl = formState.detailUrl;
        // obj.properties.moreUrl = formState.moreUrl;
        // obj.properties.tableColumns = formState.listColumns;
        // obj.properties.filterColumns = filterColumns;
        // obj.properties.showTableHeader = formState.showTableHeader;
        // obj.properties.groupings = formState.groupings;
        // obj.properties.orderExpression = formState.orderExpression2;
        // obj.properties.entity = data.entity;
        // obj.layout = {
        //     x: store.currentData.x,
        //     y: store.currentData.y,
        //     w: store.currentData.w,
        //     h: store.currentData.h
        // }
        // delete obj.x;
        // delete obj.y;
        // delete obj.w;
        // delete obj.h;
        // delete obj.i;
        let obj = {
            componentType: "list",
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.title,
            title: null,
            id: id == '' ? id : store.currentData.id,
            lastModifiedDate: "",
            properties: {
                aggregates: ['!RowCount'],
                autoSelectColumns: false,
                drillUrl: null,
                filterColumns: filterColumns,
                groupings: formState.groupings.map(item=>item.value),
                maxRows: 10,
                reportFormat: "TABULAR",
                useReportChart: false,
                detailUrl: formState.detailUrl,
                moreUrl: formState.moreUrl,
                showTableHeader: formState.showTableHeader,
                tableColumns: formState.listColumns,
                visualizationProperties: store.currentData.visualizationProperties,
                visualizationType: "FlexTable",
                entity: data.entity,
                sortBy: formState.orderExpression2
            },
            reportId: "",
            type: "list",
            layout: {
                x: store.currentData.x,
                y: store.currentData.y,
                w: store.currentData.w,
                h: store.currentData.h
            }
        }
        // console.log("obj:", JSON.stringify(obj));
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
            isFirstLoad.value = true;
            store.isConfigChange = false;
            store.isCopy = false;
            store.isRefresh = true;
        })
    };



</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }
    .showList {
        width: 100%;
        border-bottom: 1px solid #dfe1e6;
        padding-bottom: 10px;
        .dragListItem {
            line-height: 48px;
            height: 48px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: move;
            &:hover {
                background: #f2f3f5;
            }

            svg {
                color: #97A0AF;
                padding-right: 5px;
            }

            .field {
                flex: 1;
            }

            .delIcon {
                cursor: pointer;
                &:hover{
                    color: #0176d3;
                }
            }
        }
    }
    .sortBox{
        .formRow{
            background: #f2f3f5;
            padding: 5px 10px;
            margin-bottom: 10px;
            position: relative;
            .delIcon{
                position: absolute;
                right: 10px;
                top: 5px;
                cursor: pointer;
                &:hover{
                    color: #0176d3;
                }
            }
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
</style>