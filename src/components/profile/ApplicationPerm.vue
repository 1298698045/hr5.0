<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item><a href="javascript:;" @click="handleBack">简档概览</a></a-breadcrumb-item>
            <a-breadcrumb-item v-if="isDetail"><a href="javascript:;" @click="handleAppSet">应用程序设置</a></a-breadcrumb-item>
            <a-breadcrumb-item v-else>应用程序设置</a-breadcrumb-item>
            <a-breadcrumb-item v-if="Name">{{Name}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div v-if="!isDetail">
            <div class="title">
                所有应用程序设置
            </div>
            <table class="appSettingTable">
                <thead>
                    <tr>
                        <th>应用程序名称</th>
                        <th>可见</th>
                        <th>默认</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in appList" :key="index">
                        <td>
                            <a href="javascript:;" class="name" @click="handleDetailPerm(item)">{{item.label}}</a>
                        </td>
                        <td><a-checkbox disabled :checked="formBollean(item.isVisible)"></a-checkbox></td>
                        <td><a-checkbox disabled :checked="formBollean(item.isDefault)"></a-checkbox></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ApplicationPermDetail :AppId="AppId" :rowData="rowData" v-else />
    </div>
</template>
<script setup>
    import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineEmits, inject  } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const emit = defineEmits(['back'])
  import ApplicationPermDetail from "@/components/profile/ApplicationPermDetail.vue";
  const data = reactive({
    searchVal: "",
    appList: [],
    isDetail: false,
    profileId: inject("profileId").id,
    AppId: "",
    Name: "",
    rowData: {}
  });
  const { searchVal, appList, isDetail, profileId, AppId, Name, rowData } = toRefs(data);
  const getApplication = () => {
    let obj = {
        actions:[{
            id: "4105;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                profileId: data.profileId,
                systemCode: "HR"
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.profile.appList, d).then(res=>{
        // data.appList = res.listData;
        data.appList = res.actions[0].returnValue;
    })
  };
  getApplication();
  const formBollean = (str) => {
    return str == 0 ? false : true;
  };
  const handleBack = () => {
    emit('back','');
  };
  const handleDetailPerm = (item) => {
    data.rowData = item;
    data.AppId = item.AppId;
    data.Name = item.label;
    data.isDetail = true;
  };
  const handleAppSet =  () =>{
    data.Name = '';
    data.isDetail = false;
  }
</script>
<style lang="less" scoped>
    .title{
        padding: 20px 0 10px 20px;
    }
    .appSettingTable{
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        border: 1px solid #e0e3e5;
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
</style>