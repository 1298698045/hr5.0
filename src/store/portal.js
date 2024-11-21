import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { getCurrentInstance } from 'vue';
import Interface from '@/utils/Interface';
import request from "@/utils/request.js"; 
export const useStore = defineStore('portal', {
    state: () => {
        return {
            currentData: {}, // 当前模板数据
            tabListCurrent: 0, // 当前选中的tab
            tabListClickType: 0,
            isMasterAttr: true, // 页面和组件属性配置开关
            dashboardId: "",
            themeType: "modern",
            isCopy: false,
            isRefresh: false,
            isConfigChange: false, // 监听模板属性是否变化
        }
    },
    getters: {
        
    },
    actions: {
        initializeFromRoute(){
            const route = useRoute();
            this.dashboardId = route.query.id;
        },
        async getLoadComponents(id) {
            // const { proxy } = getCurrentInstance();
            let obj = {
                actions:[{
                    id: "",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        dashboardId: this.dashboardId,
                        componentId: id
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            try {
                const res = await request.$post(Interface.portal.loadComponents, d);
                return res;
            } catch (error) {
                console.error("Failed to load components:", error);
                return null;
            }
        }
    }
});