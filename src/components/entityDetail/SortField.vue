<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="800px"
      :style="setTop"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>排序</div>
      </template>
      <div class="modalContainer" ref="modelContentRef">
        <div class="modalCenter">
          <div class="sortContent">
            <div class="search">
              <a-input-search
                v-model:value="searchVal"
                placeholder="请输入搜索内容"
                @search="getQuery"
              />
            </div>
            <div class="dragWrap">
              <ul class="dragBox" ref="dragRef">
                <draggable :list="listData" group="people" itemKey="list">
                  <template #item="{ element, index }">
                    <li
                      class="fieldItem"
                      :class="[
                        selectedList.indexOf(element.id) > -1 ? 'active' : '',
                      ]"
                      @click="handleSelect(element, index)"
                      :ref="
                        (el) => {
                          setFieldRef(el, item, index);
                        }
                      "
                    >
                      {{ element.label }} {{ element.developerName }}
                    </li>
                  </template>
                </draggable>
              </ul>
              <div class="rightBtns">
                <p @click="handleUp">
                  <a-button :icon="h(UpOutlined)"></a-button>
                </p>
                <p style="margin-top: 10px" @click="handleDown">
                  <a-button :icon="h(DownOutlined)"></a-button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  watch,
  h,
  defineComponent,
  onMounted,
  defineProps,
  toRefs,
  getCurrentInstance,
  defineExpose,
  defineEmits,
  nextTick,
  computed,
} from "vue";
import {
  PieChartOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";

import draggable from "vuedraggable";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const props = defineProps({
  paramsData: Object,
  isShow: Boolean,
  entityId: String,
});

const modelContentRef = ref(null);
const dragRef = ref(null);
const isModal = ref(true);
const labelCol = ref({ style: { width: "100px" } });
const data = reactive({
  listData: [],
  selectedList: [],
  isCtrl: false,
  top: "",
  searchVal: "",
});
const { listData, selectedList, isCtrl, top, searchVal } = toRefs(data);
let itemRefs = [];
onMounted(() => {
  let h = modelContentRef.value.clientHeight;
  data.top = (h + 126) / 2 + "px";
  keyDown();
});
const keyDown = () => {
  // 键盘按下事件
  document.onkeydown = (e) => {
    // 取消默认事件
    // e.preventDefault();
    //事件对象兼容
    let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
    //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40  回车：13   ctrl：17   shift：16
    switch (e1.keyCode) {
      case 17:
        data.isCtrl = true; // 如果ctrl按下就让他按下的标识符变为true
        // console.log("按下了ctrl");
        break;
    }
  };
  // 键盘抬起事件
  document.onkeyup = (e) => {
    // 取消默认事件
    e.preventDefault();
    //事件对象兼容
    let e1 = e || event || window.event || arguments.callee.caller.arguments[0];
    switch (e1.keyCode) {
      case 17:
        data.isCtrl = false; // 如果ctrl抬起下就让他按下的标识符变为false
        // console.log("松开了ctrl");
        break;
    }
  };
};
const getQuery = () => {
  proxy
    .$get(Interface.objeview.objectmanager, {
      entityId: props.entityId,
      search: data.searchVal,
    })
    .then((res) => {
      console.log("res", res);
      data.listData = res.rows;
    });
};
getQuery();
const emit = defineEmits(["cancel"]);
const handleSubmit = () => {
  let obj = {
    message: {
      actions: [
        {
          params: {
            entityId: props.entityId,
            ids: data.listData.map((item) => item.id),
          },
        },
      ],
    },
  };
  let messages = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.objeview.sort, messages).then((res) => {
    Toast("保存成功！");
    handleCancel();
  });
};
const handleCancel = () => {
  emit("cancel", false);
};

defineExpose({ isModal });
const handleSelect = (item, index) => {
  console.log(item, index);
  if (data.isCtrl) {
    if (data.selectedList.indexOf(item.id) > -1) {
      let idx = data.selectedList.findIndex((row) => row.id == item.id);
      data.selectedList.splice(idx, 1);
      // data.selectedList = data.selectedList.filter(row=>row.id !== item.id)
    } else {
      data.selectedList.push(item.id);
    }
  } else {
    data.selectedList = [item.id];
  }
};
const handleUp = () => {
  // console.log("data",data.selectedList);
  // let length = data.selectedList.length;
  // if(length){
  //   let idx = data.listData.findIndex(item=>item.id==data.selectedList[0]);
  //   if(idx>0){
  //     // console.log("idx",idx, data.listData.splice(idx,length));
  //     let moveData = data.listData.splice(idx,length);
  //     data.listData.splice(idx-1, 1, moveData.concat(data.listData));
  //   }
  // }
  itemRefs = [];
  if (data.selectedList.length) {
    let idx = data.listData.findIndex(
      (item) => item.id == data.selectedList[0]
    );
    idx > 0 &&
      data.listData.splice(
        idx - 1,
        1,
        ...data.listData.splice(idx, 1, data.listData[idx - 1])
      );
    nextTick(() => {
      if (idx > 0) {
        // console.log("itemRefs[idx-1].el.scrollTop",itemRefs[idx-1].el.offsetTop);
        // console.log("dragRef.value.scrollTop", dragRef.value.scrollTop);
        dragRef.value.scrollTop = dragRef.value.scrollTop - 30;
      }
    });
  }
};
const handleDown = () => {
  if (data.selectedList.length) {
    let idx = data.listData.findIndex(
      (item) => item.id == data.selectedList[0]
    );
    idx < data.listData.length - 1 &&
      data.listData.splice(
        idx,
        1,
        ...data.listData.splice(idx + 1, 1, data.listData[idx])
      );
    nextTick(() => {
      if (idx < data.listData.length) {
        dragRef.value.scrollTop = dragRef.value.scrollTop + 30;
      }
    });
  }
};
const setFieldRef = (el, item, index) => {
  if (el && el != null) {
    itemRefs.push({
      id: index,
      el,
    });
  }
  // console.log("itemRefs", itemRefs);
};
const setTop = computed(() => ({
  top: `calc(50% - ${data.top})`,
}));
</script>
<style lang="less" scoped>
.ant-modal-content {
  padding: 0 !important;

  .ant-modal-header {
    border-bottom: 2px solid #e5e6eb;
    padding: 12px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }

  .ant-modal-footer {
    border-top: 2px solid #e5e6eb;
    padding: 16px 20px;
    box-sizing: border-box;
  }

  .modalContainer {
    .modalCenter {
      padding: 10px 15px !important;
      box-sizing: border-box;
      height: 300px;
      overflow-y: auto;

      .sortContent {
        width: 80%;
        margin: 0 auto;
      }

      .dragWrap {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .dragBox {
          flex: 1;
          height: 230px;
          border: 1px solid #e2e3e5;
          list-style: none;
          margin-right: 10px;
          overflow: auto;
          position: relative;
          .fieldItem {
            line-height: 30px;
            padding: 0 20px;
            border-bottom: 1px solid #e2e3e5;
            &.active {
              background: var(--textColor);
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
