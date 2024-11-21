<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="90%"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <!-- <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.Name"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="MasterLabel" label="模块名称" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.MasterLabel"></a-input>
                        </a-form-item>
                    </div>
                </div>
              </div>
            </a-form> -->
            <div class="stepItem" v-if="step==1">
                <div class="stepTitle">应用程序详细信息和品牌化</div>
                <div class="stepDesc">为您的应用程序命名并添加描述。上载图像，并为导航栏选择高亮显示的颜色。</div>
                <a-form :model="formState" ref="formRef">
                    <div class="stepCont" style="align-items: normal;">
                        <div class="stepLeftForm">
                            <div class="stepLabel">应用程序详细信息</div>
                            <div class="section">
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="name" label="应用程序名称" :rules="[{ required: true, message: '请输入名称' }]">
                                            <a-input v-model:value="formState.name" placeholder="命名您的应用程序..."></a-input>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="developerName" label="开发人员名称" :rules="[{ required: true, message: '请输入名称' }]">
                                            <a-input v-model:value="formState.developerName" placeholder="输入开发人员名称..."></a-input>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="startUrl" label="开始链接" :rules="[{ required: true, message: '请输入开始链接' }]">
                                            <a-input v-model:value="formState.startUrl" placeholder="开始链接..."></a-input>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="logoUrl" label="应用图标" :rules="[{ required: true, message: '请输入应用图标' }]">
                                            <a-input v-model:value="formState.logoUrl" placeholder="应用图标..."></a-input>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="description" label="描述">
                                            <a-textarea
                                                v-model:value="formState.description"
                                                placeholder="输入描述..."
                                                :auto-size="{ minRows: 2, maxRows: 5 }"
                                            />
                                        </a-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="stepRightForm">
                            <div class="stepLabel">应用程序品牌化</div>
                            <div class="section">
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="Name" label="图像">
                                            <a-upload action="/upload.do" :show-upload-list="false" list-type="picture-card">
                                                <div>
                                                    <PlusOutlined />
                                                </div>
                                            </a-upload>
                                        </a-form-item>
                                    </div>
                                    <div class="sectionItem">
                                        <a-form-item name="color" label="主颜色十六进制数值">
                                            <div class="colorFlex">
                                                <el-color-picker v-model="formState.color" @change="changeColor" />
                                                <a-input v-model:value="formState.color" style="width: 82px;margin-left: 4px;"></a-input>
                                            </div>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="Name" label="应用程序启动器预览">
                                            <div class="masterBox">
                                                <div class="leftImg">
                                                    <div class="colourBlock" style="background:#0070D2;" v-if="formState.name">
                                                        <h3>{{ formState.name.slice(0,2) }}</h3>
                                                    </div>
                                                </div>
                                                <div class="rightMaster" :class="{'active':formState.name}">
                                                    {{ formState.name }}
                                                </div>
                                            </div>
                                        </a-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-form>
            </div>
            <div class="stepItem" v-if="step==2">
                <div class="stepTitle">应用程序选项</div>
                <a-form :model="formState2" ref="formRef2" disabled>
                    <div class="stepCont">
                        <div class="stepLeftForm">
                            <div class="label">导航和表格因素</div>
                            <div class="section">
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="navStyle" label="导航样式" :rules="[{ required: true, message: '请输入名称' }]">
                                            <a-radio-group v-model:value="formState2.navStyle">
                                                <a-radio :style="radioStyle" :value="1">标准导航</a-radio>
                                                <a-radio :style="radioStyle" :value="2">控制台导航</a-radio>
                                            </a-radio-group>
                                        </a-form-item>
                                    </div>
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="tableRadio" label="支持的表格因素" :rules="[{ required: true, message: '请输入名称' }]">
                                            <a-radio-group v-model:value="formState2.tableRadio">
                                                <a-radio :style="radioStyle" :value="1">台式机和手机</a-radio>
                                                <a-radio :style="radioStyle" :value="2">桌面</a-radio>
                                                <a-radio :style="radioStyle" :value="3">手机</a-radio>
                                            </a-radio-group>
                                        </a-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="stepRightForm">
                            <div class="label">设置和个性化</div>
                            <div class="section">
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="setTest" label="设置体验">
                                            <a-radio-group v-model:value="formState2.setTest">
                                                <a-radio :style="radioStyle" :value="1">安装（设置选项的完整集合）</a-radio>
                                                <a-radio :style="radioStyle" :value="2">服务设置</a-radio>
                                            </a-radio-group>
                                        </a-form-item>
                                    </div>
                                    
                                </div>
                                <div class="sectionRow">
                                    <div class="sectionItem">
                                        <a-form-item name="appStyle" label="应用程序个性化设置">
                                            <a-checkbox-group v-model:value="formState2.appStyle" style="width: 100%">
                                                <a-checkbox value="checkbox1">在此应用程序中，禁用最终用户对导航项目进行个性化设置</a-checkbox>
                                                <a-checkbox value="checkbox2">为此应用程序外部的项目，禁用临时选项卡</a-checkbox>
                                            </a-checkbox-group>
                                        </a-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-form>
            </div>
            <div class="stepItem" style="width: 100%;" v-if="step==3">
                <div class="stepTitle">导航项目</div>
                <div class="stepDesc" style="padding-bottom: 32px;">选择要包含在应用程序中的项目，并按照它们的显示顺序排列。用户可以个性化导航以添加或移动项目，但用户无法删除或重命名您添加的项目。一些导航项仅适用于手机或仅适用于桌面。在使用项目不支持的格式查看应用程序时，这些项目将从导航栏中删除。</div>
                <div class="stepCont" style="width: 600px;margin: 0 auto">
                    <a-transfer
                        v-model:target-keys="navTargetKeys"
                        v-model:selected-keys="navSelecteds"
                        show-search
                        :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                        :list-style="{
                            height: '300px',
                        }"
                        :data-source="navItems"
                        :titles="['可用项目', '所选项目']"
                        :disabled="disabled"
                        @change="handleChange"
                        @selectChange="handleSelectChange"

                    >
                        <template #render="item">
                            <div class="custom-item">
                                <div class="avatar">
                                    <img :src="require('@/assets/img/change_48x48.png')" alt="">
                                </div>
                                <div class="itemTitle">
                                    {{ item.label }}
                                </div>
                            </div>
                        </template>
                    </a-transfer>
                    <div class="sortBox">
                        <a-button size="small" @click="navSelecteds.length && handleMoveUp()" :type="navSelecteds.length > 0 ? 'primary' : 'default' "><UpOutlined /></a-button>
                        <a-button size="small" @click="navSelecteds.length && handleMoveDown()" :type="navSelecteds.length > 0 ? 'primary' : 'default' "><DownOutlined /></a-button>
                    </div>
                </div>
            </div>
            <div class="stepItem" v-if="step==4">
                <div class="stepTitle">用户简档</div>
                <div class="stepDesc">选择可以访问此应用程序的用户简档。</div>
                <div class="stepCont">
                    <a-transfer
                        v-model:target-keys="proTargetKeys"
                        v-model:selected-keys="proSelecteds"
                        show-search
                        :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                        :list-style="{
                            height: '300px',
                        }"
                        :data-source="profileList"
                        :titles="['可用简档', '所选简档']"
                        :render="item => item.label"
                        :disabled="disabled"
                        @change="handleChange"
                        @selectChange="handleSelectChange"
                        @scroll="handleScroll"
                    />
                </div>
            </div>
          </div>
        </div>
        <template #footer>
          <!-- <div>
            <a-button @click="handlePrev">上一步</a-button>
            <a-button type="primary" @click="handleNext" v-if="step<4">下一步</a-button>
            <a-button type="primary" @click.prevent="handleSubmit" v-else>保存</a-button>
          </div> -->
          <div class="setupFlowFooter">
            <a-button v-show="step>1" @click="handlePrev">返回</a-button>
            <div class="progressBarContainer">
                <div class="fh-progress">
                    <ol class="fh-progress__list">
                        <li class="fh-progress__item" :class="{active:step==1}">
                            <a-tooltip>
                                <template #title>
                                    应用程序详细信息和品牌化
                                </template>
                                <button class="fh-progress__marker">
                                    <!-- <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-601m5kls2of="" data-key="success" class="fh-icon"><g lwc-601m5kls2of=""><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm134 180L241 355c-6 6-16 6-22 0l-84-85c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l44 45a10 10 0 0015 0l112-116c6-6 16-6 22 0l22 22c7 6 7 16 0 23z" lwc-601m5kls2of=""></path></g></svg> -->
                                </button>
                            </a-tooltip>
                        </li>
                        <li class="fh-progress__item" :class="{active:step==2}">
                            <a-tooltip>
                                <template #title>
                                    应用程序选项
                                </template>
                                <button class="fh-progress__marker"></button>
                            </a-tooltip>
                        </li>
                        <!-- <li class="fh-progress__item" :class="{active:step==3}">
                            <a-tooltip>
                                <template #title>
                                    实用程序项目（仅限桌面）
                                </template>
                                <button class="fh-progress__marker"></button>
                            </a-tooltip>
                        </li> -->
                        <li class="fh-progress__item" :class="{active:step==3}">
                            <a-tooltip>
                                <template #title>
                                    导航项目
                                </template>
                                <button class="fh-progress__marker"></button>
                            </a-tooltip>
                        </li>
                        <li class="fh-progress__item" :class="{active:step==4}">
                            <a-tooltip>
                                <template #title>
                                    用户简档
                                </template>
                                <button class="fh-progress__marker"></button>
                            </a-tooltip>
                        </li>
                    </ol>
                    <div class="fh-progress-bar"></div>
                </div>
            </div>
            <a-button type="primary" @click="handleNext" v-if="step<4">下一步</a-button>
            <a-button type="primary" v-else @click="handleSubmit">保存并完成</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </template>
  <script setup>
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    defineProps,
    defineExpose,
    defineEmits,
    toRaw,
    inject
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
    PlusOutlined,
    UpOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean
  });
  const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px',
  });
  const formRef = ref();
  const emit = defineEmits(["cancel", "callback"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "新建 Lightning 应用程序",
    height: document.documentElement.clientHeight - 300,
    step: 1,
    stepTotal: 4,
    navList: [],
    navTargetKeys: [],
    navSelecteds: [],
    disabled: false,
    profileList: [],
    proTargetKeys: [],
    proSelecteds: [],
    navItems: [],
    profileSelecteds: []
  });
  const {
    title,
    height, step, stepTotal, navList, navTargetKeys, navSelecteds, disabled, profileList,
    proTargetKeys, proSelecteds, navItems, profileSelecteds
  } = toRefs(data);
  const formState = reactive({
    name: "",
    developerName: "",
    description: "",
    color: "",
    startUrl: "",
    logoUrl: ""
  });
  const formState2 = reactive({
    navStyle: 1,
    tableRadio: 2,
    setTest: 1,
    appStyle: ''
  });
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  // 获取选项卡
  const getNavItems = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: ""
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.navItems, d).then(res=>{
            let items = res.actions[0].returnValue.items;
            // data.listData = JSON.parse(JSON.stringify(items));
            data.navItems = items.map(item=>{
                item.key = item.id;
                return item;
            });
        })
    };
    const getSelectedNavItem = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.selectedNavItem, d).then(res=>{
            let items = res.actions[0].returnValue.items;
            data.navTargetKeys = items.map(item=>{
                return item.id;
            });
        })
    }
    const getProfileListAll = () => {
        let d = {
            filterId: "",
            entityName: "Profile",
            objectTypeCode: 20017
        }
        proxy.$post(Interface.list2, d).then(res=>{
            console.log("res", res);
            let profileList = res.nodes;
            data.profileList = profileList.map(item=>{
                item.key = item.id;
                item.label = item.Name.textValue;
                return item;    
            });
        })
    }
    const getProfileList = () => {
        let obj = {
            actions: [{
                id: "138;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: ""
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.selectedProfiles, d).then(res=>{
            let profileSelecteds = res.actions[0].returnValue.selectedProfiles;
            data.profileSelecteds = profileSelecteds.map(item=>{
                item.key = item.id;
                return item;    
            });
            data.proTargetKeys = profileSelecteds.map(item=>{
                return item.id;
            })
        })
    };
  const handleNext = () => {
    if(data.step==1){
        formRef.value.validate().then(() =>{
            data.step++;
        }).catch((err) => {
            console.log("error", err);
        });
    }else {
        data.step++;
    }
    if(data.step==3){
        getNavItems();
        // getSelectedNavItem();
    } else if(data.step==4){
        // getProfileList();
        getProfileListAll();
    }
  };
  const handlePrev = () => {
    data.step > 1 && data.step--;
  };

  const getAppList = () => {
    proxy.$get(Interface.application.ownerModuleList, {}).then(res=>{
        data.navList = res.listData.map(item=>{
            item.key = item.Id;
            return item;
        });
    })
  };
  getAppList();
//   // 用户简档
//   const getProfileList = () => {
//     proxy.$get(Interface.application.securityProfile, {}).then(res=>{
//         data.profileList = res.rows.map(item=>{
//             item.key = item.ProfileId;
//             return item;
//         });
//     })
//   };
//   getProfileList();
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };

  const handleSubmit = () => {
    let list = data.navItems.filter(item=>{
        return data.navTargetKeys.find(row=>{
            return item.key == row;
        })
    });
    let selectedNavItems = [];
    list.forEach(item=>{
        selectedNavItems.push({
            label: item.label,
            color: "",
            id: item.id
        })
    });
    let profileList = data.profileList.filter(item=>{
        return data.proTargetKeys.find(row=>{
            return item.key == row;
        })
    });
    let selectedProfiles = [];
    profileList.forEach(item=>{
        selectedProfiles.push({
            label: item.label,
            color: item.color,
            id: item.id
        })
    })
    let obj = {
        actions: [{
            id: "5844;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                // id: "",
                isConsole: false,
                isInstalled: false,
                model: {
                    name: formState.name,
                    developerName: formState.developerName,
                    description: formState.description,
                    color: formState.color,
                    startUrl: formState.startUrl,
                    logoUrl: formState.logoUrl,
                    selectedNavItems: selectedNavItems,
                    selectedProfiles: selectedProfiles,
                    method: "new"
                }
            }
        }]
    };
    let d = {
        message: JSON.stringify(obj)
    };

    proxy.$post(Interface.application.createApp, d).then(res=>{
        Toast("保存成功！");
        emit("callback", false);
    });
  };
  const handleMoveUp = () => {
        let firstSelectedIndex = data.navTargetKeys.findIndex(item=>item==data.navSelecteds[0]);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.navSelecteds.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.navTargetKeys.indexOf(item);
                data.navTargetKeys.splice(currentIndex, 1);
                data.navTargetKeys.splice(currentIndex - 1, 0, item);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.navTargetKeys.indexOf(data.navSelecteds[data.navSelecteds.length - 1]);
          if (lastSelectedIndex < data.navTargetKeys.length - 1) {
            const itemsToMove = data.navSelecteds.slice().reverse();
            for (const item of itemsToMove) {
              const currentIndex = data.navTargetKeys.indexOf(item);
              data.navTargetKeys.splice(currentIndex, 1);
              data.navTargetKeys.splice(currentIndex + 1, 0, item);
            }
        }
    }
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
  }
  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }
    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      .sectionItem {
        flex: 1;
        margin-right: 20px;
        .ant-row {
          display: block !important;
        }
      }
      .sectionItem:last-child {
        margin-right: 0;
      }
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }
  .ant-form-item {
    position: relative;
  }
  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .stepItem{
    /* width: 600px; */
    width: 50%;
    margin: 0 auto;
    .stepTitle{
        text-align: center;
        font-size: 24px;
        color: #333;
    }
    .stepDesc{
        color: #333;
        text-align: center;
        margin: 10px 0 0 0;
    }
    .stepCont{
        display: flex;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
        .stepLeftForm{
            flex: 1;
            margin-right: 20px;
        }
        .stepLabel{
            font-size: 16px;
            line-height: 1.25;
            padding-bottom: 24px;
        }
        .stepRightForm{
            flex: 1;
        }
        .custom-item{
            display: flex;
            align-items: center;
            .avatar{
                width: 24px;
                height: 24px;
                margin-right: 8px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

    }
  }
  .ant-transfer{
    width: 100%;
    .ant-transfer-list{
        width: 50%;
        flex: 1;
    }
  }
  .masterBox{
    width: 320px;
    height: 80px;
    display: flex;
    /* border: 1px solid #dddbda; */
    border-radius: 4px;
    background: url("~@/assets/img/appPlaceholder.svg") no-repeat;
    .leftImg{
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        .colourBlock{
            width: 64px;
            height: 64px;
            border-radius: 4px;
            text-align: center;
            line-height: 64px;
            h3{
                color: #fff;
                font-size: 28px;
                font-weight: normal;
            }
        }
    }
    .rightMaster{
        flex: 1;
        padding: 10px;
        color: #181818;
        display: flex;
        align-items: center;
        font-size: 14px;
        &.active{
            background: #f3f2f2;
        }
    }
  }
  .sortBox{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }
  </style>
  <style lang="less" scoped>
    .colorFlex{
        display: flex;
    }
    .setupFlowFooter{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .progressBarContainer{
            flex: 1;
            padding: 0 48px;
        }
    }
    .fh-progress{
        position: relative;
        max-width: 70%;
        width: 100%;
        flex: 1 1 auto;
        margin: auto;
    }
    .fh-progress__list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        margin: auto;
        position: relative;
        z-index: 1;
    }
    .fh-progress__item{
        display: inline-flex;
        align-self: center;
    }
    .fh-progress__marker{
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 50%;
        background: #c9c9c9;
        border: 4px solid #fff;
        vertical-align: middle;
        border-color: #f3f3f3;
        color: #0176d3;
        cursor: default;
        .fh-icon{
            width: 14px;
            height: 14px;
            fill: currentColor;
        }
    }
    .fh-progress__item.active{
        .fh-progress__marker{
            color: #0176d3;
            box-shadow: #f3f3f3 0 0 0 4px;
            background: #f3f3f3;
            border-color: #0176d3;
        }
    }
    .fh-progress-bar{
        appearance: none;
        display: block;
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: -1px;
        height: 2px;
        background: #c9c9c9;
    }
  </style>