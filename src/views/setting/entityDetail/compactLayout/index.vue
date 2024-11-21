<template>
  <div class="home">
    <div style="height: 100%;" v-if="!isNew">
      <div class="detailHeader">
        <div class="leftHead">
          <h2 class="title">紧凑型布局</h2>
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
    <div style="height: 100%;" v-else>
      <NewCompactLayout :id="id" :entityId="queryParams.entityId" :objectTypeCode="objectTypeCode" @cancel="handleCancel" @load="loadGrid" />
    </div>
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import NewCompactLayout from "@/components/entityDetail/NewCompactLayout.vue";
  import TableList from "@/components/entityDetail/TableList.vue";
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
    isNew: false,
    id: "",
    searchVal: "",
    objectTypeCode: route.query.objectTypeCode
  });
  const { isCollapsed, tableHeight, queryParams, isNew, id, searchVal, objectTypeCode } = toRefs(data);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {

  })

  const onSearch = (e) => {
    data.queryParams.search = e;
    gridRef.value.loadGrid();
  }

  const handleEdit = (id) => {
    data.id = id;
    data.isNew = true;
  };
  window.handleEdit = handleEdit;
  window.data = data;
  const imgUrl = require("@/assets/img/checkbox_checked.gif");
  const imgUrl2 = require("@/assets/img/checkbox_unchecked.gif");
  const gridUrl = ref(Interface.objeview.compactLayout);
  const columns = ref(
    [
      {
        field: 'label', title: '标签', sortable: true,
        formatter: function formatter(value, row) {
          var rowId = row.id;
          // var objectTypeCode = row.ObjectTypeCode;
          var name = row["label"];
          var action = "<a style=\"color:#015ba7;font-size:13px;\" href='javascript:;' onclick='handleEdit(\""+rowId+"\")'>"+name+"</a>"
          // var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/#/setting/entityDetail/field?t=01I&amp;tsid=09u90000000&amp;id=" + rowId + "&amp;objectTypeCode=" + objectTypeCode + "\">" + (name || '') + "</a>";
          return action;
        }
      },
      { field: 'name', title: 'API名称', sortable: true },

      { field: 'primary', title: '主要', sortable: true, formatter: function(value, row, index){
        return '<p>'+value == 'True' ? '<img src="'+imgUrl2+'" />' : '<img src="'+imgUrl+'" />'+'<p>';
      } },
      { field: 'CreatedByName', title: '修改人', sortable: true },
      { field: 'createdOn', title: '上次修改时间', sortable: true },
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
    data.isNew = true;
  };
  const handleCancel = () => {
    data.isNew = false;
  };
  const changeBtn = (action, item) => {
    if(action.field=='edit'){
      handleEdit(item.id);
    }
  }
  const loadGrid = () => {
    data.isNew = false;
    nextTick(()=>{
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