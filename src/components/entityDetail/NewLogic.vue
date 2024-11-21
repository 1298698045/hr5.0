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
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="fieldLabel" label="字段标签" :rules="[{ required: true, message: '请输入字段标签' }]">
                            <a-input v-model:value="formState.fieldLabel"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="fieldName" label="字段名称" :rules="[{ required: true, message: '请输入字段名称' }]">
                            <a-input v-model:value="formState.fieldName"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="attributeType" label="字段类型" :rules="[{ required: true, message: '请选择字段类型' }]">
                            <a-select v-model:value="formState.attributeType">
                                <a-select-option value="00000000-0000-0000-00aa-11000000001e">文本</a-select-option>
                                <a-select-option value="00000000-0000-0000-00AA-110000000011">数字</a-select-option>
                                <a-select-option value="00000000-0000-0000-00AA-110000000020">日期</a-select-option>
                                <a-select-option value="00000000-0000-0000-00AA-110000000015">日期/时间</a-select-option>
                                <a-select-option value="00000000-0000-0000-00AA-110000000024">文本区（长）</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
              </div>
            </a-form>
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
    inject
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel", "callback"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建逻辑字段",
    height: document.documentElement.clientHeight - 300
  });
  const {
    title,
    height
  } = toRefs(data);
  const formState = reactive({
    fieldLabel: "",
    fieldName: "",
    attributeType: ""
  });
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });

  const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: "Attribute"
                    // objTypeCode: 100001
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            console.log('res', res);
            let { fields } = res.actions[0].returnValue;
            formState.MasterLabel = fields.Label.value;
            formState.DeveloperName = fields.Name.value;
        })
    }
    if(props.id){
        getDetail();
    }
  const handleSubmit = () => {
    formRef.value.validate().then(() => {
        let url = Interface.create;
        let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: "Attribute",
                        objTypeCode: 100001,
                        fields: {
                            name: formState.fieldName,
                            label: formState.fieldLabel,
                            attributeType: formState.attributeType
                        }
                    }
                }
            }]
        };
        if(props.id){
            d.actions[0].params.recordId = props.id;
            url = Interface.edit;
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.create, d).then((res) => {
          formRef.value.resetFields();
          Toast("保存成功！");
          emit("callback", false);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
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
  