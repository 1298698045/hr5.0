<template>
    <div class="bPageBlock bEditBlock ">
        <div class="pbHeader">
            <table>
                <tbody>
                    <tr>
                        <td class="pbTitle">
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">
                            <h2 class="mainTitle">自定义字段定义编辑</h2></td>
                        <td class="pbButton" id="topButtonRow">
                            <input value=" 更改字段类型 " class="inpBtn" name="save" title="更改字段类型" type="button" @click="changeFieldType"> 
                            <input value="升级为全局值集" class="inpBtn ml5" name="goPrevious" disabled="disabled" title="要提升字段以使用全局值集，字段必须是受限的选项列表字段，且不得超过 1,000 个值" type="button">
                            <input value=" 保存 " class="inpBtn ml5" name="save" title="保存" type="button" @click="handleSave"> 
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
                            <td class="last labelCol">数据类型</td>
                            <td class="last dataCol">{{detail.dataTypeName}}</td>
                        </tr>
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
            <div class="pbSubheader brandTertiaryBgr tertiaryPalette">
                <h3>一般选项
                    <span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="labelCol">必需</td>
                            <td class="data2Col" colspan="3"><input id="options_0" name="options_0"  tabindex="15" type="checkbox" v-model="formState.options_0">此字段中总是需要一个值来保存记录</td>
                        </tr>
                        <FormulaEditor
                        :value="formState.DefaultValue"
                        @change="changeDefaultValue"
                        />
                    </tbody>
                </table>
            </div>
            <div class="pbSubheader brandTertiaryBgr tertiaryPalette">
                <h3>选项列表 选项
                    <span class="titleSeparatingColon">:</span></h3>
            </div>
            <div class="pbSubsection">
                <table class="detailList">
                    <tbody>
                        <tr>
                            <td class="labelCol last empty">&nbsp;</td>
                            <td class="dataCol last col02">
                                <input checked="checked" id="pickopts_1" name="pickopts_1" onclick="alert('未限制的选项列表表示用户可以将外部值添加包含选项列表字段的记录。要将值仅限制为选项列表中的定义，请保留此设置。');this.onclick = '';" tabindex="22" type="checkbox" v-model="formState.pickopts_1">
                                <label for="pickopts_1">限制在值集中定义的值选项列表</label>
                                &nbsp;
                                <div class="mouseOverInfoOuter textareaInfo">
                                    <img :src="require('@/assets/img/s.gif')" alt="" class="infoIcon" title="">
                                    <div class="mouseOverInfo">需要总数小于 1,000 个的有效和无效值。</div>
                                </div>
                            </td>
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
                            <img :src="require('@/assets/img/s.gif')" alt="" width="1" height="1" class="minWidth" title="">&nbsp;
                        </td>
                        <td class="pbButtonb" id="bottomButtonRow">
                            <input value=" 更改字段类型 " class="inpBtn" name="save" title="更改字段类型" type="button" @click="changeFieldType"> 
                            <input value=" 保存 " class="inpBtn" name="save" title="保存" type="button" @click="handleSave"> 
                            <input value=" 取消 " class="inpBtn ml5" name="cancel" title="取消" type="button" @click="handleCancel">
                        </td>
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
    import FormulaEditor from "@/components/entityDetail/FormulaEditor.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel','save','fieldType']);
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
    });

    const { complianceGroups, complianceGroup_unselected, complianceGroupSelecteds, complianceGroup_selected } = toRefs(data);
    const formState = reactive({
        MasterLabel: "",
        DeveloperName: "",
        Description: "",
        InlineHelpText: "",
        businessOwner: "",
        businessStatus: "",
        // complianceGroup_selected: [],
        options_0: false,
        DefaultValue: "",
        complianceGroup: [],
        pickopts_1: true
    });
    const rules = reactive({
        MasterLabel: {
            required: false
        },
        DeveloperName: {
            required: false
        },
    });
    const changeDefaultValue = (value) => {
        formState.DefaultValue = value;
    };

    const handleBack = () => {
        emit("back", false);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };

    onMounted(()=>{
        console.log(props.detail)
        // let { label, entityLabel, developerName, Description, InlineHelpText, options_0,
        //     AggregateRelationshipName, RelationshipLabel, fkConstraint 
        //  } = props.detail;
        // formState.MasterLabel = label;
        // formState.DeveloperName = developerName;
        // formState.Description = Description;
        // formState.InlineHelpText = InlineHelpText;
        // formState.options_0 = options_0 == 1 ? true : false;
        // formState.AggregateRelationshipName = AggregateRelationshipName;
        // formState.fkConstraint = fkConstraint;
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
            if (formState[key] == "" || formState[key] == undefined) {
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
    };

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

    // 更改字段类型
    const changeFieldType = () => {
        emit('fieldType', true);
    }
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");
</style>