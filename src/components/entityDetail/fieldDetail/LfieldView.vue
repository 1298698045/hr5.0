<template>
  <div v-if="!isNew && !isSort && !isReplace && !isReplaceList && !isEditVal">
    <div class="bPageTitle">
      <div class="ptBody">
        <div class="content">
          <h1 class="pageType">
            客户 字段
            <span class="titleSeparatingColon">:</span>
          </h1>
          <h2 class="pageDescription">{{ detail.MasterLabel }}</h2>
          <div class="blank">&nbsp;</div>
        </div>
        <div class="links">
          <a href="javascript:void(0);" title="此页面的帮助 （新窗口）">
            <span class="helpLink">此页面的帮助</span>
            <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon" />
          </a>
        </div>
      </div>
      <div class="ptBreadcrumb">
        &nbsp;&nbsp;
        <a href="javascript:void(0);" @click="handleBack">返回到 客户 字段</a>
      </div>
    </div>
    <div class="bPageBlock">
      <div class="pbHeader">
        <table>
          <tbody>
            <tr>
              <td class="pbTitle">
                <img
                  :src="require('@/assets/img/s.gif')"
                  alt=""
                  width="1"
                  height="1"
                  class="minWidth"
                  title=""
                />
                <h2 class="mainTitle"></h2>
              </td>
              <td class="pbButton">
                <input
                  type="button"
                  class="inpBtn"
                  value="编辑"
                  @click="handleEditField"
                />
                <input
                  type="button"
                  class="inpBtn ml5"
                  value="设置字段集安全性"
                />
                <input
                  type="button"
                  class="inpBtn ml5"
                  value="查看字段可访问性"
                />
                <input type="button" class="inpBtn ml5" value="用于何处？" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pbBody">
        <div class="brandTertiaryBrd first pbSubheader tertiaryPalette">
          <h3>字段信息<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList">
            <tbody>
              <tr>
                <td class="labelCol">字段标签</td>
                <td class="dataCol col02">{{ detail.MasterLabel }}</td>
                <td class="labelCol">对象名</td>
                <td class="dataCol">
                  <a href="javascript:void(0);">{{ detail.entityLabel }}</a>
                </td>
              </tr>
              <tr>
                <td class="labelCol"><label>字段名</label></td>
                <td class="dataCol col02">{{ detail.DeveloperName }}</td>
                <td class="labelCol">数据类型</td>
                <td class="dataCol">{{ detail.dataTypeName }}</td>
              </tr>
              <tr>
                <td class="labelCol">API 名称</td>
                <td class="dataCol col02">{{ detail.apiName }}</td>
                <td class="labelCol">&nbsp;</td>
                <td class="dataCol">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol"><label>描述</label></td>
                <td class="data2Col" colspan="3">{{ detail.Description }}</td>
              </tr>
              <tr>
                <td class="labelCol"><label>帮助文本</label></td>
                <td class="data2Col" colspan="3">
                  {{ detail.InlineHelpText }}
                </td>
              </tr>
              <tr>
                <td class="labelCol">数据所有者</td>
                <td class="dataCol col02"></td>
                <td class="labelCol">&nbsp;</td>
                <td class="dataCol">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol">字段使用情况</td>
                <td class="dataCol col02"></td>
                <td class="labelCol">&nbsp;</td>
                <td class="dataCol">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol">数据灵敏性级别</td>
                <td class="dataCol col02"></td>
                <td class="labelCol">&nbsp;</td>
                <td class="dataCol">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol">合规性分类</td>
                <td class="dataCol col02"></td>
                <td class="labelCol">&nbsp;</td>
                <td class="dataCol">&nbsp;</td>
              </tr>
              <tr>
                <td class="last labelCol">创建人</td>
                <td class="dataCol last col02">
                  <a
                    href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);"
                    >liu jack</a
                  >, 2014-10-8 下午3:12
                </td>
                <td class="last labelCol">修改人</td>
                <td class="last dataCol">
                  <a
                    href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);"
                    >liu jack</a
                  >, 2014-10-8 下午3:12
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
          <h3>一般选项<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList">
            <tbody>
              <tr>
                <td class="labelCol">必需</td>
                <td class="data2Col" colspan="3">
                  <img
                    v-if="detail.options_0 == 0 || detail.options_0 == false"
                    :src="require('@/assets/img/checkbox_unchecked.gif')"
                    alt="未选取的"
                    width="21"
                    height="16"
                    class="checkImg"
                    title="未选取的"
                  />
                  <img
                    v-else
                    :src="require('@/assets/img/checkbox_checked.gif')"
                    alt="已选取的"
                    width="21"
                    height="16"
                    class="checkImg"
                    title="已选取的"
                  />
                </td>
              </tr>
              <tr>
                <td class="last labelCol">默认值</td>
                <td class="last data2Col" colspan="3">
                  &nbsp;
                  <div
                    class="mouseOverInfoOuter"
                    onfocus="addMouseOver(this)"
                    onmouseover="addMouseOver(this)"
                    tabindex="0"
                  >
                    <img src="@/assets/img/s.gif" alt="" class="infoIcon" title="" />
                    <div class="mouseOverInfo">
                      默认值会覆盖在值中定义的默认设置。如果默认值公式未分解为选项列表中的有效值，则使用值级别的默认设置。
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
          <h3>选项列表 选项<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList">
            <tbody>
              <tr>
                <td class="labelCol">限制在值集中定义的值选项列表</td>
                <td class="dataCol col02">
                  <img
                    v-if="detail.pickopts_1 == 0"
                    :src="require('@/assets/img/checkbox_unchecked.gif')"
                    alt="未选取的"
                    width="21"
                    height="16"
                    class="checkImg"
                    title="未选取的"
                  />
                  <img
                    v-else
                    :src="require('@/assets/img/checkbox_checked.gif')"
                    alt="已选取的"
                    width="21"
                    height="16"
                    class="checkImg"
                    title="已选取的"
                  />
                </td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr>
                <td class="last labelCol">控制字段</td>
                <td class="dataCol last col02">
                  <a
                    href="javascript:srcUp(%27%2Fp%2Fdependency%2FNewDependencyUI%2Fe%3FtableEnumOrId%3DAccount%26dependent%3D00N9000000CFoZu%26retURL%3D%252F00N9000000CFoZu%253F%253Dnull%2526entityId%253DAccount%2526retURL%253D%25252Fsetup%25252FObjectManager%25252FAccount%25252FFieldsAndRelationships%25252Fview%2526appLayout%253Dsetup%2526tour%253D%2526isdtp%253Dp1%2526sfdcIFrameOrigin%253Dhttps%25253A%25252F%25252Fd90000000yvhgeay-dev-ed.lightning.force.com%2526sfdcIFrameHost%253Dweb%2526nonce%253D5183df0e5715bec24befdae30a8c675a06ec7c329487d28534373af868e44bf7%2526ltn_app_id%253D06m90000000yYkGAAU%2526clc%253D1%26isdtp%3Dp1%27);"
                    >[新建]</a
                  >
                </td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="brandTertiaryBrd pbSubheader tertiaryPalette">
          <h3>选项列表值已使用<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList">
            <tbody>
              <tr>
                <td class="labelCol">活动选项列表值</td>
                <td class="dataCol col02">2 (1,000 最大）</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr>
                <td class="last labelCol">不活动选项列表值</td>
                <td class="dataCol last col02">0</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bRelatedList">
      <div class="listRelatedObject setupBlock">
        <div class="bPageBlock brandSecondaryBrd secondaryPalette">
          <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="pbTitle">
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      width="1"
                      height="1"
                      class="minWidth"
                      title=""
                    />
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      class="relatedListIcon"
                      title=""
                    />
                    <h3 id="ValidationFormulaList_title">字段依赖性</h3>
                  </td>
                  <td class="pbButton">
                    <input
                      value=" 新建 "
                      class="inpBtn"
                      name="new"
                      title="新建 验证规则"
                      type="button"
                    />
                  </td>
                  <td class="pbHelp">
                    <span class="help" title="字段依赖性 帮助 （新窗口）">
                      <a href="javascript:void(0);" class="linkCol">
                        <span class="linkSpan">字段依赖性帮助</span>
                        <img
                          :src="require('@/assets/img/s.gif')"
                          alt="字段依赖性 帮助 （新窗口）"
                          class="helpIcon"
                          title="字段依赖性 帮助 （新窗口）"
                        />
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pbBody">
            <table class="list" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr class="headerRow">
                  <th scope="col" class="noRowsHeader">未定义依赖关系。</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bRelatedList">
      <div class="listRelatedObject setupBlock">
        <div class="bPageBlock brandSecondaryBrd secondaryPalette">
          <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="pbTitle">
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      width="1"
                      height="1"
                      class="minWidth"
                      title=""
                    />
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      class="relatedListIcon"
                      title=""
                    />
                    <h3 id="ValidationFormulaList_title">验证规则</h3>
                  </td>
                  <td class="pbButton">
                    <input
                      value=" 新建 "
                      class="inpBtn"
                      name="new"
                      title="新建 验证规则"
                      type="button"
                      @click="handleNewRule"
                    />
                  </td>
                  <td class="pbHelp">
                    <span class="help" title="验证规则 帮助 （新窗口）">
                      <a href="javascript:void(0);" class="linkCol">
                        <span class="linkSpan">验证规则帮助</span>
                        <img
                          :src="require('@/assets/img/s.gif')"
                          alt="验证规则 帮助 （新窗口）"
                          class="helpIcon"
                          title="验证规则 帮助 （新窗口）"
                        />
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pbBody">
            <table class="list" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr class="headerRow">
                  <th scope="col" class="noRowsHeader">没有定义验证规则。</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bRelatedList">
      <div class="listRelatedObject setupBlock">
        <div class="bPageBlock brandSecondaryBrd secondaryPalette">
          <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="pbTitle">
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      width="1"
                      height="1"
                      class="minWidth"
                      title=""
                    />
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      class="relatedListIcon"
                      title=""
                    />
                    <h3 id="ValidationFormulaList_title">值</h3>
                  </td>
                  <td class="pbButton">
                    <input
                      value=" 新建 "
                      class="inpBtn"
                      name="new"
                      title="新建 值"
                      type="button"
                      @click="handleNewVal"
                    />&nbsp;
                    <input
                      value=" 重新排序 "
                      class="inpBtn"
                      name="sort"
                      title="重新排序"
                      type="button"
                      @click="handleSort"
                    />&nbsp;
                    <input
                      value="  替换  "
                      class="inpBtn"
                      name="replace"
                      title="替换"
                      type="button"
                      @click="handleReplace"
                    />&nbsp;
                    <input
                      value=" 可打印视图 "
                      class="inpBtn"
                      name="printableView"
                      title="可打印视图"
                      type="button"
                    />&nbsp;
                    <div class="menuButton" @click.stop>
                      <!-- <div class="menuButtonButton">
                                                <span class="menuButtonLabel">图表颜色</span>
                                            </div> -->
                      <input
                        type="button"
                        class="inpBtn menuButtonButton"
                        value="图表颜色"
                        @click.stop="isMenuColor = !isMenuColor"
                      />
                      <div class="menuButtonMenu" v-if="isMenuColor">
                        <a
                          href="javascript:;"
                          class="menuButtonMenuLink firstMenuItem"
                          >分配固定颜色到所有值</a
                        >
                        <a
                          href="javascript:;"
                          class="menuButtonMenuLink firstMenuItem"
                          >动态分配颜色到值</a
                        >
                      </div>
                    </div>
                    &nbsp;
                    <br />
                    <input
                      value="删除所选项目"
                      class="inpBtn"
                      :disabled="isDisabled"
                      title="删除所选项目"
                      type="submit"
                      @click="handleDeleteProject"
                    />
                    &nbsp;
                    <input
                      value="取消激活选定项"
                      class="inpBtn"
                      :disabled="isDisabled"
                      id="massDeactivate"
                      name="deactivate"
                      title="取消激活选定项"
                      type="submit"
                      @click="handleCancelActivation"
                    />
                    &nbsp;
                    <input
                      value=" 替换选定项 "
                      class="inpBtn"
                      :disabled="isDisabled"
                      id="massReplace"
                      name="replace"
                      title="替换选定项"
                      type="submit"
                      @click="handleReplaceList"
                    />
                  </td>
                  <td class="pbHelp">
                    <span class="help" title="无效值 帮助 （新窗口）">
                      <a href="javascript:void(0);" class="linkCol">
                        <span class="linkSpan">无效值帮助</span>
                        <img
                          :src="require('@/assets/img/s.gif')"
                          alt="无效值 帮助 （新窗口）"
                          class="helpIcon"
                          title="无效值 帮助 （新窗口）"
                        />
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pbBody">
            <table class="list" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr class="headerRow">
                  <th class="actionColumn" scope="col">
                    <input
                      id="allBox"
                      name="allBox"
                      title="切换所有行"
                      type="checkbox"
                      v-model="isAll"
                      @change="changeAllVal"
                    />&nbsp;操作
                  </th>
                  <th scope="col" class="zen-deemphasize">值</th>
                  <th scope="col" class="zen-deemphasize">API 名称</th>
                  <th scope="col" class="booleanColumn zen-deemphasize">
                    默认
                  </th>
                  <th scope="col" class="zen-deemphasize">图表颜色</th>
                  <th scope="col" class="zen-deemphasize">修改人</th>
                </tr>
                <tr
                  class="dataRow even first"
                  v-for="(item, index) in pickList"
                  :key="index"
                >
                  <td class="actionColumn">
                    <input
                      title="选择 No"
                      type="checkbox"
                      :value="item.Id"
                      v-model="checkboxVal"
                    />&nbsp;|&nbsp;
                    <a
                      href="javascript:;"
                      class="actionLink"
                      title="编辑 - 记录 1 - No"
                      @click="handleEditVal(item)"
                      >编辑</a
                    >&nbsp;|&nbsp;
                    <a
                      href="javascript:;"
                      class="actionLink"
                      title="删除 - 记录 1 - No"
                      @click="handleDeleteVal(item)"
                      >删除</a
                    >&nbsp;|&nbsp;
                    <a
                      href="javascript:;"
                      class="actionLink"
                      title="禁用 - 记录 1 - No"
                      @click="handleDisabledVal(item)"
                      >禁用</a
                    >
                  </td>
                  <td scope="row" class="dataCell">{{ item.Value }}</td>
                  <td class="dataCell">{{ item.Value }}</td>
                  <td class="dataCell booleanColumn">
                    <img
                      v-if="detail.IsDefaultValue == false"
                      :src="require('@/assets/img/checkbox_checked.gif')"
                      alt="已选取的"
                      width="21"
                      height="16"
                      class="checkImg"
                      title="已选取的"
                    />
                    <img
                      v-else
                      :src="require('@/assets/img/checkbox_unchecked.gif')"
                      alt="未选取的"
                      width="21"
                      height="16"
                      class="checkImg"
                      title="未选取的"
                    />
                  </td>
                  <td class="dataCell">已动态分配</td>
                  <td class="dataCell">
                    <a href="javascript:void(0);">{{ item.ModifiedByName }}</a
                    >, {{ item.ModifiedOn }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="bRelatedList">
      <div class="listRelatedObject setupBlock">
        <div class="bPageBlock brandSecondaryBrd secondaryPalette">
          <div class="pbHeader">
            <table border="0" cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="pbTitle">
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      width="1"
                      height="1"
                      class="minWidth"
                      title=""
                    />
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      class="relatedListIcon"
                      title=""
                    />
                    <h3 id="ValidationFormulaList_title">无效值</h3>
                  </td>
                  <td class="pbButton">
                    <input
                      value=" 删除未使用的值 "
                      disabled="disabled"
                      class="inpBtn"
                      name="new"
                      title="新建 验证规则"
                      type="button"
                    />
                  </td>
                  <td class="pbHelp">
                    <span class="help" title="无效值 帮助 （新窗口）">
                      <a href="javascript:void(0);" class="linkCol">
                        <span class="linkSpan">无效值帮助</span>
                        <img
                          :src="require('@/assets/img/s.gif')"
                          alt="无效值 帮助 （新窗口）"
                          class="helpIcon"
                          title="无效值 帮助 （新窗口）"
                        />
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pbBody">
            <table class="list" border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr class="headerRow">
                  <th scope="col" class="noRowsHeader">未定义无效值值。</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="fewerMore">
      <div class="backToTop">
        <a href="javascript:void(0)" title="返回顶部" @click="handleBackToTop">
          <img
            :src="require('@/assets/img/upToTop_caret.gif')"
            alt="返回顶部"
            width="8"
            height="8"
            title="返回顶部"
          />
          返回顶部
        </a>
      </div>
      每一相关列表总是显示
      <a href="javascript:void(0)">
        更少
        <img
          :src="require('@/assets/img/s.gif')"
          alt="显示较少信息"
          class="fewerArrow"
          title="显示较少信息"
        />
      </a>
      /
      <a href="javascript:void(0)">
        <img
          :src="require('@/assets/img/s.gif')"
          alt="显示更多信息"
          class="moreArrow"
          title="显示更多信息"
        />
        更多
      </a>
      项记录
    </div>
  </div>
  <AgainSort v-if="isSort" @cancel="isSort = false" :pickList="pickList" />
  <NewVal v-if="isNew" @cancel="isNew = false" :detail="detail" />
  <ReplaceVal v-if="isReplace" @cancel="isReplace = false" />
  <ReplaceValList v-if="isReplaceList" @cancel="isReplaceList = false" />
  <EditVal v-if="isEditVal" @cancel="isEditVal = false" :valRow="valRow" />
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
  computed,
} from "vue";
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

import NewVal from "./picklist/NewVal.vue";
import AgainSort from "./picklist/AgainSort.vue";
import ReplaceVal from "./picklist/ReplaceVal.vue";
import ReplaceValList from "./picklist/ReplaceValList.vue";
import EditVal from "./picklist/EditVal.vue";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["edit", "back", "newRule", "toTop"]);
const props = defineProps({
  detail: Object,
});

const data = reactive({
  isNew: false,
  isSort: false,
  isReplace: false,
  isReplaceList: false,
  isMenuColor: false,
  isEditVal: false,
  pickList: [],
  checkboxVal: [],
  isAll: false,
  valRow: {},
});
const {
  isNew,
  isSort,
  isReplace,
  isReplaceList,
  isMenuColor,
  isEditVal,
  pickList,
  checkboxVal,
  isAll,
  valRow,
} = toRefs(data);

onMounted(() => {
  window.addEventListener("click", () => {
    data.isMenuColor = false;
  });
  getPickList();
});
watch(
  () => data.checkboxVal,
  (newVal, oldVal) => {
    console.log("newVal, oldVal", newVal, oldVal);
  },
  {
    deep: true,
    immediate: true,
  }
);
const isDisabled = computed(() => {
  return data.checkboxVal.length ? false : true;
});
const handleBack = () => {
  emit("back", false);
};
const handleEditField = () => {
  emit("edit", false);
};

// 新建值
const handleNewVal = () => {
  data.isNew = true;
};
// 重新排序
const handleSort = () => {
  data.isSort = true;
};
// 替换
const handleReplace = () => {
  data.isReplace = true;
};
// 删除所选项目
const handleDeleteProject = () => {
  let question = confirm("是否确定?");
  if (question) {
  }
};
// 取消激活选定项
const handleCancelActivation = () => {
  let question = confirm("是否确定?");
  if (question) {
  }
};
// 替换选定项
const handleReplaceList = () => {
  data.isReplaceList = true;
};

// 编辑值
const handleEditVal = (item) => {
  data.valRow = item;
  data.isEditVal = true;
};
// 删除值
const handleDeleteVal = (item) => {
  let question = confirm("是否确定?");
  console.log("question", question);
  if (question) {
    proxy
      .$get(Interface.objeview.field.deleteLVal, {
        id: item.Id,
      })
      .then((res) => {
        Toast("删除成功！");
        getPickList();
      });
  }
};
// 禁用值
const handleDisabledVal = (item) => {
  let question = confirm("是否确定?");
  console.log("question", question);
  if (question) {
    proxy
      .$get(Interface.objeview.field.disabled, {
        id: item.Id,
      })
      .then((res) => {
        Toast("禁用成功！");
        getPickList();
      });
  }
};

const getPickList = () => {
  proxy
    .$get(Interface.objeview.pickList, {
      ObjectTypeCode: 30020,
      Name: props.detail.developerName,
    })
    .then((res) => {
      data.pickList = res.rows;
    });
};
// 全选
const changeAllVal = () => {
  if (data.isAll) {
    data.pickList.forEach((item) => {
      data.checkboxVal.push(item.Id);
    });
  } else {
    data.checkboxVal = [];
  }
};
// 新建验证规则
const handleNewRule = () => {
  emit("newRule", true);
};
const handleBackToTop = () => {
  emit("toTop", true);
};
</script>
<style lang="less" scoped>
@import url("@/style/fieldForm.less");
@import url("@/style/fieldDetail/fieldDetail.less");
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
    font-family: "Verdana", "Geneva", sans-serif;
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
</style>
