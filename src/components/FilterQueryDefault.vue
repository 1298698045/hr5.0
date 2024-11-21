<template>
    <div>
        <table>
            <tbody>
                <tr>
                    <td class="lfInsertSuggestedCell" colspan="9">
                        <input value="插入建议条件" class="inpBtn" id="insertDepButton" name="insertDependency" title="插入建议条件"
                            type="button">
                    </td>
                </tr>
                <tr>
                    <td class="clearFilterRow" colspan="9"><a href="javascript:void(0);" id="clrFiltersLnk">清除过滤器条件</a>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <th colspan="2" scope="col">字段</th>
                    <th scope="col">运算符</th>
                    <th colspan="2" scope="col">值 / 字段</th>
                </tr>
                <tr v-for="(item, index) in filterList" :key="index">
                    <td class="FACriteriaIDCell">
                        <span class="textBox" :id="'and'+(index+1)" style="display:inline;" v-if="index!=0">AND</span>
                    </td>
                    <td>
                        <div class="FAOuterDiv">
                            <div class="FALabelEle">
                                <span>
                                    <div class="x-form-field-wrap x-form-field-trigger-wrap" style="width: 225px;" @click.stop>
                                        <input v-model="item.label" @input.stop="searchField(item,index)" @focus.stop="focusField(item, index)" type="text" size="24" autocomplete="off" placeholder="开始尝试搜索字段..." class=" x-form-empty-field" style="width: 221px;">
                                        <div class="x-combo-list" v-if="item.isSearchField" @click.stop>
                                            <div class="x-combo-list-inner">
                                                <div class="x-combo-list-item" :title="row.label" v-for="(row, idx) in attributes" :key="row.developerName" @click="changeField(row.developerName, item)">{{row.label}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <div class="errorMsg errorDiv" style="display: none;"></div>
                        </div>
                    </td>
                    <td>
                        <a href="javascript:void(0)" title="查找（新窗口）" @click="openField(item, index)">
                            <img :src="require('@/assets/img/s.gif')" alt="查找（新窗口）" class="lookupIcon" title="查找（新窗口）">
                        </a>
                    </td>
                    <td>
                        <span>
                            <select v-model="item.operator" :title="'运算符'+(index+1)" style="width: 91px;">
                                <option value="">--无--</option>
                                <option value="AND">与</option>
                                <option value="OR">或</option>
                            </select>
                        </span>
                    </td>
                    <td>
                        <select class="FAFVSelect" :title="'值'+(index+1)">
                            <option value="false" selected="selected">值</option>
                            <option value="true">字段</option>
                        </select>
                    </td>
                    <td>
                        <input v-model="item.value" class="FARHSValue" maxlength="255" size="20" :title="'值'+(index+1)" type="text">
                    </td>
                    <td class="clrLink"><a href="javascript:void(0)">清除</a></td>
                </tr>
            </tbody>
        </table>
        <div class="addRemoveControl booleanFilterTopMargin">
            <a href="javascript:void(0);" id="bool_filter_toggle" @click="handleAddFilter">添加筛选逻辑</a>
            <br>
        </div>
    </div>
    <InsertField :isShow="isInsert" v-if="isInsert" @cancel="isInsert=false" @params="handleInsertField" />
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h, computed
    } from "vue";
    import {
        EllipsisOutlined, PlusOutlined, DeleteOutlined
    } from "@ant-design/icons-vue";
    import InsertField from "@/components/entityDetail/InsertField.vue";
    const props = defineProps({
        FilterExpresssionList: Array,
        entityId: String
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
            field: "",
            logical: "",
            operatorList: [],
            operatorType: "",
            dType: "",
            value: "",
            label: "",
            Lktp: "",
            options: [],
            deptText: "",
            isSearchField: false
        }],
        isRadioDept: false,
        filterExpression: [],
        filterIdx: '', // 记录筛选器下标
        isInsert: false,
        isSearchField: false,
        fieldList: [],
        recordItem: {},
    });
    const { attributes, objectCodeList, filterExpression, jsonFilter, filterList, 
        isRadioDept, filterIdx, isInsert, isSearchField, fieldList, recordItem } = toRefs(data);
    onMounted(()=>{
        window.addEventListener('click', (e)=>{
            data.filterList.forEach(item=>{
                item.isSearchField = false;
            })
        })
    })
    const searchField = (item, index) => {
        item.isSearchField = true;
        getFieldList();
    }
    const focusField = (item, index) => {
        item.isSearchField = true;
        getFieldList('');
    }
    const blurField = (item, index) => {
        item.isSearchField = false;
    }
    const getFieldList = (search) => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: props.entityId,
            search: search
        }).then(res=>{
            data.attributes = res.rows;
        })
    };
    const openField = (item, index) => {
        getFieldList();
        data.recordItem = item;
        data.isInsert = true;
    };
    const handleInsertField = (params) => {
        changeField(params.developerName, data.recordItem);
        data.isInsert = false;
    }
    const getConfig = async () => {
        await proxy.$get(Interface.entityAttr, {
            objTypeCode: ""
        }).then(res => {
            data.attributes = res.attributes;
        });
    }
    getConfig();
    watch(() => data.filterList, (newVal, oldVal) => {
        console.log("newVal", newVal)
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
                    column: v.field
                });
            });
        }
        let filterExpression = JSON.stringify(result);
        console.log("filterExpression", filterExpression);
        data.filterExpression = filterExpression;
        emit("params", filterExpression);
    }, { deep: true, immediate: true })
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
        var res = getEntityLookup(filter.Lktp || 10, searchVal);
        res.then(response => {
            filter.options = response.listData;
        })
    }
    const getFilterList = () => {
        if (props.FilterExpresssionList.length) {
            data.filterList = [];
            let item = {};
            props.FilterExpresssionList.forEach(v => {
                var operatorList = getOperator(v.attribute, item);
                console.log('operatorList', operatorList);
                var dType = getDType(v.attribute, item);
                var operatorType = getOperatorType(v.operator, operatorList, item);
                var Lktp = getLktp(v.attribute, item);
                var options = [];
                if (Lktp == '' && dType == 'BusinessUnit') {
                    Lktp = 10;
                }
                if (Lktp && dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {
                    var response = getEntityLookup(Lktp)
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
                    deptText: ''
                })
            })
        }
    }

    const handleOpenLook = (filter, filterIdx) => {
        data.filterIdx = filterIdx;
        if (filter.Lktp == 8) {

        } else {
            data.isRadioDept = true;
        }
    }
    // 关闭单选部门弹窗
    const cancelDeptModal = (e) => {
        data.isRadioDept = e;
    }
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.ID == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push(params);
        }
        data.filterList[data.filterIdx].value = params.ID;
        data.isRadioDept = false;
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
        console.log(field, item, '123123');
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
    const getEntityLookup = async (Lktp, lksrch) => {
        var response;
        var d = {
            Lktp: Lktp,
            lksrch: lksrch
        }
        await proxy.$get(Interface.lookup, {}).then(res => {
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
            return v.developerName == e;
        });
        console.log(row,'123')
        item.field = e;
        item.dType = row.dType;
        item.operatorList = row.operator;
        item.label = row.label;
        item.Lktp = row.referencedEntityObjectTypeCode;
        item.options = row.filterValues;
        item.condition = '';
        item.value = '';
        item.isSearchField = false;
    }
    watch(() => props.FilterExpresssionList, async (newVal, oldVal) => {
        if (newVal && newVal.length) {
            await getConfig();
            getFilterList();
        }
    }, { immediate: true, deep: true })
    const handleDelFilter = (filter, filterIdx) => {
        data.filterList.splice(filterIdx, 1);
    }
</script>
<style lang="less" scoped>
    .clearFilterRow {
        text-align: right;
    }

    a {
        color: #000;
        text-decoration: underline;

        &:hover {
            color: #015ba7;
        }
    }
    .textBox{
        margin: 1px;
        margin-right: 7px;
        display: block !important;
    }
    td.FACriteriaIDCell{
        padding-top: 5px;
    }
    .lookupIcon{
        width: 20px;
        height: 20px;
        background-image: url("~@/assets/img/lookup20.gif");
        background-position: top left;
        &:hover{
            background-position: top right;
        }
    }
    input,select,img{
        margin-right: 4px;
        vertical-align: middle;
    }
    td{
        vertical-align: top;
    }
    .x-form-field-wrap{
        position: relative;
        left: 0;
        top: 0;
        text-align: left;
        zoom: 1;
        white-space: nowrap;
    }
    .x-combo-list{
        position: absolute;
        z-index: 12007;
        left: 0;
        top: 100%;
        width: 223px;
        height: 157px;
        background: #e3f3ff none repeat scroll 0 0;
        border: 1px solid #b2b2b2;
        font: normal 12px Arial, Helvetica, sans-serif;
        zoom: 1;
        overflow: hidden;
        .x-combo-list-inner{
            width: 223px;
            margin-bottom: 8px;
            height: 142px;
            border-bottom: 1px solid #b2b2b2;
            background: #fff;
            overflow: auto;
            position: relative;
            zoom: 1;
            overflow-x: hidden;
            .x-combo-list-group{
                font-style: italic;
                font-weight: bold;
            }
            .x-combo-list-item{
                border: 1px solid;
                white-space: nowrap;
                overflow: hidden;
                border-color: #fff;
                font-family: Arial, helvetica, verdana, sans-serif;
                padding: 1px 2px;
                text-overflow: ellipsis;
                color: #3c3d3e;
                &:hover{
                    background: #e3f3ff none repeat scroll 0 0;
                    border: 1px dotted #e3f3ff !important;
                    cursor: pointer;
                }
            }
        }
    }
</style>