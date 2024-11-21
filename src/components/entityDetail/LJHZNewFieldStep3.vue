<template>
    <div class="bWizardBlock tertiaryPalette">
        <div class="pbWizardTitle tertiaryPalette brandTertiaryBgr">
            <div class="ptRightTitle">
                步骤 3. 定义汇总计算
            </div>
            <h2>
                第 3 步，共 5 步
            </h2>
        </div>
        <div class="pbBody">
            <div class="pbWizardHeader">
                <div class="pbTopButtons" style="white-space: nowrap">
                    <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button"
                        @click="handlePrev(2)">
                    &nbsp;
                    <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button"
                        @click="handleNext(3)">
                    <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
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
                            <h3>选择要汇总的对象<span class="titleSeparatingColon">:</span></h3>
                        </div>
                        <div class="pbSubsection">
                            <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td class="labelCol">主对象</td>
                                        <td class="dataCol col02">客户</td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="dataCol last empty">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol last requiredInput"><label for="summaryFk"><span
                                                    class="assistiveText">*</span>已汇总的对象 </label></td>
                                        <td class="dataCol last col02">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div><select id="summaryFk"
                                                    name="summaryFk">
                                                    <option value="Opportunity.Account" selected="selected">业务机会
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="dataCol last empty">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_2_ep">
                            <h3>选择累计类型<span class="titleSeparatingColon">:</span></h3>
                        </div>
                        <div class="pbSubsection">
                            <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="last detailRow">
                                        <td colspan="4">
                                            <div id="operationCtr">
                                                <table class="operation" border="0" cellpadding="0" cellspacing="0"
                                                    width="100%">
                                                    <tbody>
                                                        <tr class="opSimple">
                                                            <td colspan="2"><input id="SummaryOperation0"
                                                                    name="SummaryOperation" type="radio"
                                                                    value="0"><label
                                                                    for="SummaryOperation0">COUNT</label></td>
                                                        </tr>
                                                        <tr class="opComplex">
                                                            <td><input checked="checked" id="SummaryOperation1"
                                                                    name="SummaryOperation" type="radio"
                                                                    value="1"><label for="SummaryOperation1">SUM</label>
                                                            </td>
                                                            <td class="opField" rowspan="3"><label
                                                                    for="SummarizedFieldEnumOrId">要聚合的字段</label>&nbsp;<span>
                                                                        <select
                                                                        v-model="formState.SummarizedFieldEnumOrId"
                                                                        name="SummarizedFieldEnumOrId"
                                                                        id="SummarizedFieldEnumOrId" class="" title="">
                                                                        <option value="">--无--</option>
                                                                        <option value="Probability">可能性 (%)</option>
                                                                        <option value="TotalOpportunityQuantity">数量
                                                                        </option>
                                                                        <option value="Amount">金额</option>
                                                                        <option value="ExpectedRevenue">预期收入</option>
                                                                    </select></span>
                                                                    <div class="errorMsg" v-if="rules.SummarizedFieldEnumOrId.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                                            </td>
                                                        </tr>
                                                        <tr class="opComplex">
                                                            <td><input id="SummaryOperation2" name="SummaryOperation"
                                                                    type="radio" value="2"><label
                                                                    for="SummaryOperation2">MIN</label></td>
                                                        </tr>
                                                        <tr class="opComplex">
                                                            <td><input id="SummaryOperation3" name="SummaryOperation"
                                                                    type="radio" value="3"><label
                                                                    for="SummaryOperation3">MAX</label></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pbSubheader brandTertiaryBgr tertiaryPalette" id="head_3_ep">
                            <h3>过滤条件<span class="titleSeparatingColon">:</span></h3>
                        </div>
                        <div class="pbSubsection">
                            <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="detailRow">
                                        <td colspan="4">
                                            <ul class="radioGroup" id="filterControl" name="filterControl">
                                                <li>
                                                    <input v-model="formState.filterControl" checked="checked" id="filterControl0" name="filterControl" type="radio" value="0"><label
                                                        for="filterControl0">此计算应包括所有的记录</label></li>
                                                <li>
                                                    <input v-model="formState.filterControl" id="filterControl1" name="filterControl" type="radio"
                                                        value="1"><label for="filterControl1">此计算仅应包括符合特定条件的记录</label>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="last detailRow" v-if="formState.filterControl==1">
                                        <td colspan="4">
                                            <div id="filterSection">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="col">字段</th>
                                                            <th scope="col">运算符</th>
                                                            <th scope="col">值</th>
                                                        </tr>
                                                        <tr>
                                                            <td><select id="critfld1" name="critfld1"
                                                                    onchange="updateOperator(this, 'critop1', 'pLOOKUP1');"
                                                                    title="字段 1">
                                                                    <option value="">--无--</option>
                                                                    <option value="Opportunity.00N9000000CFoaC">Current
                                                                        Generator(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaD">
                                                                        Delivery/Installation Status</option>
                                                                    <option value="Opportunity.00N9000000CFoaE">Main
                                                                        Competitor(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaF">Order
                                                                        Number</option>
                                                                    <option value="Opportunity.00N9000000CFoaG">Tracking
                                                                        Number</option>
                                                                    <option value="Opportunity.LastModifiedBy">上次修改人 ID
                                                                    </option>
                                                                    <option value="Opportunity.LastModifiedDate">上次修改日期
                                                                    </option>
                                                                    <option value="Opportunity.LastStageChangeDate">
                                                                        上次阶段更改日期</option>
                                                                    <option value="Opportunity.NextStep">下一步</option>
                                                                    <option value="Opportunity.IsPrivate">专用</option>
                                                                    <option value="Opportunity.Id">业务机会 ID</option>
                                                                    <option value="Opportunity.Name">业务机会名</option>
                                                                    <option value="Opportunity.Owner">业务机会所有人 ID
                                                                    </option>
                                                                    <option
                                                                        value="Opportunity.IsExcludedFromTerritory2Filter">
                                                                        从区域分配筛选逻辑中排除</option>
                                                                    <option value="Opportunity.CreatedBy">创建人 ID
                                                                    </option>
                                                                    <option value="Opportunity.CreatedDate">创建日期
                                                                    </option>
                                                                    <option value="Opportunity.HasOpportunityLineItem">
                                                                        包括行式项目</option>
                                                                    <option value="Opportunity.Probability">可能性 (%)
                                                                    </option>
                                                                    <option value="Opportunity.IsClosed">已结束</option>
                                                                    <option value="Opportunity.IsWon">已赢得</option>
                                                                    <option
                                                                        value="Opportunity.TotalOpportunityQuantity">数量
                                                                    </option>
                                                                    <option value="Opportunity.LeadSource">潜在客户来源
                                                                    </option>
                                                                    <option value="Opportunity.Type">类型</option>
                                                                    <option value="Opportunity.CloseDate">结束日期</option>
                                                                    <option value="Opportunity.Amount">金额</option>
                                                                    <option value="Opportunity.StageName">阶段</option>
                                                                    <option value="Opportunity.ExpectedRevenue">预期收入
                                                                    </option>
                                                                    <option value="Opportunity.ForecastCategoryName">
                                                                        预测类别</option>
                                                                </select></td>
                                                            <td><select id="critop1" name="critop1" title="运算符 1">
                                                                    <option value="">--无--</option>
                                                                    <option value="e">等于</option>
                                                                    <option value="n">不等于</option>
                                                                    <option value="s">起始字符</option>
                                                                    <option value="c">包含</option>
                                                                    <option value="k">不包含</option>
                                                                    <option value="l">小于</option>
                                                                    <option value="g">大于</option>
                                                                    <option value="m">小于或等于</option>
                                                                    <option value="h">大于或等于</option>
                                                                    <option value="u">包括</option>
                                                                    <option value="x">不包括</option>
                                                                    <option value="w">在范围内</option>
                                                                </select></td>
                                                            <td><input id="pVAL1" maxlength="255" name="pVAL1" size="20"
                                                                    title="值 1" type="text" value=""></td>
                                                            <td><span id="pLOOKUP1" style="display:none"><a
                                                                        href="javascript:openPopupFocus%28%27%27%2C%20%27filter_lookup%27%2C%20620%2C%20430%2C%20%27width%3D620%2Cheight%3D430%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dno%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20true%29%3BopenFilterLookupWindow%28null%2C%20%27%2Fui%2Flist%2FFilterLookupPage%27%2C%20%27critfld1%27%2C%20%27pVAL1%27%29%3B"
                                                                        title="查找（新窗口） （新窗口）"><img src="@/assets/img/s.gif"
                                                                            alt="查找（新窗口） （新窗口）" class="lookupIcon"
                                                                            onblur="this.className = 'lookupIcon';"
                                                                            onfocus="this.className = 'lookupIconOn';"
                                                                            onmouseout="this.className = 'lookupIcon';this.className = 'lookupIcon';"
                                                                            onmouseover="this.className = 'lookupIconOn';this.className = 'lookupIconOn';"
                                                                            title="查找（新窗口） （新窗口）"></a></span></td>
                                                            <td><span class="textBox" id="and1"
                                                                    style="visibility:null">AND</span></td>
                                                            <td class="FAErrorCell" id="FAErrorCell1">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td><select id="critfld2" name="critfld2"
                                                                    onchange="updateOperator(this, 'critop2', 'pLOOKUP2');"
                                                                    title="字段 2">
                                                                    <option value="">--无--</option>
                                                                    <option value="Opportunity.00N9000000CFoaC">Current
                                                                        Generator(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaD">
                                                                        Delivery/Installation Status</option>
                                                                    <option value="Opportunity.00N9000000CFoaE">Main
                                                                        Competitor(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaF">Order
                                                                        Number</option>
                                                                    <option value="Opportunity.00N9000000CFoaG">Tracking
                                                                        Number</option>
                                                                    <option value="Opportunity.LastModifiedBy">上次修改人 ID
                                                                    </option>
                                                                    <option value="Opportunity.LastModifiedDate">上次修改日期
                                                                    </option>
                                                                    <option value="Opportunity.LastStageChangeDate">
                                                                        上次阶段更改日期</option>
                                                                    <option value="Opportunity.NextStep">下一步</option>
                                                                    <option value="Opportunity.IsPrivate">专用</option>
                                                                    <option value="Opportunity.Id">业务机会 ID</option>
                                                                    <option value="Opportunity.Name">业务机会名</option>
                                                                    <option value="Opportunity.Owner">业务机会所有人 ID
                                                                    </option>
                                                                    <option
                                                                        value="Opportunity.IsExcludedFromTerritory2Filter">
                                                                        从区域分配筛选逻辑中排除</option>
                                                                    <option value="Opportunity.CreatedBy">创建人 ID
                                                                    </option>
                                                                    <option value="Opportunity.CreatedDate">创建日期
                                                                    </option>
                                                                    <option value="Opportunity.HasOpportunityLineItem">
                                                                        包括行式项目</option>
                                                                    <option value="Opportunity.Probability">可能性 (%)
                                                                    </option>
                                                                    <option value="Opportunity.IsClosed">已结束</option>
                                                                    <option value="Opportunity.IsWon">已赢得</option>
                                                                    <option
                                                                        value="Opportunity.TotalOpportunityQuantity">数量
                                                                    </option>
                                                                    <option value="Opportunity.LeadSource">潜在客户来源
                                                                    </option>
                                                                    <option value="Opportunity.Type">类型</option>
                                                                    <option value="Opportunity.CloseDate">结束日期</option>
                                                                    <option value="Opportunity.Amount">金额</option>
                                                                    <option value="Opportunity.StageName">阶段</option>
                                                                    <option value="Opportunity.ExpectedRevenue">预期收入
                                                                    </option>
                                                                    <option value="Opportunity.ForecastCategoryName">
                                                                        预测类别</option>
                                                                </select></td>
                                                            <td><select id="critop2" name="critop2" title="运算符 2">
                                                                    <option value="">--无--</option>
                                                                    <option value="e">等于</option>
                                                                    <option value="n">不等于</option>
                                                                    <option value="s">起始字符</option>
                                                                    <option value="c">包含</option>
                                                                    <option value="k">不包含</option>
                                                                    <option value="l">小于</option>
                                                                    <option value="g">大于</option>
                                                                    <option value="m">小于或等于</option>
                                                                    <option value="h">大于或等于</option>
                                                                    <option value="u">包括</option>
                                                                    <option value="x">不包括</option>
                                                                    <option value="w">在范围内</option>
                                                                </select></td>
                                                            <td><input id="pVAL2" maxlength="255" name="pVAL2" size="20"
                                                                    title="值 2" type="text" value=""></td>
                                                            <td><span id="pLOOKUP2" style="display:none"><a
                                                                        href="javascript:openPopupFocus%28%27%27%2C%20%27filter_lookup%27%2C%20620%2C%20430%2C%20%27width%3D620%2Cheight%3D430%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dno%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20true%29%3BopenFilterLookupWindow%28null%2C%20%27%2Fui%2Flist%2FFilterLookupPage%27%2C%20%27critfld2%27%2C%20%27pVAL2%27%29%3B"
                                                                        title="查找（新窗口） （新窗口）"><img src="@/assets/img/s.gif"
                                                                            alt="查找（新窗口） （新窗口）" class="lookupIcon"
                                                                            onblur="this.className = 'lookupIcon';"
                                                                            onfocus="this.className = 'lookupIconOn';"
                                                                            onmouseout="this.className = 'lookupIcon';this.className = 'lookupIcon';"
                                                                            onmouseover="this.className = 'lookupIconOn';this.className = 'lookupIconOn';"
                                                                            title="查找（新窗口） （新窗口）"></a></span></td>
                                                            <td><span class="textBox" id="and2"
                                                                    style="visibility:null">AND</span></td>
                                                            <td class="FAErrorCell" id="FAErrorCell2">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td><select id="critfld3" name="critfld3"
                                                                    onchange="updateOperator(this, 'critop3', 'pLOOKUP3');"
                                                                    title="字段 3">
                                                                    <option value="">--无--</option>
                                                                    <option value="Opportunity.00N9000000CFoaC">Current
                                                                        Generator(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaD">
                                                                        Delivery/Installation Status</option>
                                                                    <option value="Opportunity.00N9000000CFoaE">Main
                                                                        Competitor(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaF">Order
                                                                        Number</option>
                                                                    <option value="Opportunity.00N9000000CFoaG">Tracking
                                                                        Number</option>
                                                                    <option value="Opportunity.LastModifiedBy">上次修改人 ID
                                                                    </option>
                                                                    <option value="Opportunity.LastModifiedDate">上次修改日期
                                                                    </option>
                                                                    <option value="Opportunity.LastStageChangeDate">
                                                                        上次阶段更改日期</option>
                                                                    <option value="Opportunity.NextStep">下一步</option>
                                                                    <option value="Opportunity.IsPrivate">专用</option>
                                                                    <option value="Opportunity.Id">业务机会 ID</option>
                                                                    <option value="Opportunity.Name">业务机会名</option>
                                                                    <option value="Opportunity.Owner">业务机会所有人 ID
                                                                    </option>
                                                                    <option
                                                                        value="Opportunity.IsExcludedFromTerritory2Filter">
                                                                        从区域分配筛选逻辑中排除</option>
                                                                    <option value="Opportunity.CreatedBy">创建人 ID
                                                                    </option>
                                                                    <option value="Opportunity.CreatedDate">创建日期
                                                                    </option>
                                                                    <option value="Opportunity.HasOpportunityLineItem">
                                                                        包括行式项目</option>
                                                                    <option value="Opportunity.Probability">可能性 (%)
                                                                    </option>
                                                                    <option value="Opportunity.IsClosed">已结束</option>
                                                                    <option value="Opportunity.IsWon">已赢得</option>
                                                                    <option
                                                                        value="Opportunity.TotalOpportunityQuantity">数量
                                                                    </option>
                                                                    <option value="Opportunity.LeadSource">潜在客户来源
                                                                    </option>
                                                                    <option value="Opportunity.Type">类型</option>
                                                                    <option value="Opportunity.CloseDate">结束日期</option>
                                                                    <option value="Opportunity.Amount">金额</option>
                                                                    <option value="Opportunity.StageName">阶段</option>
                                                                    <option value="Opportunity.ExpectedRevenue">预期收入
                                                                    </option>
                                                                    <option value="Opportunity.ForecastCategoryName">
                                                                        预测类别</option>
                                                                </select></td>
                                                            <td><select id="critop3" name="critop3" title="运算符 3">
                                                                    <option value="">--无--</option>
                                                                    <option value="e">等于</option>
                                                                    <option value="n">不等于</option>
                                                                    <option value="s">起始字符</option>
                                                                    <option value="c">包含</option>
                                                                    <option value="k">不包含</option>
                                                                    <option value="l">小于</option>
                                                                    <option value="g">大于</option>
                                                                    <option value="m">小于或等于</option>
                                                                    <option value="h">大于或等于</option>
                                                                    <option value="u">包括</option>
                                                                    <option value="x">不包括</option>
                                                                    <option value="w">在范围内</option>
                                                                </select></td>
                                                            <td><input id="pVAL3" maxlength="255" name="pVAL3" size="20"
                                                                    title="值 3" type="text" value=""></td>
                                                            <td><span id="pLOOKUP3" style="display:none"><a
                                                                        href="javascript:openPopupFocus%28%27%27%2C%20%27filter_lookup%27%2C%20620%2C%20430%2C%20%27width%3D620%2Cheight%3D430%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dno%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20true%29%3BopenFilterLookupWindow%28null%2C%20%27%2Fui%2Flist%2FFilterLookupPage%27%2C%20%27critfld3%27%2C%20%27pVAL3%27%29%3B"
                                                                        title="查找（新窗口） （新窗口）"><img src="@/assets/img/s.gif"
                                                                            alt="查找（新窗口） （新窗口）" class="lookupIcon"
                                                                            onblur="this.className = 'lookupIcon';"
                                                                            onfocus="this.className = 'lookupIconOn';"
                                                                            onmouseout="this.className = 'lookupIcon';this.className = 'lookupIcon';"
                                                                            onmouseover="this.className = 'lookupIconOn';this.className = 'lookupIconOn';"
                                                                            title="查找（新窗口） （新窗口）"></a></span></td>
                                                            <td><span class="textBox" id="and3"
                                                                    style="visibility:null">AND</span></td>
                                                            <td class="FAErrorCell" id="FAErrorCell3">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td><select id="critfld4" name="critfld4"
                                                                    onchange="updateOperator(this, 'critop4', 'pLOOKUP4');"
                                                                    title="字段 4">
                                                                    <option value="">--无--</option>
                                                                    <option value="Opportunity.00N9000000CFoaC">Current
                                                                        Generator(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaD">
                                                                        Delivery/Installation Status</option>
                                                                    <option value="Opportunity.00N9000000CFoaE">Main
                                                                        Competitor(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaF">Order
                                                                        Number</option>
                                                                    <option value="Opportunity.00N9000000CFoaG">Tracking
                                                                        Number</option>
                                                                    <option value="Opportunity.LastModifiedBy">上次修改人 ID
                                                                    </option>
                                                                    <option value="Opportunity.LastModifiedDate">上次修改日期
                                                                    </option>
                                                                    <option value="Opportunity.LastStageChangeDate">
                                                                        上次阶段更改日期</option>
                                                                    <option value="Opportunity.NextStep">下一步</option>
                                                                    <option value="Opportunity.IsPrivate">专用</option>
                                                                    <option value="Opportunity.Id">业务机会 ID</option>
                                                                    <option value="Opportunity.Name">业务机会名</option>
                                                                    <option value="Opportunity.Owner">业务机会所有人 ID
                                                                    </option>
                                                                    <option
                                                                        value="Opportunity.IsExcludedFromTerritory2Filter">
                                                                        从区域分配筛选逻辑中排除</option>
                                                                    <option value="Opportunity.CreatedBy">创建人 ID
                                                                    </option>
                                                                    <option value="Opportunity.CreatedDate">创建日期
                                                                    </option>
                                                                    <option value="Opportunity.HasOpportunityLineItem">
                                                                        包括行式项目</option>
                                                                    <option value="Opportunity.Probability">可能性 (%)
                                                                    </option>
                                                                    <option value="Opportunity.IsClosed">已结束</option>
                                                                    <option value="Opportunity.IsWon">已赢得</option>
                                                                    <option
                                                                        value="Opportunity.TotalOpportunityQuantity">数量
                                                                    </option>
                                                                    <option value="Opportunity.LeadSource">潜在客户来源
                                                                    </option>
                                                                    <option value="Opportunity.Type">类型</option>
                                                                    <option value="Opportunity.CloseDate">结束日期</option>
                                                                    <option value="Opportunity.Amount">金额</option>
                                                                    <option value="Opportunity.StageName">阶段</option>
                                                                    <option value="Opportunity.ExpectedRevenue">预期收入
                                                                    </option>
                                                                    <option value="Opportunity.ForecastCategoryName">
                                                                        预测类别</option>
                                                                </select></td>
                                                            <td><select id="critop4" name="critop4" title="运算符 4">
                                                                    <option value="">--无--</option>
                                                                    <option value="e">等于</option>
                                                                    <option value="n">不等于</option>
                                                                    <option value="s">起始字符</option>
                                                                    <option value="c">包含</option>
                                                                    <option value="k">不包含</option>
                                                                    <option value="l">小于</option>
                                                                    <option value="g">大于</option>
                                                                    <option value="m">小于或等于</option>
                                                                    <option value="h">大于或等于</option>
                                                                    <option value="u">包括</option>
                                                                    <option value="x">不包括</option>
                                                                    <option value="w">在范围内</option>
                                                                </select></td>
                                                            <td><input id="pVAL4" maxlength="255" name="pVAL4" size="20"
                                                                    title="值 4" type="text" value=""></td>
                                                            <td><span id="pLOOKUP4" style="display:none"><a
                                                                        href="javascript:openPopupFocus%28%27%27%2C%20%27filter_lookup%27%2C%20620%2C%20430%2C%20%27width%3D620%2Cheight%3D430%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dno%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20true%29%3BopenFilterLookupWindow%28null%2C%20%27%2Fui%2Flist%2FFilterLookupPage%27%2C%20%27critfld4%27%2C%20%27pVAL4%27%29%3B"
                                                                        title="查找（新窗口） （新窗口）"><img src="@/assets/img/s.gif"
                                                                            alt="查找（新窗口） （新窗口）" class="lookupIcon"
                                                                            onblur="this.className = 'lookupIcon';"
                                                                            onfocus="this.className = 'lookupIconOn';"
                                                                            onmouseout="this.className = 'lookupIcon';this.className = 'lookupIcon';"
                                                                            onmouseover="this.className = 'lookupIconOn';this.className = 'lookupIconOn';"
                                                                            title="查找（新窗口） （新窗口）"></a></span></td>
                                                            <td><span class="textBox" id="and4"
                                                                    style="visibility:null">AND</span></td>
                                                            <td class="FAErrorCell" id="FAErrorCell4">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td><select id="critfld5" name="critfld5"
                                                                    onchange="updateOperator(this, 'critop5', 'pLOOKUP5');"
                                                                    title="字段 5">
                                                                    <option value="">--无--</option>
                                                                    <option value="Opportunity.00N9000000CFoaC">Current
                                                                        Generator(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaD">
                                                                        Delivery/Installation Status</option>
                                                                    <option value="Opportunity.00N9000000CFoaE">Main
                                                                        Competitor(s)</option>
                                                                    <option value="Opportunity.00N9000000CFoaF">Order
                                                                        Number</option>
                                                                    <option value="Opportunity.00N9000000CFoaG">Tracking
                                                                        Number</option>
                                                                    <option value="Opportunity.LastModifiedBy">上次修改人 ID
                                                                    </option>
                                                                    <option value="Opportunity.LastModifiedDate">上次修改日期
                                                                    </option>
                                                                    <option value="Opportunity.LastStageChangeDate">
                                                                        上次阶段更改日期</option>
                                                                    <option value="Opportunity.NextStep">下一步</option>
                                                                    <option value="Opportunity.IsPrivate">专用</option>
                                                                    <option value="Opportunity.Id">业务机会 ID</option>
                                                                    <option value="Opportunity.Name">业务机会名</option>
                                                                    <option value="Opportunity.Owner">业务机会所有人 ID
                                                                    </option>
                                                                    <option
                                                                        value="Opportunity.IsExcludedFromTerritory2Filter">
                                                                        从区域分配筛选逻辑中排除</option>
                                                                    <option value="Opportunity.CreatedBy">创建人 ID
                                                                    </option>
                                                                    <option value="Opportunity.CreatedDate">创建日期
                                                                    </option>
                                                                    <option value="Opportunity.HasOpportunityLineItem">
                                                                        包括行式项目</option>
                                                                    <option value="Opportunity.Probability">可能性 (%)
                                                                    </option>
                                                                    <option value="Opportunity.IsClosed">已结束</option>
                                                                    <option value="Opportunity.IsWon">已赢得</option>
                                                                    <option
                                                                        value="Opportunity.TotalOpportunityQuantity">数量
                                                                    </option>
                                                                    <option value="Opportunity.LeadSource">潜在客户来源
                                                                    </option>
                                                                    <option value="Opportunity.Type">类型</option>
                                                                    <option value="Opportunity.CloseDate">结束日期</option>
                                                                    <option value="Opportunity.Amount">金额</option>
                                                                    <option value="Opportunity.StageName">阶段</option>
                                                                    <option value="Opportunity.ExpectedRevenue">预期收入
                                                                    </option>
                                                                    <option value="Opportunity.ForecastCategoryName">
                                                                        预测类别</option>
                                                                </select></td>
                                                            <td><select id="critop5" name="critop5" title="运算符 5">
                                                                    <option value="">--无--</option>
                                                                    <option value="e">等于</option>
                                                                    <option value="n">不等于</option>
                                                                    <option value="s">起始字符</option>
                                                                    <option value="c">包含</option>
                                                                    <option value="k">不包含</option>
                                                                    <option value="l">小于</option>
                                                                    <option value="g">大于</option>
                                                                    <option value="m">小于或等于</option>
                                                                    <option value="h">大于或等于</option>
                                                                    <option value="u">包括</option>
                                                                    <option value="x">不包括</option>
                                                                    <option value="w">在范围内</option>
                                                                </select></td>
                                                            <td><input id="pVAL5" maxlength="255" name="pVAL5" size="20"
                                                                    title="值 5" type="text" value=""></td>
                                                            <td><span id="pLOOKUP5" style="display:none"><a
                                                                        href="javascript:openPopupFocus%28%27%27%2C%20%27filter_lookup%27%2C%20620%2C%20430%2C%20%27width%3D620%2Cheight%3D430%2Cresizable%3Dyes%2Ctoolbar%3Dno%2Cstatus%3Dno%2Cscrollbars%3Dyes%2Cmenubar%3Dno%2Cdirectories%3Dno%2Clocation%3Dno%2Cdependant%3Dno%27%2C%20false%2C%20true%29%3BopenFilterLookupWindow%28null%2C%20%27%2Fui%2Flist%2FFilterLookupPage%27%2C%20%27critfld5%27%2C%20%27pVAL5%27%29%3B"
                                                                        title="查找（新窗口） （新窗口）"><img src="@/assets/img/s.gif"
                                                                            alt="查找（新窗口） （新窗口）" class="lookupIcon"
                                                                            onblur="this.className = 'lookupIcon';"
                                                                            onfocus="this.className = 'lookupIconOn';"
                                                                            onmouseout="this.className = 'lookupIcon';this.className = 'lookupIcon';"
                                                                            onmouseover="this.className = 'lookupIconOn';this.className = 'lookupIconOn';"
                                                                            title="查找（新窗口） （新窗口）"></a></span></td>
                                                            <td>&nbsp;</td>
                                                            <td class="FAErrorCell" id="FAErrorCell5">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table><input type="hidden" id="critfld_val0" name="critfld_val0"
                                                    value=""><input type="hidden" id="critfld_val1" name="critfld_val1"
                                                    value=""><input type="hidden" id="critfld_val2" name="critfld_val2"
                                                    value=""><input type="hidden" id="critfld_val3" name="critfld_val3"
                                                    value=""><input type="hidden" id="critfld_val4" name="critfld_val4"
                                                    value="">对于复选框字段，为选中字段输入值"真"，为未选中字段输入值"假"。
                                                对于选项列表字段，以公司语言输入主选项列表字段值。
                                            </div>
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
                    <input value=" 上一页 " class="inpBtn" name="goPrevious" title="上一页" type="button"
                        @click="handlePrev(2)">
                    &nbsp;
                    <input value=" 下一页 " class="inpBtn" name="goNext" popup="true" title="下一页" type="button"
                        @click="handleNext(3)">
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

    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const props = defineProps({
        type: [String, Number]
    });
    import { useStore } from "vuex";
    let store = useStore();
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const formState = reactive({
        filterControl: 0,
        SummarizedFieldEnumOrId: ""
    });
    const rules = reactive({
        SummarizedFieldEnumOrId: {
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
            let objForm = toRaw(formState);
            for(let key in objForm){
                if(typeof objForm[key] == 'boolean'){
                    objForm[key] = objForm[key] ? 1 : 0;
                }
                store.commit('setRecordFormField', {field:key, value: objForm[key]});
            }
            emit("next", current);
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
                .pbSubheader.first{
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
                    .pbSubExtra{
                        float: right;
                        .requiredLegend{
                            padding: 0 2px;
                            font-weight: normal;
                            color: #000;
                            .requiredExampleOuter{
                                margin: 0 .2em 0 .3em;
                                padding: 1px 0;
                                .requiredExample{
                                    border-left: 3px solid #c00;
                                    vertical-align: 1px;
                                }
                            }
                            .requiredMark{
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
            table.detailList{
                input[type="radio"]{
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
    #operationCtr .opSimple td{
        background-color: #e3ebf0;
        border-bottom: 2px solid #8e9dbe;
        vertical-align: middle;
        padding-top: 4px;
        padding-bottom: 4px;
    }
    #operationCtr .operation td{
        padding-top: 4px;
        padding-bottom: 4px;
        vertical-align: middle;
    }
    .opComplex{
        background-color: #f8f8d8;
    }
    .opField{
        border-left: 1px solid #8e9dbe;
        padding-left: 10px;
        width: 75%;
    }
    th{
        text-align: left;
    }
    .errorMsg {
        padding-left: 3px;
        color: #d74c3b;
    }
</style>