<template>
    <div class="bPageBlock bEditBlock editPage">
        <div class="pbHeader">
            <table>
                <tbody>
                    <tr>
                        <td class="pbTitle">
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">
                            <h2 class="mainTitle">字段定义编辑</h2></td>
                        <td class="pbButton" id="topButtonRow">
                            <input value=" 保存 " class="inpBtn" name="save" title="保存" type="button" @click="handleSave"> 
                            <input value=" 取消 " class="inpBtn ml5" name="cancel" title="取消" type="button" @click="handleCancel">
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
                            <td class="labelCol">字段标签</td>
                            <td class="dataCol col02">{{detail.MasterLabel}}</td>
                            <td class="last labelCol">数据类型</td>
                            <td class="last dataCol">{{detail.dataTypeName}}</td>
                        </tr>
                        <tr>
                            <td class="labelCol">字段名</td>
                            <td class="dataCol col02">{{detail.DeveloperName}}</td>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last empty">&nbsp;</td>
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
                                    <option value="">--无--</option><option value="Active">Active</option>
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
                                <select id="securityClassification" name="securityClassification"  v-model="formState.securityClassification"><option value="">--无--</option><option value="Public">Public</option>
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
                        <tr>
                            <td class="labelCol">
                                <label for="fa_description">描述</label>
                            </td>
                            <td class="data2Col" colspan="3">
                                <textarea id="fa_description" maxlength="1000" name="fa_description" v-model="formState.Description" type="text" wrap="soft"></textarea>
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
                    </tbody>
                </table>
            </div>
            <div class="pbSubheader">
                <h3>查找 选项<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="last labelCol">相关项</td>
                            <td class="dataCol last col02">
                                <a href="javascript:;">{{detail.dataTypeName}}({{detail.MasterLabel}})</a>
                            </td>
                            <td class="labelCol last requiredInput"><label for="AggregateRelationshipName"><span class="assistiveText">*</span>子级关系名称</label></td>
                            <td class="last dataCol">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <input id="AggregateRelationshipName" maxlength="40" name="AggregateRelationshipName" size="20" tabindex="14" type="text" v-model="formState.AggregateRelationshipName">
                                    <div class="errorMsg" v-if="rules.AggregateRelationshipName.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol requiredInput"><label for="RelationshipLabel"><span class="assistiveText">*</span>相关列表标签</label></td>
                            <td class="data2Col">
                                <div class="requiredInput">
                                    <div class="requiredBlock"></div>
                                    <input id="RelationshipLabel" maxlength="80" name="RelationshipLabel" size="20" tabindex="15" type="text" v-model="formState.RelationshipLabel">
                                    <div class="errorMsg" v-if="rules.RelationshipLabel.isRequired"><strong>错误:</strong> 必须输入一个值</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol">必需</td>
                            <td class="data2Col" colspan="3"><input id="options_0" name="options_0"  tabindex="17" type="checkbox" v-model="formState.options_0">此字段中总是需要一个值来保存记录</td>
                        </tr>
                        <tr>
                            <td class="last labelCol">如果查找记录被删除怎么办？</td>
                            <td class="last data2Col" colspan="3">
                                <div><input checked="checked" id="fkConstraintN" name="fkConstraint" type="radio" value="N" v-model="fkConstraint"><label for="fkConstraintN">清除此字段的值。&nbsp;如果您将此字段设为必填，您不能选择此选项。</label></div>
                                <br>
                                <div><input id="fkConstraintR" name="fkConstraint" type="radio" value="R" v-model="fkConstraint"><label for="fkConstraintR">不允许删除＂作为查找关系的一部分的查找记录＂。</label></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="pbSubheader">
                <h3>查找筛选器<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList"></table>
            </div> -->
            <div class="pbSubheader">
                <h3>查找筛选器<span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList">
                    <tbody>
                        <tr class="detailRow"><td colspan="4"><div class="instructionsText">也可以创建一个筛选器以限制用户在查找字段中可用的记录。&nbsp;&nbsp;<a href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=fields_lookup_filters.htm%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);" tabindex="22" title="了解详细信息！ （新窗口）">了解详细信息！</a></div></td></tr>
                        <tr class="last detailRow">
                            <td colspan="4">
                                <div class="twistSection">
                                    <img :src="require('@/assets/img/s.gif')" @click="handleShowFilter" alt="显示筛选设置" :class="isFilter ? 'showTriangle' : 'hideTriangle'" id="lookupFilterSection_twisty"  style="cursor:pointer;" title="显示筛选设置">
                                    <a href="javascript:;" id="lookupFilterSection_link" tabindex="23" @click="handleShowFilter">{{isFilter?'隐藏':'显示'}}筛选设置</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbSubsection" v-if="isFilter">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="last labelCol">过滤条件</td>
                            <td class="last data2Col" colspan="3">
                                <div class="FARadioChoices FASectionBody">
                                    <FilterQuery :entityId="entityId" :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pbSubsection showDisabled" v-if="isFilter">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="labelCol"><label for="IsOptional">筛选器类型</label></td>
                            <td class="data2Col" colspan="3">
                                <ul class="radioGroup" id="IsOptional" name="IsOptional">
                                    <li>
                                        <input checked="checked" id="IsOptional0" name="IsOptional" tabindex="118" type="radio" value="0" v-model="formState.IsOptional">
                                        <label for="IsOptional0"><strong>必填。 </strong>用户输入值必须同筛选条件匹配。</label>
                                        <div class="FAErrorMsg" id="errorMsg" style="display: none;"><div class="FAErrorMsgInner">如果不行，将在保存后显示该错误消息：<br><div class="requiredInput"><div class="requiredBlock"></div><textarea cols="60" id="ErrorMessage" maxlength="255" name="ErrorMessage" rows="2" tabindex="120" type="text" wrap="soft" disabled="">值不存在或与筛选条件不匹配。</textarea></div><a href="javascript:%20void%280%29%3B" id="rstErrMsgLnk" tabindex="121" style="display: none;">重新设置为默认消息</a><span id="rstErrMsg" style="">重新设置为默认消息</span></div><input type="hidden" id="isDefaultMsg" name="isDefaultMsg" value="1"></div>
                                    </li>
                                    <li><input id="IsOptional1" name="IsOptional" tabindex="119" type="radio" value="1"  v-model="formState.IsOptional"><label for="IsOptional1"><strong>可选。 </strong>用户可以删除筛选器或输入同条件不匹配的值。</label></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="labelCol">查找窗口文本</td>
                            <td class="data2Col" colspan="3">
                                <div class="infoMessageDiv">
                                    将该通知消息添加到查找窗口中。
                                    <div class="FAErrorMessage">
                                        <textarea cols="60" id="InfoMessage" maxlength="255" name="InfoMessage" rows="2" tabindex="122" type="text" wrap="soft" v-model="formState.InfoMessage"></textarea>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="last labelCol">启用</td>
                            <td class="last data2Col" colspan="3">
                                <input checked="checked" id="Active" name="Active" tabindex="125" type="checkbox" v-model="formState.Active">
                                <label for="Active">启用该筛选器。</label>
                            </td>
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
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">&nbsp;
                        </td>
                        <td class="pbButtonb" id="bottomButtonRow">
                            <input value=" 保存 " class="inpBtn" name="save" title="保存" type="button" @click="handleSave"> 
                            <input value=" 取消 " class="inpBtn ml5" name="cancel" title="取消" type="button" @click="handleCancel"></td>
                    </tr>
                </tbody>
            </table>
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
    import FilterQuery from "@/components/FilterQuery.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','save']);
    const props = defineProps({
        detail: Object
    });

    const data = reactive({
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
        fkConstraint: "N",
        entityId: '',
        isFilter: true
    });
    const { complianceGroups, complianceGroup_unselected, complianceGroupSelecteds,
         complianceGroup_selected, fkConstraint, entityId, isFilter } = toRefs(data);
    const formState = reactive({
        businessOwner: "",
        businessStatus: "",
        securityClassification: "",
        complianceGroup_selected: [],
        Description: "",
        InlineHelpText: "",
        AggregateRelationshipName: "",
        RelationshipLabel: "",
        options_0: false,
        fkConstraint: "N",
        LookupCriteria: '',
        IsOptional: 0,
        InfoMessage: "",
        Active: true
    });
    const rules = reactive({
        AggregateRelationshipName: {
            required: false
        },
        RelationshipLabel: {
            required: false
        }
    });

    const getFilterQuery = (e) => {
        formState.LookupCriteria = e;
    };
    const handleShowFilter = () => {
        data.isFilter = !data.isFilter;
    }

    watch(()=>data.fkConstraint, (newVal, oldVal) => {
        formState.fkConstraint = newVal;
    })
    const handleBack = () => {
        emit("back", false);
    };
    const handleCancel = () => {
        emit("cancel", false);
    }
    onMounted(()=>{
        console.log("editDetail", props.detail);
        // formState.fa_description = props.detail.Description;
        // formState.InlineHelpText = props.detail.InlineHelpText;
        for(let key in formState){
            formState[key] = props.detail[key];
        }
    });
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
</style>