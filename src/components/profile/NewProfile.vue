<template>
    <div class="NewProfile">
        <h1 class="title">新建简档</h1>
        <div class="desc">输入新简档的名称。</div>

        <div class="center">
            <div class="pagePanel">
                <div class="pagePanel-head">
                    <div class="pagePanel-head-label">您必须选择一个要复制的现有简档。</div>
                    <div class="requiredText"><span class="require">* = </span>必填信息</div>
                </div>
                <div class="pagePanel-bd">
                    <a-form :model="formState" :label-col="labelCol" class="profileForm">
                        <a-form-item label="现有简档" name="ProfileId" :rules="[{ required: true, message: '请选择现有简档!' }]" class="formItem">
                            <a-select v-model:value="formState.ProfileId">
                                <a-select-option v-for="(item, index) in proUserList" :key="index" :value="item.ProfileId">{{item.ProfileIdName}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="简档名" name="ProfileName" :rules="[{ required: true, message: '请输入简档名!' }]" class="formItem">
                            <a-input v-model:value="formState.ProfileName"></a-input>
                        </a-form-item>
                    </a-form>
                </div>
                <div class="pagePanel-foot">
                    <a-button type="primary" @click="handleSave">保存</a-button>
                    <a-button class="ml10" @click="handleCancel">取消</a-button>
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
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineEmits } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const labelCol = {
    style: {
        width: '150px',
    },
   };
   const formState = reactive({
        ProfileId:"",
        ProfileName: ""
   })
   const emit = defineEmits(['cancel']);
   const data = reactive({
    proUserList: []
   });
   const { proUserList } =  toRefs(data);
   const getProUserList = () => {
    proxy.$get(Interface.list, {
        entityType: "SystemUserProfile",
        grid: "easy",
        filterQuery: "",
        sort: "CreatedOn",
        order: "desc",
        page: 1,
        rows: 1000
    }).then(res=>{
        data.proUserList = res.rows;
    })
   };
   getProUserList();

   const handleCancel = () => {
    emit('cancel', false);
   };
</script>
<style lang="less" scoped>
    .require{
        color: #c00;
    }
    .NewProfile{
        width: 100%;
        height: 100%;
        padding: 15px;
        .title{
            font-weight: normal;
            font-size: 24px;
        }
        .desc{
            margin: 16px 0;
        }
    }
    .pagePanel{
        width: 100%;
        border-top: 3px solid #747e96;
        border-radius: 4px;
        background: #f8f8f8;
        border-bottom: 1px solid #eaeaea;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        .pagePanel-head{
            padding: 4px 16px;
            color: #000;
            background: url("~@/assets/img/opacity75.png");
            background-color: #8e9dbe;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            .pagePanel-head-label{
                font-weight: bold;
            }
        }
        .pagePanel-bd{
            min-height: 100px;
            padding: 20px;
            .profileForm{
                .formItem{
                    width: 300px;
                }
            }
        }
        .pagePanel-foot{
            border-top: 1px solid #dbdbdb;
            padding: 5px 0;
            text-align: center;
        }
    }
</style>