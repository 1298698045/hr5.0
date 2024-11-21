<template>
  <div class="dtable" :style="{ height: tableHeight + 'px' }">
    <div :id="gridName"></div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  defineProps,
  defineExpose,
  defineEmits,
} from "vue";
const emit = defineEmits(["success", "clickRow"]);
const props = defineProps({
  tableHeight: [String, Number],
  isCollapsed: Boolean,
  columns: Array,
  gridUrl: String,
  gridName: {
    type: String,
    default: "datagrid",
  },
  treeField: {
    type: String,
    default: "",
  },
});
console.log("treeField", props.treeField);
watch(
  () => props.isCollapsed,
  (newVal, oldVal) => {
    $("#" + props.gridName).datagrid("reload");
  }
);
const loadGrid = (queryParams) => {
  console.log("loadGrid:queryParams", queryParams);
  // const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  var height = props.tableHeight;
  var columns = props.columns;

  if ($.fn.pagination.defaults != undefined) {
    //分页工具栏处理

    $.fn.pagination.defaults.beforePageText = "";

    $.fn.pagination.defaults.afterPageText = "/{pages}";

    $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";
  }
  var url = props.gridUrl;
  $("#" + props.gridName).treegrid({
    // url: '/localData/datalist.json',
    url: url,
    method: "get",
    columns: [columns],
    queryParams: queryParams,
    idField: "id",
    treeField: props.treeField,
    singleSelect: false,
    checkOnSelect: false,
    selectOnCheck: false,
    pagination: true,
    pageNumber: 1,
    pageSize: 10,
    fit: true,
    striped: false,
    rownumbers: true,
    loadFilter: function (data) {
      var data0 = { rows: [], total: 0 };
      if (data) {
        if (data.rows) {
          if (data.rows.Table) {
            data0.rows = data.rows.Table;
          } else {
            data0.rows = data.rows;
          }
        } else if (data.data && data.data.Table) {
          data0.rows = data.data.Table;
        } else if (data.listData) {
          data0.rows = data.listData;
        } else if (
          data.actions &&
          data.actions[0] &&
          data.actions[0].returnValue
        ) {
          data0.rows = data.actions[0].returnValue;
        } else {
          data0.rows = data;
        }
        data0.total = data.total ? Number(data.total) : data0.rows.length;
      }
      return data0;
    },
    onLoadSuccess: function (row, data) {
      $("#datagrid").datagrid("resize", { height: height });
      console.log("row, data", row, data);
      emit("success", data);
    },
    onClickRow: function (row) {
      emit("clickRow", row);
    },
  });
};
defineExpose({ loadGrid });
</script>
<style lang="less">
.iconBox {
  position: relative;
  cursor: pointer;
}
.icon.img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.iconBox:hover .popup {
  display: block;
}
.popup {
  position: absolute;
  top: 0;
  min-width: 100px;
  background: #fff;
  display: none;
  z-index: 999999;
  box-shadow: 0 1px 6px hsla(0, 0%, 39%, 0.2);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.popup .option-item {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 6px 6px 0 0;
}
.popup .option-item:hover {
  background: #eaf8fe;
}
td[field="Action"] .datagrid-cell {
  overflow: initial !important;
}
</style>
