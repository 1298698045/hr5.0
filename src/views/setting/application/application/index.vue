<template>
  <div style="height: 100%;" v-if="!isEdit">
    <HeadCommon name="Lightning Experience 应用程序管理器">
      <div class="fh-btn-group">
        <div class="fh-btn" @click="handleNew">新建 Lightning 应用程序</div>
        <div class="fh-btn">新建连接的应用程序</div>
      </div>
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
      <NewApplication v-if="isNew" :isShow="isNew" @cancel="isNew=false;" @callback="handleCallback" />
    </div>
  </div>
  <div style="width:100%;height: 100%;" v-else>
    <EditApplication @cancel="handleCancel" />
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
  import { useRouter, useRoute } from "vue-router";
  import NewApplication from "@/components/application/NewApplication.vue";
  import EditApplication from "@/components/application/EditApplication.vue";

  import HeadCommon from "@/components/HeadCommon.vue";
  const router = useRouter();
  import moment from "moment";
  const { proxy } = getCurrentInstance();

  let data = reactive({
    tableHeight: '',
    queryParams: {
      entityType: '02u',
      objectTypeCode: 3020,
      search: "",
      filterId: ""
    },
    isNew: false,
    isEdit: false
  });
  const { tableHeight, queryParams, isNew, isEdit } = toRefs(data);
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
  const handleEdit = (id) => {
    // data.isEdit = true;
    // const url = router.resolve({
    //     name: "AppBuilder",
    //     query: {
    //       id: id
    //     }
    // });
    // window.open(url.href);
    router.push({
        name: "AppBuilder",
        query: {
          id: id
        }
    });
  }
  window.handleEdit = handleEdit;
  window.handleTo = handleTo;
  window.data = data;

  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  // const gridUrl = ref(Interface.application.appList);
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
                <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">删除</div>
              </div>
              <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
          `
          return str;
        }
      },
      { field: "Name", title: '应用程序名称', sortable: true },
      { field: "Quantity", title: '开发人员名称' },
      { field: "Description", title: '描述' },
      { field: "Quantity", title: '上次修改日期' },
      { field: "Quantity", title: '应用程序类型' },
      { field: "Quantity", title: '在启动器中可见' }
    ]
  )
  const handleNew = () => {
    data.isNew = true;
  };
  const handleCallback = () => {
    data.isNew = false;
    nextTick(() => {
      gridRef.value.loadGrid(data.queryParams);
    })
  };
  const handleCancel = () => {
    data.isEdit = false;
    nextTick(() => {
      gridRef.value.loadGrid(data.queryParams);
    })
  }
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