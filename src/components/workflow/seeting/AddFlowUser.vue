<template>
  <div>
    <a-modal v-model:open="props.isShow" width="60%" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
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
                  <a-form-item>
                    <div class="menuRow">
                      <a-dropdown>
                        <template #overlay>
                          <a-menu @click="handleMenu">
                            <a-menu-item :class="{'active':currentKey==item.key}" v-for="(item,index) in menus" :key="item.key">
                              {{item.name}}
                            </a-menu-item>
                          </a-menu>
                        </template>
                        <a-button>
                          {{currentMenu}}
                        </a-button>
                      </a-dropdown>
                      <a-input-search v-model:value="formState.searchVal" placeholder="请输入内容" size="large">
                        <template #enterButton>
                          <a-button style="margin-left: -1px;" @click="handleMenu({key:currentKey})">搜索</a-button>
                        </template>
                      </a-input-search>
                    </div>
                    <div class="transfer">
                      <div class="deptTree" v-if="currentKey==8">
                          <div class="deptName">部门</div>
                          <div class="treeBody">
                              <a-tree  @select="handleSelectTree" block-node :tree-data="deptTreeData">
                                  <template  #title="{name, key }">
                                      <span>{{name}}</span>
                                  </template>
                              </a-tree>
                          </div>
                      </div>
                      <a-transfer v-model:target-keys="targetKeys" v-model:selected-keys="selectedKeys"
                        :data-source="listData" :list-style="{
                                        width: '260px',
                                        height: '280px',
                                    }"
                        :showSelectAll="false"
                        :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                        show-search :titles="['可选共享', '已选共享']" :render="item => item.name" @change="handleChange"
                        @selectChange="handleSelectChange" />
                    </div>
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
  import { formTreeData } from "@/utils/common.js";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    id: String,
    rowId: String,
    apiName: String,
    objTypeCode: [String, Number]
  });
  const formRef = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "添加数据可视性",
    height: document.documentElement.clientHeight - 300,
    menus: [
      {
        key: 9,
        name: "公用小组"
      },
      {
        key: 10,
        name: "部门"
      },
      {
        key: 1036,
        name: "角色"
      },
      {
        key: 8,
        name: "用户"
      }
    ],
    currentMenu: "用户",
    currentKey: 8,
    listData: [],
    targetKeys: [],
    selectedKeys: [],
    users: [],
    depts: [],
    groups: [],
    roles: [],
    deptTreeData: [],
    deptId: ""
  });
  const {
    title,
    height, menus, currentMenu, currentKey, listData, targetKeys, selectedKeys,
    users, depts, groups, roles, deptTreeData, deptId
  } = toRefs(data);
  const formState = reactive({
    searchVal: ""
  });
  const getTree = () => {
    proxy.$get(Interface.deptTree,{
        
    }).then(res=>{
      let listData = res.actions[0].returnValue;
      data.deptTreeData = formTreeData(listData, 'id', 'parentId');
    })
  };
  getTree();
  const handleSelectTree = (selectedKeys,selectedNodes) => {
      data.deptId = selectedNodes.node.id;
      getUserQuery();
  }
  const getUserQuery = () => {
    let d = {
      filterId: "",
      entityType: "SystemUser",
      displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
      search: formState.searchVal,
      // filterQuery: "\nBusinessUnitId\teq\t" + data.deptId
    }
    proxy.$get(Interface.list2, d).then(res=>{
        let nodes = res.nodes;
        data.users = nodes.map(item=>{
            item.key = '8:' + item.id;
            item.name = item.EmployeeId.textValue+'|'+item.FullName.textValue;
            return item;
        });
        data.listData = data.users;
        data.targetKeys.forEach(item=>{
          let code = item.split(':')[0];
          let rowData;
          if(code==9){
            rowData = data.groups.find(row=>row.key == item);
          }else if(code==10){
            rowData = data.depts.find(row=>row.key == item);
          }else if(code==1036){
            rowData = data.roles.find(row=>row.key == item);
          }
          if(rowData!=undefined){
            data.listData.push(rowData);
          }
        })
    })
  };
  getUserQuery();

  const getDeptQuery = () => {
    proxy.$get(Interface.deptTree, {}).then(res => {
      let listData = res.actions[0].returnValue;
      let rows = listData.map(item=>{
          item.key = '10:' + item.id;
          return item;
      });
      data.depts = rows;
      data.listData = rows;
      data.targetKeys.forEach(item=>{
          let code = item.split(':')[0];
          let rowData;
          if(code==9){
            rowData = data.groups.find(row=>row.key == item);
          }else if(code==8){
            rowData = data.users.find(row=>row.key == item);
          }else if(code==1036){
            rowData = data.roles.find(row=>row.key == item);
          }
          if(rowData!=undefined){
            data.listData.push(rowData);
          }
        })
    })
  };

  const getGroupQuery = () => {
    let d = {
        filterId: "",
        entityType: "Group",
        filterQuery: "",
        search: formState.searchVal
    };
    proxy.$get(Interface.list2, d).then(res=>{
        let nodes = res.nodes;
        data.groups = nodes.map(item=>{
            item.key = '9:' + item.id;
            item.name = item.Name.textValue;
            return item;
        });
        data.listData = data.groups;
        data.targetKeys.forEach(item=>{
          let code = item.split(':')[0];
          let rowData;
          if(code==8){
            rowData = data.users.find(row=>row.key == item);
          }else if(code==10){
            rowData = data.depts.find(row=>row.key == item);
          }else if(code==1036){
            rowData = data.roles.find(row=>row.key == item);
          }
          if(rowData!=undefined){
            data.listData.push(rowData);
          }
        })
    })
  };

  const getRoleQuery = () => {
    let d = {
        filterId: "",
        entityType: "Role",
        filterQuery: "",
        search: formState.searchVal
    };
    proxy.$get(Interface.list2, d).then(res=>{
        let nodes = res.nodes;
        data.roles = nodes.map(item=>{
            item.key = '1036:' + item.id;
            item.name = item.Name.textValue;
            return item;
        });
        data.listData = data.roles;
        data.targetKeys.forEach(item=>{
          let code = item.split(':')[0];
          let rowData;
          if(code==9){
            rowData = data.groups.find(row=>row.key == item);
          }else if(code==10){
            rowData = data.depts.find(row=>row.key == item);
          }else if(code==8){
            rowData = data.users.find(row=>row.key == item);
          }
          if(rowData!=undefined){
            data.listData.push(rowData);
          }
        })
    })
  }

  
  
  const handleMenu = (e) => {
    let item = data.menus.find(item => item.key == e.key);
    data.currentMenu = item.name;
    data.currentKey = item.key;
    console.log("e",e);
    // getLook();
    switch(e.key){
        case 8:
            getUserQuery();
            break;
        case 9:
            getGroupQuery();
            break;
        case 10:
            getDeptQuery();
            break;
        case 1036:
            getRoleQuery();
            break;
    }
  }
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const getLook = () => {
    proxy.$get(Interface.uilook, {
      Lktp: data.currentKey
    }).then(res => {
      data.listData = res.listData.map(item => {
        item.key = item.ID;
        item.name = item.Name;
        return item;
      });
    })
  }
  // getLook();


  const handleSubmit = () => {
    let length = data.targetKeys.length;
    data.targetKeys.forEach((item,index)=>{
      let code = item.split(':')[0];
      let rowData;
      if(code==8){
        rowData = data.users.find(row=>row.key == item);
      }else if(code==9){
        rowData = data.groups.find(row=>row.key == item);
      }else if(code==10){
        rowData = data.depts.find(row=>row.key == item);
      }else if(code==1036){
        rowData = data.roles.find(row=>row.key == item);
      }
      let obj = {
        actions:[{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: props.apiName,
              objTypeCode: props.objTypeCode,
              fields:{
                ProcessId: props.id,
                ObjectTypeCode: code,
                ObjectId: rowData.id,
                Name: rowData.name
              }
            }
          }
        }]
      };
      let d = {
        message: JSON.stringify(obj)
      };
      console.log("obj", obj);
      proxy.$post(Interface.create, d).then(res=>{
        if(index==length-1){
          Toast("保存成功！");
          emit("cancel", false);
          emit("load", false);
        }     
      })
    })
  }


  const handleSubmit_old = () => {
    formRef.value
      .validate()
      .then(() => {
        // console.log("values", formState, toRaw(formState));
        let objectIds;
        console.log("data", data.selectedKeys)
        objectIds = data.selectedKeys.map(item => {
          return data.currentKey + ':' + item;
        }).join(",")
        let obj = {
          processId: data.id,
          objectIds: objectIds,
          rightCode: 32
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.flow.datapriAdd, obj).then((res) => {
          formRef.value.resetFields();
          message.warning("保存成功！");
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
  .ant-dropdown-menu-item.active{
    background: rgba(0, 0, 0, 0.04);
    .ant-dropdown-menu-title-content{
      color: #0176d3;
    }
  }
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

  .treeBox {
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }

  .menuRow {
    display: flex;
    align-items: center;

    .ant-btn {
      height: 40px;
      border-radius: 4px 0 0 4px;
    }

    .ant-input-group-wrapper {
      margin-left: -1px !important;
    }

    .ant-input {
      border-radius: 0 !important;
      margin-left: -1px !important;
    }
  }

  .transfer {
    margin-top: 20px;
    display: flex;
  }
  .deptTree{
        width: 300px;
        height: 300px;
        border: 1px solid #e2e3e5;
        margin-right: 10px;
        .deptName{
            height: 30px;
            line-height: 30px;
            background: #f4f4f4;
            padding-left: 10px;
        }
        .treeBody{
            height: calc(~"100% - 30px");
            overflow: auto;
        }
    }
</style>