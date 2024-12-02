<template>
    <div class="peopleWraper">
        <div class="peopleList">
            <div class="people-item-card" v-for="(item, index) in listData" :key="index">
                <div class="people-item-left">
                    <div class="peopleImg">
                        <img src="@/assets/img/showEmpAvatar.png" alt="">
                    </div>
                </div>
                <div class="people-item-right">
                    <div class="peopleInfo">
                        <div class="peopleName">
                            {{item.FullName.textValue}}
                        </div>
                        <div class="peopleText rowEllipsis">部门:{{item.DeptId.lookupValue.displayName}}</div>
                        <div class="peopleText">职位:{{item.EmpCategoryCode.name}}</div>
                        <div class="peopleText">状态:{{item.StateCode.name}}</div>
                    </div>
                </div>
                <div class="moreBtn">
                    <a-dropdown :trigger="['click']">
                        <a-button class="ant-btn-icon small">
                            <CaretDownOutlined />
                        </a-button>
                        <template #overlay>
                            <a-menu class="fh-menu" @click="(e)=>handleEdit(e, item)">
                                <a-menu-item key="1">编辑</a-menu-item>
                                <a-menu-item key="2">上传</a-menu-item>
                                <a-menu-item key="3">打印</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>
        </div>
        <div class="pagination" v-if="total>pageSize">
            <a-pagination v-model:current="pageNumber" :pageSize="pageSize" :total="total" @change="getQuery" />
        </div>
        <UploadCropImage v-if="isUploadImage" :isShow="isUploadImage" :id="peopleId" @cancel="isUploadImage=false" />
    </div>
</template>
<script setup>
    import { CaretDownOutlined } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, defineProps, defineEmits, defineExpose } from "vue";
    import Toast from "@/utils/toast.js";
    import UploadCropImage from "./UploadCropImage.vue";
    // import Interface from "@/utils/Interface.js";
    // const { proxy } = getCurrentInstance();
    import { getCommonNodesQuery } from "@/utils/commonApi.js";
    const emit = defineEmits(['edit']);
    const props = defineProps({
        filterId: String,
        filterQuery: String
    })
    const data = reactive({
        listData: [],
        pageNumber: 1,
        pageSize: 50,
        total: 0,
        isUploadImage: false,
        peopleId: ""
    });
    const { listData, pageNumber, pageSize, total, isUploadImage, peopleId } = toRefs(data);

    const getQuery = async () => {
        let params = {
            displayColumns: "id,FullName,DeptId,JobTitle,StateCode",
            page: data.pageNumber,
            rows: data.pageSize,
            filterId: props.filterId,
            filterQuery: props.filterQuery
        }
        let res = await getCommonNodesQuery("HREmployee", 30020, params);
        data.listData = res.nodes;
        data.total = res.totalCount;
        // console.log("people-list-card", res);
    };
    getQuery();
    
    const handleEdit = (e, item) => {
        data.peopleId = item.id;
        if(e.key==1){
            emit("edit", item.id);
        }else if(e.key==2){
            data.isUploadImage = true;
        }
    };
    defineExpose({getQuery});
</script>
<style lang="less">
    .peopleWraper{
        width: 100%;
        height: 100%;
        padding: 10px;
        background: #f4f4f4;
        .peopleList{
            display: flex;
            height: calc(100% - 50px);
            flex-wrap: wrap;
            overflow-y: auto;
            .people-item-card{
                width: calc(20% - 10px);
                height: 137px;
                background: #fff;
                border: 1px solid #e2e3e5;
                border-radius: 4px;
                display: flex;
                padding: 10px;
                position: relative;
                margin-bottom: 10px;
                margin-right: 10px;
                overflow: hidden;
                &:nth-child(5n){
                    margin-right: 0;
                }
                &:hover{
                    cursor: pointer;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16)
                }
                .people-item-left{
                    width: 90px;
                    min-width: 90px;
                    max-width: 90px;
                    height: 115px;
                    .peopleImg{
                        width: 90px;
                        height: 115px;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .people-item-right{
                    flex: 1;
                    margin-left: 20px;
                    .peopleInfo{
                        .peopleName{
                            font-size: 16px;
                            font-weight: 700;
                            color: #3067B6;
                            padding-bottom: 10px;
                        }
                        .peopleText{
                            width: 150px;
                            color: #3A3A3A;
                            margin: 4px 0;
                            height: 20px;
                        }
                    }
                }
                .moreBtn{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }
        }
    }
    .pagination{
        margin-top: 10px;
        text-align: right;
        margin-right: 20px;
    }
</style>