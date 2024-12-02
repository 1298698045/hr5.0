import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
// import Home from "../views/Home.vue";
const Layout = () => import("@/layout/index.vue");
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    component: Layout,
    redirect: "/lightning/setup/SetupOneHome/home",
  },
  {
    path: "/setting",
    name: "设置",
    component: Layout,
    redirect: "/lightning/setup/SetupOneHome/home",
    meta: {
      appName: "sysdata"
    },
    children: [
      {
        path: "/detailCommon",
        name: "DetailCommon",
        component: () => import("../views/detail/detailCommon.vue"),
      },
      {
        path: "/lightning/setup/SetupOneHome/home",
        name: "主页",
        component: () => import("../views/setting/home/index.vue"),
        redirect: "/lightning/setup/SetupOneHome/home",
        meta: {
          tabName: "SetupOneHome"
        },
        children: [
          {
            path: "/lightning/setup/SetupOneHome/home",
            component: () => import("../views/setting/home/recently/index.vue"),
            name: "主页",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
            },
          },
          {
            path: "/lightning/setup/ManageUsers/home/:sObjectName/:entityType",
            component: () =>
              import("../views/setting/home/systemuser/index.vue"),
            name: "用户",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "user",
            },
          },
          {
            path: "/lightning/setup/EnhancedProfiles/home/:sObjectName/:entityType",
            component: () => import("../views/setting/home/profile/index.vue"),
            name: "简档",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "user",
            },
          },
          // {
          //   path: "/lightning/setup/EnhancedProfiles/home",
          //   component: () => import("../views/setting/home/profile/profile.vue"),
          //   name: "简档",
          //   icon: "xinjian",
          //   meta: {
          //     icon: "xinjian",
          //     depth: 3
          //   },
          // },
          {
            path: "/lightning/setup/EnhancedProfiles/user/:sObjectName/:entityType",
            component: () =>
              import("../views/setting/home/profileuser/index.vue"),
            name: "简档用户",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "user",
            },
          },
          {
            path: "/lightning/setup/PublicGroups/home",
            component: () =>
              import("../views/setting/home/sharedGroup/index.vue"),
            name: "SharedGroup",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "user",
            },
          },
          {
            path: "/lightning/setup/Roles/home",
            component: () => import("../views/setting/home/role/index.vue"),
            name: "角色",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "user",
            },
          },
          {
            path: "/lightning/setup/NavigationMenus/home",
            component: () =>
              import("../views/setting/application/application/index.vue"),
            name: "Application",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "application",
            },
          },
          {
            path: "/setting/home/application/module",
            component: () =>
              import("../views/setting/application/module/index.vue"),
            name: "ApplicationModule",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "application",
            },
          },
          {
            path: "/setting/home/planTask",
            component: () => import("../views/setting/home/planTask/index.vue"),
            name: "PlanTask",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "defaultCode",
            },
          },
          {
            path: "/setting/home/plannedHomework",
            component: () =>
              import("../views/setting/home/plannedHomework/index.vue"),
            name: "PlannedHomework",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "defaultCode",
            },
          },
          {
            path: "/setting/home/loginHistory",
            component: () =>
              import("../views/setting/home/loginHistory/index.vue"),
            name: "LoginHistory",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "identity",
            },
          },
          {
            path: "/setting/home/operationLog",
            component: () =>
              import("../views/setting/home/operationLog/index.vue"),
            name: "OperationLog",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "identity",
            },
          },
          {
            path: "/setting/home/browseLog",
            component: () =>
              import("../views/setting/home/browseLog/index.vue"),
            name: "BrowseLog",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "identity",
            },
          },
          {
            path: "/setting/home/retireSetting",
            component: () =>
              import(
                "../views/setting/home/moduleSetting/retireSetting/index.vue"
              ),
            name: "RetireSetting",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "moduleSetup",
            },
          },
          {
            path: "/setting/home/jobRuleSetting",
            component: () =>
              import(
                "../views/setting/home/moduleSetting/jobRuleSetting/index.vue"
              ),
            name: "JobRuleSetting",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "moduleSetup",
            },
          },
          {
            path: "/setting/home/staffCareSetting",
            component: () =>
              import(
                "../views/setting/home/moduleSetting/staffCareSetting/index.vue"
              ),
            name: "StaffCareSetting",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "moduleSetup",
            },
          },
          {
            path: "/setting/home/companyInformation",
            component: () =>
              import("../views/setting/home/companyInformation/index.vue"),
            name: "CompanyInformation",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
              partKey: "companySetup",
            },
          },
        ],
      },
      {
        path: "/lightning/setup/ObjectManager/home",
        name: "对象管理器",
        redirect: "/lightning/setup/ObjectManager/home",
        meta: {
          tabName: "ObjectManager"
        },
        children: [
          {
            path: "/lightning/setup/ObjectManager/home",
            component: () => import("../views/setting/entityManager/index.vue"),
            name: "对象管理器",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
            },
          },
          {
            path: "/setting/newDefineObj",
            component: () => import("../views/setting/newDefineObj/index.vue"),
            name: "NewDefineObj",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              name: "ObjectManager"
            },
          },
        ]
      },
      {
        path: "/setting/entityDetail",
        component: () => import("../views/setting/entityDetail/index.vue"),
        name: "对象详情",
        redirect:
          "/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view",
        meta: {
          tabName: "ObjectManager"
        },
        children: [
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/Details/view",
            component: () =>
              import("../views/setting/entityDetail/detail/index.vue"),
            name: "详细信息",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/FieldsAndRelationships/view",
            component: () =>
              import("../views/setting/entityDetail/field/index.vue"),
            name: "FieldDetail",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/setting/entityDetail/logicField",
            component: () =>
              import("../views/setting/entityDetail/logicField/index.vue"),
            name: "LogicField",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/PageLayouts/view",
            component: () =>
              import("../views/setting/entityDetail/pageLayout/index.vue"),
            name: "PageLayout",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/setting/entityDetail/approvalForm",
            component: () =>
              import("../views/setting/entityDetail/approvalForm/index.vue"),
            name: "ApprovalForm",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/ButtonsLinksActions/view",
            component: () =>
              import("../views/setting/entityDetail/btnAndLink/index.vue"),
            name: "BtnAndLink",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/CompactLayouts/view",
            component: () =>
              import("../views/setting/entityDetail/compactLayout/index.vue"),
            name: "CompactLayout",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/setting/entityDetail/searchLayout",
            component: () =>
              import("../views/setting/entityDetail/searchLayout/index.vue"),
            name: "SearchLayout",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/lightning/setup/ObjectManager/ApiAnomalyEventStore/ValidationRules/view",
            component: () =>
              import("../views/setting/entityDetail/validationRules/index.vue"),
            name: "ValidationRules",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
          {
            path: "/setting/entityDetail/listViewLayout",
            component: () =>
              import("../views/setting/entityDetail/listViewLayout/index.vue"),
            name: "ListViewLayout",
            icon: "xinjian",
            meta: {
              icon: "xinjian",
              depth: 3,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/setting/htmlLayoutEditor",
    component: () =>
      import("../views/setting/entityDetail/htmlLayoutEditor/index.vue"),
    name: "HtmlLayoutEditor",
  },
  {
    path: "/workplan",
    name: "日程管理",
    component: Layout,
    redirect: "/workplan/calendar",
    children: [
      {
        path: "/workplan/calendar",
        component: () => import("../views/scheduleAdmin/calendar/index.vue"),
        name: "日历",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/schedule",
        component: () => import("../views/scheduleAdmin/schedule/index.vue"),
        name: "日程一览表",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
      {
        path: "/workplan/talent",
        component: () => import("../views/scheduleAdmin/talent/index.vue"),
        name: "人才管理",
        icon: "xinjian",
        meta: {
          icon: "xinjian",
        },
      },
    ],
  },
  {
    path: "/report",
    name: "Report",
    component: Layout,
    redirect: "/report/home",
    meta: {
      appName: "ReportEngine"
    },
    children: [
      {
        path: "/lightning/o/Report/home",
        name: "ReportHome",
        component: () => import("../views/report/index.vue"),
        meta: {
          tabName: "report"
        }
      },
      {
        path: "/report/design",
        name: "ReportDesign",
        component: () => import("../views/report/reportDesign/index.vue"),
        meta: {
          tabName: "report"
        }
      },
      {
        path: "/lightning/r/Report/0/view",
        name: "ReportRunHome",
        component: () => import("../views/report/reportRunHome/index.vue"),
        meta: {
          tabName: "report"
        }
      },
    ],
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/detail/detail.vue"),
  },

  {
    path: "/mobileDesign",
    name: "MobileDesign",
    component: () => import("../views/mobileDesign/index.vue"),
  },
  {
    path: "/mobilePreview",
    name: "PreviewMobile",
    component: () => import("../views/mobileDesign/PreviewMobile.vue"),
  },
  {
    path: "/lightning/o/Portal/design1",
    name: "DesignPortal",
    component: () => import("../views/design/index.vue"),
  },
  {
    path: "/portengine",
    name: "portengine",
    // component: Layout,
    redirect: "/lightning/page/Dashboard/design",
    children: [
      {
        path: "/lightning/page/Dashboard/design",
        name: "Design",
        component: () => import("../views/portal/index.vue"),
      },
      {
        path: "/lightning/o/Portal/preview",
        name: "PortalPreview",
        component: () => import("../views/portal/portalPreview.vue"),
      },
    ]
  },
  {
    path: "/lightning/o/Portal/preview",
    name: "Home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/DesignList",
    redirect: "/lightning/o/Portal/home",
    name: "DesignList",
    component: Layout,
    children: [
      {
        path: "/lightning/o/Portal/home/:sObjectName/:entityType",
        name: "DesignListHome",
        component: () => import("../views/listView/index.vue"),
        icon: "DesignListHome",
        meta: {
          icon: "",
        },
      },
    ],
  },
  {
    path: "/BusinessUnit",
    name: "BusinessUnit",
    component: Layout,
    redirect: "/lightning/setup/BusinessUnit/home",
    meta: {
      name: "组织规划",
      appName: "organizationAdmin"
    },
    children: [
      {
        path: "/lightning/setup/BusinessUnit/home",
        name: "BusinessUnitHome",
        component: () => import("../views/BusinessUnit/home/index.vue"),
        icon: "businessunithome",
        meta: {
          name: "组织结构",
          icon: "businessunithome",
          tabName: "OrganizationHome"
        },
      },
      {
        path: "/a01/o",
        name: "Hrpost",
        component: () => import("../views/BusinessUnit/post/index.vue"),
        icon: "hrpost",
        meta: {
          name: "岗位",
          icon: "hrpost",
          tabName: "hrpost"
        },
      }
    ],
  },
  // {
  //   path: "/listView/:sObjectName/:entityType",
  //   name: "ListView",
  //   component: () => import("../views/listView/index.vue"),
  // },
  {
    path: "/listView",
    name: "ListView",
    component: Layout,
    children: [
      {
        path: "/lightning/o/:sObjectName",
        name: "ListView",
        component: () => import("../views/listView/index.vue"),
      },
      {
        path: "/lightning/dashboard/:sObjectName",
        name: "DashboardHome",
        component: () => import("../views/home/home.vue"),
      }
    ]
  },
  {
    path: "/peopleAdmin",
    name: "PeopleAdminParent",
    component: Layout,
    children: [
      {
        path: "/lightning/o/HREmployee/home",
        name: "PeopleAdmin",
        component: () => import("../views/peopleAdmin/home/index.vue"),
        meta: {
          name: "人员管理",
          tabName: "Employee"
        }
      },
      {
        path: "/lightning/o/HREmployee/detail",
        component: () => import("../views/peopleAdmin/detail/index.vue"),
        name: "HREmployeeDetail",
        meta: {
          name: "人员管理",
          tabName: "Employee"
        }
      },
    ]
  },
  {
    path: "/stdList/:sObjectName/:entityType",
    name: "StdList",
    component: () => import("../views/stdListView/stdList/index.vue"),
  },
  {
    path: "/stdTabList/:sObjectName/:entityType",
    name: "StdTabList",
    component: () => import("../views/stdListView/stdTabList/index.vue"),
  },
  {
    path: "/visualEditor/appBuilder.app",
    name: "AppBuilder",
    component: () => import("../views/appBuilder/index.vue"),
  },
  {
    path: "/formDesign",
    component: () => import("../views/formDesign/index.vue"),
    name: "FormDesign",
  },
  {
    path: "/formPreview",
    component: () => import("../views/formPreview/index.vue"),
    name: "FormPreview",
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
  mode: "hash",
});
router.beforeEach((to, from, next) => {
  // 检查是否是 iframe 页面
  if (to.path.startsWith("/iframe")) {
    // 如果是 iframe 页面，则不进行重定向
    next();
  } else {
    // 其他情况继续进行路由导航
    next();
  }
});
export default router;
