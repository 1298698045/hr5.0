<template>
  <div class="home stdview-layoutWrapper" ref="contentRef">
    <div ref="headFilterRef" class="headFilterRef">
      <div class="headerTop">
        <div class="leftAll">
          <div class="menuImg">
            <img class="img" :src="require('@/assets/task_120.png')" alt="" />
          </div>
          <div class="menu-box">
            <div class="label">{{title}}</div>
            <div class="row">
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
                    <li class="fh-dropdown__item" v-for="(item, index) in filterList" :key="index" @click.stop="handleSwitchFilter(item,index)">
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
            <div class="fh-btn-group ml10" v-if="Array.isArray(item)">
                <div class="fh-btn" v-for="(row, idx) in item" :key="idx" @click="handleClickBtn(row.devNameOrId)">{{row.label}}</div>
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
          <a-input placeholder="搜索此列表..." style="width: 240px;" v-model:value="data.queryParams.search" @change="handleSearch" allowClear>
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
    <div class="todo-content" :style="{height:(tableHeight-40)+'px'}">
      <a-row>
          <a-col
            span="3"
            class="wea-left-right-layout-left"
            v-if="!isCollapsed"
          >
            <div class="wea-left-tree">
              <div class="deptTree-config">
                <span class="label">部门</span>
                <div class="tree-switch">
                  <a-checkbox v-model:checked="checkable"></a-checkbox>
                </div>
              </div>
              <div class="wea-left-tree-search">
                <a-input-search
                  v-model:value="searchVal"
                  placeholder="输入查询流程分类"
                  @change="onSearch"
                />
              </div>
              <div class="wea-left-tree-scroll">
                <!-- <a-tree
                  :style="{height: tableHeight+'px'}"
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="gData"
                  block-node
                  :fieldNames="fieldNames"
                  @select="onSelect"
                  @expand="onExpand"
                >
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined
                      :class="switcherCls"
                      style="color: rgb(163, 163, 163); font-size: 14px"
                    ></CaretDownOutlined>
                  </template>
                </a-tree> -->
                <tree-dept :height="tableHeight" :fieldNames="fieldNames" :checkable="checkable" :searchField="searchField" @change="changeTree"></tree-dept>
              </div>
            </div>
          </a-col>
          <a-col
            :span="isCollapsed ? '24' : '21'"
            class="wea-left-right-layout-right"
          >
            <div
              class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
              :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }"
              @click="handleCollapsed"
            ></div>
            <div style="height: 100%" ref="contentRef">
              <div class="wea-tab">
                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                  <a-tab-pane v-for="(item,index) in tabs" :key="index">
                    <template #tab>
                      <span>
                        {{item.label}}
                      </span>
                    </template>
                  </a-tab-pane>
                </a-tabs>
                <div class="tabsBtn">
                  <!-- <a-button type="primary" class="ml10" @click="handleNew">新建</a-button>
                  <a-button type="primary" class="ml10">批量发布</a-button>
                  <a-button class="ml10">批量取消发布</a-button> -->
                </div>
              </div>
              <div class="wea-tabContent" :style="{height:tableHeight-40+'px'}" ref="tabContent">
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight-40" :isCollapsed="isCollapsed"></Dtable>
                <div class="filterModalWrap" v-if="isFilterModal">
                  <Filter @close="closeFilterModal" :filterId="currentFilter.id" :sObjectName="sObjectName" @success="initLoad" />
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <BtnActions v-show="isDefauleMneuActions" :menuStyle="menuStyle" ref="defaultMenuRef" :style="menuStyle" :listBtnActions="listBtnActions" @change="handleBtnActions" @click.stop />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="listId?'编辑':'新建'" @load="handleSearch" :id="listId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
    <!-- 弹窗 -->
    <NewVue :isShow="isNewModal" v-if="isNewModal" @cancel="isNewModal=false"  @load="getFilterList" :sObjectName="sObjectName" />
    <Copy :isShow="isCopyModal" v-if="isCopyModal" @cancel="isCopyModal=false" @load="getFilterList" :sObjectName="sObjectName" :recordId="currentFilter.id"/>
    <Rename
      :isShow="isRenameModal"
      v-if="isRenameModal"
      @cancel="isRenameModal=false"
      @load="getFilterList" :sObjectName="sObjectName" :recordId="currentFilter.id"
    />
    <export-field
      :isShow="isExportModal"
      v-if="isExportModal"
      @cancel="isExportModal=false"
      :sObjectName="sObjectName" :recordId="currentFilter.id"
    ></export-field>
    <share-setting
      :isShow="isShareModal"
      v-if="isShareModal"
      @cancel="isShareModal=false"
      @load="getFilterList" :sObjectName="sObjectName" :recordId="currentFilter.id"
    ></share-setting>
    <show-field
      :isShow="isShowModal"
      v-if="isShowModal"
      @cancel="isShowModal=false"
      @load="getListConfig" :sObjectName="sObjectName" :recordId="currentFilter.id"
    ></show-field>
    <Delete
      :isShow="isDeleteModal"
      v-if="isDeleteModal"
      @cancel="isDeleteModal=false"
      :desc="data.desc.type"
      @ok="getFilterList" 
      :sObjectName="sObjectName"
      :recordId="currentFilter.id"
    />
    <CommonDelete
      :isShow="isCommonDelete"
      v-if="isCommonDelete"
      @cancel="isCommonDelete=false"
      :deleteInfo="data.deleteInfo"
      @ok="getTreeData" 
    />
    <Calculate
      :isShow="isCalculate"
      v-if="isCalculate"
      @cancel="isCalculate=false"
      :CalculateInfo="data.CalculateInfo"
      @ok="handleSearch" 
    />
    <ChangeBusinessUnitParentModel
      :isShow="isChangeBusinessUnitParent"
      v-if="isChangeBusinessUnitParent"
      @cancel="isChangeBusinessUnitParent=false"
      :ids="listIds"
      @ok="handleSearch" 
    />
    <MergeBusinessUnitModel
      :isShow="isMergeBusinessUnit"
      v-if="isMergeBusinessUnit"
      @cancel="isMergeBusinessUnit=false"
      @ok="handleSearch" 
    />
    <BatchUpdateModel
      :isShow="isBatchUpdate"
      v-if="isBatchUpdate"
      @cancel="isBatchUpdate=false"
      @load="handleSearch"
      :sObjectName="sObjectName"
      :ids="listIds"
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
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import TreeDept from "@/components/TreeDept.vue";

  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  //通用弹窗
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  // 新建列表视图
  import NewVue from "@/components/listView/New.vue";
  import Copy from "@/components/listView/Copy.vue";
  import Rename from "@/components/listView/Rename.vue";
  import ShareSetting from "@/components/listView/ShareSetting.vue";
  import ExportField from "@/components/listView/ExportField.vue";
  import ShowField from "@/components/listView/ShowField.vue";
  import Delete from "@/components/listView/Delete.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";
  // 操作按钮弹层
  import CommonDelete from "@/components/listView/CommonDelete.vue";
  import Calculate from "@/components/BusinessUnit/home/Calculate.vue";
  import ChangeBusinessUnitParentModel from "@/components/BusinessUnit/home/ChangeBusinessUnitParentModel.vue";
  import MergeBusinessUnitModel from "@/components/BusinessUnit/home/MergeBusinessUnitModel.vue";
  import BatchUpdateModel from "@/components/BusinessUnit/home/BatchUpdateModel.vue";

  import BtnActions from "@/components/listView/BtnActions.vue";
  import { getCommonDeptTree } from "@/utils/commonApi.js";
  import moment from "moment";
  import { formTreeData } from "@/utils/common.js";
  const headFilterRef = ref(null);

  const defaultMenuRef = ref(null);

  const { proxy } = getCurrentInstance();

  const expandedKeys = ref([]);
  const autoExpandParent = ref(true);

  const gData = ref([]);
  const gDataAll = ref([]);
  //左侧树获取数据
  const getTreeData = async (keys) => {
    let list = await getCommonDeptTree();
    // console.log("res-tree", list);
    // gData.value = list;
    // gDataAll.value = JSON.parse(JSON.stringify(list));
    gData.value = formTreeData(list, 'id', 'parentId');
    gDataAll.value = formTreeData(list, 'id', 'parentId');
  }
  getTreeData();
  //树选择
  const onSelect = (keys) => {
    gridRef.value.loadGrid(data.queryParams);
  };
  //树展开
  const onExpand = (keys) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  
  //数据绑定
  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    fieldNames: {
      children: 'children', title: 'name', key: 'id'
    },
    searchTree: "",
    tabs:[
      {
        label: "全部",
        count: ''
      },
      {
        label: "启用",
        count: ''
      },
      {
        label: "草稿",
        count: ''
      }
    ],
    activeKey: 0,
    queryParams: {
      entityType: route.params.entityType||'004',
      //objectTypeCode: '10',
      search: "",
      filterId: "",
      filterQuery: ""
    },
    isCirculation: false,
    searchVal: "",
    isCategory: false,
    treeId: "",
    id: "",
    isCommon: false,
    currentMenu: "全部",
    isLock: true,
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
    isCommonDelete:false,
    isCalculate:false,
    isChangeBusinessUnitParent:false,
    isMergeBusinessUnit:false,
    isBatchUpdate:false,
    searchFilterVal: "",
    filterListFixed: [],
    entityType: route.params.entityType||'004',
    sObjectName: route.params.sObjectName||'BusinessUnit',
    initialData: {}, // 元数据
    actionList: [],
    title: "",
    desc:{
      type: '如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？',
    },
    deleteInfo:{
      text:'是否确定要删除？',
      url:Interface.delete,
      sObjectName:'BusinessUnit',
      objTypeCode:'004',
      id:''
    },
    CalculateInfo:{
        title:'人员统计',
        text:'是否确定要统计人员？',
        url:''
    },
    listId:'',
    listIds:'',
    objectTypeCode:'10',
    menuStyle: {},
    isDefauleMneuActions: false,
    clickRecordData: {
        index: ""
    },
    listBtnActions: [
      {
        name: "编辑",
        value: "edit"
      },
      {
        name: "删除",
        value: "delete"
      }
    ],
    checkable: true,
    searchField: "BusinessUnitId"
  });


  const handleBtnActions = (item) => {
    console.log('data.clickRecordData', data.clickRecordData);
    let id = data.clickRecordData.id;
    if(item.value=='edit'){
      handleEdit(id);
    }else if(item.value == 'delete'){
      handleDelete(id);
    }
    data.isDefauleMneuActions = false;
  }

  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, searchTree, tabs, isFilterPicker,
    activeKey, isCirculation, isCommon, isLock, filterList, currentFilter,
    isNewModal, isExportModal, isCopyModal, isRenameModal, isShareModal, isShowModal, 
    isDeleteModal, isFilterModal, searchFilterVal, filterListFixed, entityType,objectTypeCode,
     initialData, actionList, title, searchVal,sObjectName,
     isCategory, treeId, id,isCommonDelete,listId,listIds,isCalculate,isChangeBusinessUnitParent,isMergeBusinessUnit,isBatchUpdate,
     menuStyle, isDefauleMneuActions, clickRecordData, listBtnActions, checkable, searchField } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);

  const changeTree = (e) => {
    data.queryParams.filterQuery = e;
    gridRef.value.loadGrid(data.queryParams);
  }
  
  //左侧树搜索
  const onSearch = (e) => {
    gData.value = gDataAll.value.filter(item=>{
      return item.text.indexOf(data.searchVal) !== -1;
    })
  }
  //视图切换
  const handleSwitchFilter = (item,index) => {
    data.currentFilter = {
      id: item.id,
      name: item.name
    };
    data.isFilterPicker = false;
    data.isLock = false;
    data.queryParams.filterId = item.id;
    columns.value = [{
          field: 'ids',
          checkbox: true
        },
        {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {

              // var str = `
              //   <div class="iconBox">
              //     <div class="popup">
              //       <div class="option-item" onclick="handleEdit('${row.LIST_RECORD_ID}')">编辑</div>  
              //       <div class="option-item" onclick="handleDelete('${row.LIST_RECORD_ID}')">删除</div>  
              //     </div>
              //     <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
              // `
              var id = row.LIST_RECORD_ID;
              var str = `
                  <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                  </a>
                `
              return str;
            }
        }];
    data.activeKey = index;
    //data.queryParams.activeKey = index;
    getListConfig();
  };
  //固定视图
  const handleLock = () => {
    data.isLock = !data.isLock;
    if(!data.isLock){return false}
    let url = Interface.listView.pinListView;
    let d = {
        actions:[{
            id: "7696;a",
            descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
            callingDescriptor: "UNKNOWN",
            params: {
                entityKeyPrefixOrApiName: data.sObjectName,
                listViewIdOrName: data.currentFilter.id
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
      if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
        Toast("固定成功");
      }
      else{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].errorMessage){
              Toast(res.actions[0].errorMessage);
          }
          else{
              Toast("固定失败");
          }
      }
    })
  };
  onMounted(() => {
    changeHeight()
    //window.addEventListener('resize', changeHeight);
    setTimeout(function () {
      //window.dispatchEvent(new Event('resize'))
    })
    window.addEventListener('click',()=>{
      data.isFilterPicker = false;
      data.isDefauleMneuActions = false;
    })
  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let headFilterHeight = headFilterRef.value?headFilterRef.value.clientHeight:10;
    let contentHeight = contentRef.value?contentRef.value.clientHeight:20;
    data.tableHeight = contentHeight - headFilterHeight - 0;
    console.log(contentHeight,headFilterHeight,data.tableHeight);
    // console.log('tableHeight', data.tableHeight);
    // console.log("gridRef", gridRef.value.loadGrid())
    // gridRef.value.loadGrid(data.queryParams);
  }

const DelegateRef = ref();

function handleTo(WFRuleLogId){
    console.log("WFRuleLogId",WFRuleLogId);
    router.push({
      path:"/detail",
      query: {
        id: WFRuleLogId
      }
    });
}

window.handleTo = handleTo;
window.data = data;

    const handleClickActions = (event,index,id) =>{
      let windowHeight = window.document.documentElement.clientHeight;
      event.stopPropagation();
      let dom = document.querySelector("#btnMenu_"+index);
      let rect = dom.getBoundingClientRect();
      let top = rect.top - 90 + 12;
      let left = rect.left - 12 + 16;
      let menuActionsHeight = defaultMenuRef.value.height;
      if((windowHeight - rect.top) < menuActionsHeight){
        top = top - menuActionsHeight - 12;
      }
      data.menuStyle = {
        top: top + "px",
        left: left + "px"
      };
      if(data.clickRecordData.index == index) {
        data.isDefauleMneuActions = !data.isDefauleMneuActions;
      } else {
        data.isDefauleMneuActions = true;
      }
      data.clickRecordData.index = index;
      data.clickRecordData.id = id;
    };
    window.handleClickActions = handleClickActions;

    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    //列表接口
    const gridUrl = ref(Interface.listView.list);
    const columns = ref(
      [
        {
          field: 'ids',
          checkbox: true
        },
        {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {
              // var str = `
              //   <div class="iconBox">
              //     <div class="popup">
              //       <div class="option-item" onclick="handleEdit('${row.LIST_RECORD_ID}')">编辑</div>  
              //       <div class="option-item" onclick="handleDelete('${row.LIST_RECORD_ID}')">删除</div>
              //     </div>
              //     <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
              // `
              var id = row.LIST_RECORD_ID;
              var str = `
                  <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                  </a>
                `
              return str;
            }
        },
        // {
        //     field: 'Name',
        //     title: '名称',
        //     sortable: true,
        //     formatter: function formatter(value, row, index) {
        //         return value;
        //     }
        // },
      ]
    )
    
    const changeTab = (e) => {
      const item=(data.tabs)[e];
      handleSwitchFilter(item,e);
      //data.activeKey = e;
      //data.queryParams.activeKey = e;
      //gridRef.value.loadGrid(data.queryParams);
    }
    //列表新建
    const New = () => {
      data.listId = '';
      data.isCommon = true;
    }
    //列表编辑
    const handleEdit = (key) => {
      data.listId=key;
      data.isCommon = true;
    }
    window.handleEdit=handleEdit;
    //列表删除
    const handleDelete= (key) => {
      data.listId=key;
      data.deleteInfo.id=key;
      data.isCommonDelete = true;
    }
    window.handleDelete=handleDelete;

  // 列表新建/编辑弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon=false;
  };

  // 列表查询
  const handleSearch = () => {
    gridRef.value.loadGrid(data.queryParams);
  }

  // 获取元数据
  const getMetadataInitialLoad = async () => {
    let response;
    await proxy.$get(Interface.listView.getMetadataInitialLoad, {
      name: "",
      entityType: data.entityType||'004',
      sObjectName: data.sObjectName||'BusinessUnit'
    }).then(res=>{
      console.log("res1", res);
      response = res;
    })
    return response;
  }
  const initLoad = () => {
    columns.value = [{
          field: 'ids',
          checkbox: true
        },
        {
          field: "Action",
          title: "操作",
          formatter: function formatter(value, row, index) {
            var id = row.LIST_RECORD_ID;
            var str = `
                <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                </a>
              `
            return str;
          }
    }];
    getMetadataInitialLoad().then(res=>{
      console.log("resAsync", res);
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        data.initialData = res.actions[0].returnValue;
        data.currentFilter = {
          id: data.initialData.listViewId,
          name: data.initialData.listViewLabel||'全部'
        }
        data.title = data.initialData&&data.initialData.breadCrumbList&&data.initialData.breadCrumbList.length?data.initialData.breadCrumbList[0].label:'';
        data.queryParams.filterId = data.currentFilter.id;
        data.initialData.entityListViewPermissions.canCreateListView=true;
      }
      getActions();
      getListConfig();
      getFilterList();
    }).catch(error => {
      // 处理错误
      console.error(error);
    });
  };
  initLoad();

  //获取操作按钮
  const getActions = () => {
    proxy.$get(Interface.listView.actions, {
      entityApiName: data.sObjectName||'BusinessUnit',
      entityType: data.entityType||'004'
    }).then(res=>{
      let actions = [
          [
            {
              devNameOrId:'handleNew',label:'新建'
            },
            {
              devNameOrId:'Import',label:'导入'
            },
            {
              devNameOrId:'BatchUpdate',label:'批量修改'
            },
            {
              devNameOrId:'ViewOrgChart',label:'图形结构'
            },
            {
              devNameOrId:'MergeBusinessUnit',label:'撤销部门'
            },
            {
              devNameOrId:'ChangeBusinessUnitParent',label:'变更父部门'
            },
            {
              devNameOrId:'BusinessUnitPeopleStat',label:'人员统计'
            },
          ]
      ];
      // actions.forEach(item=>{

      // })
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
         actions = res.actions[0].returnValue;
      }
      let actionList = res.actions[0].returnValue;
      let temp = [];
      for (let i = 0; i < actionList.length; i++) {
          let item = actionList[i];
          if (item.isSeparator) {
              temp.push([item]);
          } else {
              if (Array.isArray(temp[temp.length - 1])) {
                  temp[temp.length - 1].push(item);
              } else {
                if(temp.length == 0){
                  (temp[0] ||= []).push(item);
                }
              }
          }
      };
      console.log("isSeparator", temp);
      data.actionList = temp;
    })
  }

  //获取显示列
  const getListConfig = () => {
    proxy.$get(Interface.listView.getFilterInfo, {
      entityType: data.entityType||'004',
      objectTypeCode: data.objectTypeCode||'10',
      search: "",
      filterId: data.currentFilter.id
    }).then(res=>{
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        let { fields } = res.actions[0].returnValue;
        fields.forEach(item=>{
          columns.value.push({
            field: item.name,
            title: item.label,
            sortable: true
          });
        })
      }
      gridRef.value.loadGrid(data.queryParams);
    })
  }

  // 获取tabs
  const getFilterList = () => {
    proxy.$get(Interface.listView.filterList, {
      entityType: data.entityType||'004',
      //objectTypeCode: '10',
      search: ""
    }).then(res=>{
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        data.filterList = res.actions[0].returnValue;
        data.filterListFixed = JSON.parse(JSON.stringify(res.actions[0].returnValue));
        //console.log(data.filterList)
        // data.filterList=[
        //   {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "全部",
        //       name: "全部",
        //       selected: true,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        //   {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "启用",
        //       name: "启用",
        //       selected: false,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        //   {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "草稿",
        //       name: "草稿",
        //       selected: false,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        // ]
        // data.filterListFixed=[
        // {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "全部",
        //       name: "全部",
        //       selected: true,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        //   {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "启用",
        //       name: "启用",
        //       selected: false,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        //   {
        //       disabled: false,
        //       id: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C",
        //       label: "草稿",
        //       name: "草稿",
        //       selected: false,
        //       value: "0531EACB-8701-4398-A16F-4C0A6F7CDD3C"
        //   },
        // ]
        data.tabs=data.filterList;
      }
      // data.currentFilter = data.filterList[0];
    })
  };
  

  // 列表视图菜单操作
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
// 关闭筛选器
const closeFilterModal = () => {
  data.isFilterModal = false;
}
// 查询筛选器
const serachFilter = () => {
  console.log("data.serachFilter", data.searchFilterVal);
  data.filterList = data.filterListFixed.filter(item=>{
    return item.name.indexOf(data.searchFilterVal) !== -1;
  })
}

//操作按钮
const handleClickBtn = (devNameOrId) => {
  if (typeof (eval(devNameOrId)) == "function") {
      var result = eval(devNameOrId + "();");
  }else {

  }
}

//导入
const Import=(e)=>{
  //data.isCalculate=true;

}
//批量修改
const BatchUpdate=(e)=>{
  let list=gridRef.value.getCheckList();
  if(list&&list.length){
    let Ids = list.map((item) => {
      return item.LIST_RECORD_ID;
    });
    data.listIds=Ids.join(',');
    data.isBatchUpdate=true;
  }
  else{
    data.listIds='';
    Toast("请选择要编辑的行");
  }  
}
//图形结构
const ViewOrgChart=(e)=>{
  //data.isCalculate=true;
  
}
//撤销部门
const MergeBusinessUnit=(e)=>{
  data.isMergeBusinessUnit=true;
}
//变更父部门
const ChangeBusinessUnitParent=(e)=>{
  let list=gridRef.value.getCheckList();
  if(list&&list.length){
    let Ids = list.map((item) => {
      return item.LIST_RECORD_ID;
    });
    data.listIds=Ids.join(',');
    data.isChangeBusinessUnitParent=true;
  }
  else{
    data.listIds='';
    Toast("请选择要变更的部门");
  }
}
//人员统计
const BusinessUnitPeopleStat=(e)=>{
  data.isCalculate=true;
  data.CalculateInfo={
    title:'人员统计',
    text:'是否确定要统计人员？',
    url:''
  }
}
</script>
<style lang="less">
    @import "@/style/flow/treeList.less";
    @import "@/style/stdlistView/stdList.less";
</style>
<style lang="less" scoped>
  .home .headFilterRef{
    padding-top: 0px !important;
  }
  .headerTop{
    padding-bottom: 0px !important;
  }
  .deptTree-config{
    height: 40px;
    border-bottom: 1px solid #e2e3e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .tree-switch{
      .treeIcon{
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
        color: #666;
        margin-left: 10px;
        &:hover{
          color: #3399ff;
        }
        &.active{
          color: #3399ff;
        }
      }
    }
  }
  .wea-left-tree-scroll{
    height: calc(100% - 96px) !important;
  }
</style>