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
            <div class="panelStepTitle" v-if="type=='Y'||type == 'Y_MT'||type == 'Z'||type == '1'">
                <span>
                    步骤 4. 建立参考字段的字段级安全性
                </span>
                <span>
                    第 4 步
                </span>
            </div>
            <div class="panelStepTitle" v-else>
                <span>
                    步骤 3. 建立字段级安全性
                </span>
                <span>
                    第 3 步，共 4 步
                </span>
            </div>
            <div class="panelStepBoxBd">
                <div class="panleStep">
                    <!-- <a-button @click="handlePrev(1)">上一页</a-button>
                    <a-button class="ml10" @click="handleNext(3)">下一页</a-button> -->
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(2)">
                    <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(4)">
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
                            {{dataTypeName}}
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
                        选择希望通过字段级安全性在其中赋予对此字段拥有编辑访问权限的简档。如果您不将该字段添加到字段级安全性中，它将不在任何简档中显示。
                    </div>
                    <div class="listBd">
                        <table class="tableList">
                            <tr class="headerRow">
                                <th scope="col" class="zen-deemphasize">简档的字段级安全性</th>
                                <th scope="col" class="booleanColumn zen-deemphasize">
                                    <input type="checkbox" v-model="isCheckedAll" @change="changeCheckedAll">可见
                                </th>
                                <th scope="col" class="booleanColumn zen-deemphasize">
                                    <input type="checkbox" v-model="isReadonlyAll" @change="changeReayonlyAll">只读
                                </th>
                            </tr>
                            <tr class="dataRow even first" v-for="(item, index) in profileList" :key="index">
                                <th scope="row" class=" dataCell  ">{{item.Name.textValue}}</th>
                                <td class=" dataCell  booleanColumn">
                                    <input type="checkbox" v-model="item.checked">
                                </td>
                                <td class=" dataCell  booleanColumn">
                                    <input type="checkbox" v-model="item.readOnly">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="panleStep foot">
                    <!-- <a-button @click="handlePrev(1)">上一页</a-button>
                    <a-button class="ml10" @click="handleNext(3)">下一页</a-button> -->
                    <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(2)">
                    <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(4)">
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
        defineEmits
    } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { useStore } from "vuex";
    let store = useStore();

    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['prev','next','cancel']);
    const props = defineProps({
        type: [String, Number],
        dataTypeName: String
    });
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    }); 

    const data = reactive({
        profileList: [],
        isCheckedAll: true,
        isReadonlyAll: false
    })
    const { profileList, isCheckedAll, isReadonlyAll } = toRefs(data);

    const handleNext = () => {
        // console.log("store333", store.state.recordForm)
        let selectedProfiles = [];
        data.profileList.forEach(item=>{
            if(item.checked){
                selectedProfiles.push({
                    id: item.id
                })
            }
        });
        store.commit('setRecordFormField', {field:'selectedProfiles',  value: selectedProfiles});
        emit("next", 4);
    };
    const handlePrev = () => {
        let num = 2;
        if(props.type==1){
            num = 2.5;
        }
        emit("next", num);
    };
    const handleCancel = () => {
        emit("cancel", false);
    }

    const getProfileAll = () => {
        let d = {
            entityName: "Profile",
            objectTypeCode: 20017
        }
        proxy.$get(Interface.list2, d).then(res=>{
            data.profileList = res.nodes.map(item=>{
                item.checked = true;
                item.readOnly = false;
                return item;
            });
        })
    };
    getProfileAll();
    
    const changeCheckedAll = () => {
        let checked = false;
        if(data.isCheckedAll){
            checked = true;
        }
        data.profileList.forEach(item=>{
            item.checked = checked;
        })
    }
    const changeReayonlyAll = () => {
        let readOnly = false;
        if(data.isReadonlyAll){
            readOnly = true;
        }
        data.profileList.forEach(item=>{
            item.readOnly = readOnly;
        })
    }


</script>
<style lang="less" scoped>
    .NewField{
        .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            .title{
                font-size: 20px;
                font-weight: normal;
                padding: 15px 12px 0;
            }
            a{
                padding-right: 5px;
            }
            img{
                vertical-align: top;
            }
        }
        .panelStepBox{
            .panelStepTitle{
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
            .panelStepBoxBd{
                background: #f8f8f8 none;
                border: 1px solid #eaeaea;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                .panleStep{
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 10px;
                    border-bottom: 1px solid #dbdbdb;
                }
                .panleStep.foot{
                    border-top: 1px solid #fff;
                }
                .panelDesc{
                    padding: 10px;
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #dbdbdb;
                }
                .radioGroup{
                    border-bottom: 1px solid #dbdbdb;
                    padding: 10px 20px;
                    .radioRow{
                        display: flex;
                        align-items: self-start;
                        .radioDesc{
                            flex: 1;
                            line-height: 30px;
                        }
                    }
                }
                .panelContent{
                    padding: 8px 12px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid #dbdbdb;
                    .rowText{
                        line-height: 30px;
                        .label{
                            display: inline-block;
                            width: 300px;
                            text-align: right;
                            color: #4a4a56;
                            font-weight: bold;
                        }
                        .val{
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