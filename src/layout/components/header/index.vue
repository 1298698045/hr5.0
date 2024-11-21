<template>
  <div class="pageHeaderWrap">
    <div class="pageHeader">
      <div class="header-item">
        <div class="headerLogo"></div>
      </div>
      <div class="header-item header-item-search">
        <div class="searchDesktop" @click.stop="isSearchDrop=true">
          <a-input-search placeholder="搜索设置"></a-input-search>
          <div class="searchDropBox" v-if="isSearchDrop">
            <div class="listHeader">
              最近项目
            </div>
            <div class="listContent">
              <ul class="lookup-list">
                <li class="lookup-item" v-for="item in 10">
                  <a href="javascript:;">
                    <div class="lookupIcon">
                      <img :src="require('@/assets/img/orders.svg')" alt="">
                    </div>
                    <div class="lookupContent">
                      <p class="formatted-rich-text">Additional Assigned To</p>
                      <p class="formatted-rich-text">对象•Task > 自定义字段定义</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="header-item">
        <ul class="slds-global-actions">
          <li>
            <svg class="slds-icon" focusable="false" data-key="setup" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M468 324l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-29a34 34 0 00-40-14l-45 17a173 173 0 00-58-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46c-22 7-41 19-59 34l-44-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 30a34 34 0 0040 14l45-17c18 16 38 27 58 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48c23-8 43-20 61-37l42 17 12 2c12 0 23-6 29-16l15-26c8-12 4-30-8-40zm-207 47a110 110 0 01-109-110 109 109 0 11218 0 110 110 0 01-109 110zm29-191h-46c-7 0-13 4-15 10l-28 72c-2 5 2 11 8 11h47l-17 60c-2 6 5 9 9 5l71-83c5-5 1-13-6-13h-35l31-49c3-5-1-12-7-12h-12z"></path></g></svg>
          </li>
          <li>
            <svg class="slds-icon slds-icon_xx-small" focusable="false" data-key="notification" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M460 330h-5a35 35 0 01-35-35V180A160 160 0 00252 20c-86 4-152 78-152 165v111c0 19-16 34-35 34h-5c-22 0-40 19-40 41v15c0 7 7 14 15 14h450c8 0 15-7 15-15v-15a40 40 0 00-40-40zM309 440h-98a10 10 0 00-10 12c5 28 30 48 59 48s54-21 59-48a10 10 0 00-10-12z"></path></g></svg>
          </li>
          <li>
            <div class="profileImg" @click.stop="isUserDrop=true">
              <img :src="require('@/assets/img/T.jpg')" alt="">
              <div class="userProfilePanel" v-if="isUserDrop">
                <div class="pointerTop"></div>
                <div class="profileCard">
                  <div class="userAvatar">
                    <img :src="require('@/assets/img/T.jpg')" alt="">
                  </div>
                  <div class="userInfo">
                    <p class="userName">{{userInfo.userName}}</p>
                    <p class="userDomain rowEllipsis">{{userInfo.organizationId}}</p>
                    <div class="profile-card-toplinks">
                      <a href="javascript:;" class="profile-link-label">设置</a>
                      <a href="javascript:;" class="profile-link-label" @click="handleLogout">退出</a>
                    </div>
                  </div>
                </div>
                <div class="profile-card-switcher">
                  <div class="usernames">用户名</div>
                  <ul></ul>
                </div>
                <div class="profile-card-switcher">
                  <div class="usernames">显示密度</div>
                  <div class="listOptions">
                    <div class="listOptionItem active">
                      <span class="iconSvg">
                        <svg class="slds-icon slds-icon-text-default slds-icon_x-small" focusable="false" data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"></path></g></svg>
                      </span>
                      舒适
                    </div>
                    <div class="listOptionItem">
                      <span class="iconSvg">
                      </span>
                      紧凑
                    </div>
                  </div>
                </div>
                <div class="profile-card-switcher">
                  <div class="usernames">选项</div>
                  <div class="profile-card-footer">
                    <div>
                      <a href="javascript:;" class="profile-link-label">切换到 Salesforce Classic</a>
                    </div>
                    <div class="profile-card-addaccount">
                      <a href="javascript:;" class="profile-link-label">添加用户名</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="header">
      <div class="header-top-menu" @click.stop="handleShowApp">
        <svg
          t="1695101729390"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="840"
          width="16"
          height="16"
        >
          <path
            d="M0 0l254.336 0 0 254.272L0 254.272 0 0 0 0zM377.216 0l266.176 0 0 254.272L377.216 254.272 377.216 0 377.216 0zM766.336 0 1024 0l0 254.272-257.664 0L766.336 0 766.336 0zM766.336 378.88 1024 378.88l0 264.448-257.664 0L766.336 378.88 766.336 378.88zM377.216 378.88l266.176 0 0 264.448L377.216 643.328 377.216 378.88 377.216 378.88zM0 378.88l254.336 0 0 264.448L0 643.328 0 378.88 0 378.88zM0 766.272l254.336 0L254.336 1024 0 1024 0 766.272 0 766.272zM377.216 766.272l266.176 0L643.392 1024 377.216 1024 377.216 766.272 377.216 766.272zM766.336 766.272 1024 766.272 1024 1024l-257.664 0L766.336 766.272 766.336 766.272zM766.336 766.272"
            fill="#1055BC"
            p-id="841"
            data-spm-anchor-id="a313x.manage_type_myprojects.0.i3.75903a81GMlAwv"
            class=""
          ></path>
        </svg>
      </div>
      <div class="header-top-text">
        <div class="text"><span>设置</span></div>
        <div class="text text1" :class="{'active':(route.path).indexOf('/lightning/setup/SetupOneHome/home')!=-1}"><span class="text2" @click="goto('/lightning/setup/SetupOneHome/home')">主页</span></div>
        <div class="text text1" :class="{'active':route.path=='/lightning/setup/ObjectManager/home'}"><span class="text2" @click="goto('/lightning/setup/ObjectManager/home')">对象管理器</span></div>
        <div class="text text1"><span class="text2">表单管理</span></div>
        <div class="text text1"><span class="text2">流程管理</span></div>
      </div>
      <div class="header-end">
        <div class="header-info">
          <div class="avatar">
            <img
              class="img"
              src="../../../../src/assets/showEmpAvatar.png"
              alt=""
            />
          </div>
          <div class="info-name">Jackliu</div>
          <div class="info-icon">
            <DownOutlined style="font-size: 10px" />
          </div>
        </div>
      </div>
      <div class="app_popup" v-if="isShow" @click.stop>
        <div class="appList">
          <div class="app_item" v-for="(item,index) in appList" :style="{background:item.BgColor}" :key="index" @click="handleGoModule(item)">
            <div class="appBox">
              <div class="iconBox">
              </div>
              <div class="app-item-label">{{item.Label}}</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="tabHeader">
      <div class="appLauncher">
        <div class="slds-icon-btn" @click.stop="isAppShow=!isAppShow">
          <div class="slds-icon-waffle">
            <div class="slds-r1"></div>
            <div class="slds-r2"></div>
            <div class="slds-r3"></div>
            <div class="slds-r4"></div>
            <div class="slds-r5"></div>
            <div class="slds-r6"></div>
            <div class="slds-r7"></div>
            <div class="slds-r8"></div>
            <div class="slds-r9"></div>
          </div>
        </div>
      </div>
      <div class="appTextName">
        {{currentAppName}}
      </div>
      <ul class="tabBarItems">
        <!-- <li class="tabItem"></li>
        <li class="tabItem" :class="{'active':homeUrl=='/lightning/setup/SetupOneHome/home'}">
          <a href="#/lightning/setup/SetupOneHome/home">主页</a>
        </li>
        <li class="tabItem" :class="{'active':objUrl=='/lightning/setup/ObjectManager/home'}">
          <a href="#/lightning/setup/ObjectManager/home">对象管理器</a>
        </li>
        <li class="tabItem">
          <a href="javascript:;">表单管理</a>
        </li>
        <li class="tabItem" :class="{'active':route.path.indexOf('/wflow')!=-1}">
          <a href="#/wflow/new">流程管理</a>
        </li> -->
        <li class="tabItem" v-for="(item,index) in appTabs" :key="index" :class="{'active':item.name==currentTabName}">
          <a :href="'#'+item.navAction.url">{{item.navAction.label}}</a>
        </li>
      </ul>
    </div>
  </div>
  <div role="dialog" class="uiPanel appLauncherMenu" v-if="isAppShow" @click.stop>
    <div class="container">
      <div class="panelContent scrollable">
        <div class="searchBar">
          <a-input placeholder="搜索应用程序和项目...">
            <template #prefix>
              <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
            </template>
          </a-input>
        </div>
        <h3 class="fh-dropdown__header fh-truncate">应用程序</h3>
        <div class="al-menu-dropdown-list">
          <div class="fh-dropdown__item" v-for="(item, index) in appList" :key="index" @click="handleToAppModule(item)">
            <!-- :href="'#'+item.StartUrl" -->
            <a class="al-menu-item">
              <div class="fh-size_small">
                <div class="fh-m-right_small">
                  <span class="fh-avatar fh-avatar_small">
                    <img :src="require('@/assets/img/logo.png')" alt="">
                  </span>
                </div>
                <div class="al-menu-item-label fh-truncate fh-rich-text-editor__output">
                  <span part="formatted-rich-text"><p class="slds-truncate">{{item.Label}}</p></span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="fh-p-horizontal--small">
          <button class="btnAll" type="button">查看全部</button>
        </div>
      </div>
    </div>
    <div class="pointer" style="position: absolute; left: 8.00549px; top: -10.0101px;"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, toRefs, reactive, createApp, watch, getCurrentInstance } from "vue";
import { DownOutlined, SearchOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const route = useRoute();
const router = useRouter();
// console.log("route", route, router, router.currentRoute.value.matched);

const { proxy } = getCurrentInstance();
const searchVal = ref("");
const isShow = ref(false);
const handleShowApp = () => {
  isShow.value = !isShow.value;
};
watch(searchVal, (newVal, oldVal) => {
  // console.log(newVal, oldVal);
});
const moduleName = ref(store.state.moduleName);

const data = reactive({
  appList: [],
  isSearchDrop: false,
  isUserDrop: false,
  objUrl: "",
  homeUrl: "",
  isAppShow: false,
  appCode: "",
  appTabs: [],
  currentAppName: "",
  userInfo: {},
  currentTabName: ""
})
const { appList, isSearchDrop, isUserDrop, objUrl, homeUrl,
   isAppShow, appCode, appTabs, currentAppName, userInfo, currentTabName } = toRefs(data);

let user = localStorage.getItem('userInfo')
data.userInfo = JSON.parse(user);

const handleToAppModule = (item) => {
  localStorage.setItem("currentAppModule", JSON.stringify(item));
  router.push(item.StartUrl);
  data.isAppShow = false;
}

const getApplication = () => {
  proxy.$get(Interface.applist,{
    systemCode:"HR"
  }).then((res)=>{
    // console.log("res",res) 
    data.appList = res.actions[0].returnValue.apps;
    console.log("route:", route.meta)
    let appName = route.meta.appName;
    // let row = data.appList.find(item=>item.StartUrl == route.path);
    // let row = data.appList.find(item=>route.path.indexOf(item.StartUrl)!=-1);
    // 获取当前路由的 meta  
    const currentRouteMeta = route.meta;  
  
    // 查找父级路由的 meta，假设我们只需要直接父级  
    let parentRouteMeta = {};  
    for (let i = route.matched.length - 2; i >= 0; i--) {  
      const record = route.matched[i];  
      if (record.meta) {  
        parentRouteMeta = record.meta;  
        break; // 找到第一个父级路由的 meta 后退出循环  
      }  
    }
    // console.log("parentRouteMeta:", parentRouteMeta);
    if(currentRouteMeta.tabName){
      data.currentTabName = currentRouteMeta.tabName;
    }else {
      data.currentTabName = parentRouteMeta.tabName;
    }
    let row = data.appList.find(item=>item.Name==appName);
    if(row){
      data.appCode = row.AppCode;
      data.currentAppName =  row.Label;
      getCurrentApp();
    }else {
      let currentAppModule = JSON.parse(localStorage.getItem('currentAppModule'));
      console.log("else", currentAppModule);
      data.currentAppName = currentAppModule.Label;
      data.appCode = currentAppModule.AppCode;
      data.currentAppName =  currentAppModule.Label;
      getCurrentApp();
    }
  })
}


const getIsRouter = () => {
  // if(route.path=='/lightning/setup/ObjectManager/home'){
  //   data.objUrl = route.path;
  // }else {
  //   data.objUrl = '';
  // }
  // if(route.path=='/lightning/setup/SetupOneHome/home'){
  //   data.homeUrl = route.path;
  // }else {
  //   data.homeUrl = '';
  // }
  data.homeUrl = route.path;
  if(route.meta.depth==3){
    const routeMatches = router.currentRoute._value.matched;
    const parentRoute = routeMatches[routeMatches.length - 2];
    const parentRoutePath = parentRoute.path;
    const parentRouteName = parentRoute.name;
    // 输出父路由信息
    console.log('父路由路径:', parentRoutePath);
    console.log('父路由名称:', parentRouteName);
    if(parentRoutePath=='/setting/entityDetail'){
      console.log('123')
      data.objUrl = '/lightning/setup/ObjectManager/home';
    }
    if(parentRoutePath=='/lightning/setup/SetupOneHome/home'){
      data.homeUrl = '/lightning/setup/SetupOneHome/home';
    }
  }
  getApplication();
}
watch(() => route.path,newRoute=> {
  moduleName.value = store.state.moduleName;
  getIsRouter();
},{immediate:true,deep:true})
watch(()=> data.isAppShow, (newVal,oldVal)=>{
  if(newVal){
    // getApplication();
  }
})
onMounted(() => {
  window.addEventListener("click", function (e) {
    isShow.value = false;
    data.isSearchDrop = false;
    data.isUserDrop = false;
    data.isAppShow = false;
  });
});
const handleGoModule = (item) => {
  // console.log("item", item);
  store.commit('setModuleName',item.Label)
  router.push({
      path:"/"+item.DeveloperName
  });
  isShow.value = false;
}
const goto=(url)=>{
  router.push({
      path:url
  });
};
const handleLogout = () => {
  router.push('/login');
};

const getCurrentApp = () => {
  let obj = {
    actions:[{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        appCode: data.appCode
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  }
  proxy.$post(Interface.currentApp, d).then(res=>{
    data.appTabs = res.actions[0].returnValue.tabs;
    if(route.params.sObjectName){
      data.currentTabName = route.params.sObjectName;
    }
  })
};

</script>
<style lang="less">
@import "./header.less";
.header .header-top-menu .text{
    font-size: 15px;
    width: auto;
    margin-left: 10px;
}
.header .header-top-text{
    line-height: 56px;
}
.header .header-top-text .text{
    font-size: 15px;
    width: auto;
    margin-left: 15px;
    margin-right: 10px;
    color:#333;
    float:left;
    height: 55px;
}
.header .header-top-text .text1{
  cursor: pointer;
  margin-left: 0;
  margin-right: 0;
}
.header .header-top-text .text1 .text2{
  padding: 6px 10px;
}
.header .header-top-text .text1:hover .text2{
  color: #0052cc !important;
  background-color: rgba(222,235,255,.9)!important;
}
.header .header-top-text .text1.active{
  color: #0052cc !important;
  border-bottom: 3px solid #0052cc;
}
.header .header-top-menu .icon{
  margin-left: 15px;
}
.header .header-top-menu .icon path{
  fill:#333;
}
.header .header-top-menu .icon:hover path{
  fill:#0052cc !important;
}
.header .header-end .header-info{
  color: #333;
}
.header .header-end .header-info:hover{
  color: #0052cc !important;
}
.pageHeaderWrap{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
}
</style>
