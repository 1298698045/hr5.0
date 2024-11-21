<template>
  <tr>
    <td class="last labelCol"><label for="DefaultValue">默认值</label></td>
    <td class="last data2Col">
      <div class="showHideLink">
        <a
          href="javascript:;"
          id="DefaultValue_toggle"
          @click="handleisShowFormula"
        >
          {{ isFormulaShow ? "隐藏公式编辑器" : "显示公式编辑器" }}
        </a>
      </div>
      <div class="miniTabOn">
        <table width="500px">
          <tbody>
            <tr>
              <td valign="top">
                <table v-if="isFormulaShow">
                  <tbody>
                    <tr id="DefaultValue_selector">
                      <td id="insertFieldCell" align="left" valign="top">
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
                                  title="选择字段类别"
                                >
                                  <option value="" selected="selected">
                                    -- 选择字段类型 --
                                  </option>
                                  <option value="$Label">$Label</option>
                                  <option value="$Organization">
                                    $Organization
                                  </option>
                                  <option value="$Profile">$Profile</option>
                                  <option value="$Setup.Milestone1_Settings__c">
                                    $Setup.Milestone1_Settings__c
                                  </option>
                                  <option
                                    value="$Setup.slackv2__Slack_Settings__c"
                                  >
                                    $Setup.slackv2__Slack_Settings__c
                                  </option>
                                  <option value="$System">$System</option>
                                  <option value="$User">$User</option>
                                  <option value="$UserRole">$UserRole</option>
                                </select>
                              </td>
                              <td>
                                <select
                                  v-model="fieldSelector"
                                  class="fieldSelector"
                                  id="fieldSelector"
                                  name="fieldSelector"
                                  @change="changeInsertField"
                                  title="插入合并字段"
                                >
                                  <option value="">--插入合并字段 --</option>
                                  <option
                                    :value="item.developerName"
                                    v-for="(item, index) in fieldList"
                                    :key="index"
                                  >
                                    {{ item.label }}
                                  </option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td id="insertOperatorCell" width="400">
                        <div class="menuButton" id="insertOperator">
                          <div
                            class="menuButtonButton"
                            @click.stop="handleOpreator"
                            id="insertOperatorButton"
                          >
                            <span
                              class="menuButtonLabel"
                              id="insertOperatorLabel"
                              tabindex="0"
                              >插入运算符</span
                            >
                          </div>
                          <div
                            class="menuButtonMenu"
                            @click.stop
                            v-if="isOperator"
                            id="insertOperatorMenu"
                          >
                            <a
                              href="javascript:;"
                              v-for="(item, index) in operatorList"
                              :key="index"
                              class="menuButtonMenuLink firstMenuItem"
                              @click="insertOperator(item)"
                              >{{ item.name }}</a
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <textarea
                    class="FormulaText"
                    v-model="formState.DefaultValue"
                    aria-label="Insert Formula"
                    cols="80"
                    id="DefaultValue"
                    maxlength="4000"
                    name="DefaultValue"
                    rows="20"
                    style="width: 500px; height: 100px"
                    :style="{ height: !isFormulaShow ? '24px' : '100px' }"
                    type="text"
                    wrap="soft"
                  ></textarea>
                  <div>
                    <div
                      id="DefaultValue_validate"
                      style=""
                      v-if="isFormulaShow"
                    >
                      <input
                        value=" 检查语法 "
                        class="inpBtn"
                        name="goRefresh"
                        title="检查语法"
                        type="submit"
                      />
                    </div>
                    <span class="formulaType"
                      >使用
                      <a
                        href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?target=elements_of_a_formula.htm&amp;loc=help%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                        title="公式语法： （新窗口）"
                        >公式语法：</a
                      >
                      使用双引号，包括文本和选项列表值 API 名称 :
                      <span class="formulaExample">("the_text")</span>,
                      包含数字，没有引号 :
                      <span class="formulaExample">(25)</span>,
                      将百分比显示为小数:
                      <span class="formulaExample">(0.10)</span>,
                      以标准格式表示日期计算:
                      <span class="formulaExample">(Today() + 7)</span>,
                      从自定义元数据类型记录使用引用字段:
                      <span class="formulaExample"
                        >$CustomMetadata.Type__mdt.RecordAPIName.Field__c</span
                      ></span
                    >
                  </div>
                </div>
              </td>
              <td valign="top" id="DefaultValue_functions" v-if="isFormulaShow">
                <table class="miniTabOn" id="advFunctions" style="width: 200px">
                  <tbody>
                    <tr>
                      <td><span class="bodySmall">函数</span></td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          id="functionCategorySelector"
                          name="functionCategorySelector"
                          v-model="categoryVal"
                          @change="changeCategory"
                          title="-- 所有函数类别 --"
                        >
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
                        <select
                          id="functionSelector"
                          v-model="funVal"
                          name="functionSelector"
                          @change="changeFunctionInfo"
                          @dblclick="handleInsertFun"
                          size="6"
                          title="函数"
                        >
                          <option
                            :value="item.value"
                            v-for="(item, index) in funList"
                          >
                            {{ item.label }}
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          value="插入所选函数"
                          class="inpBtn"
                          @click="handleInsertFun"
                          name="addToFormula"
                          title="插入所选函数"
                          type="button"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="funcFormat" id="funcFormat">
                        &nbsp; {{ funcFormat }}
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
</template>
<script setup>
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
  toRaw,
} from "vue";
import functionNameToDescriptionMap from "@/utils/formulaEditor.js";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();

const props = defineProps({
  value: String,
});
const emit = defineEmits(["emit"]);

const formState = reactive({
  DefaultValue: "",
});

if (props.value) {
  formState.DefaultValue = "";
}

watch(
  () => formState.DefaultValue,
  (newVal, oldVal) => {
    emit("change", newVal);
  },
  { immediate: false }
);

const data = reactive({
  isFormulaShow: false,
  isOperator: false,
  categoryVal: "",
  operatorList: [
    {
      value: "+",
      name: "+ 加",
    },
    {
      value: "-",
      name: "- 减",
    },
    {
      value: "*",
      name: "* 乘",
    },
    {
      value: "/",
      name: "/ 除",
    },
    {
      value: "^",
      name: "^ 乘方",
    },
    {
      value: "(",
      name: "( 左括号",
    },
    {
      value: ")",
      name: ") 右括号",
    },
    {
      value: "&amp;",
      name: "& 串联",
    },
    {
      value: "=",
      name: "= 等于",
    },
    {
      value: "&lt;&gt;",
      name: "<> 不等于",
    },
    {
      value: "&lt;",
      name: "< 小于",
    },
    {
      value: "&gt;",
      name: "> 大于",
    },
    {
      value: "&lt;=",
      name: "<= 小于或等于",
    },
    {
      value: "&gt;=",
      name: ">= 大于或等于",
    },
    {
      value: "&amp;&amp;",
      name: "&& 与",
    },
    {
      value: "||",
      name: "|| 或",
    },
  ],
  funOptions: [
    { label: "ABS", value: "ABS", type: "Math", desc: "number" },
    { label: "ACOS", value: "ACOS", type: "Math", desc: "number" },
    {
      label: "ADDMONTHS",
      value: "ADDMONTHS",
      type: "DateTime",
      desc: "date,num",
    },
    {
      label: "AND",
      value: "AND",
      type: "Logical",
      desc: "logical1,logical2,...",
    },
    { label: "ASCII", value: "ASCII", type: "Text", desc: "text" },
    { label: "ASIN", value: "ASIN", type: "Math", desc: "number" },
    { label: "ATAN", value: "ATAN", type: "Math", desc: "number" },
    { label: "ATAN2", value: "ATAN2", type: "Math", desc: "y, x" },
    {
      label: "BEGINS",
      value: "BEGINS",
      type: "Text",
      desc: "text, compare_text",
    },
    {
      label: "BLANKVALUE",
      value: "BLANKVALUE",
      type: "Logical",
      desc: "expression, substitute_expression",
    },
    { label: "BR", value: "BR", type: "Text", desc: "" },
    {
      label: "CASE",
      value: "CASE",
      type: "Logical",
      desc: "expression, value1, result1, value2, result2,...,else_result",
    },
    { label: "CASESAFEID", value: "CASESAFEID", type: "Text", desc: "id" },
    { label: "CEILING", value: "CEILING", type: "Math", desc: "number" },
    { label: "CHR", value: "CHR", type: "Text", desc: "number" },
    {
      label: "CONTAINS",
      value: "CONTAINS",
      type: "Text",
      desc: "text, compare_text",
    },
    { label: "COS", value: "COS", type: "Math", desc: "number" },
    {
      label: "CURRENCYRATE",
      value: "CURRENCYRATE",
      type: "Advanced",
      desc: "IsoCode",
    },
    { label: "DATE", value: "DATE", type: "DateTime", desc: "year,month,day" },
    {
      label: "DATETIMEVALUE",
      value: "DATETIMEVALUE",
      type: "DateTime",
      desc: "expression",
    },
    {
      label: "DATEVALUE",
      value: "DATEVALUE",
      type: "DateTime",
      desc: "expression",
    },
    { label: "DAY", value: "DAY", type: "DateTime", desc: "date" },
    { label: "DAYOFYEAR", value: "DAYOFYEAR", type: "DateTime", desc: "date" },
    {
      label: "DISTANCE",
      value: "DISTANCE",
      type: "Math",
      desc: "location, location, unit",
    },
    { label: "EXP", value: "EXP", type: "Math", desc: "number" },
    {
      label: "FIND",
      value: "FIND",
      type: "Text",
      desc: "search_text, text [, start_num]",
    },
    { label: "FLOOR", value: "FLOOR", type: "Math", desc: "number" },
    {
      label: "FORMATDURATION",
      value: "FORMATDURATION",
      type: "DateTime",
      desc: "numSeconds[, includeDays] | dateTime/time, dateTime/time",
    },
    {
      label: "FROMUNIXTIME",
      value: "FROMUNIXTIME",
      type: "DateTime",
      desc: "number",
    },
    {
      label: "GEOLOCATION",
      value: "GEOLOCATION",
      type: "Math",
      desc: "number",
    },
    { label: "GETSESSIONID", value: "GETSESSIONID", type: "Text", desc: "" },
    { label: "HOUR", value: "HOUR", type: "DateTime", desc: "expression" },
    {
      label: "IF",
      value: "IF",
      type: "Logical",
      desc: "logical_test, value_if_true, value_if_false",
    },
    { label: "INCLUDES", value: "INCLUDES", type: "Text", desc: "text" },
    { label: "INITCAP", value: "INITCAP", type: "Text", desc: "text" },
    { label: "ISBLANK", value: "ISBLANK", type: "Logical", desc: "expression" },
    { label: "ISNULL", value: "ISNULL", type: "Logical", desc: "expression" },
    { label: "ISNUMBER", value: "ISNUMBER", type: "Logical", desc: "Text" },
    { label: "ISOWEEK", value: "ISOWEEK", type: "DateTime", desc: "date" },
    { label: "ISOYEAR", value: "ISOYEAR", type: "DateTime", desc: "date" },
    {
      label: "ISPICKVAL",
      value: "ISPICKVAL",
      type: "Text",
      desc: "picklist_field, text_literal",
    },
    { label: "LEFT", value: "LEFT", type: "Text", desc: "text, num_chars" },
    { label: "LEN", value: "LEN", type: "Text", desc: "text" },
    { label: "LN", value: "LN", type: "Math", desc: "number" },
    { label: "LOG", value: "LOG", type: "Math", desc: "number" },
    { label: "LOWER", value: "LOWER", type: "Text", desc: "text" },
    {
      label: "LPAD",
      value: "LPAD",
      type: "Text",
      desc: "text, padded_length [, pad_string]",
    },
    { label: "MAX", value: "MAX", type: "Math", desc: "number,number,..." },
    { label: "MCEILING", value: "MCEILING", type: "Math", desc: "number" },
    { label: "MFLOOR", value: "MFLOOR", type: "Math", desc: "number" },
    {
      label: "MID",
      value: "MID",
      type: "Text",
      desc: "text, start_num, num_chars",
    },
    {
      label: "MILLISECOND",
      value: "MILLISECOND",
      type: "DateTime",
      desc: "expression",
    },
    { label: "MIN", value: "MIN", type: "Math", desc: "number,number,..." },
    { label: "MINUTE", value: "MINUTE", type: "DateTime", desc: "expression" },
    { label: "MOD", value: "MOD", type: "Math", desc: "number,divisor" },
    { label: "MONTH", value: "MONTH", type: "DateTime", desc: "date" },
    { label: "NOT", value: "NOT", type: "Logical", desc: "logical" },
    { label: "NOW", value: "NOW", type: "DateTime", desc: "" },
    {
      label: "NULLVALUE",
      value: "NULLVALUE",
      type: "Logical",
      desc: "expression, substitute_expression",
    },
    {
      label: "OR",
      value: "OR",
      type: "Logical",
      desc: "logical1,logical2,...",
    },
    { label: "PI", value: "PI", type: "Math", desc: "" },
    {
      label: "PICKLISTCOUNT",
      value: "PICKLISTCOUNT",
      type: "Text",
      desc: "multiselect_picklist_field",
    },
    {
      label: "REGEX",
      value: "REGEX",
      type: "Advanced",
      desc: "Text,RegEx_Text",
    },
    { label: "REVERSE", value: "REVERSE", type: "Text", desc: "text" },
    { label: "RIGHT", value: "RIGHT", type: "Text", desc: "text, num_chars" },
    { label: "ROUND", value: "ROUND", type: "Math", desc: "number,num_digits" },
    {
      label: "RPAD",
      value: "RPAD",
      type: "Text",
      desc: "text, padded_length [, pad_string]",
    },
    { label: "SECOND", value: "SECOND", type: "DateTime", desc: "expression" },
    { label: "SIN", value: "SIN", type: "Math", desc: "number" },
    { label: "SQRT", value: "SQRT", type: "Math", desc: "number" },
    {
      label: "SUBSTITUTE",
      value: "SUBSTITUTE",
      type: "Text",
      desc: "text, old_text, new_text",
    },
    { label: "TAN", value: "TAN", type: "Math", desc: "number" },
    { label: "TEXT", value: "TEXT", type: "Text", desc: "value" },
    { label: "TIMENOW", value: "TIMENOW", type: "DateTime", desc: "" },
    {
      label: "TIMEVALUE",
      value: "TIMEVALUE",
      type: "DateTime",
      desc: "expression",
    },
    { label: "TODAY", value: "TODAY", type: "DateTime", desc: "" },
    { label: "TRIM", value: "TRIM", type: "Text", desc: "text" },
    { label: "TRUNC", value: "TRUNC", type: "Math", desc: "number,num_digits" },
    {
      label: "UNIXTIMESTAMP",
      value: "UNIXTIMESTAMP",
      type: "DateTime",
      desc: "date/time",
    },
    { label: "UPPER", value: "UPPER", type: "Text", desc: "text" },
    { label: "VALUE", value: "VALUE", type: "Text", desc: "text" },
    { label: "WEEKDAY", value: "WEEKDAY", type: "DateTime", desc: "date" },
    { label: "YEAR", value: "YEAR", type: "DateTime", desc: "date" },
  ],
  funList: [],
  funVal: "ABS",
  funcFormat: "",
  funcExplain: "",
  fieldList: [],
  fieldSelector: "", // 字段
});

const {
  isFormulaShow,
  isOperator,
  operatorList,
  funOptions,
  funList,
  categoryVal,
  funVal,
  funcFormat,
  funcExplain,
  fieldList,
  fieldSelector,
} = toRefs(data);

const handleOpreator = () => {
  data.isOperator = !data.isOperator;
};

// 函数
const changeCategory = (e) => {
  if (data.categoryVal == "") {
    data.funList = JSON.parse(JSON.stringify(data.funOptions));
  } else {
    data.funList = data.funOptions.filter((item) => {
      return item.type.indexOf(data.categoryVal) != -1;
    });
  }
};
changeCategory("");
const changeFunctionInfo = (e) => {
  console.log("funVal", data.funVal);
  let row = data.funList.find((item) => item.value == data.funVal);
  let str = data.funVal + "(" + row.desc + ")";
  console.log("str", str);
  // console.log("functionNameToDescriptionMap", functionNameToDescriptionMap[data.funVal]);
  data.funcFormat = str;
  data.funcExplain = functionNameToDescriptionMap[data.funVal];
};
changeFunctionInfo();
// 插入函数
const handleInsertFun = (e) => {
  if (e) {
    let row = data.funList.find((item) => item.value == data.funVal);
    let str = data.funVal + "(" + row.desc + ")";
    data.funcFormat = str;
    data.funcExplain = functionNameToDescriptionMap[data.funVal];
  }
  formState.DefaultValue = formState.DefaultValue + " " + data.funcFormat + " ";
};
// 插入运算符
const insertOperator = (item) => {
  formState.DefaultValue = formState.DefaultValue + " " + item.value + " ";
  data.isOperator = false;
};
// 插入合并字段
const changeInsertField = () => {
  if (formState.DefaultValue == undefined) {
    formState.DefaultValue = "";
  }
  formState.DefaultValue =
    formState.DefaultValue + " " + data.fieldSelector + " ";
};
const getFieldList = () => {
  proxy
    .$get(Interface.objeview.objectmanager, {
      entityId: data.entityId,
    })
    .then((res) => {
      data.fieldList = res.rows;
    });
};
getFieldList();
const FormulaEditor = {};

const handleisShowFormula = () => {
  data.isFormulaShow = !data.isFormulaShow;
};
</script>
<style lang="less" scoped>
  @import url("@/style/fieldForm.less");
  @import url("@/style/fieldDetail/fieldEdit.less");
.last.labelCol {
  padding-right: 10px;
  padding-left: 2px;
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: right;
  font-size: 91%;
  font-weight: bold;
  color: #4a4a56;
  width: 18%;
  vertical-align: top;
}
</style>
