<template>
    <div>
        <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item><a href="javascript:;" @click="handleBack">简档概览</a></a-breadcrumb-item>
            <a-breadcrumb-item v-if="isDetail"><a href="javascript:;" @click="handleAppSet">对象设置</a></a-breadcrumb-item>
            <a-breadcrumb-item v-else>对象设置</a-breadcrumb-item>
            <a-breadcrumb-item v-if="Name">{{Name}}</a-breadcrumb-item>
        </a-breadcrumb>
        <div v-if="!isDetail">
            <h2 class="title">
                所有对象设置
            </h2>
            <table class="appSettingTable">
                <thead>
                    <tr>
                        <th>对象名</th>
                        <th>对象权限</th>
                        <th>总字段</th>
                        <th>选项卡设置</th>
                        <th>页面布局</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listData" :key="index">
                        <td>
                            <a href="javascript:;" class="name" @click="handleDetailPerm(item)">{{item.Label}}</a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ObjSettingDetail v-else :TemplateId="TemplateId" />
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
  import ObjSettingDetail from "@/components/profile/ObjSettingDetail.vue";
  const { proxy } = getCurrentInstance();
  const emit = defineEmits(['back']);
  const data = reactive({
    searchVal: "",
    listData: [],
    isDetail: false,
    profileId: inject("profileId").id,
    TemplateId: "",
    Name: ""
  });
  const { searchVal, listData, isDetail, profileId, TemplateId, Name } = toRefs(data);
  const getApplication = () => {
    proxy.$get(Interface.profile.objList, {
        ProfileId: data.profileId
    }).then(res=>{
        data.listData = res.listData;
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
    data.TemplateId = item.TemplateId;
    data.Name = item.Label;
    data.isDetail = true;
  };
  const handleAppSet =  () =>{
    data.Name = '';
    data.isDetail = false;
  }
</script>
<style lang="less" scoped>
    .breadcrumb{
        padding-bottom: 15px;
    }
    .title{
        padding: 5px 12px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
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