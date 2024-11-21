<template>
  <div class="home">
    <div style="height: 100%;" v-if="!isEdit">
      <div class="detailHeader">
        <div class="leftHead">
          <h2 class="title">页面布局</h2>
        </div>
        <div class="rightHead">
          <a-input-search
            v-model:value="rightHead"
            placeholder="快速查找"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="related-list-card">
        <TableList :columns="columns" :gridUrl="gridUrl" :queryParams="queryParams" @changeBtn="changeBtn" ref="gridRef" />
      </div>
    </div>
    <div style="height: 100%;" v-else>
      <EditSearchLayout @cancel="handleCancel" @load="loadGrid" :id="id" :entityId="entityId" />
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
  import EditSearchLayout from "@/components/entityDetail/EditSearchLayout.vue";
  import { useRouter, useRoute } from "vue-router";
  import TableList from "@/components/entityDetail/TableList.vue";

  const router = useRouter();
  const route = useRoute();
  import moment from "moment";
  const { proxy } = getCurrentInstance();


  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    queryParams: {
      entityType: "EntitySearchLayout",
      objectTypeCode: 100005,
      filterQuery: "\nTemplateId\teq\t"+route.query.id,
      displayColumns: "Name,DisplayColumnTitles,DisplayButtonNames,ModifiedOn"
    },
    isEdit: false,
    id: '',
    entityId: route.query.id
  });
  const { isCollapsed, tableHeight, queryParams, isEdit, id, entityId } = toRefs(data);
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
    data.tableHeight = contentHeight;
    console.log('data', data.tableHeight);
    console.log("gridRef", gridRef.value.loadGrid())
  }
  const loadGrid = () => {
    nextTick(()=>{
      gridRef.value.loadGrid();
    });
  }
  const handleEdit = (id) => {
    data.id = id;
    data.isEdit = true;
  };
  window.handleEdit = handleEdit;
  window.data = data;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  // const gridUrl = ref(Interface.objeview.searchLayout);
  const gridUrl = ref(Interface.list2);

  const columns = ref(
    [
      // {
      //   field: 'ids',
      //   checkbox: true
      // },
      // {
      //   field: "Action",
      //   title: "操作",
      //   formatter: function formatter(value, row) {
      //     var str = `
      //         <div class="iconBox">
      //           <div class="popup">
      //             <div class="option-item" onclick="handleEdit('${row.TemplateId}')">编辑</div>  
      //           </div>
      //           <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
      //       `
      //     return str;
      //   }
      // },
      {
        field: 'Name', title: '布局', sortable: true,
        formatter: function formatter(value, row) {
          var rowId = row.id;
          // var objectTypeCode = row.ObjectTypeCode;
          var name = row["Name"].textValue;
          var action = "<a style=\"color:#015ba7;font-size:13px;\" href='javascript:;' onclick='handleEdit(\""+rowId+"\")'>"+name+"</a>"
          // var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/#/setting/entityDetail/field?t=01I&amp;tsid=09u90000000&amp;id=" + rowId + "&amp;objectTypeCode=" + objectTypeCode + "\">" + (name || '') + "</a>";
          return action;
        }
      },
      { field: 'DisplayColumnTitles', title: '显示的列', sortable: true },

      { field: 'DisplayButtonTitles', title: '显示的按钮', sortable: true },
      { field: 'ModifiedOn', title: '修改时间', sortable: true, dataType: "D" },
      {
        field: "Action",
        title: "操作",
        formmatterActions: function(item){
            let actions = [{ name: "编辑", field: "edit" }];
            return actions;
        }
      }
    ]
  );
  const handleCancel = () => {
    data.isEdit = false;
    nextTick(()=>{
      gridRef.value.loadGrid();
    })
  };
  const changeBtn = (action, item) => {
    if(action.field=='edit'){
      handleEdit(item.id);
    }
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