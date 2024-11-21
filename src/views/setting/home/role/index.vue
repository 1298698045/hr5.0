<template>
  <div class="home">
      <!-- <div class="todo-head">
          <div class="todo-head-left">
            <div class="icon-circle-base"></div>
            <span class="wea-new-top-title-breadcrumb">角色</span>
          </div>
          <div class="todo-head-right">
              <a-input-search
                  class="todo-head-right-search"
                  v-model:value="value"
                  placeholder="快速查找"
                  @search="onSearch"
              />
          </div>
      </div> -->
      <div class="todo-content" ref="contentRef">
          <div class="groupWrap">
              <div class="groupItem">
                  <div class="groupHead" style="justify-content: flex-start;">
                      名称: &nbsp;<a-input-search
                              style="width: 200px;"
                              v-model:value="value"
                              placeholder="请输入搜索字符"
                              @search="onSearch"
                          />
                      <a-button class="ml10" @click="handleAddRole">新建角色</a-button>
                  </div>
                  <div class="groupBd" :style="{height:(tableHeight-72)+'px'}">
                      <!-- <div id="roleGrid"></div> -->
                      <Dtable ref="gridRef" name="groupGrid" :tableHeight="tableHeight-72" :columns="columns" :gridUrl="gridUrl" @onSelect="onSelectGroup"></Dtable>
                  </div>
              </div>
              <div class="groupItem">
                  <div class="groupHead">
                      名称: &nbsp;<a-input-search
                              style="width: 200px;"
                              v-model:value="value"
                              placeholder="请输入搜索字符"
                              @search="onSearch"
                          />
                      <a-button class="ml10">排序</a-button>
                      <a-button class="ml10" @click="handleAddUser">添加成员</a-button>
                  </div>
                  <div class="groupBd">
                      <Dtable ref="gridUserRef" name="userGrid" :tableHeight="tableHeight-72" :columns="columns2" :gridUrl="gridUrl2"></Dtable>
                  </div>
              </div>
          </div>
      </div>
      <BtnActions v-show="isDefauleMneuActions" :menuStyle="menuStyle" ref="defaultMenuRef" :style="menuStyle" :listBtnActions="listBtnActions" @change="handleBtnActions" @click.stop />
      <AddRole :ParentRoleId="ParentRoleId" :id="roleId" :isShow="isAddRole" v-if="isAddRole" @cancel="isAddRole=false" @callback="callbackRoleGrid" />
      <add-user-modal :isShow="isAddUser" v-if="isAddUser" @cancel="isAddUser=false" @submit="submitAddUser"></add-user-modal>
  </div>
</template>
<script setup>
import AddUserModal from "@/components/user/AddUserModal.vue";
import AddRole from "@/components/user/AddRole.vue";
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
import Dtable from "@/components/Dtable.vue";
import BtnActions from "@/components/listView/BtnActions.vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
const { proxy } = getCurrentInstance();
const gridRef = ref(null);
const gridUserRef = ref(null);
const contentRef = ref(null);
const defaultMenuRef = ref(null);

const columns = ref(
  [
      {
          field: "Action",
          title: "操作",
          formatter: function formatter(value, row, index) {
            // var str = `
            //   <div class="iconBox">
            //     <div class="popup">
            //       <div class="option-item" onclick="EditRole('${row.id}')">修改</div>
            //       <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">删除</div>
            //     </div>
            //     <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
            // `
            var id = row.LIST_RECORD_ID;
              var str = `
                  <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                  </a>
                `
            return str;
          }
      },
      { field: "Name", title: '名称', sortable: true },
      { field: "Quantity", title: '数量' },
  ]
);
const columns2 = ref(
  [
  {
          field: "Action",
          title: "操作",
          formatter: function formatter(value, row, index) {
            // var str = `
            //   <div class="iconBox">
            //     <div class="popup">
            //       <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">删除</div>
            //     </div>
            //     <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
            // `
            var id = row.LIST_RECORD_ID;
            var str = `
                <a href="javascript:;" class="btnMenu" id="btnMenu2_${index}" onclick="handleClickActions2(event,'${index}','${id}')">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                </a>
              `
            return str;
          }
      },
      { field: "Name", title: '名称', sortable: true },
      { field: "Quantity", title: '数量', sortable: true },
  ]
)
//   const gridUrl = ref("/localData/user/entitygrid.list.json");
// const gridUrl = ref(Interface.user.roleTree);
const gridUrl = ref(Interface.listView.list);
// const gridUrl2 = ref(Interface.user.roleMember);
const gridUrl2 = ref(Interface.listView.list);

const data = reactive({
  value: "",
  tableHeight: "",
  isAddUser: false,
  queryParams: {
      entityType: "00E",
      objectTypeCode: 1036,
      search: "",
      filterId: ""
  },
  isAddRole: false,
  roleId: "",
  ParentRoleId: "",
  queryParamsUser: {
      entityType: '005',
      objectTypeCode: 8,
      search: "",
      filterId: "",
      filterQuery: ""
    },
    menuStyle: {},
    isDefauleMneuActions: false,
    clickRecordData: {
        index: ""
    },
    listBtnActions: [
    ],
    type: 0
});
const { value, isAddUser, tableHeight, queryParams, isAddRole, roleId, ParentRoleId, queryParamsUser,
  menuStyle, isDefauleMneuActions, clickRecordData, listBtnActions, type
 } = toRefs(data);

 watch(()=>data.type, (newVal,oldVal) => {
  if(newVal==0){
    data.listBtnActions = [
      {
        name: "编辑",
        value: "edit0"
      },
      {
        name: "删除",
        value: "delete0"
      }
    ]
  }else {
    data.listBtnActions = [
      {
        name: "删除",
        value: "delete1"
      }
    ]
  }
 }, {deep: true, immediate: true})
onMounted(()=>{
  window.addEventListener('resize',changeHeight);
  setTimeout(function(){
    window.dispatchEvent(new Event('resize'))
  })
  window.addEventListener('click',()=>{
    data.isDefauleMneuActions = false;
  })
})
function changeHeight(){
  if(typeof h == 'number'){
    formSearchHeight.value = h;
  }
  let contentHeight = contentRef.value.clientHeight;
  let tabsHeight = 46;
  let height = contentHeight - tabsHeight;
  data.tableHeight = contentHeight;
  gridRef.value.loadGrid(data.queryParams);
  // loadRoleGrid();
  loadGrid2(data.queryParamsUser);
}
const callbackRoleGrid = () => {
  gridRef.value.loadGrid(data.queryParams);
  data.isAddRole = false;
}
const onSelectGroup = (e) => {
  data.queryParams.filterQuery = "\nroleId\teq\t"+e.LIST_RECORD_ID;
  loadGrid2(data.queryParams);
}
const loadRoleGrid = () => {
  let columnsRole = columns.value;
  $('#roleGrid').treegrid({
      url: gridUrl.value,
      method: 'GET',
      queryParams: {
          entityType: '00E',
          search: ""
      },
      columns: [columnsRole],
      idField: "id",
      treeField: "Name",
      fit: true,
      autoWidth: true,
      rownumbers: true,
      singleSelect:true,
      filterQuery: "",
      onLoadSuccess: function (row,list) {
          console.log("123", list);
          $('#roleGrid').datagrid('resize');
          $('#roleGrid').treegrid('select', list.rows[0].id);
          data.ParentRoleId = {
              Id: list.rows[0].id,
              Name: list.rows[0].Name,
          };
          loadGrid2(list.rows[0].id);
      },
      onSelect: function (row) {
          data.ParentRoleId = {
              Id: row.id,
              Name: row.Name
          };
          loadGrid2(row.id);
      }
  })
};

const handleClickActions = (event,index,id) =>{
      data.type = 0;
      let windowHeight = window.document.documentElement.clientHeight;
      event.stopPropagation();
      let dom = document.querySelector("#btnMenu_"+index);
      let rect = dom.getBoundingClientRect();
      let top = rect.top - 90 + 12;
      let left = rect.left - 12 + 16 - 280;
      let menuActionsHeight = defaultMenuRef.value.height;
      if((windowHeight - rect.top) < menuActionsHeight){
        top = top - menuActionsHeight - 12;
      }
      data.menuStyle = {
        top: top + "px",
        left: left + "px"
      };
      if(data.clickRecordData.index == index) {
        data.isDefauleMneuActions = !data.isDefauleMneuActions;
      } else {
        data.isDefauleMneuActions = true;
      }
      data.clickRecordData.index = index;
      data.clickRecordData.id = id;
    };
    window.handleClickActions = handleClickActions;

    const handleClickActions2 = (event,index,id) =>{
      data.type = 1;
      let windowHeight = window.document.documentElement.clientHeight;
      event.stopPropagation();
      let dom = document.querySelector("#btnMenu2_"+index);
      let rect = dom.getBoundingClientRect();
      let top = rect.top - 90 + 12;
      let left = rect.left - 12 + 16 - 280;
      let menuActionsHeight = defaultMenuRef.value.height;
      if((windowHeight - rect.top) < menuActionsHeight){
        top = top - menuActionsHeight - 12;
      }
      data.menuStyle = {
        top: top + "px",
        left: left + "px"
      };
      if(data.clickRecordData.index == index) {
        data.isDefauleMneuActions = !data.isDefauleMneuActions;
      } else {
        data.isDefauleMneuActions = true;
      }
      data.clickRecordData.index = index;
      data.clickRecordData.id = id;
    };
    window.handleClickActions2 = handleClickActions2;

    const handleBtnActions = (item) => {
      let id = data.clickRecordData.id;
      if(item.value=='edit0'){
        EditRole(id);
      }
      data.isDefauleMneuActions = false;
    }
    const onSearch = () => {
      
    }
const loadGrid2 = (queryParams) => {
  // gridUserRef.value.loadGrid({
  //     roleid: roleId
  // });
  gridUserRef.value.loadGrid(queryParams);
}
const EditRole = (id) => {
  console.log("id",id);
  data.roleId = id;
  data.ParentRoleId = {};
  data.isAddRole =  true;
};
window.EditRole = EditRole;
const handleAddRole = () => {
  data.isAddRole = true;
}
const handleAddUser = () => {
  data.isAddUser = true;
};
  const submitAddUser = (users) => {
    let ids = users.map(item=>item.systemUserId).join(',');
    proxy.$get(Interface.user.addGroupUser, {
      groupId: "8cc0246f-5221-4ae0-a077-c95dda05fedb",
      systemUserId: ids
    }).then(res=>{
      data.isAddUser = false;
      Toast(res.msg);
      gridRef.value.loadGrid2(data.queryParams);
    })
  };
</script>
<style lang="less" scoped>
  @import url("@/style/list.less");
  .groupWrap{
      height: 100%;
      display: flex;
      .groupItem{
          height: 100%;
          flex: 1;
          margin: 10px;
          .groupHead{
              display: flex;
              justify-content: flex-end;
              padding: 10px 0;
              align-items: center;
          }
          .groupBd{
              height: calc(~"100% - 52px");
          }
      }
  }
</style>
<style>
  .datagrid-row-selected{
      background: #f2f2f2 !important;
  }
</style>