<template>
    <div class="filed">
        <div v-if="type=='S'">
            <a-input :placeholder="'请输入' + field.label" style="min-width: 100px;"></a-input>
        </div>
        <div v-else-if="type=='N'">
            <a-input type="Number" :placeholder="'请输入' + field.label"></a-input>
        </div>
        <div v-else-if="type=='H'">
            <a-input type="Number" maxlength="11" :placeholder="'请输入' + field.label"></a-input>
        </div>
        <div v-else-if="type=='6'">
            <a-input type="password" :placeholder="'请输入' + field.label"></a-input>
        </div>
        <div v-else-if="type=='P'" style="width: 150px;display: flex;">
            <a-slider style="flex: 1;" v-model:value="inputValue1" :min="1" :max="100" />
            <a-input-number v-model:value="inputValue1" :min="1" :max="100" style="width: 50px;margin-left: 16px" />
        </div>
        <div v-else-if="type=='L' || type=='LT' || type=='DT'">
            <a-select style="min-width: 150px;width: 100%;" :placeholder="'请选择' + field.label">

            </a-select>
        </div>
        <div v-else-if="type=='D'">
            <a-date-picker style="min-width: 150px;width: 100%;" valueFormat="YYYY-MM-DD" :placeholder="'请选择' + field.label" />
        </div>
        <div v-else-if="type=='F'">
            <a-date-picker style="min-width: 150px;width: 100%;" show-time :placeholder="'请选择' + field.label" />
        </div>
        <div v-else-if="type=='Year'">
            <a-date-picker style="min-width: 150px;width: 100%;" picker="year" :placeholder="'请选择' + field.label" />
        </div>
        <div v-else-if="type=='Month'||type=='Y_M'">
            <a-date-picker style="min-width: 150px;width: 100%;" picker="month" :placeholder="'请选择' + field.label" />
        </div>
        <div v-else-if="type=='X' || type=='z' || type=='J' || type=='UC' || type=='UCS'">
            <a-textarea :placeholder="'请输入' + field.label" :rows="4" />
        </div>
        <div v-else-if="type=='B'">
            <a-checkbox></a-checkbox>
        </div>
        <div v-else-if="type=='BC'">
            <a-form-item name="appStyle" label="应用程序个性化设置">
                <a-checkbox-group style="width: 100%">
                    <a-checkbox value="checkbox1">checkbox1</a-checkbox>
                    <a-checkbox value="checkbox2">checkbox2</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
        </div>
        <div v-else-if="type=='RBL'">
            <a-radio-group>
                <a-radio :value="1">Option A</a-radio>
                <a-radio :value="2">Option B</a-radio>
            </a-radio-group>
        </div>
        <div v-else-if="type=='Q'">
            <a-transfer
                v-model:target-keys="targetKeys"
                v-model:selected-keys="selectedKeys"
                :data-source="mockData"
                :titles="['Source', 'Target']"
                :render="item => item.title"
                :disabled="disabled"
                @change="handleChange"
                @selectChange="handleSelectChange"
                @scroll="handleScroll"
            />
        </div>
        <div class="searchLook" v-else-if="type=='U' || type=='O' || type=='Y' || type=='Y_MD'">
            <a-select style="min-width: 150px;width: 100%;" :placeholder="'请选择' + field.label" allowClear>
                <template #suffixIcon></template>
            </a-select>
            <div class="searchIcon">
                <SearchOutlined
                  class="ant-select-suffix"
                  @click="handleOpenLook"
                />
              </div>
        </div>
        <div class="uploadPhoto" v-else-if="type=='I'">
            <a-upload
                v-model:file-list="fileList"
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
            >
                <a-button>
                    上传图片
                </a-button>
            </a-upload>
            单个文件不超过200MB,格式要求
        </div>
        <div class="Province" v-else-if="type=='Province'">
            <a-cascader v-model:value="value" :options="options" placeholder="Please select" />
        </div>
        <div v-else-if="type=='ColorPicker'">
            <InputColor />
        </div>
        <div v-else-if="type=='LT'">
            <a-tree-select
                v-model:value="value"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :placeholder="'请选择' + field.label"
                allow-clear
                tree-default-expand-all
                :tree-data="treeData"
                tree-node-filter-prop="label"
            >
                <template #title="{ value: val, label }">
                    <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
                    <template v-else>{{ label }}</template>
                </template>
            </a-tree-select>
        </div>
        <div v-else>
            <a-input :placeholder="'请输入' + field.label" style="min-width: 100px;"></a-input>
        </div>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import InputColor from "@/components/formDesign/InputColor.vue";

    const props = defineProps({
        type: String,
        field: Object
    });

    const emit = defineEmits(['openlook'])
    const treeData = ref([
        {
            label: 'root 1',
            value: 'root 1',
            children: [
            {
                label: 'parent 1',
                value: 'parent 1',
                children: [
                {
                    label: 'parent 1-0',
                    value: 'parent 1-0',
                    children: [
                    {
                        label: 'my leaf',
                        value: 'leaf1',
                    },
                    {
                        label: 'your leaf',
                        value: 'leaf2',
                    },
                    ],
                },
                {
                    label: 'parent 1-1',
                    value: 'parent 1-1',
                },
                ],
            },
            {
                label: 'parent 2',
                value: 'parent 2',
            },
            ],
        },
    ]);
    const mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 3 < 1,
        });
    }
    const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
    const disabled = ref(false);
    const targetKeys = ref(oriTargetKeys);
    const selectedKeys = ref(['1', '4']);
    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    };
    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    };
    const handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    const data = reactive({
        fileList: [],
        options: [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                    ],
                },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                    ],
                },
                ],
            },
        ],
        inputValue1: 10
    });
    const { fileList, options, inputValue1 } = toRefs(data);

    const handleOpenLook = () => {
        emit('openlook', props.field);
    }
</script>
<style lang="less" scoped>
    .filed{
        padding: 5px;
        .searchLook{
            position: relative;
            .searchIcon{
                position: absolute;
                right: 6px;
                top: 8px;
                z-index: 999;
            }
        }
    }
</style>