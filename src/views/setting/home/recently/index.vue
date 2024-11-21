<template>
  <HeadCommon name="主页">
    <div class="fh-btn">创建</div>
  </HeadCommon>
  <div class="wrapper">
    <div class="moduleWrap">
      <div class="module-header">
        <header>
          <h2>
            <span class="title">最近使用</span>
          </h2>
          <h3>
            <span class="count">{{listData.length}} 个项目</span>
          </h3>
        </header>
      </div>
      <div class="module-content">
        <table class="recentItemsTable">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>对象</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <td>
                <a class="setupLink" :href="'/#/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view?id='+item.EntityId+'&objectTypeCode='+item.ObjectTypeCode+'&sObjectName='+item.EntityCode">{{ item.DisplayName }}</a>
              </td>
              <td>
                <span>自定义对象定义</span>
              </td>
              <td>
                <span class="uiOutputText">{{ item.EntityCode }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
import Interface from "@/utils/Interface.js";
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import HeadCommon from "@/components/HeadCommon.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

import moment from "moment";

const { proxy } = getCurrentInstance();

let data = reactive({
  isCollapsed: false,
  tableHeight: '',
  fieldNames:{
    children:'children', title:'name', key:'id'
  },
  queryParams: {},
  listData: []
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { isCollapsed, tableHeight, fieldNames, queryParams, listData } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
let formSearchHeight = ref(null);
const gridRef = ref(null);
onMounted(()=>{
  window.addEventListener('resize',changeHeight);
  setTimeout(function(){
    window.dispatchEvent(new Event('resize'))
  })
  
})
function changeHeight(h){
  if(typeof h == 'number'){
    formSearchHeight.value = h;
  }
  // let contentHeight = contentRef.value.clientHeight;
  // let tabsHeight = 46;
  // let height = contentHeight - tabsHeight - formSearchHeight.value;
  // data.tableHeight = contentHeight;
  // console.log('data',data.tableHeight);
  // console.log("gridRef",gridRef.value.loadGrid())
}
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref("/localData/recentlylist.json");
  const columns = ref(
    [
      { field: 'DisplayName', title: '名称', sortable: true },
      { field: 'Name', title: '对象代码', sortable: true },
      // { field: 'EntityCode', title: '记录前缀', sortable: true },
      // { field: 'Description', title: '描述', sortable: true },
      { field: 'ModifiedOn', title: '上次修改时间', sortable: true, 
      formatter: function formatter(value, row) {
          var value0 = value?moment(value).format("YYYY-MM-DD HH:mm"):'';
          return value0;
      } },
    ]
  );
  const getQuery = () => {
    proxy.$get(Interface.objectHome, {}).then(res=>{
      data.listData = res.rows;
    })
  }
  getQuery();
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: calc(~"100% - 80px");
  .moduleWrap{
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 0;
    margin: 0;
    margin-bottom: 30px;
    .module-header{
      height: 90px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      color: #181818;
      h2{
        font-size: 18px;
      }
      h3{
        font-size: 14px;
      }
    }
    .module-content{
      width: 100%;
      .recentItemsTable{
        width: 100%;
        border-collapse: collapse;
        tr{
          vertical-align: middle;
          th{
            border-bottom: 3px solid #e5e5e5;
            font-weight: 400;
            font-size: 12px;
            font-weight: normal;
            line-height: 1.5;
            text-transform: uppercase;
            letter-spacing: .1em;
            padding-top: 8px;
            padding-bottom: 8px;
            text-align: left;
            color: #444444;
          }
          th,td{
            padding-left: 20px;
          }
          td{
            border-bottom: 1px solid #e5e5e5;
            padding-top: 12px;
            padding-bottom: 12px;
            color: #444444;
            font-size: 13px;
            .setupLink{
              color: #0176d3;
              font-weight: 400;
              &:hover{
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>
