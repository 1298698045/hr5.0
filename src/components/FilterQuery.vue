<template>
    <div class="filterWrap">
        <p class="label">查询条件</p>
        <div class="filterList">
            <div class="fileterRow" v-for="(filter,filterIdx) in filterList" :key="filterIdx">
                <a-form>
                    <a-form-item class="formItem" label="逻辑运算符">
                        <a-select v-model:value="filter.logical" placeholder="请选择逻辑运算符">
                            <a-select-option value="AND">与</a-select-option>
                            <a-select-option value="OR">或</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="字段">
                        <a-select v-model:value="filter.field" placeholder="请选择字段" :show-search="true"
                        :filter-option="filterOption" optionFilterProp="label"
                            @change="(e)=>changeField(e, filter, item)">
                            <a-select-option v-for="(field,fieldIdx) in attributes" :label="field.label"
                                :value="field.fieldName">{{field.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="运算符">
                        <a-select v-model:value="filter.operator" placeholder="请选择运算符">
                            <a-select-option v-for="(row,rowIdx) in filter.operatorList"
                                :value="row.operator">{{row.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item class="formItem" label="值">
                        <div v-if="filter.dType=='DateTime'">
                            <a-date-picker v-model:value="filter.value" />
                        </div>
                        <div v-else-if="filter.dType=='Numeric'">
                            <a-input type="Number" v-model:value="filter.value"></a-input>
                        </div>
                        <div v-else-if="filter.dType=='Picklist'||filter.dType=='L'">
                            <a-select mode="multiple" v-model:value="filter.value" placeholder="请选择">
                                <a-select-option v-for="v in filter.options" :key="v.value" :value="v.value">
                                    {{v.label}}
                                </a-select-option>
                            </a-select>
                        </div>
                        <div v-else-if="filter.dType=='BusinessUnit' || filter.dType=='User' || filter.dType == 'Lookup'" style="position: relative;">
                            <a-select mode="multiple" v-model:value="filter.value" placeholder="请选择"
                                :default-active-first-option="false" :filter-option="false" showSearch
                                @change="e=>changePickVal(e, filter)"
                                @search="e=>searchlookup(filter, e)"
                                @dropdownVisibleChange="e=>searchlookup(filter, '')">
                                <template #suffixIcon></template>
                                <a-select-option v-for="v in filter.options" :key="v.ID" :value="v.ID">{{ v.Name
                                    }}</a-select-option>
                            </a-select>
                            <i class="iconfont icon-sousuo pointer"
                                @click="handleOpenLook(filter, filterIdx)"></i>
                        </div>
                        <div v-else>
                            <a-input v-model:value="filter.value"></a-input>
                        </div>
                    </a-form-item>
                    <div class="deleteIcon">
                        <DeleteOutlined @click="handleDelFilter(filter,filterIdx)" />
                    </div>
                </a-form>
            </div>
        </div>
        <div>
            <a-button :icon="h(PlusOutlined)" @click="handleAddFilter"></a-button>
        </div>
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <radio-user v-if="isRadioUser" :isShow="isRadioUser"  @cancel="isRadioUser=false" @selectVal="handleUserParams" :localId="localId"></radio-user>
        <LookupFilter v-if="isLookupFilter" :entityApiName="lookEntityApiName" :entityType="lookEntityType" :objectTypeCode="lookObjectTypeCode" :isShow="isLookupFilter" @select="handleSelectLook" @cancel="isLookupFilter=false" />
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, h, computed } from "vue";
        import {
        EllipsisOutlined, PlusOutlined, DeleteOutlined
    } from "@ant-design/icons-vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    const props = defineProps({
        FilterExpresssionList: Array,
        entityId: String,
        entityApiName: {
            type: String,
            default: 'HREmployee'
        }
    })
    const emit = defineEmits(['params']);
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        attributes: [],
        objectCodeList: [],
        jsonFilter: [],
        filterList: [{
            operator: "",
            picklistValues: [],
            field: "",
            logical: "",
            operatorList: [],
            operatorType: "",
            dType: "",
            value: "",
            label: "",
            Lktp: "",
            options: [],
            deptText: ""
        }],
        isRadioDept: false,
        isRadioUser: false,
        filterExpression: [],
        filterIdx: '', // 记录筛选器下标
        localId: "",
        isLookupFilter: false,
        lookEntityApiName: "",
        lookEntityType: "",
        lookObjectTypeCode: ""
    });
    const { attributes, objectCodeList, filterExpression, jsonFilter, filterList, isRadioDept, isRadioUser, filterIdx, localId, isLookupFilter,
        lookEntityApiName, lookEntityType, lookObjectTypeCode
     } = toRefs(data);

    // const getConfig = async () => {
    //     await proxy.$get(Interface.entityAttr, {
    //         objTypeCode: ""
    //     }).then(res => {
    //         data.attributes = res.attributes;
    //     });
    // }
    // getConfig();

    const getFieldData = async (e = '') => {
        console.log("e",e);
        await proxy.$get(Interface.objFieldData, {
            entityApiName: props.entityApiName
        }).then(res=>{
            data.attributes = res.attributes;
        })
    };
    getFieldData();
    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
    watch(()=>data.filterList,(newVal,oldVal)=>{
        console.log("newVal",newVal)
        let result = [];
        if (newVal && newVal.length > 0) {
            newVal.forEach(function (v) {
                let value = v.value;
                if (!Array.isArray(v.value)) {
                    value = [v.value];
                }
                result.push({
                    logical: v.logical,
                    attribute: v.field,
                    label: v.label,
                    operator: v.operator,
                    operands: value,
                    column: v.field,
                    picklistValues: v.picklistValues
                });
            });
        }
        let filterExpression = JSON.stringify(result);
        console.log("filterExpression",filterExpression);
        data.filterExpression = filterExpression;
        emit("params", filterExpression);
    },{deep: true, immediate: true})
    const getLook = () => {
        proxy.$get(Interface.design.look, {
            Lktp: 100000
        }).then(res => {
            data.objectCodeList = res.listData;
        })
    }
    // getLook();
    // 查询条件-搜索
    const searchlookup = (filter, searchVal) => {
        console.log("filter", filter);
        var res = getEntityLookup(filter.Lktp || 10, searchVal, filter);
        res.then(res => {
            if(res){
                // filter.options = res.listData;
                console.log("resresres", res);
                let list = res.actions[0].returnValue.lookupResults.records;
                console.log("resresres", list);
                let arr = [];
                list.forEach(item=>{
                    arr.push({
                        ID: item.fields.Id.value,
                        Name: item.fields.Name.value
                    })
                });
                filter.options = arr;
            }
        })
    }
    const getFilterList = () => {
        if(props.FilterExpresssionList.length){
            data.filterList = [];
            let item = {};
            props.FilterExpresssionList.forEach(v=>{
                var operatorList = getOperator(v.attribute, item);
                console.log('operatorList',operatorList);
                var dType = getDType(v.attribute, item);
                var operatorType = getOperatorType(v.operator, operatorList, item);
                var Lktp = getLktp(v.attribute, item);
                var options = [];
                if (Lktp == '' && dType == 'BusinessUnit') {
                    Lktp = 10;
                }
                if (Lktp && dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {
                    var response = getEntityLookup(Lktp, '', v)
                    if (response) {
                        options = response.listData;
                    }
                }
                if (dType == 'Picklist' || dType == 'L') {
                    options = getFilterValues(v.attribute, item)
                }
                if (dType == 'Picklist' || dType == 'L' || dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {

                } else {
                    if (v.operands && v.operands.length > 0) {
                        v.operands = v.operands[0];
                    }
                    if (v.value && v.value.length > 0) {
                        v.value = v.value[0];
                    }
                }
                data.filterList.push({
                    operator: v.operator,
                    field: v.attribute,
                    logical: v.logical,
                    operatorList: operatorList,
                    operatorType: operatorType,
                    dType: dType,
                    value: v.operands || v.value,
                    label: v.label,
                    Lktp: Lktp,
                    options: options,
                    deptText: '',
                    picklistValues: v.picklistValues
                })
            })
        }
    }
    
    const handleOpenLook = (filter, filterIdx) => {
        data.filterIdx = filterIdx;
        if (filter.Lktp == 8 || filter.Lktp == 10020) {
            data.isRadioUser = true;
        } else if(filter.Lktp == 10) {
            data.isRadioDept = true;
        } else {
            data.isLookupFilter = true;
        }
    }
    // 关闭单选部门弹窗
    const cancelDeptModal = (e) => {
        data.isRadioDept = e;
    }
    // 部门
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.ID == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push(params);
        }
        data.filterList[data.filterIdx].value.push(params.ID);
        data.filterList[data.filterIdx].picklistValues.push(params.Name);
        data.isRadioDept = false;
    };
    // 用户
    const handleUserParams = (params) => {
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.id == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push({
                ID: params.id,
                Name: params.name
            });
        }
        data.filterList[data.filterIdx].value.push(params.id);
        data.filterList[data.filterIdx].picklistValues.push(params.name);
        data.isRadioUser = false;
    }
    // 通用
    const handleSelectLook = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.LIST_RECORD_ID == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push({
                ID: params.LIST_RECORD_ID,
                Name: params.Name
            });
        }
        data.filterList[data.filterIdx].value.push(params.LIST_RECORD_ID);
        data.filterList[data.filterIdx].picklistValues.push(params.Name);
        data.isLookupFilter = false;
    }
    // 查找类型-选择值
    const changePickVal = (e, item) => {
        let list = item.options.filter(item=>{
            return e.find(row=>row==item.ID);
        });
        item.picklistValues = list.map(item=>item.Name);
    }
    // 添加查询条件
    const handleAddFilter = () => {
        var obj = Object.assign({}, data.filterList[0]);
        Object.keys(obj).forEach(function (key) {
            obj[key] = '';
        });
        data.filterList.push(obj);
    }
    const getOperator = (field, item) => {
        // console.log(field, item, '123123');
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.operator || '';
    }
    const getDType = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.dType || '';
    }
    const getOperatorType = (operator, list) => {
        if (list) {
            var row = list.find(function (v) {
                return v.operator == operator;
            });
            return row.operatorType;
        } else {
            return '';
        }
    }
    const getLktp = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.referencedEntityObjectTypeCode || '';
    }
    const getEntityLookup = async (Lktp, lksrch, filter) => {
        var response;
        // var d = {
        //     Lktp: Lktp,
        //     lksrch: lksrch
        // }
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: "HREmployee",
                    fieldApiName: filter.field,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: data.lookEntityApiName,
                    body: {
                        sourceRecord: {
                            apiName: "HREmployee",
                            fields: {
                                id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        await proxy.$post(Interface.lookup, d).then(res => {
            response = res;
        })
        return response;
    }
    const getFilterValues = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.filterValues || [];
    }
    const changeField = (e, item, parentItem) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == e;
        });
        item.field = e;
        item.dType = row.dType;
        item.operatorList = row.operator;
        item.label = row.label;
        item.Lktp = row.referencedEntityObjectTypeCode;
        item.options = row.filterValues;
        item.condition = '';
        if(item.dType=='Picklist' || item.dType == 'L' || item.dType=='BusinessUnit' || item.dType=='User' || item.dType == 'Lookup'){
            item.value = [];
            item.picklistValues = [];
            data.lookEntityApiName = row.referencedEntity.EntityName;
            data.lookObjectTypeCode = row.referencedEntity.EntityObjectTypeCode;
            console.log(" data.lookEntityApiName",  data.lookEntityApiName, data.lookObjectTypeCode)
        }else {
            item.value = '';
        }
    };
    watch(()=>props.FilterExpresssionList, async (newVal,oldVal)=>{
        if(newVal.length){
            await getFieldData();
            getFilterList();
        }
    }, {immediate: true, deep: true})
    const handleDelFilter = (filter,filterIdx) => {
        data.filterList.splice(filterIdx, 1);
    }
</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }

    .formRow {
        display: flex;

        .formItem {
            flex: 1;
        }
    }
    .filterWrap {
        .ant-form {
            display: flex;

            .formItem {
                flex: 1;
                margin-right: 5px;
            }

            .formItem:last-child {
                margin-right: 0;
            }
        }
    }

    .icon-sousuo {
        position: absolute;
        top: 3px;
        right: 10px;
        cursor: pointer;
    }
    .deleteIcon{
        font-size: 18px;
        cursor: pointer;
        padding-top: 30px;
        padding-left: 10px;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-input{
        border: 1px solid #000;
    }
</style>