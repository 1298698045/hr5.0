<template>
    <div class="home">
      <div class="todo-head">
        <div class="todo-head-left">
          <div class="icon-circle-base"></div>
          <span class="wea-new-top-title-breadcrumb"
            >应用程序</span
          >
        </div>
        <div class="todo-head-right">
          <a-input-search
            class="todo-head-right-search"
            v-model:value="value"
            placeholder="快速查找"
            @search="onSearch"
          />
          <a-button type="primary">创建</a-button>
        </div>
      </div>
      <div class="todo-content" ref="contentRef">
        <a-row>
          <a-col span="24">
            <div style="padding-right: 16px">
              <Dtable
                ref="gridRef"
                gridName="datagrid"
                :columns="columns"
                :gridUrl="gridUrl"
                :tableHeight="tableHeight"
              ></Dtable>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </template>
  <script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    toRaw,
    nextTick,
  } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import DTreeTable from "@/components/DTreeTable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const gridRef = ref();
  const contentRef = ref();
  const data = reactive({
    value: "",
    tableHeight: "",
    roleid: "",
  });
  const gridUrl = toRaw("/localData/setting/app.login.history.getlist.json");
  
  const columns = toRaw([
    {
      field: "Action",
      title: "操作",
      formatter: function (value, row) {
        return "<div style='padding: 0 4px;'><a>修改</a>&nbsp;|&nbsp;<a>删除</a></div>";
      },
    },
    {
      field: "Name",
      title: "姓名",
    },
    {
      field: "UserName",
      title: "用户名",
    },
    {
      field: "BusinessUnitName",
      title: "部门名称",
    },
    {
      field: "IpAddress",
      title: "IP地址",
    },
    {
      field: "OsSystem",
      title: "操作系统",
    },
    {
      field: "Browser",
      title: "浏览器",
    },
    {
      field: "LoginTime",
      title: "登陆时间",
    }
  ]);
  const { value, tableHeight, roleid } = toRefs(data);
  onMounted(() => {
    nextTick(() => {
      changeHeight();
      console.log("data.tableHeight", data.tableHeight);
      gridRef.value.loadGrid();
    });
    window.addEventListener("resize", changeHeight);
  });
  function changeHeight(h) {
    if (typeof h == "number") {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let height = contentHeight;
    data.tableHeight = height;
  }
  const onSearch = (e) => {};
  </script>
  <style lang="less" scoped>
  .todo-content {
    height: calc(~"100% - 52px") !important;
    .ant-row {
      height: 100%;
      .ant-col {
        height: 100%;
      }
    }
  }
  </style>
  