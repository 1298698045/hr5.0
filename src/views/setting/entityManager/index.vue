<template>
  <div class="wrapper">
    <div class="steupHeaderInfo">
      <div class="bLeft">
        <div class="setup-header-element">
          <div class="fh-icon_container">
            <svg class="fh-icon" focusable="false" data-key="orders" aria-hidden="true" viewBox="0 0 1000 1000"
              part="icon">
              <g>
                <path
                  d="M788 621l-36-17c-5-3-12-3-17 0L520 706c-12 6-27 6-39 0L265 604c-5-3-12-3-17 0l-36 17c-16 8-16 29 0 37l268 127c12 6 27 6 39 0l268-127c17-8 17-30 1-37zm0-140l-37-17c-5-3-12-3-17 0L520 566c-12 6-27 6-39 0L266 464c-5-3-12-3-17 0l-37 17c-16 8-16 29 0 37l268 128c12 6 27 6 39 0l268-127c17-8 17-30 1-38zM212 378l268 127c12 6 27 6 39 0l268-127c16-8 16-29 0-37L519 214c-12-6-27-6-39 0L212 342c-16 7-16 29 0 36z">
                </path>
              </g>
            </svg>
          </div>
        </div>
        <div class="setup-header-element">
          <div class="onesetupBreadcrumbs">
            <a href="#/lightning/setup/SetupOneHome/home" class="breadcrumb">设置</a>
          </div>
          <h1 class="breadcrumbDetail">对象管理器</h1>
          <div class="uiOutputText">{{total <= 50 ? total : '50+'}} 个项目，按标签排序</div>
        </div>
      </div>
      <div class="bRight">
        <div class="setup-header-element-right">
          <a-input placeholder="搜索此列表..." style="width: 240px;" v-model:value="queryParams.search" @pressEnter="handleSearch">
            <template #prefix>
              <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
            </template>
          </a-input>
        </div>
        <div class="setup-header-element-right">
          <a-button>方案生成器</a-button>
        </div>
        <div class="setup-header-element-right">
          <a-dropdown>
            <a-button>创建
              <span style="vertical-align: middle;margin-left: 8px;">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
              </span>
            </a-button>
            <template #overlay>
              <a-menu style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                <a-menu-item style="min-width: 98px;line-height: 35px;">
                  <a href="javascript:;" @click="handleNew">自定义对象</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">来自电子表格的自定义对象</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div class="entityManager">
      <!-- <div class="todo-head">
        <div class="todo-head-left">
          <div class="icon-circle-base"></div>
          <span class="wea-new-top-title-breadcrumb">对象管理器</span>
        </div>
        <div class="todo-head-right">
        <a-input-search
                class="todo-head-right-search"
                v-model:value="queryParams.search"
                placeholder="快速查找"
                @search="handleSearch"
            />
          <a-button type="primary"  @click="handleNew">创建</a-button>
        </div>
      </div> -->
      <div class="todo-content">
        <a-row>
          <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
            <div class="wea-left-tree">
              <div class="wea-left-tree-search">
                <span class="wea-left-tree-search-label">对象分类</span>
                <a-input v-model:value="objSearchVal" placeholder="" @change="getTree" />
                <a-button :icon="h(PlusOutlined)" class="ml10" style="min-width: 32px;" @click="handleAddCategory"></a-button>
              </div>
              <div class="wea-left-tree-scroll" ref="treeContentRef">
                <a-tree :style="{height: (tableHeight-40)+'px'}" :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent" :tree-data="gData" block-node :fieldNames="fieldNames"
                  @select="handleSelect" draggable
                  @drop="onDrop">
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                    </CaretDownOutlined>
                  </template>
                  <template v-slot:title="item">
                    <!-- <a-dropdown :trigger="['contextmenu']">
                      <input v-if="item.id == editingKey" type="text" v-model="item.name" @change="saveRowMenu(item)">
                      <div class="treeText" v-else>
                        <span>{{ item.name }}</span>
                        <span class="iconMenu">
                          <svg focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                        </span>
                      </div>
                      <template #overlay>
                        <a-menu class="fh-menu" @click="({key: menuKey}) => handleMenuClick(item, menuKey)">
                          <a-menu-item key="add">添加</a-menu-item>
                          <a-menu-item key="edit">编辑</a-menu-item>
                          <a-menu-item key="delete">删除</a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown> -->
                    <div class="treeText">
                      <span>{{ item.name }}</span>
                      <a-dropdown :trigger="['click']">
                        <span class="iconMenu" @click.stop>
                          <svg focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>
                        </span>
                        <template #overlay>
                          <a-menu class="fh-menu" @click="({key: menuKey}) => handleMenuClick(item, menuKey)">
                            <!-- <a-menu-item key="add">添加</a-menu-item> -->
                            <a-menu-item key="edit">编辑</a-menu-item>
                            <a-menu-item key="delete">删除</a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </template>
                </a-tree>
              </div>
            </div>
          </a-col>
          <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
            <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
              :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
            <div style="height: 100%" ref="contentRef">
              <div class="wea-tabContent" :style="{height:(tableHeight-0)+'px'}" ref="tabContent">
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="(tableHeight+45)"
                  :isCollapsed="isCollapsed" @resData="successData"></Dtable>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <common-form-modal
      :isShow="isCommon"
      :id="treeId"
      :entityId="''"
      entityApiName="EntityCategory"
      :objectTypeCode="objTypeCode"
      v-if="isCommon"
      @cancel="isCommon=false"
      :title="title"
      @success="loadCategory"
    ></common-form-modal>
      <Delete v-if="isDelete" :isShow="isDelete" :sObjectName="sObjectName" :objTypeCode="objTypeCode" :recordId="treeId" @cancel="isDelete=false" @ok="handleDeleteCategory" desc="是否确定？" />
    </div>
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    PlusOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, toRaw } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  import Delete from "@/components/listView/Delete.vue";

  const { proxy } = getCurrentInstance();

  const treeContentRef = ref(null);

  const expandedKeys = ref([]);

  const searchValue = ref("");

  const objSearchVal = ref("");
  const autoExpandParent = ref(true);
  const editingKey = ref(null);
  const gData = ref([]);
  const getTree = (search = "") => {
    proxy.$get(Interface.objAdmin.objTree, {
      search: search
    }).then((response) => {
      const rlist = [];
      (response.rows).map((item) => {
        item.key = item.id,
        item.name = item.name;
        item.quantity = 0;
        item.parent = null;
        item.children = [];
        item.isEdit = false;
        rlist.push(item);
      });
      rlist.unshift({
        name: '全部',
        id: 'all',
        key: 'all',
        children: []
      })
      gData.value = rlist;
    })
  }
  getTree();
  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    fieldNames: {
      children: 'children', title: 'name', key: 'id'
    },
    tabs: [
      {
        lable: "全部",
        count: 18
      },
      {
        lable: "被退回",
        count: ''
      },
      {
        lable: "已读",
        count: 16
      },
      {
        lable: "未读",
        count: 2
      },
      {
        lable: "超时",
        count: ''
      },
      {
        lable: "待阅",
        count: ''
      }
    ],
    activeKey: 0,
    queryParams: {
      folderId: "",
      search: ""
    },
    isModal: false,
    isDelete: false,
    treeId: "",
    total: 0,
    sObjectName: "EntityCategory",
    objTypeCode: "100029",
    isCommon: false,
    title: "新建对象分类"
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, queryParams, isModal,
     isDelete, treeId, total, sObjectName, objTypeCode, isCommon, title } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    window.addEventListener('resize', changeHeight);
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })
  })
  const loadCategory = () => {
    data.isCommon = false;
    getTree();
  }
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data', data.tableHeight);
    console.log("gridRef", gridRef.value.loadGrid(data.queryParams));
  }
  const handleSearch = (e) => {
    gridRef.value.loadGrid(data.queryParams);
  };
  const handleSelect = (e) => {
    console.log("e", e);
    let id;
    if(e[0]!=''){
      if(e[0]=='all'){
        id = '';
      }else {
        id = e[0];
      }
      data.queryParams.folderId = id;
      gridRef.value.loadGrid(data.queryParams);
    }
  };
  
  const onDragEnter = () => {

  }
  const onDrop = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      data.forEach((item, index) => {
        if (item.key == key) {
          return callback(item, index, data);
        }
        if (item.children.length>0) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...gData.value];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        /// where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.children || []).length > 0 &&
      // Has children
      info.node.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i = 0;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    gData.value = data;
    saveCategorySort(info.dragNode.id, info.dropPosition-1);
  };

  const saveCategorySort = (id, number) => {
    let obj = {
      actions:[{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput:{
            allowSaveOnDuplicate: false,
            apiName: "EntityCategory",
            objTypeCode: 100029,
            recordId: id,
            fields: {
              SortNumber: number
            }
          }
        }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    
    proxy.$post(Interface.obj.editCategory, d).then(res => {
      getTree();
    })
  }

  function handleTo(WFRuleLogId) {
    console.log("WFRuleLogId", WFRuleLogId);
    router.push({
      path: "/detail",
      query: {
        id: WFRuleLogId
      }
    });
  }
  window.handleTo = handleTo;
  window.data = data;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref(Interface.objAdmin.list);
  const columns = ref(
    [
      {
        field: 'DisplayName', title: '标签', sortable: true,
        formatter: function formatter(value, row) {
          var rowId = row.EntityId;
          var objectTypeCode = row.ObjectTypeCode;
          var name = row["DisplayName"];
          var sObjectName = row['Name'];
          var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/#/setting/entityDetail?id=" + rowId + "&amp;objectTypeCode=" + objectTypeCode + "&amp;sObjectName=" + sObjectName + "\">" + (name || '') + "</a>";
          return action;
        }
      },
      { field: 'Name', title: 'API名称', sortable: true },
      { field: 'ObjectTypeCode', title: '对象代码', sortable: true },
      { field: 'EntityCode', title: '记录前缀', sortable: true },
      { field: 'Description', title: '描述', sortable: true },
      { field: 'ModifiedOn', title: '上次修改时间', sortable: true },
      {
        field: 'IsPublished', title: '已部署', sortable: true, formatter: function (value) {
          if (value == 'True' || value == 'true' || value == true) {
            return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
          }
          else {
            return '';
          }
        }
      },
      {
        field: 'IsCustomEntity', title: '自定义', sortable: true, formatter: function (value) {
          if (value == 'True' || value == 'true' || value == true) {
            return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
          }
          else {
            return '';
          }
        }
      },
    ]
  )

  const changeTab = (e) => {
    data.activeKey = e;
    data.queryParams.activeKey = e;
    gridRef.value.loadGrid(data.queryParams);
  };
  const handleNew = () => {
    router.push({
      name: "NewDefineObj",
      query: {

      }
    })
  };
  const handleAddCategory = () => {
    data.treeId = '';
    data.title = '新建对象分类';
    data.isCommon = true;
  }
  const handleMenuClick = (item, menuKey) => {
    console.log("item", item, menuKey);
    switch (menuKey) {
      case 'add':
        gData.value.push({
          id: '',
          name: '新建文件夹',
        });
        editingKey.value = '';
        nextTick(()=>{
          treeContentRef.value.scrollTo({
            top: treeContentRef.value.scrollHeight - treeContentRef.value.clientHeight,
            behavior: "smooth"
          });
        })
        break;
      case 'edit':
        editingKey.value = item.id;
        data.treeId = item.id;
        data.title = '编辑对象分类';
        data.isCommon = true;
        break;
      case 'delete':
        data.treeId = item.id;
        data.isDelete = true;
        break;
    }
  };
  // 编辑/保存分类
  const saveRowMenu = (item, number = '') => {
    // let params = {
    //   objTypeCode: 100029,
    //   apiName: "EntityCategory",
    //   // id: item.id,
    //   fields: {
    //     Name: item.name,
    //     ObjectTypeCode: 100029,
    //     SortNumber: ""
    //   }
    // }
    let obj = {
      actions:[{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordInput:{
            allowSaveOnDuplicate: false,
            apiName: "EntityCategory",
            objTypeCode: 100029,
            fields: {
              Name: item.name,
              SortNumber: ""
            }
          }
        }
      }]
    }
    let url = Interface.obj.addCategory;
    if(item.id){
      obj.actions[0].recordInput.recordId = item.id;
      url = Interface.obj.editCategory;
    }
    let d = {
      message: JSON.stringify(obj)
    }
    
    proxy.$post(url, d).then(res => {
      Toast("保存成功！");
      editingKey.value = null;
      getTree();
    })
  }
  const handleDeleteCategory = () => {
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.treeId,
          apiName: "EntityCategory",
          objTypeCode: 100029
        }
      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(Interface.delete, obj).then(res=>{
      Toast("删除成功！");
      data.isDelete = false;
      getTree();
    })
  }

  const successData = (res) => {
    data.total = res.total;
  }
</script>
<style lang="less" scoped>
  .wrapper {
    height: calc(~"100vh - 90px");
    padding: 12px;
    background: rgba(176, 196, 223, 1.0);
    position: relative;
    z-index: 1;

    &::before {
      position: fixed;
      top: 5.625rem;
      height: 12.5rem;
      content: '';
      display: block;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: url("~@/assets/img/lightning_blue_background.png");
      background-position: top left;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .steupHeaderInfo {
    padding: 8px 16px;
    margin: 2px 0 12px 0;
    background: #f3f3f3;
    border-bottom: 1px solid #c9c9c9;
    border-radius: 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid #c9c9c9;
    position: relative;
    z-index: 1;
    overflow: hidden;
    .bLeft {
      float: left;
      .setup-header-element {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;

        .fh-icon_container {
          display: inline-block;
          border-radius: 4px;
          padding: 7px;
          color: #fff;
          background: #2A739E;
          line-height: 1;

          .fh-icon {
            width: 32px;
            height: 32px;
            fill: #fff;
            vertical-align: middle;
          }
        }

        .onesetupBreadcrumbs {
          .breadcrumb {
            font-size: 13px;
            color: #2574A9;
            line-height: 1;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .breadcrumbDetail {
          color: #181818;
          font-weight: 700;
          font-size: 20px;
          line-height: 1.5;
        }

        .uiOutputText {
          padding-top: 8px;
          font-weight: 300;
          font-size: 12px;
        }
      }
    }
    .bRight{
      float: right;
      .setup-header-element-right{
        display: inline-block;
        padding-left: 4px;
      }
    }
  }

  .todo-head-right :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
    margin-right: 12px;
  }

  .entityManager {
    width: 100%;
    height: calc(~"100% - 104px");

    .todo-head {
      width: 100%;
      height: 52px;
      line-height: 52px;
      background: #f9f9f9;
      border-bottom: 1px solid #eaeaea;
      display: flex;
      align-items: center;

      .todo-head-left {
        padding-left: 20px;
        display: flex;
        align-items: center;
        flex: 1;

        .icon-circle-base {
          width: 35px;
          height: 35px;
          background: rgb(0, 121, 222);
          background: url(../../../../src/assets/entity.png);
          background-position-x: -5px;
          background-position-y: -5px;
          border-radius: 0%;
          margin-right: 10px;
          color: #fff;
        }

        .wea-new-top-title-breadcrumb {
          color: #484a4d;
          margin-left: 3px;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .todo-head-right {
        padding-right: 14px;
        display: flex;
        align-items: center;

        .btn-drop {
          display: inline-block;
          padding-left: 20px;
          line-height: 40px;
          vertical-align: middle;
          cursor: pointer;
        }

        .ant-btn-group {
          margin-left: 10px;
        }
      }
    }

    .todo-content {
      width: 100%;
      height: 100%;

      .ant-row {
        height: 100%;

        .wea-left-right-layout-left {
          border-right: 1px solid #eaeaea;

          .wea-left-tree {
            width: 100%;
            height: 100%;
            background: #fff;

            .wea-left-tree-search {
              width: 100%;
              height: 46px;
              line-height: 46px;
              display: flex;
              align-items: center;
              padding-right: 14px;
              box-sizing: border-box;

              .wea-left-tree-search-label {
                display: inline-block;
                padding-left: 14px;
                min-width: 76px;
                cursor: pointer;
                font-weight: 600;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
              }
            }

            .wea-left-tree-scroll {
              margin-top: 10px;
              width: 100%;
              height: calc(~"100% - 56px");
              overflow: auto;

              .ant-tree-title {
                display: inline-block;
                width: 100%;
              }

              .ant-tree-title>span {
                width: 100%;
                display: flex;
                justify-content: space-between;

                .tree-num {
                  padding-right: 10px;
                }
              }
            }
          }
        }

        .wea-left-right-layout-right {
          height: 100%;
          overflow: hidden;
          background-color: #fff;
          position: relative;

          .wea-left-right-layout-btn {
            width: 18px;
            height: 60px;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -30px;
            z-index: 11;
            cursor: pointer;
            background-size: 100% 100%;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show-hover.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
            background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide-hover.png) no-repeat -2px 0;
          }
        }

        .wea-tab {
          height: 46px;
        }
      }
    }
  }

  .entityManager .todo-content .ant-row .wea-left-right-layout-left {
    height: 100%;
    max-width: 280px;
  }

  .entityManager .todo-content .ant-row .wea-left-right-layout-right {
    flex: 1;
    max-width: 100%;
  }
  .treeText{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconMenu{
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #c9c9c9;
      color: #747474;
      border-radius: 4px;
      display: none;
    }
  }
  .treeText:hover{
    .iconMenu{
      display: inline-flex;
    }
  }
</style>