<template>
    <div>
        <Ztype v-show="type=='Z'" :type="type" @next="handleNext" @prev="handlePrev" @cancel="handleCancel"></Ztype>
        <Ytype v-show="type=='Y'||type=='x'||type=='Y_MD'" :type="type" @next="handleNext" @prev="handlePrev" @cancel="handleCancel"></Ytype>
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
        defineEmits
    } from "vue";
    import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Ztype from "@/components/entityDetail/newField2/Ztype.vue";
    import Ytype from "@/components/entityDetail/newField2/Ytype.vue";
    const props = defineProps({
        type: [String, Number]
    });
    const emit = defineEmits(['prev', 'next', 'cancel']);
    const handleNext = (current) => {
        emit("next", current);
    }
    const handlePrev = (current) => {
        emit("prev", current);
    };
    const handleCancel = () => {
        emit("cancel", false);
    };
</script>