<template>
    <div>
        <div class="headTitle">
            <div class="flex">
                {{ detail.Label }}
                <div class="options">
                    <!-- <a-button @click="handleEdit">编辑</a-button>
                    <a-button class="ml10" v-if="isEdit" @click="handleSavePerm">保存</a-button> -->
                    <input type="button" class="inpBtn" value=" 编辑 " @click="handleEdit">
                    <input type="button" class="inpBtn" value=" 保存 " @click="handleSavePerm" v-if="isEdit">
                </div>
            </div>
        </div>
        <div class="tableWrap" style="margin-top: 0;">
            <p class="label">选项卡设置</p>
            <div class="TabDepth">
                <span class="text" v-if="!isEdit">{{TabDepthList[TabDepth].label}}</span>
                <a-select style="width: 200px;" v-model:value="TabDepth" v-else>
                    <a-select-option :value="0">默认关闭</a-select-option>
                    <a-select-option :value="1">默认打开</a-select-option>
                    <a-select-option :value="2">隐藏选项卡</a-select-option>
                </a-select>
            </div>
        </div>
        <div class="tableWrap">
            <p class="label">对象权限</p>
            <table class="appSettingTable">
                <thead>
                    <tr>
                        <th>权限名称</th>
                        <th>已启用</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span>读取</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.ReadDepth"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>创建</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.CreateDepth"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>编辑</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.UpdateDepth"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>删除</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.DeleteDepth"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>查看全部</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.ViewAllRecords"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>修改全部</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="detail.ModifyAllRecords"></a-checkbox></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tableWrap">
            <p class="label">字段权限</p>
            <table class="appSettingTable">
                <thead>
                    <tr>
                        <th>字段名</th>
                        <th>读取访问权限</th>
                        <th>编辑访问权限</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in fieldPrivileges" :key="index">
                        <td>
                            <span>{{item.Label}}</span>
                        </td>
                        <td><a-checkbox :disabled="true" v-model:checked="item.read"></a-checkbox></td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="item.write"></a-checkbox></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, inject  } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  const props = defineProps({
    TemplateId: String
  })
  const data = reactive({
    searchVal: "",
    fieldPrivileges: [],
    detail: {},
    IsVisible: false,
    IsDefault: false,
    isEdit: false,
    ProfileId: inject("profileId").id,
    TabDepth: "",
    TabDepthList: [
        {
            value: 0,
            label: '默认关闭'
        },
        {
            value: 1,
            label: '默认打开'
        },
        {
            value: 2,
            label: '隐藏选项卡'
        }
    ]
  });
  const { searchVal, fieldPrivileges, detail, IsVisible,  IsDefault, isEdit, TabDepth, TabDepthList} = toRefs(data);
  
  const getDetail = () => {
    proxy.$get(Interface.profile.objDetail, {
        TemplateId: props.TemplateId,
        ProfileId: data.ProfileId
    }).then(res=>{
        data.detail =  res.actions[0].returnValue;
        data.TabDepth = data.detail.TabDepth;
        data.detail.ReadDepth = formBollean(data.detail.ReadDepth);
        data.detail.CreateDepth = formBollean(data.detail.CreateDepth);
        data.detail.UpdateDepth = formBollean(data.detail.UpdateDepth);
        data.detail.DeleteDepth = formBollean(data.detail.DeleteDepth);
        data.detail.ViewAllRecords = formBollean(data.detail.ViewAllRecords);
        data.detail.ModifyAllRecords = formBollean(data.detail.ModifyAllRecords);
        data.fieldPrivileges = res.actions[0].returnValue.FieldPrivileges;
        data.fieldPrivileges = data.fieldPrivileges.map(item=>{
            let read;
            var write;
            if(item.PrivilegeDepth==4){
                read = true;
                write = false;
            }else if(item.PrivilegeDepth==16){
                read = true;
                write = true;
            }else{
                read = false;
                write = false;
            }
            item.read = read;
            item.write = write;
            return item;
        })
    })
  };
  getDetail();
  const handleEdit = () => {
    data.isEdit = true;
  };
  const formBollean = (str) => {
    return str == 0 ? false : true;
  };
  const handleSavePerm = () => {
    let FieldPrivileges = [];
    data.fieldPrivileges.map(item=>{
        if(item.write){
            item.PrivilegeDepth = 16;
        }
        FieldPrivileges.push({
            FieldId: item.FieldId,
            Label: item.Label,
            Name: item.Name,
            PrivilegeDepth: item.PrivilegeDepth
        })
    });
    let obj = {
        message:{
            actions: [
                {
                    TemplateId: data.detail.TemplateId,
                    ProfileId: data.ProfileId,
                    params: {
                        TabDepth: data.TabDepth,
                        ReadDepth: data.detail.ReadDepth ? 1 : 0,
                        CreateDepth: data.detail.CreateDepth ? 1 : 0,
                        UpdateDepth: data.detail.UpdateDepth ? 1 : 0,
                        DeleteDepth: data.detail.DeleteDepth ? 1 : 0,
                        ModifyAllRecords: data.detail.ModifyAllRecords ? 1 : 0,
                        ViewAllRecords: data.detail.ViewAllRecords ? 1 : 0,
                        FieldPrivileges: FieldPrivileges
                    }
                }
            ]
        }
    };
    var d = {
        Message: JSON.stringify(obj)
    }
    proxy.$get(Interface.profile.saveObj, d).then(res=>{
        Toast("保存成功!");
        data.isEdit = false;
        getDetail();
    });
  };
</script>
<style lang="less" scoped>
    .headTitle{
        width: 100%;
        font-weight: bold;
        padding: 20px 0 10px 0;
        /* border-bottom: 1px solid #8e9dbe; */
        .flex{
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .tableWrap{
        margin-top: 20px;
        border-top: 1px solid #8e9dbe;
        .label{
            padding: 10px 0;
            font-weight: bold;
        }
        .appSettingTable{
            width: 700px;
            text-align: left;
            border-collapse: collapse;
            border: 1px solid #e0e3e5;
            margin-left: 20px;
            thead{
                background: #f2f3f3;
            }
            th,td{
                padding: 5px;
                font-size: 12px;
                border-left: 1px solid #e0e3e5;
            }
            tbody{
                tr{
                    border-top: 1px solid #e0e3e5;
    
                }
                td{
                    border-left: none;
                    a.name{
                        color: #333;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .TabDepth{
        padding-left: 20px;
        font-size: 12px;
    }
</style>