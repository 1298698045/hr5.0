<template>
  <div class="home">
    <div class="detailHeader">
      <div class="leftHead">
        <h2 class="title">按钮、链接和操作</h2>
        <div class="titleText">{{total}} 个项目，按标签排序</div>
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
      <TableList :columns="columns" :gridUrl="gridUrl" :queryParams="queryParams" @changeBtn="changeBtn" ref="gridRef" @resData="successData" />
    </div>
    <common-form-modal
      :isShow="isCommon"
      :id="rowId"
      :entityId="queryParams.entityId"
      entityApiName="ActionButtonLinkList"
      :objectTypeCode="objectTypeCode"
      v-if="isCommon"
      @cancel="handleCommonCancel"
      title="新建按钮、链接和操作"
      @success="success"
    ></common-form-modal>
    <Delete desc="是否确定？" :isShow="isDelete" v-if="isDelete" @cancel="isDelete=false" @ok="confirmDelete" />
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import TableList from "@/components/entityDetail/TableList.vue";
  import Delete from "@/components/listView/Delete.vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  import moment from "moment";
  const { proxy } = getCurrentInstance();


  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    queryParams: {
      entityId: route.query.id,
      search: ""
    },
    isCommon: false,
    searchVal: "",
    objectTypeCode: route.query.objectTypeCode,
    rowId: "",
    isDelete: "",
    total: 0
  });
  const { isCollapsed, tableHeight, queryParams, isCommon, searchVal,
     objectTypeCode, rowId, isDelete, total } = toRefs(data);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    // window.addEventListener('resize', changeHeight);
    // setTimeout(function () {
    //   window.dispatchEvent(new Event('resize'))
    // })

  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height;
    console.log('data', data.tableHeight);
    console.log("gridRef", gridRef.value.loadGrid())
  }

  const onSearch = (e) => {
    data.queryParams.search = e;
    gridRef.value.loadGrid();
  }
  window.data = data;
  const editLogic = (id) => {
    data.isNew = true;
  };
  window.editLogic = editLogic;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref(Interface.objeview.btnLinkList);
  const columns = ref(
    [
      { field: 'label', title: '标签', sortable: true,},
      { field: 'name', title: '名称', sortable: true },
      { field: '', title: '描述', sortable: true },
      { field: 'dataType', title: '类型', sortable: true, },
      { field: 'Name2', title: '内容源', sortable: true, },
      { field: 'Name2', title: '覆盖', sortable: true, },
      {
        field: "Action",
        title: "操作",
        formmatterActions: function(item){
            let actions = [{ name: "编辑", field: "edit" },{ name: "删除", field: "delete"}];
            return actions;
        }
      }
    ]
  );
  const handleNew = () => {
    data.rowId = '';
    data.isCommon = true;
  };
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon = params;
  };
  const callback = () => {
    gridRef.value.loadGrid();
    data.isCommon = false;
  };
  const changeBtn = (action, item) => {
    data.rowId = item.id;
    if(action.field=='edit'){
      data.isCommon = true;
    } else if(action.field == 'delete') {
      data.isDelete = true;
    }
  };
  const success = () => {
    data.isCommon = false;
    gridRef.value.loadGrid();
  };
  const confirmDelete = () => {
    let d = {
      actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: data.rowId,
          apiName: "",
          objTypeCode: data.objectTypeCode
        }
      }]
    };
    let obj = {
      message: JSON.stringify(d)
    }
    proxy.$post(Interface.delete, obj).then(res=>{
      Toast("删除成功！");
      data.isDelete = false;
      gridRef.value.loadGrid();
    })
  };
  const successData = (res) => {
    data.total = res.total;
  } 
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
      height: calc(~"100% - 0px");

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