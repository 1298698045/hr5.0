<template>
    <div class="relatedWrap">
        <div class="relatedHead">
            <a-button @click="handleSetRelated">设置相关列表</a-button>
        </div>
        <div class="relatedList">
            <div class="relatedItem">
                <div class="relatedItemHead">
                    <div class="labelImg">
                        <img :src="require('@/assets/img/case_120.png')" alt="">
                    </div>
                    <div class="label">外出学术活动参会人员<span>(0)</span></div>
                    <div class="editBtn">
                        <a-button @click="handleEditItem">编辑字段</a-button>
                    </div>
                </div>
                <div class="relatedItemBd">

                </div>
            </div>
        </div>
        <RelatedListSort v-if="isRelated" :isShow="isRelated" @cancel="isRelated=false;" />
        <ShowField v-if="isShowField" :isShow="isShowField" @cancel="isShowField=false;" />
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        DeleteOutlined,
        EditOutlined,
        CheckOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, computed, defineEmits } from "vue";
    import Interface from "@/utils/Interface.js";
    import RelatedListSort from "@/components/entityDetail/RelatedListSort.vue";
    import ShowField from "@/components/listView/ShowField.vue";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    const router = useRouter();
    import moment from "moment";
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['cancel']);
    const data = reactive({
        listData: [],
        isRelated: false,
        isShowField: false
    });
    const { listData, isRelated, isShowField } = toRefs(data);

    const handleSetRelated = () => {
        data.isRelated = true;
    };
    const handleEditItem = () => {
        data.isShowField = true;
    };
</script>
<style lang="less" scoped>
    .relatedWrap{
        padding: 50px;
       .relatedHead{
            display: flex;
            justify-content: flex-end;
       }
       .relatedList{
            margin-top: 20px;
            .relatedItem{
                border: 1px solid #dddbda;
                border-radius: 0.25rem;
                position: relative;
                margin-bottom: 0.75rem;
                .relatedItemHead{
                    padding: 0.75rem 1rem;
                    background: #f3f3f3;
                    display: flex;
                    align-items: center;
                    .labelImg{
                        width: 1.5rem;
                        height: 1.5rem;
                        background: #b19f7e;
                        border-radius: .125rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .label{
                        flex: 1;
                        margin-left: 10px;
                    }
                }
                .relatedItemBd{
                    padding: 10px;
                }
            }
       }
    }
</style>