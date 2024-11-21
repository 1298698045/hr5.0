<template>
    <div>
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content">
                    <img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="pageType">选项列表编辑<span class="titleSeparatingColon">:</span></h1>
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
        <div class="bDescription">选择一个值并使用箭头更改其在列表中的位置。&nbsp;选择一个值作为此选项列表的默认值。</div>
        <div class="bPageBlock brandSecondaryBrd bEditBlock bLayoutBlock secondaryPalette bEditBlock">
            <div class="pbBody">
                <div class="brandTertiaryBgr first pbSubheader tertiaryPalette" id="head_1_ep">
                    <h3>排序选项列表值<span class="titleSeparatingColon">:</span></h3>
                </div>
                <div class="pbSubsection">
                    <table class="detailList" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td class="labelCol empty">&nbsp;</td>
                                <td class="data2Col" colspan="3">
                                    <div class="duelingListBox" id="duel">
                                        <div class="errorMsg" id="editPage_duel_errorMsg" style="display:none">&nbsp;
                                        </div>
                                        <table class="layout">
                                            <tbody>
                                                <tr>
                                                    <td class="selectCell">
                                                        <div class="selectTitle"><label for="duel_select_0">值</label>
                                                        </div>
                                                        <select id="duel_select_0" multiple="multiple"
                                                            name="duel_select_0" size="14" v-model="selectedKeys">
                                                            <option :value="item.Id" v-for="(item, index) in fieldList" :key="index">{{item.Value}}</option>
                                                        </select>
                                                    </td>
                                                    <td class="zen-phs buttonCell">
                                                        <div class="text">顶部</div>
                                                        <div class="text"><a
                                                            href="javascript:void(0)"><img
                                                                    :src="require('@/assets/img/s.gif')" alt="顶部" class="doubleArrowUp"
                                                                    title="顶部"></a></div>
                                                        <div class="text">向上</div>
                                                        <div class="zen-mbs text"><a
                                                                href="javascript:void(0)"
                                                                id="duel_select_0_up" @click="handleMoveUp"><img :src="require('@/assets/img/s.gif')" alt="向上"
                                                                    class="upArrowIcon" title="向上"></a></div>
                                                        <div class="text"><a
                                                            href="javascript:void(0)"
                                                                id="duel_select_0_down" @click="handleMoveDown"><img :src="require('@/assets/img/s.gif')" alt="向下"
                                                                    class="downArrowIcon" title="向下"></a></div>
                                                        <div class="text">向下</div>
                                                        <div class="text"><a
                                                            href="javascript:void(0)"><img
                                                                    :src="require('@/assets/img/s.gif')" alt="底部" class="doubleArrowDwn"
                                                                    title="底部"></a></div>
                                                        <div class="text">底部</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="labelCol"><label for="p14">默认值</label></td>
                                <td class="data2Col" colspan="3"><select id="p14" name="p14">
                                        <option value="">--无--</option>
                                        <option value="01J9000000T1Qgg">No</option>
                                        <option value="01J9000000T1Qgh">Yes</option>
                                    </select></td>
                            </tr>
                            <tr class="detailRow">
                                <td colspan="4">&nbsp;</td>
                            </tr>
                            <tr>
                                <td class="labelCol last empty">&nbsp;</td>
                                <td class="last data2Col" colspan="3"><input id="p15" name="p15" type="checkbox"
                                        value="1"><label for="p15">按字母顺序显示值，而不是输入的顺序</label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="pbBottomButtons">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="pbTitle"><img src="@/assets/img/s.gif" alt="" width="1" height="1" class="minWidth"
                                    title="">&nbsp;</td>
                            <td class="pbButtonb" id="bottomButtonRow">
                                <input value=" 保存 " class="inpBtn" name="save" title="保存" type="submit" @click="handleSave">
                                <input value=" 取消 " class="inpBtn" name="cancel" title="取消" type="button"
                                    @click="handleCancel">
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        toRef
    } from "vue";
    import Interface from "@/utils/Interface.js";
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        pickList: Array
    });
    console.log('pickList',props.pickList);

    // const fieldList = toRef(JSON.parse(JSON.stringify(props.pickList)));
    // console.log("fieldList", fieldList.value);
    const emit = defineEmits(['cancel']);
    const data = reactive({
        fieldList: JSON.parse(JSON.stringify(props.pickList)),
        selectedKeys: [],
        fieldList2: JSON.parse(JSON.stringify(props.pickList)),
        objectTypeCode: route.query.objectTypeCode
    });
    const { fieldList, selectedKeys, fieldList2 } = toRefs(data);
    const handleCancel = () => {
        emit('cancel', false);
    };
    const handleMoveUp = () => {
        let firstSelectedIndex = data.fieldList.findIndex(item=>data.selectedKeys[0] == item.Id);
        if(firstSelectedIndex > 0){
            const itemsToMove = data.selectedKeys.slice();
            console.log("itemsToMove", itemsToMove)
            for(const item of itemsToMove){
                const currentIndex = data.fieldList.findIndex(row=>row.Id==item);
                data.fieldList.splice(currentIndex, 1);
                let item2 = data.fieldList2.find(row=>row.Id==item);
                data.fieldList.splice(currentIndex - 1, 0, item2);
            }
        }
    }
    const handleMoveDown = () => {
        const lastSelectedIndex = data.fieldList.indexOf(item=>data.selectedKeys[data.selectedKeys.length - 1]==item.Id);
          if (lastSelectedIndex < data.fieldList.length - 1) {
            const itemsToMove = data.selectedKeys.slice().reverse();
            let top = itemsToMove.length * 40;
            for (const item of itemsToMove) {
              const currentIndex = data.fieldList.findIndex(row=>row.Id==item);
              data.fieldList.splice(currentIndex, 1);
              let item2 = data.fieldList2.find(row=>row.Id==item);
              data.fieldList.splice(currentIndex + 1, 0, item2);
            }
        }
    }
    const handleSave = () => {
        let obj = {
            ObjectTypeCode: data.objectTypeCode,
            Name: "",
            Ids: data.fieldList.map(item=>item.Id)
        }
        proxy.$post(Interface.objeview.field.sort, {
            message: JSON.stringify(obj)
        }).then(res=>{
            
        });
    }

</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldEdit.less");

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
    .picklistArrowLeft, .picklistArrowRight, .rightArrowIcon, .leftArrowIcon, .doubleArrowUp, .upArrowIcon, .downArrowIcon, .doubleArrowDwn{
        width: 24px;
        height: 20px;
        margin: 0 2px;
        background: transparent url("~@/assets/img/combobox_arrows_sprite.gif") no-repeat;
        vertical-align: middle;
    }
    .doubleArrowUp {
        background-position: left -240px;
    }
    .upArrowIcon {
        background-position: left -120px;
    }
    .downArrowIcon {
        background-position: left -180px;
    }
    .doubleArrowDwn{
        background-position: left -300px;
    }
    table.layout{
        width: auto;
        td{
            vertical-align: middle;
            text-align: center;
        }
        td.buttonCell{
            vertical-align: middle !important;
        }
    }
    .duelingListBox .text{
        padding: 2px 0 2px 0;
        a:hover{
            .doubleArrowUp {
                background-position: left -260px;
            }
            .upArrowIcon {
                background-position: left -140px;
            }
            .downArrowIcon{
                background-position: left -200px;
            }
            .doubleArrowDwn{
                background-position: left -320px;
            }
        }
    }
</style>