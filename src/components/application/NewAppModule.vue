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
                <!-- <div class="sectionTitle">基本信息</div> -->
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.Name"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="MasterLabel" label="模块名称" :rules="[{ required: true, message: '请输入模块名称' }]">
                            <a-input v-model:value="formState.MasterLabel"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="TabCode" label="模块代码" :rules="[{ required: true, message: '请输入模块代码' }]">
                            <a-input v-model:value="formState.TabCode"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="TabCss" label="模块样式" :rules="[{ required: true, message: '请输入模块样式' }]">
                            <a-input v-model:value="formState.TabCss"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="SortOrder" label="序号" :rules="[{ required: true, message: '请输入序号' }]">
                            <a-input v-model:value="formState.SortOrder"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="LinkUrl" label="链接" :rules="[{ required: true, message: '请输入链接' }]">
                            <a-input v-model:value="formState.LinkUrl"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="IsCustomizable" label="自定义">
                            <a-checkbox v-model:checked="formState.IsCustomizable"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="IsDisabled" label="禁用">
                            <a-checkbox v-model:checked="formState.IsDisabled"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Description" label="备注">
                        <a-textarea v-model:value="formState.Description" :rows="4"></a-textarea>
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
    title: "应用模块",
    height: document.documentElement.clientHeight - 300
  });
  const {
    title,
    height
  } = toRefs(data);
  const formState = reactive({
    Name: '', // 名称
    TabCode:'', // 类型
    MasterLabel:'', // 模块名称
    TabCss:'', // 样式
    LinkUrl:'', //  连接
    IsDisabled: false, //  禁用
    IsCustomizable: false, //  自定义
    SortOrder: '500', // 序号
    Description: "",
    Color:""
  });
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  
  const getDetail = () => {
    let obj = {
      actions:[{
          id: "4270;a",
          descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
          callingDescriptor: "UNKNOWN",
          params: {
              recordId: props.id,
              apiName: "SystemTab"
          }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.detail, d).then(res=>{
      let fields = res.actions[0].returnValue.fields;
      formState.Name = fields.Name.displayValue;
    })
  }
  getDetail();
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        // var d = {
        //   Name: formState.Name, 
        //   TabCode: formState.TabCode,
        //   MasterLabel: formState.TabCode,
        //   TabCss: formState.TabCss,
        //   LinkUrl: formState.LinkUrl,
        //   IsDisabled: formState.IsDisabled,
        //   IsCustomizable: formState.IsCustomizable,
        //   SortOrder: formState.SortOrder,
        //   Description: formState.Description
        // };
        // proxy.$get(Interface.application.systemtabAdd, d).then((res) => {
        //   formRef.value.resetFields();
        //   Toast("保存成功！");
        //   emit("callback", false);
        // });
        let url = Interface.create;
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: "SystemTab",
                        objTypeCode: 3022,
                        fields: toRaw(formState)
                    }
                }
            }]
        };
        if(props.id){
            obj.actions[0].params.recordId = props.id;
            url = Interface.edit;
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(url, d).then((res) => {
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
  