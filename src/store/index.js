import { createStore } from "vuex";

export default createStore({
  state: {
    collapsed: false,
    moduleName: "对象管理器",
    recordForm: {}
  },
  mutations: {
    setCollapsed(state, val) {
      state.collapsed = val;
    },
    setModuleName(state, val){
      state.moduleName = val;
    },
    setRecordForm(state, val){
      state.recordForm = val;
    },
    setRecordFormField(state, val){
      console.log("val", val);
      state.recordForm[val.field] = val.value;
      console.log("state.recordForm", state.recordForm);
    },
    clearRecordForm(state, val){
      state.recordForm = {};
    }
  },
  actions: {

  },
  modules: {},
});
