<template>
    <div class="editApplication">
        <HeadCommon name="应用程序管理器"></HeadCommon>
        <div class="todo-content">
            <div class="editPage" style="height: 100%;overflow-y: auto;">
                <div class="bPageTitle">
                    <div class="ptBody">
                        <div class="content">
                            <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                            <h1 class="pageType">应用程序<span
                                    class="titleSeparatingColon">:</span></h1>
                            <h2 class="pageDescription">salesforce</h2>
                            <div class="blank">&nbsp;</div>
                        </div>
                        <div class="links">
                            <a href="javascript:void(0);" title="此页面的帮助 （新窗口）">
                                <span class="helpLink">此页面的帮助</span>
                                <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon">
                            </a>
                        </div>
                    </div>
                    <div class="ptBreadcrumb"></div>
                </div>
                <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette" style="margin-bottom: 0;">
                    <div class="pbHeader">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1"
                                            height="1" class="minWidth" title="">
                                        <h2 class="mainTitle">自定义对象定义编辑</h2>
                                    </td>
                                    <td class="pbButton" id="topButtonRow">
                                        <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit"
                                            @click="handleSave">
                                        <input value=" 保存并新建 " class="inpBtn" name="save_new" title="保存并新建"
                                            type="submit">
                                        <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit"
                                            @click="handleCancel">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pbBody">
                        <div class="pbSubsection">
                            <table class="detailList">
                                <tbody>
                                    <tr class="detailRow">
                                        <td colspan="4">
                                            <div class="message infoM4" id="standardAppInfoMessage">
                                                <table class="messageTable" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img :src="require('@/assets/img/s.gif')" alt="信息"
                                                                    class="msgIcon" title="信息">
                                                            </td>
                                                            <td class="messageCell">
                                                                <div class="messageText">这是标准应用程序。无法自定义其标签或徽标。</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">应用程序标签</td>
                                        <td class="data2Col" colspan="3">销售</td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">描述</td>
                                        <td class="data2Col" colspan="3">全球最流行的销售自动化 (SFA) 解决方案</td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol empty">&nbsp;</td>
                                        <td class="data2Col" colspan="3"><input type="hidden" id="file_id"
                                                name="file_id" onchange="javascript:refreshLogoImage()" value="">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">选择自定义应用程序徽标的图像源</td>
                                        <td class="data2Col" colspan="3">
                                            <img :src="require('@/assets/img/Summer_24_175x65.png')" alt="" width="175"
                                                height="65" id="logoImage">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">选择选项卡</td>
                                        <td class="data2Col" colspan="3">
                                            <div class="duelingListBox" id="duel">
                                                <div class="errorMsg" id="editPage_duel_errorMsg" style="display:none">
                                                    &nbsp;</div>
                                                <table class="layout">
                                                    <tbody>
                                                        <tr>
                                                            <td class="selectCell">
                                                                <div class="selectTitle">
                                                                    <label for="duel_select_0">可用选项卡</label>
                                                                </div>
                                                                <select id="duel_select_0" multiple="multiple" name="duel_select_0" size="14" style="width: 200px" v-model="duel_select_0">
                                                                    <option :value="item.id" v-for="(item, index) in navItems" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </td>
                                                            <td class="zen-phs buttonCell">
                                                                <div class="text">添加</div>
                                                                <div class="zen-mbs text"><a href="javascript:void(0)"
                                                                        id="field_selector_select_0_right"
                                                                        @click="handleRightAdd"><img
                                                                            :src="require('@/assets/img/s.gif')"
                                                                            alt="添加" class="rightArrowIcon"
                                                                            title="添加"></a>
                                                                </div>
                                                                <div class="text"><a href="javascript:void(0)"
                                                                        id="field_selector_select_0_left"><img
                                                                            :src="require('@/assets/img/s.gif')"
                                                                            alt="移除" class="leftArrowIcon"
                                                                            title="移除"></a></div>
                                                                <div class="duelingText">移除</div>
                                                            </td>
                                                            <td class="selectCell">
                                                                <div class="selectTitle">
                                                                    <label for="duel_select_1">选定选项卡</label>
                                                                </div>
                                                                <select id="duel_select_1" multiple="multiple"
                                                                    name="duel_select_1" size="14" style="width: 200px" v-model="duel_select_1">
                                                                    <option :value="item.name" v-for="(item, index) in navItems" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </td>
                                                            <td class="zen-phs buttonCell">
                                                                <div class="text">向上</div>
                                                                <div class="zen-mbs text"><a href="javascript:void(0)"
                                                                        id="duel_select_0_up" @click="handleMoveUp"><img
                                                                            :src="require('@/assets/img/s.gif')"
                                                                            alt="向上" class="upArrowIcon" title="向上"></a>
                                                                </div>
                                                                <div class="text"><a href="javascript:void(0)"
                                                                        id="duel_select_0_down"
                                                                        @click="handleMoveDown"><img
                                                                            :src="require('@/assets/img/s.gif')"
                                                                            alt="向下" class="downArrowIcon"
                                                                            title="向下"></a></div>
                                                                <div class="text">向下</div>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol"><label
                                                for="overwrite_user_setting">覆盖用户的个人自定义应用程序自定义设置</label>
                                        </td>
                                        <td class="data2Col" colspan="3"><input id="overwrite_user_setting"
                                                name="overwrite_user_setting" tabindex="1" type="checkbox" value="1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="DefaultTabEnumOrId"><span
                                                    class="assistiveText">*</span>默认登录选项卡</label>
                                        </td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock">
                                                </div>
                                                <select id="DefaultTabEnumOrId" name="DefaultTabEnumOrId"
                                                    tabindex="4">
                                                    <option :value="item.name" v-for="(item, index) in navItems" :key="index">{{item.label}}</option>
                                                </select>&nbsp;<div class="mouseOverInfoOuter"
                                                    onfocus="addMouseOver(this)" onmouseover="addMouseOver(this)"
                                                    tabindex="5"><img src="@/assets/img/s.gif" alt="" class="infoIcon" title="">
                                                    <div class="mouseOverInfo"
                                                        style="display: none; left: 19px; opacity: 0;">
                                                        选择要在用户首次导航至此应用程序时显示的选项卡。
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol"><label for="show_in_lightning_experience">在 Lightning
                                                Experience 中显示</label></td>
                                        <td class="data2Col" colspan="3"><input id="show_in_lightning_experience"
                                                name="show_in_lightning_experience" tabindex="6" type="checkbox"
                                                value="1"></td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol empty">&nbsp;</td>
                                        <td class="dataCol empty" colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td class="last labelCol">分配简档</td>
                                        <td class="dataCol last col02">
                                            <!-- Begin RelatedListElement -->
                                            <div class="bRelatedList">
                                                <!-- Begin ListElement -->

                                                <!-- motif: Setup -->

                                                <!-- WrappingClass -->
                                                <div class="listRelatedObject setupBlock">
                                                    <div class="bPageBlock brandSecondaryBrd secondaryPalette">
                                                        <div class="pbHeader"></div>
                                                        <div class="pbBody">
                                                            <table class="list" border="0" cellspacing="0"
                                                                cellpadding="0">
                                                                <tbody>
                                                                    <tr class="headerRow">
                                                                        <th scope="col" class=" zen-deemphasize">简档</th>
                                                                        <th scope="col"
                                                                            class="booleanColumn zen-deemphasize"><input
                                                                                id="visible" name="visible"
                                                                                onclick="javascript:onVisibleCheck(this);"
                                                                                type="checkbox" value="1"><label
                                                                                for="visible">可见</label></th>
                                                                        <th scope="col"
                                                                            class="booleanColumn zen-deemphasize"><input
                                                                                disabled="disabled" id="default"
                                                                                name="default"
                                                                                onclick="javascript:onDefaultCheck(this);"
                                                                                type="checkbox" value="1"><label
                                                                                for="default">默认</label></th>
                                                                    </tr>

                                                                    <!-- ListRow -->
                                                                    <tr class="dataRow even" v-for="(item, index) in selectedProfiles" :key="index">
                                                                        <th scope="row" class=" dataCell  ">{{item.label}}</th>
                                                                        <td class=" dataCell  booleanColumn">
                                                                            <input
                                                                                checked="checked"
                                                                                id="selected_in_profile"
                                                                                name="selected_in_profile"
                                                                                title="可见" type="checkbox"
                                                                                v-model="item.selected">
                                                                            </td>
                                                                        <td class=" dataCell  booleanColumn"><input
                                                                                id="00e90000001txhX"
                                                                                name="default_for_profile" title="默认"
                                                                                type="checkbox" value="00e90000001txhX">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="pbFooter secondaryPalette">
                                                            <div class="bg"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="listElementBottomNav"></div>
                                                <!-- End ListElement -->
                                            </div>
                                            <!-- End RelatedListElement -->
                                        </td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="dataCol last empty">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pbBottomButtons">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="pbTitle">
                                        <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1"
                                            class="minWidth" title="">&nbsp;
                                    </td>
                                    <td class="pbButtonb" id="bottomButtonRow">
                                        <input value=" 保存 " class="inpBtn" name="save" tabindex="31" title="保存"
                                            type="submit" @click="handleSave">
                                        <input value=" 保存并新建 " class="inpBtn" name="save_new" tabindex="32"
                                            title="保存并新建" type="submit">
                                        <input value=" 取消 " class="inpBtn" name="cancel" tabindex="33" title="取消"
                                            type="submit" @click="handleCancel">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
        SearchOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineEmits } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    import HeadCommon from "@/components/HeadCommon.vue";
    const formRef = ref(null);
    const emit = defineEmits(['cancel']);
    let data = reactive({
        navItems: [],
        selectedProfiles: [],
        duel_select_0: [],
        duel_select_1: [],
        listData: [],
        id: route.query.id
    });
    const { navItems, selectedProfiles, duel_select_0, duel_select_1, listData, id } = toRefs(data);

    // 获取选项卡
    const getNavItems = () => {
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
        proxy.$post(Interface.application.navItems, d).then(res=>{
            let items = res.actions[0].returnValue.items;
            data.listData = JSON.parse(JSON.stringify(items));
            data.navItems = items;
        })
    };
    getNavItems();
    const getProfileList = () => {
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
        proxy.$post(Interface.application.selectedProfiles, d).then(res=>{
            let selectedProfiles = res.actions[0].returnValue.selectedProfiles;
            data.selectedProfiles = selectedProfiles;
        })
    };
    getProfileList();
    const handleMoveUp = () => {
        let firstSelectedIndex = data.navItems.findIndex(item=>data.duel_select_1[0] == item.name);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.duel_select_1.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.navItems.findIndex(row=>row.name==item);
                data.navItems.splice(currentIndex, 1);
                let item2 = data.listData.find(row=>row.name==item);
                data.navItems.splice(currentIndex - 1, 0, item2);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.navItems.indexOf(item=>data.duel_select_1[data.duel_select_1.length - 1]==item.name);
          if (lastSelectedIndex < data.navItems.length - 1) {
            const itemsToMove = data.duel_select_1.slice().reverse();
            let top = itemsToMove.length * 40;
            for (const item of itemsToMove) {
              const currentIndex = data.navItems.findIndex(row=>row.name==item);
              data.navItems.splice(currentIndex, 1);
              let item2 = data.listData.find(row=>row.name==item);
              data.navItems.splice(currentIndex + 1, 0, item2);
            //   nextTick(()=>{
            //   })
            }
        }
    }
    const handleCancel = () => {
        emit("cancel", false);
    }

    // 保存选项卡
    const saveNavItems = () => {
        let obj = {
            actions: [{
                id: "520;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    model: {
                        selectedNavItems: [],
                        id: "",
                        isConsole: false,
                        isInstalled: false
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.saveNavItems, d).then(res=>{

        })
    }

    const handleSave = () => {
        let obj = {
            actions: [{
                id: "520;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    model: {
                        selectedNavItems: [],
                        id: "",
                        isConsole: false,
                        isInstalled: false
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.application.saveSelectedProfiles, d).then(res => {

        });
    }
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");
    
    .editApplication {
        height: 100%;
        position: relative;
        z-index: 1;

        .todo-content {
            width: 100%;
            height: calc(~"100% - 80px");
            position: relative;
            z-index: 999;
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            padding: 0 12px;
        }
    }

    .message {
        background-color: #ffc;
        border-style: solid;
        border-width: 1px;
        color: #000;
        padding: 6px 8px 6px 6px;
        border-radius: 4px;
        margin: 4px 20px;
    }

    table.messageTable {
        width: inherit;
    }

    .infoM4 {
        border-color: #39f;

        td {
            margin: 0 !important;
            padding: 0 !important;
        }

        .msgIcon {
            width: 16px;
            height: 16px;
            display: inline-block;
            background-image: url('~@/assets/img/master.png');
            background-position: 0 -222px;
        }
    }

    .require {
        color: red;
    }

    table.layout {
        width: inherit;
    }
    td.buttonCell{
        vertical-align: middle !important;
    }

    .bPageBlock.bEditBlock .bRelatedList .bPageBlock{
        border: 0;
        .pbBody{
            margin: 0 0 6px;
            padding: 0;
        }
        table.list{
            background: #fff;
            tr.headerRow th{
                border-style: solid;
                background: #f2f3f3;
                border-width: 0 0 1px 1px;
                border-color: #e0e3e5;
                color: #000;
                font-size: .9em;
                font-weight: bold;
                padding: 5px 2px 4px 5px;
                &:first-child{
                    border-left-width: 0;
                }
            }
            .dataRow{
                border-bottom: 1px solid #e0e3e5;
                cursor: pointer;
                th{
                    background: #fff;
                }
                &:hover{
                    td,th{
                        background: #e3f3ff;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .picklistArrowLeft, .picklistArrowRight, .rightArrowIcon, .leftArrowIcon, .doubleArrowUp, .upArrowIcon, .downArrowIcon, .doubleArrowDwn{
    width: 24px;
    height: 20px;
    margin: 0 2px;
    background: transparent url("~@/assets/img/combobox_arrows_sprite.gif") no-repeat;
    vertical-align: middle;
}
.doubleArrowUp {
    background-position: left -240px;
}
.upArrowIcon {
    background-position: left -120px;
}
.downArrowIcon {
    background-position: left -180px;
}
.doubleArrowDwn{
    background-position: left -300px;
}
.rightArrowIcon{
    background-position: left top;
}
.leftArrowIcon{
    background-position: left -60px;
}
.duelingListBox .text{
    padding: 2px 0 2px 0;
    a:hover{
        .doubleArrowUp {
            background-position: left -260px;
        }
        .upArrowIcon {
            background-position: left -140px;
        }
        .downArrowIcon{
            background-position: left -200px;
        }
        .doubleArrowDwn{
            background-position: left -320px;
        }
        .rightArrowIcon{
            background-position: left -20px;
        }
        .leftArrowIcon{
            background-position: left -80px;
        }
    }
}
</style>