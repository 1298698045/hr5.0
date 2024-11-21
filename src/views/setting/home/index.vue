<template>
  <div class="home">
    <div class="todo-content">
      <a-row>
        <a-col span="5" class="wea-left-right-layout-left" v-if="!isCollapsed">
          <div class="wea-left-tree">
            <div class="wea-left-tree-search">
              <a-input v-model:value="value" placeholder="快速查找" style="height: 43px;">
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
            <div class="wea-left-tree-scroll wea-left-tree-scroll1">
              <a-menu :selected-keys="[route.path]" :open-keys="openKeys" mode="inline" theme="light"
                :style="{ height: tableHeight - 0 + 'px' }">
                <template #expandIcon></template>
                <a-menu-item key="/lightning/setup/SetupOneHome/home">
                  <router-link to="/lightning/setup/SetupOneHome/home">主页</router-link>
                </a-menu-item>
                <a-sub-menu key="user">
                  <template v-slot:title>
                     <div class="menuLeftIcon">
                       <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                     </div>
                    <span>用户</span>
                  </template>
                  <a-menu-item key="/lightning/setup/ManageUsers/home/SystemUser/005">
                    <router-link to="/lightning/setup/ManageUsers/home/SystemUser/005">用户</router-link>
                  </a-menu-item>
                  <a-menu-item key="/lightning/setup/EnhancedProfiles/home/Profile/0Yb">
                    <router-link to="/lightning/setup/EnhancedProfiles/home/Profile/0Yb">简档</router-link>
                  </a-menu-item>
                  <a-menu-item key="/lightning/setup/EnhancedProfiles/user/SystemUserProfiles/1">
                    <router-link to="/lightning/setup/EnhancedProfiles/user/SystemUserProfiles/1">简档用户</router-link>
                  </a-menu-item>
                  <a-menu-item key="/lightning/setup/PublicGroups/home">
                    <router-link to="/lightning/setup/PublicGroups/home">公用小组</router-link>
                  </a-menu-item>
                  <a-menu-item key="/lightning/setup/Roles/home">
                    <router-link to="/lightning/setup/Roles/home">角色</router-link>
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="data">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>数据</span>
                  </template>
                </a-sub-menu>
                <a-sub-menu key="application">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>应用程序</span>
                  </template>
                  <a-menu-item key="/lightning/setup/NavigationMenus/home">
                    <router-link to="/lightning/setup/NavigationMenus/home">应用程序管理器</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/home/application/module">
                    <router-link to="/setting/home/application/module">模块管理器</router-link>
                  </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="entityManager">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>对象和字段</span>
                  </template>
                  <a-menu-item key="/lightning/setup/ObjectManager/home">
                    <router-link to="/lightning/setup/ObjectManager/home">对象管理器</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/entityManager1">
                    <router-link to="/lightning/setup/ObjectManager/home">系统任务</router-link>
                  </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="home1">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>流程自动</span>
                  </template>
                </a-sub-menu>

                <a-sub-menu key="moduleSetup">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>模块设置</span>
                  </template>
                  <a-menu-item key="/setting/home/retireSetting">
                    <router-link to="/setting/home/retireSetting">退休规则设置</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/home/jobRuleSetting">
                    <router-link to="/setting/home/jobRuleSetting">工号规则设置</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/home/staffCareSetting">
                    <router-link to="/setting/home/staffCareSetting">员工关怀设置</router-link>
                  </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="defaultCode">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>自定义代码</span>
                  </template>
                </a-sub-menu>

                <a-menu-item key="/setting/home/planTask">
                  <router-link to="/setting/home/planTask">计划任务</router-link>
                </a-menu-item>
                <a-menu-item key="/setting/home/plannedHomework">
                  <router-link to="/setting/home/plannedHomework">计划的作业</router-link>
                </a-menu-item>

                <a-sub-menu key="company">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>公司设置</span>
                  </template>
                  <a-menu-item key="/setting/home/companyInformation">
                    <router-link to="/setting/home/companyInformation">公司信息</router-link>
                  </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="identity">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>身份</span>
                  </template>
                  <a-menu-item key="/setting/home/loginHistory">
                    <router-link to="/setting/home/loginHistory">登陆历史</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/home/operationLog">
                    <router-link to="/setting/home/operationLog">操作日志</router-link>
                  </a-menu-item>
                  <a-menu-item key="/setting/home/browseLog">
                    <router-link to="/setting/home/browseLog">浏览日志</router-link>
                  </a-menu-item>
                </a-sub-menu>

                <a-sub-menu key="home6">
                  <template v-slot:title>
                    <div class="menuLeftIcon">
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-50j7sev6rtt="" data-key="chevronright" class="btnSvg"><g lwc-50j7sev6rtt=""><path d="M179 44l207 205c6 6 6 16 0 22L179 476c-6 6-16 6-22 0l-22-22c-6-6-6-16 0-22l163-161c6-6 6-16 0-22L136 88c-6-6-6-16 0-22l22-22c6-5 15-5 21 0z" lwc-50j7sev6rtt=""></path></g></svg>
                    </div>
                    <span>安全性</span>
                  </template>
                </a-sub-menu>
              </a-menu>
            </div>
          </div>
        </a-col>
        <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
          <div style="height: calc(100%)" ref="contentRef">
            <div class="wea-tabContent" style="height: 100%" ref="tabContent">
              <router-view />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
  import "./home.less";
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    RightOutlined,
    SearchOutlined
  } from "@ant-design/icons-vue";
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
  } from "vue";
  import Interface from "@/utils/Interface.js";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  const { proxy } = getCurrentInstance();

  let data = reactive({
    isCollapsed: false,
    tableHeight: "",
    openKeys: []
  });
  
  const {
    isCollapsed,
    tableHeight, openKeys
  } = toRefs(data);

  if(route.meta.partKey){
    data.openKeys.push(route.meta.partKey);
  }
  data.openKeys.push(route.path);

  const tabContent = ref(null);
  const contentRef = ref(null);
  let formSearchHeight = ref(null);
  const gridRef = ref(null);
  onMounted(() => {
    // console.log("contentRef",contentRef.value.clientHeight)
    // var contentHeight = contentRef.value.clientHeight;
    // var tabsHeight = 46;
    // var height = contentHeight - tabsHeight;
    // data.tableHeight = height;
    // console.log(data.tableHeight)
    changeHeight();
    window.addEventListener("resize", changeHeight);
    console.log(route.path, "route.path");
  });

  function changeHeight(h) {
    if (typeof h == "number") {
      formSearchHeight.value = h;
    }
    let contentHeight = contentRef.value.clientHeight;
    let tabsHeight = 0;
    let height = contentHeight - tabsHeight - formSearchHeight.value;
    data.tableHeight = height + 40;
    console.log("data", data.tableHeight);
    //console.log("gridRef",gridRef.value.loadGrid())
  }

</script>
<style lang="less" scoped>
  .menuLeftIcon{
    display: inline-block;
  }
  .btnSvg{
      width: 12px;
      height: 12px;
      fill: currentColor;
      /* vertical-align: middle; */
      margin-right: 8px;
  }
  .ant-menu-submenu.ant-menu-submenu-open .btnSvg{
    transition: 0.2s transform ease-in-out;
    transform: rotate(90deg)
  }
  .wea-left-tree-search {
    height: auto !important;
    min-height: 35px;
    padding: 0.75rem 0.5rem 0.75rem 1.5rem;
  }

  .todo-head-right :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
    margin-right: 12px;
  }

  .home {
    width: 100%;
    height: calc(~"100vh - 90px");
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
            background: #fff;

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
              height: calc(~"100% - 77px");
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
          /* background-color: #fff; */
          position: relative;
          height: 100%;
          padding: 12px;
          background: rgba(176, 196, 223, 1.0);
          position: relative;
          z-index: 1;

          &::before {
            width: calc(~"100% - 280px");
            position: fixed;
            top: 5.625rem;
            height: 12.5rem;
            content: '';
            display: block;
            right: 0;
            bottom: 0;
            left: 280px;
            background-image: url("~@/assets/img/lightning_blue_background.png");
            background-position: top left;
            background-repeat: no-repeat;
            background-size: cover;
          }

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

  .home .todo-content .ant-row .wea-left-right-layout-left {
    height: 100%;
    max-width: 280px;
  }

  .home .todo-content .ant-row .wea-left-right-layout-right {
    flex: 1;
    max-width: 100%;
  }

  .steupHeaderInfo {
    padding: 8px 16px;
    margin: 2px 0 12px 0;
    background: #f3f3f3;
    border-bottom: 1px solid #c9c9c9;
    border-radius: 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid #c9c9c9;
    position: relative;
    z-index: 1;

    .bLeft {
      .setup-header-element {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;

        .fh-icon_container {
          display: inline-block;
          border-radius: 4px;
          padding: 7px;
          color: #fff;
          background: #2A739E;
          line-height: 1;

          .fh-icon {
            width: 32px;
            height: 32px;
            fill: #fff;
            vertical-align: middle;
          }
        }

        .onesetupBreadcrumbs {
          .breadcrumb {
            font-size: 13px;
            color: #2574A9;
            line-height: 1;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .breadcrumbDetail {
          color: #181818;
          font-weight: 700;
          font-size: 20px;
          line-height: 1.5;
        }

        .uiOutputText {
          padding-top: 8px;
          font-weight: 300;
          font-size: 12px;
        }
      }
    }
  }
</style>
<style lang="less">
  .wea-left-tree-scroll1 {
    .ant-menu {
      background: #fff !important;
      height: 100% !important;

      .ant-menu-item {
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        line-height: 29px;
        height: 29px;
        padding: .375rem 0 .375rem 1rem !important;
        padding-left: .5rem !important;

        &.ant-menu-item-selected {
          background: #eaf1f5 !important;
          box-shadow: #2e739c 4px 0 0 inset;
        }
      }

      .ant-menu-submenu {
        .ant-menu-submenu-title {
          width: 100% !important;
          margin: 0 !important;
          border-radius: 0 !important;
          line-height: 29px;
          height: 29px;
          padding: .375rem 0 .375rem 1rem !important;
          padding-left: .5rem !important;
        }

        .ant-menu-item {
          padding-left: 2rem !important;
        }
      }

      .ant-menu-item-only-child {
        height: 31px !important;
      }

      .ant-menu-submenu-arrow {}
    }
  }
  .wea-tabContent{
    position: relative;
    z-index: 1;
  }
</style>