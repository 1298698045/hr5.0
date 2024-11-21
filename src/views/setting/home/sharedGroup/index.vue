<template>
    <div class="home">
        <!-- <div class="todo-head">
            <div class="todo-head-left">
              <div class="icon-circle-base"></div>
              <span class="wea-new-top-title-breadcrumb">公用小组</span>
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
                        <a-button class="ml10" @click="handleAddGroup">新建小组</a-button>
                    </div>
                    <div class="groupBd">
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
                        <a-button class="ml10" @click="handleAddUser">添加成员</a-button>
                    </div>
                    <div class="groupBd">
                        <Dtable ref="gridUserRef" name="userGrid" :tableHeight="tableHeight-72" :columns="columns2" :gridUrl="gridUrl2"></Dtable>
                      </div>
                    </div>
                  </div>
                </div>
        <BtnActions v-show="isDefauleMneuActions" :menuStyle="menuStyle" ref="defaultMenuRef" :style="menuStyle" :listBtnActions="listBtnActions" @change="handleBtnActions" @click.stop />
        <AddGroup :isShow="isAddGroup" v-if="isAddGroup" @cancel="isAddGroup=false" @callback="loadGroupGrid"></AddGroup>
        <add-user-modal :isShow="isAddUser" v-if="isAddUser" @cancel="isAddUser=false" @submit="submitAddUser"></add-user-modal>
    </div>
</template>
<script setup>
  import AddUserModal from "@/components/user/AddUserModal.vue";
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  import Dtable from "@/components/Dtable.vue";
  import Interface from "@/utils/Interface.js";
  import { useRouter, useRoute } from "vue-router";
  import AddGroup from "@/components/user/AddGroup.vue";
  import BtnActions from "@/components/listView/BtnActions.vue";

  const router = useRouter();
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  const { proxy } = getCurrentInstance();
  const defaultMenuRef = ref(null);

  const gridRef = ref(null);
  const gridUserRef = ref(null);
  const contentRef = ref(null);
  const columns = ref(
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
                  <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                  </a>
                `
              return str;
            }
        },
        {
            field: "Name", 
            title: '名称', 
            sortable: true
        },
        { field: "LastLogin", title: '部门' },
        { field: "isdisabled", title: '组织' },
        { field: "DefaultRoleId", title: '人数' },
        { field: "EnhancedProfileId", title: '首拼' }
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
        { field: "EmployeeNo", title: '工号', sortable: true },
        { field: "RegardingObjectIdName", title: '姓名', sortable: true },
        { field: "UserName", title: '用户名', sortable: true },
        { field: "BusinessUnitIdName", title: '部门名称', sortable: true }
    ]
  )
  
  // const gridUrl = ref("/localData/user/entitygrid.list.json");
  const gridUrl = ref(Interface.listView.list);
  // const gridUrl2 = ref(Interface.user.groupMember);
  const gridUrl2 = ref(Interface.listView.list);

  const data = reactive({
    tableHeight: "",
    isAddUser: false,
    queryParams: {
      entityType: '00G',
      objectTypeCode: 9,
      search: "",
      filterId: ""
    },
    queryParamsUser: {
      entityType: '005',
      objectTypeCode: 8,
      search: "",
      filterId: "",
      filterQuery: ""
    },
    isAddGroup: false,
    value: "",
    menuStyle: {},
    isDefauleMneuActions: false,
    clickRecordData: {
        index: ""
    },
    listBtnActions: [
      {
        name: "删除",
        value: "delete"
      }
    ],
  });
  const { isAddUser, tableHeight, queryParams, isAddGroup, queryParamsUser, value,
    menuStyle, isDefauleMneuActions, clickRecordData, listBtnActions
  } = toRefs(data);
  onMounted(()=>{
    window.addEventListener('resize',changeHeight);
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    })
    window.addEventListener('click',()=>{
      data.isDefauleMneuActions = false;
    })
  })

    const handleClickActions = (event,index,id) =>{
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
    console.log('data.clickRecordData', data.clickRecordData);
    let id = data.clickRecordData.id;
    if(item.value=='delete'){

    }
    data.isDefauleMneuActions = false;
  }

  const onSearch = () => {
    
  }


  function changeHeight(){
    if(typeof h == 'number'){
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight;
    data.tableHeight = contentHeight;
    gridRef.value.loadGrid(data.queryParams);
    gridUserRef.value.loadGrid(data.queryParamsUser);
  }
  const onSelectGroup = (e) => {
    data.queryParamsUser.filterQuery = "\ngroupId\teq\t"+e.LIST_RECORD_ID;
    gridUserRef.value.loadGrid(data.queryParamsUser);
  }
  const handleAddGroup = () => {
    data.isAddGroup = true;
  };
  const loadGroupGrid = () => {
    gridRef.value.loadGrid(data.queryParams);
    data.isAddGroup = false;
  }
  const handleAddUser = () => {
    data.isAddUser = true;
  };
    const submitAddUser = (users) => {
      let ids = users.map(item=>item.systemUserId).join(',');
      proxy.$get(Interface.user.addGroupUser, {
        groupId: "45dc0bfa-1d41-4fba-894a-658b5ff1f658",
        userIds: ids
      }).then(res=>{
        data.isAddUser = false;
        Toast(res.msg);
        gridRef.value.loadGrid2(data.queryParams);
      })
    };
</script>
<style lang="less" scoped>
    @import url("@/style/list.less");
    .home{
      position: relative;
      z-index: 1;
    }
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