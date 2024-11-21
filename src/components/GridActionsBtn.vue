<template>
    <div class="defaultMenu" ref="defaultMenuRef" :style="menuStyle" @click.stop>
        <div class="menuActions" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
            <div class="menuItem" @click="handleEdit">编辑</div>
            <div class="menuItem">查看</div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits } from "vue";
    
</script>
<style lang="less" scoped>
    .defaultMenu{
      position: absolute;
      top: 0;
      z-index: 999;
      .menuActions{
        background: #fff;
      }
      .menuItem{
        min-width: 98px;
        line-height: 35px;
        cursor: pointer;
        padding: 0 12px;
        &:hover{
          background: #f3f3f3;
        }
      }
    }
</style>