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
                <!-- <a-upload v-model:file-list="fileList"
                    name="avatar"
                    class="avatar-uploader"
                    :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"> -->
                    <div class="assets-icon-editor" @click="handleOpenImg">
                        <div class="assets-icon-editor-picicon">
                            <span class="assets-icon">
                                <PlusOutlined />
                            </span>
                        </div>
                    </div>
                <!-- </a-upload> -->
            </a-form-item>
            <a-form-item label="图表显示位置" class="formItem">
                <a-select v-model:value="formState.imgPosition">
                    <a-select-option key="left">左侧</a-select-option>
                    <a-select-option key="right">右侧</a-select-option>
                </a-select>
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
                    <a-form-item label="合计类型" class="formItem">
                        <a-select v-model:value="formState.aggregate">
                            <a-select-option key="sum">汇总</a-select-option>
                            <a-select-option key="count">计数</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="合计字段" class="formItem">
                        <a-select v-model:value="formState.aggregateField" :filter-option="filterOption" showSearch>
                            <a-select-option v-for="(row,idx) in attributes" :key="idx"
                                :value="row.name" :label="row.label">{{row.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="内容" class="formItem">
                        <TEditor placeholder="请输入内容" ref="editorRef" mode="simple" @input="changeTEditor" />
                    </a-form-item>
                </div>
            </div>
        </a-form>
        <a-button block @click="handleSave">保存</a-button>
        <SelectImages v-if="isImageModal" :isShow="isImageModal" @cancel="isImageModal=false" @selectImg="handleSetImg" />
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
        onUnmounted
    } from "vue";
    import draggable from 'vuedraggable';
    import "@/style/icon/iconfont.css";
    import { CaretDownOutlined, CaretRightOutlined, PlusOutlined, EditOutlined, LinkOutlined, MessageOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { getCommonNodesQuery } from "@/utils/commonApi.js";
    import Toast from "@/utils/toast.js";
    const { proxy } = getCurrentInstance();
    import TEditor from "@/components/TEditor.vue";
    import SelectImages from "@/components/commonModal/SelectImages.vue";
    import FilterQueryModal from "@/components/portal/FilterQueryModal.vue";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    import { useStore } from "@/store/portal";
    const store = useStore();
    // const { name, properties } = store.currentData;
    // console.log("properties", properties);
    const labelCol = {
        style: {
            width: '60px',
            textAlign: "left"
        },
    };
    const editorRef = ref(null);

    const isFirstLoad = ref(true);
    const shouldIgnoreWatch = ref(false);
    
    const formState = reactive({
        header: '',
        title: '',
        subTitle: '',
        datasource: '',
        imgPosition: '',
        aggregate: '',
        aggregateField: ''
    });

    

    watch(()=>formState, (newVal, oldVal)=>{
        if(!isFirstLoad.value){
            console.log("watch-变化", formState);
            store.isConfigChange = true;
        }
    }, {deep: true});

    const data = reactive({
        isMasterData: true,
        isSubData: true,
        isChart: true,
        isEditor: false,
        height: 270,
        fileList: [],
        imageUrl: "",
        dashboardId: route.query.id,
        isImageModal: false,
        entityApiName: "",
        objectCodeList: [],
        entityId: "",
        entity: {
            label: "",
            name: "",
            objectTypeCode: ""
        },
        attributes: [],
        filterColumns: [],
        filterExpresssionList: [],
        isFilterModal: false,
        isSearchFilter: true
    });

    const { isMasterData, isSubData, isChart, isEditor, height, fileList, imageUrl, 
        dashboardId, isImageModal, entityApiName, objectCodeList, entityId, entity,
         attributes, filterExpresssionList, filterColumns, isFilterModal, isSearchFilter } = toRefs(data);
    

    const initFormData = (currentData) => {
        const { name, properties } = currentData;
        formState.header = name || '';
        formState.title = properties?.title || ''
        formState.subTitle = properties?.subTitle || '';
        formState.datasource = properties?.datasource || '';
        formState.imgPosition = properties?.img?.position || '';
        formState.aggregate = properties?.aggregate || '';
        formState.aggregateField = properties?.aggregateField || '';

        if(properties?.entity){
            data.entity = properties.entity;
            data.entityApiName = properties.entity.name;
        }

        if(properties?.sortBy){
            data.orderExpression2 = properties.sortBy;
        }

        if(properties?.filterColumns){
            data.filterExpresssionList = properties.filterColumns.map(item=>{
                item.attribute = item.column;
                return item;
            });
        };
    }

    watch(()=>store.currentData, (newVal,oldVal)=>{
        if(store.currentData.type == 'statcard'){
            // console.log('statscard', newVal);
            isFirstLoad.value = true;
            initFormData(store.currentData);
            setTimeout(()=>{
                isFirstLoad.value = false;
            });
        };
    }, {deep: true, immediate: true})


    const handleSetImg = (params) => {
        console.log("选中的图片:", params);
    }

    const handleAddFilter = () => {
        data.isFilterModal = true;
    };

    const handleOpenImg = () => {
        data.isImageModal = true;
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

    onMounted(()=>{
        nextTick(()=>{
            data.isEditor = true;
        });
        isFirstLoad.value = false;
    })
    onUnmounted(() => {

    })

    

    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
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

    const changeEntity = (e) => {
        let row = data.objectCodeList.find(item=>item.name == e);
        data.entityId = row.id;
        data.entity = {
            label: row.displayName,
            name: e,
            objectTypeCode: row.ObjectTypeCode.textValue
        }
        getAttributes();
    };

    const getAttributes = async () => {
        proxy.$post(Interface.objFieldData, {
            entityApiName: data.entityApiName
        }).then(res=>{
            data.attributes = res.attributes;
        })
    };
    getAttributes();

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
    watch(()=> store.isCopy, (newVal, oldVal)=>{
        if(store.isCopy==true){
            handleSave('');
        }
    });
    const handleSave = (id) => {
        
        if(data.entity.name==''){
            Toast.error("请选择对象！");
            return false;
        }
        if(formState.aggregate==""){
            Toast.error("请选择合计类型！");
            return false;
        }
        if(formState.aggregateField==""){
            Toast.error("请选择合计字段！");
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
        let obj = {
            chartTheme: null,
            componentData: 0,
            footer: null,
            header: formState.header,
            id: id == '' ? id : store.currentData.id,
            lastModifiedDate: "",
            properties: {
                moreUrl: null,
                drillUrl: null,
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
                    position: formState.imgPosition
                },
                aggregate: formState.aggregate,
                aggregateField: formState.aggregateField,
                entity: data.entity,
                filterColumns: filterColumns,
            },
            type: "statcard",
            componentType: "statcard",
            layout: {
                x: store.currentData.x,
                y: store.currentData.y,
                w: store.currentData.w,
                h: store.currentData.h
            }
        };
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
        // console.log("obj:", JSON.stringify(obj));
        let d = {
            message: JSON.stringify(params)
        };
        proxy.$post(Interface.portal.saveComponent, d).then(res=>{
            store.currentData.id = res.actions[0].returnValue.id;
            store.isCopy = false;
            store.isRefresh = true;
        })
    };

    const handleSaveOld = () => {
        let obj = {
            componentType: "statcard",
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
                    position: formState.imgPosition
                }
            },
            type: "statcard",
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
            isFirstLoad.value = true;
            store.isConfigChange = false;
            store.isCopy = false;
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