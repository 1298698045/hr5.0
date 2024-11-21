<template>
    <div style="padding: 0 12px;" v-if="!isAdd&&!isEdit">
        <div class="bPageTitle">
            <div class="ptBody">
                <div class="content"><img :src="require('@/assets/img/s.gif')" alt="" class="pageTitleIcon" title="">
                    <h1 class="noSecondHeader pageType">客户字段依赖性</h1>
                    <div class="blank">&nbsp;</div>
                </div>
                <div class="links"><a
                        href="javascript:openPopupFocusEscapePounds(%27/HelpAndTrainingDoor?loc=help&amp;target=fields_defining_field_dependencies.htm&amp;section=Customizing%27, %27Help%27, 1024, 768, %27width=1024,height=768,resizable=yes,toolbar=yes,status=yes,scrollbars=yes,menubar=yes,directories=no,location=yes,dependant=no%27, false, false);"
                        title="此页面的帮助 （新窗口）"><span class="helpLink">此页面的帮助</span><img
                            :src="require('@/assets/img/s.gif')" alt="" class="helpIcon"></a></div>
            </div>
            <div class="ptBreadcrumb">
                &nbsp;«&nbsp;<a href="javascript:;" @click="handleBack" style="font-size: 12px;color: #015ba7;">返回文章类型：企业知识库</a>
            </div>
        </div>
        <div class="bDescription">使用此页可以定义字段之间的依赖关系（例如有依赖性的选项列表）。</div>
        <div class="bRelatedList">
            <div class="listRelatedObject setupBlock">
                <div class="bPageBlock brandSecondaryBrd secondaryPalette">
                    <div class="pbHeader">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td class="pbTitle"><img :src="require('@/assets/img/s.gif')" alt="" width="1"
                                            height="1" class="minWidth" title=""><img
                                            :src="require('@/assets/img/s.gif')" alt="" class="relatedListIcon"
                                            title="">
                                        <h3>字段依赖性</h3>
                                    </td>
                                    <td class="pbButton"><input value=" 新建 " class="inpBtn" name="new"
                                            @click="handleNew" title="新建 字段依赖性" type="button"></td>
                                    <td class="pbHelp">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pbBody">
                        <table class="list" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr class="headerRow">
                                    <th class="actionColumn" scope="col">操作</th>
                                    <th scope="col" class=" zen-deemphasize">控制字段</th>
                                    <th scope="col" class=" zen-deemphasize">依赖字段</th>
                                    <th scope="col" class=" zen-deemphasize">修改人</th>
                                </tr>

                                <!-- ListRow -->
                                <tr class="dataRow even last first" v-for="(item, index) in listData" :key="index">
                                    <td class="actionColumn"><a
                                            href="javascript:;"
                                            @click="handleEdit(item)"
                                            class="actionLink" title="编辑 - 记录 1 - 从区域分配规则中排除">编辑</a>&nbsp;|&nbsp;<a
                                            href="javascript:;"
                                            class="actionLink"
                                            title="删除 - 记录 1 - 从区域分配规则中排除" @click="handleDelete(item)">删除</a></td>
                                    <td scope="row" class=" dataCell  ">{{item.Controller}}</td>
                                    <td class=" dataCell  ">{{item.Dependent}}</td>
                                    <td class=" dataCell  ">
                                        <a href="javascript:;">{{item.ModifiedByName || '无'}}</a>,{{item.ModifiedOn}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pbFooter secondaryPalette">
                        <div class="bg"></div>
                    </div>
                </div>
            </div>
            <div class="listElementBottomNav"></div>
            <!-- End ListElement -->
        </div>
    </div>
    <div style="height: 100%;padding: 0 12px;" v-if="isAdd">
        <NewFieldDependent @cancel="isAdd=false" @continue="handleContinue" />
    </div>
    <div style="height: 100%;padding: 0 12px;" v-if="isEdit">
        <!-- <EditFieldDepend :rowData="rowData" @cancel="isEdit=false" /> -->
        <iframe :src="'/iframe/fieldDepend/EditFieldDepend.html?id='+rowData.Id + '&Controller='+ rowData.Controller + '&Dependent=' + rowData.Dependent + '&ControllerName=' + rowData.ControllerName + '&DependentName=' + rowData.DependentName + '&ObjectTypeCode='+ ObjectTypeCode" frameborder="0" style="width: 100%;height: 100%;"></iframe>
    </div>
    <Delete v-if="isDelete" :isShow="isDelete" :external="true" @cancel="isDelete=false" @ok="confirmDelete" desc="是否确定？" />
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
        defineEmits
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    import NewFieldDependent from "@/components/entityDetail/NewFieldDependent.vue";
    import EditFieldDepend from "@/components/entityDetail/EditFieldDepend.vue";
    import Delete from "@/components/listView/Delete.vue";

    import { useRoute } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel']);
    const data = reactive({
        isAdd: false,
        isEdit: false,
        listData: [],
        rowData: "",
        ObjectTypeCode: route.query.objectTypeCode,
        id: route.query.id,
        isDelete: false,
        listId: ""
    });
    const { isAdd, isEdit, listData, rowData, ObjectTypeCode, id, isDelete, listId } = toRefs(data);
    onMounted(()=>{
        window.addEventListener('message', receiveMessage, false);
    });
    const receiveMessage = (e) =>{
        console.log(e);
        if(e.data=='cancel'){
            data.isEdit = false;
        }else if(e.data=='success'){
            data.isEdit = false;
            getQuery();
        }
    }
    const handleNew = () => {
        data.isAdd = true;
    }

    const handleBack = () => {
        emit("cancel", false);
    }
    const handleEdit = (item) => {
        data.rowData = item;
        data.isEdit = true;
    };
    const getQuery = () => {
        proxy.$get(Interface.objeview.field.DependencyList, {
            id: route.query.id
        }).then(res=>{
            data.listData = res.rows;
        })
    };
    getQuery();
    const handleContinue = (e) => {
        console.log(e);
        data.isAdd = false;
        data.isEdit = true;
    };
    const handleDelete = (item) => {
        console.log("item", item);
        data.listId = item.Id;
        data.isDelete = true;
    }
    // 确认删除
    const confirmDelete = (e) => {
        proxy.$post(Interface.objeview.field.DependencyDel, {
            id: data.listId
        }).then(res=>{
            Toast("删除成功!");
            data.isDelete = false;
            getQuery();
        })
    }
</script>
<style lang="less" scoped>
    @import url("@/style/fieldForm.less");
    @import url("@/style/fieldDetail/fieldDetail.less");

    .bPageTitle {
        padding: 15px 0 0;
        margin-bottom: 15px;

        .ptBody {
            color: #000;
            padding: 0;
            overflow: hidden;

            .content {
                float: left;
                width: 70%;
                vertical-align: middle;

                .blank {
                    font-size: 0;
                    clear: both;
                }

                .pageType {
                    color: #000;
                    font-weight: normal;
                    font-size: 20px;
                    white-space: nowrap;
                    padding-left: 1px;
                    font-family: Arial, Helvetica, sans-serif;
                }
            }

            .links {
                padding-right: 5px;
                padding-bottom: 0;
                padding-left: 0;
                float: right;
                text-align: right;
                vertical-align: middle;
                white-space: nowrap;

                a {
                    color: #015ba7;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }

                    .helpIcon {
                        background: transparent url("~@/assets/img/help_orange.png") no-repeat;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }

    .bDescription {
        padding: 0;
        margin: 0 0 16px 0;
        font-size: 12px;
        font-family: 'Helvetica';
        color: #3c3d3e;
    }

    .pageTitleIcon {
        display: none;
    }
    .pbBody{
        table{
            tr{
                background: #fff;
            }
        }
    }
</style>