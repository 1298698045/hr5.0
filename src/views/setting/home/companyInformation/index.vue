<template>
  <div class="steupHeaderInfo">
    <div class="bLeft">
      <div class="setup-header-element">
        <div class="fh-icon_container">
          <svg class="fh-icon" focusable="false" data-key="orders" aria-hidden="true" viewBox="0 0 1000 1000"
            part="icon">
            <g>
              <path
                d="M788 621l-36-17c-5-3-12-3-17 0L520 706c-12 6-27 6-39 0L265 604c-5-3-12-3-17 0l-36 17c-16 8-16 29 0 37l268 127c12 6 27 6 39 0l268-127c17-8 17-30 1-37zm0-140l-37-17c-5-3-12-3-17 0L520 566c-12 6-27 6-39 0L266 464c-5-3-12-3-17 0l-37 17c-16 8-16 29 0 37l268 128c12 6 27 6 39 0l268-127c17-8 17-30 1-38zM212 378l268 127c12 6 27 6 39 0l268-127c16-8 16-29 0-37L519 214c-12-6-27-6-39 0L212 342c-16 7-16 29 0 36z">
              </path>
            </g>
          </svg>
        </div>
      </div>
      <div class="setup-header-element">
        <div class="onesetupBreadcrumbs">
          <a href="#/lightning/setup/SetupOneHome/home" class="breadcrumb">设置</a>
        </div>
        <h1 class="breadcrumbDetail">主页</h1>
      </div>
    </div>
  </div>
  <div class="home">
    <div class="todo-content" ref="contentRef">
      <div class="compProfileInfo">
        <div class="top">
          <h1 class="title">公司信息</h1>
          <h2 class="desc">yz</h2>
        </div>
        <div class="bDescription">以下是组织的简档。</div>
        <div v-if="!isEdit">
          <div class="detailInfo">
            <div class="detailHead">
              <div class="headLabel">组织详细信息</div>
              <div class="headButton">
                <a-button class="ml10" @click="handleEdit">编辑</a-button>
                <a-button class="ml10">禁用组织</a-button>
              </div>
            </div>
            <div class="detailBd">
              <table class="infoTable">
                <tbody>
                  <tr>
                    <td class="labelCol">组织名</td>
                    <td class="dataCol col02">yz</td>
                    <td class="labelCol">电话</td>
                    <td class="dataCol">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="labelCol">主要联系人</td>
                    <td class="dataCol col02">liu jack</td>
                    <td class="labelCol">传真</td>
                    <td class="dataCol">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="labelCol">分部</td>
                    <td class="dataCol col02">&nbsp;</td>
                    <td class="labelCol">默认区域</td>
                    <td class="dataCol">中文 (中国)</td>
                  </tr>
                  <tr>
                    <td class="labelCol">地址</td>
                    <td class="dataCol col02">100000<br>
                      CN</td>
                    <td class="labelCol">默认语言</td>
                    <td class="dataCol">中文（简体）</td>
                  </tr>
  
                  <tr>
                    <td class="labelCol">会计年度开始月份</td>
                    <td class="dataCol col02">自定义会计年度</td>
                    <td class="labelCol">默认时区</td>
                    <td class="dataCol">(GMT+08:00) 中国标准时间 (Asia/Shanghai)</td>
                  </tr>
                  <tr>
                    <td class="labelCol">激活多币种</td>
                    <td class="dataCol col02">
                      <img :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg"
                        title="未选取的">
                    </td>
                    <td class="labelCol">改善 DST 的 DATEVALUE() 准确度</td>
                    <td class="dataCol">
                      <img :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg"
                        title="未选取的">
                    </td>
                  </tr>
                  <tr>
                    <td class="labelCol">新闻简报</td>
                    <td class="dataCol col02">
                      <img :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg"
                        id="ReceivesInfoEmails_chkbox" title="未选取的">
                    </td>
                    <td class="labelCol">货币区域</td>
                    <td class="dataCol">中文 (中国) - CNY</td>
                  </tr>
                  <tr>
                    <td class="labelCol">管理员新闻简报</td>
                    <td class="dataCol col02">
                      <img  :src="require('@/assets/img/checkbox_checked.gif')" alt="选取的" width="21" height="16" class="checkImg"
                        id="ReceivesAdminInfoEmails_chkbox" title="选取的">
                    </td>
                    <td class="labelCol">已使用的数据空间</td>
                    <td class="dataCol">888&nbsp;KB&nbsp;(17%)&nbsp;<a
                        href="javascript:srcUp(%27%2Fsetup%2Forg%2Forgstorageusage.jsp%3Fid%3D00D90000000yvHG%26setupid%3DCompanyResourceDisk%26isdtp%3Dp1%27);">[查看]</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="labelCol">隐藏关于系统维护的通知</td>
                    <td class="dataCol col02">
                      <img :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg"
                        title="未选取的">
                    </td>
                    <td class="labelCol">已使用的文件空间</td>
                    <td class="dataCol">9.8&nbsp;MB&nbsp;(49%)&nbsp;<a
                        href="javascript:srcUp(%27%2Fsetup%2Forg%2Forgstorageusage.jsp%3Fid%3D00D90000000yvHG%26setupid%3DCompanyResourceDisk%26isdtp%3Dp1%27);">[查看]</a>
                    </td>
                  </tr>
  
                  <tr>
                    <td class="labelCol">隐藏关于系统关闭期间的通知</td>
                    <td class="dataCol col02">
                      <img  :src="require('@/assets/img/checkbox_unchecked.gif')" alt="未选取的" width="21" height="16" class="checkImg"
                        title="未选取的">
                    </td>
                    <td class="labelCol">API 请求, 最后 24 小时</td>
                    <td class="dataCol">0 (5,000 最大值)</td>
                  </tr>
                  <tr>
                    <td class="labelCol empty">&nbsp;</td>
                    <td class="dataCol col02 empty">&nbsp;</td>
                    <td class="labelCol">流 API 事件，最后 24 小时</td>
                    <td class="dataCol">0 (10,000 最大值)</td>
                  </tr>
                  <tr>
                    <td class="labelCol empty">&nbsp;</td>
                    <td class="dataCol col02 empty">&nbsp;</td>
                    <td class="labelCol">受限制的登录，当前月份</td>
                    <td class="dataCol">0 (0 最大值)</td>
                  </tr>
  
                  <tr>
                    <td class="labelCol empty">&nbsp;</td>
                    <td class="dataCol col02 empty">&nbsp;</td>
                    <td class="labelCol">Salesforce.com 组织 ID</td>
                    <td class="dataCol">00D90000000yvHG</td>
                  </tr>
                  <tr>
                    <td class="labelCol empty">&nbsp;</td>
                    <td class="dataCol col02 empty">&nbsp;</td>
                    <td class="labelCol">组织版本</td>
                    <td class="dataCol">Developer Edition</td>
                  </tr>
                  <tr>
                    <td class="labelCol empty">&nbsp;</td>
                    <td class="dataCol col02 empty">&nbsp;</td>
                    <td class="labelCol">实例</td>
                    <td class="dataCol">AP8</td>
                  </tr>
                  <tr>
                    <td class="last labelCol empty">创建人</td>
                    <td class="dataCol last col02 empty"><a
                        href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);">liu
                        jack</a>, 2014-10-8 下午3:12</td>
                    <td class="last labelCol empty">修改人</td>
                    <td class="last dataCol empty"><a
                        href="javascript:srcUp(%27%2F0059000000390Wh%3Fisdtp%3Dp1%26isUserEntityOverride%3D1%26noredirect%3D1%27);">liu
                        jack</a>, 2017-5-13 下午11:37</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tables">
            <div class="panelTableBox">
              <div class="panelTableHead">
                <span class="label">用户许可证可数</span>
                <a href="javascript:;">用户许可证数帮助</a>
              </div>
              <table class="panelTable">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>状态</th>
                    <th class="textRight">许可证总数</th>
                    <th class="textRight">使用的许可证数</th>
                    <th class="textRight">剩余许可证数</th>
                    <th>到期日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Salesforce</td>
                    <td>启用</td>
                    <td class="textRight">2</td>
                    <td class="textRight">2</td>
                    <td class="textRight">0</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="panelTableBox">
              <div class="panelTableHead">
                <span class="label">权限集许可证</span>
                <a href="javascript:;">权限集许可证帮助</a>
              </div>
              <table class="panelTable">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>状态</th>
                    <th class="textRight">许可证总数</th>
                    <th class="textRight">使用的许可证数</th>
                    <th class="textRight">剩余许可证数</th>
                    <th>到期日期</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Identity Connect</td>
                    <td>启用</td>
                    <td class="textRight">10</td>
                    <td class="textRight">0</td>
                    <td class="textRight">10</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="panelTableBox">
              <div class="panelTableHead">
                <span class="label">功能许可证</span>
                <a href="javascript:;">功能许可证帮助</a>
              </div>
              <table class="panelTable">
                <thead>
                  <tr>
                    <th>功能类型</th>
                    <th>状态</th>
                    <th class="textRight">许可证总数</th>
                    <th class="textRight">使用的许可证数</th>
                    <th class="textRight">剩余许可证数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>市场营销用户</td>
                    <td>启用</td>
                    <td class="textRight">2</td>
                    <td class="textRight">2</td>
                    <td class="textRight">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="panelTableBox">
              <div class="panelTableHead">
                <span class="label">基于使用情况的权利</span>
                <a href="javascript:;">基于使用情况的权利帮助</a>
              </div>
              <table class="panelTable">
                <tbody>
                  <tr>
                    <td>没有可显示的记录</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="detailFooter">
            <div @click="scollTop">
              <UpOutlined /><a-button type="link">返回顶部</a-button>
            </div>
          </div>
        </div>
        <div class="EditCompanyInfo" v-else>
          <EditCompanyInfo @cancel="isEdit=false" />
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
  } from "vue";
  import Interface from "@/utils/Interface.js";
  import Dtable from "@/components/Dtable.vue";
  import DTreeTable from "@/components/DTreeTable.vue";
  import ListFormSearch from "@/components/ListFormSearch.vue";
  import EditCompanyInfo from "@/components/EditCompanyInfo.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const contentRef = ref();
  const data = reactive({
    isEdit: false
  });
  const { isEdit } = toRefs(data);
  const onSearch = (e) => { };
  const handleEdit = () => {
    data.isEdit = !data.isEdit;
  }
  const scollTop = () => {
    const upRoll = setInterval(()=>{
      const top = contentRef.value.scrollTop;
      const speed = Math.ceil(top / 10);
      if(contentRef.value.scrollTop > 0){
        contentRef.value.scrollTop -= speed;
      }else {
        clearInterval(upRoll);
      }
    }, 20)
  }
</script>
<style lang="less" scoped>
   .steupHeaderInfo {
    padding: 8px 16px;
    margin: 2px 0 12px 0;
    background: #f3f3f3;
    border-bottom: 1px solid #c9c9c9;
    border-radius: 4px;
    background-clip: padding-box;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid #c9c9c9;
    position: relative;
    z-index: 1;

    .bLeft {
      .setup-header-element {
        display: inline-block;
        margin-right: 10px;
        vertical-align: top;

        .fh-icon_container {
          display: inline-block;
          border-radius: 4px;
          padding: 7px;
          color: #fff;
          background: #2A739E;
          line-height: 1;

          .fh-icon {
            width: 32px;
            height: 32px;
            fill: #fff;
            vertical-align: middle;
          }
        }

        .onesetupBreadcrumbs {
          .breadcrumb {
            font-size: 13px;
            color: #2574A9;
            line-height: 1;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .breadcrumbDetail {
          color: #181818;
          font-weight: 700;
          font-size: 20px;
          line-height: 1.5;
        }

        .uiOutputText {
          padding-top: 8px;
          font-weight: 300;
          font-size: 12px;
        }
      }
    }
  }
  .todo-content {
    height: calc(~"100% - 52px") !important;
    overflow: auto;
    .compProfileInfo {
      height: 100%;
      padding: 0 10px;
      .top {
        padding: 15px 0 0;

        h1 {
          font-size: 14px;
          font-weight: bold;
          color: #4a4a56;
          padding-left: 1px;
        }

        h2 {
          font-size: 24px;
          line-height: 24px;
          font-weight: normal;
        }
      }

      .bDescription {
        margin: 16px 0;
        color: #3c3d3e;
        font-size: 14px;
      }

      .detailInfo {
        margin-top: 20px;

        .detailHead {
          padding: 5px 12px;
          display: flex;

          .headLabel {
            width: 30%;
            font-weight: bold;
          }
        }
  
        .detailBd {
          .infoTable {
            width: 100%;
            border-collapse: collapse;
            tr {
              td {
                border-bottom: 1px solid #ececec;
              }
              td.labelCol {
                padding-top: 3px;
                padding-bottom: 3px;
                padding-right: 10px;
                padding-left: 2px;
                text-align: right;
                font-size: 91%;
                font-weight: bold;
                color: #4a4a56;
              }
  
              td.dataCol {
                width: 32%;
                padding-top: 3px;
                padding-bottom: 3px;
                padding-left: 10px;
                padding-right: 2px;
                text-align: left;
              }
              td.empty{
                border-bottom: none;
              }
            }
          }
        }
      }
      .tables{
      }
      .panelTableBox{
        padding: 10px;
        border-top: 3px solid #747e96;
        border-radius: 4px;
        margin-top: 20px;
        background: #f8f8f8;
        .panelTableHead{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .label{
            font-weight: bold;
          }
          a:hover{
            text-decoration: underline;
          }
        }
        .panelTable{
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          border: 1px solid #e0e3e5;
          thead{
            tr{
              th{
                background: #f2f3f3;
                color: #000;
                font-weight: bold;
                padding: 5px 5px 4px 5px;
                border: 1px solid #e0e3e5;
                text-align: left;
                &.textRight{
                  text-align: right;
                }
              }
              
            }
          }
          tbody{
            tr{
              td{
                padding: 5px 5px 4px 5px;
                text-align: left;
                font-size: 12px;
                &.textRight{
                  text-align: right;
                }
              }
            }
          }
        }
      }
      .detailFooter{
        padding: 10px;
      }
    }
  }
</style>