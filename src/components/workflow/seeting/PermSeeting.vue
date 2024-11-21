<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="850px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="savePermission"
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
                <div class="sectionTitle">步骤名称</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="步骤">
                            <a-input disabled v-model:value="formState.name"></a-input>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">流程处理权限</div>
                <div class="sectionRow sectionRowCheckbox">
                    <div class="sectionItem">
                        <a-form-item name="backPrev" label="退回权限">
                          <a-checkbox v-model:checked="formState.backPrev"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="terminate" label="终止权限">
                          <a-checkbox v-model:checked="formState.terminate"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="jump" label="跳转权限">
                          <a-checkbox v-model:checked="formState.jump"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="backStart" label="退回到发起人">
                          <a-checkbox v-model:checked="formState.backStart"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="finish" label="结束流程">
                          <a-checkbox v-model:checked="formState.finish"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="addPeople" label="可手动加办理人">
                          <a-checkbox v-model:checked="formState.addPeople"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="insert" label="加签">
                          <a-checkbox v-model:checked="formState.insert"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <!-- <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="jump" label="跳转权限">
                          <a-checkbox v-model:checked="formState.jump"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="backStart" label="退回到发起人">
                          <a-checkbox v-model:checked="formState.backStart"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="finish" label="结束流程">
                          <a-checkbox v-model:checked="formState.finish"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="addPeople" label="可手动加办理人">
                          <a-checkbox v-model:checked="formState.addPeople"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="insert" label="加签">
                          <a-checkbox v-model:checked="formState.insert"></a-checkbox>
                        </a-form-item>
                    </div>
                </div> -->
              </div>
              <div class="section">
                <div class="sectionTitle">正文附件权限</div>
                <!-- <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="docRight1" label="正文权限">
                            <a-select v-model:value="formState.docRight1">
                                <a-select-option value="2">不可见</a-select-option>
                                <a-select-option value="4">只读</a-select-option>
                                <a-select-option value="8">读写</a-select-option>
                                <a-select-option value="16">读写/留痕迹</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="docRight2" label="附件权限">
                            <a-select v-model:value="formState.docRight2">
                                <a-select-option value="2">不可见</a-select-option>
                                <a-select-option value="4">只读</a-select-option>
                                <a-select-option value="8">读写</a-select-option>
                                <a-select-option value="16">读写/删除</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div> -->
                <div class="sectionRow sectionRowCheckbox">
                    <div class="sectionItem">
                        <a-form-item name="read" label="查看">
                          <a-checkbox v-model:checked="attachPermissionState.read"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="update" label="修改">
                          <a-checkbox v-model:checked="attachPermissionState.update"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="delete" label="删除">
                          <a-checkbox v-model:checked="attachPermissionState.delete"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="mark" label="修改留痕">
                          <a-checkbox v-model:checked="attachPermissionState.mark"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="clear" label="清稿">
                          <a-checkbox v-model:checked="attachPermissionState.clear"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <!-- <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="delete" label="删除">
                            <a-checkbox v-model:checked="attachPermissionState.delete"></a-checkbox>
                          </a-form-item>
                      </div>
                      <div class="sectionItem">
                          <a-form-item name="mark" label="修改留痕">
                            <a-checkbox v-model:checked="attachPermissionState.mark"></a-checkbox>
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="clear" label="清稿">
                          <a-checkbox v-model:checked="attachPermissionState.clear"></a-checkbox>
                        </a-form-item>
                    </div>
                </div> -->
              </div>
              <div class="section">
                <div class="sectionTitle">字段访问权限</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <table class="tablePerm">
                            <thead>
                                <tr>
                                    <th style="width: 20%;">{{masterEntityPermission.label}}</th>
                                    <th>
                                        <span style="line-height: 42px; margin-right: 10px;">权限</span>
                                        <a-select v-model:value="tableRight.right" style="width: 200px;" @change="changePerm">
                                            <a-select-option value="2">不可见</a-select-option>
                                            <a-select-option value="4">只读</a-select-option>
                                            <a-select-option value="8">读写</a-select-option>
                                            <a-select-option value="16">读写/删除</a-select-option>
                                        </a-select>
                                        <span class="childRightText">必填</span>
                                        <a-checkbox v-model:checked="tableRight.isRequired"></a-checkbox>
                                        <span class="childRightText">可见</span>
                                        <a-checkbox v-model:checked="tableRight.list"></a-checkbox>
                                        <span class="childRightText">可新增</span>
                                        <a-checkbox v-model:checked="tableRight.isNew"></a-checkbox>
                                        <span class="childRightText">可删除</span>
                                        <a-checkbox v-model:checked="tableRight.isDelete"></a-checkbox>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row,idx) in masterEntityPermission.fieldPermissions" :key="idx">
                                    <td style="width: 20%;">{{row.label}}【{{row.name}}】</td>
                                    <td>
                                        <a-radio-group v-model:value="row.permission">
                                            <a-radio value="2">不可见</a-radio>
                                            <a-radio value="4">只读</a-radio>
                                            <a-radio value="8">读写</a-radio>
                                            <a-radio value="16">显示默认值且不可修改</a-radio>
                                            <a-radio value="32">显示默认值且可修改</a-radio>
                                        </a-radio-group>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="tablePerm" v-for="(item, index) in relatedListEntityPermissions" :key="index">
                          <thead>
                              <tr>
                                  <th style="width: 20%;">{{masterEntityPermission.label}}</th>
                                  <th>
                                      <span style="line-height: 42px; margin-right: 10px;">权限</span>
                                      <a-select v-model:value="tableRight.right" style="width: 200px;">
                                          <a-select-option value="2">不可见</a-select-option>
                                          <a-select-option value="4">只读</a-select-option>
                                          <a-select-option value="8">读写</a-select-option>
                                          <a-select-option value="16">读写/删除</a-select-option>
                                      </a-select>
                                      <span class="childRightText">必填</span>
                                      <a-checkbox v-model:checked="tableRight.required"></a-checkbox>
                                      <span class="childRightText">可见</span>
                                      <a-checkbox v-model:checked="tableRight.list"></a-checkbox>
                                      <span class="childRightText">可新增</span>
                                      <a-checkbox v-model:checked="tableRight.add"></a-checkbox>
                                      <span class="childRightText">可删除</span>
                                      <a-checkbox v-model:checked="tableRight.delete"></a-checkbox>
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(row,idx) in masterEntityPermission.fieldPermissions" :key="idx">
                                  <td style="width: 20%;">{{row.label}}【{{row.name}}】</td>
                                  <td>
                                      <a-radio-group v-model:value="row.permission">
                                          <a-radio value="2">不可见</a-radio>
                                          <a-radio value="4">只读</a-radio>
                                          <a-radio value="8">读写</a-radio>
                                          <a-radio value="16">显示默认值且不可修改</a-radio>
                                          <a-radio value="32">显示默认值且可修改</a-radio>
                                      </a-radio-group>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="savePermission">保存</a-button>
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
//   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    ObjectTypeCode: String,
    id: String,
    stepId: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "权限设置",
    height: document.documentElement.clientHeight - 300,
    treeData: [],
    entityRightList: [],
    tableRight: {
      right: false,
      isRequired: false,
      list: false,
      isNew: false,
      isDelete: false
    },
    processId: "",
    fieldPermissions: [],
    masterEntityPermission: {},
    relatedListEntityPermissions: []
  });
  const {
    title,
    height, treeData, entityRightList, tableRight, processId, fieldPermissions,
    masterEntityPermission, relatedListEntityPermissions
  } = toRefs(data);
  const formState = reactive({
    // docRight1: '4',
    // docRight2: '4',
    // name: "",
    // checked0: false,
    // checked1: false,
    // checked2: false,
    // checked3: false,
    // checked4: false,
    // checked5: false,
    // checked6: false,
    backPrev: false,
    terminate: false,
    jump: false,
    backStart: false,
    finish: false,
    addPeople: false,
    insert: false,

  });
  const attachPermissionState = reactive({
    read: false,
    update: false,
    delete: false,
    mark: false,
    clear: false
  })
  const getTree = () => {
    proxy.$get(Interface.flow.tree,{
        entity: "processtree"
    }).then(res=>{
        let listData = res.rows;
        let formTree = (list) => {
        list.forEach(item=>{
            if(item.children){
                formTree(item.children);
            }
            item.key = item.id;
            item.value = item.id;
        })
        }
        formTree(listData);
        data.treeData = listData;
    })
  }
  getTree();
  const handleSelectTree = (selectedKeys,selectedNodes) => {
        // console.log("e",selectedKeys,selectedNodes);
        formState.ParentId = [selectedNodes.node.id];
    }
  const getDetail = () => {
    proxy.$get(Interface.flow.handleDetail,{
        id: props.id,
        objTypeCode: 100200
    }).then(res=>{
    })
  }
  const getPermission = () => {
    let obj = {
      actions: [{
        id: "562;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          processId: props.id,
          activityId: props.stepId
        }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.workflow.getPermission, d).then(res=>{
      console.log("res", res);
      let { flowPermission, masterEntityPermission, attachPermission, relatedListEntityPermissions } = res.actions[0].returnValue;
      for(let key in flowPermission){
        formState[key] = flowPermission[key];
      }
      for(let key in attachPermission){
        attachPermissionState[key] = attachPermission[key];
      }
      data.masterEntityPermission = masterEntityPermission;
      data.relatedListEntityPermissions = relatedListEntityPermissions;
      data.tableRight.isNew = masterEntityPermission.isNew;
      data.tableRight.isDelete = masterEntityPermission.isDelete;
      data.tableRight.isRequired = masterEntityPermission.isRequired;
    })
  }
  getPermission();
  const changePerm = (e) => {
    data.masterEntityPermission.fieldPermissions.forEach(item=>{
      item.permission = data.tableRight.right;
    })
  }
  // 保存权限
  const savePermission = () => {
    console.log("formState", toRaw(formState));
    let obj = {
      actions:[{
        state: "",
        id: props.id,
        params: {
          activityId: props.stepId,
          flowPermission: toRaw(formState),
          attachPermission: toRaw(attachPermissionState),
          entityPermission: {
            templateId: null,
            label: null,
            isRequired: data.tableRight.isRequired,
            isDelete: data.tableRight.isDelete,
            isNew: data.tableRight.isNew
          },
          fieldPermissions: data.masterEntityPermission.fieldPermissions
        },
        errorMessage: "",
        error: []
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.workflow.savePermission, d).then(res=>{
      Toast("保存成功！");
      emit("cancel", false);
      emit("load", false);
    })
  }
  const getFieldPerm = () => {
     proxy.$get(Interface.flow.steppri,{
        processId: data.processId,
        stepId: props.stepId
     }).then(res=>{
        data.entityRightList = res.EntityRight;
        // data.tableRight = res.Rights?.TableRights;
        for(let i = 0; i < data.entityRightList.length; i++){
            data.entityRightList[i].right = '4';
            for (var j = 0; j < data.entityRightList[i].FieldRight.length; j++) {
                if (data.entityRightList[data.entityRightList[i].Name + '~' + data.entityRightList[i].FieldRight[j].Name]) {
                    data.entityRightList[i].FieldRight[j].right = data.entityRightList[data.entityRightList[i].Name + '~' + data.entityRightList[i].FieldRight[j].Name];
                }
                data.entityRightList[i].FieldRight[j].Permission = data.entityRightList[i].FieldRight[j].Permission || '4';
            }
            // if (data.tableRight && data.tableRight != 'undefined') {
                data.tableRight[data.entityRightList[i].Name + '_add'] = data.tableRight[data.entityRightList[i].Name + '_add'] && Number(data.tableRight[data.entityRightList[i].Name + '_add']) ? true : false;
                data.tableRight[data.entityRightList[i].Name + '_delete'] = data.tableRight[data.entityRightList[i].Name + '_delete'] && Number(data.tableRight[data.entityRightList[i].Name + '_delete']) ? true : false;
                data.tableRight[data.entityRightList[i].Name + '_list'] = data.tableRight[data.entityRightList[i].Name + '_list'] && Number(data.tableRight[data.entityRightList[i].Name + '_list']) ? true : false;
                data.tableRight[data.entityRightList[i].Name + '_required'] = data.tableRight[data.entityRightList[i].Name + '_required'] && Number(data.tableRight[data.entityRightList[i].Name + '_required']) ? true : false;
            // }
            console.log("tableRight:", data.tableRight)
        }
     })
  }
  // getFieldPerm();
  const changeItemRight = (e, item) => {
    console.log(e,item);
    item.FieldRight.forEach(row=>{
        row.Permission = e;
    })
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let flowRights = [];
        let fieldRight = {};
        let TableRight = {};
        for (var i = 0; i < 7; i++) {
            if (formState['checked' + i]) {
                flowRights.push(1)
            } else {
                flowRights.push(0)
            }
        }
        if (data.entityRightList && data.entityRightList.length) {
            for (var i = 0; i < data.entityRightList.length; i++) {
                for (var j = 0; j < data.entityRightList[i].FieldRight.length; j++) {
                    fieldRight[data.entityRightList[i].Name + '~' + data.entityRightList[i].FieldRight[j].FieldName] = data.entityRightList[i].FieldRight[j].Permission
                }
                TableRight[data.entityRightList[i].Name + '_add'] = data.tableRight[data.entityRightList[i].Name + '_add'] ? 1 : 0;
                TableRight[data.entityRightList[i].Name + '_delete'] = data.tableRight[data.entityRightList[i].Name + '_delete'] ? 1 : 0;
                TableRight[data.entityRightList[i].Name + '_list'] = data.tableRight[data.entityRightList[i].Name + '_list'] ? 1 : 0;
                TableRight[data.entityRightList[i].Name + '_required'] = data.tableRight[data.entityRightList[i].Name + '_required'] ? 1 : 0;
            }
        }
        fieldRight = JSON.stringify(fieldRight)
        TableRight = JSON.stringify(TableRight)
        let obj = {
            processId: data.processId,
            stepId: props.stepId,
            docRight1: formState.docRight1,
            docRight2: formState.docRight2,
            flowRights: flowRights.join("_"),
            fieldRight: fieldRight,
            TableRight: TableRight
        };
        proxy.$get(Interface.flow.savePerm, obj).then((res) => {
            Toast("保存成功！");
            emit("cancel", false);
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
      &.sectionRowCheckbox{
        .sectionItem{
          .ant-row {
            display: flex !important;
          }
        }
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
  .treeBox{
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }
  .tablePerm{
    width: 100%;
    border-collapse: collapse;
    thead{
        background: #f2f2f2;
    }
    tr{
        border-bottom: 1px solid #dedede;
        th{
            text-align: left;
        }
        td{
            padding: 10px 0;
        }
    }
  }
  .childRightText{
    padding-left: 10px;
    padding-right: 5px;
  }
  </style>
  