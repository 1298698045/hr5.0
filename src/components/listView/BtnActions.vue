<template>
    <div class="defaultMenu" ref="defaultMenuRef" :style="menuStyle">
        <div class="menuActions" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
            <div class="menuItem" v-for="(item, index) in listBtnActions" :key="index" @click="handleBtnActions(item)">{{item.name}}</div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick, defineProps } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    const props = defineProps({
        menuStyle: Object,
        listBtnActions: Array
    });
    const emit = defineEmits(['change']);
    const defaultMenuRef = ref(null);

    const data = reactive({
        height: "",
    })
    const { height } = toRefs(data);

    onMounted(()=>{
        nextTick(()=>{
            data.height = defaultMenuRef.value.clientHeight;
            console.log("data.height", data.height);
        });
    })

    const handleBtnActions = (item) => {
        emit('change', item);
    }
</script>
<style lang="less" scoped>
    
</style>