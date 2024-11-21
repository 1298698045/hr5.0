<template>
    <keep-alive>
        <div class="NewField">
            <!-- <div class="head">
                <h1 class="title">外出学术活动审批表：新建自定义字段</h1>
                <div>
                    <a href="javascript:;">此页面的帮助</a>
                    <img :src="require('@/assets/img/help_orange.png')" alt="">
                </div>
            </div> -->
            <div class="panelStepBox">
                <div class="panelStepTitle" v-if="type=='Y'||type=='x'||type == 'Y_MT'">
                    <span>
                        步骤 3. 输入查找字段的标签和名称
                    </span>
                    <span>
                        第 3 步，共 6 步
                    </span>
                </div>
                <div class="panelStepTitle" v-else>
                    <span>
                        步骤 2. 输入详细信息
                    </span>
                    <span>
                        步骤 2. 输入详细信息
                    </span>
                </div>
                
                <div class="panelStepBoxBd">
                    <div class="panleStep">
                        <!-- <a-button @click="handlePrev(0)">上一页</a-button>
                        <a-button class="ml10" @click="handleNext(2)">下一页</a-button> -->
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(1)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(3)">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                    </div>
                    <div class="panelContent">
                        <!-- <a-form :label-col="labelCol" :model="formState">
                            <a-form-item label="字段标签" name="MasterLabel" :rules="[{ required: true, message: '请输入字段标签!' }]">
                                <a-input class="fieldInp" v-model="formState.MasterLabel"></a-input>
                            </a-form-item>
                            <a-form-item label="字段名" :rules="[{ required: true, message: '请输入字段名!' }]">
                                <a-input class="fieldInp"></a-input>
                            </a-form-item>
                            <a-form-item label="描述">
                                <a-textarea class="fieldText" placeholder="描述" :rows="4" />
                            </a-form-item>
                            <a-form-item label="帮助文本">
                                <a-textarea class="fieldText" placeholder="帮助文本" :rows="4" />
                            </a-form-item>
                            <a-form-item label="必需">
                                <a-checkbox v-model:checked="checked">此字段中总是需要一个值来保存记录</a-checkbox>
                            </a-form-item>
                            <a-form-item label="默认值">
                                <a-input style="width: 40%;"></a-input><br/>
                                使用 公式语法： 例如， 双引号中的文本: <span class="strong">"您好"</span>, 数字: <span class="strong">25</span>, 小数形式的百分比: <span class="strong">0.10</span>, 日期表达式: <span class="strong">Today() + 7</span>
                            </a-form-item>
                        </a-form> -->
                        <table class="detailList">
                            <tbody>
                                <tr>
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            字段标签
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.MasterLabel" maxlength="40" size="20"
                                                name="MasterLabel" type="text">
                                            <template v-if="rules.MasterLabel.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                            <div class="mouseOverInfoOuter">
                                                <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon"
                                                    title="">
                                                <div class="mouseOverInfo">输入要在显示视图、页面布局视图、报表视图和列表视图上使用的标签。</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="type=='g'"><td class="labelCol empty">&nbsp;</td><td class="data2Col" colspan="3">请输入位置名称，如“总公司”。请具描述性和特定性，而且请记住，一个记录可能有多个位置，如“西海岸销售办公室”和“东海岸销售办公室”。</td></tr>
                                <tr class="detailRow">
                                    <td colspan="4">
                                        &nbsp;
                                    </td>
                                </tr>
                                <template v-if="type=='g'">
                                    <tr>
                                        <td class="labelCol">纬度与经度显示表示法</td>
                                        <td class="data2Col" colspan="3">
                                            <input v-model="formState.options_19" checked="checked" id="options_190" name="options_19" type="radio" value="0">
                                            <label for="options_190">度数、分钟、秒钟</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <input v-model="formState.options_19" id="options_191" name="options_19" type="radio" value="1">
                                            <label for="options_191">数字</label>
                                        </td>
                                    </tr>
                                    <tr class="detailRow"><td colspan="4">&nbsp;</td></tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="Scale"><span class="assistiveText">*</span>小数位数</label>
                                        </td>
                                        <td class="dataCol col02">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input v-model="formState.Scale" id="Scale" name="Scale" size="20" type="text">
                                                <div class="errorMsg" v-if="rules?.Scale?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            </div>
                                        </td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="dataCol last empty">&nbsp;</td>
                                    </tr>
                                    <tr><td class="labelCol empty">&nbsp;</td><td class="dataCol col02"><span class="bodySmall">小数点右边的数字位数</span></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                </template>
                                <tr v-if="type=='B'"><td class="labelCol">默认值</td><td class="dataCol col02">
                                    <input v-model="formState.DefaultValue" id="DefaultValue1" name="DefaultValue" type="radio" value="1">
                                    <label for="DefaultValue1">选取的</label>
                                    <br>
                                    <input v-model="formState.DefaultValue" checked="checked" id="DefaultValue0" name="DefaultValue" type="radio" value="0"><label for="DefaultValue0">未选取的</label></td><td class="labelCol last empty">&nbsp;</td><td class="dataCol last empty">&nbsp;</td></tr>
                                <template v-if="type=='V'">
                                    <tr>
                                        <td class="labelCol">显示格式</td>
                                        <td class="data2Col" colspan="3">
                                            <input v-model="formState.AutoNumberMask" id="AutoNumberMask" maxlength="90" name="AutoNumberMask" size="20" type="text">
                                            &nbsp;&nbsp;
                                            <strong>示例： </strong>&nbsp;<strong>A-{0000}</strong>&nbsp;&nbsp;<a href="javascript:void%280%29" onclick="setLastMousePosition(event);openPopupFocus('/setup/ui/whatisdisplayformat.jsp', 'jsOpen', 720,500,'width=720,height=500,resizable=yes,toolbar=no,status=no,scrollbars=yes,menubar=no,directories=no,location=no,dependant=no', true, false);return false;" title="这是什么？ （新窗口）">这是什么？</a></td></tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="startNum">
                                                <span class="assistiveText">*</span>
                                                开始编号
                                            </label>
                                        </td>
                                        <td class="dataCol col02">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input :class="{'error':rules?.startNum?.isRequired}" v-model="formState.startNum" id="startNum" maxlength="10" name="startNum" size="20" type="text">
                                                <div class="errorMsg" v-if="rules?.startNum?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            </div>
                                        </td>
                                        <td class="labelCol last empty">&nbsp;</td>
                                        <td class="dataCol last empty">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">&nbsp;</td>
                                        <td class="data2Col" colspan="3">
                                            <input v-model="formState.populate" id="populate" name="populate" type="checkbox" value="1">
                                            <label for="populate">为现有记录生成自动编号</label>
                                        </td>
                                    </tr>
                                </template>
                                <template v-if="type=='P'||type=='C'||type=='N'">
                                    <tr v-if="type=='P'||type=='C'||type=='N'"><td class="labelCol empty">&nbsp;</td><td class="data2Col" colspan="3">请输入数字的长度和小数位数。例如，输入长度为 8，小数位数为 2，可接受的最大值位数即为"12345678.90"。</td></tr>
                                    <tr class="detailRow"><td colspan="4">&nbsp;</td></tr>
                                    <tr v-if="type=='P'||type=='C'||type=='N'">
                                        <td class="labelCol requiredInput">
                                            <label for="digleft"><span class="assistiveText">*</span>长度</label></td>
                                        <td class="dataCol col02">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input id="digleft" name="digleft" size="20" type="text" v-model="formState.digleft">
                                                <div class="errorMsg" v-if="rules?.digleft?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            </div>
                                        </td>
                                        <td class="labelCol requiredInput"><label for="Scale"><span class="assistiveText">*</span>小数位数</label></td>
                                        <td class="dataCol">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input id="Scale" name="Scale" size="20" type="text" v-model="formState.Scale">
                                                <div class="errorMsg" v-if="rules?.Scale?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="type=='P'||type=='C'||type=='N'"><td class="labelCol empty">&nbsp;</td><td class="dataCol col02"><span class="bodySmall">小数点左边的数字位数</span></td><td class="labelCol last empty">&nbsp;</td><td class="last dataCol"><span class="bodySmall">小数点右边的数字位数</span></td></tr>
                                </template>
                                <template v-if="type=='L'||type=='DT'||type=='RBL'||type=='Q'">
                                    <tr>
                                        <td class="labelCol requiredInput"><label for="值"><span class="assistiveText">*</span>值</label></td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <ul class="radioGroup" id="值" name="值">
                                                    <li>
                                                        <input checked="checked" id="picklistTypeGLOBAL_PICKLIST" name="picklistType" v-model="formState.picklistTypeGLOBAL_PICKLIST" onclick="document.getElementById('ptext').style.display='none';document.getElementById('ptext').value='';document.getElementById('PicklistEnumOrId').style.display='inline';document.getElementById('defPl').disabled=true;document.getElementById('pickopts_1').checked=true;document.getElementById('defPl').checked=false;document.getElementById('pickopts_1').disabled=true;document.getElementById('pickopts_0').disabled=true;document.getElementById('pickopts_0').checked=false;" type="radio" value="GLOBAL_PICKLIST">
                                                        <label for="picklistTypeGLOBAL_PICKLIST">使用全局选项列表值集</label>
                                                    </li>
                                                    <li>
                                                        <input id="picklistTypeLOCAL_PICKLIST" name="picklistType" v-model="formState.picklistTypeGLOBAL_PICKLIST" onclick="document.getElementById('ptext').style.display='inline';document.getElementById('PicklistEnumOrId').style.display='none';document.getElementById('PicklistEnumOrId').selectedIndex=0;document.getElementById('defPl').disabled=false;document.getElementById('pickopts_1').checked=true;document.getElementById('pickopts_1').disabled=false;document.getElementById('pickopts_0').disabled=false;" type="radio" value="LOCAL_PICKLIST">
                                                        <label for="picklistTypeLOCAL_PICKLIST">输入值，每个值单独占一行</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">&nbsp;</td><td class="data2Col" colspan="3">
                                            <select :class="{'error':rules?.Precision?.isRequired}" id="PicklistEnumOrId" v-model="formState.PicklistEnumOrId" name="PicklistEnumOrId">
                                                <option value="">--无--</option>
                                                <option value="0Nt90000000TN6Z">性别</option>
                                            </select>
                                            <div class="errorMsg" v-if="rules?.Precision?.isRequired"><strong>错误:</strong> 必须选择全局选项列表定义</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol empty">&nbsp;</td>
                                        <td class="data2Col" colspan="3">
                                            <textarea v-model="formState.ptext" cols="70" id="ptext" maxlength="15000" name="ptext" rows="7" style="display: none" type="text" wrap="soft"></textarea>
                                        </td>
                                    </tr>
                                    <tr><td class="labelCol">&nbsp;</td><td class="data2Col" colspan="3"><input disabled="true" v-model="formState.pickopts_0" id="pickopts_0" name="pickopts_0" type="checkbox" value="1"><label for="pickopts_0">按字母顺序显示值，而不是输入的顺序</label></td></tr>
                                    <tr><td class="labelCol">&nbsp;</td><td class="data2Col" colspan="3"><input disabled="true" v-model="formState.defPl" id="defPl" name="defPl" type="checkbox" value="1"><label for="defPl">将第一个值用作默认值</label><div class="mouseOverInfoOuter" onfocus="addMouseOver(this)" onmouseover="addMouseOver(this)" tabindex="0"><img src="@/assets/img/s.gif" alt="" class="infoIcon" title=""><div class="mouseOverInfo" style="display:none;">如果您输入有效的默认值公式，则将会覆盖此设置。</div></div></td></tr>
                                    <tr><td class="labelCol">&nbsp;</td><td class="data2Col" colspan="3"><input checked="true" disabled="true" v-model="formState.pickopts_1" id="pickopts_1" name="pickopts_1" type="checkbox" value="1"><label for="pickopts_1">限制在值集中定义的值选项列表</label>&nbsp;<div class="mouseOverInfoOuter" onfocus="addMouseOver(this)" onmouseover="addMouseOver(this)" tabindex="0"><img src="@/assets/img/s.gif" alt="" class="infoIcon" title=""><div class="mouseOverInfo" style="display:none;">通过限制的选项列表执行数据完整性。此设置会限制字段，以仅从选项列表接受值，即使该字段已通过 API 进行更新。</div></div></td></tr>
                                </template>
                                <tr v-if="type=='S'||type=='6'||type=='UC'||type=='UCS'|| type == 'UCP' || type == 'US' || type == 'CA'">
                                    <td class="labelCol empty">&nbsp;</td>
                                    <td class="data2Col" colspan="3">请在下面输入文本字段的最大长度。</td>
                                </tr>
                                <tr v-if="type=='S'||type=='6'||type=='UC'||type=='UCS'|| type == 'UCP' || type == 'US' || type == 'CA'">
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            长度
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.Length" maxlength="40" size="20" name="Length"
                                                type="text">
                                            <template v-if="rules?.Length?.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                        </div>
                                    </td>
                                </tr>
                                
                                <template v-if="type=='J'||type=='z'">
                                    <tr><td class="labelCol empty">&nbsp;</td><td class="data2Col" colspan="3">您当前正在使用此对象总计 1,638,400 个字符中的 0 个字符。您有另 1,638,400 个字符可分配到此字段。</td></tr>
                                    <tr><td class="labelCol">长度</td><td class="data2Col" colspan="3"><input id="Length" name="Length" size="20" type="text" v-model="formState.Length" ></td></tr>
                                    <tr><td class="labelCol empty">&nbsp;</td><td class="data2Col" colspan="3">(最大 131,072）</td></tr>
                                    <tr class="detailRow"><td colspan="4">&nbsp;</td></tr>
                                </template>
                                <tr v-if="type=='Q'||type=='z'||type=='J'">
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            可见行数
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input maxlength="40" size="20"
                                                name="Precision" type="text" v-model="formState.Precision">
                                            <template v-if="rules?.Precision?.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            <span class="assistiveText">*</span>
                                            字段名
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.DeveloperName" maxlength="40" size="20"
                                                name="DeveloperName" type="text">
                                            <template v-if="rules?.DeveloperName?.isRequired">
                                                <div class="errorMsg">
                                                    <strong>错误:</strong>
                                                    必须输入一个值
                                                </div>
                                                &nbsp;
                                            </template>
                                            <div class="mouseOverInfoOuter">
                                                <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon"
                                                    title="">
                                                <div class="mouseOverInfo">"字段名"供内部参考，用于集成目的（如自定义链接、Custom S-control 和
                                                    API）。在更改"字段名"时要小心，因为可能会影响现有集成。</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            描述
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <textarea v-model="formState.Description" cols="100" id="Description"
                                            maxlength="1000" name="Description" rows="3" type="text"
                                            wrap="soft"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="labelCol requiredInput">
                                        <label for="MasterLabel">
                                            帮助文本
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <textarea v-model="formState.InlineHelpText" cols="100" id="InlineHelpText"
                                            maxlength="1000" name="InlineHelpText" rows="3" type="text"
                                            wrap="soft"></textarea>
                                        &nbsp;
                                        <div class="mouseOverInfoOuter">
                                            <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                            <div class="mouseOverInfo">当用户悬停在此字段旁的信息图标上时，此文本将显示在详细信息页和编辑页中。</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="detailRow">
                                    <td colspan="4">&nbsp;</td>
                                </tr>
                                <tr v-if="type=='O'||type=='U'||type == 'M_U'||type == 'M_O'">
                                    <td class="labelCol requiredInput">
                                        <label for="AggregateRelationshipName">
                                            <span class="assistiveText">*</span>子级关系名称
                                        </label>
                                    </td>
                                    <td class="data2Col" colspan="3">
                                        <div class="requiredInput">
                                            <div class="requiredBlock"></div>
                                            <input v-model="formState.AggregateRelationshipName" id="AggregateRelationshipName" maxlength="40" name="AggregateRelationshipName" size="20" type="text">
                                            <div class="errorMsg" v-if="rules?.AggregateRelationshipName?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            &nbsp;
                                            <div class="mouseOverInfoOuter">
                                                <img src="@/assets/img/s.gif" alt="" class="infoIcon" title="">
                                                <div class="mouseOverInfo">子级关系名称是内部引用，用于集成用途。更改子级关系名称时请务必谨慎，因为可能影响现有集成。 </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="type=='S'||type=='X'||type=='D'||type=='F'||type=='f'||type=='DT_M'||type=='TP'||type=='Year'||type=='Month'||type=='Y_M'||type=='E'||type=='H'||type=='P'||type=='L'||type=='DT'||type=='RBL'||type=='Q'||type=='U'||type=='C'||type=='N'||type=='6'||type=='g'||type=='UC'||type=='UCS'|| type == 'UCP' || type == 'US' || type == 'CA'||type=='I'||type == 'ColorPicker'||type == 'O'||type == 'M_U'||type == 'M_O'">
                                    <td class="labelCol">必需</td>
                                    <td class="data2Col" colspan="3">
                                        <input id="options_0" name="options_0" type="checkbox"
                                            v-model="formState.options_0">此字段中总是需要一个值来保存记录
                                    </td>
                                </tr>
                                <tr v-if="type=='UC'||type=='UCS'|| type == 'UCP' || type == 'US' || type == 'CA'">
                                    <td class="labelCol"><label for="IsUnique">独有</label></td>
                                    <td class="data2Col" colspan="3">
                                        <input id="IsUnique" name="IsUnique" type="checkbox" v-model="formState.IsUnique">
                                        不允许重复值
                                    </td>
                                </tr>
                                <template v-if="type=='S'||type=='E'||type=='N'">
                                    <tr>
                                        <td class="labelCol"><label for="IsUnique">独有</label></td>
                                        <td class="data2Col" colspan="3">
                                            <input id="IsUnique" name="IsUnique" type="checkbox" v-model="formState.IsUnique">
                                            不允许重复值
                                        </td>
                                    </tr>
                                    <tr v-if="type=='S'">
                                        <td class="labelCol empty">&nbsp;</td>
                                        <td class="data2Col" colspan="3">
                                            <ul class="subgroup">
                                                <li><input checked="checked" :disabled="formState.IsUnique?false:true" id="caseInsensButton"
                                                        name="IsCaseSensitive" type="radio" value="0" v-model="formState.IsCaseSensitive"><label
                                                        for="caseInsensButton"><span
                                                            class="assistiveText">*</span>将"ABC"和"abc"视为重复值（不区分大小写）</label>
                                                </li>
                                                <li><input :disabled="formState.IsUnique?false:true" id="caseSensButton"
                                                        name="IsCaseSensitive" type="radio" value="1" v-model="formState.IsCaseSensitive"><label
                                                        for="caseSensButton"><span
                                                            class="assistiveText">*</span>将"ABC"和"abc"视为不同值（区分大小写）</label>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol"><label for="IsExternalIdentifier">外部 ID</label></td>
                                        <td class="data2Col" colspan="3"><input id="IsExternalIdentifier"
                                                name="IsExternalIdentifier" type="checkbox"
                                                v-model="formState.IsExternalIdentifier">将此字段设置为针对外部系统的唯一记录标识符</td>
                                    </tr>
                                </template>
                                <template v-if="type=='Y'||type=='x'">
                                    <tr class="detailRow"><td colspan="4">&nbsp;</td></tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="MasterLabel">
                                                <span class="assistiveText">*</span>
                                                子级关系名称
                                            </label>
                                        </td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input v-model="formState.AggregateRelationshipName" maxlength="40" size="20"
                                                    name="AggregateRelationshipName" type="text">
                                                <template v-if="rules?.AggregateRelationshipName?.isRequired">
                                                    <div class="errorMsg">
                                                        <strong>错误:</strong>
                                                        必须输入一个值
                                                    </div>
                                                    &nbsp;
                                                </template>
                                                <div class="mouseOverInfoOuter">
                                                    <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon"
                                                        title="">
                                                    <div class="mouseOverInfo">子级关系名称是内部引用，用于集成用途。更改子级关系名称时请务必谨慎，因为可能影响现有集成。</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">必需</td>
                                        <td class="data2Col" colspan="3">
                                            <input id="options_0" name="options_0" type="checkbox"
                                                v-model="formState.options_0">此字段中总是需要一个值来保存记录
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">如果查找记录被删除怎么办？</td>
                                        <td class="data2Col" colspan="3">
                                            <div>
                                                <input v-model="formState.fkConstraint" id="fkConstraintN" name="fkConstraint" type="radio" value="N">
                                                <label for="fkConstraintN">清除此字段的值。&nbsp;如果您将此字段设为必填，您不能选择此选项。</label>
                                            </div>
                                            <br>
                                            <div>
                                                <input v-model="formState.fkConstraint" checked="checked" id="fkConstraintR" name="fkConstraint" type="radio" value="R">
                                                <label for="fkConstraintR">不允许删除＂作为查找关系的一部分的查找记录＂。</label>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-if="type=='V'">
                                    <td class="labelCol"><label for="IsExternalIdentifier">外部 ID</label></td>
                                    <td class="data2Col" colspan="3"><input id="IsExternalIdentifier"
                                            name="IsExternalIdentifier" type="checkbox"
                                            v-model="formState.IsExternalIdentifier">将此字段设置为针对外部系统的唯一记录标识符</td>
                                </tr>
                                <template v-if="type == 'Y_MD' ">
                                    <tr class="detailRow"><td colspan="4">&nbsp;</td></tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="AggregateRelationshipName">
                                                <span class="assistiveText">*</span>子级关系名称
                                            </label>
                                        </td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <input v-model="formState.AggregateRelationshipName" id="AggregateRelationshipName" maxlength="40" name="AggregateRelationshipName" size="20" type="text">
                                                <div class="errorMsg" v-if="rules?.AggregateRelationshipName?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                                &nbsp;
                                                <div class="mouseOverInfoOuter">
                                                    <img src="@/assets/img/s.gif" alt="" class="infoIcon" title="">
                                                    <div class="mouseOverInfo">子级关系名称是内部引用，用于集成用途。更改子级关系名称时请务必谨慎，因为可能影响现有集成。 </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol">共享设置</td>
                                        <td class="data2Col" colspan="3">选择主记录上所需的最小访问级别以创建、编辑或删除相关详细信息记录：
                                            <ul class="radioGroup" id="OptionsFlag_13" name="OptionsFlag_13">
                                                <li>
                                                    <input v-model="formState.OptionsFlag_13" id="OptionsFlag_131" name="OptionsFlag_13" type="radio" value="1">
                                                    <label for="OptionsFlag_131">只读：允许至少对主记录拥有读取访问权限的用户创建、编辑或删除相关详细信息记录。</label>
                                                </li>
                                                <li>
                                                    <input v-model="formState.OptionsFlag_13" checked="checked" id="OptionsFlag_130" name="OptionsFlag_13" type="radio" value="0">
                                                    <label for="OptionsFlag_130">读/写：允许至少对主记录拥有读/写访问权限的用户创建、编辑或删除相关详细信息记录。</label>
                                                </li>
                                            </ul>
                                    </td></tr>
                                    <tr>
                                        <td class="labelCol">允许重新设置父级</td>
                                        <td class="data2Col" colspan="3">
                                            <input v-model="formState.options_20" id="options_20" name="options_20" type="checkbox" value="1">子记录在被创建后可重新设置父级至其他父级记录
                                        </td>
                                    </tr>
                                </template>
                                <tr v-if="type!='g'&&type!='O'&&type!='M_U'&&type!='M_O'">
                                    <td class="last labelCol">自动添加到自定义报表类型</td>
                                    <td class="last data2Col" colspan="3">
                                        <input v-model="formState.autoAddFieldToCrt" id="autoAddFieldToCrt"
                                            name="autoAddFieldToCrt" type="checkbox">
                                        将此字段添加到包含此实体的现有自定义报表类型&nbsp;
                                        <div class="mouseOverInfoOuter">
                                            <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                            <div class="mouseOverInfo">如果出现错误，您仍可以使用该字段，条件是您手动将字段添加到自定义报表类型。</div>
                                        </div>
                                    </td>
                                </tr>
                                <template v-if="type=='6'">
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="MaskType"><span class="assistiveText">*</span>掩码类型</label>
                                        </td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div>
                                                <select :class="{'active':rules?.MaskType?.isRequired}" id="MaskType" v-model="formState.MaskType" name="MaskType"><option value="">--无--</option><option value="A">以掩码显示所有字符</option>
                                                    <option value="4">清除最后四个字符</option>
                                                    <option value="C">信用卡号码</option>
                                                    <option value="U">国家保险号码</option>
                                                    <option value="S">社会安全号码</option>
                                                    <option value="N">社会保险号码</option>
                                                </select>
                                                <div class="errorMsg" v-if="rules?.MaskType?.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="labelCol requiredInput">
                                            <label for="MaskChar"><span class="assistiveText">*</span>掩码字符</label>
                                        </td>
                                        <td class="data2Col" colspan="3">
                                            <div class="requiredInput">
                                                <div class="requiredBlock"></div><select :class="{'active':rules?.MaskChar?.isRequired}" v-model="formState.MaskChar" id="MaskChar" name="MaskChar"><option value="">--无--</option><option value="*">*</option>
                                        <option value="X">X</option>
                                            </select><div class="errorMsg" v-if="rules?.MaskChar?.isRequired"><strong>错误:</strong> 必须输入一个值</div></div></td>
                                    </tr>
                                    <tr><td class="last labelCol">示例</td><td class="last data2Col" colspan="3"><div id="ecfExample"></div>
                                        
                                    </td></tr>
                                </template>
                                <tr class="detailRow">
                                    <td colspan="4">&nbsp;</td>
                                </tr>
                                <tr v-if="type=='S'||type=='X'||type=='D'||type=='F'||type=='f'||type=='DT_M'||type=='TP'||type=='Year'||type=='Month'||type=='Y_M'||type=='E'||type=='H'||type=='P'||type=='L'||type=='DT'||type=='RBL'||type=='Q'||type=='U'||type=='J'||type=='C'||type=='N'||type=='UC'||type=='UCS'|| type == 'UCP' || type == 'US' || type == 'CA'||type=='I'||type == 'ColorPicker'||type == 'O'||type == 'M_U'||type == 'M_O'">
                                    <td class="last labelCol"><label for="DefaultValue">默认值</label></td>
                                    <td class="last data2Col">
                                        <div class="showHideLink"><a href="javascript:;" id="DefaultValue_toggle" @click="handleisShowFormula">
                                            {{isFormulaShow?'隐藏公式编辑器':'显示公式编辑器'}}
                                        </a></div>
                                        <div class="miniTabOn">
                                            <table width="500px">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top">
                                                            <table v-if="isFormulaShow">
                                                                <tbody>
                                                                    <tr id="DefaultValue_selector">
                                                                        <td id="insertFieldCell" align="left"
                                                                            valign="top">
                                                                            <table>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>选择字段类型</td>
                                                                                        <td>插入字段</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td><select
                                                                                                id="fieldCategorySelector"
                                                                                                name="fieldCategorySelector"
                                                                                                onchange="FormulaEditor.setListToCategory(this.options[this.selectedIndex].value, categoryToFieldMap, 'fieldSelector', null, true)"
                                                                                                title="选择字段类别">
                                                                                                <option value=""
                                                                                                    selected="selected">
                                                                                                    -- 选择字段类型 --
                                                                                                </option>
                                                                                                <option value="$Label">
                                                                                                    $Label</option>
                                                                                                <option
                                                                                                    value="$Organization">
                                                                                                    $Organization
                                                                                                </option>
                                                                                                <option
                                                                                                    value="$Profile">
                                                                                                    $Profile</option>
                                                                                                <option
                                                                                                    value="$Setup.Milestone1_Settings__c">
                                                                                                    $Setup.Milestone1_Settings__c
                                                                                                </option>
                                                                                                <option
                                                                                                    value="$Setup.slackv2__Slack_Settings__c">
                                                                                                    $Setup.slackv2__Slack_Settings__c
                                                                                                </option>
                                                                                                <option value="$System">
                                                                                                    $System</option>
                                                                                                <option value="$User">
                                                                                                    $User</option>
                                                                                                <option
                                                                                                    value="$UserRole">
                                                                                                    $UserRole</option>
                                                                                            </select></td>
                                                                                        <td><select
                                                                                                v-model="fieldSelector"
                                                                                                class="fieldSelector"
                                                                                                id="fieldSelector"
                                                                                                name="fieldSelector"
                                                                                                @change="changeInsertField"
                                                                                                title="插入合并字段">
                                                                                                <option value="">--插入合并字段 --</option>
                                                                                                <option :value="item.developerName" v-for="(item, index) in fieldList" :key="index">{{item.label}}</option>
                                                                                            </select></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <td id="insertOperatorCell" width="400">
                                                                            <div class="menuButton" id="insertOperator">
                                                                                <div class="menuButtonButton"
                                                                                    @click.stop="handleOpreator"
                                                                                    id="insertOperatorButton"><span
                                                                                        class="menuButtonLabel"
                                                                                        id="insertOperatorLabel"
                                                                                        tabindex="0">插入运算符</span></div>
                                                                                <div class="menuButtonMenu"
                                                                                    @click.stop
                                                                                    v-if="isOperator"
                                                                                    id="insertOperatorMenu">
                                                                                    <a href="javascript:;" v-for="(item, index) in operatorList" :key="index" class="menuButtonMenuLink firstMenuItem" @click="insertOperator(item)">{{item.name}}</a>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div>
                                                                <textarea class="FormulaText"
                                                                    v-model="formState.DefaultValue"
                                                                    aria-label="Insert Formula" cols="80"
                                                                    id="DefaultValue" maxlength="4000"
                                                                    name="DefaultValue" rows="20"
                                                                    style="width: 500px; height: 100px;" :style="{height:!isFormulaShow?'24px':'100px'}" type="text"
                                                                    wrap="soft"></textarea>
                                                                <div>
                                                                    <div id="DefaultValue_validate" style="" v-if="isFormulaShow"><input
                                                                            value=" 检查语法 " class="inpBtn"
                                                                            name="goRefresh" title="检查语法" type="submit">
                                                                    </div>
                                                                    <span class="formulaType">使用 <a
                                                                            href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?target=elements_of_a_formula.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                                                                            title="公式语法： （新窗口）">公式语法：</a>
                                                                        使用双引号，包括文本和选项列表值 API 名称 : <span
                                                                            class="formulaExample">("the_text")</span>,
                                                                        包含数字，没有引号 : <span
                                                                            class="formulaExample">(25)</span>,
                                                                        将百分比显示为小数: <span
                                                                            class="formulaExample">(0.10)</span>,
                                                                        以标准格式表示日期计算: <span
                                                                            class="formulaExample">(Today() + 7)</span>,
                                                                        从自定义元数据类型记录使用引用字段: <span
                                                                            class="formulaExample">$CustomMetadata.Type__mdt.RecordAPIName.Field__c</span></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td valign="top" id="DefaultValue_functions"  v-if="isFormulaShow">
                                                            <table class="miniTabOn" id="advFunctions"
                                                                style="width: 200px;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><span class="bodySmall">函数</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><select id="functionCategorySelector"
                                                                                name="functionCategorySelector"
                                                                                v-model="categoryVal"
                                                                                @change="changeCategory"
                                                                                title="-- 所有函数类别 --">
                                                                                <option value="">-- 所有函数类别 --</option>
                                                                                <option value="DateTime">日期和时间</option>
                                                                                <option value="Logical">逻辑</option>
                                                                                <option value="Math">数学</option>
                                                                                <option value="Text">文本</option>
                                                                                <option value="Advanced">高级</option>
                                                                            </select></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <select id="functionSelector"
                                                                                v-model="funVal"
                                                                                name="functionSelector"
                                                                                @change="changeFunctionInfo"
                                                                                @dblclick="handleInsertFun"
                                                                                size="6" title="函数">
                                                                                <option :value="item.value" v-for="(item, index) in funList">{{item.label}}</option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <input value="插入所选函数" class="inpBtn"
                                                                                @click="handleInsertFun"
                                                                                name="addToFormula"
                                                                                title="插入所选函数" type="button">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="funcFormat" id="funcFormat">&nbsp; {{funcFormat}}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="funcExplain" id="funcExplain">
                                                                            <div class="funcExplainDiv" v-html="funcExplain"></div>
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
                        <!-- 查找类型-筛选器 -->
                        <div class="bPageBlock" v-if="type=='Y'">
                            <div class="pbSubheader">
                                <h3>查找筛选器</h3>
                            </div>
                            <div class="pbSubsection">
                                <table class="detailList">
                                    <tbody>
                                        <tr class="detailRow">
                                            <td colspan="4">
                                                <div class="instructionsText">
                                                    也可以创建一个筛选器以限制用户在查找字段中可用的记录。&nbsp;&nbsp;<a href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=fields_lookup_filters.htm%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);" title="了解详细信息！ （新窗口）">了解详细信息！</a></div></td></tr><tr class="last detailRow"><td colspan="4">
                                                        <div class="twistSection">
                                                            <img :src="require('@/assets/img/s.gif')" alt="显示筛选设置" class="hideTriangle" id="lookupFilterSection_twisty" onclick="FieldAttributesUi.toggleFilterSettingsDisplay();" style="cursor:pointer;" title="显示筛选设置"><a href="javascript:FieldAttributesUi.toggleFilterSettingsDisplay%28%29" id="lookupFilterSection_link">隐藏筛选设置</a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pbSubsection">
                                <table class="detailList">
                                    <tbody>
                                        <tr>
                                            <td class="last labelCol">过滤条件</td>
                                            <td class="last data2Col" colspan="3">
                                                <div class="FARadioChoices FASectionBody">
                                                    <div class="FACriteriaSection" id="FACriteriaSection">
                                                        <!-- <table>
                                                            <tbody>
                                                                <tr><td class="lfInsertSuggestedCell" colspan="9"><input value="插入建议条件" class="inpBtn" id="insertDepButton" name="insertDependency" title="插入建议条件" type="button"></td></tr>
                                                                <tr><td class="clearFilterRow" colspan="9"><a href="javascript:%20void%280%29%3B" id="clrFiltersLnk">清除过滤器条件</a></td></tr>
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <th colspan="2" scope="col">字段</th>
                                                                    <th scope="col">运算符</th>
                                                                    <th colspan="2" scope="col">值 / 字段</th>
                                                                </tr>
                                                                <tr id="frow1">
                                                                    <td class="FACriteriaIDCell">
                                                                        <span class="textBox" id="f1" style="display:none">1.</span>
                                                                        &nbsp;
                                                                    </td>
                                                                    <td>
                                                                        <input type="hidden" id="critfld1" name="critfld1" value="">
                                                                        <div id="FAOuterDiv" class="critfld1_div">
                                                                            <div class="FALabelEle">
                                                                                <span id="labelForcritfld1">
                                                                                    <div class="x-form-field-wrap x-form-field-trigger-wrap">
                                                                                        <input type="text" size="24" autocomplete="off" id="critfld1_label" name="critfld1_label" class="x-form-empty-field" style="width: 221px;">
                                                                                    </div>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <a href="" id="critfld1_fs" title="查找（新窗口）">
                                                                            <img :src="require('@/assets/img/s.gif')" alt="">
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            <select name="critop1" id="critop1" class="" title="运算符 1" style="width: 91px;"><option value="">--无--</option><option value="e">等于</option><option value="n">不等于</option><option value="s">起始字符</option><option value="c">包含</option><option value="k">不包含</option><option value="l">小于</option><option value="g">大于</option><option value="m">小于或等于</option><option value="h">大于或等于</option><option value="u">包括</option><option value="x">不包括</option></select>
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <select class="FAFVSelect" id="pIS_FLD1" name="pIS_FLD1" title="值 1"><option value="false" selected="selected">值</option>
                                                                            <option value="true">字段</option>
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input class="FARHSValue" id="pVAL1" maxlength="255" name="pVAL1" size="20" title="值 1" type="text" style="">

                                                                    </td>
                                                                    <td>

                                                                    </td>
                                                                    <td class="clrLink" id="clrLink1">
                                                                        <a href="javascript:%20void%280%29%3B" id="clrFiltersLnk1">清除</a>
                                                                    </td>
                                                                    <td class="FAErrorCell" id="FAErrorCell1">&nbsp;</td>
                                                                </tr>

                                                            </tbody>
                                                        </table> -->
                                                        <!-- <FilterQuery :entityId="entityId" /> -->
                                                         <div style="width: 91%;">
                                                             <FilterQuery :entityId="entityId" :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
                                                         </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="pbSubsection">
                                <table class="detailList">
                                    <tbody>
                                        <tr>
                                            <td class="labelCol">
                                                <label for="IsOptional">筛选器类型</label>
                                            </td>
                                            <td class="data2Col" colspan="3">
                                                <ul class="radioGroup" id="IsOptional" name="IsOptional">
                                                    <li>
                                                        <input checked="checked" id="IsOptional0" name="IsOptional" type="radio" value="0" v-model="formState.IsOptional">
                                                        <label for="IsOptional0"><strong>必填。 </strong>用户输入值必须同筛选条件匹配。</label>
                                                        <div class="FAErrorMsg" id="errorMsg">
                                                            <div class="FAErrorMsgInner">如果不行，将在保存后显示该错误消息：<br>
                                                                <div class="requiredInput">
                                                                    <div class="requiredBlock"></div>
                                                                    <textarea cols="60" id="ErrorMessage" maxlength="255" name="ErrorMessage" rows="2" type="text" wrap="soft">值不存在或与筛选条件不匹配。</textarea>
                                                                </div>
                                                                <a href="javascript:%20void%280%29%3B" id="rstErrMsgLnk" style="">重新设置为默认消息</a>
                                                                <span id="rstErrMsg" style="display: none;">重新设置为默认消息</span>
                                                            </div>
                                                            <input type="hidden" id="isDefaultMsg" name="isDefaultMsg" value="1">
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input id="IsOptional1" name="IsOptional" type="radio" value="1" v-model="formState.IsOptional">
                                                        <label for="IsOptional1"><strong>可选。 </strong>用户可以删除筛选器或输入同条件不匹配的值。</label>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr><td class="labelCol">查找窗口文本</td><td class="data2Col" colspan="3"><div class="infoMessageDiv">将该通知消息添加到查找窗口中。<div class="FAErrorMessage">
                                            <textarea v-model="formState.InfoMessage" cols="60" id="InfoMessage" maxlength="255" name="InfoMessage" rows="2" type="text" wrap="soft"></textarea></div></div></td></tr>
                                            <tr><td class="last labelCol">启用</td>
                                                <td class="last data2Col" colspan="3">
                                                    <input checked="checked" id="Active" name="Active" type="checkbox" v-model="formState.Active"><label for="Active">启用该筛选器。</label>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panleStep">
                        <input class="inpBtn" type="button" value=" 上一页 " @click="handlePrev(1)">
                        <input class="inpBtn ml10" type="button" value=" 下一页 " @click="handleNext(3)">
                        <input value=" 取消 " class="inpBtnCancel" name="cancel" title="取消" type="submit" @click="handleCancel">
                    </div>
                </div>
            </div>
        </div>
    </keep-alive>
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
        defineProps,
        defineExpose,
        inject
    } from "vue";
    import _ from 'lodash';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    // import FilterQuery from "@/components/FilterQueryDefault.vue";
    import FilterQuery from "@/components/FilterQuery.vue";
    import functionNameToDescriptionMap from "@/utils/formulaEditor.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    import { useStore } from "vuex";
    let store = useStore();
    const props = defineProps({
        type: [String, Number],
        fieldDetail: Object
    });
    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const radioStyle = reactive({
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
        width: '30%'
    });
    const data = reactive({
        entityId: route.query.id,
        isFormulaShow: false,
        isOperator: false,
        categoryVal: "",
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
        funOptions: [
            {label:"ABS", value:"ABS", type: "Math", desc:"number"},
            {label:"ACOS", value:"ACOS", type: "Math", desc:"number"},
            {label:"ADDMONTHS", value:"ADDMONTHS", type: "DateTime", desc:"date,num"},
            {label:"AND", value:"AND", type: "Logical", desc:"logical1,logical2,..."},
            {label:"ASCII", value:"ASCII", type: "Text", desc:"text"},
            {label:"ASIN", value:"ASIN", type: "Math", desc:"number"},
            {label:"ATAN", value:"ATAN", type: "Math", desc:"number"},
            {label:"ATAN2", value:"ATAN2", type: "Math", desc:"y, x"},
            {label:"BEGINS", value:"BEGINS", type: "Text", desc:"text, compare_text"},
            {label:"BLANKVALUE", value:"BLANKVALUE", type: "Logical", desc:"expression, substitute_expression"},
            {label:"BR", value:"BR", type: "Text", desc:""},
            {label:"CASE", value:"CASE", type: "Logical", desc:"expression, value1, result1, value2, result2,...,else_result"},
            {label:"CASESAFEID", value:"CASESAFEID", type: "Text", desc:"id"},
            {label:"CEILING", value:"CEILING", type: "Math", desc:"number"},
            {label:"CHR", value:"CHR", type: "Text", desc:"number"},
            {label:"CONTAINS", value:"CONTAINS", type: "Text", desc:"text, compare_text"},
            {label:"COS", value:"COS", type: "Math", desc:"number"},
            {label:"CURRENCYRATE", value:"CURRENCYRATE", type: "Advanced", desc:"IsoCode"},
            {label:"DATE", value:"DATE", type: "DateTime", desc:"year,month,day"},
            {label:"DATETIMEVALUE", value:"DATETIMEVALUE", type: "DateTime", desc:"expression"},
            {label:"DATEVALUE", value:"DATEVALUE", type: "DateTime", desc:"expression"},
            {label:"DAY", value:"DAY", type: "DateTime", desc:"date"},
            {label:"DAYOFYEAR", value:"DAYOFYEAR", type: "DateTime", desc:"date"},
            {label:"DISTANCE", value:"DISTANCE", type: "Math", desc:"location, location, unit"},
            {label:"EXP", value:"EXP", type: "Math", desc:"number"},
            {label:"FIND", value:"FIND", type: "Text", desc:"search_text, text [, start_num]"},
            {label:"FLOOR", value:"FLOOR", type: "Math", desc:"number"},
            {label:"FORMATDURATION", value:"FORMATDURATION", type: "DateTime", desc:"numSeconds[, includeDays] | dateTime/time, dateTime/time"},
            {label:"FROMUNIXTIME", value:"FROMUNIXTIME", type: "DateTime", desc:"number"},
            {label:"GEOLOCATION", value:"GEOLOCATION", type: "Math", desc:"number"},
            {label:"GETSESSIONID", value:"GETSESSIONID", type: "Text", desc:""},
            {label:"HOUR", value:"HOUR", type: "DateTime", desc:"expression"},
            {label:"IF", value:"IF", type: "Logical", desc:"logical_test, value_if_true, value_if_false"},
            {label:"INCLUDES", value:"INCLUDES", type: "Text", desc:"text"},
            {label:"INITCAP", value:"INITCAP", type: "Text", desc:"text"},
            {label:"ISBLANK", value:"ISBLANK", type: "Logical", desc:"expression"},
            {label:"ISNULL", value:"ISNULL", type: "Logical", desc:"expression"},
            {label:"ISNUMBER", value:"ISNUMBER", type: "Logical", desc:"Text"},
            {label:"ISOWEEK", value:"ISOWEEK", type: "DateTime", desc:"date"},
            {label:"ISOYEAR", value:"ISOYEAR", type: "DateTime", desc:"date"},
            {label:"ISPICKVAL", value:"ISPICKVAL", type: "Text", desc:"picklist_field, text_literal"},
            {label:"LEFT", value:"LEFT", type: "Text", desc:"text, num_chars"},
            {label:"LEN", value:"LEN", type: "Text", desc:"text"},
            {label:"LN", value:"LN", type: "Math", desc:"number"},
            {label:"LOG", value:"LOG", type: "Math", desc:"number"},
            {label:"LOWER", value:"LOWER", type: "Text", desc:"text"},
            {label:"LPAD", value:"LPAD", type: "Text", desc:"text, padded_length [, pad_string]"},
            {label:"MAX", value:"MAX", type: "Math", desc:"number,number,..."},
            {label:"MCEILING", value:"MCEILING", type: "Math", desc:"number"},
            {label:"MFLOOR", value:"MFLOOR", type: "Math", desc:"number"},
            {label:"MID", value:"MID", type: "Text", desc:"text, start_num, num_chars"},
            {label:"MILLISECOND", value:"MILLISECOND", type: "DateTime", desc:"expression"},
            {label:"MIN", value:"MIN", type: "Math", desc:"number,number,..."},
            {label:"MINUTE", value:"MINUTE", type: "DateTime", desc:"expression"},
            {label:"MOD", value:"MOD", type: "Math", desc:"number,divisor"},
            {label:"MONTH", value:"MONTH", type: "DateTime", desc:"date"},
            {label:"NOT", value:"NOT", type: "Logical", desc:"logical"},
            {label:"NOW", value:"NOW", type: "DateTime", desc:""},
            {label:"NULLVALUE", value:"NULLVALUE", type: "Logical", desc:"expression, substitute_expression"},
            {label:"OR", value:"OR", type: "Logical", desc:"logical1,logical2,..."},
            {label:"PI", value:"PI", type: "Math", desc:""},
            {label:"PICKLISTCOUNT", value:"PICKLISTCOUNT", type: "Text", desc:"multiselect_picklist_field"},
            {label:"REGEX", value:"REGEX", type: "Advanced", desc:"Text,RegEx_Text"},
            {label:"REVERSE", value:"REVERSE", type: "Text", desc:"text"},
            {label:"RIGHT", value:"RIGHT", type: "Text", desc:"text, num_chars"},
            {label:"ROUND", value:"ROUND", type: "Math", desc:"number,num_digits"},
            {label:"RPAD", value:"RPAD", type: "Text", desc:"text, padded_length [, pad_string]"},
            {label:"SECOND", value:"SECOND", type: "DateTime", desc:"expression"},
            {label:"SIN", value:"SIN", type: "Math", desc:"number"},
            {label:"SQRT", value:"SQRT", type: "Math", desc:"number"},
            {label:"SUBSTITUTE", value:"SUBSTITUTE", type: "Text", desc:"text, old_text, new_text"},
            {label:"TAN", value:"TAN", type: "Math", desc:"number"},
            {label:"TEXT", value:"TEXT", type: "Text", desc:"value"},
            {label:"TIMENOW", value:"TIMENOW", type: "DateTime", desc:""},
            {label:"TIMEVALUE", value:"TIMEVALUE", type: "DateTime", desc:"expression"},
            {label:"TODAY", value:"TODAY", type: "DateTime", desc:""},
            {label:"TRIM", value:"TRIM", type: "Text", desc:"text"},
            {label:"TRUNC", value:"TRUNC", type: "Math", desc:"number,num_digits"},
            {label:"UNIXTIMESTAMP", value:"UNIXTIMESTAMP", type: "DateTime", desc:"date/time"},
            {label:"UPPER", value:"UPPER", type: "Text", desc:"text"},
            {label: "VALUE", value:"VALUE", type: "Text", desc:"text"},
            {label:"WEEKDAY", value:"WEEKDAY", type: "DateTime", desc:"date"},
            {label:"YEAR", value:"YEAR", type: "DateTime", desc:"date"}
        ],
        funList: [],
        funVal: "ABS",
        funcFormat: "",
        funcExplain: "",
        fieldList: [],
        fieldSelector: "", // 字段
        FilterExpresssionList: [],
        fieldId: inject("editFieldId") || ''
    });
    const { isFormulaShow, isOperator, operatorList, funOptions, funList, categoryVal, 
        funVal, funcFormat, funcExplain, fieldList, entityId, fieldSelector, FilterExpresssionList, fieldId } = toRefs(data);

    const handleOpreator = () => {
        data.isOperator = !data.isOperator;
    }

    onMounted(()=>{
        window.addEventListener('click',()=>{
            data.isOperator = false;
        });
    });

    const getFilterQuery = (e) => {
        formState.LookupCriteria = e;
    };

    // 函数
    const changeCategory = (e) => {
        if(data.categoryVal==''){
            data.funList = JSON.parse(JSON.stringify(data.funOptions));
        }else {
            data.funList = data.funOptions.filter(item=>{
                return item.type.indexOf(data.categoryVal) != -1;
            });
        }
    };
    changeCategory('');
    const changeFunctionInfo = (e) => {
        console.log("funVal", data.funVal);
        let row = data.funList.find(item=>item.value==data.funVal);
        let str = data.funVal+'('+row.desc+')';
        console.log("str",str);
        // console.log("functionNameToDescriptionMap", functionNameToDescriptionMap[data.funVal]);
        data.funcFormat = str;
        data.funcExplain = functionNameToDescriptionMap[data.funVal];
    };
    changeFunctionInfo();
    // 插入函数
    const handleInsertFun = (e) => {
        if(e){
            let row = data.funList.find(item=>item.value==data.funVal);
            let str = data.funVal+'('+row.desc+')';
            data.funcFormat = str;
            data.funcExplain = functionNameToDescriptionMap[data.funVal];
        }
        formState.DefaultValue = formState.DefaultValue + ' ' + data.funcFormat + ' ';
    }
    // 插入运算符
    const insertOperator = (item) => {
        formState.DefaultValue = formState.DefaultValue +' '+item.value + ' ';
        data.isOperator = false;
    }
    // 插入合并字段
    const changeInsertField = () => {
        if(formState.DefaultValue==undefined){
            formState.DefaultValue = '';
        }
        formState.DefaultValue = formState.DefaultValue + ' ' + data.fieldSelector + ' ';
    }
    const getFieldList = () => {
        proxy.$get(Interface.objeview.objectmanager, {
            entityId: data.entityId
        }).then(res=>{
            data.fieldList = res.rows;
        })
    };
    getFieldList();
    const FormulaEditor = {};

    const initialState = () => {
        return {
            MasterLabel: "", // 字段标签
            DeveloperName: "", // 字段名
            Description: "", // 描述
            InlineHelpText: "", // 帮助文本
            autoAddFieldToCrt: true, // 自动添加到自定义报表类型
            dtype: props.type
        }
    }
    // const formState = reactive({
    //     MasterLabel: "", // 字段标签
    //     DeveloperName: "", // 字段名
    //     Description: "", // 描述
    //     InlineHelpText: "", // 帮助文本
    //     autoAddFieldToCrt: true, // 自动添加到自定义报表类型
    // });

    const formState = reactive(initialState());

    const handleisShowFormula = () => {
        data.isFormulaShow = !data.isFormulaShow;
    }
    const initRules = () => {
        return {
            MasterLabel: {
                isRequired: false
            },
            DeveloperName: {
                isRequired: false
            }
        }
    }
    // 必填数据
    // const rules = reactive({
    //     MasterLabel: {
    //         isRequired: false
    //     },
    //     DeveloperName: {
    //         isRequired: false
    //     }
    // });
    const rules = reactive(initRules());
    
    const loadTypeFn = () => {
        
        Object.assign(formState, initialState());
        Object.assign(rules, initRules());
        console.log('rules', rules);
        // console.log("initRules()",initRules())
        // console.log("load", props.type);
        // console.log("formState123", formState);
        // ### S：文本 N：数字
        if (props.type == 'S'|| props.type=='N') {
            formState['Length'] = ''; // 长度
            formState['options_0'] = false; // 必需
            formState['IsUnique'] = false; // 独有
            formState['IsCaseSensitive'] = '0'; 
            formState['IsExternalIdentifier'] = false; // 外部 ID
            formState['DefaultValue'] = ''; // 公式编辑器
            if(props.type=='S'){
                rules['Length'] = {
                    isRequired: false
                }
            }
        };
        if(props.type== 'N' ){

        }
        // 文本区 X URL： U
        if(props.type == 'X'||props.type == 'U'){
            formState['options_0'] = false; // 必需
            formState['DefaultValue'] = ''; // 公式编辑器
        };
        // 文本区 长 文本区 RTF z
        if(props.type == 'J'||props.type == 'z'){
            formState['Length'] = '32,768'; // 长度
            formState['Precision'] = ''; // 可见行数
            formState['DefaultValue'] = ''; // 公式编辑器
            
            rules['Precision'] = {
                isRequired: false
            }
        }
        // 时间
        if(props.type == 'D' || props.type == 'F' || props.type == 'f' || props.type=='DT_M' || props.type=='TP' || props.type=='Year' || props.type=='Month' || props.type=='Y_M') {
            formState['options_0'] = false; // 必需
            formState['DefaultValue'] = ''; // 公式编辑器
        }
        // 邮件
        if(props.type == 'E'){
            formState['options_0'] = false; // 必需
            formState['IsUnique'] = false; // 独有
            formState['IsExternalIdentifier'] = false; // 外部 ID
            formState.autoAddFieldToCrt = false;
            formState['DefaultValue'] = ''; // 公式编辑器
        }
        // 电话 上传图片 颜色选择器 部门-查找关系
        if(props.type == 'H' || props.type == 'I' || props.type == 'ColorPicker' || props.type == 'O'){
            formState['options_0'] = false; // 必需
            formState['DefaultValue'] = ''; // 公式编辑器
        }
        // 百分比
        if(props.type == 'P'||props.type == 'C'||props.type == 'N'){
            formState['digleft'] = 18; // 长度
            formState['Scale'] = 0; // 小数位数
            formState['options_0'] = false; // 必需
            formState['DefaultValue'] = ''; // 公式编辑器
            rules['digleft'] = {
                isRequired: false
            }
            rules['Scale'] = {
                isRequired: false
            }
        }
        // 选项列表
        if(props.type == 'L' || props.type == 'Q' || props.type=='DT' || props.type=='RBL'){
            formState['options_0'] = false; // 必需
            formState['DefaultValue'] = ''; // 公式编辑器
            formState['picklistTypeLOCAL_PICKLIST'] = 'GLOBAL_PICKLIST'; // 值
            formState['PicklistEnumOrId'] = "";
            formState['ptext'] = '';
            formState['pickopts_0'] = false;
            formState['defPl'] = false;
            formState['pickopts_1'] = true;
        }
        // 选项列表（多项选择 左右选）
        if(props.type == 'Q'){
            formState['Precision'] = ''; // 可见行数
            rules['Precision'] = {
                isRequired: false
            }
        }

        // 查找关系
        if(props.type == 'Y' || props.type == 'x'){
            formState['AggregateRelationshipName'] = '';
            formState['options_0'] = false; // 必需
            formState['fkConstraint'] = 'N';
            rules['AggregateRelationshipName'] = {
                isRequired: false
            }

            formState['IsOptional'] = '0';
            formState['InfoMessage'] = '';
            formState['Active'] = true;
            formState['LookupCriteria'] = '';
        }
        // 自动编号
        if(props.type == 'V'){
            formState['AutoNumberMask'] = '';
            formState['startNum'] = '';
            formState['populate'] = '';
            rules['startNum'] = {
                isRequired: false
            }
        }

        // 复选框
        if(props.type == 'B'){
            formState['DefaultValue'] = '';
        }

        if(props.type == '6') {
            formState['Length'] = ''; // 长度
            formState['MaskType'] = ''; // 掩码类型
            formState['MaskChar'] = ''; // 掩码字符
            formState['options_0'] = ''; // 必需
            rules['Length'] = {
                isRequired: false
            }
            rules['MaskType'] = {
                isRequired: false
            }
            rules['MaskChar'] = {
                isRequired: false
            }
        }
        // 地理位置：g
        if(props.type == 'g'){
            formState['options_19'] = ''; // 纬度与经度显示表示法	
            formState['Scale'] = ''; // 小数位数
            formState['options_0'] = ''; // 必需
            rules['Scale'] = {
                isRequired: false
            };
            delete formState.autoAddFieldToCrt;
        }

        // 主子表详细
        if(props.type == 'Y_MD'){
            formState['AggregateRelationshipName'] = '';
            formState['OptionsFlag_13'] = 0;
            formState['options_20'] = false;
            rules['AggregateRelationshipName'] = {
                isRequired: false
            };
        }

        // 意见相关   || type == 'UCP' || type == 'US' || type == 'CA'
        if(props.type == 'UC'|| props.type == 'UCS' || props.type == 'UCP' || props.type == 'US' || props.type == 'CA') {
            formState['Length'] = ''; // 长度
            formState['options_0'] = false; // 必需
            formState['IsUnique'] = false;
            formState['DefaultValue'] = ''; // 公式编辑器
            rules['Length'] = {
                isRequired: false
            }
        }
        // 查找用户/部门
        if(props.type=='U' || props.type == 'O' || props.type == 'M_U' || props.type == 'M_O'){
            formState['AggregateRelationshipName'] = '';
            formState['options_0'] = false; // 必需
            rules['AggregateRelationshipName'] = {
                isRequired: false
            };
        }
        console.log("store-recordForm", store.state.recordForm);
        let len = Object.keys(store.state.recordForm).length;
        console.log("len", len);
        for(let key in store.state.recordForm){
            formState[key] = store.state.recordForm[key];
        }
        setFieldValue();
    }



    const setFieldValue = () => {
        if(data.fieldId){
            console.log("第二步骤详情", props.fieldDetail);
            let fieldDetail = props.fieldDetail;
            for(let key in formState){
                if(key!='dtype'){
                    formState[key] = fieldDetail[key];
                }
            }
        }
    }

    const handleNext = () => {
        console.log("rules", rules);
        let num = 3;
        if(props.type==1){
            num = 2.5;
        }
        if (validateField()) {
            // console.log("formState", toRaw(formState));
            let objForm = JSON.parse(JSON.stringify(toRaw(formState)));
            for(let key in objForm){
                // if(typeof objForm[key] == 'boolean'){
                //     objForm[key] = objForm[key] ? 1 : 0;
                // }
                if(props.type == 'Y' || props.type == 'x' || props.type == 'Y_MD'){
                    store.commit('setRecordFormField', {field:key,  value: objForm[key]});
                }
            }
            if(props.type != 'Y' && props.type != 'x' && props.type != 'Y_MD'){
                store.commit('setRecordForm', objForm);
            };
            console.log("store222", store.state.recordForm)

            emit("next", num);
        }
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
    const handlePrev = () => {
        if(props.type=='Y'||props.type=='x'||props.type=='Y_MD'||props.type=='Z'){
            emit("next", 1);
        }else {
            emit("next", 0);
        }
    };
    const handleCancel = () => {
        emit("cancel", false);
    };
    defineExpose({loadTypeFn});
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    .NewField {
        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            .title {
                font-size: 20px;
                font-weight: normal;
                padding: 15px 12px 0;
            }

            a {
                padding-right: 5px;
            }

            img {
                vertical-align: top;
            }
        }

        .panelStepBox {
            .panelStepTitle {
                background-color: #8e9dbe;
                border-color: #8e9dbe;
                padding: 8px 12px;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                font-weight: bold;
            }

            .panelStepBoxBd {
                background: #f8f8f8 none;
                border: 1px solid #eaeaea;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;

                .panleStep {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 10px;
                    border-bottom: 1px solid #dbdbdb;
                }

                .panelDesc {
                    padding: 10px;
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #dbdbdb;
                }

                .radioGroup {
                    /* border-bottom: 1px solid #dbdbdb; */
                    /* padding: 10px 20px; */

                    .radioRow {
                        display: flex;
                        align-items: self-start;

                        .radioDesc {
                            flex: 1;
                            line-height: 30px;
                        }
                    }
                }

                .panelContent {
                    padding-top: 20px;
                    /* padding-right: 100px; */
                    border-bottom: 1px solid #dbdbdb;
                    padding-bottom: 16px;

                    .fieldInp {
                        width: 200px !important;
                    }

                    .fieldText {
                        width: 50% !important;
                    }
                }
            }
        }
    }

    .strong {
        color: blue;
    }
    .detailList{
        .funcExplain{
            .funcExplainDiv{
                a{
                    color: #000 !important;
                    text-decoration: underline !important;
                    &:hover{
                        color: #015ba7;
                    }
                }
            }
        }
    }
</style>