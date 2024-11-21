<template>
    <div class="formConfig">
        <a-form>
            <a-form-item label="标题" class="formItem">
                <a-input v-model:value="formState.title"></a-input>
            </a-form-item>
            <div class="collapse-panel">
                <div class="collapse-panel-title" @click="handleCollapse('isTabLabel')">
                    <span class="icon-wrapper">
                        <CaretDownOutlined v-if="isTabLabel" />
                        <CaretRightOutlined v-else />
                    </span>
                    标签项
                </div>
                <div class="collapse-panel-body" v-if="isTabLabel">
                    <div class="showList">
                        <div class="dragList">
                            <draggable class="list-group" :list="tabListData" group="list" itemKey="list">
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
                                        <span class="field" v-if="element.isTitle">
                                            {{element.title}}
                                        </span>
                                        <span class="inpField" v-else>
                                            <a-input v-model:value="element.title" @pressEnter="(e)=>addTabsLabel(e, element)"></a-input>
                                        </span>
                                        <span class="delIcon" @click.stop="handleDeleteColumn(element, index)"><i class="iconfont icon-yishanchu"></i></span>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                    </div>
                    <div class="rowAddShowList">
                        <a-button type="default" block @click="handleAddLabel">添加标签</a-button>
                    </div>
                </div>
            </div>
        </a-form>
        <div class="footer-savebtn">
            <a-button block @click="handleSave">保存</a-button>
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
    const tabCurrent = store.tabListCurrent;
    // const { name, properties } = store.currentData;
    // console.log("properties", properties);
    const isFirstLoad = ref(true);

    const formState = reactive({
        title: '',
        detailUrl: '',
        moreUrl: '',
        showTableHeader: true
    });
    watch(()=>formState, (newVal, oldVal)=>{
        if(!isFirstLoad.value){
            store.isConfigChange = true;
        }
    }, {deep: true});
    

    const data = reactive({
        objectCodeList: [],
        listColumns: [
            {
                column: "1",
                label: "1"
            },
            {
                column: "2",
                label: "2"
            },
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
        entityApiName: "HREmployee",
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
            label: "人员档案",
            entityName: "HREmployee",
            objectTypeCode: 30020
        },
        isOther: true,
        dashboardId: route.query.id,
        tabListData: [],
        isTabLabel: true
    });

    const { objectCodeList, listColumns, orderExpression2, isSortField,
         isSearchFilter, isFilterModal, attributes, isShowColumn, entityApiName, selectColumn, isPopover, filterColumns, filterExpresssionList, 
         isGroupings, groupings, selectGroupColumn, isGroupPopover, entityId, entity, isOther, dashboardId, tabListData, isTabLabel } = toRefs(data);
    
    
    const initFormData = (currentData) => {
        const { name, properties } = currentData;
        formState.title = name || '';
        formState.detailUrl = properties?.detailUrl || ''
        formState.moreUrl = properties?.moreUrl || '';
        formState.showTableHeader = properties?.showTableHeader || '';

        if(store.currentData.tabs){
            let tabListData = JSON.parse(JSON.stringify(store.currentData.tabs));
            data.tabListData = tabListData.map((item,index)=>{
                item.isTitle = true;
                item.key = index;
                return item;
            })
        }
        if(properties?.tableColumns){
            data.listColumns = properties.tableColumns;
        }
    }

    watch(()=>store.currentData, (newVal,oldVal)=>{
        if(store.currentData.type == 'tablist'){
            isFirstLoad.value = true;
            initFormData(store.currentData);
            setTimeout(()=>{
                isFirstLoad.value = false;
            });
        };
    }, {deep: true, immediate: true})

    

    // watch(()=> store.tabListCurrent, (newVal, oldVal)=> {
    //     const { title, properties } = store.currentData.tabs[store.tabListCurrent];
    //     formState.title = title;
    //     formState.detailUrl = properties.detailUrl;
    //     formState.moreUrl = properties.moreUrl;
    //     formState.showTableHeader = properties.showTableHeader;
    // },{deep: true})

    const addTabsLabel = (e, item) => {
        if(item.title!=''){
            item.isTitle = true;
            store.currentData.tabs = data.tabListData;
        }
    }

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
            entityName: e,
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

    const handleAddItemSort = () => {
        data.orderExpression2.push({
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

    const handleDeleteColumn = (item, index) => {
        data.tabListData.splice(index, 1);
    };

    watch(()=> store.isCopy, (newVal, oldVal)=>{
        if(store.isCopy==true){
            handleSave('');
        }
    });
    
    const handleSave = (id) => {

        console.log("data.tabListData:", data.tabListData);

        data.tabListData.forEach(item=>{
            if(item.properties.entity.name == ''){
                Toast.error(item.title+"选项的对象不能为空！");
                throw new Error(item.title+"选项的对象不能为空！");
            }else if(item.properties.tableColumns.length == 0){
                Toast.error(item.title+"选项的显示列不能为空！");
                throw new Error(item.title+"选项的显示列不能为空！");
            }else if(item.properties.sortBy.length == 0){
                Toast.error(item.title+"选项的排序不能为空！");
                throw new Error(item.title+"选项的排序不能为空！");
            }
        })
        let filterColumns = [];
        data.filterColumns.forEach(item=>{
            filterColumns.push({
                column: item.column,
                filterType: "fieldValue",
                isRunPageEditable: true,
                operator: item.operator,
                value: item.operands || item.value
            })
        });
        let tabs = JSON.parse(JSON.stringify(data.tabListData));
        tabs.forEach(item=>{
            delete item.isTitle;
        })
        // console.log('tabs', tabs);
        let obj = {
            componentType: "tablist",
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.title,
            title: null,
            id: id == '' ? id : store.currentData.id,
            lastModifiedDate: "",
            tabs: tabs,
            reportId: "",
            type: "tablist",
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
        };
        proxy.$post(Interface.portal.saveComponent, d).then(res=>{
            store.currentData.id = res.actions[0].returnValue.id;
            isFirstLoad.value = true;
            store.isConfigChange = false;
            store.isCopy = false;
            store.isRefresh = true;
        })
    };

    const handleAddLabel = () => {
        data.tabListData.push({
            isTitle: false,
            footer: null,
            title: "",
            properties: {
                aggregates: [],
                autoSelectColumns: false,
                drillUrl: null,
                filterColumns: [],
                groupings: [],
                maxRows: 10,
                reportFormat: "TABULAR",
                useReportChart: false,
                detailUrl: "",
                moreUrl: "",
                showTableHeader: true,
                tableColumns: [],
                visualizationProperties: {
                    breakPoints: [],
                    decimalPrecision: -1,
                    displayUnits: "auto",
                    flexTableType: "tabular",
                    showChatterPhotos: false
                },
                visualizationType: "FlexTable",
                entity: {
                    label: "",
                    name: "",
                    objectTypeCode: ""
                },
                sortBy: []
            },
            reportId: ""
        })
    }


</script>
<style lang="less" scoped>
    .formConfig{
        width: 100%;
        height: 100%;
        position: relative;
    }
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
    .footer-savebtn{
        width: 220px;
        position: fixed;
        bottom: 20px;
    }
</style>