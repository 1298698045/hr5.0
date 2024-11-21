<template>
    <div class="setupHead">
        <HeadCommon />
    </div>
    <div class="EditProfile">
        <div class="editHead">
            <div class="bPageTitle">
                <div class="content">
                    <h1 class="pageType">简档</h1>
                    <h2 class="pageDescription">{{ detail.Name }}</h2>
                </div>
                <div class="links">
                    <a href="javascript:;" title="此页面的帮助 （新窗口）">
                        <span class="helpLink">此页面的帮助</span>
                        <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon" title="">
                    </a>
                </div>
            </div>
            <div class="headerForm">
                <!-- <a-input-search
                    v-model:value="searchVal"
                    placeholder="查找设置"
                    style="width: 200px"
                    @search="onSearch"/> -->
                <div class="pc_findSearch">
                    <input class="findInput" type="password" placeholder="查找设置...">
                    <div class="findContainer"></div>
                </div>

                <div class="pc_separator"></div>
                <!-- <a-divider type="vertical" /> -->
                <!-- <a-button class="ml10">复制</a-button>
                <a-button class="ml10">删除</a-button>
                <a-button class="ml10" @click="handleModule">编辑属性</a-button> -->
                <input type="button" class="inpBtn" value=" 复制 ">
                <input type="button" class="inpBtn" value=" 删除 ">
                <input type="button" class="inpBtn" value=" 编辑属性 ">
            </div>
        </div>
        <div class="center">
            <div class="pagePanel" v-if="!isPerm && !isObjSet && !isModulePerm">
                <div class="pagePanel-head">
                    <div class="pagePanel-head-label">应用程序</div>
                </div>
                <div class="pagePanel-bd">
                    <div class="sectionSetting">
                        <div class="sectionRow">
                            <a href="javascript:;" class="label" @click="isObjSet=true">对象设置</a>
                            <p class="desc">访问对象和字段的权限，及指定何种记录类型、页面布局和选项卡可见的设置。</p>
                        </div>
                        <div class="sectionRow">
                            <a href="javascript:;" class="label" @click="isPerm=true">应用程序权限</a>
                            <p class="desc">
                                执行应用程序指定操作，如“管理呼叫中心”的权限
                            </p>
                        </div>
                        <div class="sectionRow">
                            <a href="javascript:;" class="label" @click="isModulePerm=true;">模块权限</a>
                            <p class="desc">
                                执行应用程序指定操作，如“管理呼叫中心”的权限
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ApplicationPerm v-if="isPerm" @back="isPerm=false;" />
            <ObjSetting v-if="isObjSet" @back="isObjSet=false" />
            <ModulePerm v-if="isModulePerm" @back="isModulePerm=false" :ProfileId="ProfileId" />
        </div>
        <EditAttributeModal :name="detail.Name" v-if="isEditAttribute" :isShow="isEditAttribute" @cancel="isEditAttribute=false" @callback="getDetail" />
    </div>
</template>
<script setup>
    import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, inject  } from "vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import ApplicationPerm  from "@/components/profile/ApplicationPerm.vue";
  import ObjSetting  from "@/components/profile/ObjSetting.vue";
  import ModulePerm  from "@/components/profile/ModulePerm.vue";
  import EditAttributeModal from "@/components/profile/EditAttributeModal.vue";
  import HeadCommon from "@/components/HeadCommon.vue";
  const data = reactive({
    searchVal: "",
    isPerm: false,
    isObjSet: false,
    isModulePerm: false,
    isEditAttribute: false,
    ProfileId: inject("profileId").id,
    detail: {}
  });
  
  const { searchVal, isPerm, isObjSet, isModulePerm, isEditAttribute, ProfileId, detail } = toRefs(data);

  const getDetail = () => {
    proxy.$get(Interface.profile.get, {
        ProfileId: data.ProfileId
    }).then(res=>{
        data.detail = res.listData;
        data.isEditAttribute = false;
    });
  };
  getDetail();
  const handleModule = () => {
    data.isEditAttribute = true;
  };
</script>
<style lang="less" scoped>
    .pagePanel{
        width: 100%;
        border-top: 3px solid #747e96;
        border-radius: 4px;
        background: #f8f8f8;
        border-bottom: 1px solid #eaeaea;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        .pagePanel-head{
            padding: 10px 16px;
            color: #000;
            /* background: url("~@/assets/img/opacity75.png"); */
            /* background-color: #8e9dbe; */
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            border-bottom: 1px solid #dbdbdb;
            .pagePanel-head-label{
                font-weight: bold;
            }
        }
        .pagePanel-bd{
            min-height: 100px;
            padding: 20px;
            .profileForm{
                .formItem{
                    width: 300px;
                }
            }
        }
        .pagePanel-foot{
            border-top: 1px solid #fff;
            padding: 5px 0;
            text-align: center;
        }
    }
    .EditProfile{
        width: 100%;
        height: calc(~"100% - 80px");
        padding: 20px 10px;
        overflow-y: auto;
        background: #fff;
        border-radius: 4px;
        .editHead{
            .pageType{
                font-weight: bold;
                color: #4a4a56;
                padding-left: 1px;
                font-size: 12px;
            }
            .pageDescription{
                font-size: 24px;
                font-weight: normal;
                line-height: 1.2;
                margin-left: 0;
            }
            .bPageTitle{
                display: flex;
                justify-content: space-between;
            }
            .links{
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                text-align: right;
                vertical-align: middle;
                font-size: 13px;
                white-space: nowrap;
                padding-top: 0;
                a{
                    color: #015ba7;
                    text-decoration: none;
                    &:hover{
                        text-decoration: underline;
                    }
                    .helpIcon{
                        background: transparent url("~@/assets/img/help_orange.png") no-repeat;
                        vertical-align: top;
                    }
                }
            }
            .headerForm{
                padding: 5px;
                background: #f8f8f8;
                border-top: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                margin-bottom: 15px;
            }
        }
    }
    .sectionSetting{
        margin-left: 300px;
        margin-bottom: 20px;
        .sectionRow{
            padding: 5px 0;
            border-bottom: 1px solid #999;
            .label{
                color: #333;
                font-size: 12px;
                font-weight: bold;
                text-decoration: underline;
                &:hover{
                    color: #3399ff;
                }
            }
            .desc{
                font-size: 12px;
            }
        }
    }
    .center{
        /* height: calc(~"100% - 100px"); */
    }
</style>