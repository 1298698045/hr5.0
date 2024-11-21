<template>
  <div class="home">
      <div class="todo-head">
          <div class="todo-head-left">
            <div class="icon-circle-base"></div>
            <span class="wea-new-top-title-breadcrumb">应用程序(设置)</span>
          </div>
          <div class="todo-head-right">
              <a-input-search
                  class="todo-head-right-search"
                  v-model:value="value"
                  placeholder="快速查找"
                  @search="onSearch"
              />
            <!-- <a-button type="primary" @click="handleAddUser">添加人员</a-button> -->
          </div>
      </div>
      <div class="setupWrap">
          <div class="ruleItem" v-for="(item, index) in ruleList" :key="index">
              <div class="ruleItemHead">
                  <a-button @click="handleDeleteRule(item, index)">删除规则</a-button>
              </div>
              <div class="ruleItemBd">
                  <div class="rowForm">
                      <div class="label">名称</div>
                      <div class="val">
                          <a-input v-model:value="item.Name"></a-input>
                      </div>
                  </div>
                  <div class="rowForm">
                      <div class="formItem">
                          <div class="label">前缀</div>
                          <div class="val">
                              <a-input v-model:value="item.prex"></a-input>
                          </div>
                      </div>
                      <div class="formItem">
                          <div class="label">起始号码</div>
                          <div class="val">
                              <a-input v-model:value="item.startNo"></a-input>
                          </div>
                      </div>
                  </div>
                  <div class="rowForm">
                      <div class="label">人员筛选</div>
                      <div class="val">
                          <a-checkbox v-model:checked="item.isFilter">设置筛选条件</a-checkbox>
                      </div>
                  </div>
                  <div v-if="item.isFilter">
                      <FilterQuery :FilterExpresssionList="[]" @params="(e)=>handleFilterItem(e, item)" />
                  </div>
              </div>
          </div>

          <div class="footer">
              <div class="addBtn" @click="handleAddRule">
                  <PlusOutlined />
                  添加
              </div>
              <a-button type="primary" @click="handleSave">保存</a-button>
          </div>
      </div>
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";

import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
const { proxy } = getCurrentInstance();

import FilterQuery from "@/components/FilterQuery.vue";

const data = reactive({
  ruleList: [
      {
          prex: '',
          Name: '工号规则1',
          startNo: 1000,
          isFilter: false,
          tableData: []
      }
  ],
  objTypeCode: 34001
});
const { ruleList, objTypeCode } = toRefs(data);

const getRuleList = () => {
  proxy.$get(Interface.fetchList, {
      objectTypeCode: data.objTypeCode,
      entityType: "H0s"
  }).then(res=>{
      console.log("res",res);
      let nodes = res.returnValue.nodes;
      let result = [];
      nodes.forEach(item=>{
          result.push({
              Name: item.Name.textValue,
              prex: "",
              startNo: 1000,
              isFilter: false,
              tableData: []
          })
      });
      data.ruleList = result;
  })
};
//   getRuleList();
const getDetail = () => {
  proxy.$get(Interface.detail, {
      ObjTypeCode: data.objTypeCode,
      id: ""
  }).then(res=>{

  })
};
//   getDetail();
const handleFilterItem = (e, item) => {
  if(e){
      console.log("fileterItem", JSON.parse(e));
      item.tableData = JSON.parse(e);
  }
};
// 添加规则
const handleAddRule = () => {
  data.ruleList.push({
      prex: '',
      Name: '工号规则'+(data.ruleList.length+1),
      startNo: 1000,
      isFilter: false,
      tableData: []
  })
};
const handleDeleteRule = (item, index) => {
  data.ruleList.splice(index, 1);
};

const handleSave = () => {
  let len = data.ruleList.length;
  data.ruleList.forEach((item,index)=>{
      let obj = {
          params: {
              recordRep: {
                  objTypeCode: data.objTypeCode,
                  Name: item.Name,
                  prex: item.prex,
                  startNo: item.startNo,
                  ConditionExpression: JSON.stringify(item.tableData)
              }
          }
      }
      var d = {
          message: JSON.stringify(obj)
      }
      proxy.$get(Interface.save, d).then(res=>{
          if(index==len-1){
              Toast("保存成功！");
              getRuleList();
          }
      });
  })
};
</script>
<style lang="less" scoped>
  @import url("@/style/list.less");
  .home{
      height:  100%;
      .setupWrap{
          height: calc(~"100% - 52px");
          overflow-y: auto;
          background: #f9f9f9;
          padding: 15px 15px;
          .ruleItem{
              width: 100%;
              margin-bottom: 15px;
              border-radius: 4px;
              padding: 10px;
              background: #fff;
              .ruleItemHead{
                  display: flex;
                  justify-content: flex-end;
              }
              .ruleItemBd{
                  .rowForm{
                      display: flex;
                      align-items: center;
                      padding: 10px;
                      .formItem{
                          display: flex;
                          align-items: center;
                          margin-right: 20px;
                      }
                      .label{
                          width: 80px;
                      }
                      .val{
                          width: 200px;
                      }
              }
              }
          }
          .footer{
              .addBtn{
                  cursor: pointer;
                  padding: 10px 0;
                  color: #3399ff;
              }
          }
      }
  }
</style>