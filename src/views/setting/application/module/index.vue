<template>
  <HeadCommon name="模块管理器">
    <div class="fh-btn" @click="handleNewWizerd">新建应用程序模块向导</div>
    <div class="fh-btn ml10" @click="handleNew">新建应用程序模块</div>
  </HeadCommon>
  <div class="home">
    <div class="todo-content">
      <a-row>
        <a-col span="24" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
            <div class="wea-tabContent" :style="{height:(tableHeight)+'px'}" ref="tabContent">
              <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="(tableHeight)"
                :isCollapsed="isCollapsed"></Dtable>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <NewAppModule v-if="isNewAppModule" :isShow="isNewAppModule" :id="id" @cancel="isNewAppModule=false"
      @callback="loadGrid" />
    <Delete
      :isShow="isDelete"
      v-if="isDelete"
      desc="是否确定要删除？"
      @cancel="isDelete=false"
      @ok="loadGrid"
      sObjectName="SystemTab"
      :recordId="id"
    />
    <NewAppModuleWizard v-if="isNewWizard" :isShow="isNewWizard" :id="id" @cancel="isNewWizard=false;" @callback="loadGrid" />
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, provide } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import NewAppModule from "@/components/application/NewAppModule.vue";
  import NewAppModuleWizard from "@/components/application/NewAppModuleWizard.vue";
  import HeadCommon from "@/components/HeadCommon.vue";
  import Delete from "@/components/listView/Delete.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  import moment from "moment";
  const { proxy } = getCurrentInstance();

  let data = reactive({
    tableHeight: '',
    queryParams: {
      entityType: '01r',
      objectTypeCode: 3022,
      search: "",
      filterId: ""
    },
    isNewAppModule: false,
    id: "",
    isDelete: false,
    isNewWizard: false
  });
  const { tableHeight, queryParams, isNewAppModule, id, isDelete, isNewWizard } = toRefs(data);
  const profileId = reactive({
    id: ""
  });
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    window.addEventListener('resize', changeHeight);
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })

  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    if (contentRef.value) {
      let contentHeight = contentRef.value.clientHeight;
      let tabsHeight = 46;
      let height = contentHeight - tabsHeight - formSearchHeight.value;
      data.tableHeight = contentHeight;
      // console.log('data', data.tableHeight);
      // console.log("gridRef", gridRef.value.loadGrid())
      gridRef.value.loadGrid(data.queryParams);
    }
  }

  function handleTo() {
  }
  window.handleTo = handleTo;
  window.data = data;

  const handleEdit = (id) => {
    data.id = id;
    data.isNewWizard = true;
  };
  const handleDelete = (id) => {
    data.id = id;
    data.isDelete = true;
  };
  window.handleEdit = handleEdit;
  window.handleDelete = handleDelete;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  // const gridUrl = ref(Interface.application.moduleList);
  const gridUrl = ref(Interface.listView.list);

  const columns = ref(
    [
      // {
      //   field: 'ids',
      //   checkbox: true
      // },
      {
        field: "Action",
        title: "操作",
        formatter: function formatter(value, row) {
          var str = `
            <div class="iconBox">
              <div class="popup">
                <div class="option-item" onclick="handleEdit('${row.LIST_RECORD_ID}')">修改</div>
                <div class="option-item" onclick="handleDelete('${row.LIST_RECORD_ID}')">删除</div>
              </div>
              <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
          `
          return str;
        }
      },
      { field: "Name", title: '名称' },
      { field: "MasterLabel", title: '模块名称', sortable: true },
      { field: "TabType", title: '模块类型' },
      { field: "TabCode", title: '模块代码' },
      { field: "TabCss", title: '模块样式' },
      { field: "SortOrder", title: '序号' },
      { field: "LinkUrl", title: '链接' },
      { field: "IsCustomizable", title: '自定义' },
      { field: "IsDisabled", title: '禁用' },
      { field: "ModifiedOn", title: '上次修改日期' },
      { field: "ModifiedBy", title: '上次修改人' }
    ]
  )
  const handleNew = () => {
    data.isNewAppModule = true;
  };
  const handleNewWizerd = () => {
    data.isNewWizard = true;
  }
  const loadGrid = () => {
    data.isNewAppModule = false;
    data.isDelete = false;
    data.isNewWizard = false;
    nextTick(() => {
      gridRef.value.loadGrid();
    })
  };
</script>
<style lang="less" scoped>
  .todo-head-right :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
    margin-right: 12px;
  }
  .home {
    width: 100%;
    height: calc(~"100% - 80px");
    background: #fff;

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
          background: url("~@/assets/entity.png");
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
      height: calc(~"100% - 0px");

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
              height: calc(~"100% - 77px");
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
            background: url(~@/assets/img/leftTree-show.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
            background: url(~@/assets/img/leftTree-show-hover.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
            background: url(~@/assets/img/leftTree-hide.png) no-repeat -2px 0;
          }

          .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
            background: url(~@/assets/img/leftTree-hide-hover.png) no-repeat -2px 0;
          }
        }

        .wea-tab {
          height: 46px;
        }
      }
    }
  }

  .home .todo-content .ant-row .wea-left-right-layout-left {
    height: 100%;
    max-width: 280px;
  }

  .home .todo-content .ant-row .wea-left-right-layout-right {
    flex: 1;
    max-width: 100%;
  }
</style>