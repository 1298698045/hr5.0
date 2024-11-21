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
    <div class="todo-content" :style="{height:(tableHeight-12)+'px'}">
      <a-row>
          <a-col
            span="3"
            class="wea-left-right-layout-left"
            v-if="!isCollapsed"
          >
            <div class="wea-left-tree">
              <div class="wea-left-tree-search">
                <a-input-search
                  v-model:value="searchVal"
                  placeholder="输入查询流程分类"
                  @change="onSearch"
                />
              </div>
              <div class="wea-left-tree-scroll">
                <a-tree
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
                  <!-- <template  #title="{ name, text, key }">
                    <a-dropdown :trigger="['contextmenu']">
                        <div class="treeRow">
                            <span>{{ name }}</span>
                            <span class="num">{{text}}</span>
                        </div>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item key="1" @click="handleAddCategory(key)">添加分类</a-menu-item>
                            <a-menu-item key="2" @click="handleEditCategory(key)">编辑</a-menu-item>
                            <a-menu-item key="3" @click="handleDeleteCategory(key)">删除</a-menu-item>
                          </a-menu>
                        </template>
                    </a-dropdown>
                  </template> -->
                </a-tree>
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
              <div class="wea-tabContent" :style="{height:tableHeight-12+'px'}" ref="tabContent">
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight-12" :isCollapsed="isCollapsed"></Dtable>
                <div class="filterModalWrap" v-if="isFilterModal">
                  <Filter @close="closeFilterModal" />
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
    </div>
    <NewCategory v-if="isCategory" @cancel="cancelCategory" :isShow="isCategory" :id="treeId" ObjectTypeCode="流程" @load="getTreeData" />
    <EditFlowDefine v-if="isEditFlow" :isShow="isEditFlow" :id="id" @cancel="cancelEditFlowDefine" />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="listId?'编辑':'新建'" @load="handleSearch" :id="listId" :objectTypeCode="entityType" :entityApiName="sObjectName"></common-form-modal>
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
    <div class="defaultMenu" ref="defaultMenuRef" :style="menuStyle" v-show="isDefauleMneuActions" @click.stop>
      <div class="menuActions" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
        <div class="menuItem" @click="handleEdit">编辑</div>
        <div class="menuItem">查看</div>
      </div>
    </div>
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
  import ListFormSearch from "@/components/ListFormSearch.vue";

  import NewCategory from "@/components/workflow/NewCategory.vue";
  import EditFlowDefine from "@/components/workflow/EditFlowDefine.vue";
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
  import CommonDelete from "@/components/listView/CommonDelete.vue";
  // 筛选器弹层
  import Filter from "@/components/listView/Filter.vue";

  import moment from "moment";
  import { formTreeData } from "@/utils/common.js";
  //const { proxy } = getCurrentInstance();
  const headFilterRef = ref(null);
  const defaultMenuRef = ref(null);
  const x = 3;
  const y = 2;
  const z = 1;
  const { proxy } = getCurrentInstance();
  const genData = [];
  const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || "0";
    const tns = _tns || genData;
    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({
        title: key,
        key,
      });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  };
  generateData(z);
  const dataList = [];
  const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({
        key,
        title: key,
      });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(genData);
  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };
  const expandedKeys = ref([]);
  const searchValue = ref("");
  const autoExpandParent = ref(true);
  const res = require("/public/localData/treedata.json");
  const gData = ref([]);
  const gDataAll=ref([]);
  const getTreeData = (keys) => {
    // proxy.$get(Interface.flow.processTree,{}).then((res)=>{
    //   console.log("res-processTree",res);
    //   let listData = res.data;
    //   let formTree = (list) => {
    //     list.forEach(item=>{
    //       if(item.children){
    //         formTree(item.children);
    //       }
    //       item.key = item.id;
    //       item.value = item.id;
    //     })
    //   }
    //   formTree(listData);
    //   console.log("formTree",listData)
    //   gData.value = listData;
    //   gDataAll.value = listData;
    // })
    proxy.$get('/localData/treedata_dept.json', {}).then((res) => {
      gData.value = formTreeData(res.rows, 'id', 'pid');
      gDataAll.value = formTreeData(res.rows, 'id', 'pid');
    });
  }
  getTreeData();
  // console.log("genData",genData,treeList)
  const onSelect = (keys) => {
    gridRef.value.loadGrid(data.queryParams);
  };
  const onExpand = (keys) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  // watch(searchValue, (value) => {
  //   const expanded = dataList
  //     .map((item) => {
  //       if (item.title.indexOf(value) > -1) {
  //         return getParentKey(item.key, gData.value);
  //       }
  //       return null;
  //     })
  //     .filter((item, i, self) => item && self.indexOf(item) === i);
  //   expandedKeys.value = expanded;
  //   searchValue.value = value;
  //   autoExpandParent.value = true;
  // });

  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    fieldNames: {
      children: 'children', title: 'text', key: 'id'
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
      filterId: ""
    },
    isModal: false,
    isCirculation: false,
    isNew: false,
    searchVal: "",
    isCategory: false,
    treeId: "",
    isEditFlow: false,
    id: "",
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
    searchFilterVal: "",
    filterListFixed: [],
    entityType: route.params.entityType||'004',
    sObjectName: route.params.sObjectName||'BusinessUnit',
    initialData: {}, // 元数据
    actionList: [],
    title: "",
    desc:{
      type: '如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？',
      // default:
    },
    deleteInfo:{
      text:'是否确定要删除该分类？',
      url:Interface.delete,
      sObjectName:'ItemTree',
      objTypeCode:'100200',
      id:''
    },
    listId:'',
    isDefauleMneuActions: false,
    clickRecordData: {
      index: ""
    },
    menuStyle:""
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, fieldNames, searchTree, tabs, isFilterPicker,
    activeKey, isModal, isCirculation, isCommon, isLock, filterList, currentFilter,
    isNewModal, isExportModal, isCopyModal, isRenameModal, isShareModal, isShowModal, 
    isDeleteModal, isFilterModal, searchFilterVal, filterListFixed, entityType,
     initialData, actionList, title, isNew, searchVal,sObjectName,
     isCategory, treeId, isEditFlow, id,isCommonDelete,listId, isDefauleMneuActions, clickRecordData, menuStyle } = toRefs(data);
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  
  const onSearch = (e) => {
    gData.value = gDataAll.value.filter(item=>{
      return item.text.indexOf(data.searchVal) !== -1;
    })
  }
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

              var str = `
                <div class="iconBox">
                  <div class="popup">
                    <div class="option-item" id=${row.WFRuleLogId} onclick="handlePermSeeting('${row.LIST_RECORD_ID}')">权限设置</div>
                    <div class="option-item" onclick="handleEdit('${row.LIST_RECORD_ID}')">编辑基本信息</div>  
                    <div class="option-item">设计流程</div>  
                  </div>
                  <svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>
              `
              return str;
            }
        }];
    data.activeKey = index;
    //data.queryParams.activeKey = index;
    getListConfig();
  };
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

  // 获取tabs
  const getTabs = () => {
    proxy.$get(Interface.todoList.tabs,{
      a: 1
    }).then(res=>{
      console.log("tabs",res)
      data.tabs = res.list;
    })
  }
  // getTabs();

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
const EditFlow = (id) => {
  console.log("id",id);
  data.id = id;
  data.isEditFlow = true;
}
const DelegateData = reactive({
  params: {}
})
const CirculationData = reactive({
  params: {}
})
const updateStatus = (e) => {
  data.isModal = e;
  data.isCirculation = e;
}
// 委派
function DelegateFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
  // console.log("RuleLogId",RuleLogId, DelegateRef);
  DelegateData.params = {
    InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
  }
  console.log(DelegateData.params)
  data.isModal = true;
}
function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
  CirculationData.params = {
    InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
  }
  data.isCirculation = true;
}
const handlePermSeeting = (id) => {
  router.push({
    name: "FlowSeetingDetail",
    query: {
      id: id
    }
  })
}
window.handlePermSeeting = handlePermSeeting;
window.handleTo = handleTo;
window.EditFlow = EditFlow;
window.data = data;
const formatStatus2 = (val, row, index) => {
    var value = row["StateCode"];
    if (value == "1" || value == "审批通过" || value == "已发布") {
        return "<span style='color:blue;font-weight:bold;'>已发布</span>";
    }
    if (value == "2" || value == "审批未通过") {
        return "<span style='color:red'>审批未通过</span>";
    }
    if (value == "0" || value == "草稿") {
        return "<span style='color:grey'>草稿</span>";
    }
    if (value == "已退回" || value == "退回") {
        return "<span style='color:#8F3A44;font-weight:bold;'>" + value + "</span>";
    }
}
const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.listView.list);
    const columns = ref(
      [
        {
          field: 'ids',
          checkbox: true
        },
        {
          field: "actions",
          title: "操作",
          formatter: (value, row, index) => {
            let id = row.LIST_RECORD_ID;
            var str = `
              <a href="javascript:;" class="btnMenu" id="btnMenu_${index}" onclick="handleClickActions(event,'${index}','${id}')">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="fh-icon fh-icon_xx-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
              </a>
            `;
            return str;
          },
        },
        // {
        //     field: 'Name',
        //     title: '名称',
        //     sortable: true,
        //     formatter: function formatter(value, row, index) {
        //         return value;
        //     }
        // },
        // {
        //     field: "ProcessCode",
        //     title: '流程代码',
        //     sortable: true
        // },
        // {
        //     field: "StateCode",
        //     title: '状态',
        //     sortable: true,
        //     formatter: formatStatus2
        // },
        // {
        //     field: "Position",
        //     title: '显示顺序',
        //     sortable: true
        // },
        // {
        //     field: "EntityType",
        //     title: '关联对象代码',
        //     sortable: true
        // },
        // {
        //     field: "EntityObjectId",
        //     title: '关联对象',
        //     sortable: true
        // },
        // {
        //     field: "EntityLayoutId",
        //     title: '表单',
        //     sortable: true
        // },
        // {
        //     field: "FolderId",
        //     title: '流程分类',
        //     sortable: true
        // },
        // {
        //     field: "ModifiedBy",
        //     title: '上一次修改人',
        //     sortable: true
        // },
        // {
        //     field: "ModifiedOn",
        //     title: '上一次修改日期',
        //     sortable: true
        // }
      ]
    )
    const changeTab = (e) => {
      const item=(data.tabs)[e];
      handleSwitchFilter(item,e);
      //data.activeKey = e;
      //data.queryParams.activeKey = e;
      //gridRef.value.loadGrid(data.queryParams);
    }
    //新建
    const handleNew = (e) => {
      //data.isNew = true;
      data.listId='';
      data.isCommon = true;
    }
    //编辑
    const handleEdit = (key) => {
      //data.isNew = true;
      data.listId=key;
      data.isCommon = true;
    }
    window.handleEdit=handleEdit;
    const cancelNew = (e) => {
      //data.isNew = false;
      data.isCommon = false;
    }
    // 添加分类
    const handleAddCategory = (key) => {
        console.log("key:", key);
        data.treeId = '';
        data.isCategory = true;
    }
    // 编辑分类
    const handleEditCategory = (key) => {
        console.log("key:", key);
        data.treeId = key;
        data.isCategory = true;
    }
    // 删除分类
    const handleDeleteCategory=(key) => {
        console.log("key:", key);
        data.treeId = key;
        data.deleteInfo.id=key;
        data.isCommonDelete = true;
    }
    const cancelCategory = (e) => {
        data.isCategory = e;
    };
    const cancelEditFlowDefine = (e) => {
        data.isEditFlow = e;
    }

  const serachDeptTree = () => {

  }
  
  // 通用弹窗关闭
  const handleCommonCancel = (params) => {
    data.isCommon=false;
    //data.isCommon = params;
  };

  // 条件查询
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

  const getActions = () => {
    let obj = {
      actions:[{
        id: "3817;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: null,
          context: "LIST_VIEW",
          entityApiName: data.sObjectName || 'BusinessUnit',
          record: null,
          listNameOrId: data.currentFilter.id,
          size: 5,
          maxWidth: -1,
          actionTypes: [],
          bulkedAction: false,
          actionNames: [],
          enableActionsConfiguration: false,
          isLABPreview: false,
          actionsRequestId: 5
        }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.listView.actions, d).then(res=>{
      let actions = res.actions[0].returnValue;
      data.actionList = actions;
    })
  }

  const getListConfig = () => {
    proxy.$get(Interface.listView.getFilterInfo, {
      entityType: data.entityType||'004',
      objectTypeCode: '10',
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

const handleClickBtn = (devNameOrId) => {
  if (typeof (eval(devNameOrId)) == "function") {
      var result = eval(devNameOrId + "();");
  }else {

  }
}
const handleClickActions = (event,index,id) =>{
    let windowHeight = window.document.documentElement.clientHeight;
    event.stopPropagation();
    let dom = document.querySelector("#btnMenu_"+index);
    let rect = dom.getBoundingClientRect();
    let top = rect.top - 90 + 32;
    let left = rect.left - 12 + 16;
    let menuActionsHeight = defaultMenuRef.value.clientHeight;
    if((windowHeight - rect.top) < menuActionsHeight){
      top = top - menuActionsHeight - 32;
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
</script>
<style lang="less">
    @import "@/style/flow/treeList.less";
    @import "@/style/stdlistView/stdList.less";
</style>
<style lang="less" scoped>
  .home{
    height: 100vh;
  }
  .home .headFilterRef{
    padding-top: 0px !important;
  }
  .headerTop{
    padding-bottom: 0px !important;
  }
  
</style>
<style lang="less">
  .btnMenu{
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #c9c9c9;
      color: #747474;
      /* vertical-align: middle; */
      border-radius: 4px;
      text-align: center;
      &:hover{
          color: var(--textColor);
      }
  }
  .defaultMenu{
    position: absolute;
    top: 0;
    z-index: 999;
    .menuActions{
      background: #fff;
    }
    .menuItem{
      min-width: 98px;
      line-height: 35px;
      cursor: pointer;
      padding: 0 12px;
      &:hover{
        background: #f3f3f3;
      }
    }
  }
</style>