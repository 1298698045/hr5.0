import { create } from "js-md5";

// const baseUrl = "http://192.168.1.200:9091/api";
const baseUrl = 'api';
const Interface = {
    // 待办事务
    todoList:{
        treedata: "/localData/treedata.json",
        tabs: "/localData/tabs.json",
        datalist: "/localData/datalist.json"
    },
    formSearch: "/localData/formSearch.json",
    applist: "/localData/applist.json",
    workflow:{
        processList: "/localData/process.search.json",
        ruleCondition: baseUrl + "/aura/workflow/definition/getTransitionDefinition", // 获取规则条件
        getParticipants: baseUrl + "/aura/workflow/definition/activity/getParticipants", // 办理人员 - 获取人员
        saveParticipants: baseUrl + "/aura/workflow/definition/activity/saveParticipants", // 办理人员 - 保存人员
        getPermission: baseUrl + "/aura/workflow/definition/activity/getPermission", // 流程节点权限
        savePermission: baseUrl + "/aura/workflow/definition/activity/savePermission", // 流程节点权限 - 保存权限
        create: baseUrl + "/aura/Workflow/definition/createRecord", // 创建流程
    },
    businessunitList: "/localData/user.businessunit.getlist.json",
    userInfo: "/localData/user.info.get.json",
    instanceList: "/localData/process.instance.related.getlist.json", // 相关事务列表
    files: "/localData/process.instance.file.getlist.json", // 事务附件
    rulelogList: "/localData/process.instance.rulelog.getlist.json", // 事务流转信息,
    readlogList: "/localData/process.instance.readlog.getlist.json", // 阅读记录
    commentList: "/localData/chatter.search.json", // 通用评论列表
    sendComment: "/localData/chatter.post.json", // 发送评论
    // 办理记录
    doRecordList: "/localData/process.instance.finishedtask.search.json",
    // 我的发起
    myStartList: "/localData/process.instance.owner.search.json",
    // 退件箱
    returnBoxList: "/localData/process.instance.canceltask.search.json",
    // 收到的传阅
    receivedCirculationList: "/localData/process.instance.receive.foward.search.json",
    // 我传阅的
    myCirculationList: "/localData/process.instance.foward.search.json",
    // 草稿箱
    draftsList: "/localData/wf.instanceowner.search.json",
    //通用列表和视图
    listView: {
        config: "/localData/entitygrid.config.get.json",
        // list: "/localData/entitygrid.list.json",
        list: baseUrl + "/listview/data/getItems",
        // list: "/listview/filter/listViewPicker",
        handleActions: "/localData/listview.handle.actions.json",
        filterList: baseUrl + "/listview/filter/listViewPicker", // 对象筛选器列表
        getMetadataInitialLoad: baseUrl + "/listview/listViewManager/getMetadataInitialLoad", // 获取元数据
        getFilterInfo: baseUrl + "/listview/listViewManager/getFilterInfo", // 列头
        // actions: baseUrl + "/listview/Actions/handleAction",
        actions: baseUrl + "/aura/ActionsController/handleAction", // 列表视图 - 获取列表上的按钮
        createListView: baseUrl+'/aura/listViewManager/createListView',//创建视图
        updateListView: baseUrl+'/aura/listViewManager/updateListView',//重命名视图、共享设置、选择要显示字段、保存筛选器
        deleteListView: baseUrl+'/aura/listViewManager/deleteListView',//删除视图
        copyListView: baseUrl+'/aura/listViewManager/cloneListView',//复制视图
        getListView: baseUrl+'/aura/listViewManager/getAdditionalMetadata',//获取单个视图/筛选器
        pinListView: baseUrl+'/aura/listViewManager/pinListView',//固定视图
        chartData: baseUrl + "/aura/ObjectHomeChart/getMetadata", // 图表 - 获取列表图表元数据
        chartList: baseUrl + "/aura/listViewManager/pinListView", // 图表 - 获取列表视图图表
        chartItems: baseUrl + "/aura/ObjectHomeChart/getChartItems", // 获取图表数据
        getFilter: "", // 
        saveFilter: baseUrl + "/aura/listViewManager/updateListView", // 保存筛选器
    },

    entityFilter: baseUrl+'/aura/objectmanager/getTemplateMetadata',//获取对象字段元数据,筛选器可选字段
    design: {
        list: "/localData/design/dashboard.data.get.json",
        templateList: "/localData/design/dashboard.widget.data.get.json",
        attrs: "/localData/design/entity.attribute.getlist.json",
        look: "/localData/design/ui.entity.lookup.json"
    },
    mobileDesign: {
        // troughdata: "/localData/mobileDesign/mobileform.layout.troughdata.get.json",
        troughData: baseUrl + "/formbuilder/TroughData",
        layout: "/localData/mobileDesign/mobileform.layout.get.json",
        save: "/localData/mobileDesign/pagelayout.mobile.save.json",
        // renderLayout: "/localData/mobileDesign/mobileform.layout.render.json",
        renderLayout: "/localData/mobileDesign/mobileform.layout.render2.json",
        lookup: "/localData/mobileDesign/entity.lookup.json",
        tree: "/localData/mobileDesign/tree.get.json",
        lookupFilter: "/localData/mobileDesign/entity.lookupfilter.getlist.json",
        lookupSearch: "/localData/mobileDesign/entity.lookup.search.json"
    },
    entityConfig: "/localData/common/entity.config.get.json", // 通用弹窗布局配置
    picklist: "/localData/common/layout.picklistvalues.get.json",
    treeList: "/localData/tree.get.json",
    lookSearch: "/localData/entity.lookup.search.json",
    lookupfilter: "/localData/entity.lookupfilter.getlist.json",
    user: {
        mybusinessUser: "/localData/user/user.mybusiness.getlist.json", // 同部门下用户
        role: "/localData/user/sys.role.search.json", // 角色
        groupList: "/localData/user/sys.group.search.json", // 小组列表
        groupUser: "/localData/user/sys.group.member.search.json", // 小组下用户
        sysUser: "/localData/user/sys.user.search.json",
        usersettings: "/localData/user/sys.usersettings.get.json",
        roleUserList: "/localData/user/sys.rolemember.search.json",
        groupMember: "/localData/user/group.member.list.json",
        addGroupUser: "/localData/user/sys.group.member.add.json", // 添加小组成员
        roleMember: "/localData/user/role.member.list.json",
        addRoleUser: "/localData/user/role.member.add.json",
        roleTree: "/localData/user/role.tree.list.json",
        addRole: "/localData/user/new.entity.saverecord.roles.json", // 新建角色
    },
    profile: {
        addUser: "/localData/user/sys.userprofile.adduser.json",
        get: "/localData/profile/profile.get.json",
        // appList: "/localData/profile/profile.apps.getlist.json",
        appList: baseUrl + "/aura/profileManager/profile/getAuthorizedApplications",
        appGet: "/localData/profile/profile.app.get.json", // 简档-权限-详情
        saveProfileApp: "/localData/profile/profile.app.save.json",
        objList: "/localData/profile/profile.template.getlist.json", // 对象设置列表,
        objDetail: "/localData/profile/profile.template.get.json", // 对象设置详情
        saveObj: "/localData/profile/profile.template.save.json",
        // modulePermList: "/localData/profile/profile.module.getlist.json", // 模块权限列表,
        modulePermList: baseUrl + "/aura/profileManager/profile/getAuthorizedAppTabset", // 模块权限列表
        saveModule: "/localData/profile/profile.module.save.json"
    },
    list: "/localData/entity.grid.search.json",
    saveRecord: "/localData/entity.saverecord.json",
    lookup: "/localData/ui.entity.lookup.json",
    detail: "/localData/entity.detail.get.json",
    application: {
        appList: "/localData/application/app.owner.getlist.json",
        moduleList: "/localData/application/app.systemtab.getlist.json",
        systemtabAdd: "/localData/application/app.systemtab.add.json",
        ownerModuleList: "/localData/application/app.module.owner.getlist.json",
        securityProfile: "/localData/application/security.profile.search.json",
        saveApplication: "/localData/application/application.form.data.save.json",
        navItems: baseUrl + "/aura/appSettings/AvailableNavItem/getList", // 获取系统可用的选项卡列表
        selectedNavItem: baseUrl + "/aura/appSettings/SelectedNavItem/getList", // 获应用下可用选项卡列表
        saveNavItems: baseUrl +  "/aura/appSettings/SelectedNavItems/saveDetails", // 保存选中的选项卡
        selectedProfiles: baseUrl +  "/aura/appSettings/SelectedProfiles/getDetails", // 获取应用选中的简档案
        saveSelectedProfiles: baseUrl +  "/aura/appSettings/UserProfiles/saveDetails", // 保存应用选中的简档
        createApp: baseUrl + "/aura/components/appmanager/createApp", // 新建应用向导 - 保存
        appDetail: baseUrl + "/aura/appSettings/getAppSettingsDetails", // 获取应用基本信息
        createTab: baseUrl + "/aura/components/CustomTab/createTab", // 选项卡 - 新建保存
        editTab: baseUrl + "/aura/components/CustomTab/saveTab", // 选项卡 - 修改保存
    },
    entityAttr: "/localData/entity.attribute.getlist.json",
    fetchList: "/localData/entity.fetch.json",
    moduleSetting: {
        empList: "/localData/moduleSetting/entity.fetch3.json",
        empDetail: "/localData/moduleSetting/entity.detail.get3.json",
        messageTemplate: "/localData/moduleSetting/entity.fetch.messageTemplate.json"
    },
    plannedTasksConfig: "/localData/home/entitygrid.config.get.plannedTasks.json",
    plannedTasks: "/localData/home/entitygrid.list.plannedTasks.json",
    plannedHomeworkConfig: "/localData/home/entitygrid.config.get.plannedHomeworkConfig.json",
    plannedHomework: "/localData/home/entitygrid.list.plannedHomework.json",
    obj:{
        create: baseUrl + "/objectmanager/object/new", // 对象 - 创建
        edit: baseUrl + "/objectmanager/object/editsave", // 对象 - 编辑
        addCategory: baseUrl + "/aura/RecordUi/createRecord", // 新建 分类
        editCategory: baseUrl + "/aura/RecordUi/updateRecord", // 编辑 分类
        publish: baseUrl + "/objectmanager/object/publish", // 发布
    },
    // 对象详情
    objeview: {
        // logicalfield: "/localData/setting/objeview/template.logicalfield.getlist.json", // 逻辑字段
        logicalfield: baseUrl + "/objectmanager/LogicalFieldsDetailList/queryDetails", // 逻辑字段
        // pageLayout: "/localData/setting/objeview/entity.grid.search.json", // 页面布局
        // pageLayout: baseUrl + "/objectmanager/PageLayoutDetailList/queryDetails", // 页面布局
        approvalForm: "/localData/setting/objeview/template.form.getlist.json",
        // compactLayout: "/localData/setting/objeview/AjaxLoadCompactLayouts.json",
        compactLayout: baseUrl + "/objectmanager/CompactLayoutDetailList/queryDetails",
        searchLayout: "/localData/setting/objeview/template.searchlayout.getlist.json",
        // objectmanager: "/localData/setting/objeview/objectmanager.field.search.json",
        objectmanager: baseUrl + "/objectmanager/FieldsAndRelationshipsDetailList/queryDetails",
        // sort: "/localData/setting/objeview/template.field.sort.json",
        addLogic: "/localData/setting/objeview/entity.logicalfield.add.json", // 新建逻辑字段
        approvalRename: "/localData/setting/objeview/entity.form.rename.json", // 审批表单-重命名
        listViewLayout: {
            config: "/localData/setting/objeview/listViewLayout/entity.config.get.json"
        },
        validationRules: {
            // list: "/localData/setting/objeview/validationRules/entitygrid.list.json",
            list: baseUrl + "/objectmanager/ValidationRuleDetailList/queryDetails",
            detail: "/localData/setting/objeview/validationRules/entity.detail.get.json",
            create: baseUrl + "/aura/RecordUi/createRecord"
        },
        changeformmapSave: "/localData/setting/objeview/entity.attributelookup.changeformmap.save.json",
        btnLinkList: baseUrl + "/objectmanager/ButtonsLinksActionsDetailList/queryDetails",
        objDetail: baseUrl + "/objectmanager/objectdetail/detail", // 对象 - 详细信息
        field: {
            detail: baseUrl + "/objectmanager/field/detail",
            editPick: baseUrl + "/objectmanager/field/picklist/itemupdate", // 字段 - 修改下拉选项值
            deleteLVal: baseUrl + "/objectmanager/field/picklist/itemdelete",// 字段 - 删除下拉选项值
            disabled: baseUrl + "/objectmanager/field/picklist/itemdisable",
            sort: baseUrl + "/objectmanager/field/picklist/sort",
            batchAdd: baseUrl + "/objectmanager/field/picklist/batchcreate",
            DependencyList: baseUrl + "/objectmanager/FieldsAndRelationships/DependencyList/query", // 对象字段- 获取字段依赖列表
            DependencyCreate: baseUrl + "/objectmanager/FieldsAndRelationships/Dependency/create", // 对象字段- 新建字段依赖
            DependencyMapDetail: baseUrl + "/objectmanager/FieldsAndRelationships/DependencyMaps/query", // 对象字段- 获取字段依赖详细
            DependencyMapSave: baseUrl + "/objectmanager/FieldsAndRelationships/DependencyMap/save", // 对象字段- 编辑保存字段依赖详细
            DependencyDel: baseUrl + "/objectmanager/FieldsAndRelationships/Dependency/del", // 对象字段- 删除字段依赖
            saveTrack: baseUrl + "/aura/RecordUi/updateRecord", // 保存设置字段历史追踪
            delete: baseUrl + "/objectmanager/field/del", // 对象字段删除
            create: baseUrl + "/objectmanager/object/field/create", // 字段创建
            // edit: baseUrl + "/objectmanager/fieldtype/update", // 字段修改
            // edit: baseUrl + "/objectmanager/field/datatype/update", // 字段修改
            edit: baseUrl + "/objectmanager/field/edit", // 字段修改
        },
        pickList: baseUrl + "/objectmanager/field/picklist/list",
        deleteObj: baseUrl + "/objectmanager/object/delete", // 对象 - 删除
        // 页面布局
        pageLayout: {
            list: baseUrl + "/objectmanager/PageLayoutDetailList/queryDetails", // 页面布局列表
            create: baseUrl + "/aura/RecordUi/createRecord",
            delete: baseUrl + "/aura/RecordUi/delRecord",
            troughData: "/_ui/common/config/layout2/TroughData", // 获取布局糟数据
        },
        saveMap: baseUrl + "/objectmanager/object/field/lookup/saveMap", // 查找字段 - 保存字段映射
        sort: baseUrl + "/objectmanager/object/fields/sort", // 字段排序
    },
    save: "/localData/entity.saverecord.json",
    operationLog: "/localData/home/operationLog.json",
    categoryList: "/localData/tree.get.entitycategory.json",
    filterList: "/localData/entity.filter.getlist.json",
    objAdmin: {
        objTree: baseUrl + "/objectmanager/category/tree",
        list: baseUrl + "/objectmanager/list/all"
    },
    objectHome: baseUrl + "/objectmanager/RecentItems",
    flow: {
        processTree: "/localData/flow/process.statistics.tree.get.json",
        tree: "/localData/flow/tree.get.json",
        treeDetail: "/localData/flow/entity.detail.get.json",
        stepList: "/localData/flow/process.step.getlist.json",
        ruleList: "/localData/flow/process.rule.getlist.json",
        formSearchPerm: "/localData/flow/process.datapri.getlist.json",
        formStartPerm: "/localData/flow/process.usepri.getlist.json",
        processSearch: "/localData/flow/wf.process.search.json",
        list: "/localData/flow/entitygrid.list.json",
        steppri: "/localData/flow/process.steppri.get.json",
        savePerm: "/localData/flow/process.steppri.save.json",
        deptTree: "/localData/flow/tree.dept.get.json",
        userList: "/localData/flow/user.search.json",
        editFlowDefineDetail: "/localData/flow/entity.detail.get.editflowdefine.json",
        editProcess: "/localData/flow/process.edit.json",
        handlePeople: "/localData/flow/process.participantor.save.json", // 办理人员
        handleDetail: "/localData/flow/process.participantor.getlist.json", // 办理人员详情
        workAdminList: "/localData/flow/entity.grid.search.json", // 事务管理列表
        signature: "/localData/flow/process.signature.search.json", // 签名管理
        permissionform: "/localData/flow/process.permissionform.get.json", // 表单查询
        processNodes: "/localData/flow/process.all.nodes.json", // 节点
        jump: "/localData/flow/process.approve.jump.json", // 跳转
        insertapprove: "/localData/flow/process.instance.insertapprove.json", // 加签
        contentTree: "/localData/flow/content.tree.get.json",
        publishtocontent:"/localData/flow/prcoess.instance.publishtocontent.json", // 发布
        addSignature: "/localData/flow/process.signature.upload.json", // 新建签名
        deleteSignature: "/localData/flow/process.signature.delete.json", // 删除签名
        datapriAdd: "/localData/flow/process.datapri.add.json", // 添加用户
        usepriAdd: "/localData/flow/process.usepri.add.json", // 添加筛选器
        files: "/localData/flow/process.instance.file.getlist.json"
    },
    delete: baseUrl + "/aura/RecordUi/delRecord", // 通用删除
    create: baseUrl + "/aura/RecordUi/createRecord", // 通用创建
    edit: baseUrl + "/aura/RecordUi/updateRecord", // 通用编辑
    // 通用弹窗
    formCommon: {
        layout: baseUrl + "/aura/RecordUi/getRecordCreateDefaults"
    },
    pickListValues: baseUrl + "/aura/RecordUi/getPicklistValuesByRecordType", // 获取对象下拉列表字段值
    detail: baseUrl + "/aura/RecordUi/getRecord", // 详情
    lookup: baseUrl + "/aura/Lookup/lookup", // 查找字段搜索
    objFieldData: "/api/aura/objectmanager/getTemplateMetadata", // 获取对象字段元数据
    applist: baseUrl + "/aura/AppLauncher/getAppLauncherMenuData",
    currentApp: baseUrl + "/aura/OneController/getCurrentApp", // 获取模块列表
    list2: baseUrl + "/listview/data/getNodes",
    lookupObj: {
        column: baseUrl + "/aura/Lookup/getTopMetada", // 查找对话框 - 获查找字段和列表显示字段
        list: baseUrl + "/aura/Lookup/getItems", // 查找对话框 - 获查找数据
    },
    information: {
        contentTree: "/localData/information/content.tree.json",
        detail: "/localData/information/entity.recordandlayout.get.json",
        files: "/localData/information/file.attachment.getlist.json",
        tags: "/localData/information/content.tag.getlist.json",
        invite: "/localData/information/content.reader.invite.json",
        readList: "/localData/information/content.news.reader.list.json",
        contentRelated: "/localData/information/content.news.related.list.json",
        like: "/localData/information/content.news.likeordislike.set.json",
        likeDetail: "/localData/information/content.news.content.get.json",
        peopleList: "/localData/information/content.reader.search.json", // 人员信息列表
        tree: "/localData/information/content.item.permission.tree.json",
        categoryList: "/localData/information/content.category.list.json", // 隶属栏目
        attachmentCategory:
        "/localData/information/attachment.category.getlist.json", // 附件分类
        commentList: "/localData/information/chatter.comment.search.json", // 图片评论列表
        sendComment: "/localData/information/chatter.comment.post.json",
        like: "/localData/information/chatter.like.post.json"
    },
    detailObj: {
        actions: baseUrl + "/aura/ActionsController/getRecordActions",
        relatedActions: baseUrl + "/aura/ui/global/components/ActionsManager/RelatedList/handleAction", // 详情页 - 相关列表操作按钮
        relatedListInfo: baseUrl + "/aura/RelatedListUiController/getRelatedListInfoCollection", // 获取对象相关列表信息集合
        relatedListColumn: baseUrl + "/aura/RelatedListUiController/getRelatedListInfoByApiName", // 获取单个相关列表 - 列表显示列
        relatedListActions: baseUrl + "/aura/ui/global/components/ActionsManager/RelatedListRecord/handleAction", // 获取单个相关列表 - 操作按钮
        relatedListData: baseUrl + "/aura/RelatedListUiController/postRelatedListRecords", // 获取单个相关列表 - 数据
        compact: baseUrl + "/aura/RecordUi/Layout/getCompact", // 详情标题 - 紧凑布局
    },
    deptTree: baseUrl + "/one/organization/getBusinessUnitTree",
    report: {
        config: "/localData/report/config.json",
        list: "/localData/report/list.json",
        category: "/localData/report/category.json",
        categoryListData: "/localData/report/tableList.json",
        newReport: baseUrl + "/aura/analytics/reporting/runpage/newReport", // 新建报表
        reportDesign: {
            tree: "/localData/report/reportDesign/tree.json",
            // metaData: "/localData/report/reportDesign/reportMetaData.json",
            metaData: baseUrl + "/aura/analytics/reporting/runpage/describeReport", // 获取报表元数据
            saveReport: baseUrl + "/aura/analytics/reporting/runpage/saveReport", // 报表保存
            // runReport: baseUrl + "/aura/analytics/reporting/runpage/runReport", // 报表运行
            runReport: "/localData/report/reportDesign/runReport.json",
            runReport2: "/localData/report/reportDesign/runReport_group.json",
            describeReport: baseUrl + "/aura/analytics/reporting/runpage/describeReport", // 获取报表元数据
            runReportNew: baseUrl + "/aura/analytics/reporting/runpage/runReport", // 报表运行
        }
    },
    // 表单设计
    formbuilder: {
        troughData: baseUrl + "/formbuilder/TroughData",
    },
    portal: {
        list: "/localData/design/new.portal.data.json",
        layoutList: baseUrl + "/aura/dashboard/describeDashboard", // 获取门户、仪表盘设置
        save: baseUrl + "/aura/dashboard/save",
        saveComponent: baseUrl + "/aura/dashboard/saveComponent",
        loadComponents: baseUrl + "/aura/dashboard/loadComponents", // 加载组件数据
        templateList: baseUrl + "/aura/dashboard/Component/getTemplates", // 获取组件模板列表
    },
    getMapFieldValues: baseUrl + "/aura/Lookup/getMapFieldValues", // 查找字段 - 获取目标对象映射字段值
}
export default Interface;