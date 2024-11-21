<template>
    <div class="cardItem widgetItem card-header" :class="themeType">
        <!-- <div class="card-header">
            <div class="header-title">{{item.name}}</div>
        </div> -->
        <div class="statsCard_content">
            <div class="stats-card-container">
                <template v-if="imgPosition=='right'">
                    <div class="stats-card-left">
                        <h3 style="color: rgb(47, 90, 165); font-weight: 500; font-size: 30px;">{{num}}</h3>
                        <span class="inlie-block rowEllipsis">{{item.properties.title}}</span>
                    </div>
                    <div class="stats-card-right">
                        <img src="@/assets/img/loginLogo.png" alt="">
                    </div>
                </template>
                <template v-else>
                    <div class="stats-card-left">
                        <div style="width: 80px;">
                            <img src="@/assets/img/loginLogo.png" alt="">
                        </div>
                    </div>
                    <div class="stats-card-right">
                        <div>
                            <h3 style="color: rgb(47, 90, 165); font-weight: 500; font-size: 30px;">{{num}}</h3>
                            <span class="inlie-block rowEllipsis">{{item.properties.title}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, onMounted, nextTick, computed, watch } from "vue";
    import * as echarts from "echarts";
    import Toast from "@/utils/toast.js";
    import { useStore } from "@/store/portal";
    const store = useStore();
    const emit = defineEmits(['change']);
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });
    const data = reactive({
        num: 0
    });
    const { num } = toRefs(data);

    onMounted(()=>{

    })

    const imgPosition = computed(()=>{
        return props.item.properties.img.position;
    });

    const getQuery = async (id='') => {
        if(props.item.id || id){
            let res = await store.getLoadComponents(props.item.id || id);
            // console.log("statscard-res", res);
            if(res.actions[0].returnValue){
                let { componentData, dashboardComponentMetadata } = res.actions[0].returnValue;
                data.num = componentData.value;
                emit("change", dashboardComponentMetadata);
            }
        }
    };
    getQuery();

    watch(()=> store.isRefresh,(newVal, oldVal)=>{
        if(store.isRefresh && store.currentData.type=='statcard'){
            Toast('保存成功!');
            if(props.item.id == store.currentData.id){
                getQuery();
            }else if(props.item.id == ''){
                getQuery(store.currentData.id);
            }
        }
    });

</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
    .statsCard_content{
        padding: 5px 10px;
        flex: 1 1 auto;
        height: 100%;
        overflow: auto;
        .stats-card-container{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            background-color: #fff;
            color: #666666;
            .stats-card-left{
                flex: 3 1;
                display: flex;
                flex-direction: column;
                margin: 6px 0 0 10px;
            }
            .stats-card-right{
                flex: 1 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            img{
                width: 100%;
                /* height: 100%; */
            }
        }
    }
</style>