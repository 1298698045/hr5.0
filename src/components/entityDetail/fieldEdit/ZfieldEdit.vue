<template>
    <div class="bPageBlock bEditBlock ">
        <div class="pbHeader">
            <table>
                <tbody>
                    <tr>
                        <td class="pbTitle">
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth"
                                title="">
                            <h2 class="mainTitle">自定义字段定义编辑</h2>
                        </td>
                        <td class="pbButton" id="topButtonRow">
                            <input value=" 保存 " class="inpBtn" name="save" title="保存" type="button" @click="handleSave">
                            <input value=" 快速保存 " class="inpBtn" name="save" title="保存" type="button">
                            <input value=" 取消 " class="inpBtn ml5" name="cancel" title="取消" type="button"
                                @click="handleCancel">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pbBody">
            <div class="brandTertiaryBgr first pbSubheader tertiaryPalette">
                <h3>字段信息<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="labelCol requiredInput">
                                <label for="MasterLabel">
                                    <span class="assistiveText">*</span>
                                    字段标签
                                </label>
                            </td>
                            <td class="dataCol col02">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <input id="MasterLabel" maxlength="40" name="MasterLabel" v-model="formState.MasterLabel" size="20" tabindex="1" type="text">
                                    <div class="errorMsg" v-if="rules.MasterLabel.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                </div>
                            </td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                        <tr><td class="labelCol empty">&nbsp;</td><td class="dataCol col02 empty">&nbsp;</td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                        <tr>
                            <td class="labelCol requiredInput">
                                <label for="DeveloperName">
                                    <span class="assistiveText">*</span>
                                    字段名
                                </label>
                            </td>
                            <td class="dataCol col02">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <input id="DeveloperName" maxlength="40" name="DeveloperName" v-model="formState.DeveloperName" size="20" tabindex="2" type="text">
                                    <div class="errorMsg" v-if="rules.DeveloperName.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                </div>
                            </td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="labelCol">
                                <label for="Description">描述</label>
                                <div class="textCounterOuter">
                                    <div class="textCounterMiddle">
                                        <div class="textCounter" id="Description_counter">1000 剩余</div>
                                    </div>
                                </div>
                            </td>
                            <td class="data2Col" colspan="3">
                                <textarea cols="100" id="Description" maxlength="1000" name="Description" v-model="formState.Description" rows="3" tabindex="3" type="text" wrap="soft"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td class="last labelCol">
                                <label for="InlineHelpText">帮助文本</label>
                                <div class="textCounterOuter">
                                    <div class="textCounterMiddle">
                                        <div class="textCounter" id="InlineHelpText_counter">510 剩余</div>
                                    </div>
                                </div>
                            </td>
                            <td class="last data2Col" colspan="3">
                                <textarea cols="100" id="InlineHelpText" maxlength="510" name="InlineHelpText" v-model="formState.InlineHelpText" rows="3" type="text" wrap="soft"></textarea>&nbsp;
                                <div class="mouseOverInfoOuter textareaInfo">
                                    <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                    <div class="mouseOverInfo">当用户悬停在此字段旁的信息图标上时，此文本将显示在详细信息页和编辑页中。</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol">
                                <label for="businessOwner">数据所有者</label>
                            </td>
                            <td class="data2Col" colspan="3">
                                <label class="assistiveText" for="businessOwner_mlktp">
                                    <span class="assistiveText">*</span>搜索范围
                                </label>
                                <div id="businessOwner_top" name="businessOwner_top" style="white-space: nowrap">
                                    <select id="businessOwner_mlktp" name="businessOwner_mlktp" title="搜索范围">
                                        <option value="StandardUserLookup" selected="selected">用户</option>
                                        <option value="regular_group_lookup">公用小组</option>
                                    </select>
                                    <input type="hidden" name="businessOwner_lkid" id="businessOwner_lkid" value="000000000000000">
                                    <input type="hidden" name="businessOwner_lkold" id="businessOwner_lkold" value="null">
                                    <input type="hidden" name="businessOwner_lktp" id="businessOwner_lktp" value="StandardUserLookup">
                                    <input type="hidden" name="businessOwner_lspf" id="businessOwner_lspf" value="0">
                                    <input type="hidden" name="businessOwner_lspfsub" id="businessOwner_lspfsub" value="0">
                                    <input type="hidden" name="businessOwner_mod" id="businessOwner_mod" value="0">
                                    <span class="lookupInput">
                                        <input id="businessOwner" v-model="formState.businessOwner" maxlength="255" name="businessOwner" size="20" title="数据所有者" type="text">
                                        <a id="businessOwner_lkwgt" onclick="setLastMousePosition(event)" secid="businessOwner_mlbtn" title="数据所有者 查找（新窗口）">
                                            <img :src="require('@/assets/img/s.gif')" alt="数据所有者 查找（新窗口）" class="lookupIcon" title="数据所有者 查找（新窗口）">
                                        </a>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol">
                                <label for="businessStatus">字段使用情况</label>
                            </td>
                            <td class="data2Col" colspan="3">
                                <select id="businessStatus" name="businessStatus" v-model="formState.businessStatus">
                                    <option>--无--</option><option value="Active">Active</option>
                                    <option value="DeprecateCandidate">DeprecateCandidate</option>
                                    <option value="Hidden">Hidden</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol">
                                <label for="securityClassification">数据灵敏性级别</label>
                            </td>
                            <td class="data2Col" colspan="3">
                                <select id="securityClassification" name="securityClassification"  v-model="formState.securityClassification"><option>--无--</option><option value="Public">Public</option>
                                    <option value="Internal">Internal</option>
                                    <option value="Confidential">Confidential</option>
                                    <option value="Restricted">Restricted</option>
                                    <option value="MissionCritical">MissionCritical</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol"><label for="complianceGroup">合规性分类</label></td>
                            <td class="data2Col" colspan="3">
                                <table class="multiSelectPicklistTable">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td colspan="100%" height="5"></td>
                                        </tr>
                                        <tr class="multiSelectPicklistRow">
                                            <td>
                                                <select multiple="multiple" id="complianceGroup_unselected" v-model="complianceGroup_unselected" title="合规性分类 - 可用" size="5" style="width: 122px;">
                                                    <optgroup style="text-decoration:none;" label="可用">
                                                    <!-- <option value="0">PII</option>
                                                    <option value="1">HIPAA</option>
                                                    <option value="2">GDPR</option>
                                                    <option value="3">PCI</option>
                                                    <option value="4">COPPA</option>
                                                    <option value="5">CCPA</option> -->
                                                        <option :value="item.value" v-for="(item, index) in complianceGroups" :key="index">{{item.name}}</option>
                                                    </optgroup>
                                                </select>
                                            </td>
                                            <td class="multiSelectPicklistCell">
                                                <a href="javascript:void(0)" @click="handleRightAdd">
                                                    <img :src="require('@/assets/img/arrow2_picklist_right.gif')" alt="添加" width="17" height="17" align="texttop" id="complianceGroup_right_arrow" style="cursor:pointer;" title="添加">
                                                </a>
                                                <br>
                                                <br>
                                                <a href="javascript:void(0)" @click="handleLeftAdd">
                                                    <img :src="require('@/assets/img/arrow2_picklist_left.gif')" alt="移除" width="17" height="17" align="texttop" id="complianceGroup_left_arrow" style="cursor:pointer;" title="移除">
                                                </a>
                                            </td>
                                            <td>
                                                <select multiple="multiple" id="complianceGroup_selected"  v-model="complianceGroup_selected" title="合规性分类 - 已选择" size="5" style="width: 104px;">
                                                    <optgroup style="text-decoration:none;" label="已选择"></optgroup>
                                                    <!-- <option value="0">PII</option>
                                                    <option value="2">GDPR</option> -->
                                                    <option :value="item.value" v-for="(item, index) in complianceGroupSelecteds" :key="index">{{item.name}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_2_ep">
                <h3>公式 选项<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="labelCol requiredInput"><label for="Datatype"><span
                                        class="assistiveText">*</span>公式返回类型</label></td>
                            <td class="dataCol col02">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div><select id="Datatype" name="Datatype"
                                        onchange="document.getElementById('changeFormulaDatatype').value='1'; document.getElementById('editPage').submit();"
                                        tabindex="14">
                                        <option value="B">复选框</option>
                                        <option value="C">币种</option>
                                        <option value="D">日期</option>
                                        <option value="F">日期/时间</option>
                                        <option value="N">数字</option>
                                        <option value="P">百分比</option>
                                        <option value="S" selected="selected">文本</option>
                                        <option value="f">时间</option>
                                    </select>
                                </div>
                            </td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                        <tr class="detailRow">
                            <td colspan="4"><input type="hidden" id="changeFormulaDatatype" name="changeFormulaDatatype"
                                    value="0"></td>
                        </tr>
                        <tr class="detailRow">
                            <td colspan="4"><input type="hidden" id="entity" name="entity" value="Account"></td>
                        </tr>
                        <tr class="last detailRow">
                            <td colspan="4">
                                <div class="linksDiv1">
                                    <fieldset class="editFormulaQuickLinks">
                                        <legend>快速提示</legend>
                                        <ul>
                                            <li><a href="http://salesforce.vidyard.com/watch/EC0MrR6ZMU4CiHyFaakGhg"
                                                    class="smallLink" target="_blank">入门</a></li>
                                            <li><a href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?section=Customizing&amp;target=customize_functions.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                                                    class="smallLink" title="运算符和函数 （新窗口）">运算符和函数</a></li>
                                        </ul>
                                    </fieldset>
                                </div>
                                <div>
                                    <p>输入公式并单击“检查语法”以检查错误。单击“高级公式”子选项卡以使用其他字段、运算符和函数。</p><strong>示例： </strong><span
                                        class="exampleBox">Full Name（全名）= LastName &amp; ", " &amp; FirstName</span><a
                                        href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?section=help&amp;target=useful_advanced_formulas.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                                        title="更多示例... （新窗口）">更多示例...</a>
                                </div>
                                <div class="formulaEditorOuter">
                                    <table cellpadding="0" cellspacing="0" width="99%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="miniTab tertiaryPalette">
                                                        <ul class="miniTabList">
                                                            <li :class="{'currentTab':currentTab==0}"><a
                                                                    href="javascript:void(0)" @click="currentTab=0"
                                                                    title="简单公式 子选项卡 - 个已选择">简单公式</a></li>
                                                            <li :class="{'currentTab':currentTab==1}"><a
                                                                    href="javascript:void(0)" @click="currentTab=1"
                                                                    title="高级公式 子选项卡">高级公式</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="miniTabOn">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="99%"
                                                            style="float:left;">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="top">
                                                                        <table v-if="currentTab==0" width="100%" border="0" cellpadding="0" cellspacing="0" class="miniTabOn" id="CalculatedFormula_header">
                                                                            <tbody>
                                                                                <tr id="CalculatedFormula_selector">
                                                                                    <td id="insertFieldCell"
                                                                                        align="left" valign="top">
                                                                                        <table>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td>选择字段类型</td>
                                                                                                    <td>插入字段</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <select
                                                                                                            id="fieldCategorySelector"
                                                                                                            name="fieldCategorySelector"
                                                                                                            onchange="FormulaEditor.setListToCategory(this.options[this.selectedIndex].value, categoryToFieldMap, 'fieldSelector', null, true)"
                                                                                                            title="选择字段类别">
                                                                                                            <option
                                                                                                                value="$Api">
                                                                                                                $Api
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$Label">
                                                                                                                $Label
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$Organization">
                                                                                                                $Organization
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$Profile">
                                                                                                                $Profile
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$Setup.Milestone1_Settings__c">
                                                                                                                $Setup.Milestone1_Settings__c
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$User">
                                                                                                                $User
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="$UserRole">
                                                                                                                $UserRole
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Account"
                                                                                                                selected="selected">
                                                                                                                客户
                                                                                                            </option>
                                                                                                        </select>
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <select
                                                                                                            class="fieldSelector"
                                                                                                            id="fieldSelector"
                                                                                                            name="fieldSelector"
                                                                                                            onchange="FormulaEditor.insertFieldReference('CalculatedFormula', this, false);"
                                                                                                            title="插入合并字段">
                                                                                                            <option
                                                                                                                value="">
                                                                                                                --
                                                                                                                插入合并字段
                                                                                                                --
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Fax">
                                                                                                                传真
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="TickerSymbol">
                                                                                                                公司股票代码
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="gongshi1__c">
                                                                                                                公式1
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="ShippingCountry">
                                                                                                                发货国家/地区
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="ShippingCity">
                                                                                                                发货城市
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="ShippingState">
                                                                                                                发货州/省
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="ShippingStreet">
                                                                                                                发货街道
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="ShippingPostalCode">
                                                                                                                发货邮政编码
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Name">
                                                                                                                客户名
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Site">
                                                                                                                客户站点
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="AccountNumber">
                                                                                                                客户编号
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="BillingCountry">
                                                                                                                开单国家/地区
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="BillingCity">
                                                                                                                开单城市
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="BillingState">
                                                                                                                开单州/省
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="BillingStreet">
                                                                                                                开单街道
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="BillingPostalCode">
                                                                                                                开单邮政编码
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="YearStarted">
                                                                                                                开始年
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="email1__c">
                                                                                                                电子邮件
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Phone">
                                                                                                                电话
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Website">
                                                                                                                网址
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="autocode__c">
                                                                                                                自动编号
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Tradestyle">
                                                                                                                贸易方式
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="DunsNumber">
                                                                                                                D-U-N-S
                                                                                                                编号
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Jigsaw">
                                                                                                                Data.com
                                                                                                                密钥
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="NaicsCode">
                                                                                                                NAICS 代码
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="NaicsDesc">
                                                                                                                NAICS 描述
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="Sic">
                                                                                                                SIC 代码
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="SicDesc">
                                                                                                                SIC 描述
                                                                                                            </option>
                                                                                                            <option
                                                                                                                value="SLASerialNumber__c">
                                                                                                                SLA
                                                                                                                Serial
                                                                                                                Number
                                                                                                            </option>
                                                                                                        </select>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                    </td>
                                                                                    <td id="insertOperatorCell"
                                                                                        width="400">
                                                                                        <div class="menuButton"
                                                                                            id="insertOperator" @click.stop="isMenu=!isMenu">
                                                                                            <div class="menuButtonButton"
                                                                                                id="insertOperatorButton">
                                                                                                <span
                                                                                                    class="menuButtonLabel"
                                                                                                    id="insertOperatorLabel"
                                                                                                    tabindex="0">插入运算符</span>
                                                                                            </div>
                                                                                            <div class="menuButtonMenu" @click.stop
                                                                                                id="insertOperatorMenu" v-if="isMenu">
                                                                                                <a href=""
                                                                                                    class="menuButtonMenuLink firstMenuItem">&amp;
                                                                                                    串联</a>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                    </td>
                                                                                </tr>
                                                                                <tr id="CalculatedFormula_title">
                                                                                    <td colspan="2"
                                                                                        class="formulaFieldTitle">
                                                                                        &nbsp;公式1 (文本) =</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table v-if="currentTab==1" width="100%" border="0" cellpadding="0"
                                                                            cellspacing="0" class="miniTabOn"
                                                                            id="CalculatedFormula_header">
                                                                            <tbody>
                                                                                <tr id="CalculatedFormula_selector">
                                                                                    <td id="insertFieldCell"
                                                                                        align="left" valign="top">

                                                                                        <input value=" 插入字段 "
                                                                                            class="inpBtn"
                                                                                            name="insertField"
                                                                                            @click="handleInsertField"
                                                                                            title="插入字段" type="button">
                                                                                    </td>
                                                                                    <td id="insertOperatorCell"
                                                                                        width="400">
                                                                                        <div class="menuButton"
                                                                                            id="insertOperator">
                                                                                            <div class="menuButtonButton"
                                                                                                id="insertOperatorButton" @click.stop="isMenu=!isMenu">
                                                                                                <span
                                                                                                    class="menuButtonLabel"
                                                                                                    id="insertOperatorLabel"
                                                                                                    tabindex="0">插入运算符</span>
                                                                                            </div>
                                                                                            <div class="menuButtonMenu" @click.stop
                                                                                                id="insertOperatorMenu" v-if="isMenu">
                                                                                                <a href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%2B%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink firstMenuItem">+
                                                                                                    加</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27-%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">-
                                                                                                    减</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27*%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">*
                                                                                                    乘</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%2F%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">/
                                                                                                    除</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%5E%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">^
                                                                                                    乘方</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%28%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">(
                                                                                                    左括号</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%29%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">)
                                                                                                    右括号</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%26%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&amp;
                                                                                                    串联</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3D%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">=
                                                                                                    等于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3C%3E%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&lt;&gt;
                                                                                                    不等于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3C%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&lt;
                                                                                                    小于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3E%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&gt;
                                                                                                    大于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3C%3D%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&lt;=
                                                                                                    小于或等于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%3E%3D%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&gt;=
                                                                                                    大于或等于</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%26%26%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">&amp;&amp;
                                                                                                    与</a><a
                                                                                                    href="javascript:%20FormulaEditor.insertCode%28%27CalculatedFormula%27%2C%20%27%7C%7C%27%2C%20false%29%3B"
                                                                                                    class="menuButtonMenuLink">||
                                                                                                    或</a>
                                                                                            </div>
                                                                                        </div>

                                                                                    </td>
                                                                                </tr>
                                                                                <tr id="CalculatedFormula_title">
                                                                                    <td colspan="2"
                                                                                        class="formulaFieldTitle">
                                                                                        &nbsp;公式1 (文本) =</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <div class="requiredInput">
                                                                            <div class="requiredBlock noLabel"></div>
                                                                            <textarea class=" FormulaText"
                                                                                aria-label="Insert Formula" cols="80"
                                                                                id="CalculatedFormula" maxlength="3900"
                                                                                name="CalculatedFormula"
                                                                                onkeyup="saveSelection(this)"
                                                                                onmouseup="saveSelection(this)"
                                                                                rows="20"
                                                                                style="width: 99%; height: 30em;"
                                                                                title="公式编辑器" type="text"
                                                                                wrap="soft">$Organization.Division</textarea>
                                                                        </div>
                                                                        <table width="100%" border="0" cellpadding="0"
                                                                            cellspacing="0" class="formulaFooter"
                                                                            id="CalculatedFormula_footer">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td colspan="2">
                                                                                        <table>
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td height="50px"
                                                                                                        style="width: 500px;"
                                                                                                        valign="top">
                                                                                                        <input
                                                                                                            value=" 检查语法 "
                                                                                                            class="inpBtn"
                                                                                                            name="validateDefaultFormula"
                                                                                                            title="检查语法"
                                                                                                            type="submit"><span
                                                                                                            id="validationStatus">
                                                                                                        </span>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td valign="top" id="CalculatedFormula_functions"
                                                                        v-if="currentTab==1">
                                                                        <table class="miniTabOn" id="advFunctions"
                                                                            style="width:200px">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><span
                                                                                            class="bodySmall">函数</span>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><select
                                                                                            id="functionCategorySelector"
                                                                                            name="functionCategorySelector"
                                                                                            onchange="FormulaEditor.setListToCategory(this.options[this.selectedIndex].value, categoryNameToFunctionOptionsMap, 'functionSelector', 'All', false);"
                                                                                            title="-- 所有函数类别 --">
                                                                                            <option value="">-- 所有函数类别
                                                                                                --</option>
                                                                                            <option value="DateTime">
                                                                                                日期和时间</option>
                                                                                            <option value="Logical">逻辑
                                                                                            </option>
                                                                                            <option value="Math">数学
                                                                                            </option>
                                                                                            <option value="Text">文本
                                                                                            </option>
                                                                                            <option value="Advanced">高级
                                                                                            </option>
                                                                                        </select></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><select id="functionSelector"
                                                                                            name="functionSelector"
                                                                                            onchange="FormulaEditor.setFunctionInfo(this.options[this.selectedIndex].value); "
                                                                                            ondblclick="FormulaEditor.insertCode('CalculatedFormula', functionNameToPrototypeMap[this.options[this.selectedIndex].value], false)"
                                                                                            size="6" title="函数">
                                                                                            <option value="ABS"
                                                                                                selected="selected">ABS
                                                                                            </option>
                                                                                            <option value="ACOS">ACOS
                                                                                            </option>
                                                                                            <option value="ADDMONTHS">
                                                                                                ADDMONTHS</option>
                                                                                            <option value="AND">AND
                                                                                            </option>
                                                                                            <option value="ASCII">ASCII
                                                                                            </option>
                                                                                            <option value="ASIN">ASIN
                                                                                            </option>
                                                                                            <option value="ATAN">ATAN
                                                                                            </option>
                                                                                            <option value="ATAN2">ATAN2
                                                                                            </option>
                                                                                            <option value="BEGINS">
                                                                                                BEGINS</option>
                                                                                            <option value="BLANKVALUE">
                                                                                                BLANKVALUE</option>
                                                                                            <option value="BR">BR
                                                                                            </option>
                                                                                            <option value="CASE">CASE
                                                                                            </option>
                                                                                            <option value="CASESAFEID">
                                                                                                CASESAFEID</option>
                                                                                            <option value="CEILING">
                                                                                                CEILING</option>
                                                                                            <option value="CHR">CHR
                                                                                            </option>
                                                                                            <option value="CONTAINS">
                                                                                                CONTAINS</option>
                                                                                            <option value="COS">COS
                                                                                            </option>
                                                                                            <option
                                                                                                value="CURRENCYRATE">
                                                                                                CURRENCYRATE</option>
                                                                                            <option value="DATE">DATE
                                                                                            </option>
                                                                                            <option
                                                                                                value="DATETIMEVALUE">
                                                                                                DATETIMEVALUE</option>
                                                                                            <option value="DATEVALUE">
                                                                                                DATEVALUE</option>
                                                                                            <option value="DAY">DAY
                                                                                            </option>
                                                                                            <option value="DAYOFYEAR">
                                                                                                DAYOFYEAR</option>
                                                                                            <option value="DISTANCE">
                                                                                                DISTANCE</option>
                                                                                            <option value="EXP">EXP
                                                                                            </option>
                                                                                            <option value="FIND">FIND
                                                                                            </option>
                                                                                            <option value="FLOOR">FLOOR
                                                                                            </option>
                                                                                            <option
                                                                                                value="FORMATDURATION">
                                                                                                FORMATDURATION</option>
                                                                                            <option
                                                                                                value="FROMUNIXTIME">
                                                                                                FROMUNIXTIME</option>
                                                                                            <option value="GEOLOCATION">
                                                                                                GEOLOCATION</option>
                                                                                            <option
                                                                                                value="GETSESSIONID">
                                                                                                GETSESSIONID</option>
                                                                                            <option value="HOUR">HOUR
                                                                                            </option>
                                                                                            <option value="HYPERLINK">
                                                                                                HYPERLINK</option>
                                                                                            <option value="IF">IF
                                                                                            </option>
                                                                                            <option value="IMAGE">IMAGE
                                                                                            </option>
                                                                                            <option value="INCLUDES">
                                                                                                INCLUDES</option>
                                                                                            <option value="INITCAP">
                                                                                                INITCAP</option>
                                                                                            <option value="ISBLANK">
                                                                                                ISBLANK</option>
                                                                                            <option value="ISNULL">
                                                                                                ISNULL</option>
                                                                                            <option value="ISNUMBER">
                                                                                                ISNUMBER</option>
                                                                                            <option value="ISOWEEK">
                                                                                                ISOWEEK</option>
                                                                                            <option value="ISOYEAR">
                                                                                                ISOYEAR</option>
                                                                                            <option value="ISPICKVAL">
                                                                                                ISPICKVAL</option>
                                                                                            <option value="LEFT">LEFT
                                                                                            </option>
                                                                                            <option value="LEN">LEN
                                                                                            </option>
                                                                                            <option value="LN">LN
                                                                                            </option>
                                                                                            <option value="LOG">LOG
                                                                                            </option>
                                                                                            <option value="LOWER">LOWER
                                                                                            </option>
                                                                                            <option value="LPAD">LPAD
                                                                                            </option>
                                                                                            <option value="MAX">MAX
                                                                                            </option>
                                                                                            <option value="MCEILING">
                                                                                                MCEILING</option>
                                                                                            <option value="MFLOOR">
                                                                                                MFLOOR</option>
                                                                                            <option value="MID">MID
                                                                                            </option>
                                                                                            <option value="MILLISECOND">
                                                                                                MILLISECOND</option>
                                                                                            <option value="MIN">MIN
                                                                                            </option>
                                                                                            <option value="MINUTE">
                                                                                                MINUTE</option>
                                                                                            <option value="MOD">MOD
                                                                                            </option>
                                                                                            <option value="MONTH">MONTH
                                                                                            </option>
                                                                                            <option value="NOT">NOT
                                                                                            </option>
                                                                                            <option value="NOW">NOW
                                                                                            </option>
                                                                                            <option value="NULLVALUE">
                                                                                                NULLVALUE</option>
                                                                                            <option value="OR">OR
                                                                                            </option>
                                                                                            <option value="PI">PI
                                                                                            </option>
                                                                                            <option
                                                                                                value="PICKLISTCOUNT">
                                                                                                PICKLISTCOUNT</option>
                                                                                            <option value="REVERSE">
                                                                                                REVERSE</option>
                                                                                            <option value="RIGHT">RIGHT
                                                                                            </option>
                                                                                            <option value="ROUND">ROUND
                                                                                            </option>
                                                                                            <option value="RPAD">RPAD
                                                                                            </option>
                                                                                            <option value="SECOND">
                                                                                                SECOND</option>
                                                                                            <option value="SIN">SIN
                                                                                            </option>
                                                                                            <option value="SQRT">SQRT
                                                                                            </option>
                                                                                            <option value="SUBSTITUTE">
                                                                                                SUBSTITUTE</option>
                                                                                            <option value="TAN">TAN
                                                                                            </option>
                                                                                            <option value="TEXT">TEXT
                                                                                            </option>
                                                                                            <option value="TIMENOW">
                                                                                                TIMENOW</option>
                                                                                            <option value="TIMEVALUE">
                                                                                                TIMEVALUE</option>
                                                                                            <option value="TODAY">TODAY
                                                                                            </option>
                                                                                            <option value="TRIM">TRIM
                                                                                            </option>
                                                                                            <option value="TRUNC">TRUNC
                                                                                            </option>
                                                                                            <option
                                                                                                value="UNIXTIMESTAMP">
                                                                                                UNIXTIMESTAMP</option>
                                                                                            <option value="UPPER">UPPER
                                                                                            </option>
                                                                                            <option value="VALUE">VALUE
                                                                                            </option>
                                                                                            <option value="WEEKDAY">
                                                                                                WEEKDAY</option>
                                                                                            <option value="YEAR">YEAR
                                                                                            </option>
                                                                                        </select></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><input value="插入所选函数"
                                                                                            class="inpBtn"
                                                                                            name="addToFormula"
                                                                                            onclick="FormulaEditor.insertCode('CalculatedFormula', functionNameToPrototypeMap[FormulaEditor.getSelectedFunction()], false)"
                                                                                            title="插入所选函数"
                                                                                            type="button"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="funcFormat"
                                                                                        id="funcFormat">&nbsp;</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="funcExplain"
                                                                                        id="funcExplain">&nbsp;</td>
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
                                            <tr>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td><input type="hidden" id="editorMode" name="editorMode"
                                                        value="advanced"></td>
                                            </tr>
                                            <tr>
                                                <td><input type="hidden" id="changeEditorMode" name="changeEditorMode"
                                                        value="0"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_3_ep" v-if="currentTab==1">
                <h3>空白字段处理<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection" v-if="currentTab==1">
                <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr class="detailRow">
                            <td colspan="4">如果您的公式引用了任何数字、货币和百分比字段，请指定当这些字段值为空时如何处理公式输出。</td>
                        </tr>
                        <tr>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last col02"><input checked="checked" id="tbaz1" name="tbaz" tabindex="17"
                                    type="radio" value="1"><label for="tbaz1">将空白字段视为零</label><br><input id="tbaz0"
                                    name="tbaz" tabindex="18" type="radio" value="0"><label
                                    for="tbaz0">将空白字段视为空白</label></td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="pbBottomButtons">
            <table>
                <tbody>
                    <tr>
                        <td class="pbTitle">
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth"
                                title="">&nbsp;
                        </td>
                        <td class="pbButtonb" id="bottomButtonRow">
                            <input value=" 保存 " class="inpBtn" name="save" title="保存" type="button" @click="handleSave">
                            <input value=" 快速保存 " class="inpBtn" name="save" title="保存" type="button">
                            <input value=" 取消 " class="inpBtn ml5" name="cancel" title="取消" type="button"
                                @click="handleCancel">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <InsertField :isShow="isInsertField" v-if="isInsertField" @cancel="isInsertField=false;" />
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
        defineEmits
    } from "vue";
    import Interface from "@/utils/Interface.js";
    import InsertField from "@/components/entityDetail/InsertField.vue";

    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','save']);
    const props = defineProps({
        detail: Object
    });


    const formState = reactive({
        MasterLabel: "",
        DeveloperName: "",
        Description: "",
        InlineHelpText: "",
        businessOwner: "",
        businessStatus: "",
        // complianceGroup_selected: [],
        options_0: false,
        IsUnique: false,
        IsExternalIdentifier: false,
        DefaultValue: "",
        digleft: "",
        Scale: "",
        complianceGroup: []
    });
    const rules = reactive({
        MasterLabel: {
            required: false
        },
        DeveloperName: {
            required: false
        },
        digleft: {
            required: false
        },
        Scale: {
            required: false
        }
    });
    const data = reactive({
        currentTab: 0,
        isMenu: false,
        isInsertField: false,
        complianceGroups: [
            {
                name: "PII",
                value: "0",
            },
            {
                name: "HIPAA",
                value: "1",
            },
            {
                name: "GDPR",
                value: "2",
            },
            {
                name: "PCI",
                value: "3",
            },
            {
                name: "COPPA",
                value: "4",
            },
            {
                name: "CCPA",
                value: "5",
            },
        ],
        complianceGroupSelecteds: [],
        complianceGroup_unselected: [],
        complianceGroup_selected: [],
    });
    const { currentTab, isMenu, isInsertField, complianceGroups, complianceGroup_unselected, complianceGroupSelecteds, complianceGroup_selected } = toRefs(data);

    const handleBack = () => {
        emit("back", false);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };

    onMounted(()=>{
        console.log(props.detail)
        // let { label, entityLabel, developerName, Description, InlineHelpText, options_0, IsUnique, IsExternalIdentifier,
        //     digleft, Scale
        //  } = props.detail;
        // formState.MasterLabel = label;
        // formState.DeveloperName = developerName;
        // formState.Description = Description;
        // formState.InlineHelpText = InlineHelpText;
        // formState.options_0 = options_0 == 1 ? true : false;
        // formState.IsUnique = IsUnique;
        // formState.IsExternalIdentifier = IsExternalIdentifier;
        // formState.digleft = digleft;
        // formState.Scale = Scale;
        for(let key in formState){
            formState[key] = props.detail[key];
        }
        window.addEventListener('click',()=>{
            data.isMenu = false;
        });
    });
    const handleInsertField = () => {
        data.isInsertField = true;
    };
    const validateField = () => {
        let isValidate = true;
        let obj = toRaw(rules);
        console.log("rules", rules);
        for (let key in rules) {
            rules[key].isRequired = false;
            if (formState[key] == "") {
                rules[key].isRequired = true;
                isValidate = false;
            }
        };
        return isValidate;
    }
    const handleSave = () => {
        if(validateField()){
            emit("save", toRaw(formState));
        }
    }
    // 往右侧添加
    const handleRightAdd = () => {
        data.complianceGroup_unselected.forEach(value => {
            const option = data.complianceGroups.find(opt => opt.value === value);
            if (option) {
                data.complianceGroupSelecteds.push(option);
                data.complianceGroups = data.complianceGroups.filter(opt => opt.value !== value);
            }
        });
        data.complianceGroup_unselected = [];
        formState.complianceGroup = data.complianceGroupSelecteds.map(item=>item.value);
    };
    const handleLeftAdd = () => {
        data.complianceGroup_selected.forEach(value => {
            const option = data.complianceGroupSelecteds.find(opt => opt.value === value);
            if (option) {
                data.complianceGroups.push(option);
                data.complianceGroupSelecteds = data.complianceGroupSelecteds.filter(opt => opt.value !== value);
            }
        });
        data.complianceGroup_selected = [];
        formState.complianceGroup = data.complianceGroupSelecteds.map(item=>item.value);
    };
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

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

    .pbSubsection {
        margin-top: 7px;
        padding: 0 12px;
    }
    #insertFieldCell table{
        width: auto;
        td{
            padding-right: 0;
            select{
                margin-right: 4px;
            }
        }
    }
    .formulaEditorOuter{
        position: relative;
        top: -30px;
    }
</style>