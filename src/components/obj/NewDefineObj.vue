<template>
  <div class="editPage" style="height: 100%; overflow-y: auto">
    <div class="bPageTitle">
      <div class="ptBody">
        <div class="content">
          <img
            :src="require('@/assets/img/s.gif')"
            alt=""
            class="pageTitleIcon"
            title=""
          />
          <h1 class="pageType" style="font-size: 26px; font-weight: normal">
            编辑自定义对象<span class="titleSeparatingColon">:</span>
          </h1>
          <h2 class="pageDescription">{{ detail.Label }}</h2>
          <div class="blank">&nbsp;</div>
        </div>
        <div class="links">
          <a href="javascript:void(0);" title="此页面的帮助 （新窗口）">
            <span class="helpLink">此页面的帮助</span>
            <img :src="require('@/assets/img/s.gif')" alt="" class="helpIcon" />
          </a>
        </div>
      </div>
      <div class="ptBreadcrumb"></div>
    </div>
    <div
      class="bPageBlock brandSecondaryBrd bEditBlock secondaryPalette"
      style="margin-bottom: 0"
    >
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
                <h2 class="mainTitle">自定义对象定义编辑</h2>
              </td>
              <td class="pbButton" id="topButtonRow">
                <input
                  value=" 保存 "
                  class="inpBtn"
                  name="save"
                  title="保存"
                  type="submit"
                  @click="handleSave"
                />
                <input
                  value=" 保存并新建 "
                  class="inpBtn"
                  name="save_new"
                  title="保存并新建"
                  type="submit"
                />
                <input
                  value=" 取消 "
                  class="inpBtn"
                  name="cancel"
                  title="取消"
                  type="submit"
                  @click="handleCancel"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pbBody">
        <div
          class="brandTertiaryBgr first pbSubheader tertiaryPalette"
          id="head_1_ep"
        >
          <span class="pbSubExtra">
            <span class="requiredLegend brandTertiaryFgr">
              <span class="requiredExampleOuter">
                <span class="requiredExample">&nbsp;</span>
              </span>
              <span class="requiredMark">*</span>
              <span class="requiredText"> = 必填信息</span>
            </span>
          </span>
          <h3>自定义对象信息<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList">
            <tbody>
              <tr class="detailRow">
                <td colspan="4">
                  单数和复数标签用于选项卡、页面布局和报表中。
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <strong
                    >更改名称或标签时务必谨慎，因为可能会影响现有的集成和合并模板。</strong
                  >
                </td>
              </tr>
              <tr>
                <td class="labelCol requiredInput">
                  <label for="MasterLabel"
                    ><span class="assistiveText">*</span>标签</label
                  >
                </td>
                <td class="dataCol col02">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="MasterLabel"
                      maxlength="40"
                      name="MasterLabel"
                      size="20"
                      tabindex="1"
                      type="text"
                      v-model="formState.MasterLabel"
                    />
                    <div class="errorMsg" v-if="rules.MasterLabel.isRequired">
                      <strong>错误:</strong> 必须输入一个值
                    </div>
                  </div>
                </td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol empty">&nbsp;</td>
                <td class="dataCol col02 empty">&nbsp;</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">通过 API 引用对象时，将使用对象名。</td>
              </tr>
              <tr>
                <td class="labelCol requiredInput">
                  <label for="DeveloperName"
                    ><span class="assistiveText">*</span>对象名</label
                  >
                </td>
                <td class="data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="DeveloperName"
                      maxlength="40"
                      name="DeveloperName"
                      size="20"
                      tabindex="3"
                      type="text"
                      v-model="formState.DeveloperName"
                    />
                    &nbsp;&nbsp;<strong>示例： </strong>&nbsp;<strong
                      >Account</strong
                    >
                    <div class="errorMsg" v-if="rules.DeveloperName.isRequired">
                      <strong>错误:</strong> 必须输入一个值
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="labelCol requiredInput">
                  <label for="ParentFolderId"
                    ><span class="assistiveText">*</span>目录</label
                  >
                </td>
                <td class="data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="ParentFolderId"
                      maxlength="40"
                      name="ParentFolderId"
                      size="20"
                      tabindex="3"
                      type="text"
                      v-model="formState.ParentFolderId.Name"
                    />
                    <a
                      data-v-35945011=""
                      href="javascript:;"
                      @click="handleOpenLook('ParentFolderId')"
                      id="critfld1_fs"
                      title="查找（新窗口）"
                      ><img
                        data-v-35945011=""
                        src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        alt="查找（新窗口）"
                        class="lookupIcon"
                        title="查找（新窗口）"
                    /></a>
                    <div
                      class="errorMsg"
                      v-if="rules.ParentFolderId.isRequired"
                    >
                      <strong>错误:</strong> 必须输入一个值
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="labelCol empty">&nbsp;</td>
                <td class="dataCol col02 empty">&nbsp;</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol">
                  <label for="Description">描述</label>
                  <div class="textCounterOuter">
                    <div class="textCounterMiddle">
                      <div class="textCounter" id="Description_counter">
                        1000 剩余
                      </div>
                    </div>
                  </div>
                </td>
                <td class="data2Col" colspan="3">
                  <textarea
                    cols="100"
                    id="Description"
                    maxlength="1000"
                    name="Description"
                    v-model="formState.Description"
                    rows="6"
                    tabindex="4"
                    type="text"
                    wrap="soft"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td class="labelCol empty">&nbsp;</td>
                <td class="dataCol col02 empty">&nbsp;</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol">
                  <label for="CustomHelpType">上下文相关帮助设置</label>
                </td>
                <td class="data2Col" colspan="3">
                  <ul
                    class="radioGroup"
                    id="CustomHelpType"
                    name="CustomHelpType"
                  >
                    <li>
                      <input
                        checked="checked"
                        id="CustomHelpTypeSTANDARD_HELP"
                        name="CustomHelpType"
                        tabindex="5"
                        type="radio"
                        value="STANDARD_HELP"
                        v-model="formState.CustomHelpType"
                      />
                      <label for="CustomHelpTypeSTANDARD_HELP"
                        >打开标准 Salesforce.com“帮助和培训”窗口</label
                      >
                    </li>
                    <li>
                      <input
                        id="CustomHelpTypeCUSTOM_HELP_SCONTROL"
                        name="CustomHelpType"
                        tabindex="6"
                        type="radio"
                        value="CUSTOM_HELP_SCONTROL"
                        v-model="formState.CustomHelpType"
                      />
                      <label for="CustomHelpTypeCUSTOM_HELP_SCONTROL"
                        >使用 custom s-control 打开一个窗口</label
                      >
                    </li>
                    <li>
                      <input
                        id="CustomHelpTypeCUSTOM_HELP_VISUALFORCE"
                        name="CustomHelpType"
                        tabindex="7"
                        type="radio"
                        value="CUSTOM_HELP_VISUALFORCE"
                        v-model="formState.CustomHelpType"
                      />
                      <label for="CustomHelpTypeCUSTOM_HELP_VISUALFORCE"
                        >使用 Visualforce 页面打开一个窗口</label
                      >
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="labelCol">内容名称</td>
                <td class="data2Col" colspan="3">
                  <select
                    class="hidden"
                    id="Help_CUSTOM_HELP_SCONTROL"
                    v-if="formState.CustomHelpType == 'CUSTOM_HELP_SCONTROL'"
                    name="Help_CUSTOM_HELP_SCONTROL"
                    tabindex="10"
                  >
                    <option value="">--无--</option>
                    <option value="01N90000000Myqa">
                      redirectToSmart [VCSSAP__redirectToSmart]
                    </option>
                    <option value="01N90000000Myqb">
                      viewEmail [VCSSAP__viewEmail]
                    </option>
                  </select>
                  <select
                    disabled="disabled"
                    id="Help_CUSTOM_HELP_VISUALFORCE"
                    name="Help_CUSTOM_HELP_VISUALFORCE"
                    tabindex="11"
                    v-if="formState.CustomHelpType == 'CUSTOM_HELP_VISUALFORCE'"
                  >
                    <option value="">--无--</option>
                    <option value="06690000005hh3e">
                      Blank [VCSSAP__Blank]
                    </option>
                    <option value="06690000005hh3f">
                      ComposeAutocomplete [VCSSAP__ComposeAutocomplete]
                    </option>
                    <option value="0669000000668eA">
                      Define Trigger [EPMLive__DefineTrigger]
                    </option>
                    <option value="0669000000668eB">
                      Define Trigger - Configure [EPMLive__DefineTriggerS2]
                    </option>
                    <option value="06690000005hh3g">
                      Drafts [VCSSAP__Drafts]
                    </option>
                    <option value="06690000005hh3h">
                      EmailCompose [VCSSAP__EmailCompose]
                    </option>
                    <option value="066900000053g4Z">emailist [emailist]</option>
                    <option value="06690000005hh3j">
                      EmailPrint [VCSSAP__EmailPrint]
                    </option>
                    <option value="06690000005hh3k">
                      EmailToSelectorStep1 [VCSSAP__EmailToSelectorStep1]
                    </option>
                    <option value="06690000005hh3l">
                      EmailToSelectorStep2 [VCSSAP__EmailToSelectorStep2]
                    </option>
                    <option value="06690000005NXZh">
                      FlowSamplesBrowser [FlowSamplesBrowser]
                    </option>
                    <option value="06690000005hh3m">
                      Inbox [VCSSAP__Inbox]
                    </option>
                    <option value="06690000005hh3n">
                      InboxSidebar [VCSSAP__InboxSidebar]
                    </option>
                    <option value="06690000005hh3o">
                      Installation [VCSSAP__Installation]
                    </option>
                    <option value="06690000005hh3p">
                      ListAttachments [VCSSAP__ListAttachments]
                    </option>
                    <option value="06690000005O2LT">
                      Milestone1_Calendar_Large [Milestone1_Calendar_Large]
                    </option>
                    <option value="06690000005O2Lb">
                      Getting Started [Milestone1_GettingStarted]
                    </option>
                    <option value="06690000005O2Lh">
                      Milestone1_One_Line_Create [Milestone1_One_Line_Create]
                    </option>
                    <option value="06690000005O2Li">
                      Milestone1_Post_Install_Instruction
                      [Milestone1_Post_Install_Instruction]
                    </option>
                    <option value="06690000005O2Lj">
                      Main Menu [Milestone1_SinglePageMenu]
                    </option>
                    <option value="06690000005O2Lk">
                      Milestone1_Summary2 [Milestone1_Summary2]
                    </option>
                    <option value="06690000005hh3t">
                      Outbox [VCSSAP__Outbox]
                    </option>
                    <option value="0660o000007ZaOI">
                      postInstall [slackv2__postInstall]
                    </option>
                    <option value="0669000000668eD">
                      Redirect [EPMLive__Redirect]
                    </option>
                    <option value="06690000005hh3u">
                      Redirection Rules Admin [VCSSAP__RedirectionRulesAdmin]
                    </option>
                    <option value="0660o000007ZaOJ">
                      sendToSlack [slackv2__sendToSlack]
                    </option>
                    <option value="0669000000668eE">
                      Settings [EPMLive__Settings]
                    </option>
                    <option value="0660o000007ZaOK">
                      setup [slackv2__setup]
                    </option>
                    <option value="0660o000007ZaOL">
                      sfdcAuthStep [slackv2__sfdcAuthStep]
                    </option>
                    <option value="06690000005hh3v">
                      SingleAttachment [VCSSAP__SingleAttachment]
                    </option>
                    <option value="0660o000007ZaOM">
                      slackAlerts [slackv2__slackAlerts]
                    </option>
                  </select>
                </td>
              </tr>
              <tr class="last detailRow">
                <td colspan="4"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pbSubheader brandTertiaryBgr tertiaryPalette"
          id="head_2_ep"
        >
          <h3>
            输入记录名称标签和格式<span class="titleSeparatingColon">:</span>
          </h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="detailRow">
                <td colspan="4">
                  记录名称出现在页面布局、关键词列表、相关列表、查找和搜索结果中。例如，客户的记录名称是"客户名称"，对于个案，记录名称是"个案编号"。请注意：当通过
                  API 引用时，记录名称字段总是被称为“名称”。
                </td>
              </tr>
              <tr>
                <td class="labelCol requiredInput">
                  <label for="MasterNameFieldLabel"
                    ><span class="assistiveText">*</span>记录名</label
                  >
                </td>
                <td class="data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="MasterNameFieldLabel"
                      maxlength="80"
                      name="MasterNameFieldLabel"
                      size="20"
                      tabindex="13"
                      type="text"
                      v-model="formState.MasterNameFieldLabel"
                    />&nbsp;&nbsp;<strong>示例： &nbsp;帐户名</strong>
                    <div
                      class="errorMsg"
                      v-if="rules.MasterNameFieldLabel.isRequired"
                    >
                      <strong>错误:</strong> 必须输入一个值
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">&nbsp;</td>
              </tr>
              <tr>
                <td class="labelCol requiredInput">
                  <label for="AutoNo"
                    ><span class="assistiveText">*</span>数据类型</label
                  >
                </td>
                <td class="data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <select
                      id="AutoNo"
                      name="AutoNo"
                      v-model="formState.AutoNo"
                      tabindex="14"
                    >
                      <option value="Text" selected="selected">文本</option>
                      <option value="AutoNumber">自动编号</option>
                    </select>
                    <div class="errorMsg" v-if="rules.AutoNo.isRequired">
                      <strong>错误:</strong> 必须输入一个值
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="display: none">
                <td class="labelCol requiredInput">
                  <label for="NameAutoNumberMask">
                    <span class="assistiveText">*</span>显示格式
                  </label>
                </td>
                <td class="data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="NameAutoNumberMask"
                      maxlength="50"
                      name="NameAutoNumberMask"
                      size="20"
                      tabindex="16"
                      type="text"
                      v-model="formState.NameAutoNumberMask"
                    />&nbsp;&nbsp;<strong>示例： </strong
                    >&nbsp;<strong>A-{0000}</strong>&nbsp;&nbsp;
                    <!-- <div class="errorMsg" v-if="rules.NameAutoNumberMask.isRequired"><strong>错误:</strong> 必须输入一个值</div> -->
                    <a
                      href="javascript:void%280%29"
                      title="这是什么？ （新窗口）"
                      >这是什么？</a
                    >
                  </div>
                </td>
              </tr>
              <tr style="display: none">
                <td class="labelCol last requiredInput">
                  <label for="StartingNo"
                    ><span class="assistiveText">*</span>开始编号</label
                  >
                </td>
                <td class="last data2Col" colspan="3">
                  <div class="requiredInput">
                    <div class="requiredBlock"></div>
                    <input
                      id="StartingNo"
                      name="StartingNo"
                      size="20"
                      tabindex="17"
                      type="text"
                    />
                    <!-- <div class="errorMsg" v-if="rules.StartingNo.isRequired"><strong>错误:</strong> 必须输入一个值</div> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pbSubheader brandTertiaryBgr tertiaryPalette"
          id="head_3_ep"
        >
          <h3>可选功能<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    id="options_0"
                    name="options_0"
                    tabindex="18"
                    type="checkbox"
                    v-model="formState.options_0"
                  /><label for="options_0">允许报表</label>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    id="options_3"
                    name="options_3"
                    onchange="alert('修改自定义对象页面布局，以添加未处理活动和活动历史相关列表。');this.onchange='';"
                    tabindex="19"
                    type="checkbox"
                    v-model="formState.options_3"
                  /><label for="options_3">允许活动</label>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    id="options_9"
                    name="options_9"
                    tabindex="20"
                    type="checkbox"
                    v-model="formState.options_9"
                  /><label for="options_9">可用于客户入口网站</label>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    id="options_6"
                    name="options_6"
                    tabindex="21"
                    type="checkbox"
                    v-model="formState.options_6"
                  /><label for="options_6">跟踪字段历史</label>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    id="options_32"
                    name="options_32"
                    tabindex="22"
                    type="checkbox"
                    v-model="formState.options_32"
                  /><label for="options_32">允许在 Chatter 小组中</label>
                </td>
              </tr>
              <tr class="last detailRow">
                <td colspan="4">
                  <input
                    disabled="disabled"
                    id="options_38"
                    name="options_38"
                    tabindex="25"
                    type="checkbox"
                    v-model="formState.options_38"
                  /><label for="options_38">启用许可</label>
                  <div
                    class="mouseOverInfoOuter"
                    onfocus="addMouseOver(this)"
                    onmouseover="addMouseOver(this)"
                    tabindex="26"
                  >
                    <img
                      :src="require('@/assets/img/s.gif')"
                      alt=""
                      class="infoIcon"
                      title=""
                    />
                    <div class="mouseOverInfo" style="display: none">
                      表示此对象是否由 Salesforce
                      许可，以及用户是否需要权限集许可证。
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pbSubheader brandTertiaryBgr tertiaryPalette"
          id="head_4_ep"
        >
          <h3>对象分类<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="detailRow">
                <td colspan="4">
                  当这些设置启用时，此对象被分类为企业应用程序对象。当这些设置禁用时，此对象被分类为轻应用程序对象。&nbsp;<a
                    href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=dev_object_def.htm&amp;section=CustomObjects%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                    class="helpLink"
                    >了解更多。</a
                  >
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    checked="checked"
                    id="options_28"
                    name="options_28"
                    tabindex="27"
                    type="checkbox"
                    v-model="formState.options_28"
                  /><label for="options_28">允许共享</label>
                </td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    checked="checked"
                    id="options_29"
                    name="options_29"
                    tabindex="28"
                    type="checkbox"
                    v-model="formState.options_29"
                  /><label for="options_29">允许 API 批量访问</label>
                </td>
              </tr>
              <tr class="last detailRow">
                <td colspan="4">
                  <input
                    checked="checked"
                    id="options_30"
                    name="options_30"
                    tabindex="29"
                    type="checkbox"
                    v-model="formState.options_30"
                  /><label for="options_30">允许 API 串流访问</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pbSubheader brandTertiaryBgr tertiaryPalette"
          id="head_5_ep"
        >
          <span class="pbSubExtra"
            ><a
              href="javascript:void%280%29"
              onclick="setLastMousePosition(event);openPopupFocus('/setup/ui/whatisdeploymentstatus.jsp', 'jsOpen', 620,400,'width=620,height=400,resizable=yes,toolbar=no,status=no,scrollbars=yes,menubar=no,directories=no,location=no,dependant=no', true, false);return false;"
              title="这是什么？ （新窗口）"
              >这是什么？</a
            ></span
          >
          <h3>部署状态<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="last detailRow">
                <td colspan="4">
                  <div>
                    <input
                      id="InDevelopment1"
                      name="InDevelopment"
                      type="radio"
                      value="1"
                      v-model="formState.InDevelopment"
                    />
                    <label for="InDevelopment1">正在开发</label>
                  </div>
                  <div>
                    <input
                      id="InDevelopment0"
                      name="InDevelopment"
                      type="radio"
                      value="0"
                      v-model="formState.InDevelopment"
                    />
                    <label for="InDevelopment0">已部署</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="pbSubheader brandTertiaryBgr tertiaryPalette"
          id="head_6_ep"
        >
          <h3>搜索状态<span class="titleSeparatingColon">:</span></h3>
        </div>
        <div class="pbSubsection">
          <table class="detailList" border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr class="detailRow">
                <td colspan="4">
                  在启用此设置时，您的用户可以会在搜索时查找此对象类型的记录。&nbsp;<a
                    href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=search_index_considerations.htm%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                    class="helpLink"
                    >了解更多。</a
                  >
                </td>
              </tr>
              <tr>
                <td class="labelCol empty">&nbsp;</td>
                <td class="dataCol col02 empty">&nbsp;</td>
                <td class="labelCol last empty">&nbsp;</td>
                <td class="dataCol last empty">&nbsp;</td>
              </tr>
              <tr class="detailRow">
                <td colspan="4">
                  <input
                    checked="checked"
                    id="options_20"
                    name="options_20"
                    tabindex="30"
                    type="checkbox"
                    v-model="formState.options_20"
                  />
                  <label for="options_20">允许搜索</label>
                </td>
              </tr>
              <tr class="last detailRow">
                <td colspan="4">
                  <input
                    type="hidden"
                    id="moduleName"
                    name="moduleName"
                    value=""
                  />
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
                <img
                  :src="require('@/assets/img/s.gif')"
                  alt=""
                  width="1"
                  height="1"
                  class="minWidth"
                  title=""
                />&nbsp;
              </td>
              <td class="pbButtonb" id="bottomButtonRow">
                <input
                  value=" 保存 "
                  class="inpBtn"
                  name="save"
                  tabindex="31"
                  title="保存"
                  type="submit"
                  @click="handleSave"
                />
                <input
                  value=" 保存并新建 "
                  class="inpBtn"
                  name="save_new"
                  tabindex="32"
                  title="保存并新建"
                  type="submit"
                />
                <input
                  value=" 取消 "
                  class="inpBtn"
                  name="cancel"
                  tabindex="33"
                  title="取消"
                  type="submit"
                  @click="handleCancel"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Lookup-filter
      v-if="isLookupFilter"
      :isShow="isLookupFilter"
      field="Name"
      :entityApiName="entityApiName"
      lookEntityApiName="EntityCategory"
      :objectTypeCode="100200"
      @cancel="isLookupFilter = false"
      @select="handleSelectLook"
    ></Lookup-filter>
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
  toRaw,
} from "vue";
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
import LookupFilter from "@/components/commonModal/LookupFilter.vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["cancel"]);
const props = defineProps({
  id: String,
  detail: Object,
});
const rules = reactive({
  MasterLabel: {
    isRequired: false,
  },
  DeveloperName: {
    isRequired: false,
  },
  ParentFolderId: {
    isRequired: false,
  },
  MasterNameFieldLabel: {
    isRequired: false,
  },
  AutoNo: {
    isRequired: false,
  },
});

const formState = reactive({
  MasterLabel: "",
  DeveloperName: "",
  ParentFolderId: {
    Id: "",
    Name: "",
  },
  Description: "",
  CustomHelpType: "CUSTOM_HELP_SCONTROL",
  Help_CUSTOM_HELP_SCONTROL: "",
  MasterNameFieldLabel: "",
  AutoNo: "Text",
  options_0: false,
  options_3: false,
  options_9: false,
  options_6: false,
  options_32: false,
  options_38: false,
  options_28: true,
  options_29: true,
  options_30: true,
  InDevelopment: "0",
  options_20: false,
});
const data = reactive({
  entityApiName: route.query.sObjectName,
  isLookupFilter: false,
});
const { entityApiName, isLookupFilter } = toRefs(data);

const handleSelectLook = (e, name) => {
  console.log("e, name", e, name);
  formState.ParentFolderId = {
    Name: e[name],
    Id: e.id,
  };
  rules.ParentFolderId.isRequired = false;
  data.isLookupFilter = false;
};

onMounted(() => {
  console.log("detail", props.detail);
  if (props.id) {
    let {
      Label,
      DeveloperName,
      description,
      folderId,
      folderName,
      MasterNameFieldLabel,
      AutoNo,
      InDevelopment,
    } = props.detail;
    formState.MasterLabel = Label;
    formState.DeveloperName = DeveloperName;
    formState.ParentFolderId.Id = folderId;
    formState.ParentFolderId.Name = folderName;
    formState.Description = description;
    formState.MasterNameFieldLabel = MasterNameFieldLabel;
    formState.AutoNo = AutoNo;
    formState.InDevelopment = InDevelopment;
  }
});

const handleCancel = () => {
  emit("cancel", false);
};
const validateField = () => {
  let isValidate = true;
  let obj = toRaw(rules);
  // console.log("rules", rules);
  for (let key in rules) {
    rules[key].isRequired = false;
    if (formState[key] == "" || formState[key] == undefined) {
      rules[key].isRequired = true;
      isValidate = false;
    }
  }
  return isValidate;
};

const handleSave = () => {
  console.log("formstate", toRaw(formState));
  if (validateField()) {
    console.log("obj");
    let fields = toRaw(formState);
    for (let key in fields) {
      if (typeof fields[key] == "boolean") {
        fields[key] = fields[key] ? 1 : 0;
      }
      if (Object.prototype.toString.call(fields[key]) === "[object Object]") {
        fields[key] = fields[key].Id;
      }
    }
    // console.log("obj222", fields);
    let obj = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: "Entity",
              objTypeCode: 100000,
              fields: fields,
            },
          },
        },
      ],
    };
    if (props.id) {
      obj.actions[0].params.recordId = props.id;
    }
    let d = {
      message: JSON.stringify(obj),
    };
    let url = Interface.obj.create;

    proxy.$post(url, d).then((res) => {
      if (res && res.actions[0].state == "SUCCESS") {
        if (props.id) {
          Toast("保存成功！");
          emit("cancel", false);
          emit("ok", false);
        } else {
          router.back();
          Toast("创建成功！");
        }
      }
    });
  }
};
const handleOpenLook = (field) => {
  data.isLookupFilter = true;
};
</script>
<style lang="less" scoped>
@import url("@/style/fieldForm.less");
@import url("@/style/fieldDetail/fieldEdit.less");
</style>
