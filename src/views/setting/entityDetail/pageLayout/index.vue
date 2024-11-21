<template>
  <div class="home">
    <div style="height: 100%;" v-if="!isNew&&!isPageSetup&&!isEdit">
      <div class="detailHeader">
        <div class="leftHead">
          <h2 class="title">页面布局</h2>
        </div>
        <div class="rightHead">
          <a-input-search
            v-model:value="searchVal"
            placeholder="快速查找"
            @search="onSearch"
          />
          <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button> -->
          <button class="fh-btn ml10" @click="handleNew">新建</button>
        </div>
      </div>
      <div class="related-list-card">
        <TableList :columns="columns" :gridUrl="gridUrl" :queryParams="queryParams" @changeBtn="changeBtn" ref="gridRef" />
      </div>
    </div>
    <div style="height: 100%;" v-else-if="isPageSetup">
      <PageLayoutSetting @cancel="isPageSetup=false" />
    </div>
    <div style="height: 100%;" v-else-if="isEdit">
      <!-- <EditPageLayout @cancel="isEdit=false;" /> -->
      <iframe :src="iframeSrc" style="width: 100%;height: 100%;" frameborder="0"></iframe>
    </div>
    <div style="height: 100%;" v-else>
      <NewPageLayout @cancel="handleCancel" :entityId="queryParams.entityId" @load="loadGrid" />
    </div>
    <Delete v-if="isDelete" :isShow="isDelete" :recordId="rowId" objTypeCode="100040" sObjectName="Layout" @cancel="isDelete=false" @ok="handleDelete" desc="是否确定？" />
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineProps } from "vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import NewPageLayout from "@/components/entityDetail/NewPageLayout.vue";
  import PageLayoutSetting from "@/components/entityDetail/PageLayoutSetting.vue";
  import EditPageLayout from "@/components/entityDetail/EditPageLayout.vue";
  import TableList from "@/components/entityDetail/TableList.vue";
  import Delete from "@/components/listView/Delete.vue";
  
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  import moment from "moment";
  const { proxy } = getCurrentInstance();

  const props = defineProps({
    detail: Object
  });

  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    queryParams: {
      entityId: route.query.id,
      search: ""
    },
    isNew: false,
    isPageSetup: false,
    isEdit: false,
    searchVal: "",
    iframeSrc: "/iframe/pageLayout/pageLayout.html",
    rowId: "",
    isDelete: false,
    objectTypeCode: route.query.objectTypeCode
  });
  const { isCollapsed, tableHeight, queryParams, isNew, isPageSetup, 
    isEdit, searchVal, iframeSrc, rowId, isDelete, objectTypeCode } = toRefs(data);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    // window.addEventListener('resize', changeHeight);
    // setTimeout(function () {
    //   window.dispatchEvent(new Event('resize'))
    // })
    window.addEventListener('message', receiveMessage, false);

  })
  const receiveMessage = (e) =>{
    console.log(e);
  }
  function changeHeight(h) {
    if(contentRef.value != null){
      if (typeof h == 'number') {
        formSearchHeight.value = h;
      }
      console.log("contentRef",contentRef);
      let contentHeight = contentRef.value.clientHeight;
      // let tabsHeight = 0;
      // let height = contentHeight - tabsHeight - formSearchHeight.value;
      data.tableHeight = contentHeight;
      console.log('data', data.tableHeight);
      console.log("gridRef", gridRef.value.loadGrid(data.queryParams))
    }
  }

  const onSearch = (e) => {
    data.queryParams.search = e;
    gridRef.value.loadGrid();
  };

  // 快速设置
  const handleSetup = (id) => {
    data.isPageSetup = true;
  };
  const handleMobileLayout = (id) => {
    let url = router.resolve({
      path: "/mobileDesign",
      query: {
        id: id
      }
    });
    window.open(url.href);
  };
  const handleEdit = (id) => {
    data.iframeSrc = data.iframeSrc + '?id=' + id + '&type='+ data.queryParams.entityId;
    data.isEdit = true;
  };
  window.handleEdit = handleEdit;
  window.handleMobileLayout = handleMobileLayout;
  window.handleSetup = handleSetup;
  window.data = data;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref(Interface.objeview.pageLayout.list);
  const columns = ref(
    [
      {
        field: 'entityLabel', title: '字段标签', sortable: true,
        formatter: function formatter(value, row) {
          var rowId = row.id;
          var objectTypeCode = row.ObjectTypeCode;
          var name = row["entityLabel"];
          var action = "<a style=\"color:#015ba7;font-size:13px;\" onclick=\"handleEdit('" + rowId + "')\">" + (name || '') + "</a>";
          return action;
        }
      },
      { field: 'name', title: '字段名', sortable: true },
      { field: 'lastModifiedByName', title: '上次修改人', sortable: true },
      { field: 'lastModifiedDate', title: '上次修改时间', sortable: true, },
      {
        field: "Action",
        title: "操作",
        formmatterActions: function(item){
            let actions = [{ name: "编辑", field: "edit" },{ name: "快速设置", field: "pageSetup"},
            { name: "打印布局", field: "delete"},{ name: "移动端布局", field: "mobileLayout"},{ name: "删除", field: "delete"}];
            return actions;
        }
      }
    ]
  );
  const handleNew = () => {
    data.isNew = true;
  };
  const handleCancel = () => {
    data.isNew = false;
    // nextTick(()=>{
    //   gridRef.value.loadGrid(data.queryParams);
    // })
  };
  const changeBtn = (action, item) => {
    console.log('action',action);
    if (action.field == 'edit'){
      data.iframeSrc = data.iframeSrc + '?id=' + item.id + '&type='+ data.queryParams.entityId;
      data.isEdit = true;
    } else if(action.field == 'pageSetup') {
      data.isPageSetup = true;
    } else if(action.field == 'mobileLayout') {
      let url = router.resolve({
        path: "/mobileDesign",
        query: {
          entityId: data.queryParams.entityId,
          id: item.id,
          entityLabel: props.detail.entityLabel,
          layoutName: item.name
        }
      });
      window.open(url.href);
    } else if(action.field == 'delete'){
      data.rowId = item.id;
      data.isDelete = true;
    }
  }
  const loadGrid = () => {
    data.isNew = false;
    nextTick(()=>{
      gridRef.value.loadGrid(data.queryParams);
    })
  };

  const handleDelete = () => {
    let d = {
      actions:[{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.rowId,
          apiName: "Layout",
          // objTypeCode: data.objectTypeCode
        }
      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(Interface.objeview.pageLayout.delete, obj).then(res=>{
      Toast("删除成功！");
      data.isDelete = false;
      loadGrid();
    })
  };
</script>
<style lang="less" scoped>
  .todo-head-right :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
    margin-right: 12px;
  }

  .home {
    width: 100%;
    height: 100%;
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
          background: url(../../../../../src/assets/entity.png);
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
      height: calc(~"100% - 52px");

      .ant-row {
        height: 100%;

        .wea-left-right-layout-left {
          border-right: 1px solid #eaeaea;

          .wea-left-tree {
            width: 100%;
            height: 100%;

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
  height: calc(~"100% - 56px");             overflow: auto;

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

  .home .todo-head .todo-head-left .wea-new-top-title-breadcrumb {
    font-weight: 700 !important;
    font-size: 18px !important;
    color: #000 !important;
  }
</style>