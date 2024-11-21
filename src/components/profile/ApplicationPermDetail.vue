<template>
    <div>
        <div class="headTitle">
            <div class="flex">
                {{ rowData.label }}
                <div class="options">
                    <!-- <a-button @click="handleEdit">编辑</a-button>
                    <a-button class="ml10" v-if="isEdit" @click="handleSavePerm">保存</a-button> -->
                    <input type="button" class="inpBtn" value=" 编辑 " @click="handleEdit">
                    <input type="button" class="inpBtn" value=" 保存 " @click="handleSavePerm" v-if="isEdit">
                </div>
            </div>
        </div>
        <div class="tableWrap">
            <p class="label">应用程序权限</p>
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
                            <span>可见</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="IsVisible"></a-checkbox></td>
                    </tr>
                    <tr>
                        <td>
                            <span>默认</span>
                        </td>
                        <td><a-checkbox :disabled="!isEdit" v-model:checked="IsDefault"></a-checkbox></td>
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
    AppId: String,
    rowData: Object
  })
  const data = reactive({
    searchVal: "",
    appList: [],
    detail: {},
    IsVisible: false,
    IsDefault: false,
    isEdit: false,
    ProfileId: inject("profileId").id
  });
  const { searchVal, appList, detail, IsVisible,  IsDefault, isEdit} = toRefs(data);
  
  const getApplication = () => {
    proxy.$get(Interface.profile.appGet, {
        AppId: props.AppId,
        ProfileId: data.ProfileId
    }).then(res=>{
        data.appList = res.listData;
        data.detail = res.listData[0];

        data.IsVisible = formBollean(data.detail.IsVisible);
        data.IsDefault = formBollean(data.detail.IsDefault);
    })
  };
//   getApplication();
    const formBollean = (str) => {
        return str == 0 ? false : true;
    };
    data.IsVisible = formBollean(props.rowData.isVisible);
    data.IsDefault = formBollean(props.rowData.isDefault);
  const handleEdit = () => {
    data.isEdit = true;
  };
  
  const handleSavePerm = () => {
    // let obj = {
    //     message:{
    //         actions: [
    //             {
    //                 AppId: data.detail.AppId,
    //                 ProfileId: data.ProfileId,
    //                 params: {
    //                     IsVisible: data.IsVisible ? 1 : 0,
    //                     IsDefault: data.IsDefault ? 1 : 0,
    //                 }
    //             }
    //         ]
    //     }
    // };
    // var d = {
    //     Message: JSON.stringify(obj)
    // }
    // proxy.$get(Interface.profile.saveProfileApp, d).then(res=>{
    //     Toast("保存成功!");
    //     data.isEdit = false;
    //     getApplication();
    // });
    let obj = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: "ProfileApplication",
                    objTypeCode: 91,
                    ProfileId: data.ProfileId,
                    ApplicationId: props.rowData.applicationId,
                    IsVisible: data.IsVisible ? 1 : 0,
                    IsDefault: data.IsDefault ? 1 : 0,
                }
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.create, d).then(res=>{
        Toast("保存成功!");
        data.isEdit = false;
        // getApplication();
    });
  };
</script>
<style lang="less" scoped>
    .headTitle{
        width: 100%;
        font-weight: bold;
        padding: 20px 0;
        border-bottom: 1px solid #8e9dbe;
        .flex{
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .tableWrap{
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
</style>