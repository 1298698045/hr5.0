<template>
    <div class="editPage" style="height: 100%; padding: 0 12px; overflow-y: auto;">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content" style="padding-left: 0;">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="noSecondHeader pageType"> 紧凑布局：新建紧凑布局</h1>
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
        <div class="bDescription">紧凑布局用于在移动应用程序和一些 Chatter
            摘要项目中快速显示记录的关键字段。您可以为紧凑布局选择最多十个字段并确定其优先级，不过，显示字段数会基于设备屏幕、要查看的记录页面以及用户的权限而有所变化。</div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette">
            <div class="pbHeader">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="pbTitle">
                                <img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth" title="">
                                <h2 class="mainTitle">紧凑布局编辑</h2>
                            </td>
                            <td class="pbButton" id="topButtonRow">
                                <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit"
                                    @click="handleSave">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit"
                                    @click="handleCancel">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbBody">
                <div class="pbSubheader brandTertiaryBgr tertiaryPalette">
                    <span class="pbSubExtra"><span class="requiredLegend brandTertiaryFgr"><span
                                class="requiredExampleOuter"><span class="requiredExample">&nbsp;</span></span><span
                                class="requiredMark">*</span><span class="requiredText"> = 必填信息</span></span></span>
                    <h3>输入紧凑布局信息<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr>
                                <td class="labelCol requiredInput"><label for="MasterLabel"><span
                                            class="assistiveText">*</span>标签</label></td>
                                <td class="dataCol col02">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <input id="MasterLabel" maxlength="80" name="MasterLabel" size="20" tabindex="1" type="text" v-model="formState.MasterLabel">
                                        <div class="errorMsg" v-if="rules.MasterLabel.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                    </div>
                                </td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol last requiredInput">
                                    <label for="DeveloperName"><span class="assistiveText">*</span>名称</label>
                                </td>
                                <td class="dataCol last col02">
                                    <div class="requiredInput">
                                        <div class="requiredBlock"></div>
                                        <input id="DeveloperName" maxlength="80" name="DeveloperName" size="20" tabindex="2" type="text" v-model="formState.DeveloperName">
                                        <div class="mouseOverInfoOuter">
                                            <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                            <div class="mouseOverInfo">API
                                                和受管软件包使用的唯一名称。名称必须以字母开头，仅使用字母数字字符和下划线。名称不能以下划线结尾或包含两条连续的下划线。
                                            </div>
                                        </div>
                                        <div class="errorMsg" v-if="rules.DeveloperName.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                    </div>
                                </td>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="dataCol last empty">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_2_ep">
                    <h3>选择紧凑布局字段<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList">
                        <tbody>
                            <tr>
                                <td class="labelCol empty">&nbsp;</td>
                                <td class="data2Col" colspan="3">
                                    <div class="duelingListBox" id="field_selector">
                                        <div class="errorMsg" id="editPage_field_selector_errorMsg"
                                            style="display:none">&nbsp;</div>
                                        <table class="layout">
                                            <tbody>
                                                <tr>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label
                                                                for="field_selector_select_0">可用字段</label></div>
                                                        <select id="field_selector_select_0" multiple="multiple"
                                                            name="field_selector_select_0" size="10" v-model="field_selector_select_0">
                                                            <option :value="item.developerName" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">添加</div>
                                                        <div class="zen-mbs text"><a
                                                                href="javascript:void(0)"
                                                                id="field_selector_select_0_right" @click="handleRightAdd"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="添加" class="rightArrowIcon" title="添加"></a>
                                                        </div>
                                                        <div class="text"><a
                                                                href="javascript:void(0)"
                                                                id="field_selector_select_0_left" @click="handleLeftAdd"><img :src="require('@/assets/img/s.gif')"
                                                                    alt="移除" class="leftArrowIcon" title="移除"></a></div>
                                                        <div class="duelingText">移除</div>
                                                    </td>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label
                                                                for="field_selector_select_1">选取的字段</label></div>
                                                        <select
                                                            id="field_selector_select_1" multiple="multiple"
                                                            name="field_selector_select_1" size="10" v-model="field_selector_select_1">
                                                            <option value="" v-if="selectFieldList.length==0">--无--</option>
                                                            <option :value="item.developerName" v-for="(item, index) in selectFieldList" :key="index">{{item.label}}</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">顶部</div>
                                                        <div class="text">
                                                            <a href="javascript:void(0)"><img :src="require('@/assets/img/s.gif')" alt="顶部" class="doubleArrowUp"
                                                                    title="顶部"></a></div>
                                                        <div class="text">向上</div>
                                                        <div class="zen-mbs text"><a
                                                                href="javascript:void(0)"
                                                                id="duel_select_0_up" @click="handleMoveUp"><img :src="require('@/assets/img/s.gif')" alt="向上"
                                                                    class="upArrowIcon" title="向上"></a></div>
                                                        <div class="text"><a
                                                            href="javascript:void(0)"
                                                                id="duel_select_0_down" @click="handleMoveDown"><img :src="require('@/assets/img/s.gif')" alt="向下"
                                                                    class="downArrowIcon" title="向下"></a></div>
                                                        <div class="text">向下</div>
                                                        <div class="text"><a
                                                            href="javascript:void(0)"><img
                                                                    :src="require('@/assets/img/s.gif')" alt="底部" class="doubleArrowDwn"
                                                                    title="底部"></a></div>
                                                        <div class="text">底部</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="last data2Col" colspan="3">按住 SHIFT 键单击以选择相邻字段。按住 CTRL 键单击以选择某类字段。</td>
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
        entityId: String,
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
        field_selector_select_0: [],
        field_selector_select_1: [],
        attributes: []
    });
    const { listData, fieldList, selectFieldList, field_selector_select_0, field_selector_select_1, attributes } = toRefs(data);

    onMounted(() => {

    })
    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: "LayoutCompact"
                    // objTypeCode: props.objectTypeCode
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            console.log('res', res);
            let { fields } = res.actions[0].returnValue;
            formState.MasterLabel = fields.Label.value;
            formState.DeveloperName = fields.Name.value;
            let fieldsValue = fields.Fields.value.split(',');
            console.log('fieldsValue', fieldsValue);
            data.selectFieldList = data.attributes.filter(item=>{
                return fieldsValue.find(row=>{
                    return row == item.developerName;
                });
            });
            fieldsValue.forEach(item=>{
                data.fieldList.forEach((row, idx)=>{
                    if(item==row.developerName){
                        data.fieldList.splice(idx, 1);
                    }
                })
            })
        })
    }
    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: props.entityId
        }).then(res=>{
            console.log('objectmanager', res.rows);
            data.fieldList = res.rows;
            data.attributes = JSON.parse(JSON.stringify(res.rows));
            if(props.id){
                getDetail();
            }
        });
    };
    getFieldList();
    // 往右侧添加
    const handleRightAdd = () => {
        data.field_selector_select_0.forEach(value => {
            const option = data.fieldList.find(opt => opt.developerName === value);
            if (option) {
                data.selectFieldList.push(option);
                data.fieldList = data.fieldList.filter(opt => opt.developerName !== value);
            }
        });
        data.field_selector_select_0 = [];
        formState.fieldList = data.selectFieldList.map(item=>item.value);
    };
    const handleLeftAdd = () => {
        data.field_selector_select_1.forEach(value => {
            const option = data.selectFieldList.find(opt => opt.developerName === value);
            if (option) {
                data.fieldList.push(option);
                data.selectFieldList = data.selectFieldList.filter(opt => opt.developerName !== value);
            }
        });
        data.field_selector_select_1 = [];
        formState.fieldList = data.selectFieldList.map(item=>item.value);
    };
    const handleMoveUp = () => {
        let firstSelectedIndex = data.selectFieldList.findIndex(item=>data.field_selector_select_1[0] == item.developerName);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.field_selector_select_1.slice();
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
        const lastSelectedIndex = data.selectFieldList.indexOf(item=>data.field_selector_select_1[data.field_selector_select_1.length - 1]==item.developerName);
          if (lastSelectedIndex < data.selectFieldList.length - 1) {
            const itemsToMove = data.field_selector_select_1.slice().reverse();
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
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "" || formState[key] == undefined) {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    };

    const handleSave = () => {
        if (validateField()) {
            let url = Interface.create;
            let Fields = data.selectFieldList.map(item=>item.developerName).join(',');
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: "LayoutCompact",
                            objTypeCode: 100046,
                            fields: {
                                MasterLabel: formState.MasterLabel,
                                DeveloperName: formState.DeveloperName,
                                Fields: Fields
                            }
                        }
                    }
                }]
            };
            if(props.id){
                d.actions[0].params.recordId = props.id;
                url = Interface.edit;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then(res => {
                Toast("保存成功！");
                emit("load", false);
            })
        }
    }

</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

    #pleCloneIntroInfo {
        margin: 10px auto 15px;
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
    table.layout{
        width: auto;
        td{
            vertical-align: middle;
            text-align: center;
        }
        td.buttonCell{
            vertical-align: middle !important;
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