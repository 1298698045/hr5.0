<template>
  <div class="home">
    <template v-if="!isEdit">
      <div class="todo-head">
        <div class="todo-head-left">
          <h2 class="todo-head-lef-title">详细信息</h2>
        </div>
        <div class="todo-head-right">
          <!-- <a-input-search class="todo-head-right-search" v-model:value="value" placeholder="快速查找" @search="onSearch"/> -->
          <!-- <a-button type="primary" @click="handleEditObj">编辑</a-button>
          <a-button type="primary">发布</a-button>
          <a-button>删除</a-button> -->
          <div class="fh-btn-group">
            <button class="fh-btn" @click="handleEditObj">编辑</button>
            <button class="fh-btn" @click="handleRelease">发布</button>
            <button class="fh-btn" @click="handleDeleteObj">删除</button>
          </div>
        </div>
      </div>
      <div class="todo-content">
        <a-row>
          <a-col span="24" class="wea-left-right-layout-right">
            <div style="height: 100%" ref="contentRef">
              <div class="wea-tabContent" ref="tabContent">
                <div class="tabContent">
                  <div class="basicinfo description">
                    <div class="info-label">描述</div>
                    <div class="info-value">{{ detail.description }}</div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">名称</div>
                    <div class="info-value">{{ detail.Label }}</div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">启用报表</div>
                    <div class="info-value">
                      {{ detail.IsCompactLayoutable ? "已启用" : "未启用" }}
                    </div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">API 名称</div>
                    <div class="info-value">{{ detail.DeveloperName }}</div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">跟踪活动</div>
                    <div class="info-value">
                      {{ detail.IsEditable ? "是" : "否" }}
                    </div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">自定义</div>
                    <div class="info-value">
                      {{ detail.IsCustomEntity ? "是" : "否" }}
                    </div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">跟踪字段历史</div>
                    <div class="info-value">
                      {{ detail.IsLayoutable ? "是" : "否" }}
                    </div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">对象代码</div>
                    <div class="info-value">{{ detail.objectTypeCode }}</div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">部署状态</div>
                    <div class="info-value">
                      {{ detail.InDevelopment == 1 ? "已部署" : "未部署" }}
                    </div>
                  </div>
                  <div class="basicinfo">
                    <div class="info-label">前缀</div>
                    <div class="info-value">{{ detail.entityCode }}</div>
                  </div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </template>
    <NewDefineObj
      v-else
      :id="id"
      :detail="detail"
      @cancel="isEdit = false"
      @ok="getDetail()"
    />
    <Delete
      :isShow="isDelete"
      v-if="isDelete"
      :desc="''"
      @cancel="isDelete = false"
      @ok="confirmDelete"
    >
      <div class="objectManagerCustomFieldDeleteWarning">
        <p>删除一个自定义对象进行以下操作：</p>
        <ul>
          <li>删除该自定义对象的所有记录中当前存在的所有数据</li>
          <li>删除与自定义对象关联的所有跟踪历史数据</li>
          <li>删除对象的自定义选项卡和列表视图</li>
          <li>删除使用该对象的工作流规则和动作</li>
          <li>删除与实体接口和相应字段的所有相关映射</li>
          <li>隐藏自定义对象定义和所有相关定义</li>
          <li>隐藏对象的数据记录和所有相关的数据记录</li>
          <li>禁用其是主对象的报表类型</li>
          <li>禁用其是主对象的自定义报表</li>
          <li>禁用对象上的自定义公式字段</li>
          <li>禁用对象上的自定义验证规则和审批流程</li>
        </ul>
        <p>
          为了保存数据记录以便以后参考，在删除自定义对象前，通过单击“数据 |
          数据导出”来运行数据导出操作。
        </p>
        <p>
          在您删除此自定义对象后，它将在已删除对象列表中显示 15
          天。在此期间，您可以取消删除此自定义对象以恢复它及其存储的所有数据，或永久性删除此自定义对象。取消删除自定义对象时，其中一些属性可能会丢失或更改。15
          天后，对象及其数据将被永久删除。
        </p>
      </div>
    </Delete>
    <ConfirmModal
      :isShow="isConfirm"
      v-if="isConfirm"
      :desc="desc"
      @cancel="isConfirm = false"
      @ok="handleOkConfirm"
    />
  </div>
</template>
<script setup>
import "./detail.less";
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
import {
  ref,
  watch,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onUpdated,
} from "vue";
import Interface from "@/utils/Interface.js";
import Dtable from "@/components/Dtable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import NewDefineObj from "@/components/obj/NewDefineObj.vue";
import Delete from "@/components/listView/Delete.vue";
import ConfirmModal from "@/components/commonModal/ConfirmModal.vue";

const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import moment from "moment";

let data = reactive({
  isEdit: false,
  detail: {},
  id: route.query.id,
  isDelete: false,
  isConfirm: false,
  desc: "是否确定发布此对象？发布对象后，创建实体表",
});
const { isEdit, detail, id, isDelete, isConfirm, desc } = toRefs(data);

if (route.query.id) {
  data.id = route.query.id;
}

//发布
const handleRelease = () => {
  data.isConfirm = true;
};
const handleOkConfirm = () => {
  proxy.$post(Interface.obj.publish, {
    id: data.id
  }).then(res=>{
    Toast("发布成功!");
    data.isConfirm = false;
  })
};

const handleEditObj = () => {
  data.isEdit = true;
};

const getDetail = () => {
  proxy
    .$get(Interface.objeview.objDetail, {
      id: route.query.id,
    })
    .then((res) => {
      data.detail = res;
    });
};
getDetail();

const handleDeleteObj = () => {
  data.isDelete = true;
};
const confirmDelete = () => {
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: route.query.id,
          apiName: "",
          objTypeCode: route.query.objectTypeCode,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.delete, obj).then((res) => {
    console.log("res", res);
    Toast("删除成功！");
    data.isDelete = false;
  });
};
</script>
<style lang="less" scoped>
.todo-head-right
  :where(.css-dev-only-do-not-override-kqecok).ant-input-group-wrapper {
  margin-right: 12px;
}

.home {
  width: 100%;
  height: 100%;
  background: #fff;

  .todo-head {
    width: 100%;
    /* height: 52px;
      line-height: 52px; */
    /* background: #f9f9f9;
      border-bottom: 1px solid #eaeaea; */
    display: flex;
    align-items: center;
    padding: 16px;

    .todo-head-left {
      /* padding-left: 20px; */
      display: flex;
      align-items: center;
      flex: 1;

      .icon-circle-base {
        width: 35px;
        height: 35px;
        background: rgb(0, 121, 222);
        background: url(../../../../../src/assets/entity.png);
        background-position-x: -5px;
        background-position-y: -5px;
        border-radius: 0%;
        margin-right: 10px;
        color: #fff;
      }

      .wea-new-top-title-breadcrumb {
        color: #484a4d;
        margin-left: 3px;
        font-size: 14px;
        font-weight: 500;
      }

      .todo-head-lef-title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
      }
    }

    .todo-head-right {
      padding-right: 14px;
      display: flex;
      align-items: center;

      .btn-drop {
        display: inline-block;
        padding-left: 20px;
        line-height: 40px;
        vertical-align: middle;
        cursor: pointer;
      }

      .ant-btn-group {
        margin-left: 10px;
      }

      .ant-btn {
        margin-left: 10px;
      }
    }
  }

  .todo-content {
    width: 100%;
    height: calc(~"100% - 0px");

    .ant-row {
      height: 100%;

      .wea-left-right-layout-left {
        border-right: 1px solid #eaeaea;

        .wea-left-tree {
          width: 100%;
          height: 100%;

          .wea-left-tree-search {
            width: 100%;
            height: 46px;
            line-height: 46px;
            display: flex;
            align-items: center;
            padding-right: 14px;
            box-sizing: border-box;

            .wea-left-tree-search-label {
              display: inline-block;
              padding-left: 14px;
              min-width: 76px;
              cursor: pointer;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 12px;
            }
          }

          .wea-left-tree-scroll {
            margin-top: 10px;
            width: 100%;
            height: calc(~"100% - 56px");
            overflow: auto;

            .ant-tree-title {
              display: inline-block;
              width: 100%;
            }

            .ant-tree-title > span {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .tree-num {
                padding-right: 10px;
              }
            }
          }
        }
      }

      .wea-left-right-layout-right {
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        position: relative;

        .wea-left-right-layout-btn {
          width: 18px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -30px;
          z-index: 11;
          cursor: pointer;
          background-size: 100% 100%;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
          background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show.png)
            no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
          background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-show-hover.png)
            no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
          background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide.png)
            no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
          background: url(https://enterprise.e-cology.com.cn/cloudstore/resource/pc/com/images/leftTree-hide-hover.png)
            no-repeat -2px 0;
        }
      }

      .wea-tab {
        height: 46px;
      }
    }
  }
}

.tabContent {
  padding: 30px 30px 30px 0px;
}

.basicinfo {
  width: calc(~"50% - 32px");
  float: left;
  height: 48px;
  border-bottom: 1px solid #dedede;
  /* margin-left: 40px;
    margin-bottom: 10px; */
  margin: 16px;
  margin-top: 0;
}

.description {
  width: 100%;
}

.info-value {
  margin-top: 5px;
}

.home .todo-head .todo-head-left .wea-new-top-title-breadcrumb {
  font-weight: 700 !important;
  font-size: 18px !important;
  color: #000 !important;
}

.objectManagerCustomFieldDeleteWarning {
  padding: 16px;

  ul,
  li {
    list-style-type: disc;
    padding-left: 32px;
  }

  li {
    padding-left: 0;
  }

  p {
    margin: 12px 0;
  }
}
</style>
