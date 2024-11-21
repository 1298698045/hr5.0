<template>
  <div class="wrapper">
    <div class="steupHeaderInfo">
        <div class="bLeft">
          <div class="setup-header-element">
            <div class="fh-icon_container">
              <svg class="fh-icon" focusable="false" data-key="orders" aria-hidden="true" viewBox="0 0 1000 1000" part="icon"><g><path d="M788 621l-36-17c-5-3-12-3-17 0L520 706c-12 6-27 6-39 0L265 604c-5-3-12-3-17 0l-36 17c-16 8-16 29 0 37l268 127c12 6 27 6 39 0l268-127c17-8 17-30 1-37zm0-140l-37-17c-5-3-12-3-17 0L520 566c-12 6-27 6-39 0L266 464c-5-3-12-3-17 0l-37 17c-16 8-16 29 0 37l268 128c12 6 27 6 39 0l268-127c17-8 17-30 1-38zM212 378l268 127c12 6 27 6 39 0l268-127c16-8 16-29 0-37L519 214c-12-6-27-6-39 0L212 342c-16 7-16 29 0 36z"></path></g></svg>
            </div>
          </div>
          <div class="setup-header-element">
            <div class="onesetupBreadcrumbs">
              <a href="#/lightning/setup/SetupOneHome/home" class="breadcrumb">设置</a>
              >  
              <a href="#/lightning/setup/ObjectManager/home" class="breadcrumb">对象管理器</a>
            </div>
            <h1 class="breadcrumbDetail">{{detail.Label}}</h1>
          </div>
        </div>
    </div>
    <div class="home">
      <div class="todo-content">
        <a-row>
          <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
            <div class="wea-left-tree">
              <div class="wea-left-tree-scroll wea-left-tree-scroll-detail">
                <a-menu :selected-keys="[route.path]" :open-keys="[(route.path).split('/')[2]]" mode="inline"
                  theme="light" :style="{height: (tableHeight-0)+'px'}" @click="handleGoPage">
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view'+queryStr">详细信息</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/FieldsAndRelationships/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/FieldsAndRelationships/view'+queryStr">字段和关系</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/setting/entityDetail/logicField'">
                    <router-link :to="'/setting/entityDetail/logicField'+queryStr">逻辑字段</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/PageLayouts/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/PageLayouts/view'+queryStr">页面布局</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/setting/entityDetail/approvalForm'">
                    <router-link :to="'/setting/entityDetail/approvalForm'+queryStr">审批表单</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/ButtonsLinksActions/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/ButtonsLinksActions/view'+queryStr">按钮、链接和操作</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/CompactLayouts/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/CompactLayouts/view'+queryStr">紧凑型布局</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view7'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view'+queryStr">字段集</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view8'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view'+queryStr">对象限制</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/setting/entityDetail/searchLayout'">
                    <router-link :to="'/setting/entityDetail/searchLayout'+queryStr">搜索布局</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view10'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view'+queryStr">触发器</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/ValidationRules/view'">
                    <router-link :to="'/lightning/setup/ObjectManager/ApiAnomalyEventStore/ValidationRules/view'+queryStr">验证规则</router-link>
                  </a-menu-item>
                  <a-menu-item :key="'/setting/entityDetail/listViewLayout'">
                    <router-link :to="'/setting/entityDetail/listViewLayout'+queryStr">列表视图布局</router-link>
                  </a-menu-item>
                </a-menu>
              </div>
            </div>
          </a-col>
          <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
            <div style="height: 100%" ref="contentRef">
              <div class="wea-tabContent" style="height:100%;" ref="tabContent">
                <router-view v-if="isBook" :detail="detail" />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script setup>
  import "./entityDetail.less";
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  console.log('route', route)
  let data = reactive({
    isCollapsed: false,
    tableHeight: '',
    queryParams: {},
    queryStr: "",
    detail: {},
    isBook: false
  });
  const handleCollapsed = () => {
    data.isCollapsed = !data.isCollapsed;
  };
  const { isCollapsed, tableHeight, queryStr, detail, isBook } = toRefs(data);
  data.queryStr = "?id="+route.query.id+"&objectTypeCode="+route.query.objectTypeCode+"&sObjectName="+route.query.sObjectName;
  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    window.addEventListener('resize', changeHeight);
    // console.log(route.path,'route.path');
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    })
  })
  function changeHeight(h) {
    if (typeof h == 'number') {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 0;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height + 40
    console.log('data', data.tableHeight);
  }
  const getDetail = () => {
    proxy.$get(Interface.objeview.objDetail, {
      id: route.query.id
    }).then(res=>{
      data.detail = res;
      data.isBook = true;
    })
  }
  getDetail();
  const handleGoPage = (e) => {
    if (e.key === route.path) {
      window.location.reload();
    }else {
      router.replace({
        path: e.key,
        query: route.query
      })
    }
  }
</script>
<style lang="less" scoped>
  .wrapper{
      height: calc(~"100vh - 90px");
      padding: 12px;
      background: rgba(176, 196, 223, 1.0);
      position: relative;
      z-index: 1;
      &::before{
          position: fixed;
          top: 5.625rem;
          height: 12.5rem;
          content: '';
          display: block;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url("~@/assets/img/lightning_blue_background.png");
          background-position: top left;
          background-repeat: no-repeat;
          background-size: cover;
      }
    }
  .steupHeaderInfo{
    padding: 16px;
    margin: 2px 0 12px 0;
    background: #f3f3f3;
    border-bottom: 1px solid #c9c9c9;
    border-radius: 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid #c9c9c9;
    position: relative;
    z-index: 1;
    .bLeft{
      .setup-header-element{
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;
          .fh-icon_container{
            display: inline-block;
            border-radius: 4px;
            padding: 7px;
            color: #fff;
            background: #2A739E;
            line-height: 1;
            .fh-icon{
              width: 32px;
              height: 32px;
              fill: #fff;
              vertical-align: middle;
            }
          }
          .onesetupBreadcrumbs{
            .breadcrumb{
              font-size: 13px;
              color: #2574A9;
              line-height: 1;
              &:hover{
                text-decoration: underline;
              }
            }
          }
          .breadcrumbDetail{
            color: #181818;
            font-weight: 700;
            font-size: 20px;
            line-height: 1.5;
          }
      }
    }
  }
  .todo-head-right :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
    margin-right: 12px;
  }

  .home {
    width: 100%;
    height: calc(~"100% - 104px");
    background: #fff;
    border-radius: 4px;
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
          background: url(../../../../src/assets/entity.png);
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
              /* margin-top: 10px; */
              width: 100%;
              height: 100%;
              overflow: auto;
              padding: 16px 0;
              background: #fff;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;

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
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
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

  .home .todo-content .ant-row .wea-left-right-layout-left {
    height: 100%;
    max-width: 280px;
  }

  .home .todo-content .ant-row .wea-left-right-layout-right {
    flex: 1;
    max-width: 100%;
  }

  .entityName {
    font-weight: 700;
    font-size: 18px;
    margin-left: 28px;
    margin-top: 10px;
    width: 230px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
<style lang="less">
  .wea-left-tree-scroll-detail {
    .ant-menu {
      height: 100% !important;
      background: #fff !important;

      .ant-menu-item {
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        line-height: 35px;
        height: 35px;
        padding: .5rem 1.5rem .5rem 2rem !important;

        &.ant-menu-item-selected {
          font-weight: bold !important;
          box-shadow: #4194f9 4px 0 0 inset;
          background: rgba(65, 148, 249, 0.1) !important;

          .router-link-active {
            color: #181818 !important;
          }
        }
      }
    }
  }
</style>