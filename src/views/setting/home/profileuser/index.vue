<template>
  <div class="home" ref="contentRef">
    <!-- <div class="todo-head">
      <div class="todo-head-left">
        <div class="icon-circle-base"></div>
        <span class="wea-new-top-title-breadcrumb">用户（在此页面上，您可以创建、查看并管理用户）</span>
      </div>
      <div class="todo-head-right">
      <a-input-search
              class="todo-head-right-search"
              v-model:value="value"
              placeholder="快速查找"
              @search="onSearch"
          />
        <a-button type="primary" @click="handleNewUser">创建</a-button>
      </div>
    </div> -->
    <div ref="headFilterRef">
      <div class="headerTop">
        <div class="leftAll">
          <div class="menuImg">
            <img class="img" :src="require('@/assets/task_120.png')" alt="" />
          </div>
          <div class="menu-box">
            <div class="label">{{title}}</div>
            <div class="row">
              <!-- <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  {{ currentFilter.name }}
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item v-for="(item, index) in filterList" :key="index" @click="handleSwitchFilter(item)">
                      <span class="iconitem">
                        <CheckOutlined v-if="item.id == currentFilter.id" />
                      </span>
                      <a href="javascript:;">{{ item.name }}</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown> -->
              <div class="triggerLinkTextAndIconWrapper" @click.stop="isFilterPicker=true">
                <h1>{{ currentFilter.name }}</h1>
                <svg class="fh-svg-icon" focusable="false" data-key="down" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"></path></g></svg>
                <div class="listViewPickerPanel" v-if="isFilterPicker">
                  <div class="fh-searchbox">
                    <span class="fh-icon-utility-search">
                      <svg focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                    </span>
                    <input class="fh-search" v-model="searchFilterVal" type="text" placeholder="搜索列表..." @input="serachFilter">
                  </div>
                  <ul class="fh-dropdown__list">
                    <li class="fh-dropdown__header fh-text-heading--label">最近列表视图</li>
                    <li class="fh-dropdown__item" v-for="(item, index) in filterList" :key="index" @click.stop="handleSwitchFilter(item)">
                      <a href="javascript:void(0);">
                        <span class="fh-icon-utility-check">
                          <svg class="fh-svg" v-if="currentFilter.id == item.id" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path></g></svg>
                        </span>
                        <span class="virtualAutocompleteOptionText">
                          {{item.name}}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="lockBtn" title="固定此列表视图" @click="handleLock">
                <img v-if="isLock" :src="require('@/assets/pinned14.png')" class="img active" alt="" />
                <img v-else :src="require('@/assets/pin_italic14.png')" class="img active" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="rightBtns">
          <div class="btnBox" v-for="(item, index) in actionList" :key="index">
            <div class="btnGroup ml10" v-if="Array.isArray(item)">
              <a-button
                v-for="(row, idx) in item"
                :key="idx"
                @click="handleClickBtn(row.devNameOrId)"
                >{{ row.label }}</a-button
              >
            </div>
            <a-button class="ml10" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
          </div>
        </div>
      </div>
      <div class="searchWrap">
        <!-- <div class="search-common">
          <list-form-search ref="searchRef" @search="handleSearch"></list-form-search>
        </div> -->
        <div class="searchVal">
          <a-input placeholder="搜索此列表..." style="width: 240px;">
            <template #prefix>
              <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
            </template>
          </a-input>
        </div>
        <div class="search-btns">
          <a-dropdown :trigger="['click']">
            <a-button class="ant-btn-icon ml10">
              <svg class="btn_icon" focusable="false" data-key="settings" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z"></path></g></svg>
              <svg class="btn_icon btn_icon_small" focusable="false" data-key="down" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"></path></g></svg>
            </a-button>
            <template #overlay>
              <a-menu class="fh-menu" @click="handleMenuClick">
                <a-menu-item key="1" :disabled="!initialData.entityListViewPermissions.canCreateListView">新建</a-menu-item>
                <a-menu-item key="2">导出</a-menu-item>
                <a-menu-item key="3">复制</a-menu-item>
                <a-menu-item key="4">重命名</a-menu-item>
                <a-menu-item key="5">共享设置</a-menu-item>
                <a-menu-item key="6">选择要显示的字段</a-menu-item>
                <a-menu-item key="7">删除</a-menu-item>
                <a-menu-item key="8" disabled>Kanban设置</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-dropdown class="ml10" :trigger="['click']">
            <a-button class="ant-btn-icon">
              <svg class="btn_icon" focusable="false" data-key="table" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z"></path></g></svg>
              <svg class="btn_icon btn_icon_small" focusable="false" data-key="down" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"></path></g></svg>
            </a-button>
            <template #overlay>
              <a-menu class="fh-menu" style="width: 136px;" @click="handleMenuClick">
                <a-menu-item key="1">列表</a-menu-item>
                <a-menu-item key="2">卡片</a-menu-item>
                <a-menu-item key="3">分屏视图</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button title="刷新" class="ant-btn-icon ml10">
            <svg class="btn_icon" focusable="false" data-key="refresh" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M465 40h-30c-8 0-15 7-15 15v70c0 9-5 13-12 7l-10-10a210 210 0 10-12 309c7-6 7-16 1-22l-21-21c-5-5-14-6-20-1a152 152 0 01-172 14 152 152 0 0177-281 150 150 0 01118 58c3 8-4 12-13 12h-70c-8 0-15 7-15 15v31c0 8 6 14 14 14h183c7 0 13-6 13-13V55c-1-8-8-15-16-15z"></path></g></svg>
          </a-button>
          <div class="btnGroup ml10">
            <a-button class="ant-btn-icon" title="图标">
              <svg class="btn_icon" focusable="false" data-key="chart" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M455 234L250 347a20 20 0 01-30-18V84c0-10-10-18-19-15a220 220 0 10276 175c-2-10-13-15-22-10zm-178 46l197-105c12-6 16-22 8-33A302 302 0 00287 22c-14-3-27 8-27 22v226c0 9 9 14 17 10z"></path></g></svg>
            </a-button>
            <a-button class="ant-btn-icon" title="筛选器" @click="handleShowFilter">
              <svg class="btn_icon" focusable="false" data-key="filterList" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M483 40H39c-15 0-22 17-13 28l194 227c6 7 9 17 9 26v144c0 8 8 15 16 15h30c8 0 14-7 14-15V321c0-10 4-19 11-26L496 68c9-11 2-28-13-28z"></path></g></svg>
            </a-button>
          </div>
          <a-button class="ant-btn-icon ml10">
            <svg class="btn_icon" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
          </a-button>
        </div>
      </div>
    </div>
    <div class="todo-content" :style="{height:(tableHeight)+'px'}">
      <a-row>
        <a-col span="4" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <span class="wea-left-tree-search-label">快速查询</span>
              <a-input-search v-model:value="searchTree" placeholder="" @search="serachDeptTree"  />
            </div>
            <div class="wea-left-tree-scroll">
              <a-tree :style="{height: (tableHeight-46)+'px'}" :tree-data="gData" block-node :fieldNames="fieldNames">
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                  </CaretDownOutlined>
                </template>
                <!-- <template  v-slot:title="{ name }">
                </template> -->
              </a-tree>
            </div>
          </div>
        </a-col>
        <a-col :span="isCollapsed ? '24' : '20'" class="wea-left-right-layout-right">
          <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
            :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
          <div style="height: 100%">
            <div class="wea-tabContent" :style="{height:(tableHeight)+'px'}" ref="tabContent">
              <!-- <a-table :dataSource="dataSource" :columns="columns"></a-table> -->
              <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="(tableHeight)"
                :isCollapsed="isCollapsed"></Dtable>
                <div class="filterModalWrap" v-if="isFilterModal">
                  <Filter @close="closeFilterModal" />
                </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" title="新建用户"></common-form-modal>
    <!-- 弹窗 -->
    <NewVue :isShow="isNewModal" v-if="isNewModal" @cancel="isNewModal=false" />
    <Copy :isShow="isCopyModal" v-if="isCopyModal" @cancel="isCopyModal=false" />
    <Rename
      :isShow="isRenameModal"
      v-if="isRenameModal"
      @cancel="isRenameModal=false"
    />
    <export-field
      :isShow="isExportModal"
      v-if="isExportModal"
      @cancel="isExportModal=false"
    ></export-field>
    <share-setting
      :isShow="isShareModal"
      v-if="isShareModal"
      @cancel="isShareModal=false"
    ></share-setting>
    <show-field
      :isShow="isShowModal"
      v-if="isShowModal"
      @cancel="isShowModal=false"
    ></show-field>
    <Delete
      :isShow="isDeleteModal"
      v-if="isDeleteModal"
      @cancel="isDeleteModal=false"
    />
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    CheckOutlined,
    SettingOutlined,
    RedoOutlined,
    SearchOutlined

  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  import CommonFormModal from "@/components/listView/CommonFormModal.vue";

  // 新建列表视图
  import NewVue from "@/components/listView/New.vue";
  import Copy from "@/components/listView/Copy.vue";
  import Rename from "@/components/listView/Rename.vue";
  import ShareSetting from "@/components/listView/ShareSetting.vue";
  // 导出字段
  import ExportField from "@/components/listView/ExportField.vue";
  import ShowField from "@/components/listView/ShowField.vue";
  import Delete from "@/components/listView/Delete.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";

  import moment from "moment";
  import { formTreeData } from "@/utils/common.js";
  const { proxy } = getCurrentInstance();
  const headFilterRef = ref(null);
  const gData = ref([]);
  proxy.$get('/localData/treedata_dept.json', {}).then((res) => {
    gData.value = formTreeData(res.rows, 'id', 'pid');
  });

  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    fieldNames: {
      children: 'children', title: 'text', key: 'id'
    },
    searchTree: "",
    tabs: [
      {
        lable: "全部",
        count: 18
      },
      {
        lable: "被退回",
        count: ''
      },
      {
        lable: "已读",
        count: 16
      },
      {
        lable: "未读",
        count: 2
      },
      {
        lable: "超时",
        count: ''
      },
      {
        lable: "待阅",
        count: ''
      }
    ],
    activeKey: 0,
    queryParams: {
      entityType: route.params.entityType,
      objectTypeCode: 20589,
      search: "",
      filterId: ""
    },
    isModal: false,
    isCirculation: false,
    isCommon: false,
    currentMenu: "全部",
    menus: [
      {
        id: 1,
        name: "全部",
      },
      {
        id: 2,
        name: "未审批的轮转",
      },
      {
        id: 3,
        name: "本科轮科人员",
      },
      {
        id: 4,
        name: "我创建的",
      },
    ],
    isLock: false,
    filterList: [],
    currentFilter: {
      id: "",
      name: ""
    },
    isNewModal: false,
    isExportModal: false,
    isCopyModal: false,
    isRenameModal: false,
    isShareModal: false,
    isShowModal: false,
    isDeleteModal: false,
    isFilterModal: false,
    isFilterPicker: false,
    searchFilterVal: "",
    filterListFixed: [],
    entityType: route.params.entityType,
    sObjectName: route.params.sObjectName,
    initialData: {}, // 元数据
    actionList: [],
    title: ""
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, searchTree, tabs, isFilterPicker,
    activeKey, isModal, isCirculation, isCommon, isLock, filterList, currentFilter,
    isNewModal, isExportModal, isCopyModal, isRenameModal, isShareModal, isShowModal, 
    isDeleteModal, isFilterModal, searchFilterVal, filterListFixed, entityType,
     initialData, actionList, title } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);

  const handleSwitchFilter = (item) => {
    data.currentFilter = {
      id: item.id,
      name: item.name
    };
    data.isFilterPicker = false;
    data.isLock = false;
    data.queryParams.filterId = item.id;
    columns.value = [];
    getListConfig();
  };
  const handleLock = () => {
    data.isLock = !data.isLock;
  };
  onMounted(() => {
    window.addEventListener('resize', changeHeight);
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })
    window.addEventListener('click',()=>{
      data.isFilterPicker = false;
    })
  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let headFilterHeight = headFilterRef.value.clientHeight;
    let contentHeight = contentRef.value.clientHeight;1
    data.tableHeight = contentHeight - headFilterHeight - 10;
    // console.log('data', data.tableHeight);
    // console.log("gridRef", gridRef.value.loadGrid())
    // gridRef.value.loadGrid(data.queryParams);
  }

  function handleTo() {
    // router.push({
    //   path:"/detail",
    //   query: {
    //     id: WFRuleLogId
    //   }
    // });
  }


  window.handleTo = handleTo;


  window.data = data;
  const imgUrl = require("@/assets/flow/checkbox_checked.gif");
  const gridUrl = ref(Interface.listView.list);
  const columns = ref([]);
  const columns2 = ref(
    [
      {
        field: 'ids',
        checkbox: true
      },
      {
        field: "Action",
        title: "操作",
        // formatter: function formatter(value, row) {
        //   var str = `
        //       <div class="iconBox">
        //         <div class="popup">
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">修改</div>
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">重置密码</div>  
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">禁用</div>  
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">删除</div>
        //         </div>
        //         <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        //     `
        //   if ((row.IsDisabled).indexOf('/img/checkbox_checked.gif') != -1) {
        //     str = `
        //       <div class="iconBox">
        //         <div class="popup">
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">修改</div>
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">重置密码</div>  
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">启用</div>  
        //           <div class="option-item" onclick="handleTo('${row.LIST_RECORD_ID}')">删除</div>
        //         </div>
        //         <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
        //     `
        //   }
        //   return str;
        // }
      },
      // {
      //   field: 'IsRead', title: '已读', sortable: true, formatter: function (value) {
      //     if (value == 'True' || value == 'true' || value == true) {
      //       return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
      //     }
      //     else {
      //       return '';
      //     }
      //   }
      // },
      // { field: 'DisplayName', title: '标签', sortable: true,
      // formatter: function formatter(value, row) {
      //               var rowId = row.EntityId;
      //               var objectTypeCode=row.ObjectTypeCode;
      //               var name = row["DisplayName"];
      //               var action = "<a style=\"color:#015ba7;font-size:13px;\" href=\"/setup/objmgr/objeview.aspx?t=01I&amp;tsid=09u90000000&amp;id=" + rowId + "&amp;objectTypeCode="+objectTypeCode+"\">" + (name||'') + "</a>";
      //               return action;
      //           } },
      { field: 'UserName', title: '用户名', sortable: true },
      { field: 'FullName', title: '姓名', sortable: true },
      { field: 'EmployeeId', title: '工号', sortable: true },
      { field: 'BusinessUnitId', title: '分支部门', sortable: true },
      { field: 'LastLogin', title: '最后一次登录', sortable: true },
      // {
      //   field: 'IsDisabled', title: '停用', sortable: true, formatter: function (value) {
      //     if (value.indexOf('未选取的') != -1) {
      //       return '';
      //     }
      //     else {
      //       return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
      //     }
      //   }
      // },
      { field: 'DefaultRoleId', title: '角色', sortable: true },
      { field: 'EnhancedProfileId', title: '简档', sortable: true },
      { field: 'PostId', title: '岗位', sortable: true },
      { field: 'mobilephone', title: '手机', sortable: true },
      {
        field: 'ModifiedOn', title: '上次修改时间', sortable: true,
        formatter: function formatter(value, row) {
          var value0 = value ? moment(value).format("YYYY-MM-DD HH:mm") : '';
          return value0;
        }
      },
      { field: 'ModifiedBy', title: '上次修改人', sortable: true },
      // { field: 'IsPublished', title: '已部署', sortable: true,formatter:function (value) {
      //     if (value == 'True' || value == 'true' || value == true) {
      //       return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
      //     }
      //     else {
      //       return '';
      //     }
      //   } },
      // { field: 'IsCustomEntity', title: '自定义', sortable: true,formatter:function (value) {
      //     if (value == 'True' || value == 'true' || value == true) {
      //       return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
      //     }
      //     else {
      //       return '';
      //     }
      //   }  },
    ]
  )
  const serachDeptTree = () => {

  }
  const handleNewUser = () => {
    data.isCommon = true;
  };
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon = params;
  };

  // 条件查询
  const handleSearch = () => {

  }

  // 获取元数据
  const getMetadataInitialLoad = async () => {
    let response;
    await proxy.$get(Interface.listView.getMetadataInitialLoad, {
      entityType: data.entityType,
      // sObjectName: data.sObjectName,
      // name: "",
    }).then(res=>{
      console.log("res1", res);
      response = res;
    })
    return response;
  }
  getMetadataInitialLoad().then(res=>{
    console.log("resAsync", res);
    data.initialData = res.actions[0].returnValue;
    data.currentFilter = {
      id: data.initialData.listViewId,
      name: data.initialData.listViewLabel
    }
    data.title = data.initialData.breadCrumbList[0].label;
    data.queryParams.filterId = data.currentFilter.id;
    getActions();
    getListConfig();
    getFilterList();
  });

  const getActions = () => {
    proxy.$get(Interface.listView.actions, {
      entityApiName: data.sObjectName,
      entityType: data.entityType
    }).then(res=>{
      let actions = res.actions[0].returnValue;
      let actionList = [];
      // actions.forEach(item=>{

      // })
      data.actionList = actions;
    })
  }

  const getListConfig = () => {
    proxy.$get(Interface.listView.getFilterInfo, {
      entityType: data.entityType,
      objectTypeCode: 8,
      search: "",
      filterId: data.currentFilter.id
    }).then(res=>{
      let { fields } = res.actions[0].returnValue;
      fields.forEach(item=>{
        columns.value.push({
          field: item.name,
          title: item.label,
          sortable: true
        });
      })
      gridRef.value.loadGrid(data.queryParams);
    })
  }
  const getFilterList = () => {
    proxy.$get(Interface.listView.filterList, {
      entityType: data.entityType,
      objectTypeCode: 8,
      search: ""
    }).then(res=>{
      data.filterList = res.actions[0].returnValue;
      data.filterListFixed = JSON.parse(JSON.stringify(res.actions[0].returnValue));
      // data.currentFilter = data.filterList[0];
    })
  };
  

  // 右侧菜单操作
const handleMenuClick = (e) => {
  // console.log(e);
  switch (e.key) {
    case "1":
      data.isNewModal = true;
      break;
    case "2":
      data.isExportModal = true;
      break;
    case "3":
      data.isCopyModal = true;
      break;
    case "4":
      data.isRenameModal = true;
      break;
    case "5":
      data.isShareModal = true;
      break;
    case "6":
      data.isShowModal = true;
      break;
    case "7":
      data.isDeleteModal = true;
      break;
  }
};
// 显示筛选器
const handleShowFilter = () => {
  data.isFilterModal = true;
};
const closeFilterModal = () => {
  data.isFilterModal = false;
}
const serachFilter = () => {
  console.log("data.serachFilter", data.searchFilterVal);
  data.filterList = data.filterListFixed.filter(item=>{
    return item.name.indexOf(data.searchFilterVal) !== -1;
  })
}
// 新建用户
const NewUser = () => {
  data.isCommon = true;
}
const handleClickBtn = (devNameOrId) => {
  if (typeof (eval(devNameOrId)) == "function") {
      var result = eval(devNameOrId + "();");
  }else {

  }
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
      /* height: calc(~"100% - 52px"); */
      height: 100%;

      .ant-row {
        height: 100%;

        .wea-left-right-layout-left {
          height: 100%;
          border-right: 1px solid #eaeaea;
          background: #fff;

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
              height: calc(~"100% - 56px");
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

  .home .todo-content .ant-row .wea-left-right-layout-right .wea-left-right-layout-btn {
    top: 45% !important;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid #e2e3e5; */
    padding-bottom: 10px;
    padding: 16px 16px 0 16px;

    .leftAll {
      padding-left: 10px;
      display: flex;
      align-items: center;

      .menuImg {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        background: #4bc076;
        margin-right: 10px;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .menu-box {
        min-width: 130px;

        .label {
          font-size: 14px;
        }

        .row {
          display: flex;
          align-items: center;
          .triggerLinkTextAndIconWrapper{
            display: flex;
            align-items: center;
            border-bottom: 1px solid transparent;
            cursor: pointer;
            position: relative;
            &:hover{
              border-bottom: 1px solid #000;
            }
            h1{
              display: inline-block;
              padding-right: 4px;
              line-height: 1.25;
              font-weight: 700;
              font-size: 18px;
            }
            .fh-svg-icon{
              width: 16px;
              height: 16px;
              line-height: 1;
            }
            .listViewPickerPanel{
              position: absolute;
              top: 120%;
              left: 0;
              width: 598px;
              height: 287px;
              background: #fff;
              z-index: 999;
              padding: 12px 0 0 0;
              border: 1px solid #B6B6B6;
              border-radius: 5px;
              .fh-dropdown__list{
                height: calc(~"100% - 36px");
                overflow-y: auto;
                .fh-dropdown__header{
                  line-height: 1.5;
                  font-weight: 400;
                  padding: 8px 12px;
                  &.fh-text-heading--label{
                    font-size: 12px;
                    line-height: 1.25;
                    color: #444444;
                    text-transform: uppercase;
                    letter-spacing: .0625rem;
                    font-weight: 400;
                  }
                }
                .fh-dropdown__item{
                  line-height: 1.5;
                  font-weight: 400;
                  &:hover{
                    background: #f3f3f3;
                  }
                  a{
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    color: #181818;
                    white-space: nowrap;
                    cursor: pointer;
                  }
                }
                .fh-icon-utility-check{
                  width: 16px;
                  height: 16px;
                  display: inline-block;
                  line-height: 1;
                  color: #747474;
                  margin-right: 12px;
                  font-size: 16px;
                  padding-right: 8px;
                  .fh-svg{
                    width: 14px;
                    height: 14px;
                    color: #0176d3;
                    fill: currentColor;
                  }
                }
              }
            }
          }
        }
      }

      .lockBtn {
        width: 24px;
        height: 24px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #e2e3e5;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        margin-left: 10px;

        .img {
          width: 14px;
          height: 14px;
        }
      }
    }
    .rightBtns{
      display: flex;
    }
  }

  .searchWrap {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    justify-content: flex-end;
    padding: 0 16px;
    padding-bottom: 10px;

    .search-common {
      flex: 1;
    }

    .search-btns {
      display: flex;
    }
  }
  .ant-dropdown-link {
    min-width: 130px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  .iconitem {
    display: inline-block;
    width: 20px;
  }
  .filterModalWrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 321px;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid #dddddd;
    border-left: none;
  }
</style>
<style>
  :where(.css-dev-only-do-not-override-kqecok).ant-tree {
    height: 100% !important;
  }

  :where(.css-dev-only-do-not-override-kqecok).ant-tree .ant-tree-list {
    height: 100% !important;
  }
</style>