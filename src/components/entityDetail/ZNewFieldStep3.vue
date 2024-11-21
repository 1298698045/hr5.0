<template>
    <div class="bWizardBlock tertiaryPalette">
        <div class="pbWizardTitle tertiaryPalette brandTertiaryBgr">
            <div class="ptRightTitle">
                第 3 步，共 5 步
            </div>
            <h2>
                步骤 3. 输入公式
            </h2>
        </div>
        <div class="pbBody">
            <div class="pbWizardHeader">
                <div class="pbTopButtons" style="white-space: nowrap">
                    <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button" @click="handlePrev(1)">
                    &nbsp;
                    <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button" @click="handleNext(3)">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>
            </div>
            <div class="pbJumpTo"></div>
            <div class="pbDescription" style="border-bottom: 0;">
                <div class="linksDiv1">
                    <fieldset class="editFormulaQuickLinks">
                        <legend>快速提示</legend>
                        <ul>
                            <li><a href="javascript:void(0)" class="smallLink" target="_blank">入门</a></li>
                            <li><a href="javascript:void(0)" class="smallLink" title="运算符和函数 （新窗口）">运算符和函数</a></li>
                        </ul>
                    </fieldset>
                </div>
                <div>
                    <p>输入公式并单击“检查语法”以检查错误。单击“高级公式”子选项卡以使用其他字段、运算符和函数。</p><strong>示例： </strong><span
                        class="exampleBox">Reminder Date（提醒日期）= CloseDate - 7</span><a
                        href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?section=help&amp;target=useful_advanced_formulas.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                        title="更多示例... （新窗口）">更多示例...</a>
                </div>
            </div>
            <div class="pbWizardBody">
                <table width="99%">
                    <tbody>
                        <tr>
                            <td>
                                <div class="miniTab tertiaryPalette">
                                    <ul class="miniTabList">
                                        <li :class="{'currentTab':currentTab==0}"><a  href="javascript:void(0)" @click="currentTab=0" title="简单公式 子选项卡 - 个已选择">简单公式</a></li>
                                        <li :class="{'currentTab':currentTab==1}"><a  href="javascript:void(0)" @click="currentTab=1" title="高级公式 子选项卡">高级公式</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="miniTabOn">
                                    <table border="0" cellpadding="0" cellspacing="0" width="99%" style="float:left;">
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                        class="miniTabOn" id="CalculatedFormula_header">
                                                        <tbody>
                                                            <tr id="CalculatedFormula_selector">
                                                                <td id="insertFieldCell" align="left" valign="top">
                                                                    <table v-if="currentTab==0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>选择字段类型</td>
                                                                                <td>插入字段</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <select id="fieldCategorySelector"
                                                                                        name="fieldCategorySelector"
                                                                                        onchange="FormulaEditor.setListToCategory(this.options[this.selectedIndex].value, categoryToFieldMap, 'fieldSelector', null, true)"
                                                                                        title="选择字段类别">
                                                                                        <option value="Account"
                                                                                            selected="selected">客户
                                                                                        </option>
                                                                                    </select></td>
                                                                                <td><select class="fieldSelector"
                                                                                        id="fieldSelector"
                                                                                        name="fieldSelector"
                                                                                        onchange="FormulaEditor.insertFieldReference('CalculatedFormula', this, false);"
                                                                                        title="插入合并字段">
                                                                                        <option value="">-- 插入合并字段 --
                                                                                        </option>
                                                                                        <option :value="item.developerName" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                                                                    </select></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <input v-else value=" 插入字段 " class="inpBtn" name="insertField" title="插入字段" type="button" @click="handleInsertField">
                                                                </td>
                                                                <td id="insertOperatorCell" width="400">
                                                                    <div class="menuButton" id="insertOperator" @click.stop="isMenu=!isMenu">
                                                                        <div class="menuButtonButton"
                                                                            id="insertOperatorButton"><span
                                                                                class="menuButtonLabel"
                                                                                id="insertOperatorLabel"
                                                                                tabindex="0">插入运算符</span>
                                                                        </div>
                                                                        <div class="menuButtonMenu" v-if="isMenu"
                                                                            id="insertOperatorMenu" @click.stop>
                                                                                <a href="javascript:void(0)"
                                                                                class="menuButtonMenuLink firstMenuItem">+
                                                                                加</a><a
                                                                                href="javascript:void(0)"
                                                                                class="menuButtonMenuLink">- 减</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr id="CalculatedFormula_title">
                                                                <td colspan="2" class="formulaFieldTitle">&nbsp;23 (日期)
                                                                    =</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div>
                                                        <textarea class="FormulaText" cols="80" id="CalculatedFormula" maxlength="3900"
                                                            name="CalculatedFormula" rows="20" v-model="formState.CalculatedFormula"
                                                            style="width: 99%; height: 30em;" title="公式编辑器" type="text"
                                                            wrap="soft">
                                                        </textarea>
                                                    </div>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                        class="formulaFooter" id="CalculatedFormula_footer">
                                                        <tbody>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td height="50px" style="width: 500px;"
                                                                                    valign="top">
                                                                                    <input value=" 检查语法 "
                                                                                        class="inpBtn"
                                                                                        name="validateFormula"
                                                                                        title="检查语法" type="submit"><span
                                                                                        id="validationStatus"> </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span
                                                                                        class="formulaFieldTitle"><label
                                                                                            for="Description">描述</label>
                                                                                        <div class="textCounterOuter">
                                                                                            <div
                                                                                                class="textCounterMiddle">
                                                                                                <div class="textCounter"
                                                                                                    id="Description_counter">
                                                                                                    1000 剩余</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span><textarea id="Description"
                                                                                            maxlength="1000"
                                                                                            name="Description"
                                                                                            onchange="handleTextAreaElementChangeWithByteCheck('Description', 1000, 3000, '剩余', '超出极限', false);"
                                                                                            onclick="handleTextAreaElementChangeWithByteCheck('Description', 1000, 3000, '剩余', '超出极限', false);"
                                                                                            onkeydown="handleTextAreaElementChangeWithByteCheck('Description', 1000, 3000, '剩余', '超出极限', false);"
                                                                                            onkeyup="handleTextAreaElementChangeWithByteCheck('Description', 1000, 3000, '剩余', '超出极限', false);"
                                                                                            onmousedown="handleTextAreaElementChangeWithByteCheck('Description', 1000, 3000, '剩余', '超出极限', false);"
                                                                                            style="width: 500px;"
                                                                                            type="text"
                                                                                            wrap="soft"></textarea></span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span
                                                                                        class="formulaFieldTitle"><label
                                                                                            for="InlineHelpText">帮助文本</label>
                                                                                        <div class="textCounterOuter">
                                                                                            <div
                                                                                                class="textCounterMiddle">
                                                                                                <div class="textCounter"
                                                                                                    id="InlineHelpText_counter">
                                                                                                    510 剩余</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><span><textarea id="InlineHelpText"
                                                                                            maxlength="510"
                                                                                            name="InlineHelpText"
                                                                                            onchange="handleTextAreaElementChangeWithByteCheck('InlineHelpText', 510, 1530, '剩余', '超出极限', false);"
                                                                                            onclick="handleTextAreaElementChangeWithByteCheck('InlineHelpText', 510, 1530, '剩余', '超出极限', false);"
                                                                                            onkeydown="handleTextAreaElementChangeWithByteCheck('InlineHelpText', 510, 1530, '剩余', '超出极限', false);"
                                                                                            onkeyup="handleTextAreaElementChangeWithByteCheck('InlineHelpText', 510, 1530, '剩余', '超出极限', false);"
                                                                                            onmousedown="handleTextAreaElementChangeWithByteCheck('InlineHelpText', 510, 1530, '剩余', '超出极限', false);"
                                                                                            style="width: 500px;"
                                                                                            type="text"
                                                                                            wrap="soft"></textarea>&nbsp;
                                                                                        <div class="mouseOverInfoOuter textareaInfo"
                                                                                            
                                                                                            style="width: 500px;"
                                                                                            tabindex="0"><img
                                                                                                :src="require('@/assets/img/s.gif')" alt=""
                                                                                                class="infoIcon"
                                                                                                title="">
                                                                                            <div class="mouseOverInfo">
                                                                                                当用户悬停在此字段旁的信息图标上时，此文本将显示在详细信息页和编辑页中。
                                                                                            </div>
                                                                                        </div></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top" id="CalculatedFormula_functions" v-if="currentTab==1">
                                                    <table class="miniTabOn" style="width: 200px;">
                                                        <tbody>
                                                            <tr><td><span class="bodySmall">函数</span></td></tr>
                                                            <tr>
                                                                <td>
                                                                    <select id="functionCategorySelector" name="functionCategorySelector" title="-- 所有函数类别 --">
                                                                        <option value="">-- 所有函数类别 --</option>
                                                                        <option value="DateTime">日期和时间</option>
                                                                        <option value="Logical">逻辑</option>
                                                                        <option value="Math">数学</option>
                                                                        <option value="Text">文本</option>
                                                                        <option value="Advanced">高级</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <select id="functionSelector" name="functionSelector" onchange="FormulaEditor.setFunctionInfo(this.options[this.selectedIndex].value); " ondblclick="FormulaEditor.insertCode('ValidationFormula', functionNameToPrototypeMap[this.options[this.selectedIndex].value], false)" size="6" title="函数"><option value="ABS" selected="selected">ABS</option>
                                                                        <option value="ACOS">ACOS</option>
                                                                        <option value="ADDMONTHS">ADDMONTHS</option>
                                                                        <option value="AND">AND</option>
                                                                        <option value="ASCII">ASCII</option>
                                                                        <option value="ASIN">ASIN</option>
                                                                        <option value="ATAN">ATAN</option>
                                                                        <option value="ATAN2">ATAN2</option>
                                                                        <option value="BEGINS">BEGINS</option>
                                                                        <option value="BLANKVALUE">BLANKVALUE</option>
                                                                        <option value="BR">BR</option>
                                                                        <option value="CASE">CASE</option>
                                                                        <option value="CASESAFEID">CASESAFEID</option>
                                                                        <option value="CEILING">CEILING</option>
                                                                        <option value="CHR">CHR</option>
                                                                        <option value="CONTAINS">CONTAINS</option>
                                                                        <option value="COS">COS</option>
                                                                        <option value="CURRENCYRATE">CURRENCYRATE</option>
                                                                        <option value="DATE">DATE</option>
                                                                        <option value="DATETIMEVALUE">DATETIMEVALUE</option>
                                                                        <option value="DATEVALUE">DATEVALUE</option>
                                                                        <option value="DAY">DAY</option>
                                                                        <option value="DAYOFYEAR">DAYOFYEAR</option>
                                                                        <option value="DISTANCE">DISTANCE</option>
                                                                        <option value="EXP">EXP</option>
                                                                        <option value="FIND">FIND</option>
                                                                        <option value="FLOOR">FLOOR</option>
                                                                        <option value="FORMATDURATION">FORMATDURATION</option>
                                                                        <option value="FROMUNIXTIME">FROMUNIXTIME</option>
                                                                        <option value="GEOLOCATION">GEOLOCATION</option>
                                                                        <option value="GETSESSIONID">GETSESSIONID</option>
                                                                        <option value="HOUR">HOUR</option>
                                                                        <option value="IF">IF</option>
                                                                        <option value="INCLUDES">INCLUDES</option>
                                                                        <option value="INITCAP">INITCAP</option>
                                                                        <option value="ISBLANK">ISBLANK</option>
                                                                        <option value="ISCHANGED">ISCHANGED</option>
                                                                        <option value="ISCLONE">ISCLONE</option>
                                                                        <option value="ISNEW">ISNEW</option>
                                                                        <option value="ISNULL">ISNULL</option>
                                                                        <option value="ISNUMBER">ISNUMBER</option>
                                                                        <option value="ISOWEEK">ISOWEEK</option>
                                                                        <option value="ISOYEAR">ISOYEAR</option>
                                                                        <option value="ISPICKVAL">ISPICKVAL</option>
                                                                        <option value="LEFT">LEFT</option>
                                                                        <option value="LEN">LEN</option>
                                                                        <option value="LN">LN</option>
                                                                        <option value="LOG">LOG</option>
                                                                        <option value="LOWER">LOWER</option>
                                                                        <option value="LPAD">LPAD</option>
                                                                        <option value="MAX">MAX</option>
                                                                        <option value="MCEILING">MCEILING</option>
                                                                        <option value="MFLOOR">MFLOOR</option>
                                                                        <option value="MID">MID</option>
                                                                        <option value="MILLISECOND">MILLISECOND</option>
                                                                        <option value="MIN">MIN</option>
                                                                        <option value="MINUTE">MINUTE</option>
                                                                        <option value="MOD">MOD</option>
                                                                        <option value="MONTH">MONTH</option>
                                                                        <option value="NOT">NOT</option>
                                                                        <option value="NOW">NOW</option>
                                                                        <option value="NULLVALUE">NULLVALUE</option>
                                                                        <option value="OR">OR</option>
                                                                        <option value="PI">PI</option>
                                                                        <option value="PICKLISTCOUNT">PICKLISTCOUNT</option>
                                                                        <option value="PRIORVALUE">PRIORVALUE</option>
                                                                        <option value="REGEX">REGEX</option>
                                                                        <option value="REVERSE">REVERSE</option>
                                                                        <option value="RIGHT">RIGHT</option>
                                                                        <option value="ROUND">ROUND</option>
                                                                        <option value="RPAD">RPAD</option>
                                                                        <option value="SECOND">SECOND</option>
                                                                        <option value="SIN">SIN</option>
                                                                        <option value="SQRT">SQRT</option>
                                                                        <option value="SUBSTITUTE">SUBSTITUTE</option>
                                                                        <option value="TAN">TAN</option>
                                                                        <option value="TEXT">TEXT</option>
                                                                        <option value="TIMENOW">TIMENOW</option>
                                                                        <option value="TIMEVALUE">TIMEVALUE</option>
                                                                        <option value="TODAY">TODAY</option>
                                                                        <option value="TRIM">TRIM</option>
                                                                        <option value="TRUNC">TRUNC</option>
                                                                        <option value="UNIXTIMESTAMP">UNIXTIMESTAMP</option>
                                                                        <option value="UPPER">UPPER</option>
                                                                        <option value="VALUE">VALUE</option>
                                                                        <option value="VLOOKUP">VLOOKUP</option>
                                                                        <option value="WEEKDAY">WEEKDAY</option>
                                                                        <option value="YEAR">YEAR</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr><td><input value="插入所选函数" class="inpBtn" name="addToFormula" title="插入所选函数" type="button"></td></tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><input type="hidden" id="editorMode" name="editorMode" value="simple"></td>
                        </tr>
                        <tr>
                            <td><input type="hidden" id="changeEditorMode" name="changeEditorMode" value="0"></td>
                        </tr>
                    </tbody>
                </table>
                <span class="blankFieldHandlingDisplay" style="display: inline;" v-if="currentTab==1">
                    <div class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette">
                        <div class="pbBody">
                            <div class="brandTertiaryBgr first pbSubheader tertiaryPalette">
                                <h3>空白字段处理<span class="titleSeparatingColon">:</span></h3>
                            </div>
                            <div class="pbSubsection">
                                <table class="detailList">
                                    <tbody>
                                        <tr class="detailRow">
                                            <td colspan="4">如果您的公式引用了任何数字、货币和百分比字段，请指定当这些字段值为空时如何处理公式输出。</td>
                                        </tr>
                                        <tr class="detailRow">
                                            <td colspan="4">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td class="labelCol last empty">&nbsp;</td>
                                            <td class="dataCol last col02">
                                                <input checked="checked" id="tbaz1" name="tbaz" type="radio" value="1">
                                                <label for="tbaz1">将空白字段视为零</label><br>
                                                <input id="tbaz0" name="tbaz" type="radio" value="0">
                                                <label for="tbaz0">将空白字段视为空白</label>
                                            </td>
                                            <td class="labelCol last empty">&nbsp;</td>
                                            <td class="dataCol last empty">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
            <div class="pbWizardFooter">
                <div class="pbBottomButtons">
                    <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button" @click="handlePrev(1)">
                    &nbsp;
                    <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button" @click="handleNext(3)">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                </div>
            </div>
        </div>
        <InsertField :isShow="isInsertField" v-if="isInsertField" @cancel="isInsertField=false;" />
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
    import { useStore } from "vuex";
    let store = useStore();

    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const props = defineProps({
        type: [String, Number]
    });

    const emit = defineEmits(['prev', 'next', 'cancel']);
    const data = reactive({
        currentTab: 0,
        isMenu: false,
        isInsertField: false,
        entityId: route.query.id,
        fieldList: [],
        fdtype: ""
    });
    const formState = reactive({
        CalculatedFormula: ""
    })
    const { currentTab, isMenu, isInsertField, entityId, fieldList, fdtype } = toRefs(data);

    onMounted(() => {
        window.addEventListener('click', ()=>{
            data.isMenu = false;
        });
        bus.on('fdtype',(e)=>{
            console.log("on", e);
            data.fdtype = e;
            getFieldList();
        })
    })

    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: data.entityId
        }).then(res=>{
            data.fieldList = res.rows.filter(item=>item.dataType==data.fdtype);
        })
    };
    
    const handleInsertField = () => {
        data.isInsertField = true;
    }

    const handleNext = (current) => {
        store.commit("setRecordFormField", {field: "CalculatedFormula", value: formState.CalculatedFormula});
        emit("next", current);
    };
    const handlePrev = (current) => {
        emit("prev", current);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };
</script>
<style lang="less" scoped>
    @import url("~@/style/newField.less");
</style>