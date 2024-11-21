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
                            <a-select style="width: 100%;" v-model:value="item.SourceAttributeName" @change="(e)=>{changeSource(e, item)}">
                                <a-select-option v-for="(row, idx) in originalData" :key="idx" :value="row.fieldName">{{row.title}}</a-select-option>
                            </a-select>
                        </td>
                        <td>
                            <a-select style="width: 100%;" v-model:value="item.ChangeAttributeName" @change="(e)=>{changeChange(e, item)}">
                                <a-select-option v-for="(row, idx) in originalData" :key="idx" :value="row.fieldName">{{row.title}}</a-select-option>
                            </a-select>
                        </td>
                        <td><DeleteOutlined class="delIcon" /></td>
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
  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean
  });
  const formRef = ref();
  const emit = defineEmits(["cancel", "callback"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "查找修改表单字段映射",
    height: document.documentElement.clientHeight - 300,
    AttributeId: {
                
    },
    Name: "",
    LookupEntityObjectTypeCode: "30020",
    objTypeCode: "100020",
    listData: [
        {
            SourceAttributeName: "",
            ChangeAttributeName: "",
            SourceAttributeId: {
                objectTypeCode: "",
                sobjectType: "",
                Id: "",
                Name: "",
                value: "",
                displayValue: ""
            },
            ChangeAttributeId: {
                objectTypeCode: "",
                sobjectType: "",
                Id: "",
                Name: "",
                value: "",
                displayValue: ""
            },
            LookupEntityObjectTypeCode: ""
        }
    ],
    originalData: []
  });
  const {
    title,
    height, listData, originalData, AttributeId, Name, LookupEntityObjectTypeCode, objTypeCode
  } = toRefs(data);
  const formState = reactive({

  });
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });

  const getAttributes = () => {
    proxy.$get(Interface.entityAttr, {}).then(res=>{
        data.originalData = res.attributes;
    });
  };
  getAttributes();

  const handleAddRow = () => {
    let obj = {
        SourceAttributeName: "",
        ChangeAttributeName: "",
        SourceAttributeId: {
            objectTypeCode: "",
            sobjectType: "",
            Id: "",
            Name: "",
            value: "",
            displayValue: ""
        },
        ChangeAttributeId: {
            objectTypeCode: "",
            sobjectType: "",
            Id: "",
            Name: "",
            value: "",
            displayValue: ""
        },
        LookupEntityObjectTypeCode: ""
    }
    data.listData.push(obj);
  };
  const changeSource = (e, item) => {
    // console.log(e, item);
    let row = data.originalData.find(v=>v.fieldName==e);
    item.SourceAttributeId = {
        objectTypeCode: "",
        sobjectType: row.referencedEntityObjectTypeCode,
        Id: row.attributeId,
        Name: row.label,
        value: row.attributeId,
        displayValue: row.label
    }
    item.LookupEntityObjectTypeCode = row.referencedEntityObjectTypeCode;
  };
  const changeChange = (e, item) => {
    let row = data.originalData.find(v=>v.fieldName==e);
    item.ChangeAttributeId = {
        objectTypeCode: "",
        sobjectType: row.referencedEntityObjectTypeCode,
        Id: row.attributeId,
        Name: row.label,
        value: row.attributeId,
        displayValue: row.label
    }
    item.LookupEntityObjectTypeCode = row.referencedEntityObjectTypeCode;
  }
  const handleSubmit = () => {
    // formRef.value
    //   .validate()
    //   .then(() => {
    //     console.log("values", formState, toRaw(formState));
    //     var d = {
    //         entityId: "",
    //         name: formState.fieldName,
    //         label: formState.fieldLabel,
    //         attributeType: formState.attributeType,
    //         objectTypeCode: 100006
    //     };
    //     proxy.$get(Interface.objeview.addLogic, d).then((res) => {
    //       formRef.value.resetFields();
    //       Toast("保存成功！");
    //       emit("callback", false);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
    let recordReps = [];
    data.listData.forEach(item=>{
        recordReps.push({
            objTypeCode: 10020,
            fields: {
                AttributeId: {},
                Name: '',
                SourceAttributeId: item.SourceAttributeId,
                SourceAttributeName: item.SourceAttributeName,
                ChangeAttributeId: item.ChangeAttributeId,
                ChangeAttributeName: item.ChangeAttributeName,
                LookupEntityObjectTypeCode: item.LookupEntityObjectTypeCode
            }
        })
    });
    let obj = {
        params: {
            recordReps: recordReps
        }
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$get(Interface.objeview.changeformmapSave, d).then(res=>{
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
  