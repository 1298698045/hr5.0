<template>
    <div style="padding: 0 12px;">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <h2 class="pageDescription"> 人员档案 对象 表单：新表单</h2>
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
        <div class="bWizardBlock tertiaryPalette">
            <div class="pbWizardTitle tertiaryPalette brandTertiaryBgr">
                <div class="ptRightTitle">
                    第 1 步，共 2 步
                </div>
                <h2>
                    步骤 1. 人员档案 对象表单：新表单
                </h2>
            </div>
            <div class="pbBody">
                <div class="pbWizardHeader">
                    <div class="pbTopButtons" style="white-space: nowrap">
                        <!-- <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button"
                            @click="handlePrev(2)">
                        &nbsp; -->
                        <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button"
                            @click="handleNext">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit"
                            @click="handleCancel">
                    </div>
                </div>
                <div class="pbJumpTo"></div>
                <div class="pbDescription  pbDescriptionEmpty "></div>
                <div class="pbWizardBody">
                    <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette">
                        <div class="pbBody">
                            <div class="brandTertiaryBgr first pbSubheader tertiaryPalette" id="head_1_ep"><span
                                    class="pbSubExtra"><span class="requiredLegend brandTertiaryFgr"><span
                                            class="requiredExampleOuter"><span
                                                class="requiredExample">&nbsp;</span></span><span
                                            class="requiredMark">*</span><span class="requiredText"> =
                                            必填信息</span></span></span>
                                <h3>表单信息<span class="titleSeparatingColon">:</span></h3>
                            </div>
                            <div class="pbSubsection">
                                <table class="detailList">
                                    <tbody>
                                        <tr>
                                            <td class="labelCol last requiredInput">
                                                <label for="p1"><span class="assistiveText">*</span>表单名</label>
                                            </td>
                                            <td class="dataCol last col02">
                                                <div class="requiredInput">
                                                    <div class="requiredBlock"></div>
                                                    <input id="p1" maxlength="80" name="p1" size="20" type="text" v-model="formState.Name">
                                                    <div class="errorMsg" v-if="rules.Name.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                                </div>
                                            </td>
                                            <td class="labelCol last empty">&nbsp;</td>
                                            <td class="dataCol last empty">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td class="last labelCol">
                                                <label for="InlineHelpText">描述</label>
                                                <div class="textCounterOuter">
                                                    <div class="textCounterMiddle">
                                                        <div class="textCounter" id="InlineHelpText_counter">510 剩余</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="last data2Col" colspan="3">
                                                <textarea cols="100" id="InlineHelpText" maxlength="510"
                                                    name="InlineHelpText" rows="3" type="text" wrap="soft" v-model="formState.Description">
                                                </textarea>&nbsp;
                                                <!-- <div class="mouseOverInfoOuter textareaInfo">
                                                    <img :src="require('@/assets/img/s.gif')"  alt="" class="infoIcon" title="">
                                                    <div class="mouseOverInfo">当用户悬停在此字段旁的信息图标上时，此文本将显示在详细信息页和编辑页中。</div>
                                                </div> -->
                                            </td>
                                        </tr>
    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pbWizardFooter">
                    <div class="pbBottomButtons">
                        <!-- <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button"
                            @click="handlePrev(2)">
                        &nbsp; -->
                        <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button"
                            @click="handleNext">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit"
                            @click="handleCancel">
                    </div>
                </div>
            </div>
            <InsertField :isShow="isInsertField" v-if="isInsertField" @cancel="isInsertField=false;" />
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, UpOutlined
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        toRaw,
        nextTick,
        defineEmits,
        defineProps
    } from "vue";
    import InsertField from "@/components/entityDetail/InsertField.vue";
    import Interface from "@/utils/Interface.js";
    import bus from '@/utils/eventBus.js';

    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const props = defineProps({
        type: [String, Number],
        objectTypeCode: String
    });

    const emit = defineEmits(['prev', 'next', 'cancel']);
    const formState = reactive({
        Name: "",
        Description: ""
    });
    const rules = reactive({
        Name: {
            isRequired: false
        }
    })
    const data = reactive({
        currentTab: 0,
        isMenu: false,
        isInsertField: false,
        entityId: route.query.id,
        fieldList: [],
        childType: ""
    });
    const { currentTab, isMenu, isInsertField, entityId, fieldList, childType } = toRefs(data);

    onMounted(() => {
        window.addEventListener('click', () => {
            data.isMenu = false;
        });
        bus.on('childType', (e) => {
            console.log("on", e);
            data.childType = e;
            getFieldList();
        })
    })

    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: data.entityId
        }).then(res => {
            data.fieldList = res.rows.filter(item => item.dataType == data.childType);
        })
    };

    const handleInsertField = () => {
        data.isInsertField = true;
    }
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "") {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    }
    const handleNext = (current) => {
        if (validateField()) {
            // emit("next", current);
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: "EntityForm",
                            objTypeCode: props.objectTypeCode,
                            fields: {
                                EntityId: data.entityId,
                                Title: formState.Name,
                                Description: formState.Description
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(Interface.create, obj).then(res=>{
                if(res && res.actions[0].state=='SUCCESS'){
                    let id = res.actions[0].returnValue.id;
                    router.push({
                        name: "FormDesign",
                        query: {
                            entityId: data.entityId,
                            id: id
                        }
                    })
                }
            })
        }
    };
    const handlePrev = (current) => {
        emit("prev", current);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };

</script>
<style lang="less" scoped>
    .bPageTitle {
        padding: 15px 0 0;
        margin-bottom: 15px;

        .ptBody {
            width: 100%;
            overflow: hidden;
            background-color: transparent;
            color: #000;
            padding: 0;

            .content {
                float: left;
                vertical-align: middle;
                padding-left: 5px;
                width: 70%;

                .pageType {
                    font-size: 13px;
                    font-weight: bold;
                    color: #4a4a56;
                    padding-left: 2px;
                }

                .pageDescription {
                    font-size: 22px;
                    font-weight: normal;
                    line-height: 22px;
                }

                .blank {
                    font-size: 0;
                    clear: both;
                }
            }

            .links {
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                float: right;
                text-align: right;
                vertical-align: middle;
                font-size: 13px;
                white-space: nowrap;

                a {
                    color: #015ba7;
                    text-decoration: none;

                    span:hover {
                        text-decoration: underline;
                    }

                    .helpIcon {
                        vertical-align: bottom;
                    }
                }
            }
        }

        .ptBreadcrumb {
            font-family: 'Verdana', 'Geneva', sans-serif;
            font-size: 13px;
            margin-bottom: -15px;
            height: 15px;
            vertical-align: middle;
            height: auto;
            margin-top: 3px;
            margin-bottom: 0;

            a {
                color: #015ba7;
                text-decoration: none;
            }
        }
    }

    .bWizardBlock {
        background-color: transparent;
        border: 0 none;
        margin-right: 0;
        color: #3c3d3e;
        font-size: 90%;

        .pbWizardTitle {
            background-position: bottom;
            background-repeat: repeat-x;
            font-weight: bold;
            color: white;
            background-color: #8e9dbe;
            border-color: #8e9dbe;
            padding: 8px 12px;
            font-size: 13px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            background-image: none;

            .ptRightTitle {
                float: right;
            }

            h2 {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 13px;
            }
        }

        .pbBody {
            padding: 0;
            background: #f8f8f8 none;
            border: 1px solid #eaeaea;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;

            a {
                color: #000;
                font-size: 12px;
                text-decoration: underline;

                &:hover {
                    color: #015ba7;
                }
            }

            .pbWizardHeader {
                overflow: hidden;
                height: 1%;
                border-bottom: 1px solid #dbdbdb;
                margin-bottom: 0;

                .pbTopButtons {
                    padding: 8px 12px;
                    margin: 0;
                    float: right;
                    color: #333;
                }
            }

            .pbDescription {
                color: #333;
                clear: right;
                margin: 0;
                border-top: 1px solid #fff;
                padding: 10px;
                border-bottom: 0 none;

                &.pbDescriptionEmpty {
                    display: none;
                }

                .linksDiv1 {
                    .editFormulaQuickLinks {
                        float: right;
                    }

                    fieldset {
                        overflow: visible;
                        position: relative;
                        background-color: white;

                        legend {
                            font-weight: bold;
                            color: black;
                            display: block;
                            padding-inline-start: 2px;
                            padding-inline-end: 2px;
                            unicode-bidi: isolate;
                            border-width: initial;
                            border-style: none;
                            border-color: initial;
                            border-image: initial;
                        }

                        ul {
                            display: block;
                            list-style-type: disc;
                            margin-block-start: 1em;
                            margin-block-end: 1em;
                            margin-inline-start: 0px;
                            margin-inline-end: 0px;
                            padding-inline-start: 40px;
                            unicode-bidi: isolate;
                            padding: 0 10px;
                            list-style: unset;

                            li {
                                margin-left: 15px;
                                padding-left: 0;
                                list-style: unset;

                                a {
                                    color: #000;
                                    text-decoration: underline;

                                    &:hover {
                                        text-decoration: underline;
                                        color: #015ba7;
                                    }
                                }
                            }
                        }
                    }
                }

                .exampleBox {
                    background-color: #ffe;
                    border: 1px solid #aaa;
                    margin: 0 15px;
                    padding: 0 8px;
                }
            }

            .pbWizardBody {
                clear: both;
                padding: 8px 12px;
                margin: 0;
                padding-bottom: 16px;
                border-bottom: 1px solid #dbdbdb;
                border-top: 0 none;
                position: relative;

                .miniTabOn {
                    margin-top: 5px;
                }

                #insertFieldCell,
                #insertOperatorCell {
                    padding: 7px 5px;
                    vertical-align: middle;
                }
            }

            .pbWizardFooter {
                padding: 8px 12px;
                margin: 0;
                border-top: 1px solid #fff;
                overflow: hidden;

                .pbBottomButtons {
                    margin-right: 0;
                    float: right;
                }
            }

            td {
                color: #000;
                font-family: Arial, Helvetica, sans-serif;
            }

            .miniTab {
                background-color: transparent !important;
                padding: 5px 0 0;
                margin-bottom: -3px;
                font-family: Arial, Helvetica, sans-serif;
                border-color: #8e9dbe;

                .miniTabList {
                    border-bottom: 1px solid #cecece;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;

                    li {
                        background: url("~@/assets/img/subtab_sprite.png");
                        background-position: left -199px !important;
                        background-repeat: no-repeat;
                        background-color: transparent;
                        display: inline-block;
                        padding: 0 8px;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: -5px;
                        margin-left: 6px;
                        height: 27px;
                        border: 0;
                        white-space: nowrap;

                        a {
                            background: url("~@/assets/img/subtab_sprite.png");
                            background-repeat: no-repeat;
                            background-position: right -299px;
                            display: inline-block;
                            padding-top: 8px;
                            padding-right: 8px;
                            padding-bottom: 4px;
                            padding-left: 0;
                            // height: 15px;
                            margin-right: -13px;
                            font-weight: bold;
                            color: #333;
                            text-decoration: none;

                            &:hover {
                                color: #015ba7;
                                text-decoration: underline;
                            }
                        }
                    }

                    li.currentTab {
                        background-position: left 0 !important;
                        border-bottom: 1px solid transparent;
                        height: 27px;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: -1px;
                        margin-left: 2px;
                        font-weight: bold;

                        a {
                            background: url("~@/assets/img/subtab_sprite.png");
                            background-repeat: no-repeat;
                            background-position: right -100px;
                            margin-right: -17px;
                            padding-top: 8px;
                            padding-right: 12px;
                            padding-bottom: 5px;
                            padding-left: 3px;
                        }
                    }
                }
            }

            .formulaFieldTitle {
                font-weight: bold;
            }

            .formulaFooter td {
                white-space: nowrap;
            }

        }

        .bPageBlock {
            border: 0 none;
            background: none;

            .pbBody {
                padding: 0;
                margin: 0;
                background: #f8f8f8 none;
                border: none;

                .pbSubheader {
                    margin-left: -12px;
                    margin-right: -12px;
                    padding-left: 12px;
                    padding-right: 12px;
                    border-top: 1px solid #fff;
                }

                .pbSubheader.first {
                    margin-top: 0;
                }

                .pbSubheader {
                    background-image: url("~@/assets/img/opacity75.png");
                    border-width: 0;
                    color: #000;
                    padding: 4px 16px;
                    background-color: #8e9dbe;
                    border-color: #8e9dbe;
                    border-style: solid;
                    margin-top: 15px;

                    h3 {
                        font-size: 13px;
                    }

                    .pbSubExtra {
                        float: right;

                        .requiredLegend {
                            padding: 0 2px;
                            font-weight: normal;
                            color: #000;

                            .requiredExampleOuter {
                                margin: 0 .2em 0 .3em;
                                padding: 1px 0;

                                .requiredExample {
                                    border-left: 3px solid #c00;
                                    vertical-align: 1px;
                                }
                            }

                            .requiredMark {
                                position: absolute;
                                display: inline;
                                color: #f8f8f8;
                                margin-right: 2px;
                            }
                        }
                    }
                }
            }

            .detailList {
                width: 100%;

                td[colspan="4"] {
                    padding: 10px 0 0 16px;
                }

                td {
                    vertical-align: top;
                }

                tr {
                    td {
                        border-bottom-width: 0;
                        border-bottom: none;
                        border-color: #ececec;
                    }
                }

                td.labelCol {
                    padding-top: 3px;
                    padding-bottom: 3px;
                    color: #4a4a56;
                    width: 18%;
                    white-space: nowrap;
                    padding-right: 10px;
                    padding-left: 2px;
                    text-align: right;
                    font-weight: bold;
                    font-size: 13px;
                }

                td.data2Col {
                    width: 82%;
                }

                td.data2Col,
                td.dataCol {
                    padding-top: 3px;
                    padding-bottom: 3px;
                    padding-right: 2px;
                    padding-left: 10px;
                    text-align: left;

                    // width: 82%;
                    .requiredInput {
                        position: relative;
                        height: 100%;

                        .requiredBlock {
                            background-color: #c00;
                            position: absolute;
                            left: -4px;
                            width: 3px;
                            top: 1px;
                            bottom: 1px;
                        }

                        input[type='text'] {
                            vertical-align: middle;
                            margin-right: .25em;
                            height: 20px;
                            width: 173px;
                            padding: 2px;
                        }

                        .errorMsg {
                            padding-left: 3px;
                            color: #d74c3b;
                        }
                    }

                    textarea {
                        border-radius: 2px;
                        resize: both;
                        font-family: 'Arial', 'Helvetica', sans-serif;
                        font-size: 100%;
                        padding: 2px;
                    }

                    .showHideLink {
                        a {
                            color: #000;

                            &:hover {
                                color: #015ba7;
                                text-decoration: underline;
                            }
                        }
                    }

                    input[type="checkbox"] {
                        vertical-align: middle;
                        margin: 3px;
                        width: 15px;
                        height: 15px;
                    }
                }

                td.dataCol {
                    width: 32% !important;
                }

                td.dataCol.col02 {
                    width: 32%;
                    border-right: none;
                    padding-right: 20px;
                }
            }

            table.detailList {
                input[type="radio"] {
                    margin: 0 6px 0 0;
                }
            }
        }
    }

    .textCounterMiddle {
        display: none;
    }

    .mouseOverInfoOuter {
        position: relative;
        display: inline;
        text-decoration: none;

        .infoIcon {
            vertical-align: top;
            margin-top: 3px;
            background-image: url("~@/assets/img/info_sprite.png");
            background-position: left top;
            width: 16px;
            height: 15px;

            &:hover {
                background-position: left -19px;
            }
        }

        &:hover {
            .mouseOverInfo {
                display: block;
            }
        }

        .mouseOverInfo {
            position: absolute;
            display: none;
            left: 22px;
            bottom: 20px;
            width: 260px;
            background-color: #ffffd0;
            border-color: #333;
            padding: 8px 10px;
            border-radius: 3px;
            font-size: 12px;
            border: 1px solid black;
            z-index: 10px;
            white-space: normal;
            font-weight: normal;
            color: #000;
        }
    }

    #operationCtr .opSimple td {
        background-color: #e3ebf0;
        border-bottom: 2px solid #8e9dbe;
        vertical-align: middle;
        padding-top: 4px;
        padding-bottom: 4px;
    }

    #operationCtr .operation td {
        padding-top: 4px;
        padding-bottom: 4px;
        vertical-align: middle;
    }

    .opComplex {
        background-color: #f8f8d8;
    }

    .opField {
        border-left: 1px solid #8e9dbe;
        padding-left: 10px;
        width: 75%;
    }

    th {
        text-align: left;
    }

    .errorMsg {
        padding-left: 3px;
        color: #d74c3b;
    }

    .assistiveText {
        display: none;
    }
</style>