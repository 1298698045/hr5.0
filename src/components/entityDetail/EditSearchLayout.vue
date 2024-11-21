<template>
    <div class="editPage" style="height: 100%; padding: 0 12px; overflow-y: auto;">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content" style="padding-left: 0;">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="noSecondHeader pageType">编辑搜索布局：{{fields.Name?.displayValue}}</h1>
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
        <div class="bDescription">
            选择要包括到此搜索布局中的字段。请注意，所做的选择只决定搜索结果的显示，而不会影响实际被搜索的字段。您的选择也确定用户在自定义字段的搜索结果列时可用的字段。请参阅在线帮助以<a
                href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=search_fields.htm&amp;section=Search%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                title="获得有关搜索字段的更多信息 （新窗口）">获得有关搜索字段的更多信息</a>。</div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette">
            <div class="pbBody">
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr class="detailRow">
                                <td colspan="4">
                                    <div class="duelingListBox" id="duel">
                                        <div class="errorMsg" id="editPage_duel_errorMsg" style="display:none">&nbsp;
                                        </div>
                                        <table class="layout">
                                            <tbody>
                                                <tr>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label for="duel_select_0">可用字段</label>
                                                        </div>
                                                        <select id="duel_select_0" multiple="multiple"
                                                            name="duel_select_0" size="11" v-model="duel_select_0">
                                                            <option :value="item.developerName" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">添加</div>
                                                        <div class="zen-mbs text"><a
                                                                @click="handleRightAdd"
                                                                href="javascript:void(0)"
                                                                id="duel_select_0_right"><img :src="require('@/assets/img/s.gif')" alt="添加"
                                                                    class="rightArrowIcon" title="添加"></a></div>
                                                        <div class="text"><a
                                                                @click="handleLeftAdd"
                                                                href="javascript:void(0)"
                                                                id="duel_select_0_left"><img :src="require('@/assets/img/s.gif')" alt="移除"
                                                                    class="leftArrowIcon" title="移除"></a></div>
                                                        <div class="duelingText">移除</div>
                                                    </td>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label
                                                                for="duel_select_1">选取的字段</label></div><select
                                                            id="duel_select_1" multiple="multiple" name="duel_select_1"
                                                            size="11" v-model="duel_select_1">
                                                            <option value="" v-if="selectFieldList.length==0">--无--</option>
                                                            <option :value="item.developerName" v-for="(item, index) in selectFieldList" :key="index">{{item.label}}</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">向上</div>
                                                        <div class="zen-mbs text"><a
                                                                @click="handleMoveUp"
                                                                href="javascript:void(0)"
                                                                id="duel_select_1_up"><img :src="require('@/assets/img/s.gif')" alt="向上"
                                                                    class="upArrowIcon" title="向上"></a></div>
                                                        <div class="text"><a
                                                                @click="handleMoveDown"
                                                                href="javascript:void(0)"
                                                                id="duel_select_1_down"><img :src="require('@/assets/img/s.gif')" alt="向下"
                                                                    class="downArrowIcon" title="向下"></a></div>
                                                        <div class="text">向下</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr class="detailRow">
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr class="last detailRow">
                                <td colspan="4"><input id="overwriteUsersLayout" name="overwriteUsersLayout"
                                        type="checkbox" value="1"><label
                                        for="overwriteUsersLayout">改写所有用户的搜索结果列自定义</label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_1_ep">
                    <h3>标准按钮<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="last detailRow">
                                <td colspan="4">此视图没有任何可自定义的标准按钮。</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_2_ep">
                    <h3>自定义按钮<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr class="last detailRow">
                                <td colspan="4">
                                    <div class="duelingListBox" id="actionRefs">
                                        <div class="errorMsg" id="editPage_actionRefs_errorMsg" style="display:none">
                                            &nbsp;</div>
                                        <table class="layout">
                                            <tbody>
                                                <tr>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label
                                                                for="actionRefs_select_0">可用按钮</label></div><select
                                                            id="actionRefs_select_0" multiple="multiple"
                                                            name="actionRefs_select_0" size="11">
                                                            <option value="">--无--</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">添加</div>
                                                        <div class="zen-mbs text"><a
                                                                href="javascript:void(0)"
                                                                id="actionRefs_select_0_right"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="添加" class="rightArrowIcon" title="添加"></a>
                                                        </div>
                                                        <div class="text"><a
                                                                href="javascript:if%20%28%21document.getElementById%28%27actionRefs_select_0%27%29.disabled%26%26%20%21document.getElementById%28%27actionRefs_select_1%27%29.disabled%29%20%7Bwindow.editPage_DLBEInstance.instMoveOption%28document.editPage.actionRefs_select_1%2C%20document.editPage.actionRefs_select_0%2Cwindow.editPage_DLBEInstance.emptyLabel%2C%20%5B%5D%2C%20null%2Cwindow.editPage_DLBEInstance.emptyLabel%2Cfalse%2Cnull%2C%27editPage_actionRefs_errorMsg%27%29%3B%7D"
                                                                id="actionRefs_select_0_left"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="移除" class="leftArrowIcon" title="移除"></a></div>
                                                        <div class="duelingText">移除</div>
                                                    </td>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label
                                                                for="actionRefs_select_1">选取的按钮</label></div><select
                                                            id="actionRefs_select_1" multiple="multiple"
                                                            name="actionRefs_select_1" size="11">
                                                            <option value="00b90000000gK8m">Move to New Milestone
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">向上</div>
                                                        <div class="zen-mbs text"><a
                                                                href="javascript:window.editPage_DLBEInstance.instMoveUp%28document.editPage.actionRefs_select_1%2C%20null%2C%20null%2C%20null%2C%27editPage_actionRefs_errorMsg%27%29%3B"
                                                                id="actionRefs_select_1_up"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="向上" class="upArrowIcon" title="向上"></a></div>
                                                        <div class="text"><a
                                                                href="javascript:window.editPage_DLBEInstance.instMoveDown%28document.editPage.actionRefs_select_1%2C%20null%2C%20null%2C%20null%2C%27editPage_actionRefs_errorMsg%27%29%3B"
                                                                id="actionRefs_select_1_down"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="向下" class="downArrowIcon" title="向下"></a></div>
                                                        <div class="text">向下</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
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
                                <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth"
                                    title="">&nbsp;
                            </td>
                            <td class="pbButtonb" id="bottomButtonRow">
                                <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit"
                                    @click="handleSave">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit"
                                    @click="handleCancel">
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        nextTick,
        defineProps,
        defineEmits,
        toRaw
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel', 'load']);
    const props = defineProps({
        id: String,
        detail: Object,
        entityId: Object,
        objectTypeCode: String
    });

    const rules = reactive({
        MasterLabel: {
            isRequired: false
        },
        DeveloperName: {
            isRequired: false
        }
    })

    const formState = reactive({
        MasterLabel: "",
        DeveloperName: ""
    })
    const data = reactive({
        listData: [],
        fieldList: [],
        selectFieldList: [],
        duel_select_0: [],
        duel_select_1: [],
        attributes: [],
        fields: {}
    });
    const { listData, fieldList, selectFieldList, duel_select_0, duel_select_1, attributes, fields } = toRefs(data);

    onMounted(() => {

    })

    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: props.entityId
        }).then(res=>{
            data.fieldList = res.rows;
            data.attributes = JSON.parse(JSON.stringify(res.rows));
        })
    };
    getFieldList();
    // 往右侧添加
    const handleRightAdd = () => {
        data.duel_select_0.forEach(value => {
            const option = data.fieldList.find(opt => opt.developerName === value);
            if (option) {
                data.selectFieldList.push(option);
                data.fieldList = data.fieldList.filter(opt => opt.developerName !== value);
            }
        });
        data.duel_select_0 = [];
    };
    const handleLeftAdd = () => {
        data.duel_select_1.forEach(value => {
            const option = data.selectFieldList.find(opt => opt.developerName === value);
            if (option) {
                data.fieldList.push(option);
                data.selectFieldList = data.selectFieldList.filter(opt => opt.developerName !== value);
            }
        });
        data.duel_select_1 = [];
    };
    const handleMoveUp = () => {
        let firstSelectedIndex = data.selectFieldList.findIndex(item=>data.duel_select_1[0] == item.developerName);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.duel_select_1.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.selectFieldList.findIndex(row=>row.developerName==item);
                data.selectFieldList.splice(currentIndex, 1);
                let item2 = data.attributes.find(row=>row.developerName==item);
                data.selectFieldList.splice(currentIndex - 1, 0, item2);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.selectFieldList.indexOf(item=>data.duel_select_1[data.duel_select_1.length - 1]==item.developerName);
          if (lastSelectedIndex < data.selectFieldList.length - 1) {
            const itemsToMove = data.duel_select_1.slice().reverse();
            let top = itemsToMove.length * 40;
            for (const item of itemsToMove) {
              const currentIndex = data.selectFieldList.findIndex(row=>row.developerName==item);
              data.selectFieldList.splice(currentIndex, 1);
              let item2 = data.attributes.find(row=>row.developerName==item);
              data.selectFieldList.splice(currentIndex + 1, 0, item2);
            //   nextTick(()=>{
            //   })
            }
        }
    }
    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: "EntitySearchLayout",
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            console.log('res', res);
            let { DisplayColumnNames } = res.actions[0].returnValue.fields;
            data.fields = res.actions[0].returnValue.fields;
            let displayColumnNamesArr = DisplayColumnNames.value.split(',');
            let list = data.fieldList.filter((item,index)=>{
                return displayColumnNamesArr.find(row=>{
                    return item.developerName == row;
                });
            });
            displayColumnNamesArr.forEach(item=>{
                let index = data.fieldList.findIndex(row=>row.developerName==item);
                data.fieldList.splice(index, 1);
            });
            // for(let i = 0; i < displayColumnNamesArr.length; i++){
            //     for(var j = 0; j < data.fieldList.length; j++){
            //         let row = data.fieldList[j];
            //         if(displayColumnNamesArr[i] == row.developerName){
            //             data.fieldList.splice(j, 1);
            //             j--;
            //         }
            //     }
            // }
            data.selectFieldList = list;
        })
    }
    if (props.id) {
        getDetail();
    }

    const getLayoutQuery = () => {
        proxy.$get(Interface.objeview.pageLayout.list, {
            entityId: props.entityId
        }).then(res => {
            data.listData = res.rows;
        })
    }
    getLayoutQuery();
    const handleCancel = () => {
        emit("cancel", false);
    };

    const handleSave = () => {
        let url = Interface.create;
        let d = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "EntitySearchLayout",
                        objTypeCode: 100005,
                        fields: {
                            DisplayColumnTitles: data.selectFieldList.map(item=>item.label).join(','),
                            DisplayColumnNames: data.selectFieldList.map(item=>item.developerName).join(','),
                            EntityId: props.EntityId,
                        }
                    }
                }
            }]
        };
        if (props.id) {
            d.actions[0].params.recordId = props.id;
            url = Interface.edit;
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then(res => {
            Toast("保存成功！");
            emit("load", false);
            emit("cancel", false);
        })
    }

</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

    #pleCloneIntroInfo {
        margin: 10px auto 15px;
    }

    table.layout {
        width: auto;

        td {
            vertical-align: middle;
            text-align: center;
        }

        td.buttonCell {
            vertical-align: middle !important;
        }
    }

    .picklistArrowLeft,
    .picklistArrowRight,
    .rightArrowIcon,
    .leftArrowIcon,
    .doubleArrowUp,
    .upArrowIcon,
    .downArrowIcon,
    .doubleArrowDwn {
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

    .doubleArrowDwn {
        background-position: left -300px;
    }

    .rightArrowIcon {
        background-position: left top;
    }

    .leftArrowIcon {
        background-position: left -60px;
    }

    .duelingListBox .text {
        padding: 2px 0 2px 0;

        a:hover {
            .doubleArrowUp {
                background-position: left -260px;
            }

            .upArrowIcon {
                background-position: left -140px;
            }

            .downArrowIcon {
                background-position: left -200px;
            }

            .doubleArrowDwn {
                background-position: left -320px;
            }

            .rightArrowIcon {
                background-position: left -20px;
            }

            .leftArrowIcon {
                background-position: left -80px;
            }
        }
    }
</style>