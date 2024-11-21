<template>
    <div class="NewField">
        <!-- <div class="head">
            <h1 class="title">外出学术活动审批表：新建自定义字段</h1>
            <div>
                <a href="javascript:;">此页面的帮助</a>
                <img :src="require('@/assets/img/help_orange.png')" alt="">
            </div>
        </div> -->
        <div class="panelStepBox">
            <div class="panelStepTitle" v-if="type == 'Y'||type == 'Y_MT'||type=='Z'||type=='1'">
                <span>
                    步骤 5. 将参考字段添加到页面布局
                </span>
                <span>
                    第 5 步
                </span>
            </div>
            <div class="panelStepTitle" v-else>
                <span>
                    步骤 4. 添加到页面布局
                </span>
                <span>
                    第 4 步，共 4 步步骤 4. 添加到页面布局
                </span>
            </div>
            <div class="panelStepBoxBd">
                <div class="panleStep" v-if="type == 'Y' || type == 'Y_MT'">
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(3)">
                    <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(5)">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>
                <div class="panleStep" v-else>
                    <!-- <a-button @click="handlePrev(2)">上一页</a-button>
                    <a-button class="ml10">保存并新建</a-button>
                    <a-button class="ml10">保存</a-button> -->
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(3)">
                    <input class="inpBtn ml10" type="button" value=" 保存并新建 ">
                    <input class="inpBtn ml10" type="button" value=" 保存 " @click="handleSave">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>
                <div class="panelContent">
                    <div class="rowText">
                        <span class="label">
                            字段标签
                        </span>
                        <span class="val">
                            {{store.state.recordForm.MasterLabel}}
                        </span>
                    </div>
                    <div class="rowText">
                        <span class="label">
                            数据类型
                        </span>
                        <span class="val">
                            {{ dataTypeName }}
                        </span>
                    </div>
                    <div class="rowText">
                        <span class="label">
                            字段名
                        </span>
                        <span class="val">
                            {{store.state.recordForm.DeveloperName}}
                        </span>
                    </div>
                    <div class="rowText">
                        <span class="label">
                            描述
                        </span>
                        <span class="val">
                            {{store.state.recordForm.Description}}
                        </span>
                    </div>
                    <div class="cfwStepExplanation">
                        <p>选择应包含该字段的页面布局。该字段将在这些页面布局的第一个 2 列部分，添加为最后一个字段。如果不选择布局，该字段在任何页面上都不会显示。</p>
                        <br />
                        <p>要更改该字段在页面上的位置，需要自定义页面布局。</p>
                        <!-- <a-table :columns="columns" :data-source="listData"  :row-key="record => record.id" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" bordered :pagination="false" /> -->
                    </div>
                    <div class="listBd">
                        <table class="tableList">
                            <tbody>
                                <tr class="headerRow">
                                    <th class="actionColumn" scope="col">
                                        <input checked="checked" id="selectAll" name="selectAll" type="checkbox" v-model="isCheckedAll" @change="changeCheckedAll">
                                        <label for="selectAll">添加字段</label>
                                    </th>
                                    <th class=" zen-deemphasize" scope="col">页面布局名</th>
                                </tr>
                                <tr class="dataRow even last first" v-for="(item, index) in listData" :key="index">
                                    <td class="actionColumn">
                                        <input v-model="item.checked" id="LayoutNameids0" name="LayoutNameids" title="选择 Order Product Layout" type="checkbox" value="00h9000000RbNyn">
                                        &nbsp;
                                    </td>
                                    <th scope="row" class=" dataCell  ">{{item.name}}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <p>完成后，单击"保存并新建"以创建更多自定义字段；如果已完成创建操作，请单击"保存"。</p>
                    </div>
                <div class="panleStep foot" v-if="type == 'Y' || type == 'Y_MT'">
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(3)">
                    <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(5)">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>    
                <div class="panleStep foot" v-else>
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(3)">
                    <input class="inpBtn ml10" type="button" value=" 保存并新建 ">
                    <input class="inpBtn ml10" type="button" value=" 保存 " @click="handleSave">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, UpOutlined
    } from "@ant-design/icons-vue";
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
        inject
    } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useStore } from "vuex";
    let store = useStore();
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const props = defineProps({
        type: [String, Number],
        dataTypeName: String
    });
    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    });
    const data = reactive({
        columns: [
            {
                title: '添加字段',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '页面布局名',
                dataIndex: 'age',
                key: 'age',
            }
        ],
        listData: [
            {
                id: 1,
                name: 1,
                age: "外出学术活动审批表 布局"
            }
        ],
        selectedRowKeys: [],
        isCheckedAll: false,
        fieldId: inject("editFieldId") || ''
    })
    const { columns, listData, selectedRowKeys, isCheckedAll, fieldId } = toRefs(data);
    console.log('123')
    const rowSelection = ref({
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({

        })
    });
    onMounted(()=>{
        data.selectedRowKeys = data.listData.map(record => record.id);
    })
    const getQuery = () => {
        let d = {
            entityId: route.query.id
        }
        proxy.$get(Interface.objeview.pageLayout.list, d).then(res=>{
            data.listData =  res.rows.map(item=>{
                item.checked = false;
                return item;
            });
        })
    }
    getQuery();

    const changeCheckedAll = () => {
        let checked = false;
        if(data.isCheckedAll){
            checked = true;
        }
        data.listData.forEach(item=>{
            item.checked = checked;
        })
    }

    const onSelectChange = (selectedRowKeys)=> {
      data.selectedRowKeys = selectedRowKeys;
    }
    const handleNext = (current) => {
        // console.log("store444", store.state.recordForm);
        let selectedLayouts = [];
        data.listData.forEach(item=>{
            if(item.checked){
                selectedLayouts.push({
                    id: item.id
                })
            }
        });
        store.commit('setRecordFormField', {field:'selectedLayouts',  value: selectedLayouts});
        emit("next", current);
    };
    const handlePrev = (current) => {
        emit("next", current);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };

    const handleSave = () => {
        let selectedLayouts = [];
        data.listData.forEach(item=>{
            if(item.checked){
                selectedLayouts.push({
                    id: item.id
                })
            }
        });
        store.commit('setRecordFormField', {field:'selectedLayouts',  value: selectedLayouts});
        let url = Interface.objeview.field.create;
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "Attribute",
                        objTypeCode: 100001,
                        fields: {
                            EntityId: route.query.id,
                        }
                    }
                    // field: store.state.recordForm
                }
            }]
        };
        if(data.fieldId){
            obj.actions[0].params.recordId = data.fieldId;
            url = Interface.objeview.field.edit;
        }
        for(let key in store.state.recordForm){
            if(typeof store.state.recordForm[key] == 'boolean'){
                obj.actions[0].params.recordInput.field[key] = store.state.recordForm[key] ? 1 : 0;
            }else {
                obj.actions[0].params.recordInput.field[key] = store.state.recordForm[key];
            }
        }
        let d = {
            message: JSON.stringify(obj)
        }
        console.log("store", store.state.recordForm)
        proxy.$post(url, d).then(res=>{
            store.commit("clearRecordForm", {});
        })
    }
</script>
<style lang="less" scoped>
    .NewField {
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .title {
                font-size: 20px;
                font-weight: normal;
                padding: 15px 12px 0;
            }

            a {
                padding-right: 5px;
            }

            img {
                vertical-align: top;
            }
        }

        .panelStepBox {
            .panelStepTitle {
                background-color: #8e9dbe;
                border-color: #8e9dbe;
                padding: 8px 12px;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                font-weight: bold;
            }

            .panelStepBoxBd {
                background: #f8f8f8 none;
                border: 1px solid #eaeaea;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;

                .panleStep {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 10px;
                }
                .panleStep.foot{
                    border-top: 1px solid #fff;
                }
                .panelDesc {
                    padding: 10px;
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #dbdbdb;
                }

                .radioGroup {
                    border-bottom: 1px solid #dbdbdb;
                    padding: 10px 20px;

                    .radioRow {
                        display: flex;
                        align-items: self-start;

                        .radioDesc {
                            flex: 1;
                            line-height: 30px;
                        }
                    }
                }

                .panelContent {
                    padding: 20px 10px;
                    border-top: 1px solid #dbdbdb;
                    border-bottom: 1px solid #dbdbdb;
                    .rowText {
                        line-height: 30px;

                        .label {
                            display: inline-block;
                            width: 300px;
                            text-align: right;
                            color: #4a4a56;
                            font-weight: bold;
                        }

                        .val {
                            display: inline-block;
                            padding-left: 20px;
                        }
                    }
                }
            }
        }
    }
    .cfwStepExplanation{
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .listBd{
        margin: 6px;
    }
    .tableList{
        width: 100%;
        border: 1px solid #e0e3e5;
        border-collapse: collapse;
        font-size: 13px;
        .headerRow{
            th{
                background: #f2f3f3;
                color: #000;
            }
        }
        .actionColumn {
            width: 1%;
            padding-right: 5px;
            color: #999;
            padding: 5px 5px 2px;
            label{
                vertical-align: middle;
            }
        }
        th{
            white-space: nowrap;
            border-bottom: 1px solid #e0e3e5;
            border: 1px solid #ededed;
            border-width: 0 0 1px 1px;
            border-color: #e0e3e5;
            color: #000;
            font-weight: bold;
            padding: 5px 2px 4px 5px;
            /* border-left-width: 0; */
            text-align: left;
        }
        
        .booleanColumn {
            text-align: center;
        }
        input[type="checkbox"]{
            vertical-align: middle;
            margin: 3px;
            width: 15px;
            height: 15px;
        }
        tr.even th{
            font-weight: normal;
            white-space: normal;
            background: #fff;
        }
        .dataRow{
            &:hover{
                th,td{
                    background: #e3f3ff;
                }
            }
        }
        td{
            background: #fff;
            border-bottom: 1px solid #ededed;
        }
    }
</style>