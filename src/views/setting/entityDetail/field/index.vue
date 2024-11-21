<template>
  <div class="home">
    <div style="height: 100%" v-if="!isNewField && !isFieldDependent && !isFieldDetail && !isFieldEdit">
      <!-- <div class="todo-head">
        <div class="todo-head-left">
          <div class="icon-circle-base"></div>
          <span class="wea-new-top-title-breadcrumb">字段和关系</span>
        </div>
        <div class="todo-head-right">
          <a-input-search
            class="todo-head-right-search"
            v-model:value="value"
            placeholder="快速查找"
            @search="onSearch"
          />
          <a-button type="primary" @click="handleNew">新建</a-button>
          <a-button type="primary" class="ml10" @click="handleSort"
            >排序</a-button
          >
          <a-button type="primary" class="ml10" @click="handleFieldDependent">字段依赖性</a-button>
          <a-button type="primary" class="ml10" @click="handleSetTrackField">设置追踪字段</a-button>
        </div>
      </div> -->
      <div class="detailHeader">
        <div class="leftHead">
          <h2 class="title">字段和关系</h2>
          <div class="titleText">{{total}} 个项目，按字段标签排序</div>
        </div>
        <div class="rightHead">
          <!-- <a-input-search
            v-model:value="searchVal"
            placeholder="快速查找"
            @search="onSearch"
          /> -->
          <a-input placeholder="快速查找" v-model:value="searchVal" @change="onSearch">
            <template #prefix>
              <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
            </template>
          </a-input>
          <!-- <div class="groupBtn ml10">
            <a-button @click="handleNew">新建</a-button>
            <a-button @click="handleSort"
              >排序</a-button
            >
            <a-button @click="handleFieldDependent">字段依赖性</a-button>
            <a-button @click="handleSetTrackField">设置追踪字段</a-button>
          </div> -->
          <div class="fh-btn-group">
            <button class="fh-btn" @click="handleNew">新建</button>
            <button class="fh-btn" @click="handleSort">排序</button>
            <button class="fh-btn" @click="handleFieldDependent">字段依赖性</button>
            <button class="fh-btn" @click="handleSetTrackField">设置追踪字段</button>
          </div>
        </div>
      </div>
      <div class="related-list-card">
        <TableList :columns="columns" :gridUrl="gridUrl" :queryParams="queryParams" ref="gridRef" @changeBtn="changeBtn" @resData="successData" />
      </div>
    </div>
    <div style="height: 100%" v-if="isNewField">
      <keep-alive>
        <NewField v-if="isNewField" :editFieldId="editFieldId" @cancel="handleCancel" />
      </keep-alive>
    </div>
    <div style="height: 100%;overflow-y: auto;" v-if="isFieldDependent">
      <FieldDependent  @cancel="handleCancel" />
    </div>
    <div v-if="isFieldDetail" style="height: 100%;">
      <FieldDetail :fieldData="fieldData" :objDetail="detail" @back="handleBack" :dataType="dataType" @edit="handleFieldEdit" />
    </div>
    <div v-if="isFieldEdit" style="height: 100%;">
      <FieldEdit :fieldData="fieldData" :objDetail="detail"  @back="handleBack" :dataType="dataType" @cancel="handleFieldDetailCancel" @fieldType="changeFieldType" />
    </div>
    <SortField v-if="isSort" :isShow="isSort" @cancel="cancelSort" :entityId="route.query.id" />
    <SetTrackField v-if="isTrackField" :isShow="isTrackField" @cancel="isTrackField=false" :entityId="route.query.id" :detail="detail" />
    <ChangeFormField v-if="isChangeFormField" :isShow="isChangeFormField" @cancel="isChangeFormField=false" />
    <Delete :isShow="isDelete" :desc="''" v-if="isDelete" @cancel="isDelete=false" @ok="confirmDelete">
      <div class="objectManagerCustomFieldDeleteWarning">
        <p data-aura-rendered-by="2462:0">删除自定义字段将会：</p>
        <ul>
          <li>删除所有依赖字段或控制字段的所有依赖信息</li>
          <li>改变基于该自定义字段数据的分配规则或升级规则的结果</li>
        </ul>
        <p>为了保存数据记录以便以后参考，在删除自定义字段前，通过单击“数据 | 数据导出”来运行数据导出操作。</p>
        <p>在您删除此字段后，它将在已删除组件列表中显示 15 天。在此期间，您可以取消删除它以恢复字段及其存储的所有数据，或永久性删除字段。请注意，当您取消删除字段时，它的某些属性可能会丢失或更改。15 天后，字段及其数据将被永久删除。</p>
        <p>您将有 15 天的时间来取消删除该字段以恢复字段及其中存储的所有数据，15 天后，字段以及其中存储的所有数据将自动被永久删除。</p>
      </div>
    </Delete>
  </div>
</template>
<script setup>
import "./field.less";
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
  nextTick,
} from "vue";
import Interface from "@/utils/Interface.js";
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import NewField from "@/components/entityDetail/NewField.vue";
import SortField from "@/components/entityDetail/SortField.vue";
import FieldDependent from "@/components/entityDetail/FieldDependent.vue";
import SetTrackField from "@/components/entityDetail/SetTrackField.vue";
import ChangeFormField from "@/components/entityDetail/ChangeFormField.vue";
import TableList from "@/components/entityDetail/TableList.vue";

// 字段详情
import FieldDetail from "@/components/entityDetail/fieldDetail/index.vue";
import FieldEdit from "@/components/entityDetail/fieldEdit/index.vue";
import Delete from "@/components/listView/Delete.vue";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import moment from "moment";

let data = reactive({
  isCollapsed: false,
  tableHeight: "",
  fieldNames: {
    children: "children",
    title: "name",
    key: "id",
  },
  activeKey: 0,
  queryParams: {
    entityId: route.query.id,
    search: ""
  },
  isNewField: false,
  isSort: false,
  isTrackField: false,
  isFieldDependent: false,
  isChangeFormField: false,
  searchVal: "",
  isFieldDetail: false,
  fieldData: {},
  isFieldEdit: false,
  dataType: "",
  detail: {},
  isDelete: false,
  rowId: "",
  editFieldId: "", // 编辑字段id
  total: 0
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};

const { isCollapsed, tableHeight, fieldNames, activeKey, isNewField, isSort,
   isTrackField, isFieldDependent, isChangeFormField, searchVal, queryParams, isFieldDetail,
    fieldData, isFieldEdit, dataType, detail, isDelete, rowId, editFieldId, total } =
  toRefs(data);
  
const tabContent = ref(null);
const contentRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
onMounted(() => {
  // window.addEventListener("resize", changeHeight);
  // setTimeout(function () {
  //   window.dispatchEvent(new Event("resize"));
  // });
});
const onSearch = () => {
    data.queryParams.search = data.searchVal;
    gridRef.value.loadGrid();
}
const handleNew = () => {
  data.isNewField = true;
};
const handleCancel = () => {
  data.isNewField = false;
  data.isFieldDependent = false;
  data.isFieldDetail = false;
  data.isFieldEdit = false;
  nextTick(() => {
    gridRef.value.loadGrid(data.queryParams);
  });
};
const handleBack = () => {
  data.isNewField = false;
  data.isFieldDependent = false;
  data.isFieldDetail = false;
  data.isFieldEdit = false;
  nextTick(() => {
    gridRef.value.loadGrid(data.queryParams);
  });
}
const handleFieldDetailCancel = () => {
  data.isFieldEdit = false;
  data.isFieldDetail = true;
}
const handleSetTrackField = () => {
  data.isTrackField = true;
}
const handleFieldDependent = () => {
  data.isFieldDependent = true;
}
function changeHeight(h) {
  if (typeof h == "number") {
    formSearchHeight.value = h;
  }
  let contentHeight = contentRef.value.clientHeight;
  let tabsHeight = 0;
  let height = contentHeight - tabsHeight - formSearchHeight.value;
  data.tableHeight = height;
  console.log("data", data.tableHeight);
  console.log("gridRef", gridRef.value.loadGrid());
}

// 获取tabs
// getTabs();

const handleMenuClick = () => {};
const DelegateRef = ref();

function handleTo(WFRuleLogId) {}
const changeFormField = (id) => {
  data.isChangeFormField = true;
};

// 字段详情页

const handleFieldDetail = (id, name, dataType) => {
  console.log("id,name", id, name);
  data.fieldData = {
    id,
    name,
    type: dataType
  };
  data.dataType = dataType;
  data.isFieldDetail = true;
};
window.handleFieldDetail = handleFieldDetail;
window.changeFormField = changeFormField;
window.handleTo = handleTo;
window.data = data;
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
const gridUrl = ref(Interface.objeview.objectmanager);
const columns = ref([
  // {
  //   field: 'ids',
  //   checkbox: true
  // },
  // {
  //   field: "Action",
  //   title: "操作",
  //   formatter: function formatter(value, row) {
  //     let btn;
  //     if(row.IsCustomField=='True'){
  //       btn = `<div class="option-item" onclick="changeFormField('${row.EntityId}')">设置查找内容更改表单字段</div>`
  //     }else {
  //       btn = '';
  //     }
  //     var str = `
  //               <div class="iconBox">
  //                 <div class="popup">
  //                   <div class="option-item" onclick="handleTo('${row.EntityId}')">编辑</div>
  //                   ${btn}
  //                   <div class="option-item" onclick="handleTo('${row.EntityId}')">删除</div>
  //                 </div>
  //                 <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
  //             `;
  //     return str;
  //   },
  // },
  {
    field: "label",
    title: "字段标签",
    sortable: true,
    formatter: function formatter(value, row) {
      var rowId = row.id;
      var objectTypeCode = row.ObjectTypeCode;
      var name = row["label"];
      var action =
        '<a style="color:#015ba7;font-size:13px;" onclick=\"handleFieldDetail(\''+rowId+'\',\''+name+'\',\''+row.dataType+'\')\" href="javascript:void(0)">' +
        (name || "") +
        "</a>";
      return action;
    },
  },
  { field: "developerName", title: "字段名", sortable: true },
  { field: "dataTypeName", title: "数据类型", sortable: true },
  {
    field: "IsPKAttribute",
    title: "控制字段",
    sortable: true,
    formatter: function (value) {
      if (value == "True" || value == "true" || value == true) {
        return (
          '<img style="height:18px;width:24px;margin-left:7px;" src="' +
          imgUrl +
          '" />'
        );
      } else {
        return "";
      }
    },
  },
  {
    field: "indexed",
    title: "已索引",
    sortable: true,
    formatter: function (value) {
      if (value == "True" || value == "true" || value == true) {
        return (
          '<img style="height:18px;width:24px;margin-left:7px;" src="' +
          imgUrl +
          '" />'
        );
      } else {
        return "";
      }
    },
  },
  {
    field: "Action",
    title: "操作",
    formmatterActions: function(item){
      let actions = [{name: "编辑"},{name: "删除"}];
      if(item.dataType=='Y'||item.dataType=='U'||item.dataType=='O'){
        actions = [{name: "编辑"},{name: "删除"},{name: "设置查找内容更改表单字段"}];
      }else {
        actions = [{name: "编辑"},{name: "删除"}];
      }
      return actions;
    }
  },
]);

const handleSort = () => {
  data.isSort = true;
};
const cancelSort = (e) => {
  data.isSort = e;
}
const changeBtn = (action, item) => {
  console.log('changeBtn', action, item);
  data.rowId = item.id;
  if(action.name=='设置查找内容更改表单字段'){
    data.isChangeFormField = true;
  } else if(action.name=='删除'){
    data.isDelete = true;
    // let result = confirm("是否确定删除字段?");
    // // console.log(result,'123')
    // if(result){
    //   proxy.$post(Interface.objeview.field.delete, {id: item.id}).then(res=>{
    //     gridRef.value.loadGrid(data.queryParams);
    //   })
    // }
  } else if(action.name=='编辑'){
    data.fieldData = {
      id: item.id,
      name: item.label,
      type: item.dataType
    };
    data.dataType = item.dataType;
    data.isFieldEdit = true;
  }
};
// 确定删除
const confirmDelete = () => {
    proxy.$post(Interface.objeview.field.delete, {
      id: data.rowId
    }).then(res=>{
      gridRef.value.loadGrid(data.queryParams);
      data.isDelete = false;
    });
}
const actions = reactive([
  {
    name: "编辑"
  },
  {
    name: "删除"
  }
]);

// 字段编辑
const handleFieldEdit = () => {
  data.isFieldDetail = false;
  data.isFieldEdit = true;
}
const getDetail = () => {
    proxy.$get(Interface.objeview.objDetail, {
      id: route.query.id
    }).then(res=>{
      data.detail = res;
    })
}
getDetail();

// 更改字段类型 id: 当前编辑字段id
const changeFieldType = (id) => {
  // console.log("id", id, data.fieldData);
  data.editFieldId = id;
  data.isFieldEdit = false;
  data.isNewField = true;
}
const successData = (res) => {
  data.total = res.total;
}
</script>
<style lang="less" scoped>
.todo-head-right
  :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
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
height: calc(~"100% - 56px");           overflow: auto;
            .ant-tree-title {
              display: inline-block;
              width: 100%;
            }
            .ant-tree-title > span {
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
.home .todo-head .todo-head-left .wea-new-top-title-breadcrumb {
  font-weight: 700 !important;
  font-size: 18px !important;
  color: #000 !important;
}
.detailHeader{
  padding: 0 8px;
  height: 71px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .leftHead{
    .title{
      font-size: 18px;
    }
    .titleDesc{
      font-size: 12px;
    }
  }
  .rightHead{
    display: flex;
    align-items: center;
  }
}
.related-list-card{
  height: calc(~"100% - 71px");
}
.objectManagerCustomFieldDeleteWarning{
  padding: 16px;
  ul,li{
    list-style-type: disc;
    padding-left: 32px;
  }
  li{
    padding-left: 0;
  }
  p{
    margin: 12px 0;
  }
}
</style>
