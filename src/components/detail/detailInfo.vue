<template>
    <div class="detailInfo">
        <div class="fh-section" v-for="(item, index) in layoutList" :key="index">
            <div class="fh-section-label">{{item.title}}</div>
            <div class="section-content">
                <div class="sectionRow" v-for="(row, rowIdx) in item.rows" :key="rowIdx">
                    <div class="sectionCol" v-for="(attr, attrIdx) in row.attributes" :key="attrIdx">
                        <div class="sectionCol_label">
                            {{attr.label}}
                        </div>
                        <div class="sectionCol_body">
                            <div class="ownerName">
                                <!-- <div class="uiImage">
                                    <img :src="require('@/assets/img/T.jpg')" alt="">
                                </div> -->
                                <!-- <a href="javascript:;" class="textUnderline">
                                    {{list[attr.localId].displayValue}}
                                </a> -->
                                <span>{{list[attr.localId]?.displayValue}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    import { CloseOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        id: String,
        objectTypeCode: [Number, String],
        entityApiName: String
    });

    const data = reactive({
        layoutList: [],
        list: {}
    });
    const { layoutList, list } = toRefs(data);
    const getLayout = () => {
        let obj = {
            actions:[{
                id: "7366;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    entityApiName: props.entityApiName,
                    defaultFieldValues: {
                        entityId: ""
                    },
                    mode: "CREATE",
                    type: "FULL",
                    layoutOverride: "",
                    inContextOfComponent: "",
                    pageSize: -1,
                    offset: 0
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.formCommon.layout, d).then(res=>{
            console.log("res", res);
            let { layout, record } = res.actions[0].returnValue;
            data.layoutList = layout.sections;
            data.list = JSON.parse(JSON.stringify(record.fields));
        })
    };
    getLayout();
    const getDetail = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    apiName: props.entityApiName
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            console.log("res", res);
        })
    };
    // getDetail();
</script>
<style lang="less" scoped>
    .detailInfo{
        .fh-section{
            margin-bottom: 8px;
            .fh-section-label{
                background: #f2f2f2;
                padding: 0 15px;
                line-height: 32px;
                border-radius: 4px;
            }
            .section-content{
                overflow: visible;
                visibility: visible;
                opacity: 1;
                height: auto;
                .sectionRow{
                    padding: 0 16px;
                    display: flex;
                    .sectionCol{
                        margin-left: 0;
                        margin-right: 16px;
                        padding: 8px 4px;
                        flex: 1 1 0%;
                        min-width: 0;
                        border-bottom: 1px solid #c9c9c9;
                        display: flex;
                        align-items: center;
                        .sectionCol_label{
                            width: 23%;
                        }
                        .sectionCol_body{
                            display: flex;
                            align-items: center;
                            .ownerName{
                                display: flex;
                                .uiImage{
                                    width: 24px;
                                    height: 24px;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    margin-right: 4px;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                a{
                                    margin: 0 2px;
                                    color: #0b5cab;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>