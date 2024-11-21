<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="80%"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">选择人员/小组</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="人员类型">
                            <a-radio-group v-model:value="formState.peopleType" @change="changePeopleType">
                                <a-radio value="U">用户</a-radio>
                                <a-radio value="A">角色</a-radio>
                                <a-radio value="P">个人小组</a-radio>
                                <a-radio value="R">公共小组</a-radio>
                                <a-radio value="B">部门</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <div class="search">
                            <a-input-search
                                v-model:value="searchVal"
                                placeholder="请输入搜索字符"
                                style="width: 200px"
                                @search="onSearch"
                            />
                        </div>
                        <div class="peopleBox">
                            <div class="deptTree" v-if="formState.peopleType=='U'">
                                <div class="deptName">部门</div>
                                <div class="treeBody">
                                    <a-tree  @select="handleSelectTree" block-node :tree-data="treeData">
                                        <template  #title="{name, key }">
                                            <span>{{name}}</span>
                                        </template>
                                    </a-tree>
                                </div>
                            </div>
                            <!-- <a-transfer
                                v-model:target-keys="targetKeys"
                                v-model:selected-keys="selectedKeys"
                                :data-source="listData"
                                :list-style="{
                                    width: '260px',
                                    height: '280px',
                                }"
                                :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                show-search
                                :titles="['可用', '已选']"
                                :render="item => item.name"
                                :disabled="disabled"
                                @change="handleChange"
                                @selectChange="handleSelectChange"
                            /> -->
                            <div v-if="formState.peopleType=='U'">
                              <a-transfer
                                  v-model:target-keys="userTargetKeys"
                                  v-model:selected-keys="userSelected"
                                  :data-source="users"
                                  :list-style="{
                                      width: '260px',
                                      height: '280px',
                                  }"
                                  :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                  show-search
                                  :titles="['可用', '已选']"
                                  :render="item => item.name"
                                  :disabled="disabled"
                                  @change="handleChange"
                                  @selectChange="handleSelectChange"
                              />
                            </div>
                            <div v-else-if="formState.peopleType=='A'">
                              <a-transfer
                                  v-model:target-keys="roleTargetKeys"
                                  v-model:selected-keys="roleSelected"
                                  :data-source="roles"
                                  :list-style="{
                                      width: '260px',
                                      height: '280px',
                                  }"
                                  :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                  show-search
                                  :titles="['可用', '已选']"
                                  :render="item => item.name"
                                  :disabled="disabled"
                                  @change="handleChange"
                                  @selectChange="handleSelectChange"
                              />
                            </div>
                            <div v-else-if="formState.peopleType=='P'">
                              <a-transfer
                                  v-model:target-keys="pGroupTargetKeys"
                                  v-model:selected-keys="pGroupSelectedKeys"
                                  :data-source="personalGroupUsers"
                                  :list-style="{
                                      width: '260px',
                                      height: '280px',
                                  }"
                                  :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                  show-search
                                  :titles="['可用', '已选']"
                                  :render="item => item.name"
                                  :disabled="disabled"
                                  @change="handleChange"
                                  @selectChange="handleSelectChange"
                              />
                            </div>
                            <div v-else-if="formState.peopleType=='R'">
                              <a-transfer
                                  v-model:target-keys="groupTargetKeys"
                                  v-model:selected-keys="groupSelected"
                                  :data-source="groups"
                                  :list-style="{
                                      width: '260px',
                                      height: '280px',
                                  }"
                                  :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                  show-search
                                  :titles="['可用', '已选']"
                                  :render="item => item.name"
                                  :disabled="disabled"
                                  @change="handleChange"
                                  @selectChange="handleSelectChange"
                              />
                            </div>
                            <div v-else-if="formState.peopleType=='B'">
                              <!-- <a-transfer
                                  v-model:target-keys="businessUnitTargetKeys"
                                  v-model:selected-keys="businessUnitSelected"
                                  :data-source="businessUnits"
                                  :list-style="{
                                      width: '260px',
                                      height: '280px',
                                  }"
                                  :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                                  show-search
                                  :titles="['可用', '已选']"
                                  :render="item => item.name"
                                  :disabled="disabled"
                                  @change="handleChange"
                                  @selectChange="handleSelectChange"
                              /> -->
                              <a-transfer
                                  style="width: 800px;height: 400px;"
                                  v-model:target-keys="businessUnitTargetKeys"
                                  :data-source="businessUnits"
                                  :render="item => item.name"
                                  :show-select-all="false"
                                >
                                  <template #children="{ direction, selectedKeys, onItemSelect }">
                                    <a-tree
                                      style="height: 360px;overflow-y: auto"
                                      v-if="direction === 'left'"
                                      block-node
                                      checkable
                                      check-strictly
                                      default-expand-all
                                      :checked-keys="[...selectedKeys, ...businessUnitTargetKeys]"
                                      :tree-data="treeData2"
                                      @check="
                                        (_, props) => {
                                          onChecked(props, [...selectedKeys, ...businessUnitTargetKeys], onItemSelect);
                                        }
                                      "
                                      @select="
                                        (_, props) => {
                                          onChecked(props, [...selectedKeys, ...businessUnitTargetKeys], onItemSelect);
                                        }
                                      "
                                    >
                                      <template  #title="{name, key }">
                                          <span>{{name}}</span>
                                      </template>
                                    </a-tree>
                                  </template>
                              </a-transfer>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">流程变量</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人">
                          <a-checkbox v-model:checked="formState.Variables.checked0.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="流程参与人">
                          <a-checkbox v-model:checked="formState.Variables.checked1.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人部门负责人">
                          <a-checkbox v-model:checked="formState.Variables.checked2.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="发起人部门分管领导">
                          <a-checkbox v-model:checked="formState.Variables.checked3.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="与发起人相同部门人员">
                          <a-checkbox v-model:checked="formState.Variables.checked4.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="主管部门负责人">
                          <a-checkbox v-model:checked="formState.Variables.checked5.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="发起人部门分管业务领导">
                          <a-checkbox v-model:checked="formState.Variables.checked6.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="发起人的护士长">
                          <a-checkbox v-model:checked="formState.Variables.checked7.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">节点流程变量</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="StepVariablesId" label="节点">
                            <a-select v-model:value="formState.StepVariablesId">
                                <a-select-option :value="item.id" v-for="(item, index) in flowNodes" :key="index">{{item.Name.textValue}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点相同办理人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked0.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门负责人">
                          <a-checkbox v-model:checked="formState.StepVariables.checked1.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门分管领导">
                          <a-checkbox v-model:checked="formState.StepVariables.checked2.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked3.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同岗位类别人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked4.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同职务人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked5.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的部门的相同职称人员">
                          <a-checkbox v-model:checked="formState.StepVariables.checked6.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item label="来源节点办理人的护士长">
                          <a-checkbox v-model:checked="formState.StepVariables.checked7.checkbox"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">条件查询</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="查询范围">
                            <a-radio-group v-model:value="formState.scope">
                                <a-radio value="all">全部</a-radio>
                                <a-radio value="draftby">发起人所在部门</a-radio>
                                <a-radio value="step">来源节点</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <FilterQuery :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
                    </div>
                </div>
              </div>
            </a-form>
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
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    defineProps,
    defineExpose,
    defineEmits,
    toRaw,
    inject,
    computed
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
import { formTreeData } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
//   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    folderName: String,
    folderPicker: String,
    ObjectTypeCode: String,
    id: String,
    stepId: String,
    stepCode: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const data = reactive({
    title: "办理人员",
    height: document.documentElement.clientHeight - 300,
    treeData: [],
    entityRightList: [],
    tableRight: {},
    listData: [],
    targetKeys: [],
    selectedKeys: [],
    deptId: "",
    searchVal: "",
    disabled: false,
    FilterExpresssionList: [],
    filterExpression: "",
    processId: "",
    users: [],
    roles: [],
    personalGroupUsers: [],
    groups: [],
    userTargetKeys: [],
    userSelected: [],
    roleTargetKeys: [],
    roleSelected: [],
    pGroupTargetKeys: [],
    pGroupSelectedKeys: [],
    groupTargetKeys: [],
    groupSelected: [],
    businessUnits: [],
    businessUnitTargetKeys: [],
    businessUnitSelected: [],
    flowNodes: []
  });
  const {
    title, searchVal, disabled, processId,
    height, treeData, deptId, entityRightList, tableRight, listData, targetKeys, selectedKeys, FilterExpresssionList, filterExpression,
    users, roles, personalGroupUsers, groups,
    userTargetKeys, userSelected, roleTargetKeys,
    roleSelected,
    pGroupTargetKeys,
    pGroupSelectedKeys,
    groupTargetKeys,
    groupSelected, businessUnits, businessUnitTargetKeys, businessUnitSelected, flowNodes
  } = toRefs(data);
  const formState = reactive({
    peopleType: "U",
    name: "",
    StepVariablesId: "",
    Variables: {
        checked0: {
            id: "",
            checkbox: false,
            name: "发起人",
            value: "00000000-0000-0000-0000-000000000001"
        },
        checked1: {
            id: "",
            checkbox: false,
            name: "流程参与人",
            value: "00000000-0000-0000-0000-000000000002"
        },
        checked2: {
            id: "",
            checkbox: false,
            name: "发起人部门负责人",
            value: "00000000-0000-0000-0000-000000000003"
        },
        checked3: {
            id: "",
            checkbox: false,
            name: "发起人部门分管领导",
            value: "00000000-0000-0000-0000-000000000004"
        },
        checked4: {
            id: "",
            checkbox: false,
            name: "与发起人相同部门人员",
            value: "00000000-0000-0000-0000-000000000006"
        },
        checked5: {
            id: "",
            checkbox: false,
            name: "主管部门负责人",
            value: "00000000-0000-0000-0000-000000000007"
        },
        checked6: {
            id: "",
            checkbox: false,
            name: "发起人部门分管业务领导",
            value: "00000000-0000-0000-0000-000000000041"
        },
        checked7: {
            id: "",
            checkbox: false,
            name: "发起人的护士长",
            value: "00000000-0000-0000-0000-000000000020"
        },
    },
    StepVariables: {
        checked0: {
            id: "",
            checkbox: false,
            name: "来源节点相同办理人员",
            value: "00000000-0000-0000-0000-000000000042"
        },
        checked1: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门负责人",
            value: "00000000-0000-0000-0000-000000000043"
        },
        checked2: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门分管领导",
            value: "00000000-0000-0000-0000-000000000044"
        },
        checked3: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门人员",
            value: "00000000-0000-0000-0000-000000000045"
        },
        checked4: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门的相同岗位类别人员",
            value: "00000000-0000-0000-0000-000000000046"
        },
        checked5: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门的相同职务人员",
            value: "00000000-0000-0000-0000-000000000047"
        },
        checked6: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的部门的相同职称人员",
            value: "00000000-0000-0000-0000-000000000048"
        },
        checked7: {
            id: "",
            checkbox: false,
            name: "来源节点办理人的护士长",
            value: "00000000-0000-0000-0000-000000000060"
        },
    },
    scope: "all"
  });

  const onSearch = (e) => {

  }

  const getNodeList = () => {
    let d = {
      filterId: "",
      entityType: "WFStep",
      filterQuery: "\nProcessId\teq\t"+props.id
    };
    proxy.$post(Interface.list2, d).then(res=>{
      data.flowNodes = res.nodes;
    })
  };
  getNodeList();
  // 获取人员
  const getParticipants = () => {
    let obj = {
      actions:[{
        id: "562;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          id: props.stepId
        }
      }]
    };
    let d = {
      message: JSON.stringify(obj)
    };
    proxy.$post(Interface.workflow.getParticipants, d).then(res=>{
      let { Users, Roles, Groups, BusinessUnits, Variables, ActivityVariables, Filter } = res.actions[0].returnValue;
      data.userTargetKeys = Users.map(item=>item.UserId);
      data.roleTargetKeys = Roles.map(item=>item.RoleId);
      data.groupTargetKeys = Groups.map(item=>item.GroupId);
      data.businessUnitTargetKeys = BusinessUnits.map(item=>item.BusinessUnitId);
      Variables.forEach(item=>{
        for(let key in toRaw(formState.Variables)){
          if(toRaw(formState.Variables)[key].value == item.VariableId){
            toRaw(formState.Variables)[key].checkbox = true;
            toRaw(formState.Variables)[key].id = item.Id;
          };
        }
      })
      ActivityVariables.forEach(item=>{
        for(let key in formState.StepVariables){
          if(formState.StepVariables[key].value == item.VariableId){
            formState.StepVariables[key].checkbox = true;
            formState.StepVariables[key].id = item.Id;
          };
        }
      })
      data.FilterExpresssionList = Filter.FilterExpresssion.map(item=>{
        item.attribute = item.column;
        return item;
      })
    })
  };
  getParticipants();


  function isChecked(selectedKeys, eventKey) {
    return selectedKeys.indexOf(eventKey) !== -1;
  }
  function handleTreeData(treeNodes, targetKeys = []) {
    return treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: targetKeys.includes(props.key),
      children: handleTreeData(children ?? [], targetKeys),
    }));
  };
  const onChecked = (e, checkedKeys, onItemSelect) => {
    const { eventKey } = e.node;
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
  };


  const getTree = async () => {
    let response;
    await proxy.$get(Interface.deptTree,{
        
    }).then(res=>{
      response = res;
      let listData = res.actions[0].returnValue;
      listData = listData.map(item=>{
        item.key = item.id;
        return item;
      });
      data.treeData = formTreeData(listData, 'id', 'parentId');
      data.businessUnits = listData;
      data.deptId = data.treeData[0].id;
      getDeptUser();
    })
    return response;
  }
  getTree();
  // getTree().then(res=>{
  //   const transferDataSource = [];
  //   function flatten(list = []) {
  //     list.forEach(item => {
  //       transferDataSource.push(item);
  //       flatten(item.children);
  //     });
  //   }
  //   flatten(JSON.parse(JSON.stringify(data.treeData)));
  //   console.log('transferDataSource',transferDataSource);
  //   data.businessUnits = transferDataSource;
  // });
  
  const treeData2 = computed(() => {
    return handleTreeData(data.treeData, data.businessUnitTargetKeys);
  });

  const getDeptUser = () => {
    let d = {
        filterId: "",
        entityType: "SystemUser",
        displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
        // filterQuery: "\nBusinessUnitId\teq\t" + data.deptId
    };
    proxy.$post(Interface.list2, d).then(res=>{
      let nodes = res.nodes;
      data.users = nodes.map(item=>{
        // item.key = '8:' + item.id;
        // item.name = '用户:'+item.FullName.textValue;
        item.key = item.id;
        item.name = item.FullName.textValue;
        return item;
      })
    })
  };
  const handleSelectTree = (selectedKeys,selectedNodes) => {
    console.log("selectedKeys,selectedNodes", selectedKeys,selectedNodes);
        // data.deptId = [selectedNodes.node.id];
        // getUserQuery(selectedNodes.node.id);
      data.deptId = selectedNodes.node.id;
      getDeptUser();
  }
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        // console.log('targetKeys: ', nextTargetKeys);
        // console.log('direction: ', direction);
        // console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        // console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const changePeopleType = (e) => {
        console.log("e",formState.peopleType);
        let type = formState.peopleType;
        if(type=='U'){
            // 8
            getDeptUser();
        }else if(type=='A'){
            // 1036
            getRoleUser();
        }else if(type=='P'){
            // 9
            getGroupQuery('public');
        }else if(type=='R'){
            // 9
            getGroupQuery('owner');
        } else if(type=='B'){}
    }
    // 用户
    const getUserQuery = (deptId) => {
        proxy.$get(Interface.flow.userList,{
            businessUnitId: deptId
        }).then(res=>{
            // data.listData = res.listData.map(item=>{
            //     item.key = '8:' + item.systemUserId;
            //     item.name = '用户:'+item.fullName+'/'+item.BusinessUnitIdName;
            //     return item;
            // });
            let nodes = res.nodes;
            data.listData = nodes.map(item=>{
              item.key = '8:' + item.id;
              item.name = '用户:'+item.Name.textValue;
              return item;
            })
        })
    }
    // 角色
    const getRoleUser = () => {
        let d = {
            filterId: "",
            entityType: "Role",
            displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
        };
        proxy.$get(Interface.list2, d).then(res=>{
            // data.listData = res.listData.map(item=>{
            //     item.key = '1036:'+item.RoleId;
            //     item.name = '角色:' + item.Name
            //     return item;
            // });
            let nodes = res.nodes;
            data.roles = nodes.map(item=>{
              // item.key = '1036:' + item.id;
              // item.name = '角色:'+item.Name.textValue;
              item.key = item.id;
              item.name = item.Name.textValue;
              return item;
            })
        })
    }
    // getUserQuery();
    const getGroupQuery = (scope) => {
        let str = '';
        let filterquery = '';
        if(scope=='public'){
            str = '个人小组:';
            filterquery = "\nOwningUser\teq-userid";
        }else {
            str = '公共小组:';
            filterquery = "\nIsPublic\teq\ttrue";
        }
        let d = {
            filterId: "",
            entityType: "Group",
            displayColumns: "id,Name,IsPublic,FullName,OwningUser,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
            filterQuery: filterquery
        };
        proxy.$get(Interface.list2, d).then(res=>{
          console.log("scope", scope);
            let nodes = res.nodes;
            if(scope=='public'){
              data.personalGroupUsers = nodes.map(item=>{
                  item.key = item.id;
                  item.name = item.Name.textValue;
                  return item;
              });
            }else {
              data.groups = nodes.map(item=>{
                  item.key = item.id;
                  item.name = item.Name.textValue;
                  return item;
              });
            }
            // data.listData = nodes.map(item=>{
            //     item.key = '9:' + item.id;
            //     item.name = str + item.Name.textValue;
            //     return item;
            // });
        })
    }
    const getDetail = () => {
        proxy.$get(Interface.flow.handleDetail,{
            ProcessId: data.processId,
            StepId: props.stepId,
            StepCode: props.stepCode
        }).then(res=>{
            let Variables = res.Variables;
            Variables.forEach(item=>{
                for(let key in formState.Variables){
                    if(item.Id==formState.Variables[key].value){
                        formState.Variables[key].checkbox = true;
                    }
                }
            });
            let StepVariables = res.StepVariables;
            StepVariables.Variables.forEach(item=>{
                for(let key in formState.StepVariables){
                    if(item.Id==formState.StepVariables[key].value){
                        formState.StepVariables[key].checkbox = true;
                    }
                }
            })
            let Groups = res.Groups;
            Groups.forEach(item=>{
                data.targetKeys.push(item.ObjectTypeCode+':'+item.Id);
            })
            formState.scope = res.FilterScope.Scope;
            data.FilterExpresssionList = res.FilterExpresssion;
        })
    }
  // getDetail();
  // 获取筛选器的数据
  const getFilterQuery = (e) => {
    console.log("e", e);
    data.filterExpression = e;
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  const saveParticipants = () => {
    let Variables = [];
    let StepVariables = [];
    for (var i = 0; i < 7; i++) {
        if (formState.Variables['checked' + i].checkbox) {
            Variables.push({
                Id: formState.Variables['checked' + i].id,
                VariableId: formState.Variables['checked' + i].value,
                Name: formState.Variables['checked' + i].name
            })
        }
        if (formState.StepVariables['checked' + i].checkbox) {
            StepVariables.push({
                Id: formState.Variables['checked' + i].id,
                VariableId: formState.Variables['checked' + i].value,
                Name: formState.Variables['checked' + i].name
            })
        }
    };
    let Users = [];
    let Roles = [];
    let Groups = [];
    let BusinessUnits = [];
    let userFilter = data.users.filter(item=>{
      return data.userTargetKeys.find(row=>{
        return item.id == row;
      })
    });
    userFilter.forEach(item=>{
      Users.push({
        Id: "",
        UserId: item.id,
        Name: item.name
      })
    });
    let rolesFilter = data.roles.filter(item=>{
      return data.roleTargetKeys.find(row=>{
        return item.id == row;
      })
    });
    rolesFilter.forEach(item=>{
      Roles.push({
        Id: "",
        RoleId: item.id,
        Name: item.name
      })
    });
    let groupsFilter = data.groups.filter(item=>{
      return data.groupTargetKeys.find(row=>{
        return item.id == row;
      })
    });
    groupsFilter.forEach(item=>{
      Groups.push({
        Id: "",
        GroupId: item.id,
        Name: item.name
      })
    });
    let businessUnitsFilter = data.businessUnits.filter(item=>{
      return data.businessUnitTargetKeys.find(row=>{
        return item.id == row;
      })
    });
    businessUnitsFilter.forEach(item=>{
      BusinessUnits.push({
        Id: "",
        BusinessUnitId: item.id,
        Name: item.name
      })
    });

    let obj = {
      actions:[{
        params: {
          StepId: props.stepId,
          StepCode: null,
          Name: "",
          ProcessId: props.id,
          Variables: Variables,
          ActivityVariables: StepVariables,
          Groups: Groups,
          Roles: Roles,
          Users: Users,
          BusinessUnits: BusinessUnits,
          Filter: {
            Id: null,
            FilterExpresssion: JSON.parse(data.filterExpression),
            FilterScope: {
              Scope: "all",
              FromStepId: "",
              FromStepName: ""
            }
          }
        }
      }]
    }
    let d = {
      message: JSON.stringify(obj)
    }
    proxy.$post(Interface.workflow.saveParticipants, d).then(res=>{
      Toast("保存成功！");
      emit("cancel", false);
      emit("load", false);
    })
  }
  const handleSubmit = () => {
    saveParticipants();
    return false;
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let Variables = [];
        let StepVariables = [];
        for (var i = 0; i < 7; i++) {
            if (formState.Variables['checked' + i].checkbox) {
                Variables.push({
                    Id: formState.Variables['checked' + i].value,
                    Name: formState.Variables['checked' + i].name
                })
            }
            if (formState.StepVariables['checked' + i].checkbox) {
                StepVariables.push({
                    Id: formState.Variables['checked' + i].value,
                    Name: formState.Variables['checked' + i].name
                })
            }
        }
        console.log("Variables:",Variables);
        console.log("StepVariables:", StepVariables);
        console.log("targetKeys:", data.targetKeys, data.listData);
        let Groups = [];
        data.listData.forEach(item=>{
            data.targetKeys.forEach(row=>{
                if(item.key == row){
                    Groups.push({
                        Id: item.key.split(":")[1],
                        ObjectTypeCode: item.key.split(":")[0],
                        Name: item.name
                    })
                }
            })
        })
        let obj = {
            Participantors: {
                StepId: props.stepId,
                StepCode: props.stepCode,
                ProcessId: data.processId,
                Name: "",
                Variables : Variables,
                StepVariables: {
                    Name: "",
                    FromStepId: "",
                    Variables: StepVariables
                },
                Groups: Groups,
                FilterExpresssion: data.filterExpression,
                FilterScope: {
                    FromStepId: "",
                    FromStepName: "",
                    Scope: formState.scope
                }
            }
        };
        let params = {
            messages: JSON.stringify(obj)
        };
        
        proxy.$get(Interface.flow.savePerm, params).then((res) => {
            Toast("保存成功！");
            emit("cancel", false);
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
  }
  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }
    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      .sectionItem {
        flex: 1;
        margin-right: 20px;
        .ant-row {
          display: block !important;
        }
      }
      .sectionItem:last-child {
        margin-right: 0;
      }
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }
  .ant-form-item {
    position: relative;
  }
  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .treeBox{
    width: 300px;
    height: 300px;
    border: 1px solid #e2e3e5;
    border-radius: 5px;
    overflow: auto;
  }
  .tablePerm{
    width: 100%;
    border-collapse: collapse;
    thead{
        background: #f2f2f2;
    }
    tr{
        border-bottom: 1px solid #dedede;
        th{
            text-align: left;
        }
        td{
            padding: 10px 0;
        }
    }
  }
  .childRightText{
    padding-left: 10px;
    padding-right: 5px;
  }
  .peopleBox{
    display: flex;
    margin: 10px 0;
    .deptTree{
        width: 300px;
        height: 300px;
        border: 1px solid #e2e3e5;
        margin-right: 10px;
        .deptName{
            height: 30px;
            line-height: 30px;
            background: #f4f4f4;
            padding-left: 10px;
        }
        .treeBody{
            height: calc(~"100% - 30px");
            overflow: auto;
        }
    }
  }
  </style>
  