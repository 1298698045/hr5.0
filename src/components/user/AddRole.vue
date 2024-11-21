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
                        <a-form-item name="name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.name"></a-input>
                        </a-form-item>
                    </div>
                    <!-- <div class="sectionItem">
                        <a-form-item name="ParentRoleId" label="父角色">
                            <a-select v-model:value="formState.ParentRoleId.Id">
                                <a-select-option v-for="(item,index) in lookList" :key="index" :value="item.ID">{{item.Name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div> -->
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Pinyin" label="记助符号">
                            <a-input v-model:value="formState.Pinyin"></a-input>
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
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    id: String,
    ParentRoleId: Object
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建角色",
    height: document.documentElement.clientHeight - 300,
    lookList: []
  });

  
  const {
    title,
    height, lookList
  } = toRefs(data);
  
  const formState = reactive({
    name: "",
    ParentRoleId: {
        Id: "",
        Name: ""
    },
    Pinyin: ""
  });
  
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  if(props.ParentRoleId){
    console.log("props.ParentRoleId", props.ParentRoleId);
    let isBook = data.lookList.some(item=>item.ID==props.ParentRoleId.Id);
    if(!isBook){
        data.lookList.push({
            ID: props.ParentRoleId.Id,
            Name: props.ParentRoleId.Name
        })
    }
    formState.ParentRoleId = props.ParentRoleId;
  };
  const getDetail = () => {
    proxy.$get(Interface.detail, {
        Id: props.id,
        ObjTypeCode: 1036
    }).then(res=>{
        let detail = res.record;
        formState.name = detail.Name;
        formState.Pinyin = detail.Pinyin;
        formState.ParentRoleId = detail.ParentRoleId;
    })
  };
  if(props.id){
    data.title = '编辑角色';
    getDetail();
  }
  const getLookup = () => {
    proxy.$get(Interface.lookup, {
        Lktp: 1036
    }).then(res=>{
        data.lookList = res.listData;
    })
  };
  getLookup();
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        // let obj = {
        //   params: {
        //     objTypeCode: 1036,
        //     fields: {
        //       Name: formState.name,
        //       ParentRoleId: {
        //         Id:formState.ParentRoleId.Id,
        //         Name: formState.ParentRoleId.Name
        //       },
        //       Pinyin: formState.Pinyin
        //     },
        //     id: "",
        //   },
        // };
        // if(props.id){
        //     obj.params.id = props.id;
        // }
        // var messages = JSON.stringify(obj);
        // proxy.$get(Interface.user.addRole, { message: messages }).then((res) => {
        //   formRef.value.resetFields();
        //   message.warning("保存成功！");
        //   emit("cancel", false);
        // });
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "Role",
                        objTypeCode: 1036,
                        field: {
                          Name: formState.name,
                          Pinyin: formState.Pinyin
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.create, d).then(res=>{
            Toast("保存成功!");
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
  