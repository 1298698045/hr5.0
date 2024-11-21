<template>
    <div style="padding: 0 12px;height: 100%;">
        <div style="height: 100%;overflow-y: auto;">
            <div class="bPageTitle">
                <div class="ptBody">
                    <div class="content">
                        <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                        <h1 class="pageType">查找并替换选项列表<span class="titleSeparatingColon">:</span></h1>
                        <h2 class="pageDescription"> Active</h2>
                        <div class="blank">&nbsp;</div>
                    </div>
                    <div class="links">
                        <a href="javascript:void(0)" title="此页面的帮助 （新窗口）">
                            <span class="helpLink">此页面的帮助</span>
                            <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon">
                        </a>
                    </div>
                </div>
                <div class="ptBreadcrumb"></div>
            </div>
            <div class="bDescription">用新值全局替换选项列表中的现有值。请确保，您已先在选项列表字段上创建新值。请注意，替换现有选项列表值将更新记录的上次修改人日期和时间。</div>
            <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette bEditBlock">
                <div class="pbHeader">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td class="pbTitle">
                                    <img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth" title="">
                                    <h2 class="mainTitle">验证规则编辑</h2>
                                </td>
                                <td class="pbButton" id="topButtonRow">
                                    <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit" @click="handleSave">
                                    <input value=" 保存并新建 " class="inpBtn" name="save_new" title="保存并新建" type="submit">
                                    <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit" @click="handleCancel">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="pbBody">
                    <div class="pbSubsection">
                        <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr class="detailRow">
                                    <td colspan="4">
                                        <div class="linksDivWrapper">
                                            <div class="linksDiv">
                                                <fieldset class="editFormulaQuickLinks">
                                                    <legend>快速提示</legend>
                                                    <ul>
                                                        <li><a href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?section=Customizing&amp;target=customize_functions.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                                                                class="smallLink" title="运算符和函数 （新窗口）">运算符和函数</a></li>
                                                    </ul>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol requiredInput"><label for="ValidationName"><span
                                                class="assistiveText">*</span>规则名</label></td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input id="ValidationName" maxlength="40"
                                                name="ValidationName"
                                                v-model="formState.ValidationName"
                                                size="40" tabindex="1" type="text">
                                                <div class="errorMsg" v-if="rules.ValidationName.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol"><label for="Active">启用</label></td>
                                    <td class="data2Col" colspan="3">
                                        <input checked="checked" id="Active" name="Active"
                                            tabindex="2" type="checkbox" v-model="formState.Active">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="last labelCol"><label for="Description">描述</label></td>
                                    <td class="dataCol last col02">
                                        <textarea cols="80" id="Description" maxlength="255" v-model="formState.Description"
                                            name="Description" rows="3" tabindex="3" type="text" wrap="soft"></textarea>
                                    </td>
                                    <td class="labelCol last empty">&nbsp;</td>
                                    <td class="dataCol last empty">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pbSubheader brandTertiaryBgr tertiaryPalette">
                        <span class="pbSubExtra"><span class="requiredLegend brandTertiaryFgr"><span class="requiredExampleOuter"><span class="requiredExample">&nbsp;</span></span><span class="requiredMark">*</span><span class="requiredText"> = 必填信息</span></span></span>
                        <h3>错误条件公式<span class="titleSeparatingColon">:</span></h3>
                    </div>
                    <div class="pbSubsection">
                        <table class="detailList">
                            <tbody>
                                <tr class="detailRow">
                                    <td colspan="4"><span class="exampleTitle">示例：</span><span class="example">Discount_Percent__c&gt;0.30</span><a href="javascript:void(0)" class="moreLink">更多示例...</a></td>
                                </tr>
                                <tr class="detailRow"><td colspan="4">如果“折扣”大于 30%，则显示错误</td></tr>
                                <tr class="detailRow">
                                    <td colspan="4"><span class="explantaion">如果公式结果为<strong>真</strong>，则显示"错误消息"区中定义的文本</span></td>
                                </tr>
                                <tr class="last detailRow">
                                    <td colspan="4">
                                        <div class="miniTabOn">
                                            <table width="500px" style="float: left;width: 500px;">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top">
                                                            <table width="100%" class="miniTabOn">
                                                                <tbody>
                                                                    <tr id="ValidationFormula_selector">
                                                                        <td id="insertFieldCell" align="left" valign="top">
                                                                            <input value=" 插入字段 " class="inpBtn" name="insertField" title="插入字段" type="button">
                                                                        </td>
                                                                        <td id="insertOperatorCell" style="width: 400px;" width="400">
                                                                            <div class="menuButton" @click.stop>
                                                                                <input type="button" class="inpBtn menuButtonButton" value="插入运算符"  @click="isMenu=!isMenu">
                                                                                <div class="menuButtonMenu" v-if="isMenu">
                                                                                    <a href="javascript:;" v-for="(item, index) in operatorList" :key="index" class="menuButtonMenuLink firstMenuItem" @click="insertOperator(item)">{{item.name}}</a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div class="requiredInput">
                                                                <div class="requiredBlock noLabel"></div>
                                                                <textarea class="FormulaText" aria-label="Insert Formula" cols="80" id="ValidationFormula" maxlength="3900" name="ValidationFormula" rows="20" style="width: 500px; height: 140px;" tabindex="4" type="text" wrap="soft" v-model="formState.ValidationFormula"></textarea>
                                                            </div>
                                                            <table width="100%" class="formulaFooter">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colspan="2">
                                                                            <table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td height="50" style="width: 500px;" valign="top">
                                                                                            <input value=" 检查语法 " class="inpBtn" name="validateFormula" title="检查语法" type="submit"><span id="validationStatus"> </span>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td valign="top" id="ValidationFormula_functions">
                                                            <table class="miniTabOn" id="advFunctions" style="width: 200px;">
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
                                                                            <select id="functionSelector" name="functionSelector" size="6" title="函数" v-model="formState.functionSelector">
                                                                                <option value="ABS" selected="selected">ABS</option>
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
                                                                    <tr><td><input value="插入所选函数" class="inpBtn" name="addToFormula" title="插入所选函数" type="button" @click="addToFormula"></td></tr>
                                                                    <tr><td class="funcFormat" id="funcFormat">ABS(number)</td></tr>
                                                                    <tr>
                                                                        <td class="funcExplain" id="funcExplain">返回数值的绝对值（不含正负号的数字）<br><br>
                                                                            <a href="javascript:void(0);" title="有关此函数的帮助 （新窗口）">有关此函数的帮助</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
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
                    <div class="pbSubheader brandTertiaryBgr tertiaryPalette">
                        <span class="pbSubExtra"><span class="requiredLegend brandTertiaryFgr"><span class="requiredExampleOuter"><span class="requiredExample">&nbsp;</span></span><span class="requiredMark">*</span><span class="requiredText"> = 必填信息</span></span></span>
                        <h3>错误消息<span class="titleSeparatingColon">:</span></h3>
                    </div>
                    <div class="pbSubsection">
                        <table class="detailList">
                            <tbody>
                                <tr class="detailRow">
                                    <td colspan="4"><span class="exampleTitle">示例：</span><span class="example">折扣百分比不能超过
                                            30%</span></td>
                                </tr>
                                <tr class="detailRow">
                                    <td colspan="4"><span class="explantaion">此消息将在"错误条件"公式为<strong>真</strong>时显示</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol requiredInput"><label for="ValidationMessage"><span
                                                class="assistiveText">*</span>错误消息</label></td>
                                    <td class="dataCol col02">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <textarea cols="80" id="ValidationMessage" v-model="formState.ValidationMessage"
                                                maxlength="255" name="ValidationMessage" rows="3" tabindex="5" type="text"
                                                wrap="soft"></textarea>
                                            <div class="errorMsg" v-if="rules.ValidationMessage.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                        </div>
                                    </td>
                                    <td class="labelCol last empty">&nbsp;</td>
                                    <td class="dataCol last empty">&nbsp;</td>
                                </tr>
                                <tr class="detailRow">
                                    <td colspan="4"><span class="errorExplanation">该错误消息可出现在页首或页中某一特定字段的下面</span></td>
                                </tr>
                                <tr>
                                    <td class="labelCol last requiredInput">错误位置</td>
                                    <td class="last data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input id="pLocTOP_OF_PAGE" name="pLoc" type="radio" value="TOP_OF_PAGE" v-model="formState.pLoc">
                                            <label  for="pLocTOP_OF_PAGE">页首</label>&nbsp;
                                            <input checked="checked" id="pLocFIELD" name="pLoc" type="radio" value="FIELD" v-model="formState.pLoc">
                                            <label for="pLocFIELD">字段</label>&nbsp;
                                            <select id="FieldEnumOrId" v-if="formState.pLoc=='FIELD'" v-model="formState.FieldEnumOrId"
                                                name="FieldEnumOrId" style="display:inline" tabindex="12">
                                                <option value="EventIdentifier" selected="selected">事件 ID</option>
                                                <option value="SecurityEventData">事件数据</option>
                                                <option value="EventDate">事件日期</option>
                                                <option value="RowsProcessed">已处理的行数</option>
                                                <option value="Score">得分</option>
                                                <option value="Summary">摘要</option>
                                                <option value="Operation">操作</option>
                                                <option value="QueriedEntities">查询实体</option>
                                                <option value="SourceIp">源 IP 地址</option>
                                                <option value="User">用户</option>
                                                <option value="UserAgent">用户客服人员</option>
                                                <option value="RequestIdentifier">请求标识符</option>
                                                <option value="Uri">Uri</option>
                                            </select>
                                            <div class="mouseOverInfoOuter" >
                                                <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                                <div class="mouseOverInfo">
                                                    在用户应该更正的字段旁边显示错误消息。如果您的验证规则检查多个字段，则会在页面顶部显示错误消息。
                                                </div>
                                            </div>
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
                                    <img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth" title="">&nbsp;
                                </td>
                                <td class="pbButtonb" id="bottomButtonRow">
                                    <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit" @click="handleSave">
                                    <input value=" 保存并新建 " class="inpBtn" name="save_new" title="保存并新建" type="submit">
                                    <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="submit" @click="handleCancel">
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

    const props = defineProps({
        entityId: String,
        id: String,
        objectTypeCode: String
    })
    const emit = defineEmits(['cancel']);

    const formState = reactive({
        ValidationName: "",
        Active: false,
        Description: "",
        ValidationFormula: "",
        ValidationMessage: "",
        pLoc: "FIELD",
        FieldEnumOrId: "",
        functionSelector: "ABS"
    });
    const rules = reactive({
        ValidationName: {
            isRequired: false
        },
        ValidationMessage: {
            isRequired: false
        },
        pLoc: {
            isRequired: false
        }
    })

    const data = reactive({
        operatorList: [
            {
                value: "+",
                name: "+ 加"
            },
            {
                value: "-",
                name: "- 减"
            },
            {
                value: "*",
                name: "* 乘"
            },
            {
                value: "/",
                name: "/ 除"
            },
            {
                value: "^",
                name: "^ 乘方"
            },
            {
                value: "(",
                name: "( 左括号"
            },
            {
                value: ")",
                name: ") 右括号"
            },
            {
                value: "&amp;",
                name: "& 串联"
            },
            {
                value: "=",
                name: "= 等于"
            },
            {
                value: "&lt;&gt;",
                name: "<> 不等于"
            },
            {
                value: "&lt;",
                name: "< 小于"
            },
            {
                value: "&gt;",
                name: "> 大于"
            },
            {
                value: "&lt;=",
                name: "<= 小于或等于"
            },
            {
                value: "&gt;=",
                name: ">= 大于或等于"
            },
            {
                value: "&amp;&amp;",
                name: "&& 与"
            },
            {
                value: "||",
                name: "|| 或"
            }
        ],
        isMenu: false
    });
    const { operatorList, isMenu } = toRefs(data);

    onMounted(()=>{
        window.addEventListener('click',()=>{
            data.isMenu = false;
        })
    });
    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: "EntityValidationRule"
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
            // formState.MasterLabel = fields.Label.value;
            // formState.DeveloperName = fields.Name.value;
        })
    }
    if(props.id){
        getDetail();
    }
    const insertOperator = (item) => {
        console.log("item", item);
        formState.ValidationFormula = formState.ValidationFormula +' '+item.value + ' ';
        data.isMenu = false;
    }
    const addToFormula = () => {
        formState.ValidationFormula = formState.ValidationFormula +' '+formState.functionSelector+' ';
    }
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
    const handleCancel = () => {
        emit('cancel', false);
    };
    const handleSave = () => {
        if(validateField()){
            // let params = {
            //     objTypeCode: props.objectTypeCode,
            //     apiName: "",
            //     id: props.id,
            //     fields: {
            //         EntityId: props.EntityId,
            //         Active: formState.Active ? 1 : 0,
            //         Description: formState.Description,
            //         ValidationFormula: formState.ValidationFormula,
            //         ValidationMessage: formState.ValidationMessage,
            //         PLocation: formState.pLoc,
            //         ErrorField: formState.FieldEnumOrId
            //     }
            // }
            // let obj = {
            //     message: JSON.stringify(params)
            // }
            // proxy.$post(Interface.objeview.validationRules.create, obj).then(res=>{
            //     Toast("保存成功！");
            //     emit("cancel", false);
            // });
            let url = Interface.create;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        // recordId: props.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: "EntityValidationRule",
                            // objTypeCode: 100006,
                            fields: {
                                EntityId: props.EntityId,
                                Active: formState.Active ? 1 : 0,
                                Description: formState.Description,
                                ValidationFormula: formState.ValidationFormula,
                                ValidationMessage: formState.ValidationMessage,
                                PLocation: formState.pLoc,
                                ErrorField: formState.FieldEnumOrId
                            }
                        }
                    }
                }]
            };
            console.log("props.id", props.id);
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
<style scoped>
    .exampleTitle {
    font-weight: bold
}

.example {
    background-color: rgb(254, 255, 237);
    margin: .5em;
    padding: .2em;
    border: solid 1px;
    line-height: 2em
}

.explantaion,
.errorExplanation {
    padding-top: .7em;
    padding-bottom: .7em;
    display: block
}

.selectMenuDiv .selectMenuButton {
    white-space: nowrap
}

.formulaFieldLabel {
    font-weight: bold;
    margin-right: 3em
}

.bPageBlock .detailList .labelCol {
    width: 1%;
    white-space: nowrap;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    text-align: left
}

.requiredInput label {
    vertical-align: middle;
    margin-bottom: -.7em
}

span.requiredMark {
    margin-left: -.4em
}

.linksDiv fieldset {
    white-space: nowrap;
    overflow: visible;
    margin-top: -1.5em;
    margin-left: -3em;
    position: relative;
    float: right;
    display: block
}

.validationRulesQuickLinks {
    float: right
}

#advFunctions {
    margin-top: -4.5em;
    position: relative
}

.moreLink {
    padding-left: 1em
}

.linksDivWrapper {
    position: relative
}

.linksDiv {
    position: absolute;
    top: 0;
    right: 0
}

.bEditBlock .linksDiv fieldset {
    margin: 0;
    float: none
}
</style>
<style lang="less" scoped>
    /* 新建 */
    @import url("@/style/fieldForm.less");
    /* 编辑 */
    @import url("@/style/fieldDetail/fieldEdit.less");

    .bPageTitle {
        /* padding: 0 0 0; */
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

    .bDescription {
        padding: 0;
        margin: 16px 0;
        font-size: 12px;
        color: #3c3d3e;
    }

    .pbSubsection {
        margin-top: 7px;
        padding: 0 12px;
    }
    .detailList{
        tr{
            td.labelCol{
                width: 1%;
            }
        }
    }
    .linksDivWrapper{
        position: relative !important;
    }
    .linksDiv {
        position: absolute;
        top: 0;
        right: 0;
        fieldset{
            white-space: nowrap;
            overflow: visible;
            position: relative;
            display: block;
            float: none;
            font-size: 12px;
            margin-inline-start: 2px;
            margin-inline-end: 2px;
            padding-block-start: 0.35em;
            padding-inline-start: 0.75em;
            padding-inline-end: 0.75em;
            padding-block-end: 0.625em;
            legend{
                font-weight: bold;
                color: black;
            }
            ul{
                padding: 0;
                margin: 12px 0;
                list-style: unset;
                li{
                    margin-left: 15px;
                    list-style: unset;
                    a{
                        color: #000;
                        &:hover{
                            color: #015ba7;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
    
</style>