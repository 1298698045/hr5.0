<template>
    <div>
        <a-modal v-model:open="props.isShow" width="840px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    更新头像
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="photoCorp">
                        <div class="uploadDesc">
                            您可以上载 JPG、GIF 或 PNG 文件。最大文件大小为 16 MB。
                        </div>
                        <div class="uploadWrap">
                            <a-upload>
                                <a-button>上载图像</a-button>
                            </a-upload>
                            <div class="currentPhoto">
                                <div>当前照片：</div>
                                <div>
                                    <img src="@/assets/img/logo.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="cropImgWrap">
                            <div>
                                <div class="cropImg">
                                    <img ref="uploadImg" src="@/assets/img/thumbnail.png" alt="Picture">
                                </div>
                                <a-button block @click="handleCropImg" style="margin-top: 10px;">裁剪</a-button>
                            </div>
                            <div class="previewImg" v-show="isPreviewImg">
                                <span>预览</span>
                                <img class="cropped-canvas" ref="cropCanvasRef" />
                            </div>
                        </div>
                        <div class="switchText">
                            <a-checkbox>在公共可访问页面上显示我的照片</a-checkbox>
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, computed } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Toast from "@/utils/toast.js";
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const modelContentRef = ref(null);
    const cropper = ref({})
    const uploadImg = ref(null)
    const cropCanvasRef = ref(null);
    // 截图插件配置
    const cropperOption = ref({
        aspectRatio: 10 / 14, // 裁剪区默认正方形gi
        viewMode: 1, // 只能在裁剪的图片范围内移动
        dragMode: 'move', // 画布和图片都可以移动
        autoCropArea: 1, // 自动调整裁剪图片
        cropBoxMovable: true, // 禁止裁剪区移动
        cropBoxResizable: true, // 禁止裁剪区缩放
        background: true, // 关闭默认背景
        full: true
    });

    // 初始化
    const imgCropper = () => {
        cropper.value = new Cropper(uploadImg.value, cropperOption.value)
    };

    const labelCol = ref({ style: { width: '100px' } });

    const props = defineProps({
        isShow: Boolean,
        peopleId: {
            type: String,
            default: ""
        }
    })
    const emit = defineEmits(['cancel']);

    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        console.log("cropperOption", cropper.value);
    }
    const data = reactive({
        top: "",
        isPreviewImg: false,
        height: document.documentElement.clientHeight - 300,

    })
    const { listData, height, top, isPreviewImg } = toRefs(data);
    const formState = reactive({
    })
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 / 2 + 'px';
        imgCropper();
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const handleCropImg = () => {
       const canvas = cropper.value.getCroppedCanvas();
       console.log("canvas", canvas);
       console.log("cropCanvasRef", cropCanvasRef.value);
       cropCanvasRef.value.setAttribute("src", canvas.toDataURL());
       data.isPreviewImg = true;
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .currentPhoto{
        margin-top: 10px;
    }
    .photoCorp{
        text-align: center;
        .uploadDesc{
            margin-bottom: 20px;
        }
        .cropImgWrap{
            display: flex;
            justify-content: center;
        }
        .cropImg{
            width: 200px;
            height: 260px;
        }
        .previewImg{
            background: #f4f4f4;
            padding: 15px;
            height: 260px;
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-left: 20px;
            span{
                margin-bottom: 10px;
                color: #666;
            }
            img{
                max-width: 100%;
                max-height: calc(100% - 50px);
            }
        }
    }
    .switchText{
        margin-top: 10px;
        text-align: center;
        display: block;
    }
</styl