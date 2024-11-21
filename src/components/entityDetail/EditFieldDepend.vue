<template>
    <div class="bPageTitle">
        <div class="ptBody">
            <div class="content"><img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                <h1 class="noSecondHeader pageType">编辑字段依赖性</h1>
                <div class="blank">&nbsp;</div>
            </div>
            <div class="links"><a
                    href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=fields_defining_field_dependencies.htm&amp;section=Customizing%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                    title="此页面的帮助 （新窗口）"><span class="helpLink">此页面的帮助</span><img :src="require('@/assets/img/s.gif')"
                        alt="" class="helpIcon"></a></div>
        </div>
        <div class="ptBreadcrumb"></div>
    </div>
    <div class="bPageBlock brandSecondaryBrd bLayoutBlock secondaryPalette" id="ep">
        <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1"
                                class="minWidth" title="">
                            <h2 class="mainTitle"></h2>
                        </td>
                        <td class="pbButton" id="topButtonRow"><input value=" 保存 " class="inpBtn" name="save" title="保存"
                                type="submit" @click="handleSave"> <input value=" 取消 "
                                class="inpBtn" name="cancel" title="取消"  @click="handleCancel" type="submit"> <input value=" 预览 "
                                class="inpBtn" title="预览" type="button"
                                onclick="setLastMousePosition(event);picklistSetup.preview()"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pbBody">
            <div class="pbError" id="errorDiv_ep" style="display: none">错误：无效数据。<br>请查看下列所有错误消息以纠正数据。</div>
            <div class="pbSubsection">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="labelCol">控制字段</td>
                            <td class="dataCol col02">{{rowData.Controller}}</td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="last labelCol">依赖字段</td>
                            <td class="dataCol last col02">{{rowData.Dependent}}</td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="brandTertiaryBrd pbSubheader tertiaryPalette" id="head_instructionHeader_ep"><img
                    :src="require('@/assets/img/s.gif')" alt="隐藏部分 - 说明" class="hideListButton"
                    id="img_instructionHeader" name="说明" onclick="twistSection(this);"
                    onkeypress="if (event.keyCode=='13')twistSection(this);" role="button" style="cursor:pointer;"
                    tabindex="0" title="隐藏部分 - 说明">
                <h3>说明<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr class="last detailRow">
                            <td colspan="4">
                                <div class="instructions">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style="border:none">
                                                    <ul>
                                                        <li>双击某个单元格，以切换显示在列标题中的控制字段值的可见性。</li>
                                                        <li>要同时更改多个单元格，请选择多个单元格，然后单击“包括值”或“排除值”按钮，以同时更改选定的全部单元格的可见性。
                                                        </li>
                                                        <li>按住 Shift 键单击选择一系列相邻的单元格。按住 Ctrl 键单击选择多个不相邻的单元格。</li>
                                                        <li>使用“预览”按钮可对结果进行测试。</li>
                                                    </ul>
                                                </td>
                                                <td style="border:0">
                                                    <fieldset>
                                                        <legend>图例</legend>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td class="legendCell hiddenPickValue">排除的值</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="shownPickValue legendCell">包括的值</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </fieldset>
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
            <div class="brandTertiaryBrd pbSubheader tertiaryPalette" id="head_1_ep">&nbsp;</div>
            <div class="pbSubsection">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr class="detailRow">
                            <td colspan="4">
                                <div class="pbButtons">单击该按钮可在依赖选项列表中包括所选值或从中排除这些值：<br><input value=" 包括值 "
                                        class="inpBtn btnSpacerRight" onclick="picklistSetup.enableAll()" title="包括值"
                                        type="button"><input value=" 排除的值 " class="inpBtn"
                                        onclick="picklistSetup.disableAll()" title="排除的值" type="button"></div>
                            </td>
                        </tr>
                        <tr class="detailRow">
                            <td colspan="4"><input type="hidden" name="pLastModTime" value="1716968089000">

                                <div class="anchorStd" id="matrixAnchor">
                                    <table cellpadding="0" cellspacing="0" style="width:99.8%">
                                        <tbody>
                                            <tr>
                                                <td class="navigationHeaderNormal">显示列：1 - 2（共 2
                                                    列）&nbsp;&lt;&nbsp;上一步&nbsp;|&nbsp;下一步&nbsp;&gt;&nbsp;&nbsp;&nbsp;<a
                                                        href="javascript:picklistSetup.showColumns(-1)">&nbsp;查看全部&nbsp;</a>&nbsp;&nbsp;&nbsp;&nbsp;<a
                                                        alt="转至列： " id="findSwitch"
                                                        href="javascript:picklistSetup.toggleFind()"><img border="0"
                                                            alt="转至列： " :src="require('@/assets/img/twistySubhRight.gif')">转至</a></td>
                                            </tr>
                                            <tr>
                                                <td style="display:none" id="findDialog" nowrap="" align="right"
                                                    colspan="all">转至列： <select
                                                        onchange="picklistSetup.find(this.value);" value="-1">
                                                        <option value=""></option>
                                                        <option value="0">未选取的</option>
                                                        <option value="1">选取的</option>
                                                    </select></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <table id="matrix" cellpadding="0" cellspacing="0"
                                            onmouseup="picklistSetup.handleMouseUp(event)"
                                            onmousedown="picklistSetup.handleMouseDown(event)" style="width:99.8%">
                                            <tbody>
                                                <tr>
                                                    <th class="topSelectHeader" width="16.5%">&nbsp;从区域分配规则中排除:&nbsp;
                                                    </th>
                                                    <th id="th_r0c0" class="selectHeader"
                                                        onclick="picklistSetup.selectColumn(0)" width="33%">
                                                        &nbsp;未选取的&nbsp;</th>
                                                    <th id="th_r0c1" class="selectHeader"
                                                        onclick="picklistSetup.selectColumn(1)" width="33%">
                                                        &nbsp;选取的&nbsp;</th>
                                                </tr>
                                                <tr>
                                                    <th class="topSelectHeader" rowspan="7">&nbsp;Active:&nbsp;</th>
                                                    <td id="te_r0c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;No&nbsp;</td>
                                                    <td id="te_r0c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;No&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r1c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;Yes&nbsp;</td>
                                                    <td id="te_r1c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;Yes&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r2c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;123123&nbsp;</td>
                                                    <td id="te_r2c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;123123&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r3c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;1,2&nbsp;</td>
                                                    <td id="te_r3c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;1,2&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r4c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;1&nbsp;</td>
                                                    <td id="te_r4c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;1&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r5c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;2&nbsp;</td>
                                                    <td id="te_r5c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;2&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td id="te_r6c0" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 未选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;3&nbsp;</td>
                                                    <td id="te_r6c1" class="hiddenPickValue"
                                                        title="排除的: 从区域分配规则中排除: 选取的"
                                                        onmousedown="picklistSetup.handleClick(event,this)"
                                                        ondblclick="picklistSetup.handleDblClick(event,this)"
                                                        onmousemove="picklistSetup.handleMouseMove(event,this)">
                                                        &nbsp;3&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <table cellpadding="0" cellspacing="0" style="width:99.8%">
                                        <tbody>
                                            <tr>
                                                <td class="navigationHeaderNormal">显示列：1 - 2（共 2
                                                    列）&nbsp;&lt;&nbsp;上一步&nbsp;|&nbsp;下一步&nbsp;&gt;&nbsp;&nbsp;&nbsp;<a
                                                        href="javascript:picklistSetup.showColumns(-1)">&nbsp;查看全部&nbsp;</a>&nbsp;
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div><input type="hidden" id="inp_0" name="0" value=""><input type="hidden" id="inp_1"
                                    name="1" value="">
                            </td>
                        </tr>
                        <tr class="last detailRow">
                            <td colspan="4">
                                <div class="pbButtons">单击该按钮可在依赖选项列表中包括所选值或从中排除这些值：<br><input value=" 包括值 "
                                        class="inpBtn btnSpacerRight" onclick="picklistSetup.enableAll()" title="包括值"
                                        type="button"><input value=" 排除的值 " class="inpBtn"
                                        onclick="picklistSetup.disableAll()" title="排除的值" type="button"></div>
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
                        <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1"
                                class="minWidth" title="">&nbsp;</td>
                        <td class="pbButtonb" id="bottomButtonRow"><input value=" 保存 " class="inpBtn" name="save"
                                title="保存" type="submit" @click="handleSave"> <input value=" 取消 "
                                class="inpBtn" name="cancel" title="取消" type="submit" @click="handleCancel"> <input value=" 预览 "
                                class="inpBtn" title="预览" type="button"
                                onclick="setLastMousePosition(event);picklistSetup.preview()">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pbFooter secondaryPalette">
            <div class="bg"></div>
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineEmits, defineProps } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    const { proxy } = getCurrentInstance();
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const labelCol = ref({ style: { width: 'auto' } });
    const props = defineProps({
        rowData: Object
    });
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
    });
    import categoryModal from "@/components/commonModal/CategoryModal.vue";
    const formRef = ref(null);
    const emit = defineEmits(['cancel']);
    let data = reactive({
        listData: [
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            },
            {
                province: "南昌",
                city: "南昌",
                area: "南昌"
            }
        ],
        id: route.query.id
    });
    const { listData, id } = toRefs(data);

    
    
    const getDetail = () => {
        proxy.$get(Interface.objeview.field.DependencyMapDetail, {
            id: props.rowData.Id
        }).then(res=>{

        })
    };
    getDetail();

    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        console.log("rules", rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "" || formState[key] == undefined) {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    }

    // 保存
    const handleSave = () => {
        proxy.$post(Interface.objeview.field.DependencyMapSave, {
            id: props.rowData.Id,
            Controlorder: "",
            value: ""
        }).then(res=>{

        })
    };

    // 取消
    const handleCancel = () => {
        emit("cancel", false);
    };
</script>
<style lang="less" scoped>
    .bPageTitle {
        padding: 15px 0 0;
        margin-bottom: 15px;

        .ptBody {
            color: #000;
            padding: 0;
            overflow: hidden;

            .content {
                float: left;
                width: 70%;
                vertical-align: middle;

                .blank {
                    font-size: 0;
                    clear: both;
                }

                .pageType {
                    color: #000;
                    font-weight: normal;
                    font-size: 20px;
                    white-space: nowrap;
                    padding-left: 1px;
                    font-family: Arial, Helvetica, sans-serif;
                }
            }

            .links {
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                float: right;
                text-align: right;
                vertical-align: middle;
                white-space: nowrap;

                a {
                    color: #015ba7;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }

                    .helpIcon {
                        background: transparent url("~@/assets/img/help_orange.png") no-repeat;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }

    .pageTitleIcon {
        display: none;
    }

    .bPageBlock {
        font-family: 'Helvetica';
        color: #3c3d3e;
        background-repeat: no-repeat;
        background-position: left bottom;
        clear: both;
        background-image: none;
        margin: 0;
        border-top: 3px solid #747e96;
        background-color: #f8f8f8;
        border-bottom: 1px solid #eaeaea;
        border-left: 1px solid #eaeaea;
        border-right: 1px solid #eaeaea;
        border-radius: 4px;
        font-size: 12px;
        .pbHeader {
            border-bottom: 1px solid #fff;
            padding: 0;

            
            table {
                width: 100%;
                border-spacing: 0;
                padding: 5px 0;
                border-bottom: 1px solid #dbdbdb;

            }
        }
        td {
            padding: 5px 12px;
            color: #000;
        }
        .pbTitle {
            vertical-align: middle;
            color: #222;
            width: 30%;
            margin: 0;

            img.minWidth {
                height: 1px;
                width: 190px;
                margin: 0 0 -1px 0;
                padding: 0;
                border: 0;
                visibility: hidden;
                display: block;
            }
        }

        td.pbButton {
            padding: 0;
            vertical-align: middle;
        }

        .pbBody {
            background-color: transparent;
            background-image: none;
            margin: 0;
            padding: 0;

            .pbSubsection {
                margin-top: 7px;
                padding: 0 12px;

                .detailList {
                    width: 100%;
                    border-collapse: collapse;

                    a {
                        color: #000;
                        text-decoration: underline;
                    }

                    input[type="radio"],
                    input[type="checkbox"] {
                        margin: 0 6px 0 0;
                        width: 14px;
                        height: 14px;
                    }

                    .radioGroup {
                        li {
                            padding-bottom: 16px;
                        }
                    }

                    td {
                        vertical-align: top;
                        font-family: Arial, Helvetica, sans-serif;
                    }

                    td[colspan="4"] {
                        padding: 10px 0 0 16px;
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
                                // border-radius: 2px;
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

                                // color: #015ba7;
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

                    .error {
                        border: 3px solid #c00;
                    }

                    .errorMsg {
                        color: #d74c3b;
                    }

                    .rlLabelField {
                        label {
                            font-weight: bold;
                            margin-left: 10px;
                            margin-right: 5px;
                            color: #333;
                        }

                        #RelationshipLabel {
                            margin-left: 5px;
                        }
                    }

                    .pbButtons {
                        margin-top: 10px;
                        margin-bottom: 10px;
                        text-align: center;
                    }
                }
            }

            .pbSubheader {
                font-weight: bold;
                margin-top: 15px;
                overflow: hidden;
                margin-bottom: 2px;
                background-image: url("~@/assets/img/opacity75.png");
                border-width: 0;
                color: #000;
                padding: 4px 16px;
                border-style: solid;
                background-color: #8e9dbe;
                border-color: #8e9dbe;
                border-top: 1px solid #fff;

                img {
                    height: 11px;
                    width: 11px;
                    margin-right: 4px;
                }

                .hideListButton {
                    background: transparent url("~@/assets/img/twisty_sprite.png") 0 -11px no-repeat;
                }

                h3 {
                    font-size: 13px;
                    display: inline-block;
                }

                .titleSeparatingColon {
                    display: none;
                }
            }
        }

        .pbBottomButtons {
            background-color: transparent;
            background-image: none;
            margin: 0;
            border-top: 1px solid #dbdbdb;

            table {
                width: 100%;
                border-top: 1px solid #fff;
                padding: 5px 0;
                .pbButtonb{
                    padding: 0;
                }
            }
        }
    }

    .anchorStd {
        padding: 0 16px;
        .navigationHeaderNormal {
            padding: 2px 2px;
            white-space: nowrap;
            font-weight: bold;
            text-align: right;
            font-size: 110%;
            border: 0;
            background-color: #8e9dbe;
            color: white;
            border-bottom-width: 0;

            a {
                color: white !important;
            }
        }

        img {
            border: 0;
        }
    }

    tr {
        th.topSelectHeader {
            background-color: #ccc;
            border-right: 1px solid white;
            border-bottom: 1px solid white;
        }

        th.selectHeader {
            background-color: #ccc;
            cursor: pointer;
            text-align: center;
            padding: 2px 0;
            border-right: 1px solid white;
            text-decoration: underline;
        }

        td {
            vertical-align: top;
        }

        td.hiddenPickValue {
            font-weight: lighter;
            font-style: italic;
            color: gray;
            cursor: pointer;
            border-bottom: 1px solid #e3deb8;
            border-right: 1px solid #ccc;
            text-align: center;
            background-color: white;
            padding: 2px 0;
        }

        td.selectedPickValue {
            background-color: #d0d0ff;
        }
        td.shownPickValue{
            font-weight: bold;
            color: black;
            font-style: normal;
            cursor: pointer;
            border-bottom: 1px solid #e3deb8;
            border-right: 1px solid #ccc;
            background-color: #ffffd0;
            text-align: center;
            padding: 2px 0;
        }
    }
    ul li, ol li{
        margin-left: 15px;
        padding-left: 0;
        list-style: disc;
        font-size: 12px;
    }
    fieldset {
        display: block;
        margin-inline-start: 2px;
        margin-inline-end: 2px;
        padding-block-start: 0.35em;
        padding-inline-start: 0.75em;
        padding-inline-end: 0.75em;
        padding-block-end: 0.625em;
        min-inline-size: min-content;
        border-width: 2px;
        border-style: groove;
        border-color: rgb(192, 192, 192);
        border-image: initial;
    }
        fieldset legend {
        font-weight: bold;
        color: black;
    }
    .legendCell {
        cursor: auto !important;
        padding: 2px 20px !important;
        white-space: nowrap;
    }
</style>