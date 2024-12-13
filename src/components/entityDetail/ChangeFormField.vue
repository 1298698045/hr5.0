<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="850px"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <table class="table">
              <colgroup>
                  <col width="50px">
                  <col width="45%">
                  <col width="45%">
                  <col width="50px">
              </colgroup>
              <thead>
                  <tr>
                      <th class="number"></th>
                      <th><span class="required">*</span>源数据</th>
                      <th><span class="required">*</span>修改数据</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in listData" :key="index">
                      <td>{{index+1}}</td>
                      <td>
                          <a-select style="width: 100%;" v-model:value="item.sourceAttributeId" show-search :filter-option="filterOption" @change="(e)=>{changeSource(e, item)}" allowClear>
                              <a-select-option v-for="(row, idx) in sourceList" :key="idx" :label="row.title" :value="row.id">{{row.title}} - {{row.fieldName}}</a-select-option>
                          </a-select>
                      </td>
                      <td>
                          <a-select style="width: 100%;" v-model:value="item.changeAttributeId" show-search :filter-option="filterOption" @change="(e)=>{changeChange(e, item)}" allowClear>
                              <a-select-option v-for="(row, idx) in originalData" :key="idx" :label="row.title" :value="row.id">{{row.title}} - {{row.fieldName}}</a-select-option>
                          </a-select>
                      </td>
                      <td><DeleteOutlined class="delIcon" @click="handleDelete(item, index)" /></td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
      <template #footer>
        <div style="display:flex;justify-content: space-between;">
          <a-button @click="handleAddRow">添加行</a-button>
          <div style="flex: 1;">
              <a-button @click="handleCancel">取消</a-button>
              <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
          </div>
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
  inject
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Toast from "@/utils/toast.js";
import Interface from "@/utils/Interface.js";
import { formNodesValueObj } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  objDetail: Object,
  fieldApiName: String,
  targetApiName: String,
  targetApiCode: [String, Number],
  fieldApiLabel: String,
  attributeId: String
});
console.log("objDetail", props.objDetail);
const formRef = ref();
const emit = defineEmits(["cancel", "callback"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  title: "查找修改表单字段映射",
  height: document.documentElement.clientHeight - 300,
  entityApiName: "",
  listData: [
      {
        sourceAttributeId: "",
        sourceAttributeName: "",
        changeAttributeId: "",
        changeAttributeName: "",
        displayOrder: 1
      }
  ],
  originalData: [],
  sourceList: []
});
const { title, height, listData, originalData, entityApiName, sourceList } = toRefs(data);

if(props.objDetail){
  data.entityApiName = props.objDetail.DeveloperName;
}

const filterOption = (input, option) => {
    return option.label.toLowerCase().includes(input.toLowerCase());
};

onMounted(() => {
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 300;
  });
});

const getQuery = () => {
  let d = {
    filterId: "",
    entityName: "EntityAttributeLookupChangeFormMap",
    filterQuery: "\AttributeId\teq\t" + props.attributeId,
    sort: "DisplayOrder",
    order: "ASC"
  };
  proxy.$get(Interface.list2, d).then(res=>{
    console.log('res', res);
    let temp = [];
    res.nodes.forEach(item=>{
      let obj = {
        sourceAttributeId: item.SourceAttributeId.lookupValue.value,
        sourceAttributeName: item.SourceAttributeName.value,
        changeAttributeId: item.ChangeAttributeId.lookupValue.value,
        changeAttributeName: item.ChangeAttributeName.value,
        displayOrder: item.DisplayOrder.value
      }
      temp.push(obj);
    });
    if(res.nodes.length){
      data.listData = temp;
    }
  })
};


const getSourceQuery = async () => {
  let d = {
      entityApiName: props.targetApiName
  }
  proxy.$get(Interface.entityFilter, d).then(res=>{
      data.sourceList = res.attributes;
  });
};
getSourceQuery();

const getAttributes = async () => {
  let d = {
      entityApiName: data.entityApiName
  }
  proxy.$get(Interface.entityFilter, d).then(res=>{
      data.originalData = res.attributes;
      getQuery();
  });
};
getAttributes();

const handleAddRow = () => {
  let displayOrder = data.listData.length+1;
  let obj = {
    sourceAttributeId: "",
    sourceAttributeName: "",
    changeAttributeId: "",
    changeAttributeName: "",
    displayOrder: displayOrder
  }
  data.listData.push(obj);
};
const changeSource = (e, item) => {
  let row = data.sourceList.find(v=>v.id==e);
  item.sourceAttributeName = row.fieldName;
};
const changeChange = (e, item) => {
  let row = data.originalData.find(v=>v.id==e);
  item.changeAttributeName = row.fieldName;
};

const handleDelete = (item, index) => {
  data.listData.splice(index, 1);
}

const handleSubmit = () => {

  let isBook = false;
  data.listData.forEach(item=>{
    if(item.sourceAttributeId == '' || item.changeAttributeId == ''){
      isBook = true;
      Toast.error("数据不能为空！");
    }
  });

  if(isBook){
    return false;
  }


  let obj = {
    actions:[{
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          attributeId: props.attributeId,
          name: props.fieldApiName,
          // lookupEntityId
          lookupEntityObjectTypeCode: props.targetApiCode,
          mapFields: data.listData,
        }
    }]
  }
  let d = {
      message: JSON.stringify(obj)
  }
  proxy.$post(Interface.objeview.saveMap, d).then(res=>{
      Toast("保存成功！");
      emit('cancel', false);
  })
};
</script>
<style lang="less">
@import url("@/style/modal.less");
.ant-modal-content .modalContainer .modalCenter {
  /* height: 500px !important; */
  padding: 0 !important;
}
.table{
  width: 100%;
  border-collapse: collapse;
  thead{
      width: 100%;
      height: 40px;
      background: #f2f2f2;
      border-bottom: 1px solid #dedede;
      tr{
          width: 100%;
          th{
              text-align: left;
              padding-left: 10px;
          }
          
      }
  }
  tbody{
      tr{
          width: 100%;
          border-bottom: 1px solid #dedede;
          td{
              text-align: left;
              padding-left: 10px;
              height: 40px;
              line-height: 40px;
              .delIcon{
                  font-size: 18px;
                  cursor: pointer;
              }
          }
      }
  }
}
.section {
  .sectionTitle {
    height: 30px;
    background-color: rgb(243, 242, 242);
    line-height: 30px;
    border-radius: 4px;
    padding-left: 15px;
    margin-bottom: 12px;
    /* margin: 2rem 2rem 0.5rem 2rem; */
  }
  .sectionRow {
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    .sectionItem {
      flex: 1;
      margin-right: 20px;
      .ant-row {
        display: block !important;
      }
    }
    .sectionItem:last-child {
      margin-right: 0;
    }
  }
}
:where(.css-dev-only-do-not-override-kqecok).ant-picker {
  width: 100%;
}
.ant-form-item {
  position: relative;
}
.selectIcon {
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
