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
                            <a-input v-model:value="item.name"></a-input>
                        </div>
                    </div>
                    <div class="rowForm">
                        <div class="label">启用</div>
                        <div class="val">
                            <a-switch v-model:checked="item.enable" />
                        </div>
                    </div>
                    <div class="rowForm">
                        <div class="label">消息模板</div>
                        <div class="val">
                            <div class="searchForm">
                                <a-select v-model:value="item.messageTemplateId" style="width: 100%;">
                                    <a-select-option v-for="(row, idx) in messageList" :key="idx" :value="row.id">{{ row.Name.value }}</a-select-option>
                                    <template #suffixIcon>

                                    </template>
                                </a-select>
                                <div class="searchIcon" @click.stop="handleOpenLook(item, index)">
                                    <SearchOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rowForm">
                        <div class="formItem">
                            <div class="label">送达方式</div>
                            <div class="val" style="width: auto;">
                                <div class="label">短信</div>
                                <a-switch v-model:checked="item.Sms" style="margin-right: 20px;" />
                                <div class="label">微信</div>
                                <a-switch v-model:checked="item.wechat" style="margin-right: 20px;" />
                                <div class="label">消息</div>
                                <a-switch v-model:checked="item.message" style="margin-right: 20px;" />
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
                        <FilterQuery :FilterExpresssionList="item.filterExpression" @params="(e)=>handleFilterItem(e, item)" />
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
        <LookupFilter v-if="isLookFilter" :isShow="isLookFilter" @cancel="isLookFilter=false;" @select="handleSelectData" />
    </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    PlusOutlined,
    SearchOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  
  import Interface from "@/utils/Interface.js";
  import { useRouter, useRoute } from "vue-router";
  
  const router = useRouter();
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  const { proxy } = getCurrentInstance();

  import FilterQuery from "@/components/FilterQuery.vue";
  import LookupFilter from "@/components/commonModal/LookupFilter.vue";
  const data = reactive({
    ruleList: [
        // {
        //     Sms: false,
        //     wechat: false,
        //     message: false,
        //     enable: false,
        //     messageTemplateId: '',
        //     name: '员工关怀规则一',
        //     tableData: [],
        //     isFilter: false,
        //     filterExpression: ""
        // }
    ],
    objTypeCode: 152,
    entityType: "04N",
    messageList: [],
    isLookFilter: false,
    recordIndex: ""
  });
  const { ruleList, objTypeCode, entityType, messageList, isLookFilter, recordIndex } = toRefs(data);
  
  
  const getMessageList = () => {
    proxy.$get(Interface.moduleSetting.messageTemplate, {
        objectTypeCode: data.objTypeCode,
        entityType: data.entityType,
        search: ""
    }).then(res=>{
        data.messageList = res.returnValue.nodes;
        getRuleList();
    });
  };
  getMessageList();


  const handleOpenLook = (item, index) => {
    data.recordIndex = index;
    data.isLookFilter = true;
  };
    const handleSelectData = (e) => {
        console.log('data', e);
        data.isLookFilter = false;
        let isExist = data.messageList.some(item=>item.id==e.LIST_RECORD_ID);
        if(!isExist){
            data.messageList.push({
                id: e.LIST_RECORD_ID,
                Name: {
                    value: e.Name
                }
            })
        };
        data.ruleList[data.recordIndex].messageTemplateId = e.LIST_RECORD_ID;
    };
  const getRuleList = () => {
    proxy.$get(Interface.moduleSetting.empList, {
        objectTypeCode: data.objTypeCode,
        entityType: data.entityType,
        filterQuery: 'Name eq EmployeeBirthdayCare',
    }).then(res=>{
        console.log("getRuleList",res);
        let nodes = res.returnValue.nodes;
        let result = [];
        nodes.forEach(item=>{
            let response = getDetail(item.id);
            response.then(detail=>{
                console.log("detail", detail);
                var record = JSON.parse(detail.Configuration);
                var Configuration = record.rules;
                console.log("Configuration",Configuration);
                Configuration.forEach(row=>{
                    var d = {
                        id: item.id,
                        messageTemplateId: row.messageTemplateId,
                        name: row.Name,
                        enable: row.enable,
                        Sms: row.actions.Sms,
                        message: row.actions.message,
                        wechat: row.actions.wechat,
                        tableData: [],
                        filterExpression: []
                    }
                    var filterExpression = row && row.filterExpression && row.filterExpression.replace(/\\/g,'') || '';
                    // console.log('filterExpression',filterExpression);
                    if(filterExpression){
                        filterExpression = JSON.parse(filterExpression);
                    }
                    // console.log("filterExpression",filterExpression);
                    d.filterExpression = filterExpression;
                    if (filterExpression.length > 0) {
                        d.isFilter = true;
                    }
                    result.push(d);
                })
                // console.log('result',result);
                data.ruleList = result;
            });
        });
    })
  };
  

  
  
  const getDetail = async (id) => {
    let detail = {};
    await proxy.$get(Interface.moduleSetting.empDetail, {
        ObjTypeCode: data.objTypeCode,
        id: id
    }).then(res=>{
        detail = res.record;
    });
    return detail;
  };
  const handleFilterItem = (e, item) => {
    if(e){
        console.log("fileterItem", JSON.parse(e));
        item.tableData = JSON.parse(e);
    }
  };
  // 添加规则
  const handleAddRule = () => {
    data.ruleList.push({
        Sms: false,
        wechat: false,
        message: false,
        enable: false,
        messageTemplateId: '',
        name: '员工关怀规则'+(data.ruleList.length+1),
        tableData: [],
        isFilter: false,
        filterExpression: []
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
                            display: flex;
                            .searchForm{
                                width: 100%;
                                position: relative;
                                .searchIcon{
                                    position: absolute;
                                    right: 10px;
                                    top: 6px;
                                    cursor: pointer;
                                    z-index: 999;
                                }
                            }
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