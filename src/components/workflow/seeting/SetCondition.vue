<template>
  <div>
    <a-modal v-model:open="props.isShow" width="1200px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter padNone" :style="{ height: height + 'px!important' }">
          <a-form :model="formState">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item label="标签" name="Name" :rules="[{ required: true, message: '请输入列表名称!' }]">
                    <a-input v-model:value="formState.Name" />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item label="API名称" name="ApiName">
                    <a-input v-model:value="formState.ApiName" />
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item label="备注" name="Description">
                    <a-textarea v-model:value="formState.Description" placeholder="请输入备注" :rows="4" />
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
          <div class="conditionLabel">设置转移条件</div>
          <div class="conditionBody">
            <div class="left_condition">
              <div class="add_condition">
                条件顺序
                <a-button :icon="h(PlusOutlined)" @click="handleAddCondition"></a-button>
              </div>
              <ul class="sideTabs">
                <li class="sideTab" :class="{'active':current==index}" v-for="(item, index) in conditionList" :key="index" @click="handleTab(index)">{{item.Name}}</li>
              </ul>
            </div>
            <div class="right_condition">
              <div class="conditionItem" v-for="(item, index) in conditionList" :key="index">
                <div v-show="current==index">
                  <div class="conditionItem_actions">
                    条件详细信息
                    <a-button>删除条件</a-button>
                  </div>
                  <div class="conditionItem_bd">
                    <a-form :model="formState">
                      <div class="section">
                        <div class="sectionRow">
                          <div class="sectionItem">
                            <a-form-item label="标签" name="Name" :rules="[{ required: true, message: '请输入列表名称!' }]">
                              <a-input v-model:value="item.Name" />
                            </a-form-item>
                          </div>
                          <div class="sectionItem">
                            <a-form-item label="API名称" name="ApiName">
                              <a-input v-model:value="item.ApiName" />
                            </a-form-item>
                          </div>
                        </div>
                        <div class="sectionRow">
                          <div class="sectionItem">
                            <a-form-item label="逻辑运算符" name="Description">
                              <a-select style="width: 200px;" v-model:value="item.logical">
                                <a-select-option value="AND">满足所有条件(AND)</a-select-option>
                                <a-select-option value="OR">满足一个条件(OR)</a-select-option>
                              </a-select>
                            </a-form-item>
                          </div>
                        </div>
                      </div>
                    </a-form>
                    <div class="filterBox">
                      <FilterQuery :FilterExpresssionList="item.FilterExpresssionList" @params="(e)=>{getFilterQuery(e,item)}"></FilterQuery>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    defineProps,
    defineExpose,
    defineEmits,
    toRaw,
    inject,
    h
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
    PlusOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import Dtable from "@/components/Dtable.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import FilterQuery from "@/components/FilterQuery.vue";
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    ruleId: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const gridRef = ref();
  const data = reactive({
    title: "设置条件",
    height: document.documentElement.clientHeight - 300,
    id: "",
    FilterExpresssionList: [],
    filterExpression: "",
    conditionList: [{
      Name: "新条件",
      apiName: "",
      logical: "",
      ConditionExpression: "",
      FilterExpresssionList: []
    }],
    current: 0
  });
  const {
    title,
    height, id, FilterExpresssionList, filterExpression, conditionList, current
  } = toRefs(data);
  const formState = reactive({
    Name: "",
    ApiName: "",
    Description: "",
    ConditionExpression: ""
  });

  const getFilterQuery = (e, item) => {
    // console.log(e, item);
    // data.filterExpression = e;
    item.ConditionExpression = e;
  }
  const getParamsList = (e, item) => {
    console.log('e, item', e, item);
    item.FilterExpresssionList = e;
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
      data.tableHeight = document.documentElement.clientHeight - 370
    });
  });


  const getRuleCondition = () => {
    let obj = {
      actions:[{
        id: "562;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          id: props.ruleId,
          layoutId: null
        }
      }]
    };
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.workflow.ruleCondition, d).then(res=>{
      let { Name, ApiName, Description, Expressions } = res.actions[0].returnValue;
      formState.Name = Name;
      formState.ApiName = ApiName;
      formState.Description = Description;
      if(Expressions.length){
        data.conditionList = [];
        Expressions.forEach(item=>{
          data.conditionList.push({
            id: item.Id,
            Name: item.Name,
            apiName: item.ApiName,
            Description: item.Description,
            logical: item.LogicalExpression,
            ConditionExpression: item.Expression,
            FilterExpresssionList: item.FieldCriterias.map(item=>{
              item.attribute = item.column;
              return item;
            })
          })
        })
      }
    })
  }
  getRuleCondition();

  const handleAddCondition = () => {
    data.conditionList.push({
      Name: "新条件" + (data.conditionList.length + 1 ),
      ApiName: "",
      Description: ""
    })
  };
  const handleTab = (e) => {
    data.current = e;
  }
  const saveCondition = (index, item) => {
    let url = Interface.create;
    let obj = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: "",
                recordInput:{
                    allowSaveOnDuplicate: false,
                    apiName: "WFCondition",
                    objTypeCode: 142,
                    fields: {
                      ruleId: props.ruleId,
                      Name: item.Name,
                      ApiName: item.ApiName,
                      Position: index + 1,
                      ConditionExpression: item.ConditionExpression
                    }
                }
            }
        }]
    };
    if(item.id){
      obj.actions[0].params.recordId = item.id;
      url = Interface.edit;
    }
    let d = {
        message: JSON.stringify(obj)
    }
    
    proxy.$post(url, d).then(res=>{
      if(data.conditionList.length - 1 == index) {
        Toast("保存成功！");
        emit("cancel", false);
      }
    })
  }
  const handleSubmit = () => {
    let obj = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: props.ruleId,
                recordInput:{
                    allowSaveOnDuplicate: false,
                    apiName: "WFRule",
                    objTypeCode: 126,
                    fields: {
                      Name: formState.Name,
                      ApiName: formState.ApiName,
                      Description: formState.Description,
                    }
                }
            }
        }]
    };
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.edit, d).then(res => {
      // Toast("保存成功！");
      // emit("cancel", false);
      for(let i = 0; i < data.conditionList.length; i++){
        let item = data.conditionList[i];
        saveCondition(i, item);
      }
    })
  };
</script>
<style lang="less">
  @import url("@/style/modal.less");

  .searchForm {
    width: 300px;
    margin-bottom: 10px;
  }

  .conditionLabel {
    padding: 10px 20px;
  }
  .conditionBody {
    display: flex;
    border-top: 1px solid #747474;
    .left_condition {
      width: 15%;
      height: 400px;
      background: #f2f2f2;
      border-right: 1px solid #747474;
      .add_condition {
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #747474;
      }

      .sideTabs {
        .sideTab {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          cursor: pointer;

          &:hover {
            background: #fff;
          }

          &.active {
            background: #fff;
          }
        }
      }
    }

    .right_condition {
      flex: 1;
      padding: 15px;
      .conditionItem_actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .filterBox{
        padding-left: 20px;
      }
    }
  }
</style>