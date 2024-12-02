<template>
  <Editor key="index" v-model="content" :init="init" ref="editorRef" />
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
  nextTick
} from "vue";
const emit = defineEmits(["input"]);

const editorRef = ref();
const index = ref(1);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  baseUrl: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: false,
  },
  height: {
    type: [Number, String],
    default: 300
  },
  mode: {
    type: [String],
    default: ""
  }
  // plugins: {
  //     type: [String, Array],
  //     default: "lists  table",
  // },//必填
  // toolbar: {
  //     type: [String, Array],
  //     default:
  //     "codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat ",
  // },//必填
});
const height = ref(props.height);
import Editor from "@tinymce/tinymce-vue";
//引入tinymce开启本地模式
import "tinymce/tinymce";
//引入图标和主题等
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons";
import "tinymce/models/dom";
//引入插件
import "tinymce/plugins/codesample";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/link";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/image";
import tinymce from "tinymce/tinymce";
const initializeEditor = () => {
  return reactive({
    // 选择器
    selector: "textarea",
    // 设置本地主题
    skin_url: "/tinymce/skins/ui/oxide",
    // 设置本地css
    // content_css: "/tinymce/skins/content/default/content.css",
    content_style:".mce-content-body .mce-item-anchor{background: none !important;width: auto !important;height: 22px!important;}.fieldword{padding: 0pt;margin: 0 0 0 6px;font-size:12pt;font-family:宋体; mso-ascii-font-family: Calibri; mso-hansi-font-family: Calibri;color: green;border: solid 1px green;text-align:center; vertical-align:middle; font-weight:bold;display:inline-block;}",

    style_formats_merge: true,
    style_formats_autohide: true,
    allow_html_in_named_anchor:true,
        valid_elements: '*[*]',
        valid_children: '*[*]',
        extended_valid_elements: 'style,link[href|rel],script[src|type],style[type|media],tbody[len|class|v-for]',
        custom_elements: 'style,link,~link,script',
        convert_urls: false,
    // 设置本地语言
    language_url: "/tinymce/langs/zh_CN.js",
    // 设置本地语言
    language: "zh_CN",
    // 设置工具栏
    toolbar: props.mode == 'simple' ? 'forecolor bold italic' : [
      "bold italic hr | fontsize forecolor backcolor | blocks blockquote removeformat | undo redo ",
      "bullist table insertdatetime | link charmap wordcount searchreplace code | codesample visualblocks image fullscreen preview",
    ],
    menubar: props.mode == 'simple' ? 'edit custom' : '',
    // 设置插件
    plugins:
      "codesample lists advlist link autolink charmap fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
    placeholder: props.placeholder,
    statusbar: false,
    promotion: false,
    height: height.value
  });
};
console.log("props", props);
let init = initializeEditor();
// let init = reactive({
//   // 选择器
//   selector: "textarea",
//   // 设置本地主题
//   skin_url: "/tinymce/skins/ui/oxide",
//   // 设置本地css
//   content_css: "/tinymce/skins/content/default/content.css",
//   // 设置本地语言
//   language_url: "/tinymce/langs/zh_CN.js",
//   // 设置本地语言
//   language: "zh_CN",
//   // 设置工具栏
//   toolbar: [
//     "bold italic hr | fontsize forecolor backcolor | blocks blockquote removeformat | undo redo ",
//     "bullist table insertdatetime | link charmap wordcount searchreplace code | codesample visualblocks image fullscreen preview",
//   ],
//   // 设置插件
//   plugins:
//     "codesample lists advlist link autolink charmap fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
//   placeholder: props.placeholder,
//   statusbar: false,
//   promotion: false,
//   height: height
// });
let content = ref("");
content.value = props.value;
watch(
  content,
  (newVal) => {
    emit("input", newVal);
  },
  { deep: true, immediate: true }
);

watch(()=>props.height,(newVal,oldVal)=>{
  // console.log("newVAL",newVal);
  // console.log("editor", tinymce.DOM)
  // console.log("editorRef", editorRef);
  height.value = newVal;
  // // if (editorRef.value && newVal !== oldVal) {
  //   // tinymce.execCommand("mceSetHeight", false, newVal)
  //   if(editorRef.value && editorRef.value.editor){
  //     // editorRef.value.execCommand('mceSetHeight', false, newVal);
  //     // editorRef.value.editor.editorContainer.style.height = newVal;
  //     // editorRef.value.editor.resize();
  //   }

  // }
},{ deep: true, immediate: true });
// 插入
const insertContent = (content) => {
    tinymce.activeEditor.insertContent(content, false);
};
defineExpose({init, insertContent})
</script>
